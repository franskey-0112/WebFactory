from ..Utils.utils import is_valid_base64
import json5
import base64
import json
import time
import os
import toml

from .vision_to_dom_prompts import VisionToDomPrompts
from .dom_vision_disc_prompts import DomVisionDiscPrompts
from .base_prompts import BasePrompts
from .dom_vision_prompts import DomVisionPrompts
from .vision_prompts import VisionPrompts
from jinja2 import Template
from typing import Union, List, Dict, Any, Optional

from agent.Memory.short_memory.history import HistoryMemory
from agent.Memory.retriever import TestOnlyRetriever

class BasePromptConstructor:
    def __init__(self):
        pass


# Build a prompt for planning based on the DOM tree
class PlanningPromptConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = BasePrompts.planning_prompt_system
        self.prompt_user = BasePrompts.planning_prompt_user

    def construct(
            self,
            user_request: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = ""
    ) -> list:
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request)
        if len(previous_trace) > 0:
            self.prompt_user += HistoryMemory(
                previous_trace=previous_trace, reflection=status_description).construct_previous_trace_prompt()
            if status_description != "":
                self.prompt_user += \
                    f"Task completion description is {status_description}"
            if feedback != "":
                self.prompt_user += f"Here are some other things you need to know:\n {feedback}\n"
            self.prompt_user += f"\nHere is the accessibility tree that you should refer to for this task:\n{observation}"
        messages = [{"role": "system", "content": self.prompt_system}, {
            "role": "user", "content": self.prompt_user}]
        return messages

    # Previous thought, action and reflection are converted to formatted strings
    def stringfy_thought_and_action(self, input_list: list) -> str:
        input_list = json5.loads(input_list, encoding="utf-8")
        str_output = "["
        for idx, i in enumerate(input_list):
            str_output += f'Step{idx + 1}:\"Thought: {i["thought"]}, Action: {i["action"]}, Reflection:{i["reflection"]}\";\n'
        str_output += "]"
        return str_output


class VisionDisc2PromptConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = DomVisionDiscPrompts.dom_vision_disc_prompt_system2
        self.prompt_user = DomVisionDiscPrompts.dom_vision_disc_planning_prompt_user

    def construct(
            self,
            user_request: str,
            base64_image: str
    ) -> list:
        rendered_prompt = Template(self.prompt_user).render(
            user_request=user_request)
        prompt_elements = [{"type": "text", "text": rendered_prompt},
                           {"type": "text", "text": "current web page screenshot is:"},
                           {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}]

        # Construct the final message payload
        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": prompt_elements}]
        return messages


class VisionDisc1PromptConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = DomVisionDiscPrompts.dom_vision_disc_prompt_system1

    def construct(
            self,
            base64_image: str
    ) -> list:
        prompt_elements = [{"type": "text", "text": "current web page screenshot is:"},
                           {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}]

        # Construct the final message payload
        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": prompt_elements}]
        return messages


class ObservationVisionDiscPromptConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = DomVisionDiscPrompts.dom_vision_disc_planning_prompt_system
        self.prompt_user = DomVisionDiscPrompts.dom_vision_disc_planning_prompt_user

    def construct(
            self,
            user_request: str,
            previous_trace: str,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            vision_disc_response: str = ""
    ) -> list:
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request)
        if len(previous_trace) > 0:
            self.prompt_user += HistoryMemory(
                previous_trace=previous_trace, reflection=status_description).construct_previous_trace_prompt()
            # if status_description != "":
            #     self.prompt_user += \
            #         f"Task completion description is {status_description}"
            if feedback != "":
                self.prompt_user += f"An invalid action description is below:\n {feedback}\n"
            self.prompt_user += f"\nHere is the accessibility tree that you should refer to for this task:\n{observation}"
            if vision_disc_response:
                self.prompt_user += "\n\nHere is a visual analysis of the webpage's screenshot:\n" + \
                    vision_disc_response
        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": self.prompt_user}]
        return messages

    # Convert previous thought and action into formatted string
    def stringfy_thought_and_action(self, input_list: list) -> str:
        input_list = json5.loads(input_list, encoding="utf-8")
        str_output = "["
        for idx, i in enumerate(input_list):
            str_output += f'Step{idx + 1}:\"Thought: {i["thought"]}, Action: {i["action"]}\";\n'
        str_output += "]"
        return str_output


class ObservationVisionActPromptConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = VisionToDomPrompts.vision_act_planning_prompt_system
        self.prompt_user = VisionToDomPrompts.vision_act_planning_prompt_user

    def construct(
            self,
            user_request: str,
            previous_trace: str,
            observation_vision: str,
            feedback: str = "",
            status_description: str = ""
    ) -> list:
        rendered_prompt = Template(self.prompt_user).render(
            user_request=user_request)
        prompt_elements = [{"type": "text", "text": rendered_prompt}]
        if len(previous_trace) > 0:
            # history_memory = HistoryMemory(previous_trace=previous_trace)
            # trace_prompt = history_memory.construct_previous_trace_prompt()
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, reflection=status_description).construct_previous_trace_prompt()
            prompt_elements.append({"type": "text", "text": trace_prompt})
            # if status_description != "":
            #     prompt_elements.append({"type": "text", "text": f"Task completion description is {status_description}"})
            if feedback != "":
                prompt_elements.append(
                    {"type": "text", "text": f"An invalid action description is below:\n {feedback}\n"})
            # prompt_elements.append({"type": "text", "text": f"The current webpage's URL is {url}"})
            if observation_vision:
                prompt_elements.append(
                    {"type": "text", "text": "The current webpage's screenshot is:"})
                prompt_elements.append(
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{observation_vision}"}})
        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": prompt_elements}]
        # print(prompt_elements)
        print("messages finished!\n")
        return messages


class VisionToDomPromptConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = VisionToDomPrompts.vision_to_dom_planning_prompt_system
        self.prompt_user = ""  # VisionToDomPrompts.vision_act_planning_prompt_user

    def construct(
            self,
            # user_request: str,
            target_element: str,
            action_description: str,
            observation: str
    ) -> list:
        # self.prompt_user = Template(self.prompt_user).render(user_request=user_request)
        self.prompt_user += f"Target Element Description: {target_element}\n"
        if action_description:
            self.prompt_user += f"Action Description: {action_description}\n"
        self.prompt_user += "\nHere is the accessibility tree that you should refer to for this task:\n" + observation
        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": self.prompt_user}]
        return messages


class D_VObservationPromptConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = DomVisionPrompts.d_v_planning_prompt_system
        self.prompt_user = DomVisionPrompts.d_v_planning_prompt_user

    def construct(
            self,
            user_request: str,
            previous_trace: str,
            observation: str,
            observation_VforD: str,
            feedback: str = "",
            status_description: str = ""
    ) -> list:
        is_valid, message = is_valid_base64(
            observation_VforD)
        print("prompt_constructor.py D_VObservationPromptConstructor:", message, "\n")
        rendered_prompt = Template(self.prompt_user).render(
            user_request=user_request)
        prompt_elements = [{"type": "text", "text": rendered_prompt}]
        if len(previous_trace) > 0:
            # history_memory = HistoryMemory(previous_trace=previous_trace)
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, reflection=status_description).construct_previous_trace_prompt()
            # trace_prompt = history_memory.construct_previous_trace_prompt()
            prompt_elements.append({"type": "text", "text": trace_prompt})
            # if status_description != "":
            #     prompt_elements.append({"type": "text", "text": f"Task completion description is {status_description}"})
            if feedback != "":
                prompt_elements.append(
                    {"type": "text", "text": f"There an invalid action description is below:\n {feedback}\n"})
            prompt_elements.append(
                {"type": "text", "text": f"\nHere is the accessibility tree that you should refer to for this task:\n{observation}"})
            prompt_elements.append(
                {"type": "text", "text": "current screenshot is:"})
            print("len of prompt_elements before observation_VforD:",
                  len(prompt_elements))
            prompt_elements_str = json5.dumps(prompt_elements)
            print("len of prompt_elements_str before observation_VforD:", len(
                prompt_elements_str)) # This will print the length of prompt_elements converted into JSON string
            print("len of about gpt token of prompt_elements_str before observation_VforD:", len(
                prompt_elements_str) / 5.42, "\n")
            prompt_elements.append(
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{observation_VforD}"}})
        # Construct the final message payload
        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": prompt_elements}]
        # print(prompt_elements)
        print("messages finished!\n")
        return messages

    # Convert previous thought and action into formatted string
    def stringfy_thought_and_action(self, input_list: list) -> str:
        input_list = json5.loads(input_list, encoding="utf-8")
        str_output = "["
        for idx, i in enumerate(input_list):
            str_output += f'Step{idx + 1}:\"Thought: {i["thought"]}, Action: {i["action"]}\";\n'
        str_output += "]"
        return str_output


class VisionObservationPromptConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = VisionPrompts.vision_planning_prompt_system 
        self.prompt_user = VisionPrompts.vision_prompt_user

    def construct(self, user_request: str, previous_trace: str, base64_image: str) -> list:
        rendered_prompt = Template(self.prompt_user).render(
            user_request=user_request)
        prompt_elements = [{"type": "text", "text": rendered_prompt}]

        if len(previous_trace) > 0:
            history_memory = HistoryMemory(previous_trace=[previous_trace])
            trace_prompt = history_memory.construct_previous_trace_prompt()
            prompt_elements.append({"type": "text", "text": trace_prompt})

            prompt_elements.append(
                {"type": "text", "text": "The current observation is:"})
            prompt_elements.append(
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}})

        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": prompt_elements}]
        return messages

    def stringfy_thought_and_action(self, input_list: list) -> str:
        input_list = json5.loads(input_list, encoding="utf-8")
        str_output = "["
        for idx, i in enumerate(input_list):
            str_output += f'Step{idx + 1}:\"Thought: {i["thought"]}, Action: {i["action"]}\";\n'
        str_output += "]"
        return str_output


class RewardPromptConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = BasePrompts.global_reward_prompt_system
        self.prompt_user = BasePrompts.global_reward_prompt_user

    def construct(
            self,
            ground_truth_mode: str,
            global_reward_mode: str,
            user_request: str,
            stringfy_thought_and_action_output: str,
            observation: str,
            current_info=None,
            instruction: str = ""
    ) -> list:
        if ground_truth_mode:
            self.prompt_system = BasePrompts.global_reward_with_GroundTruth_prompt_system
        rendered_prompt = Template(self.prompt_user).render(
            user_request=user_request, stringfy_thought_and_action_output=stringfy_thought_and_action_output)
        prompt_elements = [{"type": "text", "text": rendered_prompt}]
        if 'current_url' in current_info:
            current_url = current_info.get('current_url', 'not available')
            prompt_elements.append(
                {"type": "text", "text": f"The current url is {current_url}"})
        prompt_elements.append(
            {"type": "text", "text": f"Here is the current accessibility tree that you should refer to:\n{observation}"})
        if "vision" in global_reward_mode:
            if "vision_reward" in current_info and current_info['vision_reward']:
                prompt_elements.append(
                    {"type": "text", "text": "The current screenshot is:"})
                prompt_elements.append(
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{current_info['vision_reward']}"}})
            else:
                prompt_elements.append(
                    {"type": "text", "text": "The current screenshot is not available."})
                print("The current screenshot for vision reward is not available.")
        if ground_truth_mode:
            prompt_elements.append(
                {"type": "text", "text": f"Here is the Reference Guide for the target task:\n\n{instruction}"})
        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": prompt_elements}]
        return messages


# Construct prompt for textual reward
class CurrentRewardPromptConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = BasePrompts.current_reward_prompt_system
        self.prompt_user = BasePrompts.current_reward_prompt_user

    def construct(
            self,
            user_request: str,
            stringfy_previous_trace_output: str,
            stringfy_current_trace_output: str,
            observation: str
    ) -> list:
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request, stringfy_previous_trace_output=stringfy_previous_trace_output,
            stringfy_current_trace_output=stringfy_current_trace_output)
        self.prompt_user += f"\nHere is the accessibility tree that you should refer to:\n{observation}"
        messages = [{"role": "system", "content": self.prompt_system}, {
            "role": "user", "content": self.prompt_user}]
        return messages


# Construct prompt for vision reward
class VisionRewardPromptConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = DomVisionPrompts.current_d_vision_reward_prompt_system
        self.prompt_user = DomVisionPrompts.current_d_vision_reward_prompt_user

    def construct(
            self,
            user_request: str,
            stringfy_previous_trace_output: str,
            stringfy_current_trace_output: str,
            observation: str,
            observation_VforD: str
    ) -> list:
        if not is_valid_base64(observation_VforD):
            print("The observation_VforD provided is not a valid Base64 encoding")

        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request, stringfy_previous_trace_output=stringfy_previous_trace_output,
            stringfy_current_trace_output=stringfy_current_trace_output)
        self.prompt_user += f"the key information of current web page is: {observation}"
        prompt_elements = [{"type": "text", "text": self.prompt_user}]

        prompt_elements.append(
            {"type": "text", "text": "the screenshot of current web page is :"})
        prompt_elements.append(
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{observation_VforD}"}})

        messages = [{"role": "system", "content": self.prompt_system},
                    {"role": "user", "content": prompt_elements}]
        return messages


# Build a prompt to determine whether the element is a search box (if so, the front end needs to add an additional return operation)
class JudgeSearchbarPromptConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = BasePrompts.judge_searchbar_prompt_system
        self.prompt_user = BasePrompts.judge_searchbar_prompt_user

    # Build a prompt to determine whether it is a search box, and output a format that can be parsed by openai
    # TODO decoded_result
    def construct(self, input_element, planning_response_action) -> list:
        self.prompt_user = Template(self.prompt_user).render(input_element=str(
            input_element), element_id=planning_response_action['element_id'],
            action_input=planning_response_action['action_input'])
        messages = [{"role": "system", "content": self.prompt_system}, {
            "role": "user", "content": self.prompt_user}]
        return messages


class SemanticMatchPromptConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = BasePrompts.semantic_match_prompt_system
        self.prompt_user = BasePrompts.semantic_match_prompt_user

    def construct(self, input_answer, semantic_method) -> list:
        self.prompt_user = Template(self.prompt_user).render(
            semantic_method=semantic_method, input_answer=input_answer)
        messages = [{"role": "system", "content": self.prompt_system}, {
            "role": "user", "content": self.prompt_user}]
        return messages

class ExampleParser:
    """Parser for retrieved examples to format them properly for the prompt."""
    
    @staticmethod
    def parse_action_space(action_space_text: str) -> str:
        """Parse and format the action space description."""
        # Extract action space items and format them
        action_items = []
        for line in action_space_text.split('\n'):
            if line.strip().startswith(('1.', '2.', '3.', '4.', '5.')):
                action_items.append(line.strip())
        return '\n'.join(action_items)
    
    @staticmethod
    def parse_trajectory(trajectory_text: str) -> List[Dict[str, Any]]:
        """Parse the trajectory text into structured steps."""
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
            
        return steps
    
    @staticmethod
    def format_example(task: str, trajectory_text: str) -> str:
        """Format a complete example with task and trajectory."""
        # Extract action space and trajectory
        parts = trajectory_text.split('\n\n')
        action_space = ExampleParser.parse_action_space(parts[0])
        trajectory = ExampleParser.parse_trajectory('\n'.join(parts[1:]))
        
        # Format the example
        formatted = f"Task: {task}\n\n"
        formatted += "Available Actions:\n"
        formatted += action_space + "\n\n"
        formatted += "Example Trajectory:\n"
        
        for step in trajectory:
            formatted += f"Observation: {step['observation']}\n"
            if isinstance(step['action'], dict):
                formatted += f"Action: {json5.dumps(step['action'])}\n"
            else:
                formatted += f"Action: {step['action']}\n"
            formatted += "\n"
            
        return formatted

# Build a prompt for planning based on the DOM tree and retrioeval pool
class PlanningPromptRetrievalConstructor(BasePromptConstructor):
    def __init__(self):
        self.prompt_system = BasePrompts.planning_prompt_system
        self.prompt_user = BasePrompts.planning_prompt_user
    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
    ) -> list:
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request)
        self.prompt_user += "## Example Tasks ##\n"
        
        # Setup retrieval paths
        retrieval_path = {
            'collection_path': f"{rag_path}/collection",
            'qry_embed_path': f"{rag_path}/qry_task_embed.json",
            'cand_embed_path': f"{rag_path}/cand_embed.parquet",
            'cand_id_text_path': f"{rag_path}/cand_id_text.json"
        }
        
        # Retrieve examples
        retriever = TestOnlyRetriever(retrieval_path)
        retrieved_tasks, retrieved_texts, retrieved_image_paths = retriever.retrieve(
            task_name=user_request,
        )
        
        # Log the retrieval results
        from agent.Utils.log_retrieved_tasks import log_retrieval
        log_retrieval(
            user_request=user_request,
            retrieved_tasks=retrieved_tasks,
            retrieved_texts=retrieved_texts,
            retrieved_image_paths=retrieved_image_paths,
            log_path="Logs/retrieved_tasks.json"
        )
        
        # Format and add examples
        for idx, (task, text) in enumerate(zip(retrieved_tasks, retrieved_texts), 1):
            formatted_example = ExampleParser.format_example(task, text)
            self.prompt_user += f"\nExample {idx}:\n{formatted_example}\n"
            
        # Add previous trace and other information
        if len(previous_trace) > 0:
            self.prompt_user += HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            
            if status_description:
                self.prompt_user += f"\nTask completion description: {status_description}"
                
            if feedback:
                self.prompt_user += f"\nHere are some other things you need to know:\n{feedback}"
                
            self.prompt_user += f"\nHere is the accessibility tree that you should refer to for this task:\n{observation}"

        # Construct final messages
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": self.prompt_user}
        ]
        
        return messages

    def stringfy_thought_and_action(self, input_data: Union[str, bytes, List[Dict[str, Any]]]) -> str:
        """Convert thought and action data to formatted string.
        
        Args:
            input_data: Input data to format
            
        Returns:
            Formatted string representation
        """
        if isinstance(input_data, (str, bytes)):
            input_list = json5.loads(input_data, encoding="utf-8")
        else:
            input_list = input_data
            
        str_output = "["
        for idx, i in enumerate(input_list):
            str_output += f'Step{idx + 1}:\"Thought: {i["thought"]}, Action: {i["action"]}, Reflection:{i.get("reflection", "")}\";\n'
        str_output += "]"
        return str_output

class PlanningPromptVisionRetrievalConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = BasePrompts.planning_rag_prompt_system
        self.prompt_user = BasePrompts.planning_prompt_user
        self.max_image_dimension = 800  # Increased from 800 to 1200 based on analysis

    def scale_image(self, image_path: str) -> bytes:
        """Scale down image while maintaining aspect ratio to reduce size."""
        from PIL import Image
        import io
        
        # Open and scale image
        with Image.open(image_path) as img:
            # Calculate new dimensions while maintaining aspect ratio
            width, height = img.size
            if width > height:
                if width > self.max_image_dimension:
                    new_width = self.max_image_dimension
                    new_height = int(height * (self.max_image_dimension / width))
                else:
                    return img.tobytes()
            else:
                if height > self.max_image_dimension:
                    new_height = self.max_image_dimension
                    new_width = int(width * (self.max_image_dimension / height))
                else:
                    return img.tobytes()
            
            # Scale image
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Convert to bytes
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format=img.format or 'PNG', optimize=True)
            return img_byte_arr.getvalue()

    def parse_retrieved_text(self, text: str) -> tuple:
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

    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
    ) -> list:
        # Start with the base prompt
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request)
        
        # Setup retrieval paths
        retrieval_path = {
            'collection_path': f"{rag_path}/collection",
            'qry_embed_path': f"{rag_path}/qry_task_embed.json",
            'cand_embed_path': f"{rag_path}/cand_embed_online_mind2web.parquet",
            'cand_id_text_path': f"{rag_path}/cand_id_text2.json" 
        }
        
        # Retrieve examples
        retriever = TestOnlyRetriever(retrieval_path)
        retrieved_tasks, retrieved_texts, retrieved_image_paths, retrieved_workflows = retriever.retrieve(
            task_name=user_request,
        )
        print(f"retrieved_tasks: {retrieved_tasks}")
        print(f"retrieved_texts: {retrieved_texts}")
        print(f"retrieved_image_paths: {retrieved_image_paths}")
        
        # Log the retrieval results
        from agent.Utils.log_retrieved_tasks import log_retrieval
        log_retrieval(
            user_request=user_request,
            retrieved_tasks=retrieved_tasks,
            retrieved_texts=retrieved_texts,
            retrieved_image_paths=retrieved_image_paths,
            log_path="Logs/retrieved_tasks.json"
        )

        # Add retrieved examples with their steps and images
        if retrieved_tasks:
            self.prompt_user += "\n\nHere are some similar examples to help you:\n"
            for task, text, image_paths_json in zip(retrieved_tasks, retrieved_texts, retrieved_image_paths):
                # Parse the retrieved text
                action_space, steps = self.parse_retrieved_text(text)

                # Parse the image paths JSON string
                image_paths = json5.loads(image_paths_json)

                # Add task description and action space
                self.prompt_user += f"\nExample:\nTask: {task}\n\n"
                self.prompt_user += f"{action_space}\n\n"
                
                # Add each step with its corresponding image
                prompt_elements = [{"type": "text", "text": self.prompt_user}]
                for step_idx, (step, image_path) in enumerate(zip(steps, image_paths)):
                    # Add the observation with image reference
                    prompt_elements.append({
                        "type": "text", 
                        "text": f"Observation {step_idx + 1}: <|image_{step_idx + 1}|>\n"
                    })
                    # Add the action
                    prompt_elements.append({
                        "type": "text",
                        "text": f"Action {step_idx + 1}: {json5.dumps(step['action']) if isinstance(step['action'], dict) else step['action']}\n"
                    })
                    # Add the corresponding image
                    full_image_path = f"data/Online-Mind2Web/rag_data/image/{image_path}"
                    with open(full_image_path, 'rb') as img_file:
                        img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
                        prompt_elements.append({
                            "type": "image_url",
                            "image_url": {"url": f"data:image/png;base64,{img_base64}"}
                        })
                    # try:
                    #     # Scale image before encoding
                    #     scaled_image_bytes = self.scale_image(full_image_path)
                    #     img_base64 = base64.b64encode(scaled_image_bytes).decode('utf-8')
                    #     prompt_elements.append({
                    #         "type": "image_url",
                    #         "image_url": {"url": f"data:image/png;base64,{img_base64}"}
                    #     })
                    # except Exception as e:
                    #     print(f"Error processing image {image_path}: {str(e)}")
                    #     # Fallback to original image if scaling fails
                    #     with open(full_image_path, 'rb') as img_file:
                    #         img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
                    #         prompt_elements.append({
                    #             "type": "image_url",
                    #             "image_url": {"url": f"data:image/png;base64,{img_base64}"}
                    #         })
        
        # Add previous trace if exists
        if len(previous_trace) > 0:
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, reflection=status_description).construct_previous_trace_prompt()
            prompt_elements.append({"type": "text", "text": trace_prompt})
            
            if status_description:
                prompt_elements.append({"type": "text", "text": f"Task completion description is {status_description}"})
            if feedback:
                prompt_elements.append({"type": "text", "text": f"Here are some other things you need to know:\n {feedback}\n"})
            
            prompt_elements.append({"type": "text", "text": f"\nHere is the accessibility tree that you should refer to for this task:\n{observation}"})
        
        # Construct the final message payload
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": prompt_elements}
        ]
        return messages

    def stringfy_thought_and_action(self, input_list: list) -> str:
        input_list = json5.loads(input_list, encoding="utf-8")
        str_output = "["
        for idx, i in enumerate(input_list):
            str_output += f'Step{idx + 1}:\"Thought: {i["thought"]}, Action: {i["action"]}, Reflection:{i["reflection"]}\";\n'
        str_output += "]"
        return str_output

class PlanningPromptDescriptionRetrievalConstructor(BasePromptConstructor):
    def __init__(self):
        super().__init__()
        self.prompt_system = BasePrompts.planning_rag_prompt_system
        self.prompt_user = BasePrompts.planning_prompt_user
        self.reference = ""  # Initialize as empty string instead of None

    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
    ) -> list:
        # Start with the base prompt
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request)
       
        # Add previous trace if exists
        if len(previous_trace) > 0:
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, reflection=status_description).construct_previous_trace_prompt()
            self.prompt_user += trace_prompt
            
            if status_description:
                self.prompt_user += f"\nTask completion description: {status_description}"
            if feedback:
                self.prompt_user += f"\nHere are some other things you need to know:\n{feedback}"
            
            self.prompt_user += f"\nHere is the accessibility tree that you should refer to for this task:\n{observation}"
        
        # Set reference if none
        if self.reference == "":
            # Load generated descriptions
            descriptions_path = "data/Online-Mind2Web/generated_steps/generated_task_descriptions.json"
            with open(descriptions_path, 'r') as f:
                generated_descriptions = json.load(f)
            
            print(f"\nLooking for task description matching: {user_request}")
            print(f"Available tasks in descriptions file:")
            for desc in generated_descriptions:
                print(f"- {desc['task_name']}")
            
            # Find matching task description
            task_description = next((desc for desc in generated_descriptions if desc['task_name'].lower() == user_request.lower()), None)
            
            if not task_description:
                print(f"\nWARNING: No matching task description found for: {user_request}")
                print("Please ensure the task name matches exactly with one in the descriptions file.")
            else:
                print(f"\nFound matching task description for: {user_request}")
            
            # Add example if found
            if task_description:
                self.reference += "\n\nHere is a similar example to help you:\n"
                self.reference += f"\nTask: {task_description['task_name']}\n\n"
                self.reference += "Steps:\n"
                
                # Add each step with its descriptions
                for step in task_description['steps']:
                    self.reference += f"Step {step['step_number']}:\n"
                    self.reference += f"Observation: {step['observation_description']}\n"
                    self.reference += f"Action: {step['action_description']}\n\n"
            # Add reference confirmation to end of description
            self.reference += "In the final part of your output's description section, you should state whether the similar task example was helpful and elaborate on how your plan draws from it.\n\n"
        
        # Add reference to user prompt
        self.prompt_user += self.reference

        # Construct the final message payload
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": self.prompt_user}
        ]
        return messages

    def stringfy_thought_and_action(self, input_list: list) -> str:
        input_list = json5.loads(input_list, encoding="utf-8")
        str_output = "["
        for idx, i in enumerate(input_list):
            str_output += f'Step{idx + 1}:\"Thought: {i["thought"]}, Action: {i["action"]}, Reflection:{i["reflection"]}\";\n'
        str_output += "]"
        return str_output


# OpenAI Operator Prompt Constructors
from .operator_prompts import OperatorPrompts

class OperatorPromptConstructor(BasePromptConstructor):
    """
    Operator-specific prompt constructor for browser automation
    """
    
    def __init__(self):
        super().__init__()
        # autonomous prompt
        self.prompt_system = OperatorPrompts.operator_autonomous_simple_system
        self.prompt_user = OperatorPrompts.operator_autonomous_user_template
    
    def construct(
            self,
            user_request: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            screenshot_base64: str = None
    ) -> list:
        """
        Construct prompt for OpenAI Operator
        
        Args:
            user_request: User's task request
            previous_trace: Previous action history
            observation: Current DOM observation
            feedback: Any feedback or error messages
            status_description: Current task status
            screenshot_base64: Current screenshot in base64 format
            
        Returns:
            List of formatted messages for operator
        """
        # Render user prompt with task request
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request
        )
        
        # Start with text content
        content_parts = [{"type": "text", "text": self.prompt_user}]
        
        # Add previous trace if available
        if len(previous_trace) > 0:
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            content_parts.append({"type": "text", "text": trace_prompt})
            
            if status_description:
                content_parts.append({
                    "type": "text", 
                    "text": f"Task completion description: {status_description}"
                })
            
            if feedback:
                content_parts.append({
                    "type": "text", 
                    "text": f"Here are some other things you need to know:\n{feedback}"
                })
        
        # Add DOM observation
        if observation:
            content_parts.append({
                "type": "text", 
                "text": f"Current accessibility tree:\n{observation}"
            })
        
        # Add screenshot if available
        if screenshot_base64:
            content_parts.append({
                "type": "text", 
                "text": "Current webpage screenshot:"
            })
            content_parts.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{screenshot_base64}",
                    "detail": "high"
                }
            })
        
        # Construct final messages
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": content_parts}
        ]
        
        return messages

class OperatorPromptRAGConstructor(BasePromptConstructor):
    """
    Operator prompt constructor with RAG support
    """
    
    def __init__(self):
        super().__init__()
        # autonomous rag prompt
        self.prompt_system = OperatorPrompts.operator_autonomous_rag_system
        self.prompt_user = OperatorPrompts.operator_autonomous_rag_user
    
    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            screenshot_base64: str = None
    ) -> list:
        """
        Construct prompt for OpenAI Operator with RAG support
        
        Args:
            user_request: User's task request
            rag_path: Path to RAG data
            previous_trace: Previous action history
            observation: Current DOM observation
            feedback: Any feedback or error messages
            status_description: Current task status
            screenshot_base64: Current screenshot in base64 format
            
        Returns:
            List of formatted messages for operator with RAG examples
        """
        # Render user prompt with task request
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request
        )
        
        # Start with text content
        content_parts = [{"type": "text", "text": self.prompt_user}]
        
        # Add RAG examples
        content_parts.append({"type": "text", "text": "## Similar Task Examples ##"})
        
        # Setup retrieval paths
        retrieval_path = {
            'collection_path': f"{rag_path}/collection",
            'qry_embed_path': f"{rag_path}/qry_task_embed.json",
            'cand_embed_path': f"{rag_path}/cand_embed_online_mind2web.parquet",
            'cand_id_text_path': f"{rag_path}/cand_id_text2.json"
        }
        
        try:
            # Retrieve examples
            retriever = TestOnlyRetriever(retrieval_path)
            retrieved_tasks, retrieved_texts, retrieved_image_paths, retrieved_workflows = retriever.retrieve(
                task_name=user_request,
            )
            
            # Log retrieval results
            from agent.Utils.log_retrieved_tasks import log_retrieval
            log_retrieval(
                user_request=user_request,
                retrieved_tasks=retrieved_tasks,
                retrieved_texts=retrieved_texts,
                retrieved_image_paths=retrieved_image_paths,
                log_path="Logs/retrieved_tasks.json"
            )
            
            # Add retrieved examples
            if retrieved_tasks:
                content_parts.append({
                    "type": "text", 
                    "text": "\nHere are some similar examples to help guide your actions:"
                })
                
                for task, text, image_paths_json in zip(retrieved_tasks, retrieved_texts, retrieved_image_paths):
                    # Parse the retrieved text
                    action_space, steps = self.parse_retrieved_text(text)
                    
                    # Parse image paths
                    image_paths = json5.loads(image_paths_json)
                    
                    # Add example description
                    content_parts.append({
                        "type": "text", 
                        "text": f"\nExample Task: {task}\n{action_space}\n"
                    })
                    
                    # Add steps with images
                    for step_idx, (step, image_path) in enumerate(zip(steps, image_paths)):
                        content_parts.append({
                            "type": "text", 
                            "text": f"Step {step_idx + 1}: {json5.dumps(step['action']) if isinstance(step['action'], dict) else step['action']}"
                        })
                        
                        # Add corresponding screenshot
                        full_image_path = f"data/Online-Mind2Web/rag_data/image/{image_path}"
                        try:
                            with open(full_image_path, 'rb') as img_file:
                                img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
                                content_parts.append({
                                    "type": "image_url",
                                    "image_url": {"url": f"data:image/png;base64,{img_base64}"}
                                })
                        except Exception as e:
                            print(f"Error loading example image {image_path}: {e}")
                            
        except Exception as e:
            print(f"Error retrieving RAG examples: {e}")
            content_parts.append({
                "type": "text", 
                "text": "No similar examples available at this time."
            })
        
        # Add current task context
        content_parts.append({
            "type": "text", 
            "text": "\n## Current Task Context ##"
        })
        
        # Add previous trace if available
        if len(previous_trace) > 0:
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            content_parts.append({"type": "text", "text": trace_prompt})
            
            if status_description:
                content_parts.append({
                    "type": "text", 
                    "text": f"Task completion description: {status_description}"
                })
            
            if feedback:
                content_parts.append({
                    "type": "text", 
                    "text": f"Here are some other things you need to know:\n{feedback}"
                })
        
        # Add DOM observation
        if observation:
            content_parts.append({
                "type": "text", 
                "text": f"Current accessibility tree:\n{observation}"
            })
        
        # Add current screenshot
        if screenshot_base64:
            content_parts.append({
                "type": "text", 
                "text": "Current webpage screenshot:"
            })
            content_parts.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{screenshot_base64}",
                    "detail": "high"
                }
            })
        
        # Construct final messages
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": content_parts}
        ]
        
        return messages
    
    def parse_retrieved_text(self, text: str) -> tuple:
        """
        Parse retrieved text into action space and steps
        """
        try:
            # Simple parsing - adapt based on your data format
            lines = text.split('\n')
            action_space = ""
            steps = []
            
            current_step = {}
            for line in lines:
                if line.startswith('Action:'):
                    if current_step:
                        steps.append(current_step)
                    current_step = {'action': line.replace('Action:', '').strip()}
                elif line.startswith('Thought:'):
                    current_step['thought'] = line.replace('Thought:', '').strip()
                elif line.startswith('Action Space:'):
                    action_space = line.replace('Action Space:', '').strip()
            
            if current_step:
                steps.append(current_step)
            
            return action_space, steps
            
        except Exception as e:
            print(f"Error parsing retrieved text: {e}")
            return "", []

    def stringfy_thought_and_action(self, input_list: list) -> str:
        """Convert thought and action data to formatted string"""
        try:
            if isinstance(input_list, str):
                input_list = json5.loads(input_list, encoding="utf-8")
            
            str_output = "["
            for idx, i in enumerate(input_list):
                str_output += f'Step{idx + 1}:"Thought: {i.get("thought", "")}, Action: {i.get("action", "")}, Reflection: {i.get("reflection", "")}";\n'
            str_output += "]"
            return str_output
            
        except Exception as e:
            print(f"Error stringifying thought and action: {e}")
            return str(input_list)

