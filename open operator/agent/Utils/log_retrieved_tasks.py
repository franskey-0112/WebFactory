#!/usr/bin/env python3
"""
The retrieval task logging module
Provides the logging function of the RAG retrieval process
"""

import json
import os
from datetime import datetime
from typing import List, Optional

def log_retrieval(
    user_request: str,
    retrieved_tasks: List[str],
    retrieved_texts: List[str],
    retrieved_image_paths: List[str],
    log_path: str = "Logs/retrieved_tasks.json"
):
    """
    The RAG retrieval results were recorded
    
    Args:
        user_request: User request
        retrieved_tasks: The list of retrieved tasks
        retrieved_texts: The list of retrieved texts
        retrieved_image_paths: The list of retrieved image paths
        log_path: Log file path
    """
    try:
        os.makedirs(os.path.dirname(log_path), exist_ok=True)
        
        log_entry = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "user_request": user_request,
            "retrieved_tasks": retrieved_tasks,
            "retrieved_texts_count": len(retrieved_texts),
            "retrieved_image_paths_count": len(retrieved_image_paths),
            "retrieved_data": {
                "tasks": retrieved_tasks,
                "texts": [text[:200] + "..." if len(text) > 200 else text for text in retrieved_texts],  # long text truncation
                "image_paths": retrieved_image_paths
            }
        }
        
        existing_logs = []
        if os.path.exists(log_path):
            try:
                with open(log_path, 'r', encoding='utf-8') as f:
                    existing_logs = json.load(f)
                if not isinstance(existing_logs, list):
                    existing_logs = []
            except Exception:
                existing_logs = []
        
        existing_logs.append(log_entry)
        
        if len(existing_logs) > 100:
            existing_logs = existing_logs[-100:]
        
        with open(log_path, 'w', encoding='utf-8') as f:
            json.dump(existing_logs, f, ensure_ascii=False, indent=2)
        
        print(f"📝 RAG retrieval logged to: {log_path}")
        print(f"   - Tasks: {len(retrieved_tasks)}")
        print(f"   - Texts: {len(retrieved_texts)}")
        print(f"   - Images: {len(retrieved_image_paths)}")
        
    except Exception as e:
        print(f"⚠️  Warning: Failed to log retrieval results: {e}")


def get_retrieval_summary(log_path: str = "Logs/retrieved_tasks.json") -> Optional[dict]:
    """
    Get a summary of the retrieval log

    Args:
        log_path: Log file path
        
    Returns:
        Log digest dictionary
    """
    try:
        if not os.path.exists(log_path):
            return None
        
        with open(log_path, 'r', encoding='utf-8') as f:
            logs = json.load(f)
        
        if not logs:
            return None
        
        return {
            "total_entries": len(logs),
            "latest_timestamp": logs[-1]["timestamp"],
            "unique_requests": len(set(log["user_request"] for log in logs)),
            "average_tasks_per_request": sum(len(log["retrieved_tasks"]) for log in logs) / len(logs),
            "average_images_per_request": sum(log["retrieved_image_paths_count"] for log in logs) / len(logs)
        }
        
    except Exception as e:
        print(f"⚠️  Warning: Failed to get retrieval summary: {e}")
        return None


if __name__ == "__main__":
    print("🧪 Testing log_retrieved_tasks module...")
    # 模拟测试数据
    test_user_request = "Test task for RAG retrieval"
    test_retrieved_tasks = ["Task 1", "Task 2"]
    test_retrieved_texts = ["Text content 1", "Text content 2"]
    test_retrieved_image_paths = ["image1.png", "image2.png"]
    
    # 测试日志记录
    log_retrieval(
        user_request=test_user_request,
        retrieved_tasks=test_retrieved_tasks,
        retrieved_texts=test_retrieved_texts,
        retrieved_image_paths=test_retrieved_image_paths,
        log_path="test_logs/test_retrieved_tasks.json"
    )
    
    # 测试摘要获取
    summary = get_retrieval_summary("test_logs/test_retrieved_tasks.json")
    if summary:
        print("📊 Retrieval summary:")
        for key, value in summary.items():
            print(f"   {key}: {value}")
    
    print("✅ Module test completed!") 