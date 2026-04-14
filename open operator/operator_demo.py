#!/usr/bin/env python3
"""
Computer‑Use demo (resilient version)
    run: python operator_demo.py   --task "Search for 2025 AI tools news and click on the first OpenAI results"   --out-dir ./cua_test/cua_images   --json-out ./cua_test/cua_trace.json
"""

import os, sys, json, time, base64, argparse, openai
from pathlib import Path
from playwright.sync_api import sync_playwright, Error as PWError
from openai.types.responses import ResponseComputerToolCall, ResponseOutputMessage

# ---------- CLI ----------
cli = argparse.ArgumentParser()
cli.add_argument("--task", required=True, help="Task instruction for the browser automation agent")
cli.add_argument("--out-dir",  default="screens")
cli.add_argument("--json-out", default="operator_trace.json")
args = cli.parse_args()

DIR_IMG  = Path(args.out_dir).expanduser(); DIR_IMG.mkdir(parents=True, exist_ok=True)
FILE_JSON = Path(args.json_out).expanduser()
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
b64 = lambda x: base64.b64encode(x).decode()

# ---------- helpers ----------
def safe_scroll_top(page):
    """滚到顶；若因导航导致上下文丢失，则隐式等待新上下文后重试一次"""
    for _ in range(2):                 # 最多重试一次
        try:
            page.evaluate_handle("() => window.scrollTo(0,0)")
            return
        except PWError as e:
            if "Execution context was destroyed" in str(e):
                page.wait_for_load_state("load")
                continue
            raise

def snap(page, idx):
    safe_scroll_top(page)
    fp = DIR_IMG / f"step_{idx:03d}.png"
    data = page.screenshot(path=str(fp), full_page=False, type="png")
    print(f"[+] screenshot → {fp}")
    return b64(data)

KEY_MAP = {"ENTER":"Enter","ESC":"Escape","SPACE":" ","TAB":"Tab","CTRL":"Control",
           "ALT":"Alt","SHIFT":"Shift","BACKSPACE":"Backspace"}

def perform(page, act):
    t = act["type"]
    if t == "click": page.mouse.click(act["x"], act["y"])
    elif t == "double_click": page.mouse.dblclick(act["x"], act["y"])
    elif t == "scroll": page.mouse.wheel(act["scroll_x"], act["scroll_y"])
    elif t == "type": page.keyboard.type(act["text"])
    elif t == "keypress":
        for raw in act["keys"]:
            page.keyboard.press(KEY_MAP.get(raw.upper(), raw.title()))
    elif t == "drag":
        p=act["path"]; page.mouse.move(*p[0]); page.mouse.down(); page.mouse.move(*p[-1]); page.mouse.up()
    elif t == "wait": time.sleep(act.get("ms",1_000)/1_000)
    if t not in ("wait","drag"): page.wait_for_load_state("networkidle")

def tool_spec(page):
    w, h = page.viewport_size.values()
    return [{"type":"computer_use_preview",
             "display_width":w,"display_height":h,"environment":"browser"}]

# ---------- main loop ----------
trace, answer = [], None
with sync_playwright() as pw:
    br = pw.chromium.launch(headless=True, slow_mo=50)
    pg = br.new_page(viewport={"width":1280,"height":800}); pg.goto("https://bing.com")

    hist, last_id, step = [{"role":"user","content":args.task}], None, 0
    while True:
        resp = client.responses.create(model="computer-use-preview",
                                       tools=tool_spec(pg),
                                       input=hist, previous_response_id=last_id,
                                       truncation="auto")
        last_id = resp.id
        trace.append({"response_id":resp.id,
                      "items":[o.model_dump(exclude_unset=True) for o in resp.output]})

        for itm in resp.output:
            if isinstance(itm, ResponseComputerToolCall):
                a = itm.action.model_dump()
                if a["type"] != "screenshot":
                    perform(pg, a)
                step += 1
                img = snap(pg, step)
                hist.append({"type":"computer_call_output","call_id":itm.call_id,
                             "acknowledged_safety_checks":itm.pending_safety_checks,
                             "output":{"type":"input_image",
                                       "image_url":f"data:image/png;base64,{img}",
                                       "current_url":pg.url}})
            elif isinstance(itm, ResponseOutputMessage):
                answer = "".join(c.text for c in itm.content)
                print("\n=== 模型回答 ===\n", answer or "[空文本]")
                br.close(); break
            elif getattr(itm,"type",None)=="reasoning":
                continue
            else:
                hist.append(itm.model_dump(exclude_unset=True))
        if answer is not None: break

json.dump({"task":args.task,"trace":trace,"final_answer":answer},
          FILE_JSON.open("w",encoding="utf-8"),
          ensure_ascii=False, indent=2)
print(f"[✓] Trace saved to {FILE_JSON}")
if not answer:
    print("[!] Warning: final_answer is empty")