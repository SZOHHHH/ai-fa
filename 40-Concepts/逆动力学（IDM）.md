---
type: concept
aliases: [逆动力学, IDM, Inverse Dynamics Model, 逆模型, goal-conditioned IDM]
domain: 强化学习与模仿学习
tags: [concept]
---

# 逆动力学（IDM）

## 1. 定义（直觉 → 形式）

**直觉**：给你一段录像的**前后两帧**，让你猜中间玩家**按了什么键**——猜这个的网络就是逆动力学模型（IDM，Inverse Dynamics Model）。正向问"按键之后画面怎么变"，逆向问"画面这么变了，之前按的是什么键"。

**形式**（与正向世界模型互为镜像）：

$$\text{正向（世界模型）}:\;p(s'\mid s,a)\qquad\longleftrightarrow\qquad\text{逆向（IDM）}:\;q(a\mid s,\,s')$$

- **k 步版**（goal-conditioned）：$q(a_t\mid s_t,\,s_{t+k})$——由"当前局面+目标未来局面"反推**第一步**该做什么。k=1 时若转移确定则答案唯一；k 大时多条路径通向同一未来 → 后验天然多模态（多个动作序列都对）。
- 名字来自物理学：由系统的运动轨迹反推产生它的力/力矩——机械臂控制用了几十年的标准件。

## 2. 三个用途家族

| 家族 | 用 IDM 干什么 | 代表 |
|---|---|---|
| **打标签**（模仿学习） | 给无动作标注的视频补动作标签 → 变成可监督数据 | VPT（Minecraft）、Genie 的 latent action model、[[10-Papers/09-世界模型与JEPA/Latent Action Pretraining from Videos（LAPA）|LAPA]] |
| **规划/反推**（goal-conditioned） | 给定目标帧，反推动作直接执行或进规划代价 | Paster 2020（IDM-first 规划）；规划一致性检查（ACID 类） |
| **imagine-then-act**（机器人 WAM） | 先扩散生成未来视频，再由未来帧反推动作 | Fast-WAM-IDM；[[10-Papers/09-世界模型与JEPA/GIFT Guided Intermediate Feature Training via Action-Oriented Structural Supervision for Robotic Man|GIFT]] 的 WAM-IDM 变体（未来条件 IDM + 表征监督）；[[10-Papers/09-世界模型与JEPA/GE-Act 2.0 Pretraining and Scaling a World-Action Model for Robotic Manipulation|GE-Act 2.0]]（单步流生成未来→IDM 反推 + KASO 兼容选择，2026 旗舰缩放） |
| **正则/一致性** | "前向预测的帧反推回的动作应与条件动作一致"——当验钞机用 | 世界模型训练辅助件 |

## 教程：同一帧对的三个世界（良定义性三档）

**第 1 步：确定世界。** 台球：$s = $（球在左），$s' = $（球在右），物理唯一 → $q(a{=}右|s,s') \approx 1$（尖峰）——**果几乎锁定因**，反推可靠，IDM 当精确打标签机用（VPT 给 Minecraft 视频补按键）。

**第 2 步：随机世界。** 格斗：$s\to s'$（对手倒地）可由 a=重拳（碰巧命中）或 a=轻拳+连招 → $q = (0.6,\ 0.4)$ 宽峰——同样的果多种因，**反推只能给分布**。软输出（交叉熵训练的概率向量）此时不是缺陷而是答案本身：**"哪些键都行"的完整描述**（CE 最优 = 真后验 $p(a|s,s')$，由 CE = KL + 熵恒等式直接给出，[[30-Formulas/交叉熵]] §2）。

**第 3 步：无因果世界。** $s\to s'$ 是对手自走（agent 没按键）→ $q \approx$ 均匀（无信息）——**果对因的信息量 = 互信息**，零互信息时反推无解。良定义性地图：随机性与 $k$ 越大，果对因的信息越少。

**第 4 步：k 步版的多模态。** $q(a_t|s_t, s_{t+k})$：$k$ 大时通向同一未来的路径极多（先绕路再到达也算）→ 后验天然多峰——与 [[20-Algorithms/MDN-RNN]]"未来本身多模态"是镜像问题（未来多模态 ↔ 原因多模态），E2 反推的设计张力全在这张地图上。

**第 5 步：imagine-then-act 的用法。** WAM 系：扩散先生成目标未来帧 $s_{t+k}$，IDM 吃 $(s_t, s_{t+k})$ 反推第一步动作——**把"规划"拆成"想象+反推"两件标准件**；对照路线=goal 直接进生成器（Diffuser 一体化）——两条路的选择见 §2 家族表。

## 3. 什么时候"逆"得动（良定义性）

