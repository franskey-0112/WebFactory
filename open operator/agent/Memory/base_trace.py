import json
import os
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Dict, Optional
from urllib.parse import urlparse

from .long_memory.reference_trace import ReferenceTraceMemory
from .long_memory.website_knowledge import WebsiteKnowledgeMemory


def normalize_text(text: Optional[str]) -> str:
    if not text:
        return ""
    return " ".join(str(text).strip().split())


def extract_website_from_url(url: str) -> str:
    if not url:
        return ""
    try:
        parsed = urlparse(url)
        return parsed.netloc.lower()
    except Exception:
        return ""


@dataclass
class TaskTraceStep:
    task_id: str
    task_name: str
    website: str
    current_url: str
    step_idx: int
    thought: str
    action: str
    reflection: str = ""
    success: bool = True
    error: str = ""
    reward_score: Optional[float] = None
    reward_status: str = ""
    timestamp: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "task_id": self.task_id,
            "task_name": normalize_text(self.task_name),
            "website": normalize_text(self.website),
            "current_url": normalize_text(self.current_url),
            "step_idx": int(self.step_idx),
            "thought": normalize_text(self.thought),
            "action": normalize_text(self.action),
            "reflection": normalize_text(self.reflection),
            "success": bool(self.success),
            "error": normalize_text(self.error),
            "reward_score": self.reward_score,
            "reward_status": normalize_text(self.reward_status),
            "timestamp": self.timestamp or datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }


class LongMemoryManager:
    """
    Hierarchical long-term memory manager:
    1) Reference traces memory: retrieve historically similar trajectories.
    2) Website knowledge memory: retrieve site-level priors and failure patterns.
    """

    def __init__(
        self,
        enabled: bool = True,
        memory_dir: str = "memory_store",
        max_reference_items: int = 3,
    ) -> None:
        self.enabled = bool(enabled)
        self.memory_dir = memory_dir or "memory_store"
        self.max_reference_items = max(1, int(max_reference_items))
        self.reference_memory: Optional[ReferenceTraceMemory] = None
        self.website_memory: Optional[WebsiteKnowledgeMemory] = None

        if self.enabled:
            os.makedirs(self.memory_dir, exist_ok=True)
            self.reference_memory = ReferenceTraceMemory(memory_dir=self.memory_dir)
            self.website_memory = WebsiteKnowledgeMemory(memory_dir=self.memory_dir)

    def build_context(
        self,
        task_name: str,
        task_id: str = "",
        website: str = "",
        current_url: str = "",
    ) -> Dict[str, Any]:
        if not self.enabled or not self.reference_memory or not self.website_memory:
            return {
                "enabled": False,
                "website": website,
                "knowledge_summary": "",
                "reference_traces": [],
                "formatted_context": "",
            }

        website_key = website or extract_website_from_url(current_url)
        knowledge_summary = self.website_memory.get_site_summary(website_key)
        references = self.reference_memory.query_similar(
            task_name=task_name,
            website=website_key,
            current_url=current_url,
            top_k=self.max_reference_items,
            exclude_task_id=task_id,
        )

        formatted_context = self._format_context(
            website=website_key,
            knowledge_summary=knowledge_summary,
            references=references,
        )
        return {
            "enabled": True,
            "website": website_key,
            "knowledge_summary": knowledge_summary,
            "reference_traces": references,
            "formatted_context": formatted_context,
        }

    def record_step(
        self,
        task_id: str,
        task_name: str,
        step_idx: int,
        thought: str,
        action: Any,
        current_url: str = "",
        website: str = "",
        reflection: str = "",
        success: bool = True,
        error: str = "",
        reward: Optional[Dict[str, Any]] = None,
        status: str = "",
    ) -> None:
        if not self.enabled or not self.reference_memory or not self.website_memory:
            return

        website_key = website or extract_website_from_url(current_url)
        action_str = self._action_to_str(action)

        reward_score = None
        reward_status = ""
        if reward:
            try:
                reward_score = float(reward.get("score", 0))
            except Exception:
                reward_score = None
            reward_status = str(reward.get("status", ""))

        trace_step = TaskTraceStep(
            task_id=task_id or "",
            task_name=task_name or "",
            website=website_key,
            current_url=current_url or "",
            step_idx=step_idx,
            thought=thought or "",
            action=action_str,
            reflection=reflection or "",
            success=success,
            error=error or "",
            reward_score=reward_score,
            reward_status=reward_status,
        )
        trace_dict = trace_step.to_dict()
        self.reference_memory.add_trace(trace_dict)

        self.website_memory.update_with_step(
            website=website_key,
            task_name=task_name or "",
            current_url=current_url or "",
            action=action_str,
            success=success,
            error=error or "",
            reflection=reflection or "",
            reward_status=reward_status,
            status=status or "",
        )

    def finalize_task(
        self,
        task_id: str,
        task_name: str,
        website: str = "",
        current_url: str = "",
        final_status: str = "",
        completed: bool = False,
        total_steps: int = 0,
        total_reward_score: float = 0.0,
    ) -> None:
        if not self.enabled or not self.reference_memory or not self.website_memory:
            return

        website_key = website or extract_website_from_url(current_url)
        self.website_memory.record_task_outcome(
            website=website_key,
            task_id=task_id,
            task_name=task_name,
            final_status=final_status,
            completed=completed,
            total_steps=total_steps,
            total_reward_score=total_reward_score,
        )

    def _action_to_str(self, action: Any) -> str:
        if action is None:
            return ""
        if isinstance(action, str):
            return normalize_text(action)
        if isinstance(action, dict):
            action_name = str(action.get("action", action.get("action_type", "")))
            action_input = str(
                action.get("action_input", action.get("value", action.get("text", "")))
            )
            if not action_name:
                try:
                    return normalize_text(json.dumps(action, ensure_ascii=False))
                except Exception:
                    return normalize_text(str(action))
            return normalize_text(f"{action_name}: {action_input}")
        return normalize_text(str(action))

    def _format_context(
        self, website: str, knowledge_summary: str, references: list[Dict[str, Any]]
    ) -> str:
        sections = ["## Long-Term Memory Context"]
        if website:
            sections.append(f"Website: {website}")

        if knowledge_summary:
            sections.append("### Website Knowledge")
            sections.append(knowledge_summary)

        if references:
            sections.append("### Similar Historical Traces")
            for i, ref in enumerate(references, start=1):
                task_name = ref.get("task_name", "N/A")
                action = ref.get("action", "")
                thought = ref.get("thought", "")
                score = ref.get("score", 0.0)
                url = ref.get("current_url", "")
                sections.append(
                    f"{i}. task={task_name} | score={score:.3f} | action={action} | url={url} | thought={thought}"
                )
        else:
            sections.append("### Similar Historical Traces")
            sections.append("No reliable historical trace found for current context.")

        sections.append(
            "Guidance: use this memory as prior knowledge, but always ground actions on current page state."
        )
        return "\n".join(sections)


__all__ = [
    "TaskTraceStep",
    "LongMemoryManager",
    "normalize_text",
    "extract_website_from_url",
]
