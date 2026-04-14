import sys
# sys.path.append("/home/ubuntu/data/csb/WebRAGent")

# agent/Utils/generate_task_steps.py
import json
import os
from typing import List, Dict, Any
from openai import OpenAI
from pathlib import Path
import time
import pandas as pd
import json5
import base64

def load_shared_tasks() -> List[Dict[str, Any]]:
    """Load tasks from shared tasks file."""
    with open("data/Online-Mind2Web/rag_data/shared_tasks.json", "r") as f:
        data = json.load(f)
        # return data["shared_tasks"][30:60]
        return data["shared_tasks"]

def load_task_data(json_path: str) -> Dict:
    """Load task data from cand_id_text2.json file."""
    with open("data/Online-Mind2Web/rag_data/cand_id_text2.json") as f:
        data = json.load(f)
        return data

def parse_cand_text(text: str) -> tuple:
    """Parse the retrieved text into action space and trajectory steps."""
    parts = text.split('\n\n')
    action_space = parts[0]
    trajectory_text = '\n'.join(parts[1:])
    
    # Parse trajectory into steps
    steps = []
    current_step = {}
    
    for line in trajectory_text.split('\n'):
        line = line.strip()
        if not line:
            continue
            
        if line.startswith('Observation'):
            if current_step:
                steps.append(current_step)
            current_step = {'observation': line}
        elif line.startswith('Action'):
            try:
                action_data = json5.loads(line.split(':', 1)[1].strip())
                current_step['action'] = action_data
            except:
                current_step['action'] = line
                
    if current_step:
        steps.append(current_step)
        
    return action_space, steps

def generate_task_steps(task: Dict[str, Any], task_data: Dict) -> Dict[str, Any]:
    """Generate descriptions for existing workflow sequences using OpenAI."""
    task_name = task["task_name"]
    task_id = task["online_task"]["task_id"]
    
    # Find corresponding task data in dictionary
    if task_id not in task_data.keys():
        print(f"No data found for task {task_name} with ID {task_id}")
        return None
    
    # Get cand_text and cand_image_path directly from task_data
    cand_text = task_data[task_id]["cand_text"]
    cand_image_path = task_data[task_id]["cand_image_path"]
    confirmed_task = task["online_task"]["confirmed_task"]
    website = task["online_task"]["website"]
    
    # Parse existing workflow
    action_space, steps = parse_cand_text(cand_text)
    image_paths = json5.loads(cand_image_path)
    
    # Initialize OpenAI client
    client = OpenAI()
    
    # Process each step with its corresponding image
    described_steps = []
    for step_idx, (step, image_path) in enumerate(zip(steps, image_paths)):
        print(f"\nProcessing step {step_idx + 1} for task {task_name}")
        print(f"Original observation: {step['observation']}")
        print(f"Original action: {step['action']}")
        
        # Read and encode the image
        full_image_path = f"data/Online-Mind2Web/rag_data/image/{image_path}"
        print(f"Loading image from: {full_image_path}")
        
        try:
            with open(full_image_path, 'rb') as img_file:
                img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
                print("Successfully loaded and encoded image")
        except Exception as e:
            print(f"Error loading image: {str(e)}")
            continue
        
        # Create prompt for this step
        prompt = f"""Given the following task and a specific step in its execution, generate a detailed description of what is happening.

Task: {confirmed_task}
Website: {website}

Current step:
Observation: {step['observation']}
Action: {step['action']}

Please provide:
1. A detailed description of what is being observed in this step
2. A clear explanation of the action being taken

Format your response as:
Observation Description: [detailed description of what is being observed]
Action Description: [detailed explanation of the action]"""

        print("\nSending request to OpenAI API...")
        try:
            # Make API call with image
            response = client.chat.completions.create(
                model="gpt-4.1",  # Using vision model to process images（gpt-4o-mini）
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that generates detailed descriptions of web navigation steps."
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/png;base64,{img_base64}"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=800 # 1000
            )
            
            description = response.choices[0].message.content
            print(f"\nOpenAI API Response:\n{description}")
            
        except Exception as e:
            print(f"Error calling OpenAI API: {str(e)}")
            continue
        
        # Parse the description
        observation_desc = ""
        action_desc = ""
        current_section = None
        
        for line in description.split('\n'):
            line = line.strip()
            if not line:
                continue
            
            # Handle different header formats
            if any(line.startswith(prefix) for prefix in ['Observation Description:', '**Observation Description:**', '### Observation Description:']):
                current_section = 'observation'
                # Remove all possible header formats and unwanted symbols
                observation_desc = line.replace('Observation Description:', '').replace('**Observation Description:**', '').replace('### Observation Description:', '').strip()
            elif any(line.startswith(prefix) for prefix in ['Action Description:', '**Action Description:**', '### Action Description:']):
                current_section = 'action'
                # Remove all possible header formats and unwanted symbols
                action_desc = line.replace('Action Description:', '').replace('**Action Description:**', '').replace('### Action Description:', '').strip()
            elif current_section:
                if current_section == 'observation':
                    observation_desc += ' ' + line
                else:
                    action_desc += ' ' + line
        
        # Clean up the descriptions
        def clean_description(text):
            # Remove markdown symbols
            text = text.replace('**', '').replace('###', '')
            # Remove any leading/trailing asterisks
            text = text.strip('*')
            # Remove any multiple spaces
            text = ' '.join(text.split())
            return text.strip()
        
        observation_desc = clean_description(observation_desc)
        action_desc = clean_description(action_desc)
        
        print(f"\nParsed descriptions:")
        print(f"Observation: {observation_desc}")
        print(f"Action: {action_desc}")
        
        described_steps.append({
            'step_number': step_idx + 1,
            'original_observation': step['observation'],
            'original_action': step['action'],
            'observation_description': observation_desc,
            'action_description': action_desc,
            'image_path': image_path
        })
        
        # Add a small delay to avoid rate limiting
        time.sleep(1)
    
    return {
        "task_id": task_id,
        "task_name": task_name,
        "confirmed_task": confirmed_task,
        "website": website,
        "level": task["online_task"]["level"],
        "steps": described_steps,
        "cand_text": cand_text,
        "cand_image_path": cand_image_path
    }

def main():
    # Load tasks
    tasks = load_shared_tasks()
    
    # Load task data from cand_id_text2.json
    json_path = "data/Online-Mind2Web/rag_data/cand_id_text2.json"
    task_data = load_task_data(json_path)
    
    # Create output directory if it doesn't exist
    output_dir = "data/Online-Mind2Web/generated_steps"
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate descriptions for each task
    generated_tasks = []
    for i, task in enumerate(tasks):
        print(f"Generating descriptions for task {i+1}/{len(tasks)}: {task['task_name']}")
        result = generate_task_steps(task, task_data)
        if result:
            generated_tasks.append(result)
    
    # Save results
    output_file = os.path.join(output_dir, "generated_task_descriptions_gpt41.json")
    with open(output_file, "w") as f:
        json.dump(generated_tasks, f, indent=2)
    
    print(f"\nGenerated descriptions have been saved to: {output_file}")
    print(f"Successfully generated descriptions for {len(generated_tasks)} out of {len(tasks)} tasks")

if __name__ == "__main__":
    main()