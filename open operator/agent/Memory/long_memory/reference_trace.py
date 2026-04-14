import json
import os
import re
from datetime import datetime
from typing import Any, Dict, List
from urllib.parse import urlparse


def _normalize_text(text: str) -> str:
    if not text:
        return ""
    return " ".join(str(text).strip().lower().split())


def _tokenize(text: str) -> set:
    return set(re.findall(r"[a-z0-9]+", _normalize_text(text)))


def _url_tokens(url: str) -> set:
    if not url:
        return set()
    try:
        parsed = urlparse(url)
        merged = " ".join([parsed.netloc, parsed.path, parsed.query])
        return _tokenize(merged)
    except Exception:
        return _tokenize(url)


def _jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    inter = len(a.intersection(b))
    union = len(a.union(b))
    if union == 0:
        return 0.0
    return inter / union


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except Exception:
        return default


def _parse_time(ts: str) -> datetime:
    if not ts:
        return datetime.min
    patterns = [
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%dT%H:%M:%S.%f",
    ]
    for pattern in patterns:
        try:
            return datetime.strptime(ts, pattern)
        except Exception:
            continue
    return datetime.min


class ReferenceTraceMemory:
    """
    Persistent step-level trace memory.
    Storage format: JSONL, one trajectory step per line.
    """

    def __init__(
        self,
        memory_dir: str = "memory_store",
        trace_filename: str = "reference_traces.jsonl",
        max_records: int = 20000,
    ) -> None:
        self.memory_dir = memory_dir or "memory_store"
        self.trace_path = os.path.join(self.memory_dir, trace_filename)
        self.max_records = max(100, int(max_records))
        self._records: List[Dict[str, Any]] = []
        self._loaded = False

        os.makedirs(self.memory_dir, exist_ok=True)
        if not os.path.exists(self.trace_path):
            with open(self.trace_path, "w", encoding="utf-8"):
                pass

    def add_trace(self, trace: Dict[str, Any]) -> None:
        if not isinstance(trace, dict):
            return
        record = self._sanitize_trace(trace)
        self._load_records()
        self._records.append(record)

        with open(self.trace_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

        if len(self._records) > self.max_records:
            self._records = self._records[-self.max_records :]
            self._rewrite_store()

    def query_similar(
        self,
        task_name: str,
        website: str = "",
        current_url: str = "",
        top_k: int = 3,
        exclude_task_id: str = "",
    ) -> List[Dict[str, Any]]:
        self._load_records()
        if not self._records:
            return []

        top_k = max(1, int(top_k))
        query_task_tokens = _tokenize(task_name)
        query_url_tokens = _url_tokens(current_url)
        website = _normalize_text(website)

        candidates = []
        for record in self._records:
            if exclude_task_id and record.get("task_id") == exclude_task_id:
                continue

            task_sim = _jaccard(query_task_tokens, _tokenize(record.get("task_name", "")))
            url_sim = _jaccard(query_url_tokens, _url_tokens(record.get("current_url", "")))

            website_score = 0.0
            if website:
                if _normalize_text(record.get("website", "")) == website:
                    website_score = 1.0
                elif website in _normalize_text(record.get("current_url", "")):
                    website_score = 0.5

            success_bonus = 0.15 if bool(record.get("success", True)) else -0.1
            reward_score = _safe_float(record.get("reward_score"), 0.0)
            reward_bonus = max(0.0, min(reward_score / 10.0, 1.0)) * 0.1
            recency_bonus = self._calc_recency_bonus(record.get("timestamp", ""))

            final_score = (
                0.45 * task_sim
                + 0.25 * website_score
                + 0.15 * url_sim
                + success_bonus
                + reward_bonus
                + recency_bonus
            )

            if final_score <= 0:
                continue

            candidate = dict(record)
            candidate["score"] = round(final_score, 4)
            candidates.append(candidate)

        if not candidates:
            return []

        candidates.sort(key=lambda x: x.get("score", 0.0), reverse=True)
        return candidates[:top_k]

    def _sanitize_trace(self, trace: Dict[str, Any]) -> Dict[str, Any]:
        sanitized = {
            "task_id": str(trace.get("task_id", "")).strip(),
            "task_name": _normalize_text(str(trace.get("task_name", ""))),
            "website": _normalize_text(str(trace.get("website", ""))),
            "current_url": str(trace.get("current_url", "")).strip(),
            "step_idx": int(_safe_float(trace.get("step_idx", 0), 0)),
            "thought": _normalize_text(str(trace.get("thought", ""))),
            "action": _normalize_text(str(trace.get("action", ""))),
            "reflection": _normalize_text(str(trace.get("reflection", ""))),
            "success": bool(trace.get("success", True)),
            "error": _normalize_text(str(trace.get("error", ""))),
            "reward_score": trace.get("reward_score"),
            "reward_status": _normalize_text(str(trace.get("reward_status", ""))),
            "timestamp": str(trace.get("timestamp", "")).strip()
            or datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }

        if not sanitized["website"]:
            sanitized["website"] = self._extract_website(sanitized["current_url"])
        return sanitized

    def _extract_website(self, url: str) -> str:
        try:
            return urlparse(url).netloc.lower()
        except Exception:
            return ""

    def _calc_recency_bonus(self, timestamp: str) -> float:
        dt = _parse_time(timestamp)
        if dt == datetime.min:
            return 0.0
        delta_days = max(0.0, (datetime.now() - dt).total_seconds() / 86400.0)
        if delta_days <= 1:
            return 0.08
        if delta_days <= 7:
            return 0.05
        if delta_days <= 30:
            return 0.02
        return 0.0

    def _load_records(self) -> None:
        if self._loaded:
            return
        self._records = []
        if not os.path.exists(self.trace_path):
            self._loaded = True
            return

        with open(self.trace_path, "r", encoding="utf-8") as f:
            for line in f:
                raw = line.strip()
                if not raw:
                    continue
                try:
                    data = json.loads(raw)
                    if isinstance(data, dict):
                        self._records.append(data)
                except Exception:
                    continue

        if len(self._records) > self.max_records:
            self._records = self._records[-self.max_records :]
            self._rewrite_store()
        self._loaded = True

    def _rewrite_store(self) -> None:
        with open(self.trace_path, "w", encoding="utf-8") as f:
            for record in self._records:
                f.write(json.dumps(record, ensure_ascii=False) + "\n")


__all__ = ["ReferenceTraceMemory"]
