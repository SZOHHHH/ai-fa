---
type: paper
title: "Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor"
aliases: [SAC, Soft Actor-Critic]
year: 2018
authors: [Tuomas Haarnoja, Aurick Zhou, Pieter Abbeel, Sergey Levine]
venue: ICML 2018
arxiv: "1801.01290"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [—(无模型控制), 策略学习(off-policy)+熵正则, 有]
tags: [paper]
---

# SAC（软 actor-critic：最大熵 RL 的工程完全体）

## 1. 一句话贡献

把"**最大化回报的同时最大化策略熵**"（最大熵 RL）做成一个稳定、样本高效、跨随机种子稳健的 off-policy 深度 RL 算法：随机 actor + 双 Q + 自动温度，成为连续控制的长期基线——"既能拿分，又表现得尽可能随机"。

## 2. 核心贡献

- **最大熵目标落地**：熵不是外加小项，而是**并进贝尔曼方程**（软价值函数）——正则成为目标的一部分，理论（软策略迭代收敛性）与工程（深度版稳定）配套；
- **随机 actor + 重参数化**：策略 $a=f_\phi(\epsilon;s)$ 把采样噪声提到外面，让策略梯度能穿过随机性（对连续动作至关重要），训练完仍保留随机性（多模态行为不坍缩）；
- **双 Q 取小**（clipped double Q）：两个 critic 独立训、目标取 $\min$——一行代码治好 Q 过估计；
- **自动温度 $\alpha$**：熵的汇率自动调（约束期望熵），不用手工调超参；跨种子方差极小（当年最稳）。

## 3. 方法概要

1. 软价值定义（熵内嵌）：$V(s)=\mathbb{E}_{a\sim\pi}[Q(s,a)-\alpha\log\pi(a\mid s)]$；
2. critic 训练：对 $\big(r+\gamma(\min_i Q_{\bar\theta_i}(s',a')-\alpha\log\pi(a'\mid s'))\big)$ 回归，$a'$ 从当前策略采（目标网络+取 min 双保险）；
3. actor 训练：$J_\pi=\mathbb{E}_{s}\big[\alpha\log\pi(f_\phi(\epsilon;s)\mid s)-\min_i Q_i(s,f_\phi(\epsilon;s))\big]$——推策略"往高 Q 走、但别太确定"；
4. 温度更新：把平均熵拉到目标熵（离散动作常取 $-\tfrac{1}{|\mathcal{A}|}\log\tfrac{1}{|\mathcal{A}|}$）附近；
5. 大回放池 + 每步多轮梯度——off 家族样本效率的标配吃法。

## 4. 核心公式

$$J(\pi)\;=\;\sum_t\mathbb{E}_{(s_t,a_t)\sim\rho_\pi}\Big[r(s_t,a_t)\;+\;\alpha\,\mathcal{H}\big(\pi(\cdot\mid s_t)\big)\Big]$$

**直觉解释**：普通 RL 的最优解是"每步挑最好的那个动作"（尖峰）；最大熵的最优解是"**把所有能拿同样高分的动作按比例都留着**"（分布）——等价于在约束"期望回报≥某个水平"下求最大熵分布（这是个凸问题，解有唯一性）。$\alpha$ 是两种货币的兑换率：$\alpha\to0$ 退化普通 RL；$\alpha$ 大则宁可丢分也要随机。

- 需要的前置：[[40-Concepts/熵正则RL]]（本文的概念页，含家族谱）、[[40-Concepts/on-policy与off-policy]]（off 大回放的吃法）、[[40-Concepts/重参数化]]、[[40-Concepts/TD误差与自举]]、[[40-Concepts/价值函数（V与Q）]]

## 5. 与前作/矩阵关系

- ← **最大熵逆 RL**（Ziebart 2010：人类行为=最大熵下的最优，解释"为什么人走路不抄最短直线"）→ **软 Q 学习**（2017：把熵并进 Q，但用采样的 actor 不稳）→ **SAC**（换成重参数化的显式 actor，稳定）；
- ← 与 [[10-Papers/04-强化学习与对齐/Playing Atari with Deep Reinforcement Learning（DQN）|DQN]]：双 Q 取小继承自 TD3/Double DQN 一脉的过估计治理线；
- → SAC-Automatic（自动 α，即常引版本）、离散动作版 SAC-Discrete；**小系数熵正则**（A3C 式 $-\beta\mathcal{H}$ 挂在 loss 末尾）= 本文思想的轻量版——现代世界模型（Dreamer/DIAMOND 系）的 AC loss 里那个 $10^{-3}$ 级熵项即此传统。

## 6. 影响与后续

- 连续控制（MuJoCo/机器人）多年默认基线，"off-policy + 大回放 + 熵"三件套定义了一个时代的默认配置；
- **多模态保护**的示范样本：奖励多峰时策略保持混合——与"确定性策略/贪心会挑边"形成对照，这一性质后来在多模态环境讨论中反复被引用；
- 熵自动调节思想扩散到 LLM RL（熵坍缩监控/熵奖励设计）与扩散策略；
- 局限：原生连续动作（离散要改版）；软 Q 迭代的理论保证在深度近似下只剩经验稳健性。

## 7. 读前须知

- **必前置**：[[40-Concepts/熵正则RL]]、[[40-Concepts/on-policy与off-policy]]、[[40-Concepts/重参数化]]；
- **易混点**：①SAC 的"软"= 软贝尔曼（熵内嵌），不是 soft target/软更新；②双 Q 是**同构双胞胎**（都估 Q），与"actor/critic 双头"不是一回事；③自动温度 α 与 softmax 蒸馏温度是不同机制的巧合同名；
- **读法建议**：算法 1（一页伪代码）+ 附录 A 软策略迭代推导；正文实验部分可略读（结论"最稳"已成常识）。