# Operator prompt constructor with vision-based RAG support (rag_mode=Vision)
class OperatorPromptVisionRetrievalConstructor(BasePromptConstructor):
    """
    Operator prompt constructor with vision-based RAG support
    """
    
    def __init__(self):
        super().__init__()
        # self.prompt_system = OperatorPrompts.operator_rag_system
        # self.prompt_user = OperatorPrompts.operator_planning_user
        
        # autonomous rag prompt
        self.prompt_system = OperatorPrompts.operator_autonomous_rag_system
        self.prompt_user = OperatorPrompts.operator_autonomous_rag_user
        self.max_image_dimension = 800  # Maximum image dimension for scaling
    
    def scale_image(self, image_path: str) -> bytes:
        """Scale down image while maintaining aspect ratio to reduce size."""
        from PIL import Image
        import io
        
        # Open and scale image
        with Image.open(image_path) as img:
            # Calculate new dimensions while maintaining aspect ratio
            width, height = img.size
            if width > height:
                if width > self.max_image_dimension:
                    new_width = self.max_image_dimension
                    new_height = int(height * (self.max_image_dimension / width))
                else:
                    return self._image_to_bytes(img)
            else:
                if height > self.max_image_dimension:
                    new_height = self.max_image_dimension
                    new_width = int(width * (self.max_image_dimension / height))
                else:
                    return self._image_to_bytes(img)
            
            # Scale image
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            return self._image_to_bytes(img)
    
    def _image_to_bytes(self, img) -> bytes:
        """Convert PIL Image to bytes"""
        import io
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format=img.format or 'PNG', optimize=True)
        return img_byte_arr.getvalue()

    def parse_retrieved_text(self, text: str) -> tuple:
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

    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            screenshot_base64: str = None
    ) -> list:
        """
        Build Operator prompt with visual RAG support

        Args:
            user_request: User task request
            rag_path: The RAG data path
            previous_trace: The history of previous operations
            observation: The current DOM observation (not used in Operator mode)
            feedback: Feedback or error message
            status_description: The current task state
            screenshot_base64: The base64 encoding of the current screenshot
            
        Returns:
            A formatted list of messages
        """
        # Start with the base prompt
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request)
        
        # Start with text content
        content_parts = [{"type": "input_text", "text": self.prompt_user}]
        
        # Setup retrieval paths
        retrieval_path = {
            'collection_path': f"{rag_path}/collection",
            'qry_embed_path': f"{rag_path}/qry_task_embed.json",
            'cand_embed_path': f"{rag_path}/cand_embed_online_mind2web.parquet",
            'cand_id_text_path': f"{rag_path}/cand_id_text2.json" 
        }
        
        # Retrieve examples
        retriever = TestOnlyRetriever(retrieval_path)
        retrieved_tasks, retrieved_texts, retrieved_image_paths, retrieved_workflows = retriever.retrieve(
            task_name=user_request,
        )
        print(f"🔍 Operator Vision RAG - Retrieved tasks: {retrieved_tasks}")
        print(f"📄 Retrieved texts: {len(retrieved_texts)}")
        print(f"🖼️  Retrieved image paths: {len(retrieved_image_paths)}")
        
        # Log the retrieval results
        from agent.Utils.log_retrieved_tasks import log_retrieval
        log_retrieval(
            user_request=user_request,
            retrieved_tasks=retrieved_tasks,
            retrieved_texts=retrieved_texts,
            retrieved_image_paths=retrieved_image_paths,
            log_path="Logs/retrieved_tasks_operator_vision.json"
        )
        
        # Store retrieval information for RAG logging
        self.retrieved_tasks = retrieved_tasks
        self.retrieved_texts = retrieved_texts  
        self.retrieved_image_paths = retrieved_image_paths

        # Add retrieved examples with their steps and images
        if retrieved_tasks:
            content_parts.append({
                "type": "input_text", 
                "text": "\n## Similar Task Examples with Visual References ##\n"
            })
            
            for task_idx, (task, text, image_paths_json) in enumerate(zip(retrieved_tasks, retrieved_texts, retrieved_image_paths)):
                # Parse the retrieved text
                action_space, steps = self.parse_retrieved_text(text)

                # Parse the image paths JSON string
                try:
                    image_paths = json5.loads(image_paths_json)
                except:
                    print(f"⚠️  Failed to parse image paths for task {task}")
                    continue

                # Add task description and action space
                content_parts.append({
                    "type": "input_text",
                    "text": f"\n**Example {task_idx + 1}:**\n**Task:** {task}\n\n{action_space}\n"
                })
                
                # Add each step with its corresponding image
                for step_idx, (step, image_path) in enumerate(zip(steps, image_paths)):
                    # Add the step description
                    step_text = f"\n**Step {step_idx + 1}:**\n"
                    step_text += f"**Action:** {json5.dumps(step['action']) if isinstance(step['action'], dict) else step['action']}\n"
                    step_text += f"**Screenshot Reference:**\n"
                    
                    content_parts.append({
                        "type": "input_text", 
                        "text": step_text
                    })
                    
                    # Add the corresponding screenshot
                    full_image_path = f"data/Online-Mind2Web/rag_data/image/{image_path}"
                    try:
                        with open(full_image_path, 'rb') as img_file:
                            img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
                            content_parts.append({
                                "type": "input_image",
                                "image_url": f"data:image/png;base64,{img_base64}"
                            })
                    except Exception as e:
                        print(f"❌ Error processing image {image_path}: {str(e)}")
                        content_parts.append({
                            "type": "input_text",
                            "text": f"[Image {image_path} could not be loaded]\n"
                        })
        
        # Add current task context
        content_parts.append({
            "type": "input_text", 
            "text": "\n## Current Task Context ##"
        })
        
        # Add previous trace if available
        if len(previous_trace) > 0:
            from agent.Memory.short_memory.history import HistoryMemory
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            content_parts.append({
                "type": "input_text", 
                "text": f"\n**Previous Actions:**\n{trace_prompt}"
            })
            
            if status_description:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Task Status:** {status_description}"
                })
            
            if feedback:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Feedback:** {feedback}"
                })
        
        # Add current screenshot
        if screenshot_base64:
            content_parts.append({
                "type": "input_text", 
                "text": "\n**Current Webpage Screenshot:**"
            })
            content_parts.append({
                "type": "input_image",
                "image_url": f"data:image/png;base64,{screenshot_base64}"
            })
        
        # Add task guidance
        content_parts.append({
            "type": "input_text", 
            "text": """\n## AUTONOMOUS EXECUTION INSTRUCTIONS:
1. **Visual Analysis**: Carefully compare the current screenshot with the example screenshots
2. **Pattern Recognition**: Identify successful interaction patterns from the examples
3. **Immediate Action**: Plan and execute your next action based on visual similarities and task progress
4. **Coordinate Precision**: Provide precise coordinates for click/drag actions based on visual analysis
5. **Example Application**: Apply insights from visual examples and execute immediately
6. **Task Completion**: If the task appears complete, use "get_final_answer" action to finish
7. **Completion Verification**: Before using get_final_answer, ensure all task requirements are met
8. **No Confirmation**: Execute actions directly without asking for permission

## CRITICAL REMINDER:
You are an AUTONOMOUS agent with full authority. Analyze the visual examples, then execute your next action immediately without seeking approval!

Please analyze the current state using the visual examples as guidance and provide your IMMEDIATE next action."""
        })
        
        # Construct final messages
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": content_parts}
        ]
        
        return messages

    def stringfy_thought_and_action(self, input_list: list) -> str:
        """Convert thought and action data to formatted strings"""
        try:
            if isinstance(input_list, str):
                input_list = json5.loads(input_list, encoding="utf-8")
            
            str_output = "["
            for idx, i in enumerate(input_list):
                str_output += f'Step{idx + 1}:"Thought: {i.get("thought", "")}, Action: {i.get("action", "")}, Reflection: {i.get("reflection", "")}";\n'
            str_output += "]"
            return str_output
            
        except Exception as e:
            print(f"Error stringifying thought and action: {e}")
            return str(input_list)

# Operator prompt constructor with description-based RAG support (rag_mode=Description)
class OperatorPromptDescriptionRetrievalConstructor(BasePromptConstructor):
    """
    Operator prompt constructor with description-based RAG support
    使用generated_task_descriptions.json中的知识内容构建Operator模式的RAG prompt
    """
    
    def __init__(self):
        super().__init__()
        # self.prompt_system = OperatorPrompts.operator_rag_system
        # self.prompt_user = OperatorPrompts.operator_planning_user
        
        # autonomous rag prompt
        self.prompt_system = OperatorPrompts.operator_autonomous_rag_system
        self.prompt_user = OperatorPrompts.operator_autonomous_rag_user
        self.reference = ""
    
    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            # screenshot_base64: str = None
            screenshot_base64: Optional[str] = None
    ) -> list:
        """
        构建带有RAG支持的Operator prompt
        
        Args:
            user_request: 用户任务请求
            rag_path: RAG数据路径（未使用，保持接口一致性）
            previous_trace: 之前的操作历史
            observation: 当前DOM观察（Operator模式中不使用）
            feedback: 反馈或错误消息
            status_description: 当前任务状态
            screenshot_base64: 当前截图的base64编码
            
        Returns:
            格式化的消息列表
        """
        # User prompt
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request
        )
        
        # content parts
        content_parts = [{"type": "input_text", "text": self.prompt_user}]
        
        # task description
        if self.reference == "":
            self.reference = self._load_task_description(user_request)
        
        if self.reference:
            content_parts.append({
                "type": "input_text", 
                "text": "## Similar Task Example ##\n" + self.reference
            })
        
        # 添加当前任务上下文
        content_parts.append({
            "type": "input_text", 
            "text": "\n## Current Task Context ##"
        })
        
        # 添加之前的操作历史
        if len(previous_trace) > 0:
            from agent.Memory.short_memory.history import HistoryMemory
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            content_parts.append({
                "type": "input_text", 
                "text": f"\n**Previous Actions:**\n{trace_prompt}"
            })
            
            if status_description:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Task Status:** {status_description}"
                })
            
            if feedback:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Feedback:** {feedback}"
                })
        
        # 添加当前截图
        if screenshot_base64:
            content_parts.append({
                "type": "input_text", 
                "text": "\n**Current Webpage Screenshot:**"
            })
            content_parts.append({
                "type": "input_image",
                "image_url": f"data:image/png;base64,{screenshot_base64}"
            })
        
        # reinforced autonomous execution instructions
        content_parts.append({
            "type": "input_text", 
            "text": """\n## AUTONOMOUS EXECUTION INSTRUCTIONS:
1. **Immediate Action**: Analyze the current screenshot and execute the next logical action NOW
2. **Example Application**: Use the similar task example to guide your approach, then act immediately
3. **No Confirmation**: Do not ask for permission or confirmation - you have full authority
4. **Direct Execution**: When you identify target elements, interact with them directly
5. **Task Progress**: Focus on making concrete progress toward the goal
6. **Completion Check**: Use "get_final_answer" only when the task is 100% complete
7. **Decision Making**: Make autonomous decisions based on visual analysis and examples

## SPECIAL GUIDANCE FOR INFORMATION TASKS:
🔍 **If your task is to "Tell me about..." or "Find information about...":**
- When you find the complete answer information on the current page
- When you can read all the details needed to answer the user's question
- When the information is clearly visible and comprehensive
- **IMMEDIATELY use "get_final_answer" with the complete information as action_input**
- Do NOT continue searching if you already have the complete answer
- Do NOT keep scrolling or waiting if the answer is already visible

## CRITICAL REMINDER:
You are an AUTONOMOUS agent. Execute actions immediately without seeking user approval. Your job is to complete the task, not to ask for permission!

For INFORMATION TASKS: As soon as you find the complete answer, use get_final_answer IMMEDIATELY!

Please analyze the current state, apply insights from the example, and provide your IMMEDIATE next action."""
        })
        
        # 构建最终消息
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": content_parts}
        ]
        
        return messages
    
    def _load_task_description(self, user_request: str) -> str:
        """
        从generated_task_descriptions.json加载任务描述
        
        Args:
            user_request: 用户任务请求
            
        Returns:
            格式化的任务描述字符串
        """
        try:
            # 加载生成的任务描述
            descriptions_path = "data/Online-Mind2Web/generated_steps/generated_task_descriptions.json"
            with open(descriptions_path, 'r', encoding='utf-8') as f:
                generated_descriptions = json.load(f)
            
            print(f"\n🔍 Looking for task description matching: {user_request}")
            print(f"📚 Available tasks in descriptions file: {len(generated_descriptions)}")
            
            # 查找匹配的任务描述
            task_description = None
            
            # 首先尝试精确匹配
            for desc in generated_descriptions:
                if desc['task_name'].lower() == user_request.lower():
                    task_description = desc
                    break
            
            # 尝试部分匹配
            if not task_description:
                for desc in generated_descriptions:
                    if user_request.lower() in desc['task_name'].lower() or desc['task_name'].lower() in user_request.lower():
                        task_description = desc
                        print(f"📝 Found partial match: {desc['task_name']}")
                        break
            
            if not task_description:
                print(f"⚠️  WARNING: No matching task description found for: {user_request}")
                print("Available task examples:")
                for i, desc in enumerate(generated_descriptions[:5]):  # 显示前5个示例
                    print(f"  - {desc['task_name']}")
                if len(generated_descriptions) > 5:
                    print(f"  ... and {len(generated_descriptions) - 5} more")
                return ""
            
            print(f"✅ Found matching task description: {task_description['task_name']}")
            
            # 构建格式化的示例
            reference = f"\n**Example Task:** {task_description['task_name']}\n"
            reference += f"**Website:** {task_description.get('website', 'N/A')}\n"
            reference += f"**Task Level:** {task_description.get('level', 'N/A')}\n\n"
            reference += "**Step-by-step Example:**\n"
            
            # 添加每个步骤的详细描述
            for step in task_description['steps']:
                reference += f"\n**Step {step['step_number']}:**\n"
                reference += f"- **Observation:** {step['observation_description']}\n"
                reference += f"- **Action:** {step['action_description']}\n"
                
                # 如果有原始操作信息，也包含进来
                if 'original_action' in step:
                    original_action = step['original_action']
                    reference += f"- **Operation Type:** {original_action.get('operation', 'N/A')}\n"
                    if original_action.get('value'):
                        reference += f"- **Value:** {original_action['value']}\n"
                    if original_action.get('target'):
                        target = original_action['target']
                        if isinstance(target, dict) and 'x' in target:
                            reference += f"- **Target Coordinates:** ({target['x']:.3f}, {target['y']:.3f})\n"
                
                reference += "\n"
            
            # learning points
            reference += "\n**Learning Points:**\n"
            # reference += "- Pay attention to the sequence of actions and their reasoning\n"
            # reference += "- Notice how observations lead to specific actions\n"
            # reference += "- Consider the visual elements and their interactions\n"
            # reference += "- Adapt the approach to your current task context\n"
            # reference += "- Use similar coordinate-based interactions when appropriate\n\n"
            
            reference += "- Follow the **logical sequence of browser actions**, and understand the **intent behind each step**.\n"
            reference += "- Observe how the agent interprets **visual or textual cues** (e.g., buttons, input fields, layout changes) to decide its actions.\n"
            reference += "- Pay attention to **how UI elements are located and interacted with** — via coordinates, labels, DOM hierarchy, or visual affordances.\n"
            reference += "- Learn to generalize: apply similar **action-observation patterns** to new web interfaces.\n"
            reference += "- Use **coordinate-based clicks** when precise targeting is required, especially in complex or dynamic layouts.\n"
            reference += "- Consider the **full browser context**, including scroll, focus, or dynamic content changes.\n"
            return reference
            
        except Exception as e:
            print(f"❌ Error loading task description: {e}")
            return ""
    
    def stringfy_thought_and_action(self, input_list: list) -> str:
        """将思考和行动数据转换为格式化字符串"""
        try:
            if isinstance(input_list, str):
                input_list = json5.loads(input_list, encoding="utf-8")
            
            str_output = "["
            for idx, i in enumerate(input_list):
                str_output += f'Step{idx + 1}:"Thought: {i.get("thought", "")}, Action: {i.get("action", "")}, Reflection: {i.get("reflection", "")}";\n'
            str_output += "]"
            return str_output
            
        except Exception as e:
            print(f"Error stringifying thought and action: {e}")
            return str(input_list)

