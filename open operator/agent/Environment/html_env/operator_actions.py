"""
OpenAI Operator Actions System
Handles operations based on visual coordinates, unlike the DOM pattern
"""

import base64
import time
from typing import Dict, Any, Optional, Union
from dataclasses import dataclass
from enum import Enum
import json
from beartype import beartype
from sanic.log import logger
import asyncio


class OperatorActionType(str, Enum):
    """OpenAI Operator Action Type"""
    CLICK = "click"
    DOUBLE_CLICK = "double_click"
    TYPE = "type"
    SCROLL = "scroll"
    KEYPRESS = "keypress"
    DRAG = "drag"
    SCREENSHOT = "screenshot"
    WAIT = "wait"
    GET_FINAL_ANSWER = "get_final_answer"


@dataclass
class OperatorAction:
    """OpenAI Operator Action data structure"""
    type: OperatorActionType
    x: Optional[int] = None
    y: Optional[int] = None
    text: Optional[str] = None
    keys: Optional[list[str]] = None
    scroll_x: Optional[int] = None
    scroll_y: Optional[int] = None
    path: Optional[list[list[int]]] = None
    ms: Optional[int] = None
    button: Optional[str] = None  # add button field support (left, right, middle)
    
    def to_dict(self) -> Dict[str, Any]:
        action_dict = {"type": self.type.value}
        
        if self.x is not None:
            action_dict["x"] = self.x
        if self.y is not None:
            action_dict["y"] = self.y
        if self.text is not None:
            action_dict["text"] = self.text
        if self.keys is not None:
            action_dict["keys"] = self.keys
        if self.scroll_x is not None:
            action_dict["scroll_x"] = self.scroll_x
        if self.scroll_y is not None:
            action_dict["scroll_y"] = self.scroll_y
        if self.path is not None:
            action_dict["path"] = self.path
        if self.ms is not None:
            action_dict["ms"] = self.ms
        if self.button is not None:
            action_dict["button"] = self.button
            
        return action_dict


class OperatorActionFactory:
    """Create OpenAI Operator Action factory class"""
    @staticmethod
    @beartype
    def create_click_action(x: int, y: int, button: str = "left") -> OperatorAction:
        """创建点击操作，支持不同button类型"""
        return OperatorAction(type=OperatorActionType.CLICK, x=x, y=y, button=button)
    
    @staticmethod
    @beartype
    def create_double_click_action(x: int, y: int, button: str = "left") -> OperatorAction:
        """创建双击操作，支持不同button类型"""
        return OperatorAction(type=OperatorActionType.DOUBLE_CLICK, x=x, y=y, button=button)
    
    @staticmethod
    @beartype
    def create_type_action(text: str) -> OperatorAction:
        """创建文本输入操作"""
        return OperatorAction(type=OperatorActionType.TYPE, text=text)
    
    @staticmethod
    @beartype
    def create_scroll_action(scroll_x: int, scroll_y: int) -> OperatorAction:
        """创建滚动操作"""
        return OperatorAction(type=OperatorActionType.SCROLL, scroll_x=scroll_x, scroll_y=scroll_y)
    
    @staticmethod
    @beartype
    def create_keypress_action(keys: list[str]) -> OperatorAction:
        """创建按键操作"""
        return OperatorAction(type=OperatorActionType.KEYPRESS, keys=keys)
    
    @staticmethod
    @beartype
    def create_drag_action(path: list[list[int]]) -> OperatorAction:
        """创建拖拽操作"""
        return OperatorAction(type=OperatorActionType.DRAG, path=path)
    
    @staticmethod
    @beartype
    def create_screenshot_action() -> OperatorAction:
        """创建截图操作"""
        return OperatorAction(type=OperatorActionType.SCREENSHOT)
    
    @staticmethod
    @beartype
    def create_wait_action(ms: int = 1000) -> OperatorAction:
        """创建等待操作"""
        return OperatorAction(type=OperatorActionType.WAIT, ms=ms)

    @staticmethod
    @beartype
    def create_get_final_answer_action(answer: str = "") -> OperatorAction:
        """创建任务完成操作"""
        return OperatorAction(type=OperatorActionType.GET_FINAL_ANSWER, text=answer)


