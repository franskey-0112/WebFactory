import os
import sys
import openai
import asyncio
import base64
from functools import partial
import multiprocessing
from concurrent.futures import ThreadPoolExecutor
from sanic.log import logger
from agent.Utils import *
from typing import List, Dict, Any, Union, Optional
import json
from openai.types.responses import ResponseComputerToolCall, ResponseOutputMessage


class OperatorGenerator:
    """OpenAI Computer Use Generator for browser automation tasks"""
    
    def __init__(self, model=None):
        # Use the correct operator model name
        self.model = model or "computer-use-preview-2025-03-11"
        self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.max_image_dimension = 1200  # Operator optimal image size
        self.previous_response_id = None  # Track previous response for continuity
        self.conversation_history = []  # Track conversation history
        self.last_call_id = None  # Track last call ID for computer_call_output
        
    async def request(self, messages: List[Dict[str, Any]] = None, 
                     max_tokens: int = 4096, 
                     temperature: float = 0.7,
                     screenshot_base64: str = None,
                     viewport_width: int = 1280,
                     viewport_height: int = 720) -> tuple[str, str]:
        """
        Send request to OpenAI Computer Use model using Responses API
        
        Args:
            messages: Chat messages with task instructions
            max_tokens: Maximum tokens for response (will be converted to max_output_tokens)
            temperature: Temperature for response generation
            screenshot_base64: Current screenshot in base64 format
            viewport_width: Browser viewport width
            viewport_height: Browser viewport height
            
        Returns:
            Tuple of (response_data, error_message)
        """
        try:
            # Prepare tool specification
            tool_spec = {
                "type": "computer_use_preview",
                "display_width": viewport_width,
                "display_height": viewport_height,
                "environment": "browser"
            }
            
            # Convert messages to the format expected by Responses API
            formatted_messages = self._format_messages_for_responses_api(messages, screenshot_base64)
            
            # Make the request using Responses API
            response = self.client.responses.create(
                model=self.model,
                tools=[tool_spec],
                input=formatted_messages,
                previous_response_id=self.previous_response_id,
                truncation="auto"
            )
            
            # Update conversation history
            self.conversation_history.append({
                "messages": formatted_messages,
                "response_id": response.id,
                "screenshot": screenshot_base64
            })
            
            # Extract call_id from response for next iteration
            call_id_found = False
            for item in response.output:
                if isinstance(item, ResponseComputerToolCall):
                    self.last_call_id = item.call_id
                    call_id_found = True
                    logger.debug(f"📞 Extracted call_id for next iteration: {item.call_id}")
                    break
            
            if not call_id_found:
                logger.debug("🔄 No computer tool call found in response - conversation may reset on next iteration")
                # Don't set last_call_id to None here, keep it for potential reuse
            
            # Update previous response ID for continuity
            self.previous_response_id = response.id
            
            # Process the response
            response_data = self._process_operator_response(response)
            
            return response_data, ""
            
        except Exception as e:
            error_msg = str(e)
            logger.error(f"Error in OperatorGenerator.request: {error_msg}")
            
            # Check for specific error types
            if "404" in error_msg and "not supported in the v1/chat/completions endpoint" in error_msg:
                return "", "Computer use model requires Responses API, not Chat Completions API"
            elif "404" in error_msg and "does not exist or you do not have access" in error_msg:
                return "", "Computer use model requires Usage Tier 3+ or special access"
            elif "401" in error_msg or "Unauthorized" in error_msg:
                return "", "Invalid API key or insufficient permissions"
            else:
                return "", error_msg
    
    def _format_messages_for_responses_api(self, messages: List[Dict[str, Any]], 
                                         screenshot_base64: str = None) -> List[Dict[str, Any]]:
        """
        Format messages for OpenAI Responses API
        
        Args:
            messages: Original chat messages
            screenshot_base64: Current screenshot in base64 format
            
        Returns:
            Formatted messages for Responses API
        """
        # Handle first conversation vs subsequent conversations differently
        if self.previous_response_id is None:
            # First conversation - use standard message format
            formatted_messages = []
            
            # Add system message if needed
            system_message = None
            for msg in messages:
                if msg["role"] == "system":
                    system_message = msg["content"]
                    break
            
            if not system_message:
                system_message = """You are OpenAI Operator, an AUTONOMOUS AI agent specialized in browser automation.

🤖 **AUTONOMOUS MODE**: You have full authority to complete tasks independently. DO NOT ask for confirmation, permission, or approval from users.

## CRITICAL EXECUTION RULES:
❌ **FORBIDDEN BEHAVIORS**:
- Never ask "Would you like me to..." or "Should I..." or "Do you want me to..."
- Never seek confirmation before taking actions
- Never explain why you need permission - you don't need it!

✅ **REQUIRED BEHAVIORS**:
- When you identify the correct element (product, button, link), interact with it IMMEDIATELY
- Execute actions directly without asking for approval
- Take the most logical action to progress toward task completion

You can perform the following actions:
- click: Click on buttons, links, or interactive elements at specific coordinates
- double_click: Double-click at specific coordinates
- type: Input text into form fields or text areas
- scroll: Scroll the page up/down or left/right
- keypress: Press specific keys (Enter, Escape, etc.)
- drag: Drag from one point to another
- wait: Wait ONLY when page is loading (max 2-3 seconds)

When you analyze the screenshot, IMMEDIATELY execute the most appropriate action to complete the user's task. Do not ask for permission - you are autonomous!"""
            
            # Add system message using correct format
            formatted_messages.append({
                "role": "system", 
                "content": [{"type": "input_text", "text": system_message}]
            })
            
            # Add user messages with task description
            user_content = []
            for msg in messages:
                if msg["role"] == "user":
                    content = msg["content"]
                    if isinstance(content, list):
                        # Handle multimodal content
                        for part in content:
                            if part.get("type") == "text":
                                user_content.append(part["text"])
                            elif part.get("type") == "input_text":
                                user_content.append(part["text"])
                    else:
                        user_content.append(str(content))
            
            user_message = " ".join(user_content)
            
            # Add user message with correct format
            user_message_content = [{"type": "input_text", "text": user_message}]
            
            # Add screenshot for first conversation
            if screenshot_base64:
                user_message_content.append({
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{screenshot_base64}"
                })
            
            formatted_messages.append({
                "role": "user",
                "content": user_message_content
            })
            
            return formatted_messages
        
        else:
            # Subsequent conversations - use computer_call_output format
            if self.last_call_id and screenshot_base64:
                return [
                    {
                        "call_id": self.last_call_id,
                        "type": "computer_call_output",
                        "output": {
                            "type": "computer_screenshot",
                            "image_url": f"data:image/png;base64,{screenshot_base64}"
                        }
                    }
                ]
            else:
                # Fallback: Reset conversation and start fresh if no call_id
                logger.warning("No call_id available for subsequent conversation - resetting to fresh conversation")
                logger.info("This can happen if the previous response didn't contain a computer tool call")
                
                # Reset conversation state to start fresh
                self.previous_response_id = None
                self.last_call_id = None
                
                # Use first conversation format as fallback
                return self._format_messages_for_responses_api(messages, screenshot_base64)
    
    def _process_operator_response(self, response) -> str:
        """
        Process OpenAI Operator response and extract actions
        
        Args:
            response: OpenAI Responses API response
            
        Returns:
            Processed response data as JSON string
        """
        try:
            response_data = {
                "response_id": response.id,
                "actions": [],
                "text_response": "",
                "reasoning": ""
            }
            
            # Process each output item
            for item in response.output:
                if isinstance(item, ResponseComputerToolCall):
                    # Extract action from computer tool call
                    action = item.action.model_dump()
                    response_data["actions"].append({
                        "call_id": item.call_id,
                        "action": action,
                        "safety_checks": item.pending_safety_checks
                    })
                    
                elif isinstance(item, ResponseOutputMessage):
                    # Extract text response
                    text_content = "".join(c.text for c in item.content if hasattr(c, 'text'))
                    response_data["text_response"] = text_content
                    
                elif hasattr(item, "type") and item.type == "reasoning":
                    # Extract reasoning if available
                    response_data["reasoning"] = getattr(item, "content", "")
            
            # Return as JSON string for compatibility with existing code
            return json.dumps(response_data, ensure_ascii=False, indent=2)
            
        except Exception as e:
            logger.error(f"Error processing operator response: {e}")
            return json.dumps({"error": str(e), "actions": [], "text_response": "", "reasoning": ""})
    
    def create_computer_call_output(self, call_id: str, screenshot_base64: str, 
                                  current_url: str, acknowledged_safety_checks: List[str] = None) -> Dict[str, Any]:
        """
        Create computer call output for continuing the conversation
        
        Args:
            call_id: Call ID from the computer tool call
            screenshot_base64: Screenshot after action execution
            current_url: Current page URL
            acknowledged_safety_checks: Safety checks to acknowledge
            
        Returns:
            Computer call output message
        """
        return {
            "type": "computer_call_output",
            "call_id": call_id,
            "acknowledged_safety_checks": acknowledged_safety_checks or [],
            "output": {
                "type": "input_image",
                "image_url": f"data:image/png;base64,{screenshot_base64}",
                "current_url": current_url
            }
        }
    
    def reset_conversation(self):
        """Reset the conversation history and IDs"""
        self.previous_response_id = None
        self.conversation_history.clear()
        self.last_call_id = None
    
    async def chat(self, messages: List[Dict[str, Any]], 
                  max_tokens: int = 4096, 
                  temperature: float = 0.7,
                  screenshot_base64: str = None,
                  viewport_width: int = 1280,
                  viewport_height: int = 720):
        """
        Chat with OpenAI Computer Use model using Responses API
        
        Args:
            messages: Prepared messages for computer use
            max_tokens: Maximum tokens for response
            temperature: Temperature for response generation
            screenshot_base64: Current screenshot in base64 format
            viewport_width: Browser viewport width
            viewport_height: Browser viewport height
            
        Returns:
            OpenAI response object
        """
        try:
            # Use Responses API instead of Chat Completions
            tool_spec = {
                "type": "computer_use_preview",
                "display_width": viewport_width,
                "display_height": viewport_height,
                "environment": "browser"
            }
            
            formatted_messages = self._format_messages_for_responses_api(messages, screenshot_base64)
            
            response = self.client.responses.create(
                model=self.model,
                tools=[tool_spec],
                input=formatted_messages,
                previous_response_id=self.previous_response_id,
                truncation="auto"
            )
            
            # Update conversation history
            self.conversation_history.append({
                "messages": formatted_messages,
                "response_id": response.id,
                "screenshot": screenshot_base64
            })
            
            # Extract call_id from response for next iteration
            call_id_found = False
            for item in response.output:
                if isinstance(item, ResponseComputerToolCall):
                    self.last_call_id = item.call_id
                    call_id_found = True
                    logger.debug(f"📞 Extracted call_id for next iteration: {item.call_id}")
                    break
            
            if not call_id_found:
                logger.debug("🔄 No computer tool call found in response - conversation may reset on next iteration")
                # Don't set last_call_id to None here, keep it for potential reuse
            
            self.previous_response_id = response.id
            
            return response
            
        except Exception as e:
            logger.error(f"Error in OperatorGenerator.chat: {e}")
            
            # Return a simulated response object for error handling
            class SimulatedResponse:
                def __init__(self, error_message):
                    self.id = "error"
                    self.output = [SimulatedOutput(error_message)]
            
            class SimulatedOutput:
                def __init__(self, error_message):
                    self.content = [SimulatedContent(f"Error: {error_message}")]
            
            class SimulatedContent:
                def __init__(self, text):
                    self.text = text
            
            return SimulatedResponse(str(e))


