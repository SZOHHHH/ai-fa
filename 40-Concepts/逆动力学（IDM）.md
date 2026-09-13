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

## 5. 与库内实体的关系

- ← 地基：[[40-Concepts/贝叶斯公式]]与[[40-Concepts/条件概率]]（后验语言）、[[40-Concepts/马尔可夫决策过程]]（转移定义因果）
- → 配套：[[40-Concepts/行为克隆与模仿学习]]（镜像零件）、[[10-Papers/03-后处理/A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning（DAGGER）|DAGGER]]（分布对齐同源）
- 论文侧：[[10-Papers/09-世界模型与JEPA/Latent Action Pretraining from Videos（LAPA）|LAPA]]/[[10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）|Genie]]（latent action 家族）、[[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]]（目标条件生成的对照路线：不用 IDM、由扩散直接生成动作）