class OperatorVisionRAGConstructor(BasePromptConstructor):
    """
    Operator Vision RAG Constructor (Pure Image Retrieval Version)
    Uses only visual embeddings from current screenshot to retrieve related task information, then uses GPT-4 to re-rank and select the best match.
    Note: This version does NOT use task text descriptions - only image-based retrieval.
    """
    
    def __init__(self):
        super().__init__()
        # self.prompt_system = OperatorPrompts.operator_rag_system
        # self.prompt_user = OperatorPrompts.operator_planning_user
        
        # autonomous rag prompt
        self.prompt_system = OperatorPrompts.operator_autonomous_rag_system
        self.prompt_user = OperatorPrompts.operator_autonomous_rag_user
        self.rag_db = None
        self.gpt4_client = None
        self.config = self._load_config()
        self._cache_saved = False
        self._init_gpt4_client()
    
    def _load_config(self) -> Dict[str, Any]:
        """Load configuration from TOML file"""
        try:
            config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "configs", "embedding.toml")
            
            if os.path.exists(config_path):
                with open(config_path, 'r', encoding='utf-8') as f:
                    toml_config = toml.load(f)
                
                # Flatten the TOML structure for easy access
                flattened_config = {}
                for section_name, section_data in toml_config.items():
                    flattened_config.update(section_data)
                
                return flattened_config
            else:
                print(f"⚠️  Config file not found at {config_path}")
                return {}
        except Exception as e:
            print(f"❌ Error loading config: {e}")
            return {}
    
    def _ensure_embedding_path(self):
        import sys
        import os
        
        embedding_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../Embedding/VLM2Vec-pro')
        if embedding_path not in sys.path:
            sys.path.append(embedding_path)
            print(f"sys.path: {embedding_path}")
    
    def _init_gpt4_client(self):
        """GPT-4 client for re-ranking"""
        try:
            import os
            from openai import OpenAI
            
            api_key = os.getenv('OPENAI_API_KEY')
            if api_key:
                self.gpt4_client = OpenAI(api_key=api_key)
                print("🤖 GPT-4 client initialized successfully")
            else:
                print("⚠️  OpenAI API key not found, using original retrieval results")
        except Exception as e:
            print(f"❌ GPT-4 client initialization failed: {e}")
    
    def _init_rag_database(self, rag_config: Dict[str, Any] = None):
        """init RAG database - support loading from cache"""
        if self.rag_db is not None:
            return
        
        # check if there is RAG cache directory configuration
        rag_cache_dir = None
        if rag_config and 'rag_cache_dir' in rag_config:
            rag_cache_dir = rag_config['rag_cache_dir']
        elif hasattr(self, 'rag_cache_dir') and self.rag_cache_dir:
            rag_cache_dir = self.rag_cache_dir
        
        # if there is RAG cache directory, try to load from cache
        if rag_cache_dir and os.path.exists(rag_cache_dir):
            rag_index_path = os.path.join(rag_cache_dir, "rag_index.index")
            rag_config_path = os.path.join(rag_cache_dir, "rag_config.json")
            
            if os.path.exists(rag_index_path) and os.path.exists(rag_config_path):
                try:
                    print(f"🔄 从缓存加载RAG数据库: {rag_cache_dir}")
                    
                    with open(rag_config_path, 'r', encoding='utf-8') as f:
                        cached_config = json.load(f)
                    
                    self._ensure_embedding_path()
                    from rag_database import create_rag_database_from_config
                    
                    # print("✅ using cached config to create RAG database...")
                    self.rag_db = create_rag_database_from_config(**cached_config)
                    self.rag_db.load_index(rag_index_path)
                    return
                    
                except Exception as e:
                    print(f"fail: {e}")
        
        # if there is no cache or loading failed, execute the original build logic
        try:
            self._ensure_embedding_path()
            from rag_database import create_rag_database_from_config
            
            # Load configuration from TOML file
            config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "configs", "embedding.toml")
            
            if os.path.exists(config_path):
                # print(f"Loading embedding config from: {config_path}")
                with open(config_path, 'r', encoding='utf-8') as f:
                    toml_config = toml.load(f)
                
                # Flatten the TOML structure
                default_config = {}
                for section_name, section_data in toml_config.items():
                    default_config.update(section_data)
                # print(f"✅ Loaded config from TOML: {list(default_config.keys())}")
            else:
                print(f"⚠️  Config file not found at {config_path}, using fallback defaults")
                # Fallback to original hardcoded config
                default_config = {
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
                }
            
            # Override with any provided rag_config
            if rag_config:
                default_config.update(rag_config)
                print(f"🔄 Config overridden with: {list(rag_config.keys())}")
            
            print("🔄 initializing RAG database...")
            self.rag_db = create_rag_database_from_config(**default_config)
            print("✅ RAG database initialized")
            
            # Save to cache
            if rag_cache_dir and not self._cache_saved:
                try:
                    os.makedirs(rag_cache_dir, exist_ok=True)
                    
                    rag_index_path = os.path.join(rag_cache_dir, "rag_index.index")
                    rag_config_path = os.path.join(rag_cache_dir, "rag_config.json")
                    
                    print(f"💾 Saving DOMVisionRAG cache to: {rag_cache_dir}")
                    self.rag_db.save_index(rag_index_path)
                    
                    with open(rag_config_path, 'w', encoding='utf-8') as f:
                        json.dump(default_config, f, ensure_ascii=False, indent=2)
                    
                    print(f"✅ DOMVisionRAG cache saved successfully")
                    print(f"📁 Index file: {rag_index_path}")
                    print(f"🔧 Config file: {rag_config_path}")
                    
                    self._cache_saved = True
                    
                except Exception as save_e:
                    print(f"⚠️  Failed to save DOMVisionRAG cache: {save_e}")
            
        except Exception as e:
            print(f"❌ RAG database initialization failed: {e}")
            self.rag_db = None
    
    def set_rag_cache_dir(self, rag_cache_dir: str):
        """set RAG cache directory"""
        self.rag_cache_dir = rag_cache_dir
        print(f"🗄️  RAG cache directory set to: {rag_cache_dir}")

    def _encode_image_to_base64(self, image_path_or_base64: str) -> str:
        """encode image to base64 format with compression for token efficiency"""
        try:
            # if already base64, return directly
            if image_path_or_base64.startswith('data:image'):
                return image_path_or_base64.split(',')[1]
            elif len(image_path_or_base64) > 100 and '/' not in image_path_or_base64:
                return image_path_or_base64
            
            import base64
            import os
            from PIL import Image
            import io
            
            if not os.path.exists(image_path_or_base64):
                print(f"⚠️  image file not found: {image_path_or_base64}")
                return ""
            
            # Get image processing parameters from config
            max_size = self.config.get('max_size', 800)
            quality = self.config.get('quality', 85)
            
            # read and compress image for token efficiency
            with Image.open(image_path_or_base64) as img:
                if img.width > max_size or img.height > max_size:
                    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
                
                # convert to base64 with configurable quality
                img_byte_arr = io.BytesIO()
                img.save(img_byte_arr, format="JPEG", quality=quality, optimize=True)
                img_bytes = img_byte_arr.getvalue()
                
                encoded = base64.b64encode(img_bytes).decode('utf-8')
                # print(f"📸 Image compressed:{len(encoded)//4} tokens)")
                return encoded
                
        except Exception as e:
            print(f"❌ image encoding failed: {e}")
            return ""
    
    def _gpt4_rerank_results(self, query_image_base64: str, query_task: str, search_results: List[Dict], top_k: int = 15) -> Optional[Dict]:
        """
        re-rank and select the best match using GPT-4
        
        Args:
            query_image_base64: query image base64
            query_task: query task description
            search_results: search results list
            top_k: top K results to consider
            
        Returns:
            the best matching result, if failed, return None
        """
        if not self.gpt4_client or not search_results:
            print("🔄 GPT-4 not available, using original Top1 result")
            return search_results[0] if search_results else None
        
        try:
            candidates_text = []
            candidate_images = []
            
            for i, result in enumerate(search_results[:top_k]):
                task_desc = result.get('task_description', '无任务描述')
                cand_id = result.get('cand_id', f'candidate_{i}')
                
                candidate_image_path = ""
                if '_traj-' in cand_id:
                    parts = cand_id.split('_traj-')
                    task_hash = parts[0]
                    step_num = parts[1]
                    # Get candidate image base path from config
                    candidate_image_base_path = self.config.get('candidate_image_base_path', '/home/ubuntu/data/csb/images/embedding/GAE-Bench/images/Online-Mind2Web')
                    candidate_image_path = f"{candidate_image_base_path}/{task_hash}_step_{step_num}.png"
                
                candidate_info = f"""
Candidate {i+1}:
- Candidate ID: {cand_id}
- Task Description: {task_desc}
"""
                candidates_text.append(candidate_info)
                candidate_images.append(candidate_image_path)
            
            # GPT-4 prompt for re-ranking
            prompt = f"""
You are a web interface image matching expert. I will provide you with one query web interface image, a query task description, and {len(candidates_text)} candidate web interfaces, each with corresponding web interface images and task descriptions.

Query Task Description: {query_task}

Please carefully analyze the query image and candidate images, and match them based on task descriptions, including:
- Interface elements (buttons, input fields, text, etc.)
- Interface layout and design
- Interface visual similarity
- Matching degree between query task and candidate task descriptions

Candidate Information:
{"".join(candidates_text)}

Please select the most matching candidate from the above options, considering the following main factors:
1. Image visual similarity
2. Interface element matching degree
3. Relevance between query task and candidate task descriptions

Please answer:
The most matching candidate number (1-{len(candidates_text)})

Answer format:
Best matching candidate: [number]
"""
            
            message_content = [
                {"type": "text", "text": prompt},
                {"type": "text", "text": "\nQuery Image:"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{query_image_base64}",
                        "detail": "low"
                    }
                }
            ]
            
            # add candidate images (max=15)
            cand_img_num = min(15, len(candidate_images))
            for i, candidate_image_path in enumerate(candidate_images[:cand_img_num]):
                if candidate_image_path and os.path.exists(candidate_image_path):
                    candidate_image_base64 = self._encode_image_to_base64(candidate_image_path)
                    if candidate_image_base64:
                        message_content.extend([
                            {"type": "text", "text": f"\nCandidate {i+1} Image:"},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{candidate_image_base64}",
                                    "detail": "low"
                                }
                            }
                        ])
            
            # Get GPT-4 parameters from config
            gpt4_model = self.config.get('model', 'gpt-4o')
            gpt4_max_tokens = self.config.get('max_tokens', 1500)
            gpt4_temperature = self.config.get('temperature', 0.0)
            
            # call GPT-4
            response = self.gpt4_client.chat.completions.create(
                model=gpt4_model,
                messages=[{"role": "user", "content": message_content}],
                max_tokens=gpt4_max_tokens,
                temperature=gpt4_temperature
            )
            
            response_text = response.choices[0].message.content
            print(f"🤖 GPT-4 re-ranking response: {response_text}")
            
            # parse response
            import re
            best_index = 0
            
            if response_text:
                candidate_match = re.search(r'Best matching candidate[:：]\s*(\d+)', response_text, re.IGNORECASE)
                if candidate_match:
                    best_index = int(candidate_match.group(1)) - 1
                else:
                    numbers = re.findall(r'\b([1-9]\d?)\b', response_text)
                    if numbers:
                        best_index = int(numbers[0]) - 1
            
            best_index = max(0, min(best_index, len(search_results) - 1))
            
            print(f"✅ GPT-4 selected candidate {best_index + 1}")
            return search_results[best_index]
            
        except Exception as e:
            print(f"❌ GPT-4 re-ranking failed: {e}")
            import traceback
            print(f"detailed error info: {traceback.format_exc()}")
            # if GPT-4 re-ranking failed, return the first result of original retrieval
            if search_results:
                print("🔄 using original Top1 result as fallback")
                return search_results[0]
            else:
                print("⚠️ no available retrieval results")
                return None
    
    def _save_screenshot_temporarily(self, screenshot_base64: str) -> str:
        """save base64 screenshot temporarily and return path"""
        try:
            import base64
            import tempfile
            
            # create temporary file
            temp_dir = "/tmp/operator_rag_screenshots"
            os.makedirs(temp_dir, exist_ok=True)
            
            timestamp = int(time.time() * 1000)
            temp_path = os.path.join(temp_dir, f"screenshot_{timestamp}.png")
            
            image_data = base64.b64decode(screenshot_base64)
            with open(temp_path, 'wb') as f:
                f.write(image_data)
            
            return temp_path
            
        except Exception as e:
            print(f"❌ failed to save: {e}")
            return ""
    
    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            screenshot_base64: str = None,
            rag_config: Dict[str, Any] = None,
            rag_cache_dir: str = None
    ) -> list:
        """ 
        Build Operator prompt with pure image retrieval RAG support
        Enhanced with multi-step visual-action sequence support

        Args:
            user_request: User task request
            rag_path: RAG data path (not used here; rag_config is used)
            previous_trace: The history of previous operations
            observation: The current DOM observation (not used in Operator mode)
            feedback: Feedback or error message
            status_description: The current task state
            screenshot_base64: base64 encoding of the current screenshot (for image-only retrieval)
            rag_config: RAG database configuration
            rag_cache_dir: RAG cache directory path

        Returns:
            A formatted list of messages
        """
        if rag_cache_dir:
            if not rag_config:
                rag_config = {}
            rag_config['rag_cache_dir'] = rag_cache_dir
            print(f"🗄️  Using RAG cache directory: {rag_cache_dir}")
        
        # init RAG database
        if self.rag_db is None:
            self._init_rag_database(rag_config)
        
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request
        )

        content_parts = [{"type": "input_text", "text": self.prompt_user}]
        
        retrieved_info = None
        if screenshot_base64 and self.rag_db:
            try:
                print("🔍 Start retrieval based on screenshots...")
                
                temp_screenshot_path = self._save_screenshot_temporarily(screenshot_base64)
                
                if temp_screenshot_path:

                    self._ensure_embedding_path()
                    from rag_database import QueryItem
                    
                    query = QueryItem(
                        # text="", # image retrieval
                        text=user_request, # task description + image
                        image_paths=[temp_screenshot_path]
                    )
                    
                    # execute RAG retrieval
                    print("🔄 execute pure image retrieval...")
                    search_results = self.rag_db.search(query, top_k=20, score_threshold=0.0)
                    
                    if search_results:
                        print(f"📊 retrieved {len(search_results)} candidate results")
                        
                        results_for_rerank = []
                        for result in search_results:
                            cand_image_path = '[]'
                            if hasattr(result, 'cand_image_path'):
                                cand_image_path = result.cand_image_path
                            elif hasattr(result, 'image_paths'):
                                cand_image_path = result.image_paths
                            else:
                                try:
                                    import json
                                    data_file = "data/processed_cand_with_task.json"
                                    if os.path.exists(data_file):
                                        with open(data_file, 'r', encoding='utf-8') as f:
                                            cand_data = json.load(f)
                                        if result.cand_id in cand_data:
                                            cand_image_path = cand_data[result.cand_id].get('cand_image_path', '[]')
                                            # print(f"🔍 Found image paths for {result.cand_id}: {cand_image_path}")
                                except Exception as e:
                                    print(f"⚠️  Failed to load cand_image_path from file: {e}")
                            
                            results_for_rerank.append({
                                'cand_id': result.cand_id,
                                'score': result.score,
                                'task_description': result.task_description,
                                'cand_text': result.cand_text,
                                'annotation_id': result.annotation_id,
                                'cand_image_path': cand_image_path
                            })
                        
                        # re-rank
                        best_result = self._gpt4_rerank_results(
                            screenshot_base64, 
                            user_request, 
                            results_for_rerank,
                            top_k=15
                        )
                        
                        if best_result:
                            retrieved_info = best_result
                            print(f"✅ retrieved the best matching result: {best_result['cand_id']}")
                        
                    # clean
                    try:
                        os.remove(temp_screenshot_path)
                    except:
                        pass
                        
            except Exception as e:
                print(f"❌ RAG retrieval process failed: {e}")
                import traceback
                print(f"error: {traceback.format_exc()}")
                retrieved_info = None
        
        if retrieved_info:
            print(f"🔍 Debug - Retrieved info keys: {list(retrieved_info.keys())}")
            # print(f"🔍 Debug - cand_image_path: {retrieved_info.get('cand_image_path', 'NOT_FOUND')}")
            # print(f"🔍 Debug - cand_text preview: {retrieved_info.get('cand_text', 'NOT_FOUND')[:200]}...")
            
            self._add_multi_step_reference(content_parts, retrieved_info)
        else:
            content_parts.append({
                "type": "input_text", 
                "text": "\n## No Similar Task Reference Available ##\nProceeding with general task analysis.\n"
            })
        
        # add current task context
        content_parts.append({
            "type": "input_text", 
            "text": "\n## Current Task Context ##"
        })
        
        # add previous actions history
        if len(previous_trace) > 0:
            from agent.Memory.short_memory.history import HistoryMemory
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            content_parts.append({
                "type": "input_text", 
                "text": f"\n**Previous Actions:**\n{trace_prompt}"
            })
            
            if status_description:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Task Status:** {status_description}"
                })
            
            if feedback:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Feedback:** {feedback}"
                })
        
        if screenshot_base64:
            content_parts.append({
                "type": "input_text", 
                "text": "\n**Current Webpage Screenshot:**"
            })
            content_parts.append({
                "type": "image_url",
                "image_url": {"url": f"data:image/png;base64,{screenshot_base64}"}
            })
        
        # add enhanced task instructions
