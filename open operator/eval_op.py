"""
Single task evaluation scripts are supported
Observation and planning of operator patterns are supported

Usage:
    xvfb-run -a python eval_op.py --observation_mode operator --global_reward_mode dom_reward --global_reward_text_model gpt-4o-mini --planning_text_model computer-use-preview-2025-03-11 --single_task_name "Find discussions of the community and open one with the most replies on Flightaware." --single_task_website "https://www.flightaware.com/" --rag_logging_enabled --rag_log_dir test/exp4/rag_logs
"""

from agent.Environment.html_env.async_env import AsyncHTMLEnvironment
from agent.Environment.html_env.operator_env import OperatorEnvironment
from agent.Environment.html_env.operator_actions import OperatorResponseParser, OperatorActionFactory
from agent.Memory.base_trace import LongMemoryManager
from agent.Plan.vision_dom_mapper import VisionDOMMapper
from evaluate import *
from agent.Plan import *
from dataclasses import dataclass

# Import TaskCompletionManager
from agent.Utils.task_completion_manager import (
    TaskCompletionManager, 
    TaskCompletionConfig, 
    create_task_completion_manager
)

# Import ConfirmationLoopDetector
from agent.Utils.confirmation_loop_detector import CONFIRMATION_LOOP_DETECTOR

# Import EndJudge
from agent.Utils.end_judge import create_end_judge, EndJudge

import re
import asyncio
import argparse
import logging
import json
import time
import os

# universal tools
from agent.Utils.utils import *
# evaluate tools
from evaluate.evaluate_utils import run_task, read_config, read_file
from agent.Utils.utils import read_json_file
from experiment_results import get_evaluate_result

logger = logging.getLogger(__name__)

from agent.LLM.token_utils import is_model_supported


@dataclass
class ExperimentConfig:
    mode: str
    global_reward_mode: str
    planning_text_model: str
    global_reward_text_model: str
    ground_truth_mode: bool
    single_task_name: str
    single_task_id: str
    config: dict
    ground_truth_data: dict
    write_result_file_path: str
    record_time: str
    file: list
    rag_enabled: bool
    rag_path: str
    screenshot_base_dir: str
    rag_logging_enabled: bool
    rag_log_dir: str
    rag_mode: str
    prompt_logging_enabled: bool
    prompt_log_dir: str
    end_judge_mode: str
    end_judge_confidence_threshold: float
    end_judge_min_steps: int
    rag_cache_dir: str
    consecutive_error_threshold: int
    long_memory_enabled: bool
    long_memory_dir: str
    long_memory_top_k: int

def validate_config(config, observation_mode, global_reward_mode, observation_model, global_reward_model):
    """
    Validate configuration, operator mode is supported
    """
    task_mode = config['basic']['task_mode']
    batch_tasks_file_path = config['files']['batch_tasks_file_path']
    json_model_response = config['model']['json_model_response']
    all_json_models = config['model']['json_models']
    interaction_mode = config['steps']['interaction_mode']

    # operator observation mode
    if observation_mode not in ["dom", "operator", "vision", "dom_v_desc", "vision_to_dom", "d_v"]:
        logger.error(
            f"observation mode '{observation_mode}' is not supported! "
            f"Supported modes: dom, operator, vision, dom_v_desc, vision_to_dom, d_v")
        exit()

    if interaction_mode not in [True, False]:
        logger.error(
            "interaction_mode is not defined! Try to define whether you want to evaluate the agent in an interactive manner.")
        exit()

    # json mode
    if observation_mode == "operator":
        logger.info("Using operator mode - JSON mode validation adjusted for operator models")
        if json_model_response:
            if "operator" in observation_model or "computer-use-preview" in observation_model:
                logger.info("Operator model detected - JSON mode will be handled specially")
            elif observation_model not in all_json_models:
                logger.error("Model does not support JSON mode!")
                exit()
    else:
        # Original validation logic
        if json_model_response and (observation_model not in all_json_models or (
                global_reward_mode != 'no_global_reward' and global_reward_model not in all_json_models)):
            logger.error("Model does not support JSON mode!")
            exit()

    if task_mode == 'batch_tasks' and not os.path.exists(batch_tasks_file_path):
        logger.error("batch_tasks_file_path not exist!")
        exit()


def get_task_range(task_mode, file, raw_data_index):
    if task_mode == "batch_tasks":
        if raw_data_index != -1:
            re_result = re.split(r'\s|,', raw_data_index)
            raw_data_start_index = int(re_result[0])
            raw_data_end_index = int(re_result[-1]) + 1
        else:
            raw_data_start_index = 0
            raw_data_end_index = len(file)
        return range(raw_data_start_index, raw_data_end_index)
    elif task_mode == "single_task":
        return range(0, 1)
    else:
        logger.error("task_mode error!")
        exit()


def log_task_info(task_index, task_name, reference_task_length, reference_evaluate_steps):
    logger.info("*" * 100)
    logger.info(f"task index: {task_index}")
    logger.info(f"task name: {task_name}")
    logger.info(f"task reference length: {reference_task_length}")
    logger.info(f"raw data annotation: {reference_evaluate_steps}")


def generate_result_file_path(config):
    return os.path.join(config["files"]["out_file_path"], "json_result")


def load_ground_truth_data(config, ground_truth_mode):
    if ground_truth_mode:
        ground_truth_file_path = config['files']['ground_truth_file_path']
        if not os.path.exists(ground_truth_file_path):
            logger.error("ground_truth_file_path not exist!")
            exit()
        return read_json_file(ground_truth_file_path)
    return None


def create_html_environment(mode, screenshot_dir="screenshots_operator"):
    """
    create html environment for operator mode
    """
    if mode == "operator":
        return OperatorEnvironment(
            headless=False,
            slow_mo=500,
            viewport_width=1280,
            viewport_height=720,
            save_trace_enabled=True,
            screenshot_dir=screenshot_dir
        )
    else:
        # 其他模式使用原有配置
        return AsyncHTMLEnvironment(
            mode=mode,
            max_page_length=8192,
            headless=False,
            slow_mo=1000,
            current_viewport_only=False,
            viewport_size={"width": 1080, "height": 720},
            save_trace_enabled=True,
            sleep_after_execution=0.0,
            locale="en-US",
            use_vimium_effect=True
        )


