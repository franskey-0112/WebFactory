from ..Utils.utils import print_info, print_limited_json
from agent.Prompt import *
from agent.LLM import *
from .action import *
import time
import json5
from .action import ResponseError
from logs import logger

#RAG logger
from ..Utils.rag_logger import RAGLogger, VisionRAGLogger
import copy

# Additional imports for operator support
from agent.Prompt.prompt_constructor import OperatorPromptConstructor, OperatorPromptRAGConstructor
from agent.Prompt.operator_prompts import OperatorPrompts
from agent.Utils.utils import is_valid_base64
import json
from typing import List, Dict, Any
import os

class InteractionMode:
    def __init__(self, text_model=None, visual_model=None):
        self.text_model = text_model
        self.visual_model = visual_model

    def execute(self, status_description, user_request, previous_trace, observation, feedback, observation_VforD):
        # Returns a six-tuple containing None, consistent with DomMode
        return None, None, None, None, None, None

class DomMode(InteractionMode):
    def __init__(self, text_model=None, visual_model=None):
        super().__init__(text_model, visual_model)
    
    async def execute(self, status_description, user_request, rag_enabled,rag_path, previous_trace, observation, feedback, observation_VforD, rag_mode="description", rag_cache_dir=None):
        rag_data = {
            "rag_enabled": rag_enabled,
            "rag_path": rag_path if rag_enabled else None,
            "rag_mode": rag_mode
        }

        if rag_enabled:
            # Select RAG constructor based on mode
            if rag_mode == "vision_rag":
                from agent.Prompt.prompt_constructor import DOMVisionRAGConstructor
                prompt_constructor = DOMVisionRAGConstructor()
                
                # DOMVisionRAGConstructor needs screenshot_base64 parameter (like OperatorVisionRAGConstructor)
                planning_request = prompt_constructor.construct(
                    user_request=user_request,
                    rag_path=rag_path,
                    previous_trace=previous_trace,
                    observation=observation,
                    feedback=feedback,
                    status_description=status_description,
                    screenshot_base64=observation_VforD,  # Pass observation_VforD as screenshot_base64
                    rag_config={} if not rag_cache_dir else {"rag_cache_dir": rag_cache_dir},
                    rag_cache_dir=rag_cache_dir or ""
                )
                
                # Record retrieved info for logging
                if hasattr(prompt_constructor, 'get_last_retrieved_info'):
                    retrieved_info = prompt_constructor.get_last_retrieved_info()
                    if retrieved_info:
                        rag_data["retrieved_info"] = {
                            "cand_id": retrieved_info.get('cand_id', ''),
                            "task_description": retrieved_info.get('task_description', ''),
                            "similarity_score": retrieved_info.get('score', 0.0)
                        }
                        
            elif rag_mode == "vision":
                # Use existing PlanningPromptVisionRetrievalConstructor
                prompt_constructor = PlanningPromptVisionRetrievalConstructor()
                planning_request = prompt_constructor.construct(
                    user_request, rag_path, previous_trace, observation, feedback, status_description)
            else:
                # Default to description RAG
                prompt_constructor = PlanningPromptDescriptionRetrievalConstructor()
                planning_request = prompt_constructor.construct(
                    user_request, rag_path, previous_trace, observation, feedback, status_description)

            rag_data["rag_method"] = prompt_constructor.__class__.__name__
            
            # Record the retrieved example information (from prompt_constructor)
            # Note: DOMVisionRAGConstructor uses different retrieval info format
            if rag_mode != "vision_rag" and hasattr(prompt_constructor, 'reference'):
                reference = getattr(prompt_constructor, 'reference', None)
                if reference:
                    rag_data["retrieved_examples"] = reference
        else:
            planning_request = PlanningPromptConstructor().construct(user_request, previous_trace, observation, feedback, status_description)

        planning_request_copy = copy.deepcopy(planning_request)
        rag_data["planning_request"] = planning_request_copy

        # Filter out base64 image data for log size optimization
        def filter_base64_from_messages(messages):
            """Remove base64 image data from messages for logging"""
            filtered_messages = []
            for msg in messages:
                filtered_msg = {"role": msg["role"]}
                if msg["role"] == "system":
                    filtered_msg["content"] = msg["content"]
                elif msg["role"] == "user" and isinstance(msg["content"], list):
                    filtered_content = []
                    for item in msg["content"]:
                        if item["type"] == "text":
                            # Keep full text content as requested by user
                            filtered_content.append({
                                "type": "text",
                                "text": item["text"]
                            })
                        elif item["type"] == "image_url":
                            filtered_content.append({
                                "type": "image_url",
                                "image_url": {"url": "[base64_image_data_removed_for_log_size]"}
                            })
                        else:
                            filtered_content.append(item)
                    filtered_msg["content"] = filtered_content
                else:
                    filtered_msg["content"] = msg["content"]
                filtered_messages.append(filtered_msg)
            return filtered_messages
        
        filtered_planning_request = filter_base64_from_messages(planning_request)
        logger.info(
            f"\033[32mDOM_based_planning_request:\n{filtered_planning_request}\033[0m\n")
        logger.info(f"planning_text_model: {self.text_model.model}")
        planning_response, error_message = await self.text_model.request(planning_request)

        # Logging the response
        rag_data["planning_response"] = planning_response

        input_token_count = calculation_of_token(planning_request, model=self.text_model.model)
        output_token_count = calculation_of_token(planning_response, model=self.text_model.model)
        planning_token_count = [input_token_count, output_token_count]

        rag_data["token_counts"] = {
            "input_tokens": input_token_count,
            "output_tokens": output_token_count
        }

        return planning_response, error_message, None, None, planning_token_count, rag_data

class DomVDescMode(InteractionMode):
    def __init__(self, text_model=None, visual_model=None):
        super().__init__(text_model, visual_model)

    async def execute(self, status_description, user_request, previous_trace, observation, feedback, observation_VforD):
        if observation_VforD != "":
            vision_desc_request = VisionDisc2PromptConstructor().construct(
                user_request, observation_VforD)  # vision description request with user_request
            # vision_desc_request = VisionDisc1PromptConstructor().construct(observation_VforD)
            vision_desc_response, error_message = await self.visual_model.request(vision_desc_request)
        else:
            vision_desc_response = ""
        print(f"\033[36mvision_disc_response:\n{vision_desc_response}")  # blue
        planning_request = ObservationVisionDiscPromptConstructor().construct(
            user_request, previous_trace, observation, feedback, status_description, vision_desc_response)
        print(
            f"\033[35mplanning_request:\n{print_limited_json(planning_request, limit=10000)}")
        print("\033[0m")
        planning_response, error_message = await self.text_model.request(planning_request)
        return planning_response, error_message, None, None


