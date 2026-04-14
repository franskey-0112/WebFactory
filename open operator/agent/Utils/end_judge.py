"""
End Judge Module for Operator Mode
use GPT-4o to analyze task description and current screenshot, 
determine if the task is completed, 
and detect network problems, human verification, and login problems
"""
import logging
import json
import time
from typing import Dict, Any, Optional, Tuple
from dataclasses import dataclass
from enum import Enum

logger = logging.getLogger(__name__)


class EndJudgeMode(Enum):
    """End judge mode enumeration"""
    DISABLED = "disabled"       # disabled end judge
    ENABLED = "enabled"         # enabled end judge
    STRICT = "strict"           # strict mode (higher completion standard)


class ErrorType(Enum):
    """error type enumeration"""
    NETWORK_ERROR = "network_error"           # network error (403, 404, 502, etc.)
    ACCESS_DENIED = "access_denied"           # access denied
    CAPTCHA_REQUIRED = "captcha_required"     # captcha required
    LOGIN_REQUIRED = "login_required"         # login required
    RATE_LIMITED = "rate_limited"             # rate limited
    SERVER_ERROR = "server_error"             # server error
    NONE = "none"                             # no error


@dataclass
class EndJudgeConfig:
    """End judge configuration"""
    mode: EndJudgeMode = EndJudgeMode.DISABLED
    model_name: str = "gpt-4o"
    max_tokens: int = 1500
    temperature: float = 0.1
    confidence_threshold: float = 0.8
    min_steps: int = 2 # minimum steps to start end judge
    consecutive_error_threshold: int = 2  # consecutive error threshold
    
    def __post_init__(self):
        """validate configuration parameters"""
        if self.confidence_threshold < 0 or self.confidence_threshold > 1:
            raise ValueError("confidence_threshold must be between 0 and 1")
        if self.min_steps < 0:
            raise ValueError("min_steps must be non-negative")
        if self.consecutive_error_threshold < 1:
            raise ValueError("consecutive_error_threshold must be at least 1")