async def run_operator_task(env, task_name, task_uuid, website, config, 
                          planning_text_model, record_time, write_result_file_path,
                          reference_task_length, reference_evaluate_steps, 
                          screenshot_params, rag_enabled, rag_path, global_reward_mode="no_global_reward", 
                          global_reward_text_model="gpt-4o-mini", ground_truth_mode=False, ground_truth_data=None,
                          rag_logging_enabled=False, rag_log_dir=None, rag_mode="description",
                          prompt_logging_enabled=False, prompt_log_dir=None, end_judge_mode="disabled",
                          end_judge_confidence_threshold=0.8, end_judge_min_steps=2, rag_cache_dir=None,
                          consecutive_error_threshold=2, long_memory_enabled=True,
                          long_memory_dir="memory_store", long_memory_top_k=3):
    """
    运行operator任务 (支持DOM reward和智能停止)
    """
    logger.info(f"🚀 Starting operator task: {task_name}")
    logger.info(f"📱 Model: {planning_text_model}")
    logger.info(f"🌐 Website: {website}")
    logger.info(f"🏆 Reward mode: {global_reward_mode}")
    logger.info(f"🧠 RAG mode: {rag_mode}")
    logger.info(f"📝 RAG logging: {'Enabled' if rag_logging_enabled else 'Disabled'}")
    logger.info(f"💬 Prompt logging: {'Enabled' if prompt_logging_enabled else 'Disabled'}")
    if rag_cache_dir:
        logger.info(f"🗄️  RAG cache directory: {rag_cache_dir}")
    # debug
    # logger.info(f"⚖️  End judge mode: {end_judge_mode}")
    # if end_judge_mode != "disabled":
    #     logger.info(f"🎯 End judge confidence threshold: {end_judge_confidence_threshold}")
    #     logger.info(f"📊 End judge min steps: {end_judge_min_steps}")
    
    # Prompt Logger
    prompt_logger = None
    if prompt_logging_enabled:
        from agent.Utils.prompt_logger import PromptLogger
        prompt_logger = PromptLogger(prompt_log_dir=prompt_log_dir)
        actual_prompt_dir = prompt_logger.prompt_dir
        logger.info(f"💬 Prompt logs will be saved to: {actual_prompt_dir}")
    
    # RAG Logger
    rag_logger = None
    if rag_logging_enabled:
        if rag_mode == "vision":
            from agent.Utils.rag_logger import VisionRAGLogger
            rag_logger = VisionRAGLogger(rag_log_dir=rag_log_dir)
            actual_rag_dir = rag_logger.vision_rag_dir
            logger.info(f"📂 Vision RAG logs will be saved to: {actual_rag_dir}")
        else:
            from agent.Utils.rag_logger import RAGLogger
            rag_logger = RAGLogger(rag_log_dir=rag_log_dir)
            actual_rag_dir = rag_logger.rag_dir
            logger.info(f"📂 RAG logs will be saved to: {actual_rag_dir}")
    
    # 启动环境
    await env.start()
    
    try:
        # 网络检查
        logger.info("🔍 Performing network health check...")
        network_healthy = await env.check_network_health(website)
        if not network_healthy:
            logger.warning("⚠️  Network health check failed, but proceeding with caution...")
        
        await env.navigate_to(website)
        
        if any(domain in website.lower() for domain in ["flightaware", "student.com", "booking.com"]):
            await asyncio.sleep(3)
        else:
            await asyncio.sleep(1)
        
        # 初始化截图变量
        # current_screenshot = await env.take_screenshot("initial.png")
        current_screenshot = ""
        
        from agent.LLM.llm_instance import create_llm_instance
        
        operator_model = create_llm_instance(
            model=planning_text_model,
            json_mode=False
        )
        
        # OperatorMode
        from agent.Plan.planning import OperatorMode
        operator_mode = OperatorMode(text_model=operator_model)
        vision_dom_mapper = VisionDOMMapper()

        long_memory_manager = LongMemoryManager(
            enabled=long_memory_enabled,
            memory_dir=long_memory_dir,
            max_reference_items=long_memory_top_k,
        )
        logger.info(
            f"🧠 Long memory: {'Enabled' if long_memory_enabled else 'Disabled'} "
            f"(dir={long_memory_dir}, top_k={long_memory_top_k})"
        )
        
        if rag_cache_dir:
            config['rag_cache_dir'] = rag_cache_dir
            logger.info(f"🗄️  RAG cache directory set: {rag_cache_dir}")
        
        max_steps = config.get('steps', {}).get('operator_max_steps',80)  # max steps
        logger.info(f"📊 Using dynamic step limit with maximum: {max_steps}")
        
        # task completion manager
        completion_manager = create_task_completion_manager(
            max_steps=max_steps,
            loop_threshold=5,
            low_performance_threshold=8
        )
        
        # end judge
        end_judge = create_end_judge(
            mode=end_judge_mode,
            model_name="gpt-4o",
            confidence_threshold=end_judge_confidence_threshold,
            min_steps=end_judge_min_steps,
            consecutive_error_threshold=consecutive_error_threshold
        )
        # logger.info(f"⚖️  End judge initialized: {end_judge.is_enabled()}")
        
        previous_trace = [] 
        feedback = ""
        status_description = f"Starting task: {task_name}"
        
        task_trace = []
        
        # avoid repetitive ineffective operations
        consecutive_failed_scrolls = 0
        last_action_type = None
        
        # get initial DOM observation
        if hasattr(env, 'get_obs'):
            # for operator environment, need to simulate DOM observation
            try:
                # get page title and URL as basic observation information
                page_title = await env.page.title()
                page_url = env.page.url
                observation = f"current web tab name is '{page_title}'\nURL: {page_url}"
            except Exception:
                observation = "Page observation not available"
        else:
            observation = "Operator mode - visual observation only"
        
        logger.info(f"🔄 Starting operator task loop with reward-based stopping...")
        
        while True:
            should_continue, stop_reason = completion_manager.should_continue()
            if not should_continue:
                logger.info(f"🛑 Task stopped: {stop_reason}")
                break
            
            completion_manager.increment_step()
            current_step = completion_manager.step_count
            
            logger.info(f"📸 Step {current_step} (max: {max_steps})")
            
            screenshot_filename = f"step_{current_step-1:03d}.png"
            
            # await ensure_page_ready_for_screenshot(env)
            
            # Simplify page preparation logic
            await asyncio.sleep(1)
            
            current_screenshot = await env.take_screenshot(screenshot_filename)
            logger.info(f"📷 Screenshot taken: {screenshot_filename}")
            
            # 记录任务进度
            completion_manager.log_progress()
            
            # DOM Reward评估 (在planning之前进行，基于previous trace)
            step_reward = {}
            reward_token_count = [0, 0]
            
            if global_reward_mode != 'no_global_reward' and len(previous_trace) > 0:
                logger.info("🏆 Evaluating DOM reward...")
                try:
                    # 更新观察信息
                    try:
                        page_title = await env.page.title()
                        page_url = env.page.url
                        observation = f"current web tab name is '{page_title}'\nURL: {page_url}"
                    except Exception:
                        observation = "Page observation not available"
                    
                    # 当前信息
                    current_info = {"URL": env.page.url}
                    if "vision" in global_reward_mode:
                        current_info["vision_reward"] = current_screenshot
                    
                    # 调用GlobalReward评估
                    from agent.Reward.global_reward import GlobalReward
                    step_reward, reward_description, reward_token_count = await GlobalReward.evaluate(
                        config=config,
                        model_name=global_reward_text_model,
                        user_request=task_name,
                        previous_trace=previous_trace,
                        observation=observation,
                        current_info=current_info,
                        task_name_id=task_uuid,
                        global_reward_mode=global_reward_mode,
                        ground_truth_mode=ground_truth_mode,
                        ground_truth_data=ground_truth_data,
                    )
                    
                    if step_reward:
                        # 使用完成管理器检查奖励完成条件
                        if completion_manager.check_reward_completion(step_reward):
                            break
                        
                        # 更新状态描述
                        reward_score = int(step_reward.get("score", 0))
                        status_description = reward_description or f"Step {current_step} - Score: {reward_score}"
                        
                except Exception as e:
                    logger.error(f"❌ Error in reward evaluation: {e}")
                    step_reward = {}
            
            # 执行planning
            try:
                # 将previous_trace转换为字符串格式用于operator
                previous_trace_str = ""
                for i, trace in enumerate(previous_trace):
                    previous_trace_str += f"Step {i + 1}: {trace.get('thought', '')} -> {trace.get('action', '')}\n"

                current_url_for_memory = ""
                try:
                    current_url_for_memory = env.page.url
                except Exception:
                    current_url_for_memory = ""

                long_memory_context = ""
                if long_memory_enabled and long_memory_manager:
                    try:
                        memory_context_payload = long_memory_manager.build_context(
                            task_name=task_name,
                            task_id=task_uuid,
                            website=website,
                            current_url=current_url_for_memory,
                        )
                        long_memory_context = memory_context_payload.get("formatted_context", "")
                    except Exception as memory_context_error:
                        logger.warning(f"⚠️ Failed to build long-memory context: {memory_context_error}")
                        long_memory_context = ""
                
                planning_config = config.copy()
                if rag_cache_dir:
                    planning_config['rag_cache_dir'] = rag_cache_dir
                    planning_config['task_uuid'] = task_uuid
                    planning_config['step_idx'] = current_step - 1
                
                planning_response, error_message, planning_response_thought, planning_response_action, planning_token_count, rag_data = await operator_mode.execute(
                    status_description=status_description,
                    user_request=task_name,
                    rag_enabled=rag_enabled,
                    rag_path=rag_path,
                    previous_trace=previous_trace_str,
                    observation="",  # operator模式不需要DOM观察
                    feedback=feedback,
                    observation_VforD=current_screenshot,
                    rag_mode=rag_mode,
                    prompt_logging_enabled=prompt_logging_enabled,
                    prompt_logger=prompt_logger,
                    task_uuid=task_uuid,
                    step_idx=current_step - 1,
                    rag_cache_dir=rag_cache_dir,
                    long_memory_context=long_memory_context
                )
                
                if error_message:
                    logger.error(f"Planning error: {error_message}")
                    break
                
                logger.info(f"Step Thought: {planning_response_thought}")
                logger.info(f"Step Action: {planning_response_action}")
                
                # 确认循环检测和干预 - 增强版本
                try:
                    recent_actions = [trace.get("action", {}) for trace in task_trace[-10:]] if task_trace else []
                    recent_thoughts = [trace.get("thought", "") for trace in task_trace[-5:]] if task_trace else []
                    
                    # 立即检测当前思考是否寻求确认
                    confirmation_detected = False
                    if planning_response_thought and CONFIRMATION_LOOP_DETECTOR.detect_confirmation_seeking(planning_response_thought):
                        logger.warning("🚨 IMMEDIATE CONFIRMATION SEEKING DETECTED!")
                        logger.warning(f"Problematic thought: {planning_response_thought[:100]}...")
                        confirmation_detected = True
                        
                        # 立即生成强烈的干预反馈
                        immediate_feedback = f"""🚨 AUTONOMOUS EXECUTION REQUIRED! 🚨

DETECTED FORBIDDEN CONFIRMATION SEEKING!

Your thought: "{planning_response_thought[:150]}..."

🚫 STOP ASKING FOR PERMISSION!
✅ You are an AUTONOMOUS agent with FULL AUTHORITY
✅ Execute actions IMMEDIATELY without asking
✅ Find target elements and interact with them NOW
✅ Complete the task directly

CRITICAL: Your job is to EXECUTE, not to ask questions!
TAKE ACTION NOW!"""
                        
                        feedback = immediate_feedback
                    
                    # detect information task completion
                    info_task_completed = False
                    if CONFIRMATION_LOOP_DETECTOR.detect_information_task_completion(
                        user_request=task_name,
                        recent_thoughts=recent_thoughts,
                        current_thought=planning_response_thought
                    ):
                        logger.warning("🎯 INFORMATION TASK COMPLETION DETECTED!")
                        logger.warning("Task should end with get_final_answer!")
                        info_task_completed = True
                        
                        # generate completion intervention feedback
                        completion_feedback = CONFIRMATION_LOOP_DETECTOR.generate_completion_intervention(
                            user_request=task_name,
                            detected_answer=planning_response_thought or "Complete information found"
                        )
                        
                        feedback = completion_feedback
                        
                        # force generate get_final_answer action
                        planning_response_action = {
                            "action": "get_final_answer",
                            "action_input": planning_response_thought or "Task completed - information found",
                            "element_id": "info_task_completion"
                        }
                        logger.warning(f"🔄 FORCING TASK COMPLETION ACTION: get_final_answer")
                    
                    # analyze wait pattern
                    wait_analysis = CONFIRMATION_LOOP_DETECTOR.analyze_wait_pattern(
                        recent_actions=recent_actions, 
                        recent_thoughts=recent_thoughts
                    )
                    
                    logger.info(f"🔍 Wait Pattern Analysis: {wait_analysis.get('diagnosis', 'No diagnosis available')}")
                    
                    # if problem pattern detected, generate intervention feedback
                    if wait_analysis.get("status") != "normal" and not confirmation_detected and not info_task_completed:
                        intervention_feedback = CONFIRMATION_LOOP_DETECTOR.generate_intervention_feedback(
                            wait_analysis, task_name, planning_response_thought or ""
                        )
                        
                        if intervention_feedback:
                            logger.warning(f"🚨 INTERVENTION: {wait_analysis.get('status', 'unknown')}")
                            feedback = intervention_feedback
                        
                        # 对于严重情况，直接建议恢复操作
                        if wait_analysis.get("status") in ["critical_wait_loop", "confirmation_loop"]:
                            recovery_action = CONFIRMATION_LOOP_DETECTOR.suggest_recovery_action(
                                wait_analysis, task_name
                            )
                            if recovery_action:
                                logger.warning(f"🔄 FORCING RECOVERY ACTION: {recovery_action}")
                                planning_response_action = recovery_action

                except Exception as loop_detection_error:
                    logger.warning(f"⚠️ Confirmation loop detection failed: {loop_detection_error}")
                    # 继续执行，不影响主要任务流程
                
                # RAG logger
                if rag_logging_enabled and rag_logger and rag_data:
                    try:
                        # 添加额外的步骤信息
                        rag_data.update({
                            "step_idx": current_step - 1,  # 使用当前步数 
                            "task_name": task_name,
                            "website": website,
                            "model": planning_text_model,
                            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                            "planning_response": planning_response,
                            "planning_thought": planning_response_thought,
                            "planning_action": planning_response_action,
                            "feedback": feedback,
                            "status_description": status_description,
                            "token_count": planning_token_count,
                            "screenshot_filename": screenshot_filename
                        })
                        
                        rag_file_path = rag_logger.log_rag_step(task_uuid, current_step - 1, rag_data)
                        logger.info(f"📝 RAG information logged to: {rag_file_path}")
                        
                    except Exception as rag_error:
                        logger.warning(f"⚠️  Failed to log RAG information: {rag_error}")
                
                # 检测是否是重复的无效操作
                current_action_type = planning_response_action.get("action", "")
                
                # 改进的重复操作检测
                if is_repetitive_action(current_action_type, last_action_type, consecutive_failed_scrolls):
                    consecutive_failed_scrolls += 1
                    if consecutive_failed_scrolls >= 3:
                        logger.warning("⚠️  Detected repeated ineffective actions, trying alternative strategy")
                        feedback = "Previous actions seem ineffective. Try a different approach, look for alternative UI elements, or consider the task might be completed."
                        consecutive_failed_scrolls = 0
                        
                        # 尝试智能恢复策略
                        alternative_action = await suggest_alternative_action(env, current_action_type, task_name)
                        if alternative_action:
                            planning_response_action = alternative_action
                            logger.info(f"🔄 Switching to alternative action: {alternative_action}")
                else:
                    consecutive_failed_scrolls = 0
                
                last_action_type = current_action_type
                
                # 记录trace (包含reward信息)
                trace_entry = {
                    "step": current_step - 1,  # 使用当前步数
                    "thought": planning_response_thought,
                    "action": planning_response_action,
                    "screenshot_taken": True, # 每个步骤都截图
                    "screenshot": screenshot_filename,
                    "reward": step_reward,  # 添加reward信息
                    "reward_tokens": reward_token_count
                }
                task_trace.append(trace_entry)
                
                # 为下一轮reward评估准备trace数据
                current_trace = {
                    "thought": planning_response_thought,
                    "action": planning_response_action.get("action", ""),
                    "action_input": planning_response_action.get("action_input", ""),
                    "reflection": step_reward.get("description", "") if step_reward else ""
                }
                
                # 验证和清理动作
                validated_action, is_valid = await validate_and_sanitize_action(planning_response_action, env)
                
                if not is_valid:
                    logger.warning("Action validation failed, using fallback")
                    validated_action = {
                        "action": "operator_wait",
                        "action_input": "1000",
                        "ms": 1000,
                        "element_id": "validation_failed_fallback"
                    }

                mapped_action, mapping_info = await apply_vision_to_dom_mapping(
                    env=env,
                    mapper=vision_dom_mapper,
                    action_dict=validated_action,
                    thought=planning_response_thought or "",
                    task_name=task_name,
                )
                validated_action = mapped_action
                if mapping_info.get("mapped"):
                    logger.info(
                        f"🧭 Vision-to-DOM mapped action to {mapping_info.get('target_tag', '')} "
                        f"({mapping_info.get('target_text', '')[:60]}) "
                        f"with confidence={mapping_info.get('best_score', 0.0):.3f}"
                    )
                
                # 执行验证后的action
                success = await execute_operator_action(env, validated_action)
                
                if not success:
                    logger.error("Action execution failed")
                    feedback = "Action execution failed. Please try a different approach or simpler actions."
                    current_trace["reflection"] += " (Action execution failed)"
                    
                    # 记录执行失败的详细信息
                    logger.warning(f"Failed action details: {validated_action}")
                    
                    # 如果连续执行失败，可以考虑更保守的策略
                    if consecutive_failed_scrolls >= 2:
                        logger.warning("Multiple consecutive action failures detected, adding recovery pause")
                        await asyncio.sleep(1.0)  # 短暂暂停，不记录为action
                else:
                    feedback = ""
                    consecutive_failed_scrolls = 0  # 重置失败计数

                if task_trace:
                    task_trace[-1]["validated_action"] = validated_action
                    task_trace[-1]["vision_to_dom_mapping"] = mapping_info

                if long_memory_enabled and long_memory_manager:
                    try:
                        memory_error = "" if success else (feedback or "action_execution_failed")
                        long_memory_manager.record_step(
                            task_id=task_uuid or "",
                            task_name=task_name or "",
                            step_idx=current_step - 1,
                            thought=planning_response_thought or "",
                            action=validated_action,
                            current_url=(env.page.url if env.page else ""),
                            website=website or "",
                            reflection=current_trace.get("reflection", ""),
                            success=bool(success),
                            error=memory_error,
                            reward=step_reward if step_reward else None,
                            status=status_description or "",
                        )
                    except Exception as memory_record_error:
                        logger.warning(f"⚠️ Failed to record long-memory step: {memory_record_error}")
                
                # 添加到previous_trace用于下一轮reward评估
                previous_trace.append(current_trace)
                
                # detect information task completion (before action completion detection)
                recent_thoughts = [trace.get("thought", "") for trace in task_trace[-10:]] if task_trace else []
                if completion_manager.check_information_task_completion(
                    user_request=task_name,
                    recent_thoughts=recent_thoughts,
                    current_thought=planning_response_thought
                ):
                    logger.info("🎯 Information task completion detected - ending task")
                    break
                
                # GPT-4o end judge detection
                if await end_judge.should_judge_now(current_step, task_name):
                    logger.info("⚖️  Performing GPT-4o end judge evaluation...")
                    
                    # build previous actions summary
                    previous_actions_summary = ""
                    if task_trace:
                        recent_traces = task_trace[-5:]  # last 5 actions
                        previous_actions_summary = "Recent actions:\n"
                        for i, trace in enumerate(recent_traces):
                            step_num = trace.get("step", i)
                            thought = trace.get("thought", "")[:100]
                            action = trace.get("action", {})
                            action_type = action.get("action", "unknown")
                            previous_actions_summary += f"Step {step_num}: {thought} -> {action_type}\n"
                    
                    # call GPT-4o to end judge and error detection
                    try:
                        should_stop_task, end_judge_result = await end_judge.judge_completion_and_errors(
                            task_description=task_name,
                            screenshot_base64=current_screenshot,
                            previous_actions=previous_actions_summary,
                            current_step=current_step
                        )
                        # record end judge result to trace
                        if task_trace:
                            task_trace[-1]["end_judge_result"] = end_judge_result
                            
                        if should_stop_task:
                            if completion_manager.check_end_judge_completion(end_judge_result):
                                error_type = end_judge_result.get("error_type", "none")
                                if error_type != "none":
                                    logger.warning(f"🛑 Task stopped due to critical error: {error_type}")
                                else:
                                    logger.info("🎯 GPT-4o End Judge determined task completion - ending task")
                                break
                    
                    except Exception as end_judge_error:
                        logger.warning(f"⚠️  End judge evaluation failed: {end_judge_error}")
                
                # check action completion condition
                if completion_manager.check_action_completion(planning_response_action):
                    break
                
            except Exception as e:
                logger.error(f"Error in planning step: {e}")
                completion_manager.handle_planning_error(str(e))
                feedback = f"Error in planning: {str(e)}"
                break
        
        # get completion summary
        completion_summary = completion_manager.get_completion_summary()
        
        # RAG cache status
        if hasattr(operator_mode, 'get_rag_cache_status'):
            rag_cache_status = operator_mode.get_rag_cache_status()
            logger.info(f"🎯 RAG Cache Status: {rag_cache_status['cache_count']} constructors cached for modes: {rag_cache_status['cached_modes']}")

        if long_memory_enabled and long_memory_manager:
            try:
                current_url_for_finalize = ""
                try:
                    current_url_for_finalize = env.page.url
                except Exception:
                    current_url_for_finalize = ""
                long_memory_manager.finalize_task(
                    task_id=task_uuid or "",
                    task_name=task_name or "",
                    website=website or "",
                    current_url=current_url_for_finalize,
                    final_status=completion_summary.get("final_status", ""),
                    completed=bool(completion_summary.get("completed", False)),
                    total_steps=int(completion_summary.get("steps_taken", 0)),
                    total_reward_score=float(completion_summary.get("total_reward_score", 0.0) or 0.0),
                )
            except Exception as memory_finalize_error:
                logger.warning(f"⚠️ Failed to finalize long-memory task record: {memory_finalize_error}")
        
        result_data = {
            "task_name": task_name,
            "task_uuid": task_uuid,
            "model": planning_text_model,
            "website": website,
            "steps": completion_summary["steps_taken"],
            "max_steps": completion_summary["max_steps"],
            "final_status": completion_summary["final_status"],
            "completion_reason": completion_summary["completion_reason"],
            "task_global_status": completion_summary["task_global_status"],
            "total_reward_score": completion_summary["total_reward_score"],
            "average_reward_score": completion_summary["average_reward_score"],
            "reward_mode": global_reward_mode,
            "trace": task_trace,
            "final_state": await env.get_current_state(),
            "completed": completion_summary["completed"],
            "record_time": record_time,
            "reward_based_stopping": global_reward_mode != 'no_global_reward',
            "end_judge_mode": end_judge_mode,
            "end_judge_enabled": end_judge.is_enabled(),
            "final_result_response": "",  # will be extracted from end_judge result below
            "long_memory_enabled": long_memory_enabled,
            "long_memory_dir": long_memory_dir
        }
        
        # extract final_result_response from end_judge result
        if task_trace:
            for trace in reversed(task_trace):
                if "end_judge_result" in trace:
                    end_judge_result = trace["end_judge_result"]
                    if end_judge_result.get("final_result_response"):
                        result_data["final_result_response"] = end_judge_result["final_result_response"]
                        break
        
        result_file = os.path.join(write_result_file_path, f"{task_uuid}_{record_time}.json")
        os.makedirs(os.path.dirname(result_file), exist_ok=True)
        
        with open(result_file, 'w', encoding='utf-8') as f:
            json.dump(result_data, f, ensure_ascii=False, indent=2)
        
        logger.info(f"📝 Result saved to: {result_file}")
        logger.info(f"🏆 Final Status: {completion_summary['final_status']}")
        logger.info(f"📊 Total Steps: {completion_summary['steps_taken']}")
        logger.info(f"🎯 Total Reward Score: {completion_summary['total_reward_score']}")
        if completion_summary['steps_taken'] > 0:
            logger.info(f"📈 Average Reward Score: {completion_summary['average_reward_score']:.2f}")
        if completion_summary['completion_reason']:
            logger.info(f"🔍 Completion Reason: {completion_summary['completion_reason']}")
        
    except Exception as navigation_error:
        logger.error(f"❌ Navigation failed: {navigation_error}")
        completion_manager.handle_navigation_error(str(navigation_error))
        
        # 尝试恢复策略
        logger.info("🔄 Attempting recovery strategies...")
        
        try:
            # 策略1：尝试导航到备用URL或简单页面
            if "flightaware" in website.lower():
                backup_url = "https://www.google.com"
                logger.info(f"🔄 Trying backup URL: {backup_url}")
                await env.navigate_to(backup_url, max_retries=2)
                
                # 从Google搜索目标站点
                logger.info("🔍 Searching for target site from Google...")
                
            else:
                # 其他站点的备用策略
                logger.info("🔄 Using fallback navigation...")
                await env.navigate_to("about:blank")
                
        except Exception as recovery_error:
            logger.error(f"❌ Recovery also failed: {recovery_error}")
            # 保存错误结果
            result_data = {
                "task_name": task_name,
                "task_uuid": task_uuid,
                "model": planning_text_model,
                "website": website,
                "error": "Navigation failed",
                "error_details": str(navigation_error),
                "recovery_error": str(recovery_error),
                "steps": 0,
                "max_steps": max_steps,
                "final_status": "navigation_error",
                "completed": False,
                "record_time": record_time,
                "reward_mode": global_reward_mode
            }
            
            # 保存错误结果
            result_file = os.path.join(write_result_file_path, f"{task_uuid}_{record_time}_error.json")
            os.makedirs(os.path.dirname(result_file), exist_ok=True)
            
            with open(result_file, 'w', encoding='utf-8') as f:
                json.dump(result_data, f, ensure_ascii=False, indent=2)
            
            logger.error(f"💾 Error result saved to: {result_file}")
            return  # 退出任务
        
        # 如果恢复成功，继续任务
        logger.info("✅ Recovery successful, continuing with task...")
        
        # 重新初始化截图和模型
        current_screenshot = await env.take_screenshot()
        
        from agent.LLM.llm_instance import create_llm_instance
        
        operator_model = create_llm_instance(
            model=planning_text_model,
            json_mode=False
        )
        
        # 创建OperatorMode实例
        from agent.Plan.planning import OperatorMode
        operator_mode = OperatorMode(text_model=operator_model)
        
    finally:
        # 可选：清理RAG缓存以节省内存（批处理任务）
        # if hasattr(operator_mode, 'clear_rag_cache'):
        #     operator_mode.clear_rag_cache()
        
        await env.close()