#         instruction_text = """\n## ENHANCED AUTONOMOUS EXECUTION INSTRUCTIONS:
# 1. **Multi-Step Reference Analysis**: Study the complete visual-action sequence from the reference task
# 2. **Step-by-Step Comparison**: Compare each reference step's screenshot with your current situation
# 3. **Pattern Application**: Identify which reference step most closely matches your current state
# 4. **Action Adaptation**: Adapt the successful action from the matching reference step to your context
# 5. **Visual Element Mapping**: Map UI elements between reference and current screenshots
# 6. **Coordinate Precision**: Use precise coordinates for click/drag actions based on visual analysis
# 7. **Sequential Reasoning**: Understand the logical flow from one step to the next
# 8. **Task Completion**: If the task appears complete, use "get_final_answer" action to finish
# 9. **Completion Verification**: Before using get_final_answer, ensure all task requirements are met
# 10. **No Confirmation**: Execute actions directly without asking for permission

# ## CRITICAL REMINDER FOR VISUAL SEQUENCE LEARNING:
# You have access to a complete visual-action sequence from a similar task. Use this step-by-step reference to:
# - **Identify your current position** in the task progression
# - **Find the matching reference step** that corresponds to your current state  
# - **Apply the reference action pattern** to your current situation
# - **Progress toward the next logical step** in the sequence

# You are an AUTONOMOUS agent with full authority. Analyze the visual sequence, identify your current step, and execute your next action immediately without seeking user approval!

# Please analyze the current state using the multi-step visual reference and provide your IMMEDIATE next action."""
        
#         content_parts.append({
#             "type": "input_text", 
#             "text": instruction_text
#         })
        
        # build final messages
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": content_parts}
        ]
        
        # store retrieved info for logging
        self.last_retrieved_info = retrieved_info
        
        return messages

    def get_last_retrieved_info(self) -> Optional[Dict]:
        """get the last retrieved info, for logging"""
        return getattr(self, 'last_retrieved_info', None)
    
    def stringfy_thought_and_action(self, input_list: list) -> str:
        """stringify the thought and action data to a formatted string"""
        try:
            if isinstance(input_list, str):
                input_list = json5.loads(input_list, encoding="utf-8")
            
            str_output = "["
            for idx, i in enumerate(input_list):
                str_output += f'Step{idx + 1}:"Thought: {i.get("thought", "")}, Action: {i.get("action", "")}, Reflection: {i.get("reflection", "")}";\n'
            str_output += "]"
            return str_output
            
        except Exception as e:
            print(f"Error stringifying thought and action: {e}")
            return str(input_list)

    def _parse_cand_text_and_images(self, cand_text: str, cand_image_path_json: str) -> List[Dict[str, Any]]:
        """
        parse cand_text and cand_image_path, build the mapping between steps and screenshots
        
        Args:
            cand_text: candidate text, contains multiple Observation-Action pairs
            cand_image_path_json: JSON string of image paths
            
        Returns:
            list of steps, each step contains observation, action and corresponding image path
        """
        try:
            import json5
            import json
            
            image_paths = []
            if isinstance(cand_image_path_json, str):
                try:
                    image_paths = json5.loads(cand_image_path_json)
                except:
                    try:
                        image_paths = json.loads(cand_image_path_json)
                    except json.JSONDecodeError:
                        try:
                            fixed_json = cand_image_path_json.replace("'", '"')
                            image_paths = json.loads(fixed_json)
                        except json.JSONDecodeError:
                            try:
                                image_paths = eval(cand_image_path_json)
                            except:
                                print(f"❌ Error parsing cand_image_path: {cand_image_path_json}")
                                return []
            elif isinstance(cand_image_path_json, list):
                image_paths = cand_image_path_json
            
            steps = []
            lines = cand_text.split('\n')
            current_observation = None
            current_action = None
            step_counter = 0
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                    
                if line.startswith('Observation'):
                    if current_observation and current_action:
                        steps.append({
                            'step_number': step_counter,
                            'observation': current_observation,
                            'action': current_action,
                            'image_path': image_paths[step_counter] if step_counter < len(image_paths) else None
                        })
                        step_counter += 1
                    
                    current_observation = line
                    current_action = None
                    
                elif line.startswith('Action'):
                    current_action = line
                    
                    if current_observation:
                        steps.append({
                            'step_number': step_counter,
                            'observation': current_observation,
                            'action': current_action,
                            'image_path': image_paths[step_counter] if step_counter < len(image_paths) else None
                        })
                        step_counter += 1
                        current_observation = None
                        current_action = None
            
            return steps
            
        except Exception as e:
            print(f"❌ Error parsing cand_text and images: {e}")
            return []

    def _add_multi_step_reference(self, content_parts: List[Dict], retrieved_info: Dict) -> None:
        """
        add multi-step reference information to prompt
        
        Args:
            content_parts: list of prompt content parts
            retrieved_info: retrieved information
        """
        try:
            cand_text = retrieved_info.get('cand_text', '')
            cand_image_paths = retrieved_info.get('cand_image_path', '[]')
            task_description = retrieved_info.get('task_description', 'N/A')
            
            # parse steps screenshots
            steps = self._parse_cand_text_and_images(cand_text, cand_image_paths)
            
            if not steps:
                print("⚠️  No valid steps parsed from reference data")
                return
            
            content_parts.append({
                "type": "input_text", 
                "text": f"\n## Similar Task Reference ## \nBelow are task examples relevant to your current step—two example steps are provided for reference.\n**Task Description:** {task_description}\n**Step-by-step Visual-Action Sequence:**\n"
            })
            
            for step in steps:
                step_text = f"\n**Step {step['step_number'] + 1}:**\n"
                step_text += f"- **Observation:** {step['observation']}\n"
                step_text += f"- **Action:** {step['action']}\n"
                step_text += "- **Screenshot at this step:**\n"
                
                content_parts.append({
                    "type": "input_text", 
                    "text": step_text
                })
                
                if step['image_path']:
                    image_path = step['image_path']
                    
                    possible_paths = []
                    
                    if os.path.exists(image_path):
                        possible_paths.append(image_path)
                    
                    possible_paths.extend([
                        f"data/Online-Mind2Web/rag_data/image/{image_path}",
                        f"data/Online-Mind2Web/{image_path}",
                        f"data/{image_path}"
                    ])
                    
                    if image_path.startswith('Online-Mind2Web/'):
                        clean_path = image_path.replace('Online-Mind2Web/', '', 1)
                        possible_paths.extend([
                            f"data/Online-Mind2Web/rag_data/image/{clean_path}",
                            f"data/Online-Mind2Web/{clean_path}",
                            f"data/{clean_path}"
                        ])
                    
                    found_image = False
                    for full_image_path in possible_paths:
                        try:
                            if os.path.exists(full_image_path):
                                example_image_base64 = self._encode_image_to_base64(full_image_path)
                                if example_image_base64:
                                    content_parts.append({
                                        "type": "input_image",
                                        "image_url": f"data:image/jpeg;base64,{example_image_base64}"
                                    })
                                    print(f"📸 Added reference screenshot for step {step['step_number'] + 1} from: {full_image_path}")
                                    found_image = True
                                    break
                        except Exception as e:
                            print(f"⚠️  Error trying path {full_image_path}: {e}")
                            continue
                    
                    if not found_image:
                        print(f"❌ Image not found in any of these paths for step {step['step_number'] + 1}:")
                        for path in possible_paths:
                            print(f"   - {path}")
                        content_parts.append({
                            "type": "input_text",
                            "text": f"[Screenshot for step {step['step_number'] + 1} not found]\n"
                        })
                else:
                    content_parts.append({
                        "type": "input_text",
                        "text": "[No screenshot available for this step]\n"
                    })
            
            # add learning points
            content_parts.append({
                "type": "input_text", 
                "text": """\n**Learning Points from this Reference:**
- **Visual Pattern Recognition:** Compare each reference screenshot with your current state
- **Action Sequence Logic:** Understand the reasoning behind each action step
- **UI Element Targeting:** Learn how to identify and interact with similar elements
- **Progressive Task Completion:** Follow the step-by-step approach to reach the goal
- **Coordinate-based Interactions:** Use precise coordinates when needed

"""
            })
            
        except Exception as e:
            print(f"❌ Error adding multi-step reference: {e}")
            import traceback
            print(f"Error details: {traceback.format_exc()}")

