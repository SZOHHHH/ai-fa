---
type: paper
title: Learning Latent Dynamics for Planning from Pixels
aliases: [PlaNet]
year: 2018
authors: [Danijar Hafner, Timothy Lillicrap, Ian Fischer, Ruben Villegas, David Ha, Harri Edwards, Vincent Vanhoucke]
venue: ICML 2019
arxiv: "1811.04551"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# PlaNet（从像素直接规划的潜动力学模型）

## 1. 一句话贡献

**RSSM 的诞生地**：确定性+随机双线潜状态的循环世界模型，配上 CEM 在潜空间滚动规划——不需要策略网络、不需要重建每一帧，直接"从像素到动作序列"，Dreamer 系的起点。

## 2. 核心贡献

- **RSSM**（循环状态空间模型）：确定性 $h$（GRU 长链）+ 随机 $s$（每步分布）的混合潜状态（详见 [[30-Formulas/RSSM转移模型]]）——解决了"纯确定模型抹掉随机性 / 纯随机模型传不动梯度"的两难；
- **潜空间 MPC**：每步用交叉熵法（CEM）在梦里搜索未来动作序列，执行第一步，滚动重规划——**无 actor 网络**的规划式 agent；
- **多步潜变量过冲（latent overshoot）的发现**：按 $k$ 步分块训练转移（不只训单步），长程一致性显著提升——"多步预测一致性"从此进入世界模型训练清单；
- 像素级六基准（DeepMind Control Suite）一套超参全过，样本效率数倍于当时无模型基线。

## 3. 方法概要

1. **采集循环**：当前模型规划→执行→新数据回炉重训（数据分布随策略成长滚动扩）；
2. **RSSM 训练**：变分下界=重建项（解码器还原观测）+ 先验/后验 KL 项（$\beta$ 加权）+ 奖励预测头——一个模型三件监督；
3. **CEM 规划**：每决策时刻——随机采 1000 条候选动作序列（12 步）→ 全部在 RSSM 梦里滚出累积奖励 → 挑前 10% 精英 → 以精英均值重采 → 迭代几轮 → 执行最优序列**第一步**；
4. **关键设计**：规划全在潜空间（$s,h$）进行——一步想象=一次小 GRU+采样，比像素 rollout 便宜两个数量级。

## 4. 核心公式

$$h_t=f(h_{t-1},s_{t-1},a_{t-1}),\qquad s_t\sim q(s_t\mid h_t,o_t)\;\;(\text{训练})\;\big/\;\;s_t\sim p(s_t\mid h_t)\;\;(\text{想象})$$

**直觉解释**：双线分工的比喻——**确定性账本 + 随机性便签**：$h$ 记"长久以来发生了什么"（梯度可沿 GRU 传几百步），$s$ 记"这一步有什么新花样"（分布形式，保住"对手左/右"两峰）；CEM 的直觉则是"广撒网、选精英、往精英聚拢"——进化算法的一次循环嵌进每步决策。

- 需要的前置：[[30-Formulas/RSSM转移模型]]（完整公式卡）、[[20-Algorithms/变分自编码器]]、[[30-Formulas/ELBO目标]]、[[40-Concepts/重参数化]]

## 5. 与前作/矩阵关系

- ← [[World Models（世界模型）|World Models 2018]]：三件套思想 → PlaNet 把"进化线性控制器"换成"CEM 规划器"（更强、但每步都要搜索——计算贵）、把 MDN-RNN 换成 RSSM（双线更稳）；
- → [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer 2020]]：同一 RSSM，把"每步 CEM 搜索"换成"策略网络+梯度穿梦"（把搜索成本摊销进权重）——**规划式→学习式**的分水岭；
- ↔ 对照 [[10-Papers/09-世界模型与JEPA/TD-MPC2- Scalable, Robust World Models for Continuous Control（TD-MPC2）|TD-MPC2]]（CEM 路线的现代化）；对照 [[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]（latent 路线 vs 像素路线的分叉坐标）。

## 6. 影响与后续

- RSSM 成为 Dreamer V1/V2/V3 的发动机，潜空间世界模型事实标准之一；
- "潜空间规划"范式：TD-MPC 系、SXPaND、基于模型强化学习的大量后续都长在"模型+每步搜索"骨架上；
- 局限：CEM 每步数千次前向（实时性差）→ Dreamer 的动机；潜状态压缩有信息损失 → "latent 够不够用"成为长期争论（直到像素路线 DIAMOND 反转叙事）。

## 7. 读前须知

- **必前置**：[[20-Algorithms/变分自编码器]]、[[30-Formulas/ELBO目标]]、[[40-Concepts/重参数化]]、[[40-Concepts/马尔可夫决策过程]]；
- **易混点**：①PlaNet **没有 actor-critic**——策略=CEM 规划的执行器，与 Dreamer 的最大区别；②RSSM 的"随机"在训练时看观测（后验）、想象时靠先验——两个头别混；③latent overshoot 不是训练技巧名，是**问题描述**（多步间 KL 累积失配）；
- **读法建议**：§3（RSSM 定义+图 2 结构图）→ §4（latent overshoot 训练目标）→ 图 6（规划可视化）；CEM 不熟可先看 [[20-Algorithms/世界模型]] §3 的规划器小节。

> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]]

> 数学根基：[[30-Formulas/RSSM转移模型]] · [[40-Concepts/贝尔曼方程]] · [[30-Formulas/ELBO目标]]
