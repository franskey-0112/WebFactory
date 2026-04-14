"""
This is a batch test script.
This release adds the following features:
1. Support screenshots of the evaluation process
2. Support Online_Mind2Web task evaluation
3. Support access to gpt-4.1, o3-mini, o4-mini and other models
4. Support different RAG modes including DOM Vision RAG

Tips: To run in a Linux environment without a visual interface, use the following command to start:
    sudo yum install -y xorg-x11-server-Xvfb
    xvfb-run -a python batch_eval.py
    
    Ubantu/Debian users can use the following command to install xvfb:
    sudo apt-get update
    sudo apt-get install -y xvfb
    xvfb-run -a python batch_eval.py --global_reward_mode dom_reward --snapshot test/exp --planning_text_model gpt-4.1 --output_log test/exp/batch_run_log.txt --end_judge enabled --end_judge_confidence_threshold 0.8 --end_judge_min_steps 2 --rag_mode vision_rag --rag_log_dir test/exp/rag_log --rag_cache_dir test/exp/rag_cache --consecutive_error_threshold 2
"""
#!/usr/bin/env python3
import json
import os
import subprocess
import argparse
import time
from pathlib import Path

def load_tasks(json_path):
    with open(json_path, 'r') as f:
        data = json.load(f)
    return data

