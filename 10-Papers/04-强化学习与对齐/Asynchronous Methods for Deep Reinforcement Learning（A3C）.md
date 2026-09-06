---
type: paper
title: Asynchronous Methods for Deep Reinforcement Learning
aliases: [A3C, Asynchronous Advantage Actor-Critic]
year: 2016
authors: [Volodymyr Mnih, Adrià Puigdomènech Badia, Mehdi Mirza, Alex Graves, Timothy P. Lillicrap, Tim Harley, David Silver, Koray Kavukcuoglu]
venue: ICML 2016
arxiv: "1602.01783"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [—(无模型控制), 策略学习(on-policy), 有]
tags: [paper]
---

# A3C（异步优势 actor-critic：共享主干双头的定型之作）

## 1. 一句话贡献

用"多个线程各自和环境交互、异步把梯度推给共享网络"这一个简单框架，让深度 RL **不用 GPU、不用经验回放**就能稳定训练；同时确立了沿用至今的**共享 CNN 主干 + policy 头 + value 头**的 actor-critic 网络形态——**"一个网络两个头"的直接出处**。

## 2. 核心贡献

- **异步并行替代 replay**：16 个 CPU 线程各玩各的（数据天然不相关、分布天然多样），梯度异步汇入共享参数——on-policy 家族第一次在深度网络上稳定（回放池是 off-policy 家族的对应解）；
- **A3C 网络形态**（本文最长寿的遗产）：一个 CNN（或 CNN+LSTM）编码器，**顶上接两个小头**——policy 头 $|\mathcal{A}|$ 维 logits、value 头 1 维标量。训练时两项 loss + 熵正则加总，特征共享、监督双份；
- **一鱼多吃**：同一异步框架装了 4 个算法（one-step Sarsa/Q-learning、n-step Q、A3C）全部稳定——证明"去相关"本身才是稳定性的关键，而非某个特定算法；
- **训练民主化**：单机多核 CPU 半天~一天半训完，击败当时用 GPU+replay 的 DQN 变体（Atari 上超 DQN 的平均分）。

## 3. 方法概要

1. 每线程独立环境实例，跑 $t_{max}=20$ 步（或到终止）攒一段小 rollout；
2. 线程内算 20 步的折扣回报（尾部用当前 value 头自举：$R=\sum\gamma^k r_{t+k}+\gamma^{20}V(s_{t+20})$——**n-step 自举**）；
3. 三项合成的总损失一起反传（见 §4）；
4. 梯度推进共享参数（加锁或 Hogwild! 式无锁）；隔几步把共享参数拷回线程网络；
5. 熵正则系数 $\beta=0.01$，ε-greedy 退火——探索由并行多样+熵双保险。

## 4. 核心公式

$$\mathcal{L}(\theta)\;=\;-\sum_t\log\pi_\theta(a_t\mid s_t)\,\underbrace{\big(R_t-V_\theta(s_t)\big)}_{\text{优势：这段比预想好多少}}\;+\;c\sum_t\big(V_\theta(s_t)-R_t\big)^2\;-\;\beta\sum_t\mathcal{H}\big(\pi_\theta(\cdot\mid s_t)\big)$$

**直觉解释（三项各是谁）**：①策略项=带优势加权的对数似然（[[30-Formulas/REINFORCE目标]] 加了 baseline）；②价值项=对 n-step 回报的回归（critic 的监督）；③熵项=奖励"别太确定"（[[40-Concepts/熵正则RL]] 的二等公民版）。**梯度分配律**保证三项相加合法：各自对 $\theta$ 求导后线性叠加，共用的主干特征同时接受三份监督。

- 需要的前置：[[40-Concepts/策略梯度定理]]、[[40-Concepts/价值函数（V与Q）]]、[[40-Concepts/TD误差与自举]]（n-step 与尾项自举）、[[40-Concepts/熵正则RL]]、[[40-Concepts/on-policy与off-policy]]（为什么 on 家族需要并行去相关）

## 5. 与前作/矩阵关系

- ← **actor-critic 架构**（Barto-Sutton-Anderson 1983 的 ASE/ACE 元件，43 岁的老思想）+ **REINFORCE** + DQN 时代的深度稳定化经验；
- ← 与 [[10-Papers/04-强化学习与对齐/Playing Atari with Deep Reinforcement Learning（DQN）|DQN]] 是**双解对照**：同一个病（数据相关+训练不稳），DQN 开药"回放+目标网络"（off 路线），A3C 开药"并行去相关"（on 路线）；
- → IMPALA（分布式批量版）、A2C（去掉异步的同步版——往往更稳更快）；**共享主干双头**从本文定型，一路传到现代 MBRL：Dreamer 系在 RSSM 上挂 actor/critic 双头、像素世界模型（DIAMOND）在 CNN+LSTM 主干上挂双头——**都是 A3C 形态的当代化身**。

## 6. 影响与后续

- 网络形态：**几乎所有现代 actor-critic 的"共享表征"做法都引本文为源头**——一个编码器学世界、两个小头各司其职（省参数 + 特征复用 + 端到端）；
- 训练框架：异步梯度 → 分布式 RL（Ape-X、SEED RL、IMPALA）的祖先；
- "多环境并行"从此是 RL 实现的默认假设（今天任何 RL 库的 vec-env 概念源于此）；
- 局限：异步梯度有 staleness（IMPALA 用 V-trace 修正）；被 PPO（更稳的更新规则）在效果上超越——但**形态**从未被超越。

## 7. 读前须知

- **必前置**：[[40-Concepts/策略梯度定理]]、[[40-Concepts/熵正则RL]]、[[40-Concepts/on-policy与off-policy]]；
- **易混点**：①A3C 的"3"= Asynchronous Advantage Actor-Critic（不是三代）；②共享主干≠参数共享的 actor 和 critic——是**同一个网络**，只是输出端拆两路；③n-step 回报里的尾部自举与 GAE 的 λ 加权是两种不同的"看多远"方案（GAE 是它的平滑推广）；
- **读法建议**：重点读 §2（算法表）与图 1（架构图，双头结构一目了然）；4 个算法变体可只看 A3C。
