---
type: paper
title: TD-MPC2- Scalable, Robust World Models for Continuous Control
aliases: [TD-MPC2]
year: 2023
authors: [Nicklas Hansen, Hao Su, Xiaolong Wang]
venue: ICLR 2024
arxiv: "2310.16828"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# TD-MPC2（价值等价世界模型 + 采样规划的连续控制全家桶）

## 1. 一句话贡献

隐式（价值等价）世界模型路线的集大成：**不重建观测**、只学"潜状态转移+奖励+价值一致性"，配上短 horizon MPPI 采样规划——单套超参跑通 80 个连续控制任务，且多任务共享一个模型也不掉点。

## 2. 核心贡献

- **无重建潜模型**：编码器把观测压进 512 维潜空间，转移模型在潜空间预测，监督只有三项——潜 TD 一致性、奖励预测、潜空间一致性（相邻编码别漂移）——**没有像素重建项**（与 Dreamer 系的根本区别，承 [[Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）|MuZero]] 的价值等价哲学）；
- **MPPI 规划 + Q 引导**：每步采样 N 条短 horizon（3 步）候选序列，在梦里用 ensemble Q 评分，按 MPPI 软权重重采迭代——**搜索式决策**（与 Dreamer 的策略式对照）；
- **多任务规模**：80 任务联合训练一个模型，某些任务比单训更强（潜空间共享表征的正收益）；模型规模 3M→317M 单调变强；
- 5 种领域随机化的 DMC 基准全 SOTA，成为连续控制隐式模型路线的代表基线。

## 3. 方法概要

1. 编码器 $e$：观测→512 维潜状态（无监督信号，靠下游三损失拉扯成形）；
2. 转移模型 $m$：潜状态+动作→下一潜状态；
3. 训练损失：$\mathcal{L}=\mathcal{L}_{\text{latent TD}}+\lambda_1\mathcal{L}_{\text{reward}}+\lambda_2\mathcal{L}_{\text{consistency}}$——latent TD=Q 头对自举目标回归（一致性在**价值层面**）；consistency=同轨迹相邻帧的编码直接拉近（防潜空间漂移）；
4. 决策：MPPI 采样→想象 rollout→ensemble Q 评分→重采（迭代 3~6 轮）→执行首步动作；Q ensemble 取 min 抗乐观偏。

## 4. 核心公式

$$\mathcal{L}\;=\;\mathcal{L}_{\text{latent TD}}\;+\;\lambda_1\,\mathcal{L}_{\text{reward}}\;+\;\lambda_2\,\mathcal{L}_{\text{consistency}}\qquad(\textbf{无重建项——模型只需"决策等价"})$$

**直觉解释**：三类世界模型的分界就是这条 loss——Dreamer 系带重建项（"要画得出来"）、MuZero/TD-MPC 系没有（"答得出 r/v 就行"）、DIAMOND 直接在像素上生成（"画就是答案"）。**"模型该忠实于什么"** 这个问题在 loss 层面的三种回答。潜一致性项是 TD-MPC 独有的补丁：不重建的潜空间容易漂（没有像素锚着它），拿"同轨迹相邻编码拉近"当锚。

- 需要的前置：[[40-Concepts/贝尔曼方程]]、[[40-Concepts/TD误差与自举]]、[[Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）|MuZero]]（哲学源头）

## 5. 与前作/矩阵关系

- ← TD-MPC（2022，初版：同骨架更小规模）← MuZero（价值等价哲学）；
- ↔ 三分天下教学组：[[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]（重建+策略式）/ TD-MPC2（价值等价+搜索式）/ [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]（像素扩散+策略式）；
- → 后续：Valdi 等隐式模型新作的对照基线；test-time 搜索类工作的近邻。

## 6. 影响与后续

- 隐式路线在连续控制的当代标杆；"多任务共享世界模型"的早期正面证据；
- 对"该不该重建"的争论提供 MuZero 方的持续弹药——与 DIAMOND 的像素证据正面对撞，构成本领域最有生产力的张力之一；
- 局限：离散动作域未验证；短 horizon 规划回避长程想象误差（3 步是刻意的保守选择）；搜索成本在决策时刻。

## 7. 读前须知

- **必前置**：[[40-Concepts/贝尔曼方程]]、[[40-Concepts/TD误差与自举]]、[[Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）|MuZero]]；
- **易混点**：①MPPI 与 CEM 同族（采样-精英-重采），MPPI 用软权重不硬截断；②"latent TD"里 Q 头的作用是**给规划打分**，不是学最优动作价值（策略=搜索）；③consistency 损失不是课程学习词，是潜空间防漂补丁；
- **读法建议**：图 1（三模块架构）→ 表 1（80 任务）→ 附录 A 消融（三项损失各自贡献）；MPPI 细节可黑盒处理。

> 近邻同族：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]] · [[Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）]]

> 数学根基：[[40-Concepts/贝尔曼方程]] · [[30-Formulas/贝尔曼最优方程]]
