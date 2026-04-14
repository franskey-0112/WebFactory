# open operator

The **open operator** framework is the browser-agent engine behind the [WebFactory](https://arxiv.org/abs/2603.05044) paper. It supports two complementary observation modes — DOM-tree parsing and OpenAI's Computer Use visual operator — and provides the full pipeline for LLM-driven browser automation: environment management, action execution, memory/RAG, reward evaluation, and task-completion management.

## Key Features

### 🎯 Observation
- **DOM mode**: parses the page's accessibility tree into a structured representation for text-based LLMs.
- **Operator mode**: uses OpenAI `computer-use-preview` to observe the live browser as a screenshot and issue pixel-coordinate actions — no DOM parsing required.
- **Hybrid modes**: `dom_v_desc`, `vision_to_dom`, `d_v` — combine both signals for richer grounding.

### 🔧 Action
- Supports `click`, `double_click`, `type`, `scroll`, `keypress`, `drag`, `wait`, `get_final_answer`, and more.
- Coordinates are grounded to the real browser viewport via Playwright.
- Fully compatible with the OpenAI Responses API (`client.responses.create`).

### 🧠 Memory / RAG
- **Description RAG**: retrieves similar past trajectories by text description similarity.
- **Vision RAG**: retrieves by visual screenshot embedding (VLM2Vec / Qwen2-VL-based model).
- Configurable via `--rag_mode` (`description`, `vision_rag`, or `none`).
- Trajectories are stored and indexed as a reusable offline cache (`--rag_cache_dir`).

### 🏆 Reward & Task Completion
- Decomposed reward: `Rt = α * Rf + β * Raccuracy` (format + accuracy).
- `TaskCompletionManager` unifies loop detection, step-limit enforcement, low-performance termination, and GPT-4o end-judge integration.
- `ConfirmationLoopDetector` catches repetitive confirmation dialogs that stall progress.

### 🤖 Multi-LLM Support
The framework can drive browsers with any of the following backends:
| Provider | Models |
|---|---|
| OpenAI | `computer-use-preview-2025-03-11`, `gpt-4o`, `gpt-4.1`, `o3-mini`, `o4-mini` |
| Anthropic | Claude 3 / 3.5 series |
| Google | Gemini 1.5 / 2.0 series |
| Together AI | Open-source models via Together API |


## Run

### Setting Up the Environment

First, ensure your environment is ready by installing the necessary dependencies:

```bash 
conda create -n webragent python=3.11
conda activate webragent
pip install -r requirements.txt
```

Before running the repos, you need to set up the required API keys as using features dependent on external APIs. Please refer to this [docs](agent/LLM/README.md).

Also, you need to install the Node.js dependencies:

```bash
npm init -y
npm install axios
```
Then you need to set the google search api key and custom search engine id to perform google search action, for **Google blocked GUI agent based search lately**.

```bash
export GOOGLE_API_KEY=your_api_key
export GOOGLE_CX=your_custom_search_engine_id
```

See [How to set up google search](https://developers.google.com/custom-search/v1/overview?hl=zh-cn) for more details.

OPEN_AI api setting
```bash
export OPENAI_API_KEY=your_api_key
```

Tips: To run in a Linux environment without a visual interface, use the following command to start:

```bash
    sudo yum install -y xorg-x11-server-Xvfb
```
Ubantu/Debian users can use the following command to install xvfb:
```bash    
    sudo apt-get update
    sudo apt-get install -y xvfb
```
You'll also need to install chromium
```bash
python -m playwright install chromium
```

### 🚀 Flow of execution
See "configs/setting.toml" and "batch_eval_op.py" for parameter Settings for evaluation.

Set the log path in "log.py"

**Start evaluation：**

**DOM Mode**
```bash
xvfb-run -a python batch_eval.py
```
**Operator Mode**
```bash
xvfb-run -a python batch_eval_op.py
```

#### tips: In batch_eval_op.py, use the rag_mode parameter to set the RAG mode ('description', 'vision', or 'none').


### 🔍 Evaluate data processing 
After getting the evaluation data set, use "utils/parser.py" to parse the log log file to get the json parsed file

Please set the parameters for the json file parsing step in "configs/log_config.json"

And then run the program

**DOM mode**
```bash
python utils/parser.py
python utils/dataset_process.py
```

**Operator mode**
```bash
python utils/operator_parser.py
python utils/operator_dataset_process.py --results_dir results_dir/ --output_dir dataset_dir/
```



The directory of the processed data set is：
```bash
results/
- task_id
-- trajectory
--- step_0_20250520-000604.png
--- step_2_20250520-000604.png
  ...
-- result.json
```

### 📋 Online-Mind2Web Benchmarking
Run the following command to generate the benchmark file:
```bash
bash OM2W_Benchmarking/eval.sh
```

Display evaluation results:
```bash
python OM2W_Benchmarking/statistic.py 
```

## TODO
- ✅ Webpage retry mechanism
- ✅ Intelligent page wait strategy
- ✅ Screenshot deduplication mechanism
- ✅ Duplicate action detection and recovery
- ✅ Optimized operation execution logic
- ✅ Comprehensive test suite