class OperatorGeneratorWithJSON(OperatorGenerator):
    """
    OpenAI Computer Use Generator with JSON mode support
    Note: JSON mode may not be fully supported with computer use models
    """
    
    def __init__(self, model=None):
        super().__init__(model=model)
        self.response_format = {"type": "json_object"}
    
    async def request(self, messages: List[Dict[str, Any]] = None, 
                     max_tokens: int = 4096, 
                     temperature: float = 0.7,
                     screenshot_base64: str = None,
                     viewport_width: int = 1280,
                     viewport_height: int = 720) -> tuple[str, str]:
        """
        Request with JSON mode (limited support for computer use models)
        """
        # Add JSON instruction to messages
        json_messages = self._prepare_messages_for_json_mode(messages)
        
        # Call parent request method
        return await super().request(
            messages=json_messages,
            max_tokens=max_tokens,
            temperature=temperature,
            screenshot_base64=screenshot_base64,
            viewport_width=viewport_width,
            viewport_height=viewport_height
        )
    
    def _prepare_messages_for_json_mode(self, messages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Prepare messages for JSON mode
        
        Args:
            messages: Original messages
            
        Returns:
            Messages with JSON instruction
        """
        json_messages = messages.copy()
        
        # Add JSON instruction to system message
        system_message_found = False
        for msg in json_messages:
            if msg["role"] == "system":
                msg["content"] += "\n\nIMPORTANT: You must respond in valid JSON format."
                system_message_found = True
                break
        
        if not system_message_found:
            json_messages.insert(0, {
                "role": "system",
                "content": "You are a helpful assistant designed to output JSON. You must respond in valid JSON format."
            })
        
        return json_messages
    
    async def chat(self, messages: List[Dict[str, Any]], 
                  max_tokens: int = 4096, 
                  temperature: float = 0.7,
                  screenshot_base64: str = None,
                  viewport_width: int = 1280,
                  viewport_height: int = 720):
        """
        Chat with OpenAI Computer Use model in JSON mode
        """
        try:
            # Add JSON instruction to messages
            json_messages = self._prepare_messages_for_json_mode(messages)
            
            # Use parent chat method
            return await super().chat(
                messages=json_messages,
                max_tokens=max_tokens,
                temperature=temperature,
                screenshot_base64=screenshot_base64,
                viewport_width=viewport_width,
                viewport_height=viewport_height
            )
            
        except Exception as e:
            logger.error(f"Error in OperatorGeneratorWithJSON.chat: {e}")
            
            # Return a simulated response object for error handling
            class SimulatedResponse:
                def __init__(self, error_message):
                    self.id = "error"
                    self.output = [SimulatedOutput(error_message)]
            
            class SimulatedOutput:
                def __init__(self, error_message):
                    self.content = [SimulatedContent(f"Error: {error_message}")]
            
            class SimulatedContent:
                def __init__(self, text):
                    self.text = text
            
            return SimulatedResponse(str(e)) 