async def execute_operator_action(env, action_dict):
    """
    执行operator action (优化版本 - 减少不必要的wait操作)
    """
    action_type = action_dict.get("action", "wait")
    
    try:
        logger.info(f"🔧 Executing action: {action_type}")
        
        # 记录操作前的页面状态
        page_state_before = await get_page_state(env)
        
        if action_type == "operator_click":
            coords = action_dict.get("coordinates", [0, 0])
            button = action_dict.get("button", "left")
            logger.info(f"📍 Clicking at coordinates: {coords} with {button} button")
            action = OperatorActionFactory.create_click_action(coords[0], coords[1], button)
            await env.execute_operator_actions([action])
            
            # wait for page stability after click
            # await wait_for_page_stability(env, expected_change=True)
            
            # Simplify page preparation logic
            await asyncio.sleep(1.5)
            
        elif action_type == "operator_double_click":
            coords = action_dict.get("coordinates", [0, 0])
            button = action_dict.get("button", "left")
            logger.info(f"📍 Double-clicking at coordinates: {coords} with {button} button")
            action = OperatorActionFactory.create_double_click_action(coords[0], coords[1], button)
            await env.execute_operator_actions([action])
            
            # wait for page stability after double click
            # await wait_for_page_stability(env, expected_change=True)
            
            # Simplify page preparation logic
            await asyncio.sleep(1.5)
            
        elif action_type == "operator_type":
            text = action_dict.get("text", "")
            logger.info(f"⌨️  Typing text: '{text}'")
            action = OperatorActionFactory.create_type_action(text)
            await env.execute_operator_actions([action])
            
            # wait for a short time after text input (no need to wait for a long time)
            await asyncio.sleep(0.3)
            
        elif action_type == "operator_scroll":
            scroll_x = action_dict.get("scroll_x", 0)
            scroll_y = action_dict.get("scroll_y", 0)
            
            # fix: adjust the too large scroll amount to a reasonable range
            if abs(scroll_y) > 700:
                scroll_y = 700 if scroll_y > 0 else -700
            if abs(scroll_x) > 700:
                scroll_x = 700 if scroll_x > 0 else -700
                
            logger.info(f"📜 Scrolling: x={scroll_x}, y={scroll_y}")
            action = OperatorActionFactory.create_scroll_action(scroll_x, scroll_y)
            await env.execute_operator_actions([action])
            
            # wait for content stability after scroll
            # await wait_for_scroll_completion(env)
            
            # Simplify page preparation logic
            await asyncio.sleep(1)
            
        elif action_type == "operator_keypress":
            keys = action_dict.get("keys", [])
            logger.info(f"🔑 Pressing keys: {keys}")
            action = OperatorActionFactory.create_keypress_action(keys)
            await env.execute_operator_actions([action])
            
            # wait for page stability after keypress (some keys may trigger page change)
            if any(key.lower() in ['enter', 'return', 'tab'] for key in keys):
                await wait_for_page_stability(env, expected_change=True, timeout=3000)
            else:
                await asyncio.sleep(0.2)
            
        elif action_type == "operator_drag":
            path = action_dict.get("path", [[0, 0], [0, 0]])
            logger.info(f"🖱️  Dragging from {path[0]} to {path[-1]}")
            action = OperatorActionFactory.create_drag_action(path)
            await env.execute_operator_actions([action])
            
            await wait_for_page_stability(env, expected_change=True)
            
        elif action_type == "operator_wait":
            ms = action_dict.get("ms", 1000)
            ms = min(ms, 5000)  # 最多等待5秒
            logger.info(f"⏳ Waiting for {ms}ms")
            action = OperatorActionFactory.create_wait_action(ms)
            await env.execute_operator_actions([action])
            
        elif action_type == "get_final_answer":
            logger.info(f"🎯 Task completion detected")
            return True
            
        else:
            # 优化：对于未知操作，不再默认等待，而是尝试解析或跳过
            logger.warning(f"❓ Unknown action type '{action_type}', attempting minimal response")
            
            # 检查是否是有效的操作描述
            if "click" in action_type.lower():
                # 尝试解析为点击操作
                coords = [640, 360]  # 屏幕中心作为默认点击位置
                action = OperatorActionFactory.create_click_action(coords[0], coords[1])
                await env.execute_operator_actions([action])
                await wait_for_page_stability(env, expected_change=True)
            elif "scroll" in action_type.lower():
                # 尝试解析为滚动操作
                action = OperatorActionFactory.create_scroll_action(0, 200)
                await env.execute_operator_actions([action])
                await wait_for_scroll_completion(env)
            else:
                # 真正的未知操作，最小等待
                logger.info(f"⚡ Minimal wait for unknown action")
                await asyncio.sleep(0.5)  # 减少到0.5秒
        
        # 检查页面状态变化
        page_state_after = await get_page_state(env)
        if page_state_changed(page_state_before, page_state_after):
            logger.info(f"📄 Page state changed, ensuring stability...")
            await ensure_page_ready_for_screenshot(env)
        
        logger.info(f"✅ Action '{action_type}' completed successfully")
        return True
        
    except Exception as e:
        logger.error(f"❌ Error executing operator action {action_type}: {e}")
        return False


