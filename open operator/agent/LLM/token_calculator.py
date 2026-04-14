import json
from typing import Union, List, Dict, Optional

import tiktoken
from .token_utils import is_model_supported

def calculation_of_token(
    messages: Union[str, List[Dict]], 
    model: str = 'gpt-3.5-turbo', 
    max_tokens: int = 4096
) -> int:
    """
    Calculate the number of tokens in the messages.
    
    Args:
        messages: List of messages or string to calculate tokens for
        model: Model to use for tokenization
        max_tokens: Maximum number of tokens allowed
    
    Returns:
        int: Number of tokens in the messages
    """
    if not is_model_supported(model):
        print(f"Message: Model {model} not in pricing configuration. Skipping token calculation.")
        return 0

    try:
        # Handle special model names that tiktoken doesn't recognize
        if "computer-use-preview" in model or "operator" in model:
            # Computer-use-preview models use the same encoding as GPT-4
            encoding = tiktoken.encoding_for_model("gpt-4")
        elif "gpt-4.1" in model:
            # GPT-4.1 uses the same encoding as GPT-4
            encoding = tiktoken.encoding_for_model("gpt-4")
        else:
            encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        print(f"Warning: Model '{model}' not found in tiktoken. Using default encoding.")
        encoding = tiktoken.get_encoding("cl100k_base")

    current_tokens = 0

    if isinstance(messages, str):
        tokens = encoding.encode(messages)
        current_tokens += len(tokens)
        return current_tokens

    for message in messages:
        content = message.get('content')
        if content is None:
            print("Warning: Message content is None. Skipping.")
            break

        if isinstance(content, list):
            # Process list of prompt elements
            for element in content:
                element_type = element.get('type', '')
                if 'text' in element_type:
                    tokens = encoding.encode(element['text'])
                    current_tokens += len(tokens)
                elif 'image' in element_type or element_type == 'image_url':
                    # Calculate image tokens based on OpenAI's official vision model pricing
                    # Formula: 85 base tokens + 170 * (number of 512x512 tiles)
                    image_url = element.get('image_url', {})
                    if isinstance(image_url, dict):
                        detail = image_url.get('detail', 'auto')
                        if detail == 'low':
                            current_tokens += 85
                            print(f"📸 Image tokens calculated (low detail): 85")
                        else:
                            # High detail calculation using official OpenAI method
                            # Assume typical screenshot dimensions (1280x720)
                            width, height = 1280, 720
                            
                            # Step 1: Scale down to fit within 2048x2048 if necessary
                            if width > 2048 or height > 2048:
                                aspect_ratio = width / height
                                if aspect_ratio > 1:
                                    width = 2048
                                    height = int(2048 / aspect_ratio)
                                else:
                                    height = 2048
                                    width = int(2048 * aspect_ratio)
                            
                            # Step 2: Scale so shortest side is 768px if both dimensions > 768
                            if width > 768 and height > 768:
                                aspect_ratio = width / height
                                if aspect_ratio > 1:
                                    height = 768
                                    width = int(768 * aspect_ratio)
                                else:
                                    width = 768
                                    height = int(768 / aspect_ratio)
                            
                            # Step 3: Calculate tiles (512x512 each)
                            tiles_width = -(-width // 512)  # Ceiling division
                            tiles_height = -(-height // 512)
                            image_tokens = 85 + 170 * (tiles_width * tiles_height)
                            
                            current_tokens += image_tokens
                            print(f"📸 Image tokens calculated (high detail): {image_tokens} (tiles: {tiles_width}x{tiles_height})")
                    else:
                        # Fallback for direct base64 images - use conservative estimate
                        current_tokens += 765  # Typical for 1280x720 screenshots
                        print(f"📸 Image tokens calculated (fallback): 765")
        else:
            # Process direct text content
            tokens = encoding.encode(content)
            current_tokens += len(tokens)

    return current_tokens

def save_token_count_to_file(
    filename: str,
    step_tokens: Dict,
    task_name: str,
    global_reward_text_model: str,
    planning_text_model: str,
    token_pricing: Dict
) -> None:
    """
    Save token count to a file in JSON format.
    
    Args:
        filename: Name of the file to save the token count
        step_tokens: Number of tokens used in steps
        task_name: Name of the task associated with the token count
        global_reward_text_model: Model used for reward modeling
        planning_text_model: Model used for planning
        token_pricing: Pricing information for models
    """
    if not is_model_supported(planning_text_model) or not is_model_supported(global_reward_text_model):
        print(
            f"Message: One or both models ({planning_text_model}, {global_reward_text_model}) "
            "not in pricing configuration. Skipping token saving."
        )
        return

    # Initialize or load existing data
    try:
        with open(filename, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {
            "calls": [],
            "total_planning_input_tokens": 0,
            "total_planning_output_tokens": 0,
            "total_reward_input_tokens": 0,
            "total_reward_output_tokens": 0,
            "total_input_tokens": 0,
            "total_output_tokens": 0,
            "total_tokens": 0,
        }

    # Update call records
    call_record = {
        "task_name": task_name,
        "step_tokens": step_tokens
    }
    data["calls"].append(call_record)

    # Update token counts
    data["total_planning_input_tokens"] += step_tokens["steps_planning_input_token_counts"]
    data["total_planning_output_tokens"] += step_tokens["steps_planning_output_token_counts"]
    data["total_reward_input_tokens"] += step_tokens["steps_reward_input_token_counts"]
    data["total_reward_output_tokens"] += step_tokens["steps_reward_output_token_counts"]
    data["total_input_tokens"] += step_tokens["steps_input_token_counts"]
    data["total_output_tokens"] += step_tokens["steps_output_token_counts"]
    data["total_tokens"] += step_tokens["steps_token_counts"]

    # Update planning model costs
    if planning_text_model in token_pricing["pricing_models"]:
        if "total_planning_input_token_cost" not in data:
            data["total_planning_input_token_cost"] = 0
        if "total_planning_output_token_cost" not in data:
            data["total_planning_output_token_cost"] = 0
            
        data["total_planning_input_token_cost"] += (
            step_tokens["steps_planning_input_token_counts"] * 
            token_pricing[f"{planning_text_model}_input_price"]
        )
        data["total_planning_output_token_cost"] += (
            step_tokens["steps_planning_output_token_counts"] * 
            token_pricing[f"{planning_text_model}_output_price"]
        )

    # Update reward model costs
    if global_reward_text_model in token_pricing["pricing_models"]:
        if "total_reward_input_token_cost" not in data:
            data["total_reward_input_token_cost"] = 0
        if "total_reward_output_token_cost" not in data:
            data["total_reward_output_token_cost"] = 0
            
        data["total_reward_input_token_cost"] += (
            step_tokens["steps_reward_input_token_counts"] * 
            token_pricing[f"{global_reward_text_model}_input_price"]
        )
        data["total_reward_output_token_cost"] += (
            step_tokens["steps_reward_output_token_counts"] * 
            token_pricing[f"{global_reward_text_model}_output_price"]
        )

    # Update total costs
    if (planning_text_model in token_pricing["pricing_models"] and 
        global_reward_text_model in token_pricing["pricing_models"]):
        
        if "total_input_token_cost" not in data:
            data["total_input_token_cost"] = 0
        if "total_output_token_cost" not in data:
            data["total_output_token_cost"] = 0
        if "total_token_cost" not in data:
            data["total_token_cost"] = 0
            
        data["total_input_token_cost"] += (
            data["total_planning_input_token_cost"] + 
            data["total_reward_input_token_cost"]
        )
        data["total_output_token_cost"] += (
            data["total_planning_output_token_cost"] + 
            data["total_reward_output_token_cost"]
        )
        data["total_token_cost"] += (
            data["total_input_token_cost"] + 
            data["total_output_token_cost"]
        )

    # Save updated data
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)
