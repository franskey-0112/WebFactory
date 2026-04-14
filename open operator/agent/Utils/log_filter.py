"""
Log Filter Utility for removing base64 image data from logs
Helps reduce log file size while preserving text and DOM content
"""

import json
import re
from typing import Any, Dict, List, Union

def filter_base64_from_content(content: Any, max_text_length: int = 2000) -> Any:
    """
    Filter base64 image data from content while preserving text and DOM information
    
    Args:
        content: Content to filter (can be string, dict, or list)
        max_text_length: Maximum length for text content (0 = no limit)
        
    Returns:
        Filtered content with base64 data removed
    """
    if isinstance(content, str):
        # Check if it's a base64 data URL
        if content.startswith('data:image') and 'base64,' in content:
            return "[base64_image_data_removed_for_log_size]"
        elif max_text_length > 0 and len(content) > max_text_length:
            return content[:max_text_length] + "...[truncated]"
        else:
            return content
            
    elif isinstance(content, dict):
        filtered_dict = {}
        for key, value in content.items():
            if key == "image_url" and isinstance(value, dict) and "url" in value:
                if value["url"].startswith('data:image') and 'base64,' in value["url"]:
                    filtered_dict[key] = {"url": "[base64_image_data_removed_for_log_size]"}
                else:
                    filtered_dict[key] = value
            elif key == "image_url" and isinstance(value, str):
                if value.startswith('data:image') and 'base64,' in value:
                    filtered_dict[key] = "[base64_image_data_removed_for_log_size]"
                else:
                    filtered_dict[key] = value
            else:
                filtered_dict[key] = filter_base64_from_content(value, max_text_length)
        return filtered_dict
        
    elif isinstance(content, list):
        filtered_list = []
        for item in content:
            filtered_list.append(filter_base64_from_content(item, max_text_length))
        return filtered_list
        
    else:
        return content

def filter_messages_for_logging(messages: List[Dict[str, Any]], preserve_dom_text: bool = True) -> List[Dict[str, Any]]:
    """
    Filter messages for logging, removing base64 image data but preserving DOM and text content
    
    Args:
        messages: List of message dictionaries
        preserve_dom_text: Whether to preserve full DOM text content
        
    Returns:
        Filtered messages suitable for logging
    """
    filtered_messages = []
    
    for msg in messages:
        filtered_msg = {"role": msg["role"]}
        
        if msg["role"] == "system":
            filtered_msg["content"] = msg["content"]
            
        elif msg["role"] == "user":
            if isinstance(msg["content"], list):
                filtered_content = []
                for item in msg["content"]:
                    item_type = item.get("type", "unknown")
                    
                    if item_type == "text":
                        # Preserve full text content (including DOM) as requested
                        text_content = item.get("text", "")
                        if preserve_dom_text:
                            filtered_content.append({
                                "type": "text",
                                "text": text_content,
                                "text_length": len(text_content)
                            })
                        else:
                            # Truncate only if preserve_dom_text is False
                            filtered_content.append({
                                "type": "text", 
                                "text": text_content[:1000] + "...[truncated]" if len(text_content) > 1000 else text_content,
                                "text_length": len(text_content)
                            })
                            
                    elif item_type == "image_url":
                        filtered_content.append({
                            "type": "image_url",
                            "image_url": {"url": "[base64_image_data_removed_for_log_size]"},
                            "original_url_length": len(str(item.get("image_url", {}).get("url", "")))
                        })
                        
                    elif item_type == "input_text":
                        # Handle input_text type (for OperatorVisionRAGConstructor)
                        text_content = item.get("text", "")
                        if preserve_dom_text:
                            filtered_content.append({
                                "type": "input_text",
                                "text": text_content,
                                "text_length": len(text_content)
                            })
                        else:
                            filtered_content.append({
                                "type": "input_text",
                                "text": text_content[:1000] + "...[truncated]" if len(text_content) > 1000 else text_content,
                                "text_length": len(text_content)
                            })
                            
                    elif item_type == "input_image":
                        filtered_content.append({
                            "type": "input_image",
                            "image_url": "[base64_image_data_removed_for_log_size]",
                            "original_url_length": len(str(item.get("image_url", "")))
                        })
                        
                    else:
                        # Handle other types
                        filtered_content.append({
                            "type": item_type,
                            "content_preview": str(item)[:100] + "...[truncated]" if len(str(item)) > 100 else str(item)
                        })
                
                filtered_msg["content"] = filtered_content
                filtered_msg["content_items"] = len(msg["content"])
                
            else:
                # Single content (string)
                content_str = str(msg["content"])
                if preserve_dom_text:
                    filtered_msg["content"] = content_str
                else:
                    filtered_msg["content"] = content_str[:2000] + "...[truncated]" if len(content_str) > 2000 else content_str
                filtered_msg["content_length"] = len(content_str)
                
        else:
            filtered_msg["content"] = msg["content"]
            
        filtered_messages.append(filtered_msg)
    
    return filtered_messages

def create_log_safe_prompt_summary(messages: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Create a log-safe summary of prompt messages with size optimization
    
    Args:
        messages: Original messages
        
    Returns:
        Dictionary with summary statistics and filtered content
    """
    total_text_length = 0
    total_images = 0
    message_types = []
    
    for msg in messages:
        message_types.append(msg["role"])
        if isinstance(msg["content"], list):
            for item in msg["content"]:
                if item.get("type") in ["text", "input_text"]:
                    total_text_length += len(item.get("text", ""))
                elif item.get("type") in ["image_url", "input_image"]:
                    total_images += 1
        elif isinstance(msg["content"], str):
            total_text_length += len(msg["content"])
    
    return {
        "message_count": len(messages),
        "message_roles": message_types,
        "total_text_length": total_text_length,
        "total_images": total_images,
        "estimated_text_tokens": total_text_length // 4,
        "filtered_messages": filter_messages_for_logging(messages, preserve_dom_text=True)
    } 