async def validate_and_sanitize_action(action_dict, env):
    """
    Validate and clean up operator actions to ensure the rationality of actions
    
    Args:
        action_dict: Raw action dictionary
        env: Environment
        
    Returns:
        Tuple[Dict, bool]: Cleaned action dictionary, valid or not
    """
    try:
        action_type = action_dict.get("action", "")
        
        # 检查基本动作类型
        valid_actions = [
            "operator_click", "operator_double_click", "operator_type", 
            "operator_scroll", "operator_keypress", "operator_drag", 
            "operator_wait", "get_final_answer"
        ]
        
        if action_type not in valid_actions:
            logger.warning(f"Invalid action type: {action_type}, converting to operator_wait")
            return {
                "action": "operator_wait",
                "action_input": "1000",
                "ms": 1000,
                "element_id": "invalid_action_fallback"
            }, True
        
        # 验证点击动作的坐标
        if action_type in ["operator_click", "operator_double_click"]:
            coords = action_dict.get("coordinates", [640, 360])
            if not isinstance(coords, list) or len(coords) != 2:
                coords = [640, 360]
            
            # 确保坐标在合理范围内
            x, y = coords[0], coords[1]
            # if x < 0 or x > 2560 or y < 0 or y > 1600:
            if x < 0 or x > 1280 or y < 0 or y > 720:
                logger.warning(f"Coordinates out of range: {coords}, using center")
                coords = [640, 360]
            
            action_dict["coordinates"] = coords
            action_dict["action_input"] = f"{coords[0]},{coords[1]}"
        
        # 验证滚动动作
        elif action_type == "operator_scroll":
            scroll_x = action_dict.get("scroll_x", 0)
            scroll_y = action_dict.get("scroll_y", 0)
            
            # 限制滚动量在合理范围内
            if abs(scroll_y) > 1000:
                scroll_y = 700 if scroll_y > 0 else -700
            if abs(scroll_x) > 1000:
                scroll_x = 700 if scroll_x > 0 else -700
            
            action_dict["scroll_x"] = scroll_x
            action_dict["scroll_y"] = scroll_y
            action_dict["action_input"] = f"{scroll_x},{scroll_y}"
        
        # 验证文本输入动作
        elif action_type == "operator_type":
            text = action_dict.get("text", "")
            if not text or len(text) > 500:  # 防止过长的文本输入
                if len(text) > 500:
                    text = text[:500]
                    logger.warning("Text input truncated to 500 characters")
                action_dict["text"] = text
                action_dict["action_input"] = text
        
        # 验证等待动作
        elif action_type == "operator_wait":
            ms = action_dict.get("ms", 1000)
            if ms < 100:
                ms = 100
            elif ms > 10000:  # 最多等待10秒
                ms = 10000
            action_dict["ms"] = ms
            action_dict["action_input"] = str(ms)
        
        return action_dict, True
        
    except Exception as e:
        logger.error(f"Error validating action: {e}")
        return {
            "action": "operator_wait",
            "action_input": "1000", 
            "ms": 1000,
            "element_id": "validation_error_fallback"
        }, True