class OperatorDescRAGConstructor(BasePromptConstructor):
    """
    Operator Description RAG Constructor (Text Embedding + Task Description)
    Uses text embeddings to retrieve similar tasks, then extracts task descriptions by task ID.
    Combines the embedding retrieval approach of OperatorVisionRAGConstructor with the 
    task description loading approach of OperatorPromptDescriptionRetrievalConstructor.
    """
    
    def __init__(self):
        super().__init__()
        # autonomous rag prompt
        self.prompt_system = OperatorPrompts.operator_autonomous_rag_system
        self.prompt_user = OperatorPrompts.operator_autonomous_rag_user
        self.rag_db = None
        self.gpt4_client = None
        self.config = self._load_config()
        self._init_gpt4_client()
        self.reference = ""
        self._cache_saved = False
    
    def _load_config(self) -> Dict[str, Any]:
        """Load configuration from TOML file"""
        try:
            config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "configs", "embedding.toml")
            
            if os.path.exists(config_path):
                with open(config_path, 'r', encoding='utf-8') as f:
                    toml_config = toml.load(f)
                
                # Flatten the TOML structure for easy access
                flattened_config = {}
                for section_name, section_data in toml_config.items():
                    flattened_config.update(section_data)
                
                return flattened_config
            else:
                print(f"⚠️  Config file not found at {config_path}")
                return {}
        except Exception as e:
            print(f"❌ Error loading config: {e}")
            return {}
    
    def _ensure_embedding_path(self):
        import sys
        import os
        
        embedding_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../Embedding/VLM2Vec-pro')
        if embedding_path not in sys.path:
            sys.path.append(embedding_path)
            print(f"Added embedding path: {embedding_path}")
    
    def _init_gpt4_client(self):
        """Initialize GPT-4 client for re-ranking"""
        try:
            import os
            from openai import OpenAI
            
            api_key = os.getenv('OPENAI_API_KEY')
            if api_key:
                self.gpt4_client = OpenAI(api_key=api_key)
                print("🤖 GPT-4 client initialized successfully")
            else:
                print("⚠️  OpenAI API key not found, using original retrieval results")
        except Exception as e:
            print(f"❌ GPT-4 client initialization failed: {e}")
    
    def _init_rag_database(self, rag_config: Dict[str, Any] = None):
        """Initialize RAG database - support loading from cache"""
        if self.rag_db is not None:
            return
        
        # Check if there is RAG cache directory configuration
        rag_cache_dir = None
        if rag_config and 'rag_cache_dir' in rag_config:
            rag_cache_dir = rag_config['rag_cache_dir']
        elif hasattr(self, 'rag_cache_dir') and self.rag_cache_dir:
            rag_cache_dir = self.rag_cache_dir
        
        # If there is RAG cache directory, try to load from cache
        if rag_cache_dir and os.path.exists(rag_cache_dir):
            rag_index_path = os.path.join(rag_cache_dir, "rag_index.index")
            rag_config_path = os.path.join(rag_cache_dir, "rag_config.json")
            
            if os.path.exists(rag_index_path) and os.path.exists(rag_config_path):
                try:
                    print(f"🔄 Loading RAG database from cache: {rag_cache_dir}")
                    
                    with open(rag_config_path, 'r', encoding='utf-8') as f:
                        cached_config = json.load(f)
                    
                    self._ensure_embedding_path()
                    from rag_database import create_rag_database_from_config
                    
                    self.rag_db = create_rag_database_from_config(**cached_config)
                    self.rag_db.load_index(rag_index_path)
                    return
                    
                except Exception as e:
                    print(f"Cache loading failed: {e}")
        
        # If there is no cache or loading failed, execute the original build logic
        try:
            self._ensure_embedding_path()
            from rag_database import create_rag_database_from_config
            
            # Load configuration from TOML file
            config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "configs", "embedding.toml")
            
            if os.path.exists(config_path):
                with open(config_path, 'r', encoding='utf-8') as f:
                    toml_config = toml.load(f)
                
                # Flatten the TOML structure
                default_config = {}
                for section_name, section_data in toml_config.items():
                    default_config.update(section_data)
            else:
                print(f"⚠️  Config file not found at {config_path}, using fallback defaults")
                # Fallback to original hardcoded config
                default_config = {
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
                }
            
            # Override with any provided rag_config
            if rag_config:
                default_config.update(rag_config)
                print(f"🔄 Config overridden with: {list(rag_config.keys())}")
            
            print("🔄 Initializing RAG database...")
            self.rag_db = create_rag_database_from_config(**default_config)
            print("✅ RAG database initialized")
            
            # Save to cache
            if rag_cache_dir and not self._cache_saved:
                try:
                    os.makedirs(rag_cache_dir, exist_ok=True)
                    
                    rag_index_path = os.path.join(rag_cache_dir, "rag_index.index")
                    rag_config_path = os.path.join(rag_cache_dir, "rag_config.json")
                    
                    print(f"💾 Saving DOMVisionRAG cache to: {rag_cache_dir}")
                    self.rag_db.save_index(rag_index_path)
                    
                    with open(rag_config_path, 'w', encoding='utf-8') as f:
                        json.dump(default_config, f, ensure_ascii=False, indent=2)
                    
                    print(f"✅ DOMVisionRAG cache saved successfully")
                    print(f"📁 Index file: {rag_index_path}")
                    print(f"🔧 Config file: {rag_config_path}")
                    
                    self._cache_saved = True
                    
                except Exception as save_e:
                    print(f"⚠️  Failed to save DOMVisionRAG cache: {save_e}")
            
        except Exception as e:
            print(f"❌ RAG database initialization failed: {e}")
            self.rag_db = None
    
    def set_rag_cache_dir(self, rag_cache_dir: str):
        """Set RAG cache directory"""
        self.rag_cache_dir = rag_cache_dir
        print(f"🗄️  RAG cache directory set to: {rag_cache_dir}")

    def _gpt4_rerank_and_extract_task_id(self, query_text: str, search_results: List[Dict], top_k: int = 15) -> Optional[str]:
        """
        Use GPT-4 to re-rank results and extract task ID from the best match
        
        Args:
            query_text: Query text description
            search_results: Search results list
            top_k: Top K results to consider
            
        Returns:
            The best matching task ID, if failed, return None
        """
        if not self.gpt4_client or not search_results:
            print("🔄 GPT-4 not available, using original Top1 result")
            if search_results:
                # Try to extract task ID from cand_id
                return self._extract_task_id_from_cand_id(search_results[0].get('cand_id', ''))
            return None
        
        try:
            candidates_text = []
            
            for i, result in enumerate(search_results[:top_k]):
                task_desc = result.get('task_description', 'No task description')
                cand_id = result.get('cand_id', f'candidate_{i}')
                cand_text = result.get('cand_text', 'No candidate text')[:300] + "..." if len(result.get('cand_text', '')) > 300 else result.get('cand_text', '')
                
                candidate_info = f"""
Candidate {i+1}:
- Candidate ID: {cand_id}
- Task Description: {task_desc}
- Action Sequence: {cand_text}
"""
                candidates_text.append(candidate_info)
            
            # GPT-4 prompt for re-ranking and task ID extraction
            prompt = f"""
You are a task similarity expert. I will provide you with one query task description and {len(candidates_text)} candidate tasks with their action sequences.

Query Task Description: {query_text}

Please carefully analyze the query task and candidate tasks, and match them based on:
- Task goal similarity
- Action sequence relevance
- Task complexity match
- Interface interaction patterns

Candidate Information:
{"".join(candidates_text)}

Please select the most matching candidate from the above options, considering:
1. Task goal alignment
2. Action sequence similarity
3. Complexity match
4. Interface interaction patterns

Please answer with the candidate number that best matches the query task.

Answer format:
Best matching candidate: [number]
"""
            
            # Get GPT-4 parameters from config
            gpt4_model = self.config.get('model', 'gpt-4o')
            gpt4_max_tokens = self.config.get('max_tokens', 1500)
            gpt4_temperature = self.config.get('temperature', 0.0)
            
            # Call GPT-4
            response = self.gpt4_client.chat.completions.create(
                model=gpt4_model,
                messages=[{
                    "role": "user", 
                    "content": prompt
                }],
                max_tokens=gpt4_max_tokens,
                temperature=gpt4_temperature
            )
            
            response_text = response.choices[0].message.content
            print(f"🤖 GPT-4 re-ranking response: {response_text}")
            
            # Parse response
            import re
            best_index = 0
            
            if response_text:
                candidate_match = re.search(r'Best matching candidate[:：]\s*(\d+)', response_text, re.IGNORECASE)
                if candidate_match:
                    best_index = int(candidate_match.group(1)) - 1
                else:
                    numbers = re.findall(r'\b([1-9]\d?)\b', response_text)
                    if numbers:
                        best_index = int(numbers[0]) - 1
            
            best_index = max(0, min(best_index, len(search_results) - 1))
            
            print(f"✅ GPT-4 selected candidate {best_index + 1}")
            best_result = search_results[best_index]
            
            # Extract task ID from the best result
            task_id = self._extract_task_id_from_cand_id(best_result.get('cand_id', ''))
            print(f"📋 Extracted task ID: {task_id}")
            
            return task_id
            
        except Exception as e:
            print(f"❌ GPT-4 re-ranking failed: {e}")
            import traceback
            print(f"Detailed error info: {traceback.format_exc()}")
            # If GPT-4 re-ranking failed, return the first result task ID
            if search_results:
                print("🔄 Using original Top1 result as fallback")
                return self._extract_task_id_from_cand_id(search_results[0].get('cand_id', ''))
            else:
                print("⚠️  No available retrieval results")
                return None
    
    def _extract_task_id_from_cand_id(self, cand_id: str) -> Optional[str]:
        """
        Extract task ID from candidate ID
        Assumes cand_id format like: "task_hash_traj-step_num"
        
        Args:
            cand_id: Candidate ID
            
        Returns:
            Extracted task ID (task hash)
        """
        if not cand_id:
            return None
        
        try:
            # Remove '_traj-' and everything after it to get task hash
            if '_traj-' in cand_id:
                task_id = cand_id.split('_traj-')[0]
                return task_id
            else:
                # If format is different, return the whole cand_id as task_id
                return cand_id
        except Exception as e:
            print(f"❌ Error extracting task ID from {cand_id}: {e}")
            return None
    
    def _load_task_description_by_id(self, task_id: str) -> str:
        """
        Load task description by task ID from generated_task_descriptions.json
        
        Args:
            task_id: Task ID to search for
            
        Returns:
            Formatted task description string
        """
        if not task_id:
            return ""
        
        try:
            # Load generated task descriptions
            descriptions_path = "data/Online-Mind2Web/generated_steps/generated_task_descriptions.json"
            with open(descriptions_path, 'r', encoding='utf-8') as f:
                generated_descriptions = json.load(f)
            
            print(f"\n🔍 Looking for task description with ID: {task_id}")
            print(f"📚 Available tasks in descriptions file: {len(generated_descriptions)}")
            
            # Find matching task description by task_id
            task_description = None
            
            # Search for task_id in the data
            for desc in generated_descriptions:
                # Check if task_id field exists and matches
                if 'task_id' in desc and desc['task_id'] == task_id:
                    task_description = desc
                    break
                # Fallback: check if task_id is part of the task name or other fields
                elif task_id in str(desc.get('task_name', '')):
                    task_description = desc
                    print(f"📝 Found partial match in task_name: {desc['task_name']}")
                    break
            
            if not task_description:
                print(f"⚠️  WARNING: No matching task description found for task_id: {task_id}")
                print("Available task examples (first 5):")
                for i, desc in enumerate(generated_descriptions[:5]):
                    print(f"  - {desc.get('task_name', 'Unknown')} (ID: {desc.get('task_id', 'No ID')})")
                if len(generated_descriptions) > 5:
                    print(f"  ... and {len(generated_descriptions) - 5} more")
                return ""
            
            print(f"✅ Found matching task description: {task_description['task_name']}")
            
            # Build formatted reference - similar to OperatorPromptDescriptionRetrievalConstructor
            reference = f"\n**Example Task:** {task_description['task_name']}\n"
            reference += f"**Website:** {task_description.get('website', 'N/A')}\n"
            reference += f"**Task Level:** {task_description.get('level', 'N/A')}\n"
            reference += f"**Task ID:** {task_id}\n\n"
            reference += "**Step-by-step Example:**\n"
            
            # Add each step's detailed description
            for step in task_description['steps']:
                reference += f"\n**Step {step['step_number']}:**\n"
                reference += f"- **Observation:** {step['observation_description']}\n"
                reference += f"- **Action:** {step['action_description']}\n"
                
                # If there is original action information, include it too
                if 'original_action' in step:
                    original_action = step['original_action']
                    reference += f"- **Operation Type:** {original_action.get('operation', 'N/A')}\n"
                    if original_action.get('value'):
                        reference += f"- **Value:** {original_action['value']}\n"
                    if original_action.get('target'):
                        target = original_action['target']
                        if isinstance(target, dict) and 'x' in target:
                            reference += f"- **Target Coordinates:** ({target['x']:.3f}, {target['y']:.3f})\n"
                
                reference += "\n"
            
            # Add learning guidance - same as OperatorPromptDescriptionRetrievalConstructor
            reference += "\n**Learning Points:**\n"
            reference += "- Follow the **logical sequence of browser actions**, and understand the **intent behind each step**.\n"
            reference += "- Observe how the agent interprets **visual or textual cues** (e.g., buttons, input fields, layout changes) to decide its actions.\n"
            reference += "- Pay attention to **how UI elements are located and interacted with** — via coordinates, labels, DOM hierarchy, or visual affordances.\n"
            reference += "- Learn to generalize: apply similar **action-observation patterns** to new web interfaces.\n"
            reference += "- Use **coordinate-based clicks** when precise targeting is required, especially in complex or dynamic layouts.\n"
            reference += "- Consider the **full browser context**, including scroll, focus, or dynamic content changes.\n"

            # reference += "- Pay attention to the sequence of actions and their reasoning\n"
            # reference += "- Notice how observations lead to specific actions\n"
            # reference += "- Consider the visual elements and their interactions\n"
            # reference += "- Adapt the approach to your current task context\n"
            # reference += "- Use similar coordinate-based interactions when appropriate\n\n"
            
            return reference
            
        except Exception as e:
            print(f"❌ Error loading task description by ID {task_id}: {e}")
            return ""
    
    def _save_screenshot_temporarily(self, screenshot_base64: str) -> str:
        """Save base64 screenshot temporarily and return path"""
        try:
            import base64
            import tempfile
            
            # Create temporary file
            temp_dir = "/tmp/operator_desc_rag_screenshots"
            os.makedirs(temp_dir, exist_ok=True)
            
            timestamp = int(time.time() * 1000)
            temp_path = os.path.join(temp_dir, f"screenshot_{timestamp}.png")
            
            image_data = base64.b64decode(screenshot_base64)
            with open(temp_path, 'wb') as f:
                f.write(image_data)
            
            return temp_path
            
        except Exception as e:
            print(f"❌ Failed to save screenshot: {e}")
            return ""
    
    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            screenshot_base64: Optional[str] = None,
            rag_config: Dict[str, Any] = None,
            rag_cache_dir: str = None
    ) -> list:
        """ 
        Build Operator prompt with text embedding retrieval + task description loading
        Uses screenshot + text for embedding calculation (same as OperatorVisionRAGConstructor)

        Args:
            user_request: User task request
            rag_path: RAG data path (not used here; rag_config is used)
            previous_trace: The history of previous operations
            observation: The current DOM observation (not used in Operator mode)
            feedback: Feedback or error message
            status_description: The current task state
            screenshot_base64: base64 encoding of the current screenshot (REQUIRED for embedding)
            rag_config: RAG database configuration
            rag_cache_dir: RAG cache directory path

        Returns:
            A formatted list of messages
        """
        if rag_cache_dir:
            if not rag_config:
                rag_config = {}
            rag_config['rag_cache_dir'] = rag_cache_dir
            print(f"🗄️  Using RAG cache directory: {rag_cache_dir}")
        
        # Initialize RAG database
        if self.rag_db is None:
            self._init_rag_database(rag_config)
        
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request
        )

        content_parts = [{"type": "input_text", "text": self.prompt_user}]
        
        # Perform screenshot + text based retrieval (same as OperatorVisionRAGConstructor)
        retrieved_task_id = None
        if screenshot_base64 and self.rag_db:
            try:
                print("🔍 Starting screenshot + text embedding retrieval (same as OperatorVisionRAGConstructor)...")
                
                # Save screenshot temporarily (same method as OperatorVisionRAGConstructor)
                temp_screenshot_path = self._save_screenshot_temporarily(screenshot_base64)
                
                if temp_screenshot_path:
                    self._ensure_embedding_path()
                    from rag_database import QueryItem
                    
                    # Create query with screenshot + text (same as OperatorVisionRAGConstructor)
                    query = QueryItem(
                        text=user_request,  # task description + image
                        image_paths=[temp_screenshot_path]
                    )
                    
                    # Execute RAG retrieval (same method as OperatorVisionRAGConstructor)
                    print("🔄 Executing screenshot + text embedding retrieval...")
                    search_results = self.rag_db.search(query, top_k=20, score_threshold=0.0)
                    
                    if search_results:
                        print(f"📊 Retrieved {len(search_results)} candidate results")
                        
                        results_for_rerank = []
                        for result in search_results:
                            results_for_rerank.append({
                                'cand_id': result.cand_id,
                                'score': result.score,
                                'task_description': result.task_description,
                                'cand_text': result.cand_text,
                                'annotation_id': result.annotation_id
                            })
                        
                        # Use GPT-4 to re-rank and extract task ID (same method)
                        retrieved_task_id = self._gpt4_rerank_and_extract_task_id(
                            user_request, 
                            results_for_rerank,
                            top_k=15
                        )
                        
                        if retrieved_task_id:
                            print(f"✅ Retrieved task ID: {retrieved_task_id}")
                        else:
                            print("⚠️  Failed to extract task ID from retrieval results")
                    
                    # Clean up temporary screenshot (same as OperatorVisionRAGConstructor)
                    try:
                        os.remove(temp_screenshot_path)
                    except:
                        pass
                        
            except Exception as e:
                print(f"❌ RAG retrieval process failed: {e}")
                import traceback
                print(f"Error details: {traceback.format_exc()}")
                retrieved_task_id = None
        elif not screenshot_base64:
            print("⚠️  No screenshot provided for description_rag mode, skipping RAG retrieval")
            print("💡 Description RAG mode requires screenshot for embedding calculation")
        
        # Load task description by task ID (unique to OperatorDescRAGConstructor)
        if retrieved_task_id:
            self.reference = self._load_task_description_by_id(retrieved_task_id)
        
        if self.reference:
            content_parts.append({
                "type": "input_text", 
                "text": "## Here are some similar task reference to help you: ##\n" + self.reference
            })
        else:
            content_parts.append({
                "type": "input_text", 
                "text": "## No Similar Task Reference Available ##\nProceeding with general task analysis.\n"
            })
        
        # Add current task context
        content_parts.append({
            "type": "input_text", 
            "text": "\n## Current Task Context ##"
        })
        
        # Add previous actions history
        if len(previous_trace) > 0:
            from agent.Memory.short_memory.history import HistoryMemory
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            content_parts.append({
                "type": "input_text", 
                "text": f"\n**Previous Actions:**\n{trace_prompt}"
            })
            
            if status_description:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Task Status:** {status_description}"
                })
            
            if feedback:
                content_parts.append({
                    "type": "input_text", 
                    "text": f"\n**Feedback:** {feedback}"
                })
        
        # Add current screenshot if available
        if screenshot_base64:
            content_parts.append({
                "type": "input_text", 
                "text": "\n**Current Webpage Screenshot:**"
            })
            content_parts.append({
                "type": "input_image",
                "image_url": f"data:image/png;base64,{screenshot_base64}"
            })
        
        # # Add task instructions - similar to OperatorPromptDescriptionRetrievalConstructor
        # content_parts.append({
        #     "type": "input_text", 
        #     "text": """\n## RAG-ENHANCED EXECUTION GUIDANCE:
        #     Use the retrieved similar task example to guide your approach and compare the current screenshot with the retrieved task context for pattern matching.
        #     Please analyze the current state using both visual analysis and retrieved task context, and provide your IMMEDIATE next action.
        #     """
        # })
        
        # Build final messages
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": content_parts}
        ]
        
        # Store retrieved info for logging
        self.last_retrieved_task_id = retrieved_task_id
        
        return messages
    
    def get_last_retrieved_task_id(self) -> Optional[str]:
        """Get the last retrieved task ID, for logging"""
        return getattr(self, 'last_retrieved_task_id', None)
    
    def get_last_retrieved_info(self) -> Optional[Dict]:
        """Get the last retrieved info, for logging"""
        task_id = self.get_last_retrieved_task_id()
        if task_id:
            return {
                'task_id': task_id,
                'retrieved_reference': self.reference[:200] + "..." if len(self.reference) > 200 else self.reference,
                'rag_mode': 'description_rag',
                'embedding_retrieval': True,
                'gpt4_reranked': self.gpt4_client is not None
            }
        return None
    
    def stringfy_thought_and_action(self, input_list: list) -> str:
        """Stringify the thought and action data to a formatted string"""
        try:
            if isinstance(input_list, str):
                input_list = json5.loads(input_list, encoding="utf-8")
            
            str_output = "["
            for idx, i in enumerate(input_list):
                str_output += f'Step{idx + 1}:"Thought: {i.get("thought", "")}, Action: {i.get("action", "")}, Reflection: {i.get("reflection", "")}";\n'
            str_output += "]"
            return str_output
            
        except Exception as e:
            print(f"Error stringifying thought and action: {e}")
            return str(input_list)


