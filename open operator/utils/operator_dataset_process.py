"""
Working with datasets in operator mode

usage:
    python operator_dataset_process.py --results_dir results_dir/ --output_dir dataset_dir/
"""

import os
import json
import shutil
from pathlib import Path
import re
from difflib import SequenceMatcher
from collections import defaultdict
import argparse

def normalize_filename(name):
    replacements = {
        '/': '_', 
        '\\': '_',
        ':': '_',
        '*': '',
        '?': '',
        '"': '',
        '<': '',
        '>': '',
        '|': '_'
    }
    for char, replacement in replacements.items():
        name = name.replace(char, replacement)
    return name

def calculate_similarity(str1, str2):
    return SequenceMatcher(None, str1.lower(), str2.lower()).ratio()

def find_best_match_improved(folder_name, tasks):
    """
    Simplified matching function - now the folder name is the task ID, directly perform exact matching
    """
    # First try to match the task ID directly
    for task in tasks:
        if "task_id" not in task:
            continue
        
        task_id = task["task_id"]
        if folder_name == task_id:
            task_description = task.get("confirmed_task", "unknown")
            print(f"direct match success: '{folder_name}' -> '{task_description}'")
            return task_id
    
    print(f"Warning: folder name '{folder_name}' is not a valid task ID, try fuzzy matching...")
    
    best_match = None
    best_score = 0
    best_task_id = None
    
    normalized_folder = normalize_filename(folder_name).lower()
    
    for task in tasks:
        if "confirmed_task" not in task or "task_id" not in task:
            continue
            
        task_description = task["confirmed_task"].lower()
        
        if normalized_folder == task_description:
            return task["task_id"]
        
        if normalized_folder in task_description or task_description in normalized_folder:
            score = len(normalized_folder) / max(len(normalized_folder), len(task_description))
            if score > best_score:
                best_score = score
                best_match = task["confirmed_task"]
                best_task_id = task["task_id"]
        
        folder_words = set(normalized_folder.split('_'))
        task_words = set(task_description.split())
        
        common_words = folder_words.intersection(task_words)
        if len(common_words) > 0:
            word_similarity = len(common_words) / max(len(folder_words), len(task_words))
            if word_similarity > best_score:
                best_score = word_similarity
                best_match = task["confirmed_task"]
                best_task_id = task["task_id"]
        
        similarity = calculate_similarity(normalized_folder, task_description)
        if similarity > best_score and similarity > 0.3:
            best_score = similarity
            best_match = task["confirmed_task"]
            best_task_id = task["task_id"]
    
    if best_score > 0.2:
        print(f"matched: '{folder_name}' -> '{best_match}' (similar: {best_score:.3f})")
        return best_task_id
    
    return None