async def apply_vision_to_dom_mapping(env, mapper, action_dict, thought: str, task_name: str):
    """
    将视觉动作（坐标）映射到DOM交互元素，缓解纯坐标点击的不稳定性。
    """
    if not action_dict or not mapper:
        return action_dict, {"mapped": False, "reason": "missing_action_or_mapper"}

    action_type = action_dict.get("action", "")
    if action_type not in ["operator_click", "operator_double_click"]:
        return action_dict, {"mapped": False, "reason": "action_not_mappable"}

    try:
        dom_elements = await env.get_interactive_elements(max_elements=280)
    except Exception as e:
        return action_dict, {"mapped": False, "reason": f"dom_collection_failed:{e}"}

    if not dom_elements:
        return action_dict, {"mapped": False, "reason": "empty_dom_candidates"}

    try:
        mapped_action, mapping_info = mapper.map_action(
            action=action_dict,
            dom_elements=dom_elements,
            thought=thought,
            task_name=task_name,
        )
        mapping_info["dom_candidates"] = len(dom_elements)
        return mapped_action, mapping_info
    except Exception as e:
        return action_dict, {"mapped": False, "reason": f"mapper_failed:{e}"}


async def get_page_state(env):
    """获取页面状态快照"""
    try:
        return {
            "url": env.page.url,
            "title": await env.page.title(),
            "scroll_position": await env.page.evaluate("window.pageYOffset"),
            "timestamp": time.time()
        }
    except Exception:
        return {"timestamp": time.time()}


def page_state_changed(state_before, state_after):
    """检查页面状态是否发生变化"""
    if not state_before or not state_after:
        return True
    
    # 检查URL变化
    if state_before.get("url") != state_after.get("url"):
        return True
    
    # 检查标题变化
    if state_before.get("title") != state_after.get("title"):
        return True
    
    # 检查滚动位置变化（超过50像素认为有显著变化）
    scroll_before = state_before.get("scroll_position", 0)
    scroll_after = state_after.get("scroll_position", 0)
    if abs(scroll_before - scroll_after) > 50:
        return True
    
    return False


