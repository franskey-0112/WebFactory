"""
Prompt Logger for recording prompt information and token usage in operator mode
"""

import os
import json
import time
from datetime import datetime
from typing import List, Dict, Any, Optional

class PromptLogger:
    """ Tool class for recording prompt information and token usage of operator mode """
    
    def __init__(self, prompt_log_dir=None):
        if prompt_log_dir:
            self.prompt_dir = os.path.join(prompt_log_dir, "prompt_json")
        else:
            self.prompt_dir = os.path.join("prompt_result", "prompt_json")
        os.makedirs(self.prompt_dir, exist_ok=True)
        
    def log_prompt_step(self, task_id: str, step_idx: int, prompt_data: Dict[str, Any]) -> str:
        """
        Record the information of a prompt decision step """
        safe_task_id = self._get_safe_filename(str(task_id))
        filename = f"{safe_task_id}_prompts.json"
        filepath = os.path.join(self.prompt_dir, filename)
        
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                task_data = json.load(f)
        else:
            task_data = {
                "task_id": task_id,
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "total_input_tokens": 0,
                "total_output_tokens": 0,
                "total_steps": 0,
                "model": prompt_data.get("model", "unknown"),
                "rag_mode": prompt_data.get("rag_mode", "description"),
                "steps": []
            }
        
        # process prompt data, ensure safe storage
        processed_prompt_data = self._process_prompt_data(prompt_data, step_idx)
        
        # update total statistics
        input_tokens = processed_prompt_data.get("input_tokens", 0)
        output_tokens = processed_prompt_data.get("output_tokens", 0)
        task_data["total_input_tokens"] += input_tokens
        task_data["total_output_tokens"] += output_tokens
        task_data["total_steps"] = max(task_data["total_steps"], step_idx + 1)
        task_data["last_updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        if step_idx < len(task_data["steps"]):
            task_data["steps"][step_idx].update(processed_prompt_data)
        else:
            while len(task_data["steps"]) < step_idx:
                task_data["steps"].append({
                    "step_idx": len(task_data["steps"]), 
                    "empty": True,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
            
            processed_prompt_data["step_idx"] = step_idx
            processed_prompt_data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            task_data["steps"].append(processed_prompt_data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(task_data, f, ensure_ascii=False, indent=2)
            
        return filepath
    
    def _process_prompt_data(self, prompt_data: Dict[str, Any], step_idx: int) -> Dict[str, Any]:
        """
        Process prompt data
        
        Args:
            prompt_data: original prompt data
            step_idx: step index
            
        Returns:
            Dict: processed prompt data
        """
        processed_data = {
            "step_idx": step_idx,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "model": prompt_data.get("model", "unknown"),
            "rag_mode": prompt_data.get("rag_mode", "description"),
            "rag_enabled": prompt_data.get("rag_enabled", False),
            "input_tokens": prompt_data.get("input_tokens", 0),
            "output_tokens": prompt_data.get("output_tokens", 0),
            "total_tokens": prompt_data.get("input_tokens", 0) + prompt_data.get("output_tokens", 0),
            "user_request": prompt_data.get("user_request", ""),
            "status_description": prompt_data.get("status_description", ""),
            "feedback": prompt_data.get("feedback", ""),
            "previous_trace_length": len(str(prompt_data.get("previous_trace", ""))),
            "screenshot_available": prompt_data.get("screenshot_available", False),
            "planning_response_preview": self._safe_truncate(prompt_data.get("planning_response", ""), 200),
            "planning_thought": prompt_data.get("planning_thought", ""),
            "planning_action": prompt_data.get("planning_action", {}),
            "execution_time_ms": prompt_data.get("execution_time_ms", 0)
        }
        
        # 处理messages - 去除图片数据）
        if "messages" in prompt_data:
            processed_data["messages"] = self._process_messages(prompt_data["messages"])
            processed_data["message_count"] = len(prompt_data["messages"])
        
        # RAG data
        if prompt_data.get("rag_enabled", False):
            processed_data.update({
                "rag_constructor_type": prompt_data.get("rag_constructor_type", "unknown"),
                "rag_reference_length": len(str(prompt_data.get("rag_reference", ""))),
                "retrieved_tasks_count": len(prompt_data.get("retrieved_tasks", [])),
                "retrieved_images_count": len(prompt_data.get("retrieved_images", []))
            })
            
            if prompt_data.get("rag_mode") == "vision":
                processed_data["retrieved_images_info"] = [
                    {
                        "task_index": img.get("task_index", 0),
                        "task_name": img.get("task_name", "Unknown"),
                        "path_preview": img.get("path", "")[:100] + "..." if len(img.get("path", "")) > 100 else img.get("path", "")
                    }
                    for img in prompt_data.get("retrieved_images", [])
                ]
        
        return processed_data
    
    def _process_messages(self, messages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Process messages
        
        Args:
            messages: original messages list
            
        Returns:
            List[Dict]: processed messages
        """
        processed_messages = []
        
        for msg in messages:
            processed_msg = {"role": msg["role"]}
            
            if msg["role"] == "system":
                # system message keep all content but limit length
                processed_msg["content"] = self._safe_truncate(msg["content"], 1000)
                processed_msg["content_length"] = len(msg["content"])
                
            elif msg["role"] == "user":
                if isinstance(msg["content"], list):
                    processed_content = []
                    for item in msg["content"]:
                        if item["type"] == "input_text":
                            processed_content.append({
                                "type": "input_text",
                                "text": self._safe_truncate(item["text"], 500),
                                "text_length": len(item["text"])
                            })
                        elif item["type"] == "input_image":
                            processed_content.append({
                                "type": "input_image",
                                "image_info": "[base64_image_data_removed_for_privacy]",
                                "has_image": True
                            })
                        elif item["type"] == "text":
                            processed_content.append({
                                "type": "text",
                                "text": self._safe_truncate(item["text"], 1000),
                                "text_length": len(item["text"])
                            })
                        elif item["type"] == "image_url":
                            processed_content.append({
                                "type": "image_url",
                                "image_info": "[base64_image_data_removed_for_log_size]",
                                "has_image_url": True,
                                "url_preview": item.get("image_url", {}).get("url", "")[:50] + "..." if item.get("image_url") else "no_url"
                            })
                        else:
                            processed_content.append({
                                "type": item.get("type", "unknown"),
                                "content_preview": str(item)[:100] + "..." if len(str(item)) > 100 else str(item)
                            })
                    processed_msg["content"] = processed_content
                    processed_msg["content_items"] = len(msg["content"])
                else:
                    # 文本内容
                    processed_msg["content"] = self._safe_truncate(str(msg["content"]), 500)
                    processed_msg["content_length"] = len(str(msg["content"]))
            
            processed_messages.append(processed_msg)
        
        return processed_messages
    
    def _safe_truncate(self, text: str, max_length: int) -> str:
        """
        Safe truncate text
        
        Args:
            text: text to truncate
            max_length: maximum length
            
        Returns:
            str: truncated text
        """
        if not text:
            return ""
        text_str = str(text)
        return text_str[:max_length] + "..." if len(text_str) > max_length else text_str
    
    def _get_safe_filename(self, filename: str) -> str:
        """ Convert string to safe filename """
        for char in ['/', '\\', ':', '*', '?', '"', '<', '>', '|', ' ']:
            filename = filename.replace(char, '_')
        return filename
    
    def get_prompt_summary(self, task_id: str) -> Dict[str, Any]:
        """
        Get the prompt usage summary of a task
        
        Args:
            task_id: task ID
            
        Returns:
            Dict: summary information
        """
        safe_task_id = self._get_safe_filename(str(task_id))
        filename = f"{safe_task_id}_prompts.json"
        filepath = os.path.join(self.prompt_dir, filename)
        
        if not os.path.exists(filepath):
            return {"error": "Prompt log file not found"}
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                task_data = json.load(f)
            
            summary = {
                "task_id": task_data.get("task_id", task_id),
                "total_steps": task_data.get("total_steps", 0),
                "total_input_tokens": task_data.get("total_input_tokens", 0),
                "total_output_tokens": task_data.get("total_output_tokens", 0),
                "total_tokens": task_data.get("total_input_tokens", 0) + task_data.get("total_output_tokens", 0),
                "model": task_data.get("model", "unknown"),
                "rag_mode": task_data.get("rag_mode", "description"),
                "created_at": task_data.get("created_at", ""),
                "last_updated": task_data.get("last_updated", ""),
                "average_tokens_per_step": (task_data.get("total_input_tokens", 0) + task_data.get("total_output_tokens", 0)) / max(1, task_data.get("total_steps", 1)),
                "steps_with_rag": sum(1 for step in task_data.get("steps", []) if step.get("rag_enabled", False))
            }
            
            return summary
            
        except Exception as e:
            return {"error": f"Failed to read prompt summary: {str(e)}"} 