| 场景 | 后验 $q(a\mid s,s')$ | 说明 |
|---|---|---|
| 确定动态（球类物理） | 尖峰（接近 [[40-Concepts/独热编码（One-Hot）|one-hot]]） | 果几乎唯一锁定因——反推可靠 |
| 环境随机（对手随机） | 宽/多峰 | 同样的果可由多种因产生——反推病态，只能给分布 |
| 动作对转移无影响 | 无信息 | 有些帧变化根本不由 agent 造成（对手自走） |

这正是"由果找因"问题的可解性地图：**果对因的信息量 = 互信息**，随环境随机性与 k 增大而衰减。

## 4. 易混点

- **IDM ≠ 反向模拟器**：IDM 不需要"倒放世界"（那要求可逆动力学）；它只是学一个条件分布，与正向模型是否可逆无关。
- **IDM ≠ BC**：[[40-Concepts/行为克隆与模仿学习|BC]] 学 $\pi(a\mid s)$（只看当前，学老师习惯）；IDM 多看一个未来帧（学环境因果）。同一堆数据能干两件事。
- **软输出才是宝**：用 [[30-Formulas/交叉熵|交叉熵]] 训练的 IDM，其总体最优=匹配真后验 $p(a\mid s,s')$（交叉熵=KL+熵的恒等式直接给出）——18 维概率向量（[[40-Concepts/独热编码（One-Hot）|one-hot]] 动作空间的软形态）本身就是"哪些按键都行"的完整答案，argmax 只是它的一个投影。
- **逆强化学习（IRL）**：反推的是"奖励"不是"动作"，另一码事。

## 5. 自测

1. 确定/随机/无因果三档的 $q(a|s,s')$ 形态？（尖峰（果锁因）/ 宽峰多模态（多因同果）/ 均匀（互信息为零））
2. 交叉熵训 IDM 的最优解？（$q_\theta \to p(a|s,s')$ 真后验（CE = KL + 熵恒等式）——软输出即答案）
3. k 步 IDM 为什么天然多模态？（通向同一未来的路径多（绕路也算）——k 越大峰越多）
4. imagine-then-act 的两件标准件？（扩散想象未来帧 + IDM 反推首动作——对照 goal 直接进生成器的 Diffuser 路线）

## 6. 与库内实体的关系

- ← 地基：[[40-Concepts/贝叶斯公式]]与[[40-Concepts/条件概率]]（后验语言）、[[40-Concepts/马尔可夫决策过程]]（转移定义因果）
- → 配套：[[40-Concepts/行为克隆与模仿学习]]（镜像零件）、[[10-Papers/03-后处理/A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning（DAGGER）|DAGGER]]（分布对齐同源）
- 论文侧：[[10-Papers/09-世界模型与JEPA/Latent Action Pretraining from Videos（LAPA）|LAPA]]/[[10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）|Genie]]（latent action 家族）、[[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]]（目标条件生成的对照路线：不用 IDM、由扩散直接生成动作）
- 正演对照补记（260914）：[[10-Papers/09-世界模型与JEPA/RodForesight - A World Model Enhanced Diffusion Policy for Slender and Material Agnostic Rod Insertion（杆件插装）|RodForesight]]（动作条件 WM 当**正演评估器** p(对齐效果|s,a)——与本概念的反演 p(a|x,goal) 一正一反同构）
- 表征侧补记（260914）：[[10-Papers/09-世界模型与JEPA/VideoTok4D - A 4D-Aware Video Tokenizer for Compact World Representation（4D视频分词器）|VideoTok4D]]（轨迹对齐的 4D 世界 token——IDM 反推的理想潜空间形态候选）
- 正演对照补记二（260915）：[[10-Papers/09-世界模型与JEPA/From Prediction to Decision - World-Model-Guided Action Selection for Continuous Pile Excavation（挖掘WAM）|WAM 挖掘]]（goal 条件扩散提案+冻结 WM 正演排序——"按目标撒候选、用正演挑"以 5 次前向近似一次反演的工程路线，与 RodForesight 同族成对）
- 光流中介补记（260916）：[[10-Papers/09-世界模型与JEPA/Seeing What Matters Visual Cue Guided Video Planning for Generalizable Robot Navigation|CueNav]]（视频规划器生成未来帧→AllTracker 密集光流→embodiment 专用 transformer IDM 回归 15 步动作——**帧对条件的流中介实现**：MSE 点估计、无后验，goal 走规划器不进 IDM 本体；与 WAM 同周构成 imagine-then-act 族的正演/反演对偶）
- 查询读出补记（260917）：[[10-Papers/09-世界模型与JEPA/Reconstructing Is Not Acting Action-Centric Latent Dynamics Modeling|ACT-LAM]]（LAM 族指认**重构-动作失配**：重构误差更低≠潜动作更好；其 AQ-IDM 用可学习动作查询+门控聚合选择性读出动作线索——**帧对条件的查询读出实现**：连续潜动作点估计、无后验、无 goal 条件，DINOv2 潜空间非像素扩散；IDM 设计从"信息瓶颈逼动作相关"转向"选择性读出"的范式信号，E2 引用矩阵 IDM 设计轴新增支线）
- 残差检验补记（260924）：[[10-Papers/09-世界模型与JEPA/CoPRE Improving Sensitivity in Proprioceptive Contact Detection for Low-Cost Robot Arms|CoPRE]]（学习式**名义模型+残差**替代解析逆动力学做弱接触检测——解析 IDM 基线在弱接触上召回 0%，学习式参考模型+噪声加权雅可比聚合拉到 74-82%；"由果找因"但反推的是二值事件非动作序列，E2 判别式残差路线的域外表亲）
