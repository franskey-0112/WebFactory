"""
Confirmation loop detector - detect and break AI's confirmation seeking loop
"""
import logging
import re
from typing import List, Dict, Any, Tuple

logger = logging.getLogger(__name__)


class ConfirmationLoopDetector:
    """
    Detect if AI is stuck in a confirmation loop and provide intervention suggestions
    """
    
    def __init__(self):
        # Confirmation seeking keyword patterns
        self.confirmation_patterns = [
            r"would you like me to",
            r"should i",
            r"do you want me to",
            r"would you prefer",
            r"shall i",
            r"may i",
            r"can i",
            r"is it okay to",
            r"is it ok to",
            r"would it be okay",
            r"would it be ok",
            r"should i proceed",
            r"shall i click",
            r"would you like",
            r"do you need me to",
            r"i can help you",
            r"let me assist you",
            r"i suggest we",
            r"we could",
            r"i could",
            r"perhaps i should",
            r"maybe i should",
            r"i think i should ask",
            r"should i try",
            r"would it be better to",
            r"what would you like me to do",
            r"how would you like me to",
            r"which option would you prefer",
            # 中文确认寻求模式
            r"我应该",
            r"是否需要",
            r"您希望我",
            r"我可以帮您",
            r"需要我",
            r"我建议",
            r"我们可以",
        ]
        
        self.confirmation_regex = [re.compile(pattern, re.IGNORECASE) for pattern in self.confirmation_patterns]
        
        # The wait loop detects the threshold
        self.wait_loop_threshold = 4  # 连续4个或更多wait操作
        self.confirmation_loop_threshold = 3  # 连续3个确认询问
    
    def detect_confirmation_seeking(self, thought: str) -> bool:
        """
        检测思考内容是否包含确认寻求
        
        Args:
            thought: AI的思考内容
            
        Returns:
            bool: 是否在寻求确认
        """
        if not thought:
            return False
        
        thought_lower = thought.lower().strip()
        
        # Check for confirmation seeking patterns
        for regex in self.confirmation_regex:
            if regex.search(thought_lower):
                return True
        
        # Check for long sentences ending with a question mark (possibly a question)
        sentences = thought.split('.')
        for sentence in sentences:
            sentence = sentence.strip()
            if sentence.endswith('?') and len(sentence) > 15:
                # Check if it contains content with confirmation properties
                if any(word in sentence.lower() for word in ['you', 'want', 'like', 'prefer', 'should']):
                    return True
        
        return False
    
    def analyze_wait_pattern(self, recent_actions: List[str], recent_thoughts: List[str] = None) -> Dict[str, Any]:
        """
        分析最近的等待操作模式
        
        Args:
            recent_actions: 最近的动作列表
            recent_thoughts: 最近的思考内容列表
            
        Returns:
            分析结果字典
        """
        if not recent_actions:
            return {
                "status": "normal", 
                "wait_count": 0, 
                "consecutive_waits": 0,
                "wait_ratio": 0.0,
                "confirmation_count": 0,
                "total_recent_actions": 0,
                "diagnosis": "✅ NORMAL: No recent actions to analyze"
            }
        
        # 分析最近10个动作
        recent_subset = recent_actions[-10:] if len(recent_actions) > 10 else recent_actions
        
        wait_count = 0
        consecutive_waits = 0
        
        # 计算wait操作总数
        for action in recent_subset:
            if isinstance(action, dict):
                action_str = action.get("action", "")
            else:
                action_str = str(action)
            
            if "wait" in action_str.lower():
                wait_count += 1
        
        # 计算连续wait操作数
        for action in reversed(recent_subset):
            if isinstance(action, dict):
                action_str = action.get("action", "")
            else:
                action_str = str(action)
            
            if "wait" in action_str.lower():
                consecutive_waits += 1
            else:
                break
        
        wait_ratio = wait_count / max(1, len(recent_subset))
        
        # 分析思考内容中的确认寻求
        confirmation_count = 0
        if recent_thoughts:
            for thought in recent_thoughts[-5:]:  # 检查最近5个思考
                if self.detect_confirmation_seeking(thought):
                    confirmation_count += 1
        
        # 判断状态
        if consecutive_waits >= self.wait_loop_threshold:
            status = "critical_wait_loop"
        elif wait_ratio > 0.6 and confirmation_count >= 2:
            status = "confirmation_loop"
        elif consecutive_waits >= 3:
            status = "excessive_waiting"
        elif wait_ratio > 0.4:
            status = "high_wait_ratio"
        else:
            status = "normal"
        
        return {
            "status": status,
            "wait_count": wait_count,
            "consecutive_waits": consecutive_waits,
            "wait_ratio": wait_ratio,
            "confirmation_count": confirmation_count,
            "total_recent_actions": len(recent_subset),
            "diagnosis": self._get_diagnosis(status, consecutive_waits, wait_ratio, confirmation_count)
        }
    
    def _get_diagnosis(self, status: str, consecutive_waits: int, wait_ratio: float, confirmation_count: int) -> str:
        """
        获取诊断信息
        
        Args:
            status: 状态
            consecutive_waits: 连续等待次数
            wait_ratio: 等待比例
            confirmation_count: 确认寻求次数
            
        Returns:
            诊断信息
        """
        if status == "critical_wait_loop":
            return f"🚨 CRITICAL: {consecutive_waits} consecutive waits detected - AI stuck in wait loop"
        elif status == "confirmation_loop":
            return f"⚠️ CONFIRMATION LOOP: High wait ratio ({wait_ratio:.2f}) + {confirmation_count} confirmation requests"
        elif status == "excessive_waiting":
            return f"⚠️ EXCESSIVE WAITING: {consecutive_waits} consecutive waits - likely seeking confirmation"
        elif status == "high_wait_ratio":
            return f"📊 HIGH WAIT RATIO: {wait_ratio:.2f} - monitor for confirmation patterns"
        else:
            return "✅ NORMAL: Wait pattern within acceptable range"
    
    def generate_intervention_feedback(self, analysis: Dict[str, Any], task_name: str, 
                                     latest_thought: str = "") -> str:
        """
        生成干预反馈来打破循环
        
        Args:
            analysis: 等待模式分析结果
            task_name: 任务名称
            latest_thought: 最新思考内容
            
        Returns:
            干预反馈内容
        """
        status = analysis.get("status", "normal")
        consecutive_waits = analysis.get("consecutive_waits", 0)
        confirmation_count = analysis.get("confirmation_count", 0)
        
        if status == "critical_wait_loop":
            return f"""🚨 CRITICAL INTERVENTION REQUIRED! 🚨

You have been waiting for {consecutive_waits} consecutive steps!

TASK: "{task_name}"

IMMEDIATE ACTIONS REQUIRED:
❌ STOP asking for confirmation or permission
❌ STOP waiting unnecessarily  
✅ LOOK at the current screenshot
✅ IDENTIFY clickable elements related to the task
✅ CLICK on relevant buttons, products, or links IMMEDIATELY
✅ EXECUTE actions to complete the task

You are an AUTONOMOUS agent - you don't need permission to complete tasks!
TAKE ACTION NOW!"""

        elif status == "confirmation_loop":
            return f"""⚠️ CONFIRMATION LOOP DETECTED! ⚠️

Task: "{task_name}"
Problem: You're asking for confirmation instead of executing actions

STOP ASKING "Would you like me to..." - JUST DO IT!

WHAT TO DO RIGHT NOW:
1. Look at the current screenshot
2. Find elements related to "{task_name}"
3. Click/interact with them DIRECTLY
4. Complete the task without asking for permission

Remember: You have FULL AUTHORITY to complete this task!"""

        elif status == "excessive_waiting":
            return f"""⏰ EXCESSIVE WAITING DETECTED!

Task: "{task_name}"
Status: {consecutive_waits} consecutive waits

ACTION REQUIRED:
- STOP waiting without clear technical reasons
- IDENTIFY actionable elements on the page
- TAKE the next logical action to progress
- If you see loading indicators, wait briefly, otherwise ACT!

Focus on COMPLETING THE TASK, not waiting!"""

        else:
            if latest_thought and self.detect_confirmation_seeking(latest_thought):
                return f"""🎯 AUTONOMOUS EXECUTION REQUIRED!

Task: "{task_name}"

DETECTED CONFIRMATION SEEKING BEHAVIOR!

🚫 FORBIDDEN PHRASES DETECTED:
- Do not ask "Would you like me to..."
- Do not ask "Should I..."
- Do not ask "Shall I..."
- Do not seek permission or approval

✅ REQUIRED BEHAVIOR:
- You found what you need - NOW TAKE ACTION!
- Click on relevant buttons/links/products IMMEDIATELY
- Execute the next logical step without asking
- You have FULL AUTHORITY to complete this task

CRITICAL REMINDER: You are an AUTONOMOUS agent. Your job is to EXECUTE actions, not to ask for permission!

STOP ASKING - START DOING!"""
        
        return ""
    
    def suggest_recovery_action(self, analysis: Dict[str, Any], task_name: str) -> Dict[str, Any]:
        """
        建议恢复性操作来打破循环
        
        Args:
            analysis: 分析结果
            task_name: 任务名称
            
        Returns:
            建议的操作
        """
        status = analysis.get("status", "normal")
        
        if status in ["critical_wait_loop", "confirmation_loop"]:
            # 对于严重的循环，建议点击操作
            if "cart" in task_name.lower() or "add" in task_name.lower():
                return {
                    "action": "operator_click",
                    "coordinates": [640, 400],  # 页面中下部，常见按钮位置
                    "action_input": "640,400",
                    "element_id": "loop_recovery_click"
                }
            else:
                return {
                    "action": "operator_scroll",
                    "scroll_x": 0,
                    "scroll_y": 200,
                    "action_input": "0,200",
                    "element_id": "loop_recovery_scroll"
                }
        
        elif status == "excessive_waiting":
            # 对于过度等待，执行探索性滚动
            return {
                "action": "operator_scroll",
                "scroll_x": 0,
                "scroll_y": 150,
                "action_input": "0,150", 
                "element_id": "exploration_scroll"
            }
        
        return None

    def detect_information_task_completion(self, user_request: str, recent_thoughts: List[str], 
                                          current_thought: str = "") -> bool:
        """
        检测信息获取型任务是否已完成
        
        Args:
            user_request: 用户任务请求
            recent_thoughts: 最近的思考内容列表
            current_thought: 当前思考内容
            
        Returns:
            bool: 是否任务已完成
        """
        # detect information task
        info_task_patterns = [
            r"tell me.*about",
            r"find.*information", 
            r"what.*need",
            r"what.*identification",
            r"what.*id",
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
        
        all_thoughts = recent_thoughts + ([current_thought] if current_thought else [])
        
        # thoughts
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
        
        # check if the last two substantial thoughts are highly similar
        if len(substantial_thoughts) >= 2:
            last_two = substantial_thoughts[-2:]
            
            if len(last_two) == 2:
                thought1_words = set(last_two[0].lower().split())
                thought2_words = set(last_two[1].lower().split())
                
                if len(thought1_words) > 10 and len(thought2_words) > 10:
                    intersection = thought1_words.intersection(thought2_words)
                    union = thought1_words.union(thought2_words)
                    similarity = len(intersection) / len(union) if union else 0
                    if similarity > 0.8 and len(last_two[-1]) > 100:
                        logger.info(f"🎯 Information task completion detected: {similarity:.2f} similarity")
                        logger.info(f"📝 Answer content: {last_two[-1][:150]}...")
                        return True
        
        if current_thought and len(current_thought) > 100:
            id_keywords = ["driver", "license", "passport", "id", "identification", "photo", "military", "student"]
            amtrak_keywords = ["amtrak", "tsa", "guidelines", "18", "years", "old"]
            
            id_matches = sum(1 for keyword in id_keywords if keyword in current_thought.lower())
            amtrak_matches = sum(1 for keyword in amtrak_keywords if keyword in current_thought.lower())
            
            if id_matches >= 3 and amtrak_matches >= 2 and len(current_thought) > 150:
                logger.info(f"🎯 Amtrak ID information task completion detected")
                logger.info(f"📝 ID keywords: {id_matches}, Amtrak keywords: {amtrak_matches}")
                return True
        
        return False

    def generate_completion_intervention(self, user_request: str, detected_answer: str) -> str:
        """
        生成任务完成干预反馈
        
        Args:
            user_request: 用户任务请求
            detected_answer: 检测到的答案内容
            
        Returns:
            完成干预反馈
        """
        return f"""🎯 TASK COMPLETION DETECTED! 🎯

Original Task: "{user_request}"

✅ COMPLETE ANSWER FOUND:
You have already found the complete answer to this question!

📝 Detected Answer Content:
{detected_answer[:300]}...

🚨 IMMEDIATE ACTION REQUIRED:
Use "get_final_answer" action NOW with the complete information as action_input.

DO NOT:
❌ Continue scrolling or searching
❌ Wait for more information
❌ Ask for confirmation

DO THIS NOW:
✅ Use action: "get_final_answer"
✅ Include the complete answer in action_input
✅ End the task immediately

STOP SEARCHING - YOU FOUND THE ANSWER!"""

CONFIRMATION_LOOP_DETECTOR = ConfirmationLoopDetector() 