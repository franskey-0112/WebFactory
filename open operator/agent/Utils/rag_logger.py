"""
Utility classes that record the retrieval process and results of RAG
"""

import os
import json
import time
from datetime import datetime

class RAGLogger:
    """Utility classes that record the retrieval process and results of RAG"""
    
    def __init__(self, rag_log_dir=None):
        """
        初始化RAGLogger
        
        Args:
            rag_log_dir: 自定义RAG日志存储目录，如果为None则使用默认路径
        """
        if rag_log_dir:
            self.rag_dir = os.path.join(rag_log_dir, "rag_json")
        else:
            self.rag_dir = os.path.join("rag_result", "rag_json")
        os.makedirs(self.rag_dir, exist_ok=True)
        
    def log_rag_step(self, task_id, step_idx, rag_data):
        """
        The information of a RAG decision step is recorded

        Args:
        task_id: Task ID or task name
        step_idx: The index of the current step
        rag_data: A dictionary containing information about RAGs
        """
        safe_task_id = self._get_safe_filename(str(task_id))
        filename = f"{safe_task_id}.json"
        filepath = os.path.join(self.rag_dir, filename)
        
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                task_data = json.load(f)
        else:
            task_data = {
                "task_id": task_id,
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "steps": []
            }
        
        # add or update the step
        if step_idx < len(task_data["steps"]):
            task_data["steps"][step_idx].update(rag_data)
        else:
            while len(task_data["steps"]) < step_idx:
                task_data["steps"].append({"step_idx": len(task_data["steps"]), "empty": True})
            
            rag_data["step_idx"] = step_idx
            rag_data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            task_data["steps"].append(rag_data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(task_data, f, ensure_ascii=False, indent=2)
            
        return filepath
    
    def _get_safe_filename(self, filename):
        """Converts the string to a secure filename"""
        for char in ['/', '\\', ':', '*', '?', '"', '<', '>', '|', ' ']:
            filename = filename.replace(char, '_')
        return filename

class VisionRAGLogger:
    """专门用于Vision RAG模式的日志记录器"""
    
    def __init__(self, rag_log_dir=None):
        """
        初始化VisionRAGLogger
        
        Args:
            rag_log_dir: 自定义RAG日志存储目录，如果为None则使用默认路径
        """
        if rag_log_dir:
            self.vision_rag_dir = os.path.join(rag_log_dir, "vision_rag_json")
            self.image_cache_dir = os.path.join(rag_log_dir, "cached_images")
        else:
            self.vision_rag_dir = os.path.join("rag_result", "vision_rag_json")
            self.image_cache_dir = os.path.join("rag_result", "cached_images")
        
        os.makedirs(self.vision_rag_dir, exist_ok=True)
        os.makedirs(self.image_cache_dir, exist_ok=True)
        
    def log_vision_rag_step(self, task_id, step_idx, rag_data):
        """
        记录Vision RAG决策步骤的信息
        
        Args:
            task_id: 任务ID或任务名称
            step_idx: 当前步骤的索引
            rag_data: 包含Vision RAG信息的字典
        """
        safe_task_id = self._get_safe_filename(str(task_id))
        filename = f"{safe_task_id}_vision.json"
        filepath = os.path.join(self.vision_rag_dir, filename)
        
        # 加载或创建任务数据
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                task_data = json.load(f)
        else:
            task_data = {
                "task_id": task_id,
                "rag_mode": "vision",
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "steps": []
            }
        
        # 处理图像数据
        processed_rag_data = self._process_vision_data(rag_data, safe_task_id, step_idx)
        
        # 添加或更新步骤
        if step_idx < len(task_data["steps"]):
            task_data["steps"][step_idx].update(processed_rag_data)
        else:
            while len(task_data["steps"]) < step_idx:
                task_data["steps"].append({"step_idx": len(task_data["steps"]), "empty": True})
            
            processed_rag_data["step_idx"] = step_idx
            processed_rag_data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            task_data["steps"].append(processed_rag_data)
        
        # 保存任务数据
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(task_data, f, ensure_ascii=False, indent=2)
            
        return filepath
    
    def _process_vision_data(self, rag_data, task_id, step_idx):
        """
        处理Vision RAG数据，提取和保存图像信息
        
        Args:
            rag_data: 原始RAG数据
            task_id: 任务ID
            step_idx: 步骤索引
            
        Returns:
            处理后的RAG数据
        """
        processed_data = rag_data.copy()
        
        # 处理检索到的图像信息
        if "retrieved_images" in rag_data:
            processed_images = []
            for i, image_info in enumerate(rag_data["retrieved_images"]):
                # 为每个图像创建缓存条目
                image_cache_info = {
                    "image_index": i,
                    "original_path": image_info.get("path", ""),
                    "task_name": image_info.get("task_name", ""),
                    "step_description": image_info.get("step_description", ""),
                    "cached_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                }
                
                # 如果有base64图像数据，可以选择性地保存
                if "base64_data" in image_info:
                    # 注意：为了节省空间，我们不保存base64数据到JSON，只记录元数据
                    image_cache_info["has_base64_data"] = True
                    image_cache_info["data_size"] = len(image_info["base64_data"])
                else:
                    image_cache_info["has_base64_data"] = False
                
                processed_images.append(image_cache_info)
            
            processed_data["retrieved_images"] = processed_images
        
        # 处理当前截图信息
        if "current_screenshot" in rag_data:
            screenshot_info = {
                "available": True,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "data_size": len(rag_data["current_screenshot"]) if rag_data["current_screenshot"] else 0
            }
            processed_data["current_screenshot"] = screenshot_info
        
        # 处理构建的消息信息（移除图像数据以减少文件大小）
        if "constructed_messages" in rag_data:
            safe_messages = []
            for msg in rag_data["constructed_messages"]:
                safe_msg = {"role": msg["role"]}
                
                if msg["role"] == "system":
                    safe_msg["content"] = msg["content"]
                elif msg["role"] == "user" and isinstance(msg["content"], list):
                    safe_content = []
                    image_count = 0
                    text_count = 0
                    
                    for item in msg["content"]:
                        if item.get("type") == "input_text":
                            text_count += 1
                            safe_content.append({
                                "type": "input_text",
                                "text_length": len(item.get("text", "")),
                                "text_preview": item.get("text", "")[:200] + "..." if len(item.get("text", "")) > 200 else item.get("text", "")
                            })
                        elif item.get("type") == "input_image":
                            image_count += 1
                            safe_content.append({
                                "type": "input_image",
                                "image_index": image_count,
                                "data_available": True
                            })
                    
                    safe_msg["content"] = safe_content
                    safe_msg["summary"] = {
                        "total_text_items": text_count,
                        "total_image_items": image_count
                    }
                else:
                    safe_msg["content"] = str(msg["content"])[:200] + "..." if len(str(msg["content"])) > 200 else str(msg["content"])
                
                safe_messages.append(safe_msg)
            
            processed_data["constructed_messages"] = safe_messages
        
        # 添加Vision RAG特定的统计信息
        processed_data["vision_rag_stats"] = {
            "total_retrieved_examples": len(rag_data.get("retrieved_tasks", [])),
            "total_images_processed": len(rag_data.get("retrieved_images", [])),
            "has_current_screenshot": "current_screenshot" in rag_data and rag_data["current_screenshot"] is not None,
            "constructor_type": rag_data.get("rag_constructor_type", ""),
            "processing_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return processed_data
    
    def get_vision_rag_summary(self, task_id):
        """
        获取指定任务的Vision RAG使用摘要
        
        Args:
            task_id: 任务ID
            
        Returns:
            Vision RAG使用摘要
        """
        safe_task_id = self._get_safe_filename(str(task_id))
        filename = f"{safe_task_id}_vision.json"
        filepath = os.path.join(self.vision_rag_dir, filename)
        
        if not os.path.exists(filepath):
            return None
        
        with open(filepath, 'r', encoding='utf-8') as f:
            task_data = json.load(f)
        
        # 计算摘要统计
        total_steps = len(task_data["steps"])
        total_images = sum(len(step.get("retrieved_images", [])) for step in task_data["steps"])
        total_examples = sum(step.get("vision_rag_stats", {}).get("total_retrieved_examples", 0) for step in task_data["steps"])
        
        summary = {
            "task_id": task_id,
            "rag_mode": "vision",
            "total_steps": total_steps,
            "total_retrieved_examples": total_examples,
            "total_images_processed": total_images,
            "created_at": task_data.get("created_at", ""),
            "last_updated": task_data["steps"][-1].get("timestamp", "") if task_data["steps"] else ""
        }
        
        return summary
    
    def log_rag_step(self, task_id, step_idx, rag_data):
        """
        兼容性方法：将调用重定向到log_vision_rag_step
        
        Args:
            task_id: 任务ID或任务名称
            step_idx: 当前步骤的索引
            rag_data: 包含RAG信息的字典
        """
        # 重定向到Vision RAG专用方法
        return self.log_vision_rag_step(task_id, step_idx, rag_data)
    
    def _get_safe_filename(self, filename):
        """将字符串转换为安全的文件名"""
        for char in ['/', '\\', ':', '*', '?', '"', '<', '>', '|', ' ']:
            filename = filename.replace(char, '_')
        return filename