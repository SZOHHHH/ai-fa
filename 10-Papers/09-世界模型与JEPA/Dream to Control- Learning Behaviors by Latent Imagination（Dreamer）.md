---
type: paper
title: Dream to Control - Learning Behaviors by Latent Imagination
aliases: [Dreamer, DreamerV1]
year: 2020
authors: [Danijar Hafner, Timothy Lillicrap, Jimmy Ba, Mohammad Norouzi]
venue: ICLR 2020
arxiv: "1912.01603"
line: 世界模型与JEPA
matrix_coords: [奖励驱动(RL内部模型), 潜在状态, 游戏控制(RL)]
tags: [paper]
---

# Dreamer（潜空间想象 RL）

## 1. 一句话贡献

RSSM（确定+随机混合状态）世界模型 + 想象中反向传播的策略梯度——世界模型从概念演示变成通用 RL 引擎。

## 2. 核心贡献

- **RSSM**：$h_t = f(h_{t-1}, z_{t-1}, a_{t-1})$（确定路径）+ $z_t \sim p(z_t\mid h_t)$（随机采样）——稳定性与随机性兼得
- **想象内梯度直传**：策略梯度穿过想象 rollout 的图（不是纯黑盒 RL）
- 各环境全面超模型无关基线（同期）

## 3. 方法概要

1. 世界模型：RSSM 学转移 + 解码重建 + 奖励预测
2. Actor 在想象轨迹上最大化回报（梯度经模型反传）
3. Critic 估计价值稳方差
4. 真实环境只用于采数据，训练全在想象

## 4. 核心公式

- [[20-Algorithms/世界模型]] §3：想象轨迹上的 $\max_\pi \mathbb{E}$——两层嵌套期望
- 价值/策略：[[40-Concepts/贝尔曼方程]] + [[40-Concepts/策略梯度定理]] 在想象空间实例化

## 5. 与前作的关系

- 工程化了 [[10-Papers/09-世界模型与JEPA/World Models（世界模型）]] 的概念（线性控制器 → 深度策略 + 梯度法）
- 后续 DreamerV2（离散隐状态）/V3（跨域稳定）持续迭代

## 6. 影响与后续

- 模型基 RL 主流路线；[[Mastering Diverse Domains through World Models（DreamerV3）|DreamerV3]]（Minecraft 钻石）出圈
- "世界模型 + 想象规划"成为具身智能标准叙事

## 7. 读前须知

[[20-Algorithms/世界模型]]、[[40-Concepts/马尔可夫决策过程]]、[[40-Concepts/贝尔曼方程]]

> 谱系成员（26）：[[Analytic Planning under Uncertainty with Moment Closure（矩闭合规划）]] · [[Co-Evolving Latent Action World Models（CoLA）]] · [[Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）]] · [[DF3- World Modeling via Decoder-Free Feature Forecasting in Autonomous Navigation（DF3）]] · [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）]] · [[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]] · [[Factored Latent Action World Models（FLAM）]] · [[Genie 2- A Large-Scale Foundation World Model（Genie 2）]] · [[Genie- Generative Interactive Environments（Genie）]] · [[Hierarchical Planning with Latent World Models（HPLWM）]] · [[Latent Action Pretraining from Videos（LAPA）]] · [[LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies（LaWAM）]] · …等 26 篇

> 数学根基：[[RSSM转移模型]] · [[ELBO]]