async def wait_for_page_stability(env, expected_change=False, timeout=5000):
    """
    智能等待页面稳定
    
    Args:
        env: 环境实例
        expected_change: 是否期望页面发生变化
        timeout: 超时时间（毫秒）
    """
    try:
        start_time = time.time()
        
        # 策略1：等待网络请求完成
        try:
            await env.page.wait_for_load_state("networkidle", timeout=min(5000, timeout))
            logger.info("✅ Network idle achieved")
            return
        except Exception:
            logger.debug("Network idle timeout, trying alternative strategies...")
        
        # 策略2：等待DOM稳定
        stable_count = 0
        last_dom_size = 0
        
        while (time.time() - start_time) * 1000 < timeout:
            try:
                # 检查DOM大小
                dom_size = await env.page.evaluate("document.documentElement.innerHTML.length")
                
                if dom_size == last_dom_size:
                    stable_count += 1
                    if stable_count >= 3:  # 连续3次检查DOM大小相同，认为稳定
                        logger.info("✅ DOM stability achieved")
                        return
                else:
                    stable_count = 0
                    last_dom_size = dom_size
                
                await asyncio.sleep(0.5)
                
            except Exception:
                break
        
        # 策略3：基础等待
        logger.debug("Using fallback wait strategy")
        await asyncio.sleep(1)
        
    except Exception as e:
        logger.warning(f"Page stability check failed: {e}")


async def wait_for_scroll_completion(env):
    """等待滚动操作完成"""
    try:
        # 等待滚动动画完成
        last_scroll = -1
        stable_count = 0
        
        for _ in range(10):  # 最多检查10次
            current_scroll = await env.page.evaluate("window.pageYOffset")
            
            if current_scroll == last_scroll:
                stable_count += 1
                if stable_count >= 2:  # 连续2次位置相同，认为滚动完成
                    logger.info("✅ Scroll completion detected")
                    return
            else:
                stable_count = 0
                last_scroll = current_scroll
            
            await asyncio.sleep(0.2)
        
        logger.info("✅ Scroll timeout reached, assuming completion")
        
    except Exception as e:
        logger.warning(f"Scroll completion check failed: {e}")


async def ensure_page_ready_for_screenshot(env):
    """确保页面已准备好进行截图"""
    try:
        # 等待渲染完成
        await env.page.wait_for_timeout(1000)
        
        # 检查是否有加载指示器
        try:
            loading_indicators = await env.page.evaluate("""
                () => {
                    const indicators = [
                        'div[class*="loading"]',
                        'div[class*="spinner"]',
                        'div[class*="loader"]',
                        '.loading',
                        '.spinner',
                        '.loader'
                    ];
                    
                    for (const selector of indicators) {
                        const elements = document.querySelectorAll(selector);
                        for (const el of elements) {
                            const style = window.getComputedStyle(el);
                            if (style.display !== 'none' && style.visibility !== 'hidden') {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            """)
            
            if loading_indicators:
                logger.info("⏳ Waiting for loading indicators to disappear...")
                # 等待加载指示器消失
                for _ in range(10):
                    await asyncio.sleep(0.5)
                    still_loading = await env.page.evaluate("""
                        () => {
                            const indicators = [
                                'div[class*="loading"]',
                                'div[class*="spinner"]', 
                                'div[class*="loader"]',
                                '.loading',
                                '.spinner',
                                '.loader'
                            ];
                            
                            for (const selector of indicators) {
                                const elements = document.querySelectorAll(selector);
                                for (const el of elements) {
                                    const style = window.getComputedStyle(el);
                                    if (style.display !== 'none' && style.visibility !== 'hidden') {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        }
                    """)
                    
                    if not still_loading:
                        logger.info("✅ Loading indicators disappeared")
                        break
            
            logger.info("✅ Page ready for screenshot")
            
        except Exception:
            logger.debug("Loading indicator check failed, proceeding anyway")
            
    except Exception as e:
        logger.warning(f"Page readiness check failed: {e}")


async def get_page_signature(env):
    """
    获取页面签名，用于检测页面是否发生实质性变化
    """
    try:
        signature_data = await env.page.evaluate("""
            () => {
                try {
                    // 获取页面的关键特征
                    const url = window.location.href;
                    const title = document.title;
                    const scrollPosition = window.pageYOffset;
                    const visibleText = document.body ? document.body.innerText.substring(0, 500) : ''; // 前500字符
                    const elementCount = document.querySelectorAll('*').length;
                    
                    // 获取主要内容区域的特征
                    const mainContent = document.querySelector('main, #main, .main, #content, .content, .container');
                    const mainText = mainContent ? mainContent.innerText.substring(0, 200) : '';
                    
                    // 安全的文本哈希函数，避免btoa编码问题
                    function safeHash(text) {
                        if (!text) return '';
                        
                        try {
                            // 简单的字符串哈希函数
                            let hash = 0;
                            for (let i = 0; i < text.length; i++) {
                                const char = text.charCodeAt(i);
                                hash = ((hash << 5) - hash) + char;
                                hash = hash & hash; // 转换为32位整数
                            }
                            return hash.toString(36); // 转换为36进制字符串
                        } catch (e) {
                            console.warn('Text hashing failed:', e);
                            return text.length.toString(); // 备用：返回文本长度
                        }
                    }
                    
                    return {
                        url: url || '',
                        title: title || '',
                        scrollPosition: Math.floor(scrollPosition / 100) * 100, // 量化滚动位置，减少小幅滚动的影响
                        visibleTextHash: safeHash(visibleText), // 使用安全的哈希函数
                        elementCount: elementCount || 0,
                        mainTextHash: safeHash(mainText)
                    };
                } catch (error) {
                    console.error('Page signature generation failed:', error);
                    // 返回最基本的签名数据
                    return {
                        url: window.location.href || '',
                        title: document.title || '',
                        scrollPosition: 0,
                        visibleTextHash: 'error',
                        elementCount: 0,
                        mainTextHash: 'error'
                    };
                }
            }
        """)
        
        # 验证签名数据的完整性
        if not signature_data:
            logger.warning("Page signature data is empty, using fallback")
            signature_data = {
                'url': 'unknown',
                'title': 'unknown', 
                'scrollPosition': 0,
                'visibleTextHash': 'fallback',
                'elementCount': 0,
                'mainTextHash': 'fallback'
            }
        
        # 创建页面签名
        import hashlib
        signature_string = f"{signature_data['url']}|{signature_data['title']}|{signature_data['scrollPosition']}|{signature_data['visibleTextHash']}|{signature_data['elementCount']}|{signature_data['mainTextHash']}"
        signature_hash = hashlib.md5(signature_string.encode('utf-8')).hexdigest()
        
        logger.debug(f"Page signature generated: {signature_hash[:8]}... (URL: {signature_data.get('url', 'unknown')[:50]})")
        
        return signature_hash
        
    except Exception as e:
        logger.warning(f"Failed to get page signature: {e}")
        # 返回基于时间和URL的备用签名
        try:
            current_url = await env.page.url if env.page else "unknown"
            fallback_string = f"{current_url}|{time.time()}"
            import hashlib
            return hashlib.md5(fallback_string.encode('utf-8')).hexdigest()
        except Exception:
            # 最后的备用方案
            return str(time.time())


def is_repetitive_action(current_action, last_action, consecutive_count):
    """
    检测是否是重复的无效操作
    
    Args:
        current_action: 当前操作类型
        last_action: 上一个操作类型
        consecutive_count: 连续相同操作计数
        
    Returns:
        bool: 是否是重复操作
    """
    # 连续相同的操作类型
    if current_action == last_action:
        # 某些操作连续执行可能是正常的（如滚动浏览内容）
        if current_action in ["operator_scroll"]:
            return consecutive_count >= 3  # 滚动操作允许3次
        elif current_action in ["operator_click", "operator_type"]:
            return consecutive_count >= 2  # 点击和输入操作允许2次重试
        elif current_action in ["operator_wait"]:
            return consecutive_count >= 2  # wait操作允许2次重复
        else:
            return consecutive_count >= 2
    
    return False