def run_single_task(task, current_idx, args):
    task_name = task["confirmed_task"]
    website = task.get("website", "about:blank")
    
    command = [
        "python", "eval.py",
        "--global_reward_mode", args.global_reward_mode,
        "--index", str(current_idx),
        "--single_task_name", task_name,
        "--single_task_website", website,
        "--snapshot", args.snapshot,
        "--planning_text_model", args.planning_text_model,
        "--global_reward_text_model", args.global_reward_text_model
    ]
    
    if args.rag_log_dir:
        command.extend(["--rag_log_dir", args.rag_log_dir])
    
    # Add end_judge parameters
    if hasattr(args, 'end_judge') and args.end_judge:
        command.extend(["--end_judge", args.end_judge])
    
    if hasattr(args, 'end_judge_confidence_threshold') and args.end_judge_confidence_threshold:
        command.extend(["--end_judge_confidence_threshold", str(args.end_judge_confidence_threshold)])
    
    if hasattr(args, 'end_judge_min_steps') and args.end_judge_min_steps:
        command.extend(["--end_judge_min_steps", str(args.end_judge_min_steps)])
    
    if hasattr(args, 'consecutive_error_threshold') and args.consecutive_error_threshold:
        command.extend(["--consecutive_error_threshold", str(args.consecutive_error_threshold)])
    
    # Add RAG mode parameter
    if hasattr(args, 'rag_mode') and args.rag_mode:
        command.extend(["--rag_mode", args.rag_mode])
    
    # Add RAG cache directory parameter
    if hasattr(args, 'rag_cache_dir') and args.rag_cache_dir:
        command.extend(["--rag_cache_dir", args.rag_cache_dir])
    
    print(f"\n{'='*80}")
    print(f"Task [{current_idx}]: {task_name}")
    print(f"Website: {website}")
    print(f"{'='*80}")
    
    try:
        subprocess.run(command, check=True)
        print(f"Mission accomplished: {task_name}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Task failure: {task_name}")
        print(f"Error: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Online-Mind2Web Task')
    parser.add_argument('--json_path', type=str, default='data/Online-Mind2Web/101pure.json',
                        help='JSON task file path')
    parser.add_argument('--global_reward_mode', type=str, default='dom_reward',
                        help='Global Reward Mode: dom_reward/no_global_reward/dom_vision_reward')
    parser.add_argument('--index', type=int, default=-1,
                        help='Task index')
    parser.add_argument('--snapshot', type=str, default='results_operator/exp',
                        help='Snapshot directory')
    parser.add_argument('--planning_text_model', type=str, default='gpt-4.1',
                        help='planning_text_model: gpt-4.1/gpt-4o-2024-08-06')
    parser.add_argument('--global_reward_text_model', type=str, default='gpt-4.1',
                        help='global_reward_text_model: gpt-4.1/gpt-4o-2024-08-06')
    parser.add_argument('--start_idx', type=int, default=0,
                        help='The index to start the task')
    parser.add_argument('--end_idx', type=int, default=None,
                        help='The index of the finished task (excluding)')
    parser.add_argument('--delay', type=int, default=5,
                        help='Latency between tasks (seconds)')
    parser.add_argument('--output_log', type=str, default='results_operator/exp/batch_run_log.txt',
                        help='output_log')
    parser.add_argument('--rag_log_dir', type=str, default=None,
                        help='RAG logger storage directory path (if not specified, RAG logging will be disabled)')
    parser.add_argument('--end_judge', type=str, default='disabled',
                        choices=['disabled', 'enabled', 'strict'],
                        help='End judge mode: disabled (no end judge), enabled (standard completion criteria), strict (strict completion criteria)')
    parser.add_argument('--end_judge_confidence_threshold', type=float, default=0.8,
                        help='Confidence threshold for end judge completion (0.0-1.0)')
    parser.add_argument('--end_judge_min_steps', type=int, default=2,
                        help='Minimum steps before end judge starts evaluating')
    parser.add_argument('--consecutive_error_threshold', type=int, default=2,
                        help='Consecutive error threshold - how many consecutive errors to tolerate before stopping task')
    parser.add_argument('--rag_mode', type=str, default='description',
                        choices=['description', 'vision', 'vision_rag', 'description_rag'],
                        help='RAG mode: description (text-based), vision (visual examples), vision_rag (pure image retrieval), description_rag (embedding + description)')
    parser.add_argument('--rag_cache_dir', type=str, default=None,
                        help='RAG cache directory path for pre-built indices (improves vision_rag performance)')
    
    args = parser.parse_args()
    
    out_path = Path(args.output_log)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    # Loading tasks
    json_path = Path(args.json_path)
    if not json_path.exists():
        print(f"Error: File does not exist - {json_path}")
        return
    
    tasks = load_tasks(json_path)
    start_idx = args.start_idx
    end_idx = args.end_idx if args.end_idx is not None else len(tasks)
    
    total_tasks = end_idx - start_idx
    successful_tasks = 0
    
    with open(args.output_log, 'w') as log_file:
        log_file.write(f"The batch job run starts: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        log_file.write(f"total_tasks: {total_tasks}\n\n")
    
    # Run the selected task
    for i, task_data in enumerate(tasks[start_idx:end_idx]):
        current_idx = start_idx + i
        task_name = task_data["confirmed_task"]
        website = task_data.get("website", "about:blank")

        with open(args.output_log, 'a') as log_file:
            # log_file.write(f"[{current_idx}/{len(tasks)}] Running tasks: {task}\n")
            log_file.write(f"[{current_idx}/{len(tasks)}] Running task: {task_name}\n")
            log_file.write(f"Website: {website}\n")
        
        success = run_single_task(task_data, current_idx, args)
        if success:
            successful_tasks += 1
        
        # Logging results
        with open(args.output_log, 'a') as log_file:
            log_file.write(f"results: {'Success' if success else 'failure'}\n\n")
        if i < total_tasks - 1:
            print(f"waiting {args.delay} continue to the next task after seconds...")
            time.sleep(args.delay)
    
    with open(args.output_log, 'a') as log_file:
        log_file.write(f"\nFinish: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        log_file.write(f"Total_tasks: {total_tasks}\n")
        log_file.write(f"Number of successful tasks: {successful_tasks}\n")
        log_file.write(f"Success rate: {successful_tasks/total_tasks*100:.2f}%\n")
    
    print(f"\n{'='*80}")
    print(f"Total_tasks: {total_tasks}")
    print(f"Number of successful tasks: {successful_tasks}")
    print(f"Success rate: {successful_tasks/total_tasks*100:.2f}%")
    print(f"save: {args.output_log}")

if __name__ == "__main__":
    main()
    