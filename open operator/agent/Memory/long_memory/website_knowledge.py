import json
import os
import re
from collections import Counter
from datetime import datetime
from typing import Any, Dict, List
from urllib.parse import urlparse


def _normalize_text(text: str) -> str:
    if not text:
        return ""
    return " ".join(str(text).strip().lower().split())


def _extract_website(website: str, current_url: str = "") -> str:
    website = _normalize_text(website)
    if website:
        return website
    if not current_url:
        return "unknown_site"
    try:
        parsed = urlparse(current_url)
        return parsed.netloc.lower() or "unknown_site"
    except Exception:
        return "unknown_site"


def _clip(text: str, max_len: int = 120) -> str:
    text = _normalize_text(text)
    if len(text) <= max_len:
        return text
    return text[: max_len - 3] + "..."


class WebsiteKnowledgeMemory:
    """
    Persistent website-level knowledge memory.
    Storage format: JSON
    """

    def __init__(
        self,
        memory_dir: str = "memory_store",
        knowledge_filename: str = "website_knowledge.json",
        max_recent_steps_per_site: int = 200,
        max_error_patterns_per_site: int = 50,
    ) -> None:
        self.memory_dir = memory_dir or "memory_store"
        self.knowledge_path = os.path.join(self.memory_dir, knowledge_filename)
        self.max_recent_steps_per_site = max(20, int(max_recent_steps_per_site))
        self.max_error_patterns_per_site = max(10, int(max_error_patterns_per_site))

        self._data: Dict[str, Any] = {"sites": {}}
        self._loaded = False

        os.makedirs(self.memory_dir, exist_ok=True)
        if not os.path.exists(self.knowledge_path):
            self._save()

    def update_with_step(
        self,
        website: str,
        task_name: str,
        current_url: str,
        action: str,
        success: bool,
        error: str = "",
        reflection: str = "",
        reward_status: str = "",
        status: str = "",
    ) -> None:
        self._load()

        website_key = _extract_website(website, current_url=current_url)
        site_record = self._ensure_site_record(website_key)

        action_key = self._normalize_action(action)
        action_stats = site_record["action_stats"].setdefault(
            action_key,
            {
                "total": 0,
                "success": 0,
                "failure": 0,
                "last_seen": "",
                "recent_errors": [],
            },
        )
        action_stats["total"] += 1
        if success:
            action_stats["success"] += 1
        else:
            action_stats["failure"] += 1
        action_stats["last_seen"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        if not success and error:
            err = _clip(error, 200)
            action_stats["recent_errors"].append(err)
            action_stats["recent_errors"] = action_stats["recent_errors"][-10:]

            error_counter = site_record["error_patterns"]
            error_counter[err] = int(error_counter.get(err, 0)) + 1

            if len(error_counter) > self.max_error_patterns_per_site:
                sorted_errors = sorted(
                    error_counter.items(), key=lambda x: x[1], reverse=True
                )[: self.max_error_patterns_per_site]
                site_record["error_patterns"] = {k: v for k, v in sorted_errors}

        site_record["recent_steps"].append(
            {
                "task_name": _clip(task_name, 180),
                "current_url": _clip(current_url, 200),
                "action": action_key,
                "success": bool(success),
                "error": _clip(error, 200),
                "reflection": _clip(reflection, 220),
                "reward_status": _clip(reward_status, 80),
                "status": _clip(status, 120),
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
        )
        site_record["recent_steps"] = site_record["recent_steps"][
            -self.max_recent_steps_per_site :
        ]
        site_record["last_updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        self._save()

    def record_task_outcome(
        self,
        website: str,
        task_id: str,
        task_name: str,
        final_status: str,
        completed: bool,
        total_steps: int,
        total_reward_score: float,
    ) -> None:
        self._load()

        website_key = _extract_website(website, "")
        site_record = self._ensure_site_record(website_key)
        task_stats = site_record["task_stats"]

        task_stats["total_tasks"] += 1
        if completed:
            task_stats["completed_tasks"] += 1
        task_stats["total_steps"] += max(0, int(total_steps))
        task_stats["total_reward"] += float(total_reward_score or 0.0)
        task_stats["last_status"] = _clip(final_status, 100)
        task_stats["last_task_id"] = _clip(task_id, 80)
        task_stats["last_task_name"] = _clip(task_name, 180)
        task_stats["last_updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        site_record["recent_tasks"].append(
            {
                "task_id": _clip(task_id, 80),
                "task_name": _clip(task_name, 180),
                "completed": bool(completed),
                "final_status": _clip(final_status, 100),
                "total_steps": int(total_steps or 0),
                "total_reward_score": float(total_reward_score or 0.0),
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
        )
        site_record["recent_tasks"] = site_record["recent_tasks"][-100:]
        site_record["last_updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        self._save()

    def get_site_summary(self, website: str) -> str:
        self._load()
        website_key = _extract_website(website, "")
        site_record = self._data.get("sites", {}).get(website_key)
        if not site_record:
            return ""

        task_stats = site_record.get("task_stats", {})
        total_tasks = int(task_stats.get("total_tasks", 0))
        completed_tasks = int(task_stats.get("completed_tasks", 0))
        total_steps = int(task_stats.get("total_steps", 0))
        total_reward = float(task_stats.get("total_reward", 0.0))

        completion_rate = (completed_tasks / total_tasks) if total_tasks > 0 else 0.0
        avg_steps = (total_steps / total_tasks) if total_tasks > 0 else 0.0
        avg_reward = (total_reward / total_tasks) if total_tasks > 0 else 0.0

        lines: List[str] = []
        lines.append(
            f"Site stats: tasks={total_tasks}, completion_rate={completion_rate:.2f}, avg_steps={avg_steps:.2f}, avg_reward={avg_reward:.2f}."
        )

        action_stats = site_record.get("action_stats", {})
        if action_stats:
            ranked_actions = sorted(
                action_stats.items(), key=lambda x: x[1].get("total", 0), reverse=True
            )[:5]
            action_segments = []
            for action_name, stats in ranked_actions:
                total = max(1, int(stats.get("total", 0)))
                success_rate = float(stats.get("success", 0)) / total
                action_segments.append(
                    f"{action_name}(count={total}, success_rate={success_rate:.2f})"
                )
            lines.append("Frequent actions: " + "; ".join(action_segments) + ".")

        error_patterns = site_record.get("error_patterns", {})
        if error_patterns:
            top_errors = sorted(error_patterns.items(), key=lambda x: x[1], reverse=True)[
                :3
            ]
            lines.append(
                "Common failures: "
                + "; ".join([f"{err} (x{cnt})" for err, cnt in top_errors])
                + "."
            )

        suggestions = self._build_strategy_suggestions(site_record)
        if suggestions:
            lines.append("Strategy hints: " + " ".join(suggestions))

        return " ".join(lines)

    def _build_strategy_suggestions(self, site_record: Dict[str, Any]) -> List[str]:
        suggestions: List[str] = []
        recent_steps = site_record.get("recent_steps", [])[-30:]
        if not recent_steps:
            return suggestions

        failed_steps = [s for s in recent_steps if not bool(s.get("success", True))]
        failed_ratio = (len(failed_steps) / len(recent_steps)) if recent_steps else 0.0
        if failed_ratio > 0.35:
            suggestions.append(
                "Recent failure ratio is high; prefer conservative actions and re-check element anchors before clicking."
            )

        action_counter = Counter([s.get("action", "") for s in recent_steps])
        if action_counter:
            top_action, top_count = action_counter.most_common(1)[0]
            if top_action and top_count >= 8:
                suggestions.append(
                    f"Action '{top_action}' appears frequently; avoid repeating it blindly when page state does not change."
                )

        error_texts = [s.get("error", "") for s in failed_steps if s.get("error")]
        if error_texts:
            auth_related = any(
                re.search(r"login|signin|captcha|verify|permission|forbidden", e)
                for e in error_texts
            )
            if auth_related:
                suggestions.append(
                    "Authentication/permission failures observed; detect login or verification state before continuing."
                )

        return suggestions[:3]

    def _normalize_action(self, action: str) -> str:
        text = _normalize_text(action)
        if not text:
            return "unknown_action"
        if ":" in text:
            return text.split(":", 1)[0].strip()
        return text

    def _ensure_site_record(self, website_key: str) -> Dict[str, Any]:
        sites = self._data.setdefault("sites", {})
        if website_key not in sites:
            sites[website_key] = {
                "website": website_key,
                "task_stats": {
                    "total_tasks": 0,
                    "completed_tasks": 0,
                    "total_steps": 0,
                    "total_reward": 0.0,
                    "last_status": "",
                    "last_task_id": "",
                    "last_task_name": "",
                    "last_updated": "",
                },
                "action_stats": {},
                "error_patterns": {},
                "recent_steps": [],
                "recent_tasks": [],
                "last_updated": "",
            }
        return sites[website_key]

    def _load(self) -> None:
        if self._loaded:
            return
        if not os.path.exists(self.knowledge_path):
            self._loaded = True
            return

        try:
            with open(self.knowledge_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict):
                self._data = data
        except Exception:
            self._data = {"sites": {}}
        self._loaded = True

    def _save(self) -> None:
        with open(self.knowledge_path, "w", encoding="utf-8") as f:
            json.dump(self._data, f, ensure_ascii=False, indent=2)


__all__ = ["WebsiteKnowledgeMemory"]