class OperatorHybridRAGConstructor(BasePromptConstructor):
    """
    Hybrid dual-route RAG for operator mode:
    1) Vision route: screenshot + text embedding retrieval.
    2) Description route: task-description retrieval and reference traces.
    Then fuse both references into one in-context prompt.
    """

    def __init__(self):
        super().__init__()
        self.prompt_system = OperatorPrompts.operator_autonomous_rag_system
        self.prompt_user = OperatorPrompts.operator_autonomous_rag_user
        self.vision_constructor = OperatorVisionRAGConstructor()
        self.desc_constructor = OperatorDescRAGConstructor()
        self.last_retrieved_info = None

    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            screenshot_base64: Optional[str] = None,
            rag_config: Dict[str, Any] = None,
            rag_cache_dir: str = None
    ) -> list:
        vision_messages = self.vision_constructor.construct(
            user_request=user_request,
            rag_path=rag_path,
            previous_trace=previous_trace,
            observation=observation,
            feedback=feedback,
            status_description=status_description,
            screenshot_base64=screenshot_base64,
            rag_config=rag_config,
            rag_cache_dir=rag_cache_dir
        )

        _ = self.desc_constructor.construct(
            user_request=user_request,
            rag_path=rag_path,
            previous_trace=previous_trace,
            observation=observation,
            feedback=feedback,
            status_description=status_description,
            screenshot_base64=screenshot_base64,
            rag_config=rag_config,
            rag_cache_dir=rag_cache_dir
        )

        desc_reference = getattr(self.desc_constructor, "reference", "")
        desc_info = self.desc_constructor.get_last_retrieved_info()
        vision_info = self.vision_constructor.get_last_retrieved_info()

        if (
            desc_reference
            and isinstance(vision_messages, list)
            and len(vision_messages) >= 2
            and isinstance(vision_messages[1], dict)
            and isinstance(vision_messages[1].get("content"), list)
        ):
            vision_messages[1]["content"].append(
                {
                    "type": "input_text",
                    "text": "\n## Textual Retrieval Reference ##\n"
                            "This reference is from the description retrieval route.\n"
                            + desc_reference,
                }
            )

        if (
            isinstance(vision_messages, list)
            and len(vision_messages) >= 2
            and isinstance(vision_messages[1], dict)
            and isinstance(vision_messages[1].get("content"), list)
        ):
            vision_messages[1]["content"].append(
                {
                    "type": "input_text",
                    "text": "\n## Dual-Route Fusion Guidance ##\n"
                            "- Route A (vision) gives screenshot-level visual-action priors.\n"
                            "- Route B (description) gives task-intent and semantic step priors.\n"
                            "- Prefer actions supported by both routes; if they conflict, trust current screenshot state first."
                }
            )

        visual_task_id = ""
        if isinstance(vision_info, dict):
            visual_task_id = str(vision_info.get("cand_id", ""))

        text_task_id = ""
        if isinstance(desc_info, dict):
            text_task_id = str(desc_info.get("task_id", ""))

        fusion_confidence = 0.0
        if visual_task_id and text_task_id:
            fusion_confidence = 1.0 if visual_task_id == text_task_id else 0.6
        elif visual_task_id or text_task_id:
            fusion_confidence = 0.45

        self.last_retrieved_info = {
            "visual_task_id": visual_task_id,
            "text_task_id": text_task_id,
            "fusion_confidence": fusion_confidence,
            "vision_info": vision_info,
            "text_info": desc_info,
        }

        return vision_messages

    def get_last_retrieved_info(self) -> Optional[Dict]:
        return self.last_retrieved_info

    def stringfy_thought_and_action(self, input_list: list) -> str:
        try:
            if isinstance(input_list, str):
                input_list = json5.loads(input_list, encoding="utf-8")

            str_output = "["
            for idx, i in enumerate(input_list):
                str_output += f'Step{idx + 1}:"Thought: {i.get("thought", "")}, Action: {i.get("action", "")}, Reflection: {i.get("reflection", "")}";\n'
            str_output += "]"
            return str_output

        except Exception as e:
            print(f"Error stringifying thought and action: {e}")
            return str(input_list)

# Vision RAG Constructor for DOM Mode
class DOMVisionRAGConstructor(BasePromptConstructor):
    """
    Vision RAG Constructor for DOM
    Uses only visual embeddings from current screenshot to retrieve related task information, then uses GPT-4 to re-rank and select the best match.
    This version is adapted for DOM mode, using BasePrompts and standard message format.
    Note: This version does NOT use task text descriptions - only image-based retrieval.
    """
    
    def __init__(self):
        super().__init__()
        # Use DOM mode prompts
        self.prompt_system = BasePrompts.planning_rag_prompt_system
        self.prompt_user = BasePrompts.planning_prompt_user
        self.rag_db = None
        self.gpt4_client = None
        self.config = self._load_config()
        self._init_gpt4_client()
        self._cache_saved = False  # Track if cache has been saved
    
    def _load_config(self) -> Dict[str, Any]:
        """Load configuration from TOML file"""
        try:
            config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "configs", "embedding.toml")
            
            if os.path.exists(config_path):
                with open(config_path, 'r', encoding='utf-8') as f:
                    toml_config = toml.load(f)
                
                # Flatten the TOML structure for easy access
                flattened_config = {}
                for section_name, section_data in toml_config.items():
                    flattened_config.update(section_data)
                
                return flattened_config
            else:
                print(f"⚠️  Config file not found at {config_path}")
                return {}
        except Exception as e:
            print(f"❌ Error loading config: {e}")
            return {}
    
    def _ensure_embedding_path(self):
        import sys
        import os
        
        embedding_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../Embedding/VLM2Vec-pro')
        if embedding_path not in sys.path:
            sys.path.append(embedding_path)
            print(f"sys.path: {embedding_path}")
    
    def _init_gpt4_client(self):
        """GPT-4 client for re-ranking"""
        try:
            import os
            from openai import OpenAI
            
            api_key = os.getenv('OPENAI_API_KEY')
            if api_key:
                self.gpt4_client = OpenAI(api_key=api_key)
                print("🤖 GPT-4 client initialized successfully")
            else:
                print("⚠️  OpenAI API key not found, using original retrieval results")
        except Exception as e:
            print(f"❌ GPT-4 client initialization failed: {e}")
    
    def _init_rag_database(self, rag_config: Dict[str, Any] = None):
        """init RAG database - support loading from cache"""
        if self.rag_db is not None:
            return
        
        # check if there is RAG cache directory configuration
        rag_cache_dir = None
        if rag_config and 'rag_cache_dir' in rag_config:
            rag_cache_dir = rag_config['rag_cache_dir']
        elif hasattr(self, 'rag_cache_dir') and self.rag_cache_dir:
            rag_cache_dir = self.rag_cache_dir
        
        # if there is RAG cache directory, try to load from cache
        if rag_cache_dir and os.path.exists(rag_cache_dir):
            rag_index_path = os.path.join(rag_cache_dir, "rag_index.index")
            rag_config_path = os.path.join(rag_cache_dir, "rag_config.json")
            
            if os.path.exists(rag_index_path) and os.path.exists(rag_config_path):
                try:
                    print(f"🔄 Loading RAG database from cache: {rag_cache_dir}")
                    
                    with open(rag_config_path, 'r', encoding='utf-8') as f:
                        cached_config = json.load(f)
                    
                    self._ensure_embedding_path()
                    from rag_database import create_rag_database_from_config
                    
                    self.rag_db = create_rag_database_from_config(**cached_config)
                    self.rag_db.load_index(rag_index_path)
                    return
                    
                except Exception as e:
                    print(f"Cache loading failed: {e}")
        
        # if there is no cache or loading failed, execute the original build logic
        try:
            self._ensure_embedding_path()
            from rag_database import create_rag_database_from_config
            
            # Load configuration from TOML file
            config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "configs", "embedding.toml")
            
            if os.path.exists(config_path):
                with open(config_path, 'r', encoding='utf-8') as f:
                    toml_config = toml.load(f)
                
                # Flatten the TOML structure
                default_config = {}
                for section_name, section_data in toml_config.items():
                    default_config.update(section_data)
            else:
                print(f"⚠️  Config file not found at {config_path}, using fallback defaults")
                # Fallback to original hardcoded config
                default_config = {
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
                }
            
            # Override with any provided rag_config
            if rag_config:
                default_config.update(rag_config)
                print(f"🔄 Config overridden with: {list(rag_config.keys())}")
            
            print("🔄 initializing RAG database...")
            self.rag_db = create_rag_database_from_config(**default_config)
            print("✅ RAG database initialized")
            
            # Save to cache if cache directory is provided and not already saved
            if rag_cache_dir and not self._cache_saved:
                try:
                    os.makedirs(rag_cache_dir, exist_ok=True)
                    
                    rag_index_path = os.path.join(rag_cache_dir, "rag_index.index")
                    rag_config_path = os.path.join(rag_cache_dir, "rag_config.json")
                    
                    print(f"💾 Saving DOMVisionRAG cache to: {rag_cache_dir}")
                    self.rag_db.save_index(rag_index_path)
                    
                    with open(rag_config_path, 'w', encoding='utf-8') as f:
                        json.dump(default_config, f, ensure_ascii=False, indent=2)
                    
                    print(f"✅ DOMVisionRAG cache saved successfully")
                    print(f"📁 Index file: {rag_index_path}")
                    print(f"🔧 Config file: {rag_config_path}")
                    
                    self._cache_saved = True  # Mark cache as saved
                    
                except Exception as save_e:
                    print(f"⚠️  Failed to save DOMVisionRAG cache: {save_e}")
                    # Continue execution even if cache save fails
            
        except Exception as e:
            print(f"❌ RAG database initialization failed: {e}")
            self.rag_db = None
    
    def set_rag_cache_dir(self, rag_cache_dir: str):
        """set RAG cache directory"""
        self.rag_cache_dir = rag_cache_dir
        print(f"🗄️  RAG cache directory set to: {rag_cache_dir}")

    def _encode_image_to_base64(self, image_path_or_base64: str) -> str:
        """encode image to base64 format with compression for token efficiency"""
        try:
            # if already base64, return directly
            if image_path_or_base64.startswith('data:image'):
                return image_path_or_base64.split(',')[1]
            elif len(image_path_or_base64) > 100 and '/' not in image_path_or_base64:
                return image_path_or_base64
            
            import base64
            import os
            from PIL import Image
            import io
            
            if not os.path.exists(image_path_or_base64):
                print(f"⚠️  image file not found: {image_path_or_base64}")
                return ""
            
            # Get image processing parameters from config
            max_size = self.config.get('max_size', 800)
            quality = self.config.get('quality', 85)
            
            # read and compress image for token efficiency
            with Image.open(image_path_or_base64) as img:
                if img.width > max_size or img.height > max_size:
                    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
                
                # convert to base64 with configurable quality
                img_byte_arr = io.BytesIO()
                img.save(img_byte_arr, format="JPEG", quality=quality, optimize=True)
                img_bytes = img_byte_arr.getvalue()
                
                encoded = base64.b64encode(img_bytes).decode('utf-8')
                return encoded
                
        except Exception as e:
            print(f"❌ image encoding failed: {e}")
            return ""
    
    def _gpt4_rerank_results(self, query_image_base64: str, query_task: str, search_results: List[Dict], top_k: int = 15) -> Optional[Dict]:
        """
        re-rank and select the best match using GPT-4
        
        Args:
            query_image_base64: query image base64
            query_task: query task description
            search_results: search results list
            top_k: top K results to consider
            
        Returns:
            the best matching result, if failed, return None
        """
        if not self.gpt4_client or not search_results:
            print("🔄 GPT-4 not available, using original Top1 result")
            return search_results[0] if search_results else None
        
        try:
            candidates_text = []
            candidate_images = []
            
            for i, result in enumerate(search_results[:top_k]):
                task_desc = result.get('task_description', '无任务描述')
                cand_id = result.get('cand_id', f'candidate_{i}')
                
                candidate_image_path = ""
                if '_traj-' in cand_id:
                    parts = cand_id.split('_traj-')
                    task_hash = parts[0]
                    step_num = parts[1]
                    # Get candidate image base path from config
                    candidate_image_base_path = self.config.get('candidate_image_base_path', '/home/ubuntu/data/csb/images/embedding/GAE-Bench/images/Online-Mind2Web')
                    candidate_image_path = f"{candidate_image_base_path}/{task_hash}_step_{step_num}.png"
                
                candidate_info = f"""
Candidate {i+1}:
- Candidate ID: {cand_id}
- Task Description: {task_desc}
"""
                candidates_text.append(candidate_info)
                candidate_images.append(candidate_image_path)
            
            # GPT-4 prompt for re-ranking
            prompt = f"""
You are a web interface image matching expert. I will provide you with one query web interface image, a query task description, and {len(candidates_text)} candidate web interfaces, each with corresponding web interface images and task descriptions.

Query Task Description: {query_task}

Please carefully analyze the query image and candidate images, and match them based on task descriptions, including:
- Interface elements (buttons, input fields, text, etc.)
- Interface layout and design
- Interface visual similarity
- Matching degree between query task and candidate task descriptions

Candidate Information:
{"".join(candidates_text)}

Please select the most matching candidate from the above options, considering the following main factors:
1. Image visual similarity
2. Interface element matching degree
3. Relevance between query task and candidate task descriptions

Please answer:
The most matching candidate number (1-{len(candidates_text)})

Answer format:
Best matching candidate: [number]
"""
            
            message_content = [
                {"type": "text", "text": prompt},
                {"type": "text", "text": "\nQuery Image:"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{query_image_base64}",
                        "detail": "low"
                    }
                }
            ]
            
            # add candidate images (max=15)
            cand_img_num = min(15, len(candidate_images))
            for i, candidate_image_path in enumerate(candidate_images[:cand_img_num]):
                if candidate_image_path and os.path.exists(candidate_image_path):
                    candidate_image_base64 = self._encode_image_to_base64(candidate_image_path)
                    if candidate_image_base64:
                        message_content.extend([
                            {"type": "text", "text": f"\nCandidate {i+1} Image:"},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{candidate_image_base64}",
                                    "detail": "low"
                                }
                            }
                        ])
            
            # Get GPT-4 parameters from config
            gpt4_model = self.config.get('model', 'gpt-4o')
            gpt4_max_tokens = self.config.get('max_tokens', 1500)
            gpt4_temperature = self.config.get('temperature', 0.0)
            
            # call GPT-4
            response = self.gpt4_client.chat.completions.create(
                model=gpt4_model,
                messages=[{"role": "user", "content": message_content}],
                max_tokens=gpt4_max_tokens,
                temperature=gpt4_temperature
            )
            
            response_text = response.choices[0].message.content
            print(f"🤖 GPT-4 re-ranking response: {response_text}")
            
            # parse response
            import re
            best_index = 0
            
            if response_text:
                candidate_match = re.search(r'Best matching candidate[:：]\s*(\d+)', response_text, re.IGNORECASE)
                if candidate_match:
                    best_index = int(candidate_match.group(1)) - 1
                else:
                    numbers = re.findall(r'\b([1-9]\d?)\b', response_text)
                    if numbers:
                        best_index = int(numbers[0]) - 1
            
            best_index = max(0, min(best_index, len(search_results) - 1))
            
            print(f"✅ GPT-4 selected candidate {best_index + 1}")
            return search_results[best_index]
            
        except Exception as e:
            print(f"❌ GPT-4 re-ranking failed: {e}")
            import traceback
            print(f"detailed error info: {traceback.format_exc()}")
            # if GPT-4 re-ranking failed, return the first result of original retrieval
            if search_results:
                print("🔄 using original Top1 result as fallback")
                return search_results[0]
            else:
                print("⚠️ no available retrieval results")
                return None
    
    def _save_screenshot_temporarily(self, screenshot_base64: str) -> str:
        """save base64 screenshot temporarily and return path"""
        try:
            import base64
            import tempfile
            
            # create temporary file
            temp_dir = "/tmp/dom_rag_screenshots"
            os.makedirs(temp_dir, exist_ok=True)
            
            timestamp = int(time.time() * 1000)
            temp_path = os.path.join(temp_dir, f"screenshot_{timestamp}.png")
            
            image_data = base64.b64decode(screenshot_base64)
            with open(temp_path, 'wb') as f:
                f.write(image_data)
            
            return temp_path
            
        except Exception as e:
            print(f"❌ failed to save: {e}")
            return ""
    
    def construct(
            self,
            user_request: str,
            rag_path: str,
            previous_trace: list,
            observation: str,
            feedback: str = "",
            status_description: str = "",
            screenshot_base64: Optional[str] = None,
            rag_config: Optional[Dict[str, Any]] = None,
            rag_cache_dir: Optional[str] = None
    ) -> list:
        """ 
        Build DOM prompt with pure image retrieval RAG support
        Enhanced with multi-step visual-action sequence support

        Args:
            user_request: User task request
            rag_path: RAG data path (not used here; rag_config is used)
            previous_trace: The history of previous operations
            observation: The current DOM observation
            feedback: Feedback or error message
            status_description: The current task state
            screenshot_base64: The base64 encoding of the current screenshot (for image-only retrieval)
            rag_config: RAG database configuration
            rag_cache_dir: RAG cache directory path

        Returns:
            A formatted list of messages compatible with DOM mode
        """
        print(f"🔍 DOMVisionRAGConstructor.construct() called")
        print(f"   - user_request: {user_request[:100]}..." if len(user_request) > 100 else f"   - user_request: {user_request}")
        print(f"   - screenshot_base64 provided: {'✅ YES' if screenshot_base64 else '❌ NO'}")
        print(f"   - screenshot_base64 length: {len(screenshot_base64) if screenshot_base64 else 0}")
        print(f"   - rag_cache_dir: {rag_cache_dir}")
        print(f"   - rag_config keys: {list(rag_config.keys()) if rag_config else 'None'}")
        print(f"   - self.rag_db initialized: {'✅ YES' if self.rag_db else '❌ NO'}")
        
        if rag_cache_dir:
            if not rag_config:
                rag_config = {}
            rag_config['rag_cache_dir'] = rag_cache_dir
            print(f"🗄️  Using RAG cache directory: {rag_cache_dir}")
        
        # init RAG database
        if self.rag_db is None:
            print("🔄 Initializing RAG database...")
            self._init_rag_database(rag_config or {})
            print(f"   - RAG database after init: {'✅ Initialized' if self.rag_db else '❌ Failed'}")
        else:
            print("✅ RAG database already initialized")
        
        # Start with base prompt
        self.prompt_user = Template(self.prompt_user).render(
            user_request=user_request)
        
        # Add retrieved examples with their steps and images
        retrieved_info = None
        print(f"🔍 RAG retrieval condition check:")
        print(f"   - screenshot_base64: {'✅ Available' if screenshot_base64 else '❌ Missing'}")
        print(f"   - self.rag_db: {'✅ Available' if self.rag_db else '❌ Missing'}")
        print(f"   - Will execute RAG retrieval: {'✅ YES' if (screenshot_base64 and self.rag_db) else '❌ NO'}")
        
        if screenshot_base64 and self.rag_db:
            try:
                print("🔍 Start DOM Vision RAG retrieval based on screenshots...")
                
                temp_screenshot_path = self._save_screenshot_temporarily(screenshot_base64)
                
                if temp_screenshot_path:

                    self._ensure_embedding_path()
                    from rag_database import QueryItem
                    
                    query = QueryItem(
                        text=user_request, # task description + image
                        image_paths=[temp_screenshot_path]
                    )
                    
                    # execute RAG retrieval
                    print("🔄 execute pure image retrieval...")
                    search_results = self.rag_db.search(query, top_k=20, score_threshold=0.0)
                    
                    if search_results:
                        print(f"📊 retrieved {len(search_results)} candidate results")
                        
                        results_for_rerank = []
                        for result in search_results:
                            cand_image_path = '[]'
                            if hasattr(result, 'cand_image_path'):
                                cand_image_path = result.cand_image_path
                            elif hasattr(result, 'image_paths'):
                                cand_image_path = result.image_paths
                            else:
                                try:
                                    import json
                                    data_file = "data/processed_cand_with_task.json"
                                    if os.path.exists(data_file):
                                        with open(data_file, 'r', encoding='utf-8') as f:
                                            cand_data = json.load(f)
                                        if result.cand_id in cand_data:
                                            cand_image_path = cand_data[result.cand_id].get('cand_image_path', '[]')
                                except Exception as e:
                                    print(f"⚠️  Failed to load cand_image_path from file: {e}")
                            
                            results_for_rerank.append({
                                'cand_id': result.cand_id,
                                'score': result.score,
                                'task_description': result.task_description,
                                'cand_text': result.cand_text,
                                'annotation_id': result.annotation_id,
                                'cand_image_path': cand_image_path
                            })
                        
                        # re-rank
                        best_result = self._gpt4_rerank_results(
                            screenshot_base64, 
                            user_request, 
                            results_for_rerank,
                            top_k=15
                        )
                        
                        if best_result:
                            retrieved_info = best_result
                            print(f"✅ retrieved the best matching result: {best_result['cand_id']}")
                        
                    # clean
                    try:
                        os.remove(temp_screenshot_path)
                    except:
                        pass
                        
            except Exception as e:
                print(f"❌ RAG retrieval process failed: {e}")
                import traceback
                print(f"error: {traceback.format_exc()}")
                retrieved_info = None
        
        # Build multimodal content parts (exactly like PlanningPromptVisionRetrievalConstructor)
        prompt_elements = [{"type": "text", "text": self.prompt_user}]
        
        if retrieved_info:
            print(f"🔍 Debug - Retrieved info keys: {list(retrieved_info.keys())}")
            print(f"✅ RAG retrieval successful - adding multimodal reference to prompt")
            self._add_multimodal_reference(prompt_elements, retrieved_info)
        else:
            print(f"❌ No RAG retrieval results - proceeding without reference")
            prompt_elements.append({
                "type": "text", 
                "text": "\n## No Similar Task Reference Available ##\nProceeding with general task analysis.\n"
            })
        
        # Add previous trace if available
        if len(previous_trace) > 0:
            trace_prompt = HistoryMemory(
                previous_trace=previous_trace, 
                reflection=status_description
            ).construct_previous_trace_prompt()
            prompt_elements.append({"type": "text", "text": trace_prompt})
            
            if status_description:
                prompt_elements.append({
                    "type": "text", 
                    "text": f"\nTask completion description: {status_description}"
                })
                
            if feedback:
                prompt_elements.append({
                    "type": "text", 
                    "text": f"\nHere are some other things you need to know:\n{feedback}"
                })
        
        # Add current DOM observation (full content as requested)
        if observation:
            prompt_elements.append({
                "type": "text", 
                "text": f"\nHere is the accessibility tree that you should refer to for this task:\n{observation}"
            })
        
        # Add enhanced task instructions for DOM mode
