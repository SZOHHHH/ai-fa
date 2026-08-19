---
type: paper
title: Training Compute-Optimal Large Language Models
aliases: [Chinchilla]
year: 2022
authors: [Jordan Hoffmann, Sebastian Borgeaud, Arthur Mensch, et al.]
venue: NeurIPS 2022
arxiv: "2203.15556"
line: 标杆锚点
tags: [paper]
---

# Chinchilla（算力最优）

## 1. 一句话贡献

修正 Kaplan 缩放定律：同算力下"小参数×多数据"完胜"大参数×少数据"——70B Chinchilla 击败 280B Gopher，全行业训练配比重写。

## 2. 核心贡献

- **三种估计法收敛同一结论**：固定参数调数据 / 固定数据调参数 / 等风险线拟合——$D^* \propto N^{0.74}$（数据与参数近似同速扩）
- **"GPT-3 们欠训练"**：按新定律原配置只用够了算力的 1/3 效率
- 70B/1.4T token 配方

## 3. 方法概要

1. 训练 400+ 模型（70M–16B，5B–900B token）
2. 拟合 $L(N, D) = E + A/N^{\alpha} + B/D^{\beta}$（$\alpha \approx 0.34, \beta \approx 0.28$）
3. 算力约束 $C \approx 6ND$ 下求最优 $(N^*, D^*)$
4. 结论：$N^*, D^* \propto C^{0.5}$ 量级（同速增长）

## 4. 核心公式

- $L(N,D) = E + A N^{-0.34} + B D^{-0.28}$（修正 [[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]] 的 0.76/0.09）
- 对比表：Kaplan $\alpha_N=0.76, \alpha_D=0.09$ → Chinchilla $\alpha_N=0.34, \alpha_D=0.28$——**数据项权重翻三倍**

## 5. 与前作的关系

- 修正了 [[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]]（Kaplan）的拟合偏置（学习率调度与参数耦合）
- 直接指导 [[10-Papers/01-架构演进/LLaMA- Open and Efficient Foundation Language Models（LLaMA）]] 的"小模型喂饱数据"路线

## 6. 影响与后续

- "Chinchilla-optimal"成为训练预算术语；LLaMA 进一步转向"推理最优"（过训小模型）
- 后续 compute-optimal 讨论分支：数据重复、推理成本视角（2023–25）

## 7. 读前须知

[[10-Papers/01-架构演进/Scaling Laws for Neural Language Models（Scaling Laws）]]（对照必读）

> 数学根基：[[注意力核心公式]]
