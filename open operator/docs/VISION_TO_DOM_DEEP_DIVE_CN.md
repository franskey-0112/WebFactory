# Vision-to-DOM 深度解析（实现机制、作用与适用场景）

## 1. 为什么需要 Vision-to-DOM

在 Operator 模式下，模型常先给出“视觉坐标动作”（例如点击 `(x, y)`）。  
纯坐标策略在复杂网页里有典型问题：

1. 页面动态变化（弹窗、广告、懒加载）导致同一坐标语义变化
2. 分辨率/滚动位置变化导致点击偏移
3. 视觉模型能“看对目标”，但落点不稳定

Vision-to-DOM 的目标是：把“点某个像素”转换为“点某个 DOM 语义元素”，提升动作稳定性。

---

## 2. 在主链路中的位置

在 `eval_op.py` 的每一步里，动作执行流程是：

1. 模型规划动作（通常先得到坐标）
2. `validate_and_sanitize_action` 做动作合法性清洗
3. `apply_vision_to_dom_mapping` 做 Vision-to-DOM 对齐
4. 执行映射后的动作

关键代码：

- 映射调用：`eval_op.py:631-638`
- 映射结果日志：`eval_op.py:639-644`
- 执行动作：`eval_op.py:647`
- 映射信息落轨迹：`eval_op.py:665-667`

---

## 3. 输入与输出数据形态

## 3.1 输入动作（来自规划模块）

在 `OperatorMode._convert_operator_action` 中，OpenAI Operator 的 `click/double_click` 会被统一转成：

- `action`: `operator_click` 或 `operator_double_click`
- `coordinates`: `[x, y]`
- `action_input`: `"x,y"`
- `element_id`: 初始为坐标占位 id

代码位置：`agent/Plan/planning.py:1051-1087`

## 3.2 DOM 候选元素

`OperatorEnvironment.get_interactive_elements()` 返回当前视口内可交互候选，每个候选包含：

- 语义字段：`tag/role/text/aria_label/placeholder/name/dom_id`
- 几何字段：`rect.x/y/width/height/center_x/center_y`

代码位置：`agent/Environment/html_env/operator_env.py:365-436`

## 3.3 输出动作

若映射成功，动作会被重写为：

- `coordinates` 替换为目标元素中心点
- `action_input` 同步为新坐标
- `element_id` 改为更有语义的 DOM 锚点（`dom_id/name/aria/text`）
- 增加 `dom_target`（目标元素语义与几何信息）
- 增加 `mapping_confidence`

代码位置：`agent/Plan/vision_dom_mapper.py:76-94`

---

## 4. 核心实现：VisionDOMMapper

实现类：`VisionDOMMapper`  
代码位置：`agent/Plan/vision_dom_mapper.py:26-161`

## 4.1 仅映射点击类动作

`map_action(...)` 只处理：

- `operator_click`
- `operator_double_click`

其他动作（如 `type/scroll/wait`）直接跳过映射。  
代码位置：`agent/Plan/vision_dom_mapper.py:42-45`

## 4.2 候选打分函数

对每个 DOM 候选算综合分：

`score = 0.68 * coord_score + 0.22 * text_score + clickable_bonus + visibility_bonus`

代码位置：`agent/Plan/vision_dom_mapper.py:147-152`

各分项含义：

1. `coord_score`（空间贴近度，主导）
- 若点击点落在候选框内：按到中心距离线性衰减
- 若落在框外：按距离指数衰减
- 代码：`vision_dom_mapper.py:115-122`

2. `text_score`（语义贴近度）
- 将 `thought + task_name + action_input` 分词成 query token
- 与候选元素文本特征做 Jaccard
- 代码：`vision_dom_mapper.py:54, 123-134`

3. `clickable_bonus`（可点击先验）
- `role` 在 `button/link/menuitem/...` 时加分更高
- `tag` 在 `button/a/input/...` 时加分
- 代码：`vision_dom_mapper.py:135-142`

4. `visibility_bonus`（显著可见度）
- 面积较大的元素加小额分
- 代码：`vision_dom_mapper.py:143-145`

## 4.3 阈值决策

