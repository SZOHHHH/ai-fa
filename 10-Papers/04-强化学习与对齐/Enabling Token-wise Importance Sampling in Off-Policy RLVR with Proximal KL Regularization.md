---
type: paper
title: "Enabling Token-wise Importance Sampling in Off-Policy RLVR with Proximal KL Regularization"
aliases: [Token-wise IS]
year: 2026
authors: [Hao, Bai]
venue: arXiv 2610.18738（cs.LG，2026-10-13）
arxiv: "2610.18738v1"
pdf: https://arxiv.org/pdf/2610.18738v1
line: 强化学习与对齐（rl-alignment 轮换）
matrix_coords: [off-policy RLVR, token级重要性采样(免序列比率连乘), 近端KL正则, 精确近端优化器=更新唯一不动点, 连续时间表格种群动力学收敛性]
tags: [paper, 精化层（摘要级）]
layer: 精化层（摘要级精读）
---
# Enabling Token-wise Importance Sampling in Off-Policy RLVR with Proximal KL Regularization

> 精化升级 2026-10-14（每日日常处理段，摘要级）：token 级重要性权重避免整条回复的似然比连乘（方差爆炸源），但有偏——证明在覆盖与局部表达性条件下，全未来 KL 信用使精确近端优化器成为更新的唯一不动点策略，从而"无偏地"启用 token 级采样。

## 1. 一句话贡献
解决 off-policy RLVR（异步生成/ rollout-训练错配/回复复用）里 token 级重要性加权的固有偏置：证明在覆盖与局部表达性条件下，把信用放到全未来 KL 上，精确近端优化器就是该更新的唯一平稳策略（对旧策略混合亦成立，无需全回复权重或拟合 critic），并建立连续时间表格种群动力学的收敛性——token 级重要性采样由此被理论正名。

## 2. 核心贡献
- **偏置来源定位**：序列级重要性权重=逐 token 比率连乘，方差随回复长度爆炸；token 级权重免连乘但截断了跨 token 信用，一般有偏。
- **正名定理**：覆盖+局部表达性条件下，"全未来 KL 信用"使精确近元优化器成为更新的唯一平稳策略——token 级加权不再引入系统偏。
- **收敛性**：连续时间表格种群动力学收敛证明（无 critic、无全回复权重、容忍旧策略混合——正对异步/复用场景）。

## 3. 方法概要
（摘要级）①off-policy 数据三来源（异步生成/错配/复用）→需要重要性校正；②改用 token 级比率加权策略梯度；③近端 KL 正则（对未来分布而非单 token）承担跨 token 信用；④证明该更新以精确近端优化器为唯一平稳点；⑤连续时间表格极限下证收敛。

## 4. 核心公式
- 序列 vs token 级比率（统一记号）：$\rho_{\text{seq}} = \prod_{t=1}^{T} \frac{\pi_\theta(a_t \mid a_{<t})}{\pi_{\text{old}}(a_t \mid a_{<t})}$ 对比 $\rho_t = \frac{\pi_\theta(a_t \mid a_{<t})}{\pi_{\text{old}}(a_t \mid a_{<t})}$（直觉：连乘让 T 长 回复的方差指数涨；单 token 比率有界但丢掉"这一步影响后续分布"的信用——这正是要用未来 KL 补的部分）
- 近端正则目标（摘要级重构）：$\max_\pi\; \mathbb{E}_{a \sim \pi_{\text{old}}}\left[\sum_t \rho_t A_t\right] - \beta\, \mathbb{E}_{t}\left[\mathrm{KL}\left(\pi(\cdot \mid a_{<t}) \,\|\, \pi_{\text{old}}(\cdot \mid a_{<t})\right)_{\text{未来信用}}\right]$（直觉：KL 项不再只当信任域看门人，而是把"本 token 对未来的因果影响"折进信用——精确近端优化器是这股力的唯一平衡点）

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/重要性采样]] · [[40-Concepts/on-policy与off-policy]] · [[40-Concepts/KL散度]] · [[40-Concepts/信赖域]] · [[30-Formulas/PPO裁剪目标]]（裁剪=暴力截断比率的对照路线）· [[20-Algorithms/GRPO与RLVR]]
- ≡ 同族：[[10-Papers/04-强化学习与对齐/HISPO Hierarchical Importance-Sampling Policy Optimization with Entropy-Derived Segments|HISPO]]（分段重要性采样近邻）· [[10-Papers/04-强化学习与对齐/DCPO- Dynamic Clipping Policy Optimization（DCPO）|DCPO]]（裁剪动态化对照）
- ← 前身：PPO/GRPO 的序列级比率惯例 → 此文论证 token 级可行条件

## 6. 影响后续
- off-policy RLVR（异步 rollout、回复复用省算力）的理论地基之一；"信用放未来 KL"给 token 级方法开了正名通道。

## 7. 读前须知
- 前置：[[40-Concepts/重要性采样]]（为何需要比率校正）、[[30-Formulas/PPO裁剪目标]]（序列比率的工程妥协史）、[[40-Concepts/KL散度]]（正则与信任域双重视角）。
- 原文：https://arxiv.org/pdf/2610.18738v1 ｜ 在线全文：https://arxiv.org/html/2610.18738v1（本卡摘要级，正文含定理条件与种群动力学推导）