class VisionToDomMode(InteractionMode):
    def __init__(self, text_model=None, visual_model=None):
        super().__init__(text_model, visual_model)

    async def execute(self, status_description, user_request, previous_trace, observation, feedback, observation_VforD):
        vision_act_request = ObservationVisionActPromptConstructor().construct(
            user_request, previous_trace, observation_VforD, feedback, status_description)
        max_retries = 3
        for attempt in range(max_retries):
            vision_act_response, error_message = await self.visual_model.request(vision_act_request)
            # Blue output
            print(f"\033[36mvision_act_response:\n{vision_act_response}")
            print("\033[0m")  # Reset color
            planning_response_thought, planning_response_get = ActionParser().extract_thought_and_action(
                vision_act_response)
            actions = {
                'goto': "Found 'goto' in the vision_act_response.",
                # 'google_search': "Found 'google_search' in the vision_act_response.",
                'switch_tab': "Found 'switch_tab' in the vision_act_response.",
                'scroll_down': "Found 'scroll_down' in the vision_act_response.",
                'scroll_up': "Found 'scroll_up' in the vision_act_response.",
                'go_back': "Found 'go_back' in the vision_act_response."
            }
            # Check if the action is in the predefined action list
            actions_found = False
            for action, message in actions.items():
                if action == planning_response_get.get('action'):
                    print(message)
                    actions_found = True
                    # The action does not need to be changed
                    # `target_element` should not exist, if it does, it's not used
                    break

            if not actions_found:
                # print("None of 'goto', 'google_search', 'switch_tab', 'scroll_down', 'scroll_up', or 'go_back' were found in the vision_act_response.")
                print("None of 'goto', 'switch_tab', 'scroll_down', 'scroll_up', or 'go_back' were found in the vision_act_response.")

                target_element = planning_response_get.get('target_element')
                description = planning_response_get.get('description')

                # If the target element is None or does not exist
                if not target_element:
                    print("The 'target_element' is None or empty.")
                    continue

                # Construct the request from vision to DOM
                planning_request = VisionToDomPromptConstructor().construct(target_element, description,
                                                                            observation)
                print(f"\033[35mplanning_request:{planning_request}")
                print("\033[0m")

                # Send the request and wait for the response
                planning_response_dom, error_message = await self.text_model.request(planning_request)
                print(
                    f"\033[34mVisionToDomplanning_response:\n{planning_response_dom}")
                print("\033[0m")
                # Parse the element ID
                element_id = ActionParser().get_element_id(planning_response_dom)
                if element_id == "-1":
                    print("The 'element_id' is not found in the planning_response.")
                    continue  # If the 'element_id' is not found, continue to the next iteration of the loop
                else:
                    planning_response_get['element_id'] = element_id
                    break  # If the 'element_id' is found, break the loop

            else:
                # If a predefined action is found, there is no need to retry, exit the loop directly
                break

        planning_response_json_str = json5.dumps(
            planning_response_get, indent=2)
        planning_response = f'```\n{planning_response_json_str}\n```'
        # Check if the maximum number of retries has been reached
        if attempt == max_retries - 1:
            print("Max retries of vision_act reached. Unable to proceed.")

        return planning_response, error_message, planning_response_thought, planning_response_get


class DVMode(InteractionMode):
    def __init__(self, text_model=None, visual_model=None):
        super().__init__(text_model, visual_model)

    async def execute(self, status_description, user_request, previous_trace, observation, feedback, observation_VforD):
        planning_request = D_VObservationPromptConstructor().construct(
            user_request, previous_trace, observation, observation_VforD, feedback, status_description)

        print(
            f"\033[32mplanning_request:\n{print_limited_json(planning_request, limit=1000)}")
        print("\033[0m")
        planning_response, error_message = await self.visual_model.request(planning_request)
        return planning_response, error_message, None, None


class VisionMode(InteractionMode):
    def __init__(self, text_model=None, visual_model=None):
        super().__init__(text_model, visual_model)

    async def execute(self, status_description, user_request, previous_trace, observation, feedback, observation_VforD):
        planning_request = VisionObservationPromptConstructor(
        ).construct(user_request, previous_trace, observation)
        print(f"\033[32m{planning_request}")  # Green color
        print("\033[0m")
        logger.info("\033[32m%s\033[0m", planning_request)
        planning_response, error_message = await self.visual_model.request(planning_request)
        return planning_response, error_message, None, None