def process_dataset_improved(results_dir: str, output_dir: str):
    """
    Improved dataset processing function
    
    Args:
        results_dir: The path to the root results directory, which should contain the img_screenshots and json subfolders
        output_dir: The output directory path
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    results_dir = os.path.abspath(results_dir)
    output_dir = os.path.abspath(output_dir)
    
    screenshots_dir = os.path.join(results_dir, "img_screenshots")
    json_results_dir = os.path.join(results_dir, "json")
    
    if not os.path.exists(screenshots_dir):
        raise FileNotFoundError(f"Screenshot directory does not exist: {screenshots_dir}")
    if not os.path.exists(json_results_dir):
        raise FileNotFoundError(f"JSON not found: {json_results_dir}")
    
    os.makedirs(output_dir, exist_ok=True)
    
    with open(os.path.join(base_dir, "data/Online-Mind2Web/Online_Mind2Web.json"), "r") as f:
        tasks = json.load(f)
    
    available_json_files = set(f for f in os.listdir(json_results_dir) if f.endswith('.json'))
    print(f"find {len(available_json_files)} JSON files")
    
    processed_count = 0
    failed_folders = []
    successful_matches = []
    
    for folder_name in os.listdir(screenshots_dir):
        folder_path = os.path.join(screenshots_dir, folder_name)
        if not os.path.isdir(folder_path):
            continue
        
        print(f"\nprocess folder: {folder_name}")
        
        task_id = find_best_match_improved(folder_name, tasks)
        
        if not task_id:
            print(f"Warning: No task ID matching '{folder_name}'")
            failed_folders.append(folder_name)
            continue
        
        task_dir = os.path.join(output_dir, task_id)
        trajectory_dir = os.path.join(task_dir, "trajectory")
        os.makedirs(trajectory_dir, exist_ok=True)

        all_images = []
        def collect_images(directory, relative_path=""):
            for item in os.listdir(directory):
                item_path = os.path.join(directory, item)
                if os.path.isdir(item_path):
                    collect_images(item_path, os.path.join(relative_path, item))
                elif item.lower().endswith(('.png', '.jpg', '.jpeg')):
                    all_images.append({
                        'full_path': item_path,
                        'relative_path': os.path.join(relative_path, item),
                        'filename': item
                    })

        collect_images(folder_path)

        all_images.sort(key=lambda x: int(re.findall(r'\d+', x['filename'])[0]) if re.findall(r'\d+', x['filename']) else 0)
        
        for i, img_info in enumerate(all_images):
            file_number = re.findall(r'\d+', img_info['filename'])
            file_number = file_number[0] if file_number else str(i)
            file_ext = os.path.splitext(img_info['filename'])[1]
            
            new_filename = f"step_{file_number}_screenshot{file_ext}"
            dst = os.path.join(trajectory_dir, new_filename)
            
            shutil.copy2(img_info['full_path'], dst)
            print(f"copy: {img_info['relative_path']} -> {new_filename}")
        
        json_filename = f"{task_id}.json"
        if json_filename in available_json_files:
            src = os.path.join(json_results_dir, json_filename)
            dst = os.path.join(task_dir, "result.json")
            shutil.copy2(src, dst)
            processed_count += 1
            
            task_description = None
            for task in tasks:
                if task.get("task_id") == task_id:
                    task_description = task.get("confirmed_task", "unknown")
                    break
            
            successful_matches.append((folder_name, task_id, task_description))
            print(f"Success: '{folder_name}' -> {json_filename} (task: {task_description})")
        else:
            print(f"Warning: Task result file not found '{folder_name}' (task_id: {task_id})")
    
    print(f"\n=== result ===")
    print(f"Successful processing {processed_count} tasks")
    
    if successful_matches:
        print(f"\nSuccessfully matched tasks:")
        for folder_name, task_id, task_description in successful_matches:
            print(f"  - {folder_name}")
            print(f"    Task ID: {task_id}")
            print(f"    description: {task_description}")
            print()
    
    if failed_folders:
        print(f"\n No folder matching task ID was found ({len(failed_folders)} folders):")
        for folder in failed_folders:
            print(f"  - {folder}")
        
        for folder in failed_folders[:5]:
            print(f"\dir: {folder}")
            normalized_folder = normalize_filename(folder).lower()
            
            suggestions = []
            for task in tasks:
                if "confirmed_task" not in task:
                    continue
                task_desc = task["confirmed_task"].lower()
                similarity = calculate_similarity(normalized_folder, task_desc)
                if similarity > 0.1:
                    suggestions.append((similarity, task["confirmed_task"], task["task_id"]))
            
            suggestions.sort(reverse=True)
            for i, (similarity, task_desc, task_id) in enumerate(suggestions[:3]):
                print(f"  {i+1}. similar {similarity:.3f}: {task_desc}")
                print(f"     Task ID: {task_id}")

def main():
    parser = argparse.ArgumentParser(description="Working with datasets in operator mode")
    parser.add_argument("--results_dir", type=str, required=True,
                        help="Result root directory path, containing img_screenshots and json subfolders")
    parser.add_argument("--output_dir", type=str, required=True,
                        help="output directory path")
    
    args = parser.parse_args()
    
    process_dataset_improved(
        results_dir=args.results_dir,
        output_dir=args.output_dir
    )
    print("\ok!")

if __name__ == "__main__":
    main() 