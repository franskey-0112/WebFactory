import math
import re
from typing import Any, Dict, List, Tuple


def _normalize(text: str) -> str:
    if not text:
        return ""
    return " ".join(str(text).strip().lower().split())


def _tokenize(text: str) -> set:
    return set(re.findall(r"[a-z0-9]+", _normalize(text)))


def _jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    inter = len(a.intersection(b))
    union = len(a.union(b))
    if union == 0:
        return 0.0
    return inter / union


class VisionDOMMapper:
    """
    Vision-to-DOM mapper for operator actions.
    It aligns visual-coordinate actions with interactive DOM nodes.
    """

    def __init__(self, min_confidence: float = 0.35) -> None:
        self.min_confidence = float(min_confidence)

    def map_action(
        self,
        action: Dict[str, Any],
        dom_elements: List[Dict[str, Any]],
        thought: str = "",
        task_name: str = "",
    ) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        action_type = str(action.get("action", ""))
        if action_type not in {"operator_click", "operator_double_click"}:
            return action, {"mapped": False, "reason": "action_not_supported"}

        if not dom_elements:
            return action, {"mapped": False, "reason": "empty_dom_elements"}

        coords = action.get("coordinates", [640, 360])
        if not isinstance(coords, list) or len(coords) != 2:
            return action, {"mapped": False, "reason": "invalid_coordinates"}

        x, y = self._safe_int(coords[0], 640), self._safe_int(coords[1], 360)
        query_tokens = _tokenize(f"{thought} {task_name} {action.get('action_input', '')}")

        best_elem = None
        best_score = -1.0

        for elem in dom_elements:
            score = self._score_element(x, y, elem, query_tokens)
            if score > best_score:
                best_score = score
                best_elem = elem

        if not best_elem or best_score < self.min_confidence:
            return action, {
                "mapped": False,
                "reason": "low_confidence",
                "best_score": round(best_score, 4),
            }

        rect = best_elem.get("rect", {})
        cx = self._safe_int(rect.get("center_x"), x)
        cy = self._safe_int(rect.get("center_y"), y)

        mapped_action = dict(action)
        mapped_action["coordinates"] = [cx, cy]
        mapped_action["action_input"] = f"{cx},{cy}"
        mapped_action["element_id"] = (
            best_elem.get("dom_id")
            or best_elem.get("name")
            or best_elem.get("aria_label")
            or best_elem.get("text")
            or action.get("element_id", "mapped_dom")
        )
        mapped_action["dom_target"] = {
            "tag": best_elem.get("tag", ""),
            "role": best_elem.get("role", ""),
            "text": best_elem.get("text", ""),
            "aria_label": best_elem.get("aria_label", ""),
            "rect": rect,
        }
        mapped_action["mapping_confidence"] = round(best_score, 4)

        return mapped_action, {
            "mapped": True,
            "best_score": round(best_score, 4),
            "target_tag": best_elem.get("tag", ""),
            "target_text": best_elem.get("text", ""),
            "target_role": best_elem.get("role", ""),
            "target_rect": rect,
        }

    def _score_element(
        self, click_x: int, click_y: int, elem: Dict[str, Any], query_tokens: set
    ) -> float:
        rect = elem.get("rect", {})
        left = float(rect.get("x", 0))
        top = float(rect.get("y", 0))
        width = max(1.0, float(rect.get("width", 1)))
        height = max(1.0, float(rect.get("height", 1)))
        cx = float(rect.get("center_x", left + width / 2))
        cy = float(rect.get("center_y", top + height / 2))

        in_box = left <= click_x <= (left + width) and top <= click_y <= (top + height)
        dist = math.hypot(click_x - cx, click_y - cy)
        diag = math.hypot(width, height)
        if in_box:
            coord_score = max(0.0, 1.0 - dist / max(20.0, diag))
        else:
            coord_score = math.exp(-dist / 280.0)

        elem_text = " ".join(
            [
                str(elem.get("text", "")),
                str(elem.get("aria_label", "")),
                str(elem.get("placeholder", "")),
                str(elem.get("name", "")),
                str(elem.get("role", "")),
                str(elem.get("tag", "")),
            ]
        )
        text_score = _jaccard(query_tokens, _tokenize(elem_text))

        role = _normalize(str(elem.get("role", "")))
        tag = _normalize(str(elem.get("tag", "")))
        clickable_bonus = 0.0
        if role in {"button", "link", "menuitem", "tab", "checkbox", "option"}:
            clickable_bonus = 0.15
        elif tag in {"button", "a", "input", "textarea", "select"}:
            clickable_bonus = 0.1

        visibility_bonus = 0.0
        if width * height > 600:
            visibility_bonus = 0.05

        return (
            0.68 * coord_score
            + 0.22 * text_score
            + clickable_bonus
            + visibility_bonus
        )

    def _safe_int(self, value: Any, default: int) -> int:
        try:
            return int(float(value))
        except Exception:
            return default


__all__ = ["VisionDOMMapper"]