class OperatorActionExecutor:
    """OpenAI Operator Action executor"""
    
    # 按键映射
    KEY_MAP = {
        "ENTER": "Enter",
        "ESC": "Escape", 
        "SPACE": " ",
        "TAB": "Tab",
        "CTRL": "Control",
        "ALT": "Alt",
        "SHIFT": "Shift",
        "BACKSPACE": "Backspace"
    }
    
    def __init__(self, page):
        self.page = page
    
    async def execute_action(self, action: OperatorAction) -> None:
        """Execute OpenAI Operator Action"""
        try:
            action_dict = action.to_dict()
            await self._perform_action(action_dict)
        except Exception as e:
            logger.error(f"Error executing operator action {action.type}: {e}")
            raise
    
    async def _perform_action(self, action_dict: Dict[str, Any]) -> None:
        """执行具体的操作"""
        action_type = action_dict["type"]
        
        if action_type == "click":
            await self.page.mouse.click(action_dict["x"], action_dict["y"])
        elif action_type == "double_click":
            await self.page.mouse.dblclick(action_dict["x"], action_dict["y"])
        elif action_type == "scroll":
            # 使用相对滚动量，scroll_y正值向下滚动，负值向上滚动
            scroll_delta_x = action_dict.get("scroll_x", 0)
            scroll_delta_y = action_dict.get("scroll_y", 0)
            
            # 限制滚动量在合理范围内（-1000到1000像素）
            scroll_delta_x = max(-1000, min(1000, scroll_delta_x))
            scroll_delta_y = max(-1000, min(1000, scroll_delta_y))
            
            await self.page.mouse.wheel(scroll_delta_x, scroll_delta_y)
        elif action_type == "type":
            await self.page.keyboard.type(action_dict["text"])
        elif action_type == "keypress":
            for raw_key in action_dict["keys"]:
                key = self.KEY_MAP.get(raw_key.upper(), raw_key.title())
                await self.page.keyboard.press(key)
        elif action_type == "drag":
            path = action_dict["path"]
            await self.page.mouse.move(path[0][0], path[0][1])
            await self.page.mouse.down()
            await self.page.mouse.move(path[-1][0], path[-1][1])
            await self.page.mouse.up()
        elif action_type == "wait":
            wait_time = action_dict.get("ms", 1000) / 1000
            await asyncio.sleep(wait_time)
        elif action_type == "screenshot":
            pass
        elif action_type == "get_final_answer":
            # Task completion - no action needed, just log
            logger.info(f"🎯 Task completed with answer: {action_dict.get('text', '')}")
            pass
        
        # 对于大多数操作，等待网络空闲
        if action_type not in ("wait", "drag", "screenshot"):
            try:
                await self.page.wait_for_load_state("networkidle", timeout=5000)
            except Exception as e:
                logger.warning(f"Network idle timeout: {e}")


class OperatorResponseParser:
    """OpenAI Operator响应解析器"""
    
    @staticmethod
    def parse_operator_response(response_items: list[Any]) -> list[OperatorAction]:
        """
        解析OpenAI Operator响应，提取操作
        
        Args:
            response_items: OpenAI Operator响应项目列表
            
        Returns:
            操作列表
        """
        actions = []
        
        for item in response_items:
            if hasattr(item, 'action'):
                action_dict = item.action.model_dump()
                try:
                    action = OperatorResponseParser._dict_to_action(action_dict)
                    if action:
                        actions.append(action)
                except Exception as e:
                    logger.error(f"Error parsing operator action: {e}")
                    continue
        
        return actions
    
    @staticmethod
    def _dict_to_action(action_dict: Dict[str, Any]) -> Optional[OperatorAction]:
        """dict to OperatorAction"""
        action_type = action_dict.get("type")
        
        if action_type == "click":
            return OperatorActionFactory.create_click_action(
                action_dict["x"], action_dict["y"]
            )
        elif action_type == "double_click":
            return OperatorActionFactory.create_double_click_action(
                action_dict["x"], action_dict["y"]
            )
        elif action_type == "type":
            return OperatorActionFactory.create_type_action(action_dict["text"])
        elif action_type == "scroll":
            return OperatorActionFactory.create_scroll_action(
                action_dict["scroll_x"], action_dict["scroll_y"]
            )
        elif action_type == "keypress":
            return OperatorActionFactory.create_keypress_action(action_dict["keys"])
        elif action_type == "drag":
            return OperatorActionFactory.create_drag_action(action_dict["path"])
        elif action_type == "wait":
            return OperatorActionFactory.create_wait_action(action_dict.get("ms", 1000))
        elif action_type == "screenshot":
            return OperatorActionFactory.create_screenshot_action()
        elif action_type == "get_final_answer":
            return OperatorActionFactory.create_get_final_answer_action(action_dict.get("text", ""))
        
        return None 