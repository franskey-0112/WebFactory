"""
This is a batch test script specifically for OpenAI Operator mode.
This release adds the following features:
1. Support batch evaluation of OpenAI Operator mode (model :computer-use-preview-2025-03-11)
2. Support pure visual observation mode
3. Support RAG logging and custom storage paths

Usage:
    sudo yum install -y xorg-x11-server-Xvfb
    xvfb-run -a python batch_eval_op.py
    
    Ubuntu/Debian User:
    sudo apt-get update
    sudo apt-get install -y xvfb

    xvfb-run -a python batch_eval_op.py --global_reward_mode dom_reward --global_reward_text_model gpt-4.1 --snapshot test/exp --output_log test/exp/batch_operator_log.txt --rag_mode vision_rag --rag_logging_enabled --rag_log_dir test/exp/rag_logs --prompt_logging_enabled --prompt_log_dir test/exp/prompt_logs --end_judge enabled --end_judge_confidence_threshold 0.8 --end_judge_min_steps 2 --consecutive_error_threshold 2
"""

#!/usr/bin/env python3
import json
import os
import subprocess
import argparse
import time
from pathlib import Path

def load_tasks(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def prebuild_rag_database(args):
    """
    Pre-build the RAG database and save to the specified path
    """
    print(f"\n{'='*80}")
    print("building...")
    print(f"{'='*80}")
    
    rag_cache_dir = os.path.join(args.snapshot, "rag_cache")
    os.makedirs(rag_cache_dir, exist_ok=True)
    
    rag_index_path = os.path.join(rag_cache_dir, "rag_index.index")
    if os.path.exists(rag_index_path) and not args.rebuild_rag:
        print("✅ found existing RAG cache, skip pre-build")
        print(f"📁 RAG cache path: {rag_cache_dir}")
        return rag_cache_dir
    try:
        build_script = f"""
import sys
import os
import json
import toml
import traceback

embedding_path = 'Embedding/VLM2Vec-pro'
if embedding_path not in sys.path:
    sys.path.append(embedding_path)

def build_and_save_rag():
    try:
        from rag_database import create_rag_database_from_config
        
        config_path = "configs/embedding.toml"
        if os.path.exists(config_path):
            with open(config_path, 'r', encoding='utf-8') as f:
                toml_config = toml.load(f)
            
            config = {{}}
            for section_name, section_data in toml_config.items():
                config.update(section_data)
        else:
            config = {{
                "model_name": "/home/ubuntu/data/csb/Embedding/Qwen2-VL-TokenSelection-2B",
                "checkpoint_path": "/home/ubuntu/data/csb/Embedding/experiments/train/qwen2_vl-lite_full-lora8-bsz128x8x2-interleave_0.2-lr5e5-max_step_256-warmup_12-uigraph_select_0.5-lm_skip_all-vis_skip_all/huggingface",
                "model_backbone": "qwen2_vl_tokenselection",
                "cand_json_path": "/home/ubuntu/data/csb/Embedding/data/processed_cand_with_task.json",
                "embedding_parquet_path": "/home/ubuntu/data/csb/Embedding/data/trajectory_embedding.parquet",
                "lora": True,
                "pooling": "eos",
                "normalize": True,
                "resize_use_processor": True,
                "max_len": 65536,
                "per_device_eval_batch_size": 2,
                "dataloader_num_workers": 2,
                "device": "cuda"
            }}
        
        print("🔄 initializing RAG database...")
        rag_db = create_rag_database_from_config(**config)
        
        index_path = "{rag_cache_dir}/rag_index.index"
        print(f"💾 saving RAG index to: {{index_path}}")
        rag_db.save_index(index_path)
        
        config_save_path = "{rag_cache_dir}/rag_config.json"
        with open(config_save_path, 'w', encoding='utf-8') as f:
            json.dump(config, f, ensure_ascii=False, indent=2)
        
        print("✅ RAG database built successfully")
        print(f"📁 index file: {{index_path}}")
        print(f"🔧 config file: {{config_save_path}}")
        return True
        
    except Exception as e:
        print(f"RAG database build failed: {{e}}")
        print(f"detailed error information: {{traceback.format_exc()}}")
        return False

if __name__ == "__main__":
    success = build_and_save_rag()
    exit(0 if success else 1)
"""

        script_path = os.path.join(rag_cache_dir, "build_rag.py")
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(build_script)
        
        if args.use_xvfb:
            result = subprocess.run([
                "xvfb-run", "-a", "python", script_path
            ], capture_output=True, text=True, cwd=".")
        else:
            result = subprocess.run([
                "python", script_path
            ], capture_output=True, text=True, cwd=".")
        
        if result.returncode == 0:
            print("RAG database built successfully")
            print(f"RAG cache saved in: {rag_cache_dir}")
            
            try:
                os.remove(script_path)
            except:
                pass
                
            return rag_cache_dir
        else:
            print(f"fail: {result.stderr}")
            print(f"output: {result.stdout}")
            return None
            
    except Exception as e:
        print(f"❌ pre-build error: {e}")
        return None

def run_single_operator_task(task, current_idx, args, rag_cache_dir=None):
    task_name = task["confirmed_task"]
    website = task.get("website", "about:blank")
    task_id = task.get("task_id", f"task_{current_idx}")
    
    # eval_op.py params
    command = [
        "python", "eval_op.py",
        "--observation_mode", "operator",
        "--global_reward_mode", args.global_reward_mode,
        "--index", str(current_idx),
        "--single_task_name", task_name,
        "--single_task_website", website,
        "--single_task_id", task_id,
        "--snapshot", args.snapshot,
        "--planning_text_model", args.planning_text_model,
        "--global_reward_text_model", args.global_reward_text_model,
        "--screenshot_base_dir", args.snapshot
    ]
    
    if args.ground_truth_mode:
        command.append("--ground_truth_mode")
    
    if args.toml_path:
        command.extend(["--toml_path", args.toml_path])
    
    # RAG logging
    if args.rag_logging_enabled:
        command.append("--rag_logging_enabled")
    
    # RAG dir
    if args.rag_log_dir:
        command.extend(["--rag_log_dir", args.rag_log_dir])
    
    # RAG mode
    command.extend(["--rag_mode", args.rag_mode])
    
    # RAG cache
    if rag_cache_dir:
        command.extend(["--rag_cache_dir", rag_cache_dir])

    command.extend(["--long_memory_enabled", str(args.long_memory_enabled).lower()])
    command.extend(["--long_memory_dir", args.long_memory_dir])
    command.extend(["--long_memory_top_k", str(args.long_memory_top_k)])
    
    # Prompt logging
    if args.prompt_logging_enabled:
        command.append("--prompt_logging_enabled")
    
    # Prompt dir
    if args.prompt_log_dir:
        command.extend(["--prompt_log_dir", args.prompt_log_dir])
    
    # End judge
    if hasattr(args, 'end_judge') and args.end_judge:
        command.extend(["--end_judge", args.end_judge])
    
    if hasattr(args, 'end_judge_confidence_threshold') and args.end_judge_confidence_threshold:
        command.extend(["--end_judge_confidence_threshold", str(args.end_judge_confidence_threshold)])
    
    if hasattr(args, 'end_judge_min_steps') and args.end_judge_min_steps:
        command.extend(["--end_judge_min_steps", str(args.end_judge_min_steps)])
    
    if hasattr(args, 'consecutive_error_threshold') and args.consecutive_error_threshold:
        command.extend(["--consecutive_error_threshold", str(args.consecutive_error_threshold)])
    
    print(f"\n{'='*80}")
    print(f"🤖 Operator任务 [{current_idx}]: {task_name}")
    print(f"🌐 网站: {website}")
    print(f"🔧 任务ID: {task_id}")
    print(f"📱 模型: {args.planning_text_model}")
    print(f"📝 RAG日志: {'启用' if args.rag_logging_enabled else '禁用'}")
    print(f"🧠 RAG模式: {args.rag_mode}")
    print(f"💬 Prompt日志: {'启用' if args.prompt_logging_enabled else '禁用'}")
    print(f"⚖️  End_Judge: {args.end_judge}")
    if hasattr(args, 'consecutive_error_threshold'):
        print(f"🔄 连续错误阈值: {args.consecutive_error_threshold}")
    if rag_cache_dir:
        print(f"🗄️  RAG缓存: {rag_cache_dir}")
    if args.rag_logging_enabled and args.rag_log_dir:
        print(f"📂 RAG日志目录: {args.rag_log_dir}")
    if args.prompt_logging_enabled and args.prompt_log_dir:
        print(f"💬 Prompt日志目录: {args.prompt_log_dir}")
    print(f"{'='*80}")
    
    try:
        # use headless mode
        if args.use_xvfb:
            full_command = ["xvfb-run", "-a"] + command
        else:
            full_command = command
            
        subprocess.run(full_command, check=True)
        print(f"✅ 任务完成: {task_name}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 任务失败: {task_name}")
        print(f"🔥 错误: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='OpenAI Operator Mode Batch Evaluation')
    parser.add_argument('--json_path', type=str, default='data/Online-Mind2Web/Online_Mind2Web.json',
                        help='JSON任务文件路径')
    parser.add_argument('--global_reward_mode', type=str, default='dom_reward',
                        help='全局奖励模式: dom_reward/no_global_reward/dom_vision_reward')
    parser.add_argument('--index', type=int, default=-1,
                        help='任务索引')
    parser.add_argument('--snapshot', type=str, default='test/exp',
                        help='截图目录')
    parser.add_argument('--planning_text_model', type=str, default='computer-use-preview-2025-03-11',
                        help='规划文本模型: computer-use-preview-2025-03-11/gpt-4.1')
    parser.add_argument('--global_reward_text_model', type=str, default='gpt-4.1',
                        help='全局奖励文本模型: gpt-4.1/gpt-4o-mini')
    parser.add_argument('--start_idx', type=int, default=0,
                        help='开始任务的索引')
    parser.add_argument('--end_idx', type=int, default=None,
                        help='结束任务的索引（不包含）')
    parser.add_argument('--delay', type=int, default=10,
                        help='任务间延迟时间（秒）')
    parser.add_argument('--output_log', type=str, default='test/exp/batch_operator_log.txt',
                        help='输出日志文件')
    parser.add_argument('--ground_truth_mode', action="store_true",
                        help='启用真实标准模式')
    parser.add_argument('--toml_path', type=str, default=None,
                        help='TOML配置文件路径')
    parser.add_argument('--use_xvfb', action="store_true", default=True,
                        help='使用xvfb运行（默认启用）')
    parser.add_argument('--max_retries', type=int, default=2,
                        help='每个任务的最大重试次数')
    parser.add_argument('--rag_logging_enabled', action="store_true", default=False,
                        help='启用RAG日志记录')
    parser.add_argument('--rag_log_dir', type=str, default=None,
                        help='RAG日志文件的输出目录')
    parser.add_argument('--rag_mode', type=str, default='description',
                        choices=['description', 'vision', 'vision_rag', 'description_rag', 'hybrid_rag', 'none'],
                        help='RAG mode: description / vision / vision_rag / description_rag / hybrid_rag / none')
    parser.add_argument('--long_memory_enabled', type=str, default='auto',
                        choices=['auto', 'true', 'false'],
                        help='是否启用层次化长期记忆')
    parser.add_argument('--long_memory_dir', type=str, default='memory_store',
                        help='长期记忆存储目录')
    parser.add_argument('--long_memory_top_k', type=int, default=3,
                        help='长期记忆检索top-k')
    parser.add_argument('--prompt_logging_enabled', action='store_true', default=False,
                        help='启用Prompt日志记录')
    parser.add_argument('--prompt_log_dir', type=str, default=None,
                        help='Prompt日志文件的输出目录')
    parser.add_argument('--end_judge', type=str, default='disabled',
                        choices=['disabled', 'enabled', 'strict'],
                        help='mode: disabled / enabled / strict')
    parser.add_argument('--end_judge_confidence_threshold', type=float, default=0.8,
                        help='confidence threshold (0.0-1.0)')
    parser.add_argument('--end_judge_min_steps', type=int, default=2,
                        help='minimum steps to start end judge')
    parser.add_argument('--consecutive_error_threshold', type=int, default=2,
                        help='Consecutive error threshold - how many consecutive errors to tolerate before stopping task')
    parser.add_argument('--rebuild_rag', action='store_true', default=False,
                        help='force rebuild RAG database (even if cache exists)')
    parser.add_argument('--skip_rag_prebuild', action='store_true', default=False,
                        help='skip RAG pre-build (for testing)')
    
    args = parser.parse_args()
    
    # load tasks
    json_path = Path(args.json_path)
    if not json_path.exists():
        print(f"❌ failed to load json file - {json_path}")
        return
    
    tasks = load_tasks(json_path)
    start_idx = args.start_idx
    end_idx = args.end_idx if args.end_idx is not None else len(tasks)
    
    total_tasks = end_idx - start_idx
    successful_tasks = 0
    failed_tasks = []
    
    os.makedirs(os.path.dirname(args.output_log), exist_ok=True)
    os.makedirs(args.snapshot, exist_ok=True)
    
    img_screenshots_dir = os.path.join(args.snapshot, "img_screenshots")
    logs_dir = os.path.join(args.snapshot, "logs")
    os.makedirs(img_screenshots_dir, exist_ok=True)
    os.makedirs(logs_dir, exist_ok=True)
    
    if args.output_log == 'results_operator/batch_exp1/logs/batch_operator_log.txt':
        args.output_log = os.path.join(logs_dir, 'batch_operator_log.txt')     
               
    # pre-build RAG database (for embedding-based rag modes)
    rag_cache_dir = None
    if args.rag_mode in ["vision_rag", "description_rag", "hybrid_rag"] and not args.skip_rag_prebuild:
        rag_cache_dir = prebuild_rag_database(args)
        if rag_cache_dir is None:
            print("❌ RAG database pre-build failed, exit batch tasks")
            return
    
    # init log file
    with open(args.output_log, 'w', encoding='utf-8') as log_file:
        log_file.write(f"🚀 OpenAI Operator批量任务开始: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        log_file.write(f"📊 总任务数: {total_tasks}\n")
        log_file.write(f"🤖 使用模型: {args.planning_text_model}\n")
        log_file.write(f"📁 结果目录: {args.snapshot}\n")
        log_file.write(f"📸 截图目录: {img_screenshots_dir}\n")
        log_file.write(f"⏱️  任务间延迟: {args.delay}秒\n")
        log_file.write(f"🔄 最大重试次数: {args.max_retries}\n")
        log_file.write(f"📝 RAG日志: {'启用' if args.rag_logging_enabled else '禁用'}\n")
        log_file.write(f"🧠 RAG模式: {args.rag_mode}\n")
        log_file.write(f"💬 Prompt日志: {'启用' if args.prompt_logging_enabled else '禁用'}\n")
        log_file.write(f"⚖️  结束判断模式: {getattr(args, 'end_judge', 'disabled')}\n")
        if getattr(args, 'end_judge', 'disabled') != 'disabled':
            log_file.write(f"🎯 结束判断信心阈值: {getattr(args, 'end_judge_confidence_threshold', 0.8)}\n")
            log_file.write(f"📊 结束判断最少步数: {getattr(args, 'end_judge_min_steps', 2)}\n")
            log_file.write(f"🔄 连续错误阈值: {getattr(args, 'consecutive_error_threshold', 2)}\n")
        if args.rag_logging_enabled and args.rag_log_dir:
            log_file.write(f"📂 RAG日志目录: {args.rag_log_dir}\n")
        if args.prompt_logging_enabled and args.prompt_log_dir:
            log_file.write(f"💬 Prompt日志目录: {args.prompt_log_dir}\n")
        if rag_cache_dir:
            log_file.write(f"🗄️  RAG缓存目录: {rag_cache_dir}\n")
        log_file.write("\n")
    
    print(f"🚀 开始OpenAI Operator批量任务评估")
    print(f"📊 任务范围: {start_idx} - {end_idx-1} (共{total_tasks}个任务)")
    print(f"🤖 使用模型: {args.planning_text_model}")
    print(f"🧠 RAG模式: {args.rag_mode}")
    print(f"💬 Prompt日志: {'启用' if args.prompt_logging_enabled else '禁用'}")
    # print(f"结束判断模式: {getattr(args, 'end_judge', 'disabled')}")
    # if getattr(args, 'end_judge', 'disabled') != 'disabled':
        # print(f"结束判断信心阈值: {getattr(args, 'end_judge_confidence_threshold', 0.8)}")
        # print(f"结束判断最少步数: {getattr(args, 'end_judge_min_steps', 2)}")
    print(f"📁 结果目录: {args.snapshot}")
    print(f"📸 截图目录: {img_screenshots_dir}")
    if args.prompt_logging_enabled and args.prompt_log_dir:
        print(f"💬 Prompt日志目录: {args.prompt_log_dir}")
    if rag_cache_dir:
        print(f"🗄️  RAG缓存目录: {rag_cache_dir}")
    
    for i, task_data in enumerate(tasks[start_idx:end_idx]):
        current_idx = start_idx + i
        task_name = task_data["confirmed_task"]
        website = task_data.get("website", "about:blank")
        task_id = task_data.get("task_id", f"task_{current_idx}")

        with open(args.output_log, 'a', encoding='utf-8') as log_file:
            log_file.write(f"📋 [{current_idx}/{len(tasks)}] 运行任务: {task_name}\n")
            log_file.write(f"🌐 网站: {website}\n")
            log_file.write(f"🔧 任务ID: {task_id}\n")
        
        # run task with retry
        success = False
        for attempt in range(args.max_retries + 1):
            if attempt > 0:
                print(f"🔄 重试第{attempt}次: {task_name}")
                with open(args.output_log, 'a', encoding='utf-8') as log_file:
                    log_file.write(f"🔄 重试第{attempt}次\n")
            
            success = run_single_operator_task(task_data, current_idx, args, rag_cache_dir)
            if success:
                break
            elif attempt < args.max_retries:
                retry_delay = min(30, args.delay * 2)  # 重试时增加延迟
                print(f"⏳ 等待{retry_delay}秒后重试...")
                time.sleep(retry_delay)
        
        if success:
            successful_tasks += 1
            print(f"✅ 任务成功: {task_name}")
        else:
            failed_tasks.append({
                "index": current_idx,
                "task_name": task_name,
                "task_id": task_id,
                "website": website
            })
            print(f"❌ 任务最终失败: {task_name}")
        
        with open(args.output_log, 'a', encoding='utf-8') as log_file:
            log_file.write(f"📊 结果: {'成功' if success else '失败'}\n")
            if not success:
                log_file.write(f"❌ 经过{args.max_retries}次重试后仍然失败\n")
            log_file.write("\n")
        
        # wait for next task
        if i < total_tasks - 1:
            print(f"⏳ 等待{args.delay}秒后继续下一个任务...")
            time.sleep(args.delay)
    
    # final result
    success_rate = (successful_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    with open(args.output_log, 'a', encoding='utf-8') as log_file:
        log_file.write(f"\n🏁 完成时间: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        log_file.write(f"📊 总任务数: {total_tasks}\n")
        log_file.write(f"✅ 成功任务数: {successful_tasks}\n")
        log_file.write(f"❌ 失败任务数: {len(failed_tasks)}\n")
        log_file.write(f"📈 成功率: {success_rate:.2f}%\n")
        
        if failed_tasks:
            log_file.write(f"\n❌ 失败任务详情:\n")
            for failed_task in failed_tasks:
                log_file.write(f"  - [{failed_task['index']}] {failed_task['task_name']} ({failed_task['task_id']})\n")
                log_file.write(f"    网站: {failed_task['website']}\n")
    
    print(f"\n{'='*80}")
    print(f"🏁 OpenAI Operator批量任务评估完成!")
    print(f"📊 总任务数: {total_tasks}")
    print(f"✅ 成功任务数: {successful_tasks}")
    print(f"❌ 失败任务数: {len(failed_tasks)}")
    print(f"📈 成功率: {success_rate:.2f}%")
    print(f"📝 详细日志: {args.output_log}")
    
    if failed_tasks:
        print(f"\n❌ 失败的任务:")
        for failed_task in failed_tasks:
            print(f"  - [{failed_task['index']}] {failed_task['task_name']}")
    
    print(f"{'='*80}")

if __name__ == "__main__":
    main()