#         prompt_elements.append({
#             "type": "text",
#             "text": """\n## ENHANCED DOM EXECUTION INSTRUCTIONS:
# 1. **Multi-Step Reference Analysis**: Study the complete visual-action sequence from the reference task
# 2. **Step-by-Step Comparison**: Compare each reference step's observation with your current DOM state
# 3. **Pattern Application**: Identify which reference step most closely matches your current DOM situation
# 4. **Action Adaptation**: Adapt the successful action from the matching reference step to your DOM context
# 5. **Element Mapping**: Map DOM elements between reference and current accessibility tree
# 6. **Element ID Precision**: Use precise element_id values from the current DOM tree for actions
# 7. **Sequential Reasoning**: Understand the logical flow from one DOM action to the next
# 8. **Task Completion**: If the task appears complete, use "get_final_answer" action to finish
# 9. **Completion Verification**: Before using get_final_answer, ensure all task requirements are met
# 10. **DOM-focused Execution**: Execute DOM actions directly based on current accessibility tree

# ## CRITICAL REMINDER FOR DOM VISUAL SEQUENCE LEARNING:
# You have access to a complete visual-action sequence from a similar task. Use this step-by-step reference to:
# - **Identify your current DOM position** in the task progression
# - **Find the matching reference step** that corresponds to your current DOM state  
# - **Apply the reference action pattern** to your current DOM situation using proper element_id
# - **Progress toward the next logical DOM step** in the sequence

# Analyze the visual sequence, identify your current DOM step, and provide your next action with the correct element_id from the accessibility tree!
# """
#         })
        
        # Add current screenshot (like OperatorVisionRAGConstructor but with PlanningPromptVisionRetrievalConstructor format)
        if screenshot_base64:
            prompt_elements.append({
                "type": "text", 
                "text": "\nCurrent webpage screenshot:"
            })
            prompt_elements.append({
                "type": "image_url",
                "image_url": {"url": f"data:image/png;base64,{screenshot_base64}"}
            })
        
        # Construct final messages using multimodal format (like PlanningPromptVisionRetrievalConstructor)
        messages = [
            {"role": "system", "content": self.prompt_system},
            {"role": "user", "content": prompt_elements}
        ]
        
        # store retrieved info for logging
        self.last_retrieved_info = retrieved_info
        
        return messages

    def get_last_retrieved_info(self) -> Optional[Dict]:
        """get the last retrieved info, for logging"""
        return getattr(self, 'last_retrieved_info', None)
    
    def stringfy_thought_and_action(self, input_list: list) -> str:
        """stringify the thought and action data to a formatted string"""
        try:
            if isinstance(input_list, str):
                input_list = json5.loads(input_list, encoding="utf-8")
            
            str_output = "["
            for idx, i in enumerate(input_list):
                str_output += f'Step{idx + 1}:"Thought: {i.get("thought", "")}, Action: {i.get("action", "")}, Reflection: {i.get("reflection", "")}";\n'
            str_output += "]"
            return str_output
            
        except Exception as e:
            print(f"Error stringifying thought and action: {e}")
            return str(input_list)

    def _add_multimodal_reference(self, prompt_elements: List[Dict], retrieved_info: Dict) -> None:
        """
        Add multimodal reference content to prompt_elements (exactly like PlanningPromptVisionRetrievalConstructor)
        
        Args:
            prompt_elements: Prompt elements list to append to
            retrieved_info: Retrieved information dictionary
        """
        try:
            cand_text = retrieved_info.get('cand_text', '')
            cand_image_paths = retrieved_info.get('cand_image_path', '[]')
            task_description = retrieved_info.get('task_description', 'N/A')
            
            # Parse steps and corresponding screenshots
            steps = self._parse_cand_text_and_images(cand_text, cand_image_paths)
            
            if not steps:
                print("⚠️  No valid steps parsed from reference data")
                return
            
            # Add concise task reference
            prompt_elements.append({
                "type": "text", 
                "text": f"\n## Similar Task Reference ## \nBelow are task examples relevant to your current step—two example steps are provided for reference.\n**Task Description:** {task_description}\n**Step-by-step Visual-Action Sequence:**\n"
            })
            
            # Add only the first 2 steps to limit token usage  
            max_steps = min(2, len(steps))
            for i, step in enumerate(steps[:max_steps]):
                # Add step description
                prompt_elements.append({
                    "type": "text",
                    "text": f"Step {step['step_number'] + 1}: {step['action']}\n"
                })
                
                # Add corresponding screenshot using exact PlanningPromptVisionRetrievalConstructor format
                if step['image_path']:
                    image_path = step['image_path']
                    full_image_path = f"data/Online-Mind2Web/rag_data/image/{image_path}"
                    
                    try:
                        if os.path.exists(full_image_path):
                            with open(full_image_path, 'rb') as img_file:
                                img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
                                # Exact format from PlanningPromptVisionRetrievalConstructor
                                prompt_elements.append({
                                    "type": "image_url",
                                    "image_url": {"url": f"data:image/png;base64,{img_base64}"}
                                })
                                print(f"📸 Added reference screenshot for step {step['step_number'] + 1}")
                    except Exception as e:
                        print(f"⚠️ Error loading image {image_path}: {e}")
            
        except Exception as e:
            print(f"❌ Error adding multimodal reference: {e}")

    def _parse_cand_text_and_images(self, cand_text: str, cand_image_path_json: str) -> List[Dict[str, Any]]:
        """
        Parse cand_text and cand_image_path, establish step-screenshot correspondence
        
        Args:
            cand_text: Candidate text containing multiple Observation-Action pairs
            cand_image_path_json: JSON string of image paths
            
        Returns:
            List containing step information, each step includes observation, action and corresponding image path
        """
        try:
            import json5
            import json
            
            image_paths = []
            if isinstance(cand_image_path_json, str):
                try:
                    image_paths = json5.loads(cand_image_path_json)
                except:
                    try:
                        image_paths = json.loads(cand_image_path_json)
                    except json.JSONDecodeError:
                        try:
                            fixed_json = cand_image_path_json.replace("'", '"')
                            image_paths = json.loads(fixed_json)
                        except json.JSONDecodeError:
                            try:
                                image_paths = eval(cand_image_path_json)
                            except:
                                print(f"❌ Error parsing cand_image_path: {cand_image_path_json}")
                                return []
            elif isinstance(cand_image_path_json, list):
                image_paths = cand_image_path_json
            
            steps = []
            lines = cand_text.split('\n')
            current_observation = None
            current_action = None
            step_counter = 0
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                    
                if line.startswith('Observation'):
                    if current_observation and current_action:
                        steps.append({
                            'step_number': step_counter,
                            'observation': current_observation,
                            'action': current_action,
                            'image_path': image_paths[step_counter] if step_counter < len(image_paths) else None
                        })
                        step_counter += 1
                    
                    current_observation = line
                    current_action = None
                    
                elif line.startswith('Action'):
                    current_action = line
                    
                    if current_observation:
                        steps.append({
                            'step_number': step_counter,
                            'observation': current_observation,
                            'action': current_action,
                            'image_path': image_paths[step_counter] if step_counter < len(image_paths) else None
                        })
                        step_counter += 1
                        current_observation = None
                        current_action = None
            
            return steps
            
        except Exception as e:
            print(f"❌ Error parsing cand_text and images: {e}")
            return []

    def _format_multi_step_reference(self, retrieved_info: Dict) -> str:
        """
        Format multi-step reference information for DOM mode
        
        Args:
            retrieved_info: Retrieved information dictionary
            
        Returns:
            Formatted reference string for DOM mode
        """
        try:
            cand_text = retrieved_info.get('cand_text', '')
            cand_image_paths = retrieved_info.get('cand_image_path', '[]')
            task_description = retrieved_info.get('task_description', 'N/A')
            
            # Parse steps and corresponding screenshots
            steps = self._parse_cand_text_and_images(cand_text, cand_image_paths)
            
            if not steps:
                print("⚠️  No valid steps parsed from reference data")
                return f"\n**Task Description:** {task_description}\n**Note:** No valid reference steps available.\n"
            
            reference_content = f"\n**Task Description:** {task_description}\n**Step-by-step Visual-Action Sequence:**\n"
            
            for step in steps:
                reference_content += f"\n**Step {step['step_number'] + 1}:**\n"
                reference_content += f"- **Observation:** {step['observation']}\n"
                reference_content += f"- **Action:** {step['action']}\n"
                
                if step['image_path']:
                    image_path = step['image_path']
                    
                    # Try multiple possible paths
                    possible_paths = [
                        image_path,
                        f"data/Online-Mind2Web/rag_data/image/{image_path}",
                        f"data/Online-Mind2Web/{image_path}",
                        f"data/{image_path}"
                    ]
                    
                    if image_path.startswith('Online-Mind2Web/'):
                        clean_path = image_path.replace('Online-Mind2Web/', '', 1)
                        possible_paths.extend([
                            f"data/Online-Mind2Web/rag_data/image/{clean_path}",
                            f"data/Online-Mind2Web/{clean_path}",
                            f"data/{clean_path}"
                        ])
                    
                    found_image = False
                    for full_image_path in possible_paths:
                        try:
                            if os.path.exists(full_image_path):
                                reference_content += f"- **Screenshot Reference:** Available at {image_path}\n"
                                print(f"📸 Reference screenshot found for step {step['step_number'] + 1}: {full_image_path}")
                                found_image = True
                                break
                        except Exception as e:
                            continue
                    
                    if not found_image:
                        reference_content += f"- **Screenshot Reference:** Not found ({image_path})\n"
                        print(f"❌ Image not found for step {step['step_number'] + 1}")
                else:
                    reference_content += f"- **Screenshot Reference:** Not available\n"
                
                reference_content += "\n"
            
            # Add learning points specifically for DOM mode
            reference_content += """\n**Learning Points for DOM Actions:**
- **DOM Pattern Recognition:** Compare each reference observation with your current accessibility tree
- **Action Sequence Logic:** Understand the reasoning behind each DOM action step
- **Element Targeting:** Learn how to identify and interact with similar DOM elements using element_id
- **Progressive Task Completion:** Follow the step-by-step approach to reach the goal using DOM actions
- **Element ID Mapping:** Map elements between reference steps and current DOM tree

"""
            return reference_content
            
        except Exception as e:
            print(f"❌ Error formatting multi-step reference: {e}")
            import traceback
            print(f"Error details: {traceback.format_exc()}")
            return f"\n**Task Description:** {retrieved_info.get('task_description', 'N/A')}\n**Error:** Could not format reference steps.\n"
