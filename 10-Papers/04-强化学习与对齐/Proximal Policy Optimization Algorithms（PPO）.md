---
type: paper
title: Proximal Policy Optimization Algorithms
aliases: [PPO]
year: 2017
authors: [John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov]
venue: arXiv 2017
arxiv: "1707.06347"
line: 强化学习与对齐
matrix_coords: [—(RL基础设施), RL目标(在线), 有]
tags: [paper]
---

# PPO（近端策略优化：一行裁剪统治 RL）

## 1. 一句话贡献

把 TRPO 的二阶信赖域（共轭梯度+Fisher）换成**一行裁剪**：重要性比率超出 $[1-\epsilon,1+\epsilon]$ 就截断梯度——效果相当、实现极简、可大规模并行，成为 RLHF 之前使用最广的 RL 算法与 ChatGPT 对齐的引擎。

## 2. 核心贡献

- **裁剪代理目标**：对好动作允许概率上调但封顶 $1{+}\epsilon$、坏动作允许下调但封底 $1{-}\epsilon$——**"方向照旧、油门踩死、方向盘锁住"**；
- **数据复用的合法化**：同一批 on-policy 数据可跑多个 epoch（重要性修正 $\rho$ 使 loss 定义合法；裁剪限制漂移使修正不失真）——比 TRPO 的"数据用一次即弃"省数倍样本；
- **两种实现**：clip 版与 KL 惩罚版（自适应系数），实验支持 clip——简洁性完胜；
- 与 GAE 配套（同作者前后脚工作）成为策略梯度家族的完成态。

## 3. 方法概要

1. 策略采样 T 步 rollout，GAE 算优势，价值头回归；
2. 同批数据重复 K 个 epoch、每次切 minibatch：
   - 算比率 $\rho_t=\pi_\theta(a_t\mid s_t)/\pi_{old}(a_t\mid s_t)$；
   - 目标 $L=\mathbb{E}[\min(\rho_t\hat A_t,\ \mathrm{clip}(\rho_t,1{-}\epsilon,1{+}\epsilon)\hat A_t)]$（ε=0.2）；
3. 价值损失 + 熵正则项加总反传（共享主干双头，A3C 形态）；
4. 重新采样，循环——"宽采样、小步更新、多轮复用"。

## 4. 核心公式

$$L^{CLIP}(\theta)\;=\;\mathbb{E}_t\Big[\min\big(\rho_t\hat A_t,\;\;\mathrm{clip}(\rho_t,\,1-\epsilon,\,1+\epsilon)\,\hat A_t\big)\Big]$$

**直觉解释（四象限拆解）**：

| $\hat A_t$ | $\rho$ 太大（>1+ε） | $\rho$ 太小（<1−ε） |
|---|---|---|
| **好动作**（A>0） | 概率已拉够 → **截断，不再奖励上调**（防过度自信） | 概率跌过头 → 梯度放开，拉回来 |
| **坏动作**（A<0） | 概率涨过头 → 梯度放开，压回去 | 概率已压够 → **截断，不再往下踩**（防赶尽杀绝） |

裁剪的精髓：**只有"变好还没变够"的方向有梯度，"已经变过头"的方向自动断电**——悲观下界：取 min 保证目标不高于真实代理目标（保守估计，宁可不涨也不虚涨）。

- 需要的前置：[[30-Formulas/PPO裁剪目标]]（完整推导）、[[40-Concepts/策略梯度定理]]、[[40-Concepts/重要性采样]]、[[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）|TRPO]]

## 5. 与前作/矩阵关系

- ← [[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）|TRPO]]（二阶→一阶）；← [[10-Papers/04-强化学习与对齐/High-Dimensional Continuous Control Using Generalized Advantage Estimation（GAE）|GAE]]（优势估计标配）；
- → [[Training language models to follow instructions with human feedback（InstructGPT）|InstructGPT]]/ChatGPT 的 RLHF 引擎；→ DeepSeekMath 的 GRPO（去掉价值头、组内相对优势）——LLM 时代两大继承者；
- → 世界模型想象训练系（Dreamer/DIAMOND 的 actor 损失=REINFORCE 式+熵，风格上比 PPO 更朴素——读代码时注意想象系未必用 clip）。

## 6. 影响与后续

- 事实标准：机器人（Isaac Gym 千级并行）、游戏、RLHF；"PPO+GAE"是策略梯度的默认答案；
- 被 GRPO（LLM 群体相对优势版）部分取代于语言模型域；
- 局限：仍是 on-policy（跨批次数据失效）；ε/epoch 数敏感域存在；理论上比 TRPO 弱（无单调保证，靠实践兜底）。

## 7. 读前须知

- **必前置**：[[40-Concepts/策略梯度定理]]、[[40-Concepts/重要性采样]]、[[30-Formulas/PPO裁剪目标]]、[[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）|TRPO]]（对照着读，理解"裁剪≈信赖域的廉价版"）；
- **易混点**：①min 是"悲观下界"不是保守主义美学——数学上防止目标高估；②裁剪的是**概率比率**不是概率本身；③价值头与策略头共享主干（A3C 形态）——"PPO 算法"与"网络形态"是两件事；
- **读法建议**：正文极短（8 页）；先读 [[30-Formulas/PPO裁剪目标]] 公式卡的直觉，再看本文图 1（裁剪曲线图——一图胜千言）与算法 1。

> 数学根基：[[30-Formulas/PPO裁剪目标]] · [[40-Concepts/策略梯度定理]] · [[40-Concepts/广义优势估计GAE]]