async def suggest_alternative_action(env, failed_action_type, task_name):
    """
    Based on the type of operation that failed and the task content, alternative actions are suggested
    
    Args:
        env: Environment
        failed_action_type: The type of operation that failed
        task_name: Task name
        
    Returns:
        dict: Suggested alternative action, returning None if there is no suggestion
    """
    try:
        page_info = await env.page.evaluate("""
            () => {
                // 检查页面上的可交互元素
                const clickableElements = document.querySelectorAll('button, a, input[type="submit"], input[type="button"], [role="button"]');
                const inputElements = document.querySelectorAll('input[type="text"], input[type="search"], textarea');
                const scrollableElements = document.querySelectorAll('[style*="overflow"], .scroll, .scrollable');
                
                // 检查是否有搜索相关元素
                const searchElements = document.querySelectorAll('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], .search-input');
                
                // 检查是否有导航元素
                const navElements = document.querySelectorAll('nav, .nav, .navigation, .menu, [role="navigation"]');
                
                return {
                    hasClickableElements: clickableElements.length > 0,
                    hasInputElements: inputElements.length > 0,
                    hasSearchElements: searchElements.length > 0,
                    hasNavElements: navElements.length > 0,
                    clickableCount: clickableElements.length,
                    inputCount: inputElements.length,
                    currentUrl: window.location.href,
                    pageTitle: document.title
                };
            }
        """)
        
        # Alternatives are suggested based on the type of operation that failed and the page status
        if failed_action_type == "operator_scroll":
            # Scrolling fails; try another navigation
            if page_info["hasNavElements"]:
                return {
                    "action": "operator_click", 
                    "coordinates": [640, 100], # Click on the navigation area
                    "action_input": "640,100",
                    "element_id": "nav_alternative"
                }
            elif page_info["hasClickableElements"]:
                return {
                    "action": "operator_click",
                    "coordinates": [640, 300], # Click on the middle of the page
                    "action_input": "640,300", 
                    "element_id": "click_alternative"
                }
        
        elif failed_action_type == "operator_click":
            # 点击失败，尝试搜索或其他交互
            if page_info["hasSearchElements"] and any(keyword in task_name.lower() for keyword in ["search", "find", "look"]):
                return {
                    "action": "operator_click",
                    "coordinates": [640, 200], # 点击搜索区域
                    "action_input": "640,200",
                    "element_id": "search_alternative"
                }
            else:
                # 尝试按键操作
                return {
                    "action": "operator_keypress", 
                    "keys": ["Tab"],
                    "action_input": "Tab",
                    "element_id": "tab_alternative"
                }
        
        elif failed_action_type == "operator_type":
            # 输入失败，尝试点击输入框或清空后重试
            return {
                "action": "operator_keypress",
                "keys": ["Control", "a"], # 全选
                "action_input": "Control,a",
                "element_id": "select_all_alternative"
            }
        
        # 通用备选方案：按键操作
        return {
            "action": "operator_keypress",
            "keys": ["Escape"], # ESC键可能关闭弹窗或重置状态
            "action_input": "Escape",
            "element_id": "escape_alternative"
        }
        
    except Exception as e:
        logger.warning(f"Failed to suggest alternative action: {e}")
        return None


async def run_experiment(task_range, experiment_config):
    for task_index in task_range:
        task_uuid = None
        if experiment_config.config['basic']['task_mode'] == "batch_tasks":
            task = experiment_config.file[task_index]
            task_name = task.get("confirmed_task", f"Task_{task_index}")
            task_uuid = task.get("task_id", f"task_{task_index}")
            reference_task_length = task.get("reference_length", 0)
            reference_evaluate_steps = task.get("evaluation", [])
            website = task.get("website", "about:blank")
            log_task_info(task_index, task_name,
                          reference_task_length, reference_evaluate_steps)
        elif experiment_config.config['basic']['task_mode'] == "single_task":
            task_name = experiment_config.single_task_name
            reference_task_length = experiment_config.config['steps']['single_task_action_step']
            reference_evaluate_steps = []
            website = experiment_config.config.get('single_task_website', "about:blank")
            
            # find task_id
            task_uuid = experiment_config.single_task_id

            if task_uuid:
                logger.info(f"✅ use direct task_id: {task_uuid}")
            else:
                try:
                    # load task mapping file
                    base_dir = os.path.dirname(os.path.abspath(__file__))
                    online_mind2web_path = os.path.join(base_dir, "data/Online-Mind2Web/Online_Mind2Web.json")
                    
                    if os.path.exists(online_mind2web_path):
                        with open(online_mind2web_path, 'r', encoding='utf-8') as f:
                            tasks_data = json.load(f)
                        
                        for task_data in tasks_data:
                            if task_data.get("confirmed_task") == task_name:
                                task_uuid = task_data.get("task_id")
                                website = task_data.get("website", website)
                                logger.info(f"✅ find task_id: {task_uuid}")
                                logger.info(f"📝 task_name: {task_name}")
                                logger.info(f"🌐 website: {website}")
                                break
                        
                        if not task_uuid:
                            logger.warning(f"⚠️  not foundtask_id: {task_name}")
                            
                except Exception as e:
                    logger.warning(f"⚠️ Failed to load the task mapping file: {e}")

                if not task_uuid:
                    task_uuid = f"single_task_{int(time.time())}"
                    logger.info(f"🔄 use temporary task_id: {task_uuid}")
            
            logger.info(f"task_name: {task_name}")
            logger.info(f"website: {website}")
            logger.info(f"mode: {experiment_config.mode}")

        # trajectory parameters
        screenshot_params = {
            "mode": experiment_config.mode,
            "record_time": experiment_config.record_time,
            "task_name": task_name,
            "task_name_id": task_uuid,
            "file_path": experiment_config.screenshot_base_dir or "results_operator"
        }
        
        # trajectory directory
        if experiment_config.screenshot_base_dir:
            base_screenshot_dir = os.path.join(experiment_config.screenshot_base_dir, "img_screenshots")
        else:
            base_screenshot_dir = os.path.join("results_operator", "img_screenshots")
        
        # trajectory directory - fix None check
        if task_uuid and base_screenshot_dir:
            task_screenshot_dir = os.path.join(base_screenshot_dir, task_uuid)
        else:
            task_screenshot_dir = base_screenshot_dir if base_screenshot_dir else "results_operator/img_screenshots"
        
        if not os.path.exists(task_screenshot_dir):
            os.makedirs(task_screenshot_dir, exist_ok=True)
        
        # Operator mode uses special task running logic
        if experiment_config.mode == "operator":
            env = create_html_environment(experiment_config.mode, screenshot_dir=task_screenshot_dir)
            
            logger.info(f"🤖 Using OpenAI Operator mode")
            logger.info(f"📱 Planning model: {experiment_config.planning_text_model}")
            logger.info(f"📸 Screenshot support: Enabled")
            logger.info(f"🧠 RAG support: {'Enabled' if experiment_config.rag_enabled else 'Disabled'}")
            
            await run_operator_task(
                env=env,
                task_name=task_name,
                task_uuid=task_uuid,
                website=website,
                config=experiment_config.config,
                planning_text_model=experiment_config.planning_text_model,
                record_time=experiment_config.record_time,
                write_result_file_path=experiment_config.write_result_file_path,
                reference_task_length=reference_task_length,
                reference_evaluate_steps=reference_evaluate_steps,
                screenshot_params=screenshot_params,
                rag_enabled=experiment_config.rag_enabled,
                rag_path=experiment_config.rag_path,
                global_reward_mode=experiment_config.global_reward_mode,
                global_reward_text_model=experiment_config.global_reward_text_model,
                ground_truth_mode=experiment_config.ground_truth_mode,
                ground_truth_data=experiment_config.ground_truth_data,
                rag_logging_enabled=experiment_config.rag_logging_enabled,
                rag_log_dir=experiment_config.rag_log_dir,
                rag_mode=experiment_config.rag_mode,
                prompt_logging_enabled=experiment_config.prompt_logging_enabled,
                prompt_log_dir=experiment_config.prompt_log_dir,
                end_judge_mode=experiment_config.end_judge_mode,
                end_judge_confidence_threshold=experiment_config.end_judge_confidence_threshold,
                end_judge_min_steps=experiment_config.end_judge_min_steps,
                rag_cache_dir=experiment_config.rag_cache_dir if hasattr(experiment_config, 'rag_cache_dir') else None,
                consecutive_error_threshold=experiment_config.consecutive_error_threshold if hasattr(experiment_config, 'consecutive_error_threshold') else 2,
                long_memory_enabled=experiment_config.long_memory_enabled,
                long_memory_dir=experiment_config.long_memory_dir,
                long_memory_top_k=experiment_config.long_memory_top_k
            )
        else:
            # Other modes use the original logic
            env = create_html_environment(experiment_config.mode, screenshot_dir=task_screenshot_dir)
            
            await run_task(mode=experiment_config.mode,
                           task_mode=experiment_config.config['basic']['task_mode'],
                           task_name=task_name,
                           task_uuid=task_uuid,
                           config=experiment_config.config,
                           write_result_file_path=experiment_config.write_result_file_path,
                           reference_task_length=reference_task_length,
                           evaluate_steps=reference_evaluate_steps,
                           reference_evaluate_steps=reference_evaluate_steps,
                           env=env,
                           global_reward_mode=experiment_config.global_reward_mode,
                           global_reward_text_model=experiment_config.global_reward_text_model,
                           planning_text_model=experiment_config.planning_text_model,
                           ground_truth_mode=experiment_config.ground_truth_mode,
                           ground_truth_data=experiment_config.ground_truth_data,
                           interaction_mode=experiment_config.config['steps']['interaction_mode'],
                           task_index=task_index,
                           record_time=experiment_config.record_time,
                           token_pricing=experiment_config.config['token_pricing'],
                           screenshot_params=screenshot_params,
                           website=website,
                           rag_enabled=experiment_config.rag_enabled,
                           rag_path=experiment_config.rag_path
                           )
            
            await env.close()
            del env
        
    logger.info('\033[31m🎉 All tasks finished!\033[0m')
    logger.info('\033[31m⏸️  Press Enter to exit...\033[0m')


