"""
Task completion manager — unified logic for deciding when a task is done in operator mode.

Handles: final-answer detection, reward-based completion, loop detection, step limits,
and GPT-4o end-judge integration.
"""
import logging
from dataclasses import dataclass
from typing import Dict, Any, Optional, Tuple, List
from enum import Enum
import re

logger = logging.getLogger(__name__)


class TaskCompletionReason(Enum):
    """Task completion reason enumeration"""
    FINAL_ANSWER = "final_answer"           # completed by get_final_answer action
    REWARD_FINISHED = "reward_finished"     # completed by reward evaluation
    END_JUDGE_FINISHED = "end_judge_finished"  # completed by GPT-4o end judge
    CRITICAL_ERROR = "critical_error"       # critical error (network, human verification, login, etc.)
    LOOP_DETECTED = "loop_detected"         # detected loop behavior
    LOW_PERFORMANCE = "low_performance"     # persistent low performance
    STEP_LIMIT = "step_limit"              # reached step limit
    PLANNING_ERROR = "planning_error"       # planning error
    NAVIGATION_ERROR = "navigation_error"   # navigation error
    UNKNOWN = "unknown"                     # unknown reason


@dataclass
class TaskCompletionConfig:
    """Configuration for task-completion heuristics."""
    max_steps: int = 50                    # maximum allowed steps
    loop_threshold: int = 5                # consecutive low-score steps before loop is declared
    low_performance_threshold: int = 8     # consecutive low-score steps before low-performance termination
    perfect_score: int = 10                # score treated as task success
    loop_score: int = 1                    # score at or below which a step counts as a loop step
    low_performance_score: int = 3         # score threshold for low-performance counting
    
    def __post_init__(self):
        """Verify the rationality of configuration parameters"""
        if self.loop_threshold <= 0:
            raise ValueError("loop_threshold must be positive")
        if self.low_performance_threshold <= 0:
            raise ValueError("low_performance_threshold must be positive")
        if self.perfect_score <= 0:
            raise ValueError("perfect_score must be positive")