class EndJudge:
    """
    task end judge
    
    use GPT-4o to analyze task description and current screenshot, 
    determine if the task is completed, 
    and detect network problems, human verification, and login problems
    """
    
    def __init__(self, config: Optional[EndJudgeConfig] = None):
        self.config = config or EndJudgeConfig()
        self.gpt4o_client = None
        self._init_gpt4o_client()
        
        # consecutive error tracking
        self.consecutive_errors = 0
        self.last_error_type = None
        self.error_history = []  # record recent error history
        
        # logger.info(f"EndJudge initialized with mode: {self.config.mode.value}")
        logger.info(f"EndJudge consecutive error threshold: {self.config.consecutive_error_threshold}")
    
    def _init_gpt4o_client(self):
        """initialize GPT-4o client"""
        try:
            import os
            from openai import OpenAI
            
            api_key = os.getenv('OPENAI_API_KEY')
            if api_key:
                self.gpt4o_client = OpenAI(api_key=api_key)
                logger.info("🤖 GPT-4o client initialized successfully for end judge")
            else:
                logger.warning("⚠️  OpenAI API key not found, end judge will be disabled")
                self.config.mode = EndJudgeMode.DISABLED
        except Exception as e:
            logger.error(f"❌ GPT-4o client initialization failed: {e}")
            self.config.mode = EndJudgeMode.DISABLED
    
    def is_enabled(self) -> bool:
        """check if end judge is enabled"""
        return (self.config.mode != EndJudgeMode.DISABLED and 
                self.gpt4o_client is not None)
    
    async def should_judge_now(self, current_step: int, task_name: str) -> bool:
        """
        check if should judge now
        
        Args:
            current_step: current step
            task_name: task name
            
        Returns:
            bool: whether to judge now
        """
        if not self.is_enabled():
            return False
        
        # minimum steps check
        if current_step < self.config.min_steps:
            return False
        
        # information task more frequently
        info_keywords = ["tell me", "find", "what", "how", "explain", "describe", "information"]
        is_info_task = any(keyword in task_name.lower() for keyword in info_keywords)
        
        if is_info_task:
            # information task every 2 steps
            return current_step % 2 == 0
        else:
            # other tasks every 3 steps
            return current_step % 3 == 0
    
    async def judge_completion_and_errors(self, task_description: str, screenshot_base64: str, 
                                        previous_actions: str = "", current_step: int = 0) -> Tuple[bool, Dict[str, Any]]:
        """
        use GPT-4o to judge if the task is completed and detect various errors
        
        Args:
            task_description: task description
            screenshot_base64: current screenshot base64 encoded
            previous_actions: previous actions history
            current_step: current step
            
        Returns:
            Tuple[bool, Dict]: (whether to stop task, judgment result details)
        """
        if not self.is_enabled():
            return False, {"error": "End judge is disabled"}
        
        try:
            logger.info(f"🔍 End judge evaluation at step {current_step}")
            
            # build enhanced judgment prompt
            prompt = self._build_enhanced_judge_prompt(task_description, previous_actions, current_step)
            message_content = [
                {"type": "text", "text": prompt},
                {"type": "text", "text": "\n**Current Webpage Screenshot:**"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{screenshot_base64}",
                        "detail": "high"
                    }
                }
            ]
            
            start_time = time.time()
            if not self.gpt4o_client:
                raise Exception("GPT-4o client not initialized")
            
            response = self.gpt4o_client.chat.completions.create(
                model=self.config.model_name,
                messages=[{"role": "user", "content": message_content}],
                max_tokens=self.config.max_tokens,
                temperature=self.config.temperature
            )
            
            response_time = time.time() - start_time
            response_text = response.choices[0].message.content or ""
            
            logger.info(f"🤖 GPT-4o end judge response (took {response_time:.2f}s): {response_text[:200]}...")
            
            judgment_result = self._parse_enhanced_judgment_response(response_text)
            
            judgment_result.update({
                "model_used": self.config.model_name,
                "response_time_seconds": response_time,
                "input_tokens": response.usage.prompt_tokens if response.usage else 0,
                "output_tokens": response.usage.completion_tokens if response.usage else 0,
                "raw_response": response_text,
                "step_evaluated": current_step
            })
            
            # consecutive error detection logic
            error_type = judgment_result.get("error_type", ErrorType.NONE.value)
            has_critical_error = judgment_result.get("has_critical_error", False)
            
            # update error history
            self.error_history.append({
                "step": current_step,
                "error_type": error_type,
                "has_critical_error": has_critical_error,
                "timestamp": time.time()
            })
            
            # only keep recent 10 error history
            if len(self.error_history) > 10:
                self.error_history = self.error_history[-10:]
            
            should_stop_due_to_consecutive_errors = False
            
            if error_type != ErrorType.NONE.value and has_critical_error:
                # check if it is the same type of consecutive error
                if error_type == self.last_error_type:
                    self.consecutive_errors += 1
                else:
                    # different type of error, reset count
                    self.consecutive_errors = 1
                    self.last_error_type = error_type
                
                logger.warning(f"🚨 Critical error detected: {error_type} (consecutive count: {self.consecutive_errors})")
                logger.warning(f"📝 Error details: {judgment_result.get('error_details', '')}")
                
                # check if the consecutive error threshold is reached
                if self.consecutive_errors >= self.config.consecutive_error_threshold:
                    should_stop_due_to_consecutive_errors = True
                    logger.error(f"🛑 STOPPING TASK: {self.consecutive_errors} consecutive '{error_type}' errors detected (threshold: {self.config.consecutive_error_threshold})")
                    
                    # update judgment result, mark should stop task
                    judgment_result["should_stop_task"] = True
                    judgment_result["consecutive_error_count"] = self.consecutive_errors
                    judgment_result["consecutive_error_threshold_reached"] = True
                else:
                    logger.warning(f"⚠️  Consecutive error {self.consecutive_errors}/{self.config.consecutive_error_threshold} detected, continuing task...")
                    judgment_result["should_stop_task"] = False
                    judgment_result["consecutive_error_count"] = self.consecutive_errors
                    judgment_result["consecutive_error_threshold_reached"] = False
            else:
                if self.consecutive_errors > 0:
                    # logger.info(f"✅ No critical errors detected, resetting consecutive error count (was {self.consecutive_errors})")
                    pass
                self.consecutive_errors = 0
                self.last_error_type = None
                judgment_result["consecutive_error_count"] = 0
                judgment_result["consecutive_error_threshold_reached"] = False
            
            # return whether to stop task
            if should_stop_due_to_consecutive_errors:
                return True, judgment_result
            
            is_completed = judgment_result.get("is_completed", False)
            confidence = judgment_result.get("confidence", 0.0)
            
            if is_completed and confidence >= self.config.confidence_threshold:
                logger.info(f"✅ End judge determined task is COMPLETED (confidence: {confidence:.2f})")
                return True, judgment_result
            elif is_completed:
                logger.info(f"⚠️  End judge suggests completion but confidence too low: {confidence:.2f} < {self.config.confidence_threshold}")
                return False, judgment_result
            else:
                logger.info(f"🔄 End judge determined task is NOT completed (confidence: {confidence:.2f})")
                return False, judgment_result
                
        except Exception as e:
            logger.error(f"❌ End judge evaluation failed: {e}")
            import traceback
            logger.error(f"Full traceback: {traceback.format_exc()}")
            
            return False, {
                "error": str(e),
                "step_evaluated": current_step,
                "evaluation_failed": True
            }
    
    async def judge_completion(self, task_description: str, screenshot_base64: str, 
                             previous_actions: str = "", current_step: int = 0) -> Tuple[bool, Dict[str, Any]]:
        """keep backward compatibility, call enhanced judgment method"""
        return await self.judge_completion_and_errors(task_description, screenshot_base64, previous_actions, current_step)
    
    def _build_enhanced_judge_prompt(self, task_description: str, previous_actions: str, current_step: int) -> str:
        """build enhanced judgment prompt, including error detection"""
        
        if self.config.mode == EndJudgeMode.STRICT:
            completion_criteria = """
**STRICT COMPLETION CRITERIA:**
- ALL task requirements must be 100% fulfilled
- All specified information must be clearly visible and complete
- For purchase tasks: items must be in cart AND checkout process initiated
- For search tasks: results must be displayed AND relevant items identified
- For information tasks: complete answer must be visible on screen
"""
        else:
            completion_criteria = """
**STANDARD COMPLETION CRITERIA:**
- Main task objective has been achieved
- Required information is available or action has been performed
- For purchase tasks: relevant items have been found and added to cart
- For search tasks: search results are displayed with relevant content
- For information tasks: answer information is visible on the current page
"""
        
        prompt = f"""You are an expert web task completion and error detection evaluator. Your job is to:
1. Determine if a web automation task has been completed
2. Detect critical errors that should stop the task immediately

**TASK TO EVALUATE:**
{task_description}

**CURRENT STEP:** {current_step}

**PREVIOUS ACTIONS SUMMARY:**
{previous_actions if previous_actions else "No previous actions recorded"}

{completion_criteria}

**CRITICAL ERROR DETECTION:**
Carefully examine the screenshot for these critical issues that require immediate task termination:

🚫 **NETWORK ERRORS:**
- HTTP error pages (403 Forbidden, 404 Not Found, 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable)
- "Access Denied" or "Permission Denied" messages
- "This site can't be reached" or connection timeout errors
- Cloudflare error pages or similar proxy errors

🤖 **CAPTCHA/HUMAN VERIFICATION:**
- CAPTCHA challenges (image puzzles, text verification, "I'm not a robot" checkboxes)
- "Verify you are human" prompts
- reCAPTCHA widgets
- Any form of bot detection or human verification

🔐 **LOGIN/AUTHENTICATION REQUIRED:**
- Login forms or "Sign in required" messages
- "Please log in to continue" or similar authentication prompts
- Account creation requirements
- Subscription or payment walls that block access

🚦 **RATE LIMITING:**
- "Too many requests" messages
- "Rate limit exceeded" warnings
- Temporary access restrictions

**EVALUATION INSTRUCTIONS:**
1. **FIRST**: Check for critical errors that should stop the task
2. **THEN**: If no critical errors, evaluate task completion
3. Provide confidence scores and detailed reasoning
4. Be conservative: only mark as completed if you're confident the task is truly done

**RESPONSE FORMAT (JSON):**
```json
{{
    "has_critical_error": true/false,
    "error_type": "network_error|access_denied|captcha_required|login_required|rate_limited|server_error|none",
    "error_details": "Specific description of the error if found",
    "should_stop_task": true/false,
    "is_completed": true/false,
    "confidence": 0.0-1.0,
    "reasoning": "Detailed explanation of task completion status and any errors",
    "final_result_response": "If completed, describe what was accomplished",
    "next_suggested_action": "If not completed and no errors, suggest what should be done next",
    "completion_evidence": "Specific visual elements that indicate completion/incompletion",
    "error_evidence": "Specific visual elements that indicate errors if any"
}}
```

**PRIORITY ORDER:**
1. Critical errors (network, captcha, login) → should_stop_task: true
2. Task completion → is_completed: true
3. Continue task → both false, provide suggestions

Please analyze the screenshot and provide your comprehensive evaluation:"""

        return prompt
    
    def _parse_enhanced_judgment_response(self, response_text: str) -> Dict[str, Any]:
        """parse enhanced GPT-4o judgment response, including error detection"""
        try:
            import re
            json_match = re.search(r'```json\s*(\{.*?\})\s*```', response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group(1)
                judgment_data = json.loads(json_str)
            else:
                judgment_data = json.loads(response_text)

            has_critical_error = judgment_data.get("has_critical_error", False)
            error_type = judgment_data.get("error_type", "none")
            error_details = judgment_data.get("error_details", "")
            should_stop_task = judgment_data.get("should_stop_task", False)
            is_completed = judgment_data.get("is_completed", False)
            confidence = float(judgment_data.get("confidence", 0.0))
            reasoning = judgment_data.get("reasoning", "")
            final_result_response = judgment_data.get("final_result_response", "")
            
            confidence = max(0.0, min(1.0, confidence))
            
            return {
                "has_critical_error": bool(has_critical_error),
                "error_type": error_type,
                "error_details": error_details,
                "should_stop_task": bool(should_stop_task),
                "is_completed": bool(is_completed),
                "confidence": confidence,
                "reasoning": reasoning,
                "final_result_response": final_result_response,
                "next_suggested_action": judgment_data.get("next_suggested_action", ""),
                "completion_evidence": judgment_data.get("completion_evidence", ""),
                "error_evidence": judgment_data.get("error_evidence", ""),
                "parse_success": True
            }
            
        except Exception as e:
            logger.warning(f"⚠️  Failed to parse JSON response, using text analysis: {e}")
            
            response_lower = response_text.lower()
            
            error_type = ErrorType.NONE.value
            has_critical_error = False
            should_stop_task = False
            error_details = ""
            
            network_indicators = ["403", "404", "500", "502", "503", "access denied", "permission denied", 
                                "can't be reached", "connection timeout", "cloudflare"]
            if any(indicator in response_lower for indicator in network_indicators):
                error_type = ErrorType.NETWORK_ERROR.value
                has_critical_error = True
                should_stop_task = True
                error_details = "Network or access error detected in screenshot"
            
            captcha_indicators = ["captcha", "verify you are human", "i'm not a robot", "recaptcha", 
                                "human verification", "bot detection"]
            if any(indicator in response_lower for indicator in captcha_indicators):
                error_type = ErrorType.CAPTCHA_REQUIRED.value
                has_critical_error = True
                should_stop_task = True
                error_details = "CAPTCHA or human verification required"
            
            login_indicators = ["sign in", "log in", "login required", "please log in", "authentication required",
                              "account required", "subscription required", "payment wall"]
            if any(indicator in response_lower for indicator in login_indicators):
                error_type = ErrorType.LOGIN_REQUIRED.value
                has_critical_error = True
                should_stop_task = True
                error_details = "Login or authentication required"
            
            rate_limit_indicators = ["too many requests", "rate limit", "temporary restriction"]
            if any(indicator in response_lower for indicator in rate_limit_indicators):
                error_type = ErrorType.RATE_LIMITED.value
                has_critical_error = True
                should_stop_task = True
                error_details = "Rate limiting detected"
            
            completion_indicators = ["is_completed\": true", "completed: true", "task is complete", "task completed"]
            is_completed = any(indicator in response_lower for indicator in completion_indicators)
            
            confidence_match = re.search(r'"confidence":\s*([\d.]+)', response_text)
            confidence = float(confidence_match.group(1)) if confidence_match else 0.5
            
            # reasoning
            reasoning_match = re.search(r'"reasoning":\s*"([^"]*)"', response_text, re.DOTALL)
            reasoning = reasoning_match.group(1) if reasoning_match else response_text[:300]
            
            # final_result_response
            result_match = re.search(r'"final_result_response":\s*"([^"]*)"', response_text, re.DOTALL)
            final_result_response = result_match.group(1) if result_match else ""
            
            return {
                "has_critical_error": has_critical_error,
                "error_type": error_type,
                "error_details": error_details,
                "should_stop_task": should_stop_task,
                "is_completed": is_completed,
                "confidence": max(0.0, min(1.0, confidence)),
                "reasoning": reasoning,
                "final_result_response": final_result_response,
                "next_suggested_action": "",
                "completion_evidence": "",
                "error_evidence": "",
                "parse_success": False,
                "raw_response": response_text
            }

    def _build_judge_prompt(self, task_description: str, previous_actions: str, current_step: int) -> str:
        """build judgment prompt (keep backward compatibility)"""
        return self._build_enhanced_judge_prompt(task_description, previous_actions, current_step)
    
    def _parse_judgment_response(self, response_text: str) -> Dict[str, Any]:
        """parse judgment response (keep backward compatibility)"""
        return self._parse_enhanced_judgment_response(response_text)

    def get_consecutive_error_status(self) -> Dict[str, Any]:
        """
        get current status of consecutive error detection
        
        Returns:
            Dict: consecutive error detection status information
        """
        return {
            "consecutive_errors": self.consecutive_errors,
            "last_error_type": self.last_error_type,
            "consecutive_threshold": self.config.consecutive_error_threshold,
            "error_history_count": len(self.error_history),
            "recent_errors": self.error_history[-3:] if self.error_history else []  # 最近3次错误
        }
    
    def reset_consecutive_error_tracking(self):
        """reset consecutive error tracking status"""
        self.consecutive_errors = 0
        self.last_error_type = None
        self.error_history = []
        logger.info("🔄 Consecutive error tracking has been reset")


def create_end_judge(mode: str = "disabled", model_name: str = "gpt-4o", 
                    confidence_threshold: float = 0.8, min_steps: int = 2,
                    consecutive_error_threshold: int = 2) -> EndJudge:
    """
    convenient creation of task end judge
    
    Args:
        mode: judgment mode ("disabled", "enabled", "strict")
        model_name: model name used
        confidence_threshold: completion confidence threshold
        min_steps: minimum steps to start end judge
        consecutive_error_threshold: consecutive error detection threshold, stop task if consecutive error threshold is reached
        
    Returns:
        EndJudge: end judge instance
    """
    try:
        end_judge_mode = EndJudgeMode(mode)
    except ValueError:
        logger.warning(f"Invalid end judge mode: {mode}, defaulting to disabled")
        end_judge_mode = EndJudgeMode.DISABLED
    
    config = EndJudgeConfig(
        mode=end_judge_mode,
        model_name=model_name,
        confidence_threshold=confidence_threshold,
        min_steps=min_steps,
        consecutive_error_threshold=consecutive_error_threshold
    )
    
    return EndJudge(config) 