async def main(global_reward_mode="no_global_reward",
               planning_text_model="computer-use-preview-2025-03-11",
               global_reward_text_model="gpt-4o-mini",
               single_task_name="",
               single_task_website="about:blank",
               single_task_id=None,
               raw_data_index=-1,
               observation_mode="operator",
               ground_truth_mode=False,
               toml_path=None,
               screenshot_base_dir=None,
               rag_logging_enabled=False,
               rag_log_dir=None,
               rag_mode="description",
               prompt_logging_enabled=False,
               prompt_log_dir=None,
               end_judge_mode="disabled",
               end_judge_confidence_threshold=0.8,
               end_judge_min_steps=2,
               rag_cache_dir=None,
               consecutive_error_threshold=2,
               long_memory_enabled=None,
               long_memory_dir="memory_store",
               long_memory_top_k=3
               ):
    config = read_config(toml_path)
    config['single_task_website'] = single_task_website
    validate_config(config, observation_mode, global_reward_mode, planning_text_model, global_reward_text_model)

    file = None
    if config['basic']['task_mode'] == "batch_tasks":
        file = read_json_file(config['files']['batch_tasks_file_path'])
        task_range = get_task_range(
            config['basic']['task_mode'], file, raw_data_index)
    elif config['basic']['task_mode'] == "single_task":
        task_range = get_task_range(config['basic']['task_mode'], None, -1)

    record_time = time.strftime("%Y%m%d-%H%M%S", time.localtime())
    write_result_file_path = generate_result_file_path(config)
    ground_truth_data = load_ground_truth_data(config, ground_truth_mode)

    rag_enabled = config['rag']['enabled']
    rag_path = config['rag']['rag_path']
    memory_config = config.get("memory", {})

    if long_memory_enabled is None:
        long_memory_enabled = bool(memory_config.get("enabled", True))
    if long_memory_dir == "memory_store" and memory_config.get("memory_dir"):
        long_memory_dir = memory_config.get("memory_dir")
    if long_memory_top_k == 3 and memory_config.get("top_k") is not None:
        try:
            long_memory_top_k = int(memory_config.get("top_k"))
        except Exception:
            long_memory_top_k = 3

    # Override: allow disabling RAG via CLI rag_mode=none
    if rag_mode == "none":
        rag_enabled = False

    # Set the RAG log directory
    if rag_log_dir is None:
        rag_log_dir = os.path.join(write_result_file_path, "rag_result")
    
    # Set the Prompt log directory
    if prompt_log_dir is None:
        prompt_log_dir = os.path.join(write_result_file_path, "prompt_result")

    experiment_config = ExperimentConfig(
        mode=observation_mode,
        global_reward_mode=global_reward_mode,
        planning_text_model=planning_text_model,
        global_reward_text_model=global_reward_text_model,
        ground_truth_mode=ground_truth_mode,
        single_task_name=single_task_name,
        single_task_id=single_task_id or "",
        config=config,
        ground_truth_data=ground_truth_data or {},
        write_result_file_path=write_result_file_path,
        record_time=record_time,
        file=file or [],
        rag_enabled=rag_enabled,
        rag_path=rag_path,
        screenshot_base_dir=screenshot_base_dir or "",
        rag_logging_enabled=rag_logging_enabled,
        rag_log_dir=rag_log_dir,
        rag_mode=rag_mode,
        prompt_logging_enabled=prompt_logging_enabled,
        prompt_log_dir=prompt_log_dir,
        end_judge_mode=end_judge_mode,
        end_judge_confidence_threshold=end_judge_confidence_threshold,
        end_judge_min_steps=end_judge_min_steps,
        rag_cache_dir=rag_cache_dir or "",
        consecutive_error_threshold=consecutive_error_threshold,
        long_memory_enabled=long_memory_enabled,
        long_memory_dir=long_memory_dir,
        long_memory_top_k=long_memory_top_k
    )

    await run_experiment(task_range, experiment_config)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run the web agent with OpenAI Operator support.")
    parser.add_argument("--global_reward_mode",
                        choices=["dom_vision_reward", "dom_reward",
                                 "vision_reward", "no_global_reward"],
                        default="dom_reward", 
                        help="Choose the mode of global reward.")
    parser.add_argument("--index", type=str, default=-1)
    parser.add_argument("--single_task_name", type=str,
                        default="Find Dota 2 game and add all DLC to cart in steam.")
    parser.add_argument("--single_task_website", type=str,
                        default="about:blank", help="Website URL for single task mode")
    parser.add_argument("--single_task_id", type=str, default=None,
                        help="Real task ID for single task mode")
    parser.add_argument("--snapshot", type=str, default="test/exp")
    parser.add_argument("--planning_text_model", type=str, default="computer-use-preview-2025-03-11")
    parser.add_argument("--global_reward_text_model", type=str, default="gpt-4o-mini")
    parser.add_argument("--observation_mode", type=str, default="operator",
                        choices=["dom", "operator", "vision", "dom_v_desc", "vision_to_dom", "d_v"],
                        help="Choose the observation mode")
    parser.add_argument("--ground_truth_mode", action="store_true", 
                        help="Enable ground truth mode")
    parser.add_argument("--toml_path", type=str, default=None,
                        help="Path to TOML configuration file")
    parser.add_argument("--screenshot_base_dir", type=str, default=None,
                        help="Base directory for screenshots")
    parser.add_argument("--rag_logging_enabled", action="store_true",
                        help="Enable RAG logging for operator mode")
    parser.add_argument("--rag_log_dir", type=str, default=None,
                        help="Directory to store RAG logs (default: results_dir/rag_result)")
    parser.add_argument("--rag_mode", type=str, default="description",
                        choices=['description', 'vision', 'vision_rag', 'description_rag', 'hybrid_rag', 'none'],
                        help='RAG mode: description / vision / vision_rag / description_rag / hybrid_rag / none')
    parser.add_argument("--prompt_logging_enabled", action="store_true",
                        help="Enable prompt logging for operator mode")
    parser.add_argument("--prompt_log_dir", type=str, default=None,
                        help="Directory to store prompt logs (default: results_dir/)")
    parser.add_argument("--end_judge", type=str, default="disabled",
                        choices=["disabled", "enabled", "strict"],
                        help="End judge mode: disabled (no end judge), enabled (standard completion criteria), strict (strict completion criteria)")
    parser.add_argument("--end_judge_confidence_threshold", type=float, default=0.8,
                        help="Confidence threshold for end judge completion (0.0-1.0)")
    parser.add_argument("--end_judge_min_steps", type=int, default=2,
                        help="Minimum steps before end judge starts evaluating")
    parser.add_argument("--consecutive_error_threshold", type=int, default=2,
                        help="Consecutive error threshold - how many consecutive errors to tolerate before stopping task")
    parser.add_argument("--rag_cache_dir", type=str, default=None,
                        help="Directory to load pre-built RAG cache (for vision_rag mode)")
    parser.add_argument("--long_memory_enabled", type=str, default="auto",
                        choices=["auto", "true", "false"],
                        help="Enable hierarchical long-term memory.")
    parser.add_argument("--long_memory_dir", type=str, default="memory_store",
                        help="Directory for long-term memory persistence.")
    parser.add_argument("--long_memory_top_k", type=int, default=3,
                        help="Top-K similar traces retrieved from long-term memory.")

    args = parser.parse_args()

    asyncio.run(main(global_reward_mode=args.global_reward_mode,
                     planning_text_model=args.planning_text_model,
                     global_reward_text_model=args.global_reward_text_model,
                     single_task_name=args.single_task_name,
                     single_task_website=args.single_task_website,
                     single_task_id=args.single_task_id,
                     raw_data_index=args.index,
                     observation_mode=args.observation_mode,
                     ground_truth_mode=args.ground_truth_mode,
                     toml_path=args.toml_path,
                     screenshot_base_dir=args.screenshot_base_dir,
                     rag_logging_enabled=args.rag_logging_enabled,
                     rag_log_dir=args.rag_log_dir,
                     rag_mode=args.rag_mode,
                     prompt_logging_enabled=args.prompt_logging_enabled,
                     prompt_log_dir=args.prompt_log_dir,
                     end_judge_mode=args.end_judge,
                     end_judge_confidence_threshold=args.end_judge_confidence_threshold,
                     end_judge_min_steps=args.end_judge_min_steps,
                     rag_cache_dir=args.rag_cache_dir,
                     consecutive_error_threshold=args.consecutive_error_threshold,
                     long_memory_enabled=(
                         None
                         if str(args.long_memory_enabled).lower() == "auto"
                         else (str(args.long_memory_enabled).lower() == "true")
                     ),
                     long_memory_dir=args.long_memory_dir,
                     long_memory_top_k=args.long_memory_top_k
                     )
                )