class TaskCompletionManager:
    """
    Central manager for task-completion logic.

    Responsibilities:
    - Action-based completion (get_final_answer)
    - Reward-based completion
    - Loop detection
    - Low-performance termination
    - Step-limit enforcement
    """
    
    def __init__(self, config: Optional[TaskCompletionConfig] = None):
        self.config = config or TaskCompletionConfig()
        self.consecutive_low_scores = 0
        self.total_reward_score = 0
        self.step_count = 0
        self.task_finished = False
        self.task_global_status = ""
        self.completion_reason: Optional[TaskCompletionReason] = None
        
        logger.info(f"TaskCompletionManager initialized with config: {self.config}")
    
    def reset(self):
        """Reset all state for a new task."""
        self.consecutive_low_scores = 0
        self.total_reward_score = 0
        self.step_count = 0
        self.task_finished = False
        self.task_global_status = ""
        self.completion_reason = None
        logger.info("TaskCompletionManager reset for new task")
    
    def increment_step(self):
        """Increment the step counter by one."""
        self.step_count += 1
    
    def check_action_completion(self, action_dict: Dict[str, Any]) -> bool:
        """
        Check action-based completion conditions.

        Args:
            action_dict: Action dictionary from the agent

        Returns:
            True if the task should be considered complete
        """
        action_type = action_dict.get("action", "")
        
        if action_type == "get_final_answer":
            # Check if there is meaningful answer content
            answer_content = action_dict.get("action_input", "")
            if answer_content and len(answer_content.strip()) > 0:
                logger.info(f"✅ Task completed by final answer action with content: {answer_content[:100]}...")
            else:
                logger.info("✅ Task completed by final answer action!")
            
            self.task_finished = True
            self.completion_reason = TaskCompletionReason.FINAL_ANSWER
            return True
        
        # Check other possible completion signals
        action_input = action_dict.get("action_input", "").lower()
        description = str(action_dict.get("description", "")).lower()
        
        # If the action description contains completion signals
        completion_keywords = ["task complete", "finished", "done", "completed successfully"]
        if any(keyword in description for keyword in completion_keywords):
            logger.info(f"✅ Task completion detected in action description: {description[:100]}...")
            self.task_finished = True
            self.completion_reason = TaskCompletionReason.FINAL_ANSWER
            return True
        
        return False
    
    def check_information_task_completion(self, user_request: str, recent_thoughts: List[str], 
                                        current_thought: str = "") -> bool:
        """
        check if information task is completed
        
        Args:
            user_request: user task request
            recent_thoughts: recent thoughts content list
            current_thought: current thought content
            
        Returns:
            bool: whether to complete task
        """
        # detect information task
        info_task_patterns = [
            r"tell me.*about",
            r"find.*information",
            r"what.*need",
            r"how.*work",
            r"explain.*",
            r"describe.*",
            r"what is",
            r"what are",
            r"information about"
        ]
        
        is_info_task = any(re.search(pattern, user_request.lower()) for pattern in info_task_patterns)
        
        if not is_info_task:
            return False
        
        # check if there are repeated detailed information content
        all_thoughts = recent_thoughts + ([current_thought] if current_thought else [])
        
        # filter out thoughts containing substantial content (length > 50 and not generic description)
        substantial_thoughts = []
        generic_descriptions = [
            "clicking on an element to interact with it",
            "scrolling to view more content", 
            "waiting for page elements to load",
            "taking a screenshot to analyze current state",
            "executing keypress action"
        ]
        
        for thought in all_thoughts:
            if (thought and len(thought) > 50 and 
                not any(generic in thought.lower() for generic in generic_descriptions)):
                substantial_thoughts.append(thought.strip())
        
        # check if recent thoughts contain repeated detailed information
        if len(substantial_thoughts) >= 3:
            last_three = substantial_thoughts[-3:]
            
            similarity_count = 0
            for i in range(len(last_three)):
                for j in range(i + 1, len(last_three)):
                    thought1_words = set(last_three[i].lower().split())
                    thought2_words = set(last_three[j].lower().split())
                    
                    if len(thought1_words) > 10 and len(thought2_words) > 10:
                        intersection = thought1_words.intersection(thought2_words)
                        union = thought1_words.union(thought2_words)
                        similarity = len(intersection) / len(union) if union else 0
                        
                        if similarity > 0.7:
                            similarity_count += 1
            
            if similarity_count >= 1 and len(last_three[-1]) > 100:
                logger.info(f"🎯 Information task completion detected: High similarity in recent thoughts")
                logger.info(f"📝 Detected answer content: {last_three[-1][:150]}...")
                
                self.task_finished = True
                self.completion_reason = TaskCompletionReason.FINAL_ANSWER
                return True
        
        if current_thought and len(current_thought) > 100:
            task_keywords = user_request.lower().split()
            content_keywords = current_thought.lower().split()
            
            keyword_matches = sum(1 for keyword in task_keywords 
                                if keyword in content_keywords and len(keyword) > 3)
            
            # if current thought contains enough task keywords and content is detailed
            if keyword_matches >= 2 and len(current_thought) > 150:
                logger.info(f"🎯 Information task completion detected: Detailed answer found")
                logger.info(f"📝 Answer content: {current_thought[:200]}...")
                
                self.task_finished = True
                self.completion_reason = TaskCompletionReason.FINAL_ANSWER
                return True
        
        return False
    
    def check_reward_completion(self, step_reward: Dict[str, Any]) -> bool:
        """
        检查基于奖励的完成条件
        
        Args:
            step_reward: 步骤奖励信息，包含score和status
            
        Returns:
            bool: 是否应该完成任务
        """
        if not step_reward:
            return False
        
        reward_score = int(step_reward.get("score", 0))
        reward_status = step_reward.get("status", "doing")
        self.total_reward_score += reward_score
        
        logger.info(f"🏆 Reward Score: {reward_score}/{self.config.perfect_score}")
        logger.info(f"📊 Status: {reward_status}")
        logger.info(f"💭 Reason: {step_reward.get('reason', 'No reason provided')}")
        
        # 完美完成
        if reward_status == "finished" or reward_score == self.config.perfect_score:
            logger.info("🎯 Task completed based on reward evaluation!")
            self.task_global_status = "finished"
            self.task_finished = True
            self.completion_reason = TaskCompletionReason.REWARD_FINISHED
            return True
        
        # 循环检测
        elif reward_status == "loop" or reward_score == self.config.loop_score:
            self.consecutive_low_scores += 1
            logger.warning(f"⚠️  Low score detected ({self.consecutive_low_scores}/{self.config.loop_threshold})")
            
            if self.consecutive_low_scores >= self.config.loop_threshold:
                logger.warning("🔄 Stopping due to consecutive low scores - task may be stuck")
                self.task_global_status = "loop"
                self.completion_reason = TaskCompletionReason.LOOP_DETECTED
                return True
        
        # 低性能检测
        elif reward_score <= self.config.low_performance_score:
            self.consecutive_low_scores += 1
            
            if self.consecutive_low_scores >= self.config.low_performance_threshold:
                logger.warning("🔄 Stopping due to persistent low performance")
                self.task_global_status = "low_performance"
                self.completion_reason = TaskCompletionReason.LOW_PERFORMANCE
                return True
        
        else:
            # 重置低分计数
            self.consecutive_low_scores = 0
        
        return False
    
    def check_end_judge_completion(self, judgment_result: Dict[str, Any]) -> bool:
        """
        check completion conditions and error detection based on GPT-4o end judge
        support consecutive error detection, stop task only when consecutive error threshold is reached
        
        Args:
            judgment_result: GPT-4o judgment result
            
        Returns:
            bool: whether to complete task
        """
        if not judgment_result:
            return False
        
        has_critical_error = judgment_result.get("has_critical_error", False)
        should_stop_task = judgment_result.get("should_stop_task", False)
        error_type = judgment_result.get("error_type", "none")
        error_details = judgment_result.get("error_details", "")
        consecutive_error_count = judgment_result.get("consecutive_error_count", 0)
        consecutive_error_threshold_reached = judgment_result.get("consecutive_error_threshold_reached", False)
        
        if consecutive_error_threshold_reached and should_stop_task:
            logger.error(f"🚨 CONSECUTIVE ERROR THRESHOLD REACHED by GPT-4o End Judge")
            logger.error(f"🔢 Consecutive errors: {consecutive_error_count}")
            logger.error(f"🔍 Error type: {error_type}")
            logger.error(f"📝 Error details: {error_details}")
            logger.error(f"⛔ Task will be stopped due to consecutive critical errors")
            
            self.task_finished = True
            self.completion_reason = TaskCompletionReason.CRITICAL_ERROR
            self.task_global_status = f"consecutive_{error_type}_{consecutive_error_count}"
            return True
        elif has_critical_error and not should_stop_task:
            logger.warning(f"⚠️  Critical error detected by GPT-4o End Judge, but continuing task")
            logger.warning(f"🔢 Consecutive errors: {consecutive_error_count} (threshold not reached)")
            logger.warning(f"🔍 Error type: {error_type}")
            logger.warning(f"📝 Error details: {error_details}")
            logger.warning(f"🔄 Task will continue, monitoring for consecutive errors...")
            return False
        elif should_stop_task and not has_critical_error:
            logger.info(f"GPT-4o End Judge determined task should stop (non-error reason)")
            self.task_finished = True
            self.completion_reason = TaskCompletionReason.END_JUDGE_FINISHED
            return True
        
        is_completed = judgment_result.get("is_completed", False)
        confidence = judgment_result.get("confidence", 0.0)
        reasoning = judgment_result.get("reasoning", "")
        final_result_response = judgment_result.get("final_result_response", "")
        
        if is_completed:
            logger.info(f"🎯 GPT-4o End Judge determined task is COMPLETED")
            logger.info(f"📊 Confidence: {confidence:.2f}")
            logger.info(f"💭 Reasoning: {reasoning[:200]}...")
            if final_result_response:
                logger.info(f"📝 Final Result: {final_result_response[:200]}...")
            
            self.task_finished = True
            self.completion_reason = TaskCompletionReason.END_JUDGE_FINISHED
            return True
        
        return False
    
    def check_dom_mode_completion(self, step_reward: Optional[Dict[str, Any]] = None, 
                                 judgment_result: Optional[Dict[str, Any]] = None,
                                 user_request: str = "",
                                 recent_thoughts: Optional[List[str]] = None) -> bool:
        """
        check DOM mode completion conditions
        combine dom_reward judgment and GPT-4o end_judge judgment
        
        Args:
            step_reward: step reward information (dom_reward evaluation result)
            judgment_result: GPT-4o judgment result (end_judge evaluation result)
            user_request: user task request
            recent_thoughts: recent thoughts content
            
        Returns:
            bool: whether to complete task
        """
        # check if there is critical error
        if judgment_result:
            if self.check_end_judge_completion(judgment_result):
                logger.info("🏆 DOM mode task completed by GPT-4o End Judge")
                return True
        
        # check based on dom_reward completion conditions
        if step_reward:
            if self.check_reward_completion(step_reward):
                logger.info("🏆 DOM mode task completed by DOM reward evaluation")
                return True
        
        # check information task completion conditions
        if recent_thoughts and user_request:
            if self.check_information_task_completion(user_request, recent_thoughts):
                logger.info("🏆 DOM mode information task completed")
                return True
        
        # check step limit
        if self.check_step_limit():
            logger.warning("🏆 DOM mode task stopped due to step limit")
            return True
        
        return False
    
    def check_step_limit(self) -> bool:
        """
        检查步数限制
        
        Returns:
            bool: 是否达到步数限制
        """
        if self.step_count >= self.config.max_steps:
            logger.warning(f"📊 Reached maximum steps: {self.step_count}/{self.config.max_steps}")
            self.completion_reason = TaskCompletionReason.STEP_LIMIT
            return True
        
        return False
    
    def handle_planning_error(self, error: str):
        """
        处理规划错误
        
        Args:
            error: 错误信息
        """
        logger.error(f"Planning error occurred: {error}")
        self.task_finished = True
        self.completion_reason = TaskCompletionReason.PLANNING_ERROR
    
    def handle_navigation_error(self, error: str):
        """
        处理导航错误
        
        Args:
            error: 错误信息
        """
        logger.error(f"Navigation error occurred: {error}")
        self.task_finished = True
        self.completion_reason = TaskCompletionReason.NAVIGATION_ERROR
    
    def get_final_status(self) -> str:
        """
        计算最终任务状态
        
        Returns:
            str: 最终状态字符串
        """
        if self.task_finished:
            if self.completion_reason == TaskCompletionReason.FINAL_ANSWER:
                return "finished"
            elif self.completion_reason == TaskCompletionReason.END_JUDGE_FINISHED:
                return "end_judge_finished"
            elif self.completion_reason == TaskCompletionReason.CRITICAL_ERROR:
                return self.task_global_status or "critical_error"
            elif self.completion_reason == TaskCompletionReason.PLANNING_ERROR:
                return "planning_error"
            elif self.completion_reason == TaskCompletionReason.NAVIGATION_ERROR:
                return "navigation_error"
            elif self.completion_reason == TaskCompletionReason.REWARD_FINISHED:
                return "reward_finished"
            elif self.completion_reason == TaskCompletionReason.LOOP_DETECTED:
                return "loop_detected"
            elif self.completion_reason == TaskCompletionReason.LOW_PERFORMANCE:
                return "low_performance"
            elif self.completion_reason == TaskCompletionReason.STEP_LIMIT:
                return "step_limit"
            else:
                return "task_finished_unknown"
        
        elif self.task_global_status == "finished":
            return "llm_finished"
        elif self.task_global_status == "loop":
            return "loop_detected"
        elif self.task_global_status == "low_performance":
            return "low_performance"
        elif self.step_count >= self.config.max_steps:
            return "step_limit"
        else:
            return "unknown"
    
    def is_completed(self) -> bool:
        """
        检查任务是否已完成
        
        Returns:
            bool: 任务是否完成
        """
        return (self.task_finished or 
                self.task_global_status in ["finished", "loop", "low_performance"] or
                self.step_count >= self.config.max_steps)
    
    def get_completion_summary(self) -> Dict[str, Any]:
        """
        获取任务完成的摘要信息
        
        Returns:
            Dict: 完成摘要
        """
        return {
            "completed": self.task_finished or self.task_global_status == "finished",
            "final_status": self.get_final_status(),
            "completion_reason": self.completion_reason.value if self.completion_reason else None,
            "steps_taken": self.step_count,
            "max_steps": self.config.max_steps,
            "total_reward_score": self.total_reward_score,
            "average_reward_score": self.total_reward_score / max(1, self.step_count),
            "consecutive_low_scores": self.consecutive_low_scores,
            "task_global_status": self.task_global_status
        }
    
    def should_continue(self) -> Tuple[bool, str]:
        """
        判断是否应该继续执行任务
        
        Returns:
            Tuple[bool, str]: (是否继续, 停止原因)
        """
        if self.is_completed():
            reason = f"Task completed: {self.get_final_status()}"
            if self.completion_reason:
                reason += f" (reason: {self.completion_reason.value})"
            return False, reason
        
        return True, ""
    
    def log_progress(self):
        """Record current progress"""
        summary = self.get_completion_summary()
        logger.info(f"📊 Task Progress: Step {self.step_count}/{self.config.max_steps}, "
                   f"Status: {summary['final_status']}, "
                   f"Avg Score: {summary['average_reward_score']:.2f}, "
                   f"Low Scores: {self.consecutive_low_scores}")


DEFAULT_COMPLETION_CONFIG = TaskCompletionConfig()

# Convenient creation function
def create_task_completion_manager(max_steps: int = 50, 
                                 loop_threshold: int = 5,
                                 low_performance_threshold: int = 8) -> TaskCompletionManager:
    """
    便捷创建任务完成管理器
    
    Args:
        max_steps: 最大步数
        loop_threshold: 循环检测阈值
        low_performance_threshold: 低性能阈值
        
    Returns:
        TaskCompletionManager: 管理器实例
    """
    config = TaskCompletionConfig(
        max_steps=max_steps,
        loop_threshold=loop_threshold, 
        low_performance_threshold=low_performance_threshold
    )
    return TaskCompletionManager(config) 