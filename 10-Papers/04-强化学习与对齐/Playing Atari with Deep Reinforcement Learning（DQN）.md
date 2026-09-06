---
type: paper
title: Playing Atari with Deep Reinforcement Learning
aliases: [DQN, Deep Q-Network]
year: 2013
authors: [Volodymyr Mnih, Koray Kavukcuoglu, David Silver, Alex Graves, Ioannis Antonoglou, Daan Wierstra, Martin Riedmiller]
venue: NIPS Deep Learning Workshop 2013（扩展版 Nature 2015《Human-level control》）
arxiv: "1312.5602"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [—(无模型控制), 价值学习(off-policy), 有]
tags: [paper]
---

# DQN（深度 Q 学习：从像素玩游戏的开山之作）

## 1. 一句话贡献

第一次让**深度神经网络直接从原始像素**学出控制策略：一个 CNN 吃 84×84 游戏画面，吐出 18 个动作的 Q 值，靠**经验回放 + 目标网络**两个工程件把原本发散的"深度 + TD 自举"训练稳定下来——深度强化学习从此开局。

## 2. 核心贡献

- **端到端 Q 学习**：输入原始像素（不做特征工程），输出动作价值，中间无人工信息；
- **经验回放（replay buffer）**：转移存池、随机抽批——打破时间相关性 + 一条经验多次复用（样本效率↑）；
- **目标网络（target network）**：自举目标 $r+\gamma\max Q_{\bar\theta}$ 用一份**慢更新**的参数 $\bar\theta$——"靶子不动，枪才打得稳"；
- **一套超参通吃**：同一网络结构与超参跑 7 个（2015 版 49 个）Atari 游戏，不作任何游戏特定调整——"通用性"第一次成为深度 RL 的评价维度。

## 3. 方法概要

1. **预处理**：游戏帧 → 灰度 → 84×84 → 取最近 4 帧堆叠成 12 通道输入（堆叠是为了让马氏性成立——单帧看不到速度）；
2. **网络**：3 卷积层（32/64/64）+ 2 全连接 → 输出 $|\mathcal{A}|$ 个 Q 值（每动作一个头，不是分布、不是策略，就是"这个按键值多少分"）；
3. **行为**：ε-greedy（ε 从 1 退火到 0.1）——拿 1% 概率乱按换探索；
4. **学习**：每 4 个真实动作，从百万级回放池里抽 32 条转移，最小化 TD 损失（见 §4）；目标网络每 10000 步同步一次；
5. **训练量**：1000 万帧（约 38 天游戏时间）——深度 RL "样本饥荒"的起点数据。

## 4. 核心公式

$$\mathcal{L}(\theta)\;=\;\mathbb{E}_{(s,a,r,s')\sim\mathcal{D}_{\text{replay}}}\Big[\big(\underbrace{r+\gamma\max_{a'}Q_{\bar\theta}(s',a')}_{\text{目标：真奖励+慢网络的估价}}\;-\;Q_\theta(s,a)\big)^2\Big]$$

**直觉解释**：右边两项是"新证据"与"旧估价"的差（TD 误差的平方版）；关键在两个细节——①期望下标是**回放池**而非当前策略（这就是 off-policy）；②目标里的 Q 戴着旧参数 $\bar\theta$（这就是目标网络）。梯度**只穿 $Q_\theta$ 不穿目标**（目标当常数，对应实践里的 stop-gradient）。

- 需要的前置：[[40-Concepts/贝尔曼方程]]（$Q^*=r+\gamma\max Q^*$ 的影子）、[[40-Concepts/TD误差与自举]]（损失即 TD 误差平方）、[[40-Concepts/on-policy与off-policy]]（回放池=行为分布 $\mu$）、[[40-Concepts/价值函数（V与Q）]]（为什么选 Q 不选 V：$\arg\max$ 直接选动作，无需展开策略）

## 5. 与前作/矩阵关系

- ← **Q-learning**（Watkins 1989，表格时代）：DQN=它的函数逼近版，贡献是把"表格+查表"换成"CNN+梯度"并活了下来；
- ← [[40-Concepts/RL中的log导数技巧]] 之前的世界：整个价值学习路线（TD/GQ/Neural Fitted Q）都在与"发散"搏斗，DQN 用两个工程件先稳住了实践；
- ≡ 与策略梯度路线（REINFORCE→PPO）平行：**价值 off-policy 家族 vs 策略 on-policy 家族**——矩阵上占"无模型×价值"格。

## 6. 影响与后续

- **直系改进**：Double DQN（拆"选动作"与"估价"治过估计）、Dueling（V 与优势分解）、PER（优先回放）、Rainbow（全家桶）、Distributional RL（学分布不学均值）；
- **基准立国**：Atari + ALE 从此成为 RL 的 ImageNet；后来的 IRIS、EfficientZero、DIAMOND 全在它铺的赛道上（"Atari 100k"= 省样本版协议：10 万真实步内拼成绩）；
- **思想遗产**：replay buffer 与目标网络成为几乎所有 off-policy 算法（SAC/TD-MPC 等）的标配零件；
- 局限：样本效率仍差（1000 万帧）、离散动作专用（连续版是 DDPG/SAC 的事）、ε-greedy 探索原始。

## 7. 读前须知

- **必前置**：[[40-Concepts/贝尔曼方程]]、[[40-Concepts/价值函数（V与Q）]]、[[40-Concepts/TD误差与自举]]、[[40-Concepts/on-policy与off-policy]]；
- **易混点**：①DQN 输出的是**每个动作一个数**（|A| 维），不是概率分布——策略是隐式的 $\arg\max$；②"目标网络"不是第二个用途不同的网络，是**同一网络的冷冻副本**；③ε-greedy 的 ε 与折扣 γ 是两个不相干的东西（探索强度 vs 远见程度）；
- **读法建议**：正文 3 页，先把图 1（架构）与算法 1 对着看；然后直接跳 2015 Nature 版的 49 游戏表感受"通用性"主张。