- 默认 `min_confidence = 0.35`
- 若最佳候选分数低于阈值，则不改写动作（返回 `mapped=False`）

代码位置：`agent/Plan/vision_dom_mapper.py:32-33, 65-70`

---

## 5. DOM 候选采集策略（为什么这样筛）

`get_interactive_elements` 的候选采集策略：

1. 只抓“潜在可交互”选择器（链接、按钮、输入框、带 role/onclick/tabindex）
2. 过滤极小元素、离屏元素、隐藏元素
3. 使用位置+尺寸+tag+id 去重
4. 只保留当前视口可见候选，限制 `max_elements`

代码位置：`agent/Environment/html_env/operator_env.py:374-424`

这样做的作用是：

- 降低映射搜索空间，减少误匹配
- 增强运行效率
- 强制映射聚焦“可操作目标”

---

## 6. 失败与回退机制

`apply_vision_to_dom_mapping(...)` 内置了多层回退：

1. 动作或 mapper 缺失：跳过
2. 动作类型不可映射：跳过
3. DOM 采集失败：跳过
4. DOM 候选为空：跳过
5. mapper 异常：跳过

代码位置：`eval_op.py:1135-1160`

即：Vision-to-DOM 是“增强层”，失败不会阻塞主流程执行。

---

## 7. 实际作用（从工程结果角度）

Vision-to-DOM 在工程上主要带来三类收益：

1. 点击稳定性提升
- 减少“看起来点对了但实际点偏了”的情况

2. 可解释性提升
- 轨迹里有 `vision_to_dom_mapping`、`dom_target`、`mapping_confidence`
- 出错时可复盘“为什么映射到了这个元素”

3. 跨页面鲁棒性提升
- 页面结构微调时，语义锚点通常比原像素坐标更稳定

证据位置：

- 映射日志：`eval_op.py:639-644`
- 轨迹记录：`eval_op.py:665-667`

---

## 8. 什么场景最有用

## 8.1 高收益场景

1. 动态页面
- 例如电商首页、资讯流、广告位频繁变化页面

2. 多弹窗/悬浮层页面
- 例如登录引导、优惠弹窗、cookie banner 常见站点

3. 长流程任务
- 搜索 -> 筛选 -> 进入详情 -> 填写 -> 提交

4. “视觉相近元素很多”的页面
- 多个按钮文本接近，纯坐标容易误命中

## 8.2 作用较弱场景

1. canvas/游戏类页面（DOM 元素极少）
2. 高度自绘 UI（可交互语义不在标准 DOM）
3. 目标元素不在视口内且候选抓不到

---

## 9. 与动作执行模块的关系

映射后，动作仍由 Operator 执行器按坐标落地：

- `operator_click` -> `page.mouse.click(x, y)`
- `operator_double_click` -> `page.mouse.dblclick(x, y)`

代码位置：`eval_op.py:917-935`、`agent/Environment/html_env/operator_actions.py:157-160`

所以 Vision-to-DOM 并没有改变“坐标驱动执行”这一事实，而是把坐标先校准到更可靠的 DOM 语义目标上。

---

## 10. 参数与可调优点

可优先调优的三个参数：

1. `min_confidence`（映射阈值）
- 更高：更保守，减少误吸附
- 更低：更激进，覆盖更多点击

2. `max_elements`（候选上限，当前 280）
- 更大：覆盖更全但更慢、误匹配风险增
- 更小：更快但可能漏目标

3. 打分权重（`coord/text/bonus`）
- 当前偏空间匹配（0.68），对“坐标接近”依赖较高

对应代码：

- 阈值：`agent/Plan/vision_dom_mapper.py:32-33`
- 候选数：`eval_op.py:1143` / `operator_env.py:365-372`
- 权重：`agent/Plan/vision_dom_mapper.py:147-152`

---

## 11. 一句话总结

Vision-to-DOM 是该项目中“把视觉点击变成语义点击”的关键稳态机制：  
它不替代视觉规划，而是在执行前做跨模态校准，显著降低复杂网页中的坐标漂移和误触问题，尤其适用于动态、多步骤、高干扰页面任务。