class OperatorMode(InteractionMode):
    """
    OpenAI Operator mode for browser automation
    """
    
    def __init__(self, text_model=None, visual_model=None):
        super().__init__(text_model, visual_model)
        # Operator is the primary model for this mode
        self.operator_model = text_model
        self.conversation_history = []
        self.current_screenshot = None
        
        # Cache RAG constructors to avoid re-initialization
        self.rag_constructors = {}
    
    async def execute(self, status_description, user_request, rag_enabled, rag_path, 
                     previous_trace, observation, feedback, observation_VforD, rag_mode="description",
                     prompt_logging_enabled=False, prompt_logger=None, task_uuid=None, step_idx=0, rag_cache_dir=None,
                     long_memory_context: str = ""):
        """
        Execute operator planning with proper OpenAI Operator integration
        
        Args:
            status_description: Current task status
            user_request: User's task request
            rag_enabled: Whether RAG is enabled
            rag_path: Path to RAG data
            previous_trace: Previous action history
            observation: Current DOM observation (not used in operator mode)
            feedback: Any feedback or error messages
            observation_VforD: Screenshot in base64 format
            rag_mode: RAG mode - "description" or "vision" (default: "description")
            prompt_logging_enabled: Whether to enable prompt logging
            prompt_logger: PromptLogger instance
            task_uuid: Task UUID for logging
            step_idx: Current step index for logging
            rag_cache_dir: RAG cache directory for pre-built indices
            
        Returns:
            Tuple of (planning_response, error_message, planning_response_thought, 
                     planning_response_action, planning_token_count, rag_data)
        """
        # record execution start time for prompt logging
        start_time = time.time()
        
        rag_data = {
            "rag_enabled": rag_enabled,
            "rag_path": rag_path if rag_enabled else None,
            "rag_mode": rag_mode,
            "mode": "operator"
        }
        
        # init RAG data
        self.current_rag_data = rag_data.copy()
        
        try:
            # Store current screenshot for conversation continuity
            self.current_screenshot = observation_VforD
            
            # Build conversation messages
            messages = self._build_operator_messages(
                user_request,
                status_description,
                previous_trace,
                feedback,
                rag_enabled,
                rag_path,
                rag_mode,
                rag_cache_dir,
                long_memory_context=long_memory_context,
            )
            
            # update rag_data
            rag_data.update(self.current_rag_data)
            
            # Log the planning request
            logger.info(f"\033[36mOperator Planning Request:\n{user_request}\033[0m")
            logger.info(f"Operator Model: {self.operator_model.model}")
            logger.info(f"Screenshot Available: {observation_VforD is not None}")
            if rag_enabled:
                logger.info(f"🧠 RAG Mode: {rag_data.get('rag_constructor_type', 'Unknown')}")
                # logger.info(f"📚 RAG Reference Available: {bool(rag_data.get('rag_reference', ''))}")
            
            # Make request to OpenAI Operator
            planning_response, error_message = await self.operator_model.request(
                messages=messages,
                screenshot_base64=observation_VforD,
                viewport_width=1280,
                viewport_height=720
            )
            
            execution_time_ms = int((time.time() - start_time) * 1000)
            
            if error_message:
                logger.error(f"Operator API Error: {error_message}")
                rag_data["error"] = error_message
                
                # prompt logging(failed case)
                if prompt_logging_enabled and prompt_logger and task_uuid is not None:
                    try:
                        prompt_data = {
                            "model": getattr(self.operator_model, 'model', 'unknown'),
                            "rag_mode": rag_mode,
                            "rag_enabled": rag_enabled,
                            "user_request": user_request,
                            "status_description": status_description,
                            "feedback": feedback,
                            "previous_trace": previous_trace,
                            "screenshot_available": observation_VforD is not None,
                            "messages": messages,
                            "input_tokens": len(str(messages)) // 4,
                            "output_tokens": 0,
                            "planning_response": "",
                            "planning_thought": "",
                            "planning_action": {"action": "operator_wait", "action_input": "1000"},
                            "execution_time_ms": execution_time_ms,
                            "error": error_message,
                            "long_memory_context": (long_memory_context[:2000] if long_memory_context else "")
                        }
                        # add RAG related data
                        prompt_data.update(rag_data)
                        prompt_logger.log_prompt_step(task_uuid, step_idx, prompt_data)
                        logger.info(f"📝 Prompt logged for error case: step {step_idx}")
                    except Exception as log_error:
                        logger.warning(f"⚠️  Failed to log error prompt: {log_error}")
                
                return ("", error_message, "", {"action": "operator_wait", "action_input": "1000", "ms": 1000, "element_id": "api_error_wait"}, [0, 0], rag_data)
            
            # Log the response
            logger.info(f"\033[32mOperator Response:\n{planning_response}\033[0m")
            rag_data["planning_response"] = planning_response
            
            # Parse the operator response
            try:
                # Validate planning_response before parsing
                if not planning_response:
                    logger.error("⚠️ Empty or None planning response received")
                    raise ValueError("Empty or None planning response")
                
                if not isinstance(planning_response, str):
                    logger.error(f"⚠️ Invalid planning response type: {type(planning_response)}")
                    raise ValueError(f"Invalid planning response type: {type(planning_response)}")
                
                # Clean the response string
                planning_response = planning_response.strip()
                if not planning_response:
                    logger.error("⚠️ Empty planning response after stripping")
                    raise ValueError("Empty planning response after stripping")
                
                # Try to parse JSON
                try:
                    response_data = json.loads(planning_response)
                except json.JSONDecodeError as json_error:
                    logger.error(f"⚠️ JSON decode error: {json_error}")
                    logger.error(f"Raw response: {repr(planning_response)}")
                    # Try to extract action from text if JSON parsing fails
                    response_data = {"text_response": planning_response, "actions": [], "reasoning": "JSON parsing failed"}
                
                # Validate response_data
                if response_data is None:
                    logger.error("⚠️ Parsed response_data is None")
                    response_data = {"text_response": planning_response, "actions": [], "reasoning": "Parsed data is None"}
                
                # ensure all fields are converted to empty strings even if they are null
                actions = response_data.get("actions", []) or []
                text_response = response_data.get("text_response", "") or ""
                reasoning = response_data.get("reasoning", "") or ""
                
                # Log raw responses for debugging purposes
                logger.debug(f"🔍 Operator API Response Fields: {list(response_data.keys()) if response_data else 'None'}")
                logger.debug(f"📝 text_response: '{(text_response or '')[:100]}{'...' if len(text_response or '') > 100 else ''}'")
                logger.debug(f"🧠 reasoning: '{(reasoning or '')[:100]}{'...' if len(reasoning or '') > 100 else ''}'")
                logger.debug(f"🎯 actions count: {len(actions) if actions else 0}")
                
                # Improve thinking content extraction logic - try more fields
                # Ensure all potential thoughts are strings (handle None values)
                potential_thoughts = [
                    text_response or "",
                    reasoning or "",
                    response_data.get("explanation", "") or "",
                    response_data.get("thought", "") or "", 
                    response_data.get("description", "") or "",
                    response_data.get("plan", "") or ""
                ]
                
                # Filter out any remaining None values as extra safety
                potential_thoughts = [str(t) if t is not None else "" for t in potential_thoughts]
                
                # Find the first non-empty thought
                planning_response_thought = ""
                for thought in potential_thoughts:
                    if thought and isinstance(thought, str) and thought.strip():
                        planning_response_thought = thought.strip()
                        break
                
                # If there is still no thought content, generate a more meaningful description based on the action
                if not planning_response_thought:
                    if actions:
                        first_action = actions[0]
                        action_data = first_action.get("action", {})
                        action_type = action_data.get("type", "wait")
                        
                        # Generating descriptive thoughts based on action types
                        action_descriptions = {
                            "click": "Clicking on an element to interact with it",
                            "type": "Typing text into an input field",
                            "scroll": "Scrolling to view more content",
                            "wait": "Waiting for page elements to load",
                            "screenshot": "Taking a screenshot to analyze current state",
                            "key": "Pressing keyboard keys for navigation"
                        }
                        
                        planning_response_thought = action_descriptions.get(
                            action_type, 
                            f"Executing {action_type} action"
                        )
                        
                        logger.info(f"💭 Generated thought from action: '{planning_response_thought}'")
                    else:
                        # The final alternative
                        planning_response_thought = f"Processing step with status: {status_description[:50]}{'...' if len(status_description) > 50 else ''}"
                        logger.warning("⚠️ No thought content available, using status-based description")
                else:
                    logger.info(f"✅ Found thought content: '{planning_response_thought[:50]}{'...' if len(planning_response_thought) > 50 else ''}'")
                
                # Convert operator actions to compatible format
                if actions and isinstance(actions, list) and len(actions) > 0:
                    # Take the first action for now
                    first_action = actions[0]
                    
                    # response format: {"action": {"type": "click", "x": 773, "y": 90}}
                    action_data = first_action.get("action", {})
                    planning_response_action = self._convert_operator_action(action_data)
                    
                    logger.info(f"🔧 Converted action: {planning_response_action}")
                else:
                    # No actions returned, try to parse action from text_response
                    logger.warning("⚠️ No valid actions found in response, parsing from text")
                    planning_response_action = self._parse_action_from_text(text_response)
                
                # Calculate token counts (correctly)
                input_token_count = calculation_of_token(messages, model=self.operator_model.model)
                output_token_count = calculation_of_token(planning_response, model=self.operator_model.model)
                planning_token_count = [input_token_count, output_token_count]
                
                # Store in conversation history for continuity
                self.conversation_history.append({
                    "messages": messages,
                    "response": planning_response,
                    "actions": actions
                })
                
                # prompt logging(success case)
                if prompt_logging_enabled and prompt_logger and task_uuid is not None:
                    try:
                        prompt_data = {
                            "model": getattr(self.operator_model, 'model', 'unknown'),
                            "rag_mode": rag_mode,
                            "rag_enabled": rag_enabled,
                            "user_request": user_request,
                            "status_description": status_description,
                            "feedback": feedback,
                            "previous_trace": previous_trace,
                            "screenshot_available": observation_VforD is not None,
                            "messages": messages,
                            "input_tokens": planning_token_count[0] if planning_token_count else 0,
                            "output_tokens": planning_token_count[1] if planning_token_count else 0,
                            "planning_response": planning_response,
                            "planning_thought": planning_response_thought,
                            "planning_action": planning_response_action,
                            "execution_time_ms": execution_time_ms,
                            "long_memory_context": (long_memory_context[:2000] if long_memory_context else "")
                        }
                        # add RAG related data
                        prompt_data.update(rag_data)
                        prompt_logger.log_prompt_step(task_uuid, step_idx, prompt_data)
                        logger.info(f"📝 Prompt logged successfully: step {step_idx}")
                    except Exception as log_error:
                        logger.warning(f"⚠️  Failed to log prompt: {log_error}")
                
                return (planning_response, error_message, planning_response_thought, 
                       planning_response_action, planning_token_count, rag_data)
                
            except Exception as e:
                logger.error(f"❌ Error parsing operator response: {e}")
                logger.error(f"📝 Raw planning response: {repr(planning_response)}")
                logger.error(f"🧠 RAG mode: {rag_mode}")
                logger.error(f"📷 Screenshot available: {observation_VforD is not None}")
                
                # Enhanced error handling with more context
                error_context = f"Parsing error in {rag_mode} mode"
                if rag_mode == "vision_rag":
                    error_context += " - Check RAG database initialization and embedding model"
                elif rag_mode == "vision":
                    error_context += " - Check vision RAG retrieval process"
                
                planning_response_thought = f"Error parsing operator response: {error_context}"
                planning_response_action = {"action": "operator_wait", "action_input": "1000", "ms": 1000, "element_id": "parse_error_wait"}
                
                # Add error details to rag_data for debugging
                rag_data["parse_error"] = {
                    "error": str(e),
                    "raw_response": str(planning_response)[:500] if planning_response else "None",
                    "response_type": type(planning_response).__name__,
                    "rag_mode": rag_mode,
                    "screenshot_available": observation_VforD is not None
                }
                
                return (planning_response or "", str(e), planning_response_thought, 
                       planning_response_action, [0, 0], rag_data)
            
        except Exception as e:
            logger.error(f"❌ Error in OperatorMode.execute: {e}")
            import traceback
            logger.error(f"📊 Full traceback: {traceback.format_exc()}")
            
            # Enhanced error context for vision_rag mode
            error_context = f"Execute error in {rag_mode} mode"
            if rag_mode == "vision_rag":
                error_context += " - This may be due to RAG database initialization or embedding model issues"
                logger.error("🔍 Vision RAG troubleshooting tips:")
                logger.error("  1. Check if embedding model is accessible")
                logger.error("  2. Verify RAG database files exist")
                logger.error("  3. Ensure sufficient GPU memory")
                logger.error("  4. Check OpenAI API key for GPT-4")
            
            error_message = f"{error_context}: {str(e)}"
            
            rag_data["execute_error"] = {
                "error": str(e),
                "error_type": type(e).__name__,
                "rag_mode": rag_mode,
                "screenshot_available": observation_VforD is not None,
                "traceback": traceback.format_exc()
            }
            
            return ("", error_message, "", {"action": "operator_wait", "action_input": "1000", "ms": 1000, "element_id": "execute_error_wait"}, [0, 0], rag_data)
    
    def _build_operator_messages(self, user_request: str, status_description: str,
                               previous_trace: str, feedback: str, 
                               rag_enabled: bool, rag_path: str, rag_mode: str = "description",
                               rag_cache_dir: str = None, long_memory_context: str = "") -> List[Dict[str, Any]]:
        """
        Build messages for OpenAI Operator
        
        Args:
            user_request: User's task request
            status_description: Current task status
            previous_trace: Previous action history
            feedback: Any feedback messages
            rag_enabled: Whether RAG is enabled
            rag_path: Path to RAG data
            rag_mode: RAG mode (description/vision/vision_rag)
            rag_cache_dir: RAG cache directory path
            
        Returns:
            Formatted messages for operator
        """
        if rag_enabled:
            rag_constructor = None
            try:
                # use cached RAG constructor to avoid duplicate initialization
                if rag_mode not in self.rag_constructors:
                    logger.info(f"🔄 Initializing RAG constructor for mode: {rag_mode}")
                    
                    # select RAG mode
                    if rag_mode == "vision":
                        from agent.Prompt.prompt_constructor import OperatorPromptVisionRetrievalConstructor
                        self.rag_constructors[rag_mode] = OperatorPromptVisionRetrievalConstructor()
                        constructor_type = "OperatorPromptVisionRetrievalConstructor"
                    elif rag_mode == "vision_rag":
                        from agent.Prompt.prompt_constructor import OperatorVisionRAGConstructor
                        self.rag_constructors[rag_mode] = OperatorVisionRAGConstructor()
                        constructor_type = "OperatorVisionRAGConstructor"
                    elif rag_mode == "description_rag":
                        from agent.Prompt.prompt_constructor import OperatorDescRAGConstructor
                        self.rag_constructors[rag_mode] = OperatorDescRAGConstructor()
                        constructor_type = "OperatorDescRAGConstructor"
                    elif rag_mode == "hybrid_rag":
                        from agent.Prompt.prompt_constructor import OperatorHybridRAGConstructor
                        self.rag_constructors[rag_mode] = OperatorHybridRAGConstructor()
                        constructor_type = "OperatorHybridRAGConstructor"
                    else:  # rag_mode == "description"
                        from agent.Prompt.prompt_constructor import OperatorPromptDescriptionRetrievalConstructor
                        self.rag_constructors[rag_mode] = OperatorPromptDescriptionRetrievalConstructor()
                        constructor_type = "OperatorPromptDescriptionRetrievalConstructor"
                    
                    logger.info(f"✅ RAG constructor initialized and cached for mode: {rag_mode}")
                else:
                    logger.debug(f"🎯 Using cached RAG constructor for mode: {rag_mode}")
                    constructor_type = self.rag_constructors[rag_mode].__class__.__name__
                
                rag_constructor = self.rag_constructors[rag_mode]
                
            except ImportError as import_error:
                logger.error(f"❌ Failed to import RAG constructor for mode {rag_mode}: {import_error}")
                logger.warning("🔄 Falling back to non-RAG mode")
                rag_enabled = False
                constructor_type = "fallback_non_rag"
            except Exception as rag_init_error:
                logger.error(f"❌ Failed to initialize RAG constructor for mode {rag_mode}: {rag_init_error}")
                logger.warning("🔄 Falling back to non-RAG mode")
                rag_enabled = False
                constructor_type = "fallback_non_rag"
            
            if hasattr(self, 'current_rag_data') and rag_constructor is not None:
                self.current_rag_data["rag_method"] = rag_constructor.__class__.__name__
                self.current_rag_data["rag_constructor_type"] = constructor_type

            if not rag_enabled or rag_constructor is None:
                return self._build_operator_messages(
                    user_request=user_request,
                    status_description=status_description,
                    previous_trace=previous_trace,
                    feedback=feedback,
                    rag_enabled=False,
                    rag_path=rag_path,
                    rag_mode=rag_mode,
                    rag_cache_dir=rag_cache_dir,
                    long_memory_context=long_memory_context,
                )
            
            previous_trace_list = []
            if previous_trace:
                trace_lines = previous_trace.split('\n')
                for line in trace_lines:
                    if line.strip():
                        # "Step X: thought -> action" format
                        if " -> " in line:
                            parts = line.split(" -> ")
                            if len(parts) >= 2:
                                thought_part = parts[0].strip()
                                action_part = parts[1].strip()
                                
                                # thought context（Get rid of "Step X: "）
                                if ":" in thought_part:
                                    thought = thought_part.split(":", 1)[1].strip()
                                else:
                                    thought = thought_part
                                
                                previous_trace_list.append({
                                    "thought": thought,
                                    "action": action_part,
                                    "reflection": ""
                                })
                        else:
                            previous_trace_list.append({
                                "thought": "Previous action",
                                "action": line.strip(),
                                "reflection": ""
                            })
            
            # RAG messages with error handling
            try:
                if constructor_type == "OperatorVisionRAGConstructor":
                    # OperatorVisionRAGConstructor rag_config parameter
                    messages = rag_constructor.construct(
                        user_request=user_request,
                        rag_path=rag_path,
                        previous_trace=previous_trace_list,
                        observation="",  # Operator not use DOM observation
                        feedback=feedback,
                        status_description=status_description,
                        screenshot_base64=self.current_screenshot,
                        rag_config=None,
                        rag_cache_dir=rag_cache_dir
                    )
                elif constructor_type == "OperatorDescRAGConstructor":
                    # OperatorDescRAGConstructor rag_config parameter
                    messages = rag_constructor.construct(
                        user_request=user_request,
                        rag_path=rag_path,
                        previous_trace=previous_trace_list,
                        observation="",  # Operator not use DOM observation
                        feedback=feedback,
                        status_description=status_description,
                        screenshot_base64=self.current_screenshot,
                        rag_config=None,
                        rag_cache_dir=rag_cache_dir
                    )
                elif constructor_type == "OperatorHybridRAGConstructor":
                    messages = rag_constructor.construct(
                        user_request=user_request,
                        rag_path=rag_path,
                        previous_trace=previous_trace_list,
                        observation="",
                        feedback=feedback,
                        status_description=status_description,
                        screenshot_base64=self.current_screenshot,
                        rag_config=None,
                        rag_cache_dir=rag_cache_dir
                    )
                else:
                    # other mode
                    messages = rag_constructor.construct(
                        user_request=user_request,
                        rag_path=rag_path,
                        previous_trace=previous_trace_list,
                        observation="",  # Operator not use DOM observation
                        feedback=feedback,
                        status_description=status_description,
                        screenshot_base64=self.current_screenshot
                    )
            except Exception as construct_error:
                logger.error(f"❌ RAG message construction failed: {construct_error}")
                logger.warning("🔄 Falling back to simple message construction")
                return self._build_operator_messages(
                    user_request=user_request,
                    status_description=status_description,
                    previous_trace=previous_trace,
                    feedback=feedback,
                    rag_enabled=False,
                    rag_path=rag_path,
                    rag_mode=rag_mode,
                    rag_cache_dir=rag_cache_dir,
                    long_memory_context=long_memory_context,
                )
            
            if hasattr(self, 'current_rag_data'):
                if constructor_type == "OperatorPromptVisionRetrievalConstructor":
                    # Vision RAG data
                    retrieved_images = []
                    if hasattr(rag_constructor, 'retrieved_image_paths') and rag_constructor.retrieved_image_paths:
                        for i, image_path_json in enumerate(rag_constructor.retrieved_image_paths):
                            try:
                                image_paths = json5.loads(image_path_json)
                                for path in image_paths:
                                    retrieved_images.append({
                                        "path": path,
                                        "task_index": i,
                                        "task_name": rag_constructor.retrieved_tasks[i] if i < len(rag_constructor.retrieved_tasks) else "Unknown"
                                    })
                            except:
                                pass
                    
                    self.current_rag_data.update({
                        "rag_constructor_used": True,
                        "retrieved_tasks": getattr(rag_constructor, 'retrieved_tasks', []),
                        "retrieved_texts": getattr(rag_constructor, 'retrieved_texts', []),
                        "retrieved_images": retrieved_images,
                        "previous_trace_processed": previous_trace_list,
                        "messages_count": len(messages),
                        "user_request": user_request,
                        "status_description": status_description,
                        "feedback": feedback,
                        "current_screenshot": self.current_screenshot,
                        "screenshot_available": self.current_screenshot is not None
                    })
                elif constructor_type == "OperatorVisionRAGConstructor":
                    # Vision RAG with embedding-based retrieval data
                    retrieved_info = rag_constructor.get_last_retrieved_info()
                    
                    self.current_rag_data.update({
                        "rag_constructor_used": True,
                        "rag_type": "vision_embedding_retrieval",
                        "retrieved_info": retrieved_info,
                        "rag_db_initialized": rag_constructor.rag_db is not None,
                        "gpt4_available": rag_constructor.gpt4_client is not None,
                        "previous_trace_processed": previous_trace_list,
                        "messages_count": len(messages),
                        "user_request": user_request,
                        "status_description": status_description,
                        "feedback": feedback,
                        "current_screenshot": self.current_screenshot,
                        "screenshot_available": self.current_screenshot is not None
                    })
                    
                    # log retrieved info
                    if retrieved_info:
                        self.current_rag_data.update({
                            "retrieved_task_id": retrieved_info.get('cand_id', ''),
                            "retrieved_task_description": retrieved_info.get('task_description', ''),
                            "similarity_score": retrieved_info.get('score', 0.0),
                            "retrieved_context": retrieved_info.get('cand_text', '')[:200] + "..." if retrieved_info.get('cand_text') else ""
                    })
                elif constructor_type == "OperatorDescRAGConstructor":
                    # Description RAG with embedding-based retrieval data
                    retrieved_info = rag_constructor.get_last_retrieved_info()
                    
                    self.current_rag_data.update({
                        "rag_constructor_used": True,
                        "rag_type": "description_embedding_retrieval",
                        "retrieved_info": retrieved_info,
                        "rag_db_initialized": rag_constructor.rag_db is not None,
                        "gpt4_available": rag_constructor.gpt4_client is not None,
                        "previous_trace_processed": previous_trace_list,
                        "messages_count": len(messages),
                        "user_request": user_request,
                        "status_description": status_description,
                        "feedback": feedback,
                        "current_screenshot": self.current_screenshot,
                        "screenshot_available": self.current_screenshot is not None
                    })
                    
                    # log retrieved info
                    if retrieved_info:
                        self.current_rag_data.update({
                            "retrieved_task_id": retrieved_info.get('task_id', ''),
                            "retrieved_reference_preview": retrieved_info.get('retrieved_reference', ''),
                            "embedding_retrieval": retrieved_info.get('embedding_retrieval', False),
                            "gpt4_reranked": retrieved_info.get('gpt4_reranked', False)
                        })
                elif constructor_type == "OperatorHybridRAGConstructor":
                    retrieved_info = rag_constructor.get_last_retrieved_info()
                    self.current_rag_data.update({
                        "rag_constructor_used": True,
                        "rag_type": "hybrid_dual_route_retrieval",
                        "retrieved_info": retrieved_info,
                        "previous_trace_processed": previous_trace_list,
                        "messages_count": len(messages),
                        "user_request": user_request,
                        "status_description": status_description,
                        "feedback": feedback,
                        "current_screenshot": self.current_screenshot,
                        "screenshot_available": self.current_screenshot is not None
                    })
                    if retrieved_info:
                        self.current_rag_data.update({
                            "hybrid_visual_task_id": retrieved_info.get("visual_task_id", ""),
                            "hybrid_text_task_id": retrieved_info.get("text_task_id", ""),
                            "hybrid_fusion_confidence": retrieved_info.get("fusion_confidence", 0.0),
                        })
                else:
                    # Description RAG
                    self.current_rag_data.update({
                        "rag_constructor_used": True,
                        "rag_reference": getattr(rag_constructor, 'reference', ""),
                        "previous_trace_processed": previous_trace_list,
                        "messages_count": len(messages),
                        "user_request": user_request,
                        "status_description": status_description,
                        "feedback": feedback,
                        "screenshot_available": self.current_screenshot is not None
                    })
                
                # log constructed prompt content
                safe_messages = []
                for msg in messages:
                    safe_msg = {"role": msg["role"]}
                    if msg["role"] == "system":
                        safe_msg["content"] = msg["content"]
                    elif msg["role"] == "user" and isinstance(msg["content"], list):
                        safe_content = []
                        for item in msg["content"]:
                            if item["type"] == "input_text":
                                safe_content.append({
                                    "type": "input_text",
                                    "text": item["text"][:500] + "..." if len(item["text"]) > 500 else item["text"]
                                })
                            elif item["type"] == "input_image":
                                safe_content.append({
                                    "type": "input_image",
                                    "image_url": "[base64_image_data_removed]"
                                })
                            elif item["type"] == "text":
                                safe_content.append({
                                    "type": "text",
                                    "text": item["text"][:1000] + "..." if len(item["text"]) > 1000 else item["text"]
                                })
                            elif item["type"] == "image_url":
                                safe_content.append({
                                    "type": "image_url",
                                    "image_url": {"url": "[base64_image_data_removed_for_log_size]"}
                                })
                        safe_msg["content"] = safe_content
                    else:
                        safe_msg["content"] = str(msg["content"])[:500] + "..." if len(str(msg["content"])) > 500 else str(msg["content"])
                    safe_messages.append(safe_msg)
                
                self.current_rag_data["constructed_messages"] = safe_messages
            
            logger.info(f"🧠 RAG Constructor: {rag_constructor.__class__.__name__} (Mode: {rag_mode})")
            if rag_mode == "vision":
                logger.info(f"🖼️  Using Vision RAG with visual examples")
            elif rag_mode == "vision_rag":
                # For vision_rag mode, check if retrieval was successful
                if hasattr(rag_constructor, 'get_last_retrieved_info'):
                    retrieved_info = rag_constructor.get_last_retrieved_info()
                    if retrieved_info:
                        logger.info(f"🔍 Vision RAG: Successfully retrieved similar task (ID: {retrieved_info.get('cand_id', 'N/A')})")
                        logger.info(f"📊 Similarity Score: {retrieved_info.get('score', 0.0):.4f}")
                    else:
                        logger.info(f"⚠️  Vision RAG: No similar tasks retrieved")
                else:
                    logger.info(f"🤖 Vision RAG: Using embedding-based retrieval")
            elif rag_mode == "description_rag":
                if hasattr(rag_constructor, 'get_last_retrieved_info'):
                    retrieved_info = rag_constructor.get_last_retrieved_info()
                    if retrieved_info:
                        logger.info(f"🔍 Description RAG: Successfully retrieved similar task (ID: {retrieved_info.get('task_id', 'N/A')})")
                        logger.info(f"🧠 GPT-4 Re-ranking: {'Used' if retrieved_info.get('gpt4_reranked', False) else 'Not Used'}")
                        logger.info(f"📚 Reference Length: {len(retrieved_info.get('retrieved_reference', ''))}")
                    else:
                        logger.info(f"⚠️  Description RAG: No similar tasks retrieved")
                else:
                    logger.info(f"🤖 Description RAG: Using embedding-based retrieval")
            elif rag_mode == "hybrid_rag":
                if hasattr(rag_constructor, "get_last_retrieved_info"):
                    retrieved_info = rag_constructor.get_last_retrieved_info()
                    if retrieved_info:
                        logger.info(
                            f"🔀 Hybrid RAG: visual={retrieved_info.get('visual_task_id', 'N/A')}, "
                            f"text={retrieved_info.get('text_task_id', 'N/A')}, "
                            f"fusion={retrieved_info.get('fusion_confidence', 0.0):.3f}"
                        )
                    else:
                        logger.info("⚠️  Hybrid RAG: No reliable dual-route reference retrieved")
            else: # description rag
                logger.info(f"📚 RAG Reference Length: {len(getattr(rag_constructor, 'reference', ''))}")

            messages = self._inject_long_memory_context(messages, long_memory_context)
            return messages
        else:
            # Original simple message construction logic
            if hasattr(self, 'current_rag_data'):
                self.current_rag_data.update({
                    "rag_constructor_used": False,
                    "simple_message_construction": True
                })
            
            messages = []
            
            # System message for operator
            system_message = OperatorPrompts.operator_autonomous_simple_system
            
            if status_description:
                system_message += f"\n**Task Status**: {status_description}"
            
            if previous_trace:
                system_message += f"\n**Previous Actions**: {previous_trace}"
            
            if feedback:
                system_message += f"\n**Feedback**: {feedback}"
            
            messages.append({"role": "system", "content": system_message})
            
            # User message with task request (using template from operator_prompts.py)
            from jinja2 import Template
            user_message_template = Template(OperatorPrompts.operator_autonomous_user_template)
            user_message = user_message_template.render(user_request=user_request)
            
            messages.append({"role": "user", "content": user_message})
            
            messages = self._inject_long_memory_context(messages, long_memory_context)
            return messages

    def _inject_long_memory_context(
        self, messages: List[Dict[str, Any]], long_memory_context: str
    ) -> List[Dict[str, Any]]:
        context = (long_memory_context or "").strip()
        if not context:
            return messages

        context_block = (
            "\n## Hierarchical Long-Term Memory ##\n"
            f"{context}\n"
            "Use it as a prior, but ground final action on current screenshot and page state."
        )

        try:
            for msg in messages:
                if msg.get("role") != "user":
                    continue
                content = msg.get("content")
                if isinstance(content, list):
                    content.append({"type": "input_text", "text": context_block})
                    return messages
                if isinstance(content, str):
                    msg["content"] = content + context_block
                    return messages
            messages.append({"role": "user", "content": [{"type": "input_text", "text": context_block}]})
        except Exception:
            messages.append({"role": "user", "content": context_block})
        return messages
    
    def _convert_operator_action(self, action_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Convert OpenAI Operator action to compatible format for existing code
        
        Args:
            action_data: Raw action data from operator
            
        Returns:
            Compatible action format
        """
        action_type = action_data.get("type", "wait")
        
        if action_type == "click":
            # handle button field - keep button information but use operator_click
            button = action_data.get("button", "left")
            x_coord = action_data.get('x', 0)
            y_coord = action_data.get('y', 0)
            
            return {
                "action": "operator_click",
                "action_input": f"{x_coord},{y_coord}",
                "coordinates": [x_coord, y_coord],
                "button": button,
                "element_id": f"coord_{x_coord}_{y_coord}_{button}"
            }
        elif action_type == "double_click":
            button = action_data.get("button", "left")
            x_coord = action_data.get('x', 0)
            y_coord = action_data.get('y', 0)
            
            return {
                "action": "operator_double_click",
                "action_input": f"{x_coord},{y_coord}",
                "coordinates": [x_coord, y_coord],
                "button": button,
                "element_id": f"coord_{x_coord}_{y_coord}_double_{button}"
            }
        elif action_type == "type":
            return {
                "action": "operator_type",
                "action_input": action_data.get("text", ""),
                "text": action_data.get("text", ""),
                "element_id": "text_input"
            }
        elif action_type == "scroll":
            return {
                "action": "operator_scroll",
                "action_input": f"{action_data.get('scroll_x', 0)},{action_data.get('scroll_y', 0)}",
                "scroll_x": action_data.get('scroll_x', 0),
                "scroll_y": action_data.get('scroll_y', 0),
                "element_id": "scroll_action"
            }
        elif action_type == "keypress":
            keys = action_data.get("keys", [])
            return {
                "action": "operator_keypress",
                "action_input": ",".join(keys),
                "keys": keys,
                "element_id": "keypress_action"
            }
        elif action_type == "drag":
            path = action_data.get("path", [[0, 0], [0, 0]])
            return {
                "action": "operator_drag",
                "action_input": f"{path[0][0]},{path[0][1]}-{path[-1][0]},{path[-1][1]}",
                "path": path,
                "element_id": f"drag_{path[0][0]}_{path[0][1]}_to_{path[-1][0]}_{path[-1][1]}"
            }
        elif action_type == "wait":
            return {
                "action": "operator_wait",
                "action_input": str(action_data.get("ms", 1000)),
                "ms": action_data.get("ms", 1000),
                "element_id": "wait_action"
            }
        elif action_type == "get_final_answer" or action_type == "final_answer":
            return {
                "action": "get_final_answer",
                "action_input": action_data.get("answer", action_data.get("text", "")),
                "element_id": "final_answer"
            }
        else:
            return {
                "action": "operator_wait",
                "action_input": "1000",
                "ms": 1000,
                "element_id": "unknown_action_wait"
            }
    
    def _parse_action_from_text(self, text_response: str) -> Dict[str, Any]:
        """
        Attempt to parse an action from a text response.
        This handles cases where the operator returns action info in text_response instead of actions array.
        """
        try:
            # Try to find JSON in the text response
            import re
            json_match = re.search(r'```json\s*(\{.*?\})\s*```', text_response, re.DOTALL)
            if json_match:
                json_str = json_match.group(1)
                action_data = json.loads(json_str)
                
                # Extract coordinates and action type
                action_type = action_data.get("action", "click")
                action_input = action_data.get("action_input", {})
                
                if action_type == "click" and isinstance(action_input, dict):
                    x = action_input.get("x", 0)
                    y = action_input.get("y", 0)
                    return {
                        "action": "operator_click",
                        "action_input": f"{x},{y}",
                        "coordinates": [x, y],
                        "element_id": f"coord_{x}_{y}"
                    }
                elif action_type == "type" and isinstance(action_input, dict):
                    text = action_input.get("text", "")
                    return {
                        "action": "operator_type",
                        "action_input": text,
                        "text": text,
                        "element_id": "text_input"
                    }
                # Add more action types as needed
                
        except Exception as e:
            logger.warning(f"Could not parse JSON from text_response: {e}")
        
        # Fallback to simple text analysis
        text_lower = text_response.lower()
        if "click" in text_lower:
            # Try to extract coordinates from text
            import re
            coord_match = re.search(r'"x":\s*(\d+).*?"y":\s*(\d+)', text_response)
            if coord_match:
                x, y = int(coord_match.group(1)), int(coord_match.group(2))
                return {
                    "action": "operator_click",
                    "action_input": f"{x},{y}",
                    "coordinates": [x, y],
                    "element_id": f"coord_{x}_{y}"
                }
            return {"action": "operator_click", "action_input": "640,360", "coordinates": [640, 360], "element_id": "default_click"}
        elif "type" in text_lower:
            return {"action": "operator_type", "action_input": "", "text": "", "element_id": "type_action"}
        elif "scroll" in text_lower:
            return {"action": "operator_scroll", "action_input": "0,100", "scroll_x": 0, "scroll_y": 100, "element_id": "scroll_action"}
        elif "wait" in text_lower:
            return {"action": "operator_wait", "action_input": "1000", "ms": 1000, "element_id": "wait_action"}
        elif "final_answer" in text_lower or "complete" in text_lower or "finished" in text_lower:
            # Extract answer content if available
            answer_content = ""
            import re
            answer_match = re.search(r'(?:answer|result|content)[:：]\s*"([^"]*)"', text_response, re.IGNORECASE)
            if answer_match:
                answer_content = answer_match.group(1)
            elif "task complete" in text_lower:
                answer_content = "Task completed successfully"
            
            return {
                "action": "get_final_answer",
                "action_input": answer_content,
                "element_id": "final_answer"
            }
        else:
            return {"action": "operator_wait", "action_input": "1000", "ms": 1000, "element_id": "text_parse_fallback_wait"}
    
    def _load_rag_context(self, rag_path: str) -> str:
        """
        Load RAG context from file
        
        Args:
            rag_path: Path to RAG data file
            
        Returns:
            RAG context string
        """
        try:
            if os.path.exists(rag_path):
                with open(rag_path, 'r', encoding='utf-8') as f:
                    return f.read()
        except Exception as e:
            logger.error(f"Error loading RAG context: {e}")
        return ""
    
    def reset_conversation(self):
        """Reset the conversation history and optionally clear RAG constructors"""
        self.conversation_history.clear()
        self.current_screenshot = None
        if hasattr(self.operator_model, 'reset_conversation'):
            self.operator_model.reset_conversation()
    
    def clear_rag_cache(self):
        """Clear cached RAG constructors to free memory"""
        logger.info(f"🧹 Clearing RAG constructor cache ({len(self.rag_constructors)} constructors)")
        self.rag_constructors.clear()
    
    def get_rag_cache_status(self):
        """Get status of RAG constructor cache"""
        return {
            "cached_modes": list(self.rag_constructors.keys()),
            "cache_count": len(self.rag_constructors)
        }


class Planning:

    @staticmethod
    async def plan(
        config,
        user_request,
        text_model_name,
        previous_trace,
        observation,
        feedback,
        mode,
        observation_VforD,
        status_description,
        rag_enabled,
        rag_path,
        rag_mode="description",
        rag_log_dir=None,
        rag_cache_dir=None
    ):

        # select rag logger
        rag_logger = None
        logger_method = None
        if rag_log_dir is not None:
            if rag_enabled and rag_mode == "vision":
                rag_logger = VisionRAGLogger(rag_log_dir=rag_log_dir)
                logger_method = "log_vision_rag_step"
            else:
                rag_logger = RAGLogger(rag_log_dir=rag_log_dir)
                logger_method = "log_rag_step"
        
        # Get the current step index from previous_trace
        step_idx = len(previous_trace)
        # task id
        task_id = f"{user_request[:50]}_{int(time.time())}"
        if hasattr(config, 'task_id') and config.task_id:
            task_id = config.task_id
        
        gpt35 = GPTGenerator(model="gpt-3.5-turbo")
        gpt4v = GPTGenerator(model="gpt-4-turbo")

        all_json_models = config["model"]["json_models"]
        is_json_response = config["model"]["json_model_response"]

        llm_planning_text = create_llm_instance(
            text_model_name, is_json_response, all_json_models)

        modes = {
            "dom": DomMode(text_model=llm_planning_text),
            "dom_v_desc": DomVDescMode(visual_model=gpt4v, text_model=llm_planning_text),
            "vision_to_dom": VisionToDomMode(visual_model=gpt4v, text_model=llm_planning_text),
            "d_v": DVMode(visual_model=gpt4v),
            "vision": VisionMode(visual_model=gpt4v),
            "operator": OperatorMode(text_model=llm_planning_text)  # Add operator mode
        }

        if mode == "operator":
            # prompt logging parameters check
            prompt_logging_enabled = getattr(config, 'prompt_logging_enabled', False)
            prompt_logger = getattr(config, 'prompt_logger', None)
            task_uuid = getattr(config, 'task_uuid', None)
            step_idx = getattr(config, 'step_idx', 0)
            
            result = await modes[mode].execute(
                status_description=status_description,
                user_request=user_request,
                rag_enabled=rag_enabled,
                rag_path=rag_path,
                previous_trace=previous_trace,
                observation=observation,
                feedback=feedback,
                observation_VforD=observation_VforD,
                rag_mode=rag_mode,
                prompt_logging_enabled=prompt_logging_enabled,
                prompt_logger=prompt_logger,
                task_uuid=task_uuid,
                step_idx=step_idx,
                long_memory_context=getattr(config, 'long_memory_context', ""))
        else:
            if mode == "dom":
                # DOM mode supports RAG mode parameter
                result = await modes[mode].execute(
                    status_description=status_description,
                    user_request=user_request,
                    rag_enabled=rag_enabled,
                    rag_path=rag_path,
                    previous_trace=previous_trace,
                    observation=observation,
                    feedback=feedback,
                    observation_VforD=observation_VforD,
                    rag_mode=rag_mode,
                    rag_cache_dir=rag_cache_dir)
            else:
                # Other modes use original signature
                result = await modes[mode].execute(
                    status_description=status_description,
                    user_request=user_request,
                    rag_enabled=rag_enabled,
                    rag_path=rag_path,
                    previous_trace=previous_trace,
                    observation=observation,
                    feedback=feedback,
                    observation_VforD=observation_VforD)
        
        # Check if any RAG data is returned
        if len(result) >= 6 and mode in ["dom", "operator"]:  # Both DomMode and OperatorMode return rag_data
            planning_response, error_message, planning_response_thought, planning_response_action, planning_token_count, rag_data = result
        
            rag_data["mode"] = mode
            rag_data["user_request"] = user_request
            
            if rag_logger is not None and logger_method is not None:
                if logger_method == "log_vision_rag_step":
                    rag_logger.log_vision_rag_step(task_id, step_idx, rag_data)
                else:
                    rag_logger.log_rag_step(task_id, step_idx, rag_data)
        else:
            # Compatible with other patterns that do not return rag_data
            planning_response, error_message, planning_response_thought, planning_response_action, planning_token_count = result
        
            # log
            rag_data = {
                "mode": mode,
                "user_request": user_request,
                "rag_enabled": False
            }
            
            if rag_logger is not None and logger_method is not None:
                if logger_method == "log_vision_rag_step":
                    rag_logger.log_vision_rag_step(task_id, step_idx, rag_data)
                else:
                    rag_logger.log_rag_step(task_id, step_idx, rag_data)

        logger.info(f"\033[34mPlanning_Response:\n{planning_response}\033[0m")
        
        # Handle operator mode differently - it already parses the response
        if mode != "vision_to_dom" and mode != "operator":
            try:
                planning_response_thought, planning_response_action = ActionParser().extract_thought_and_action(
                    planning_response)
            except ResponseError as e:
                logger.error(f"Response Error:{e.message}")
                raise

        # Special handling for fill_form -> fill_search conversion
        if planning_response_action.get('action') == "fill_form":
            JudgeSearchbarRequest = JudgeSearchbarPromptConstructor().construct(
                input_element=observation, planning_response_action=planning_response_action)
            try:
                Judge_response, error_message = await gpt35.request(JudgeSearchbarRequest)
                if Judge_response.lower() == "yes":
                    planning_response_action['action'] = "fill_search"
            except:
                planning_response_action['action'] = "fill_form"

        # The description should include both the thought (returned by LLM) and the action (parsed from the planning response)
        planning_response_action["description"] = {
            "thought": planning_response_thought,
            "action": (
                f'{planning_response_action["action"]}: {planning_response_action["action_input"]}' if "description" not in planning_response_action.keys() else
                planning_response_action["description"])
            if mode in ["dom","d_v", "dom_v_desc", "vision_to_dom", "operator"] else (
                planning_response_action["action"] if "description" not in planning_response_action.keys() else
                planning_response_action["description"])
        }
        
        # Format action based on mode
        if mode in ["dom", "d_v", "dom_v_desc", "vision_to_dom", "operator"]:
            planning_response_action = {element: planning_response_action.get(
                element, "") for element in ["element_id", "action", "action_input", "description"]}
        elif mode == "vision":
            planning_response_action = {element: planning_response_action.get(
                element, "") for element in ["action", "description"]}
        
        logger.info("****************")
        # logger.info(planning_response_action)
        dict_to_write = {}
        if mode in ["dom", "d_v", "dom_v_desc", "vision_to_dom", "operator"]:
            dict_to_write['id'] = planning_response_action['element_id']
            dict_to_write['action_type'] = planning_response_action['action']
            dict_to_write['value'] = planning_response_action['action_input']
        elif mode == "vision":
            dict_to_write['action'] = planning_response_action['action']
        dict_to_write['description'] = planning_response_action['description']
        dict_to_write['error_message'] = error_message
        dict_to_write['planning_token_count'] = planning_token_count

        return dict_to_write
