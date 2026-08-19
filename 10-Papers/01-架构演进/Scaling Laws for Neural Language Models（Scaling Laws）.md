---
type: paper
title: Scaling Laws for Neural Language Models
aliases: [Scaling Laws, Kaplan Laws, Chinchilla前身]
year: 2020
authors: [Jared Kaplan, Sam McCandlish, Tom Henighan, Tom B. Brown, et al.]
venue: arXiv 2020
arxiv: "2001.08361"
line: 架构演进
matrix_coords: [全注意力, 缩放律, 无状态]
tags: [paper]
---

# Scaling Laws（Kaplan 缩放定律）

## 1. 一句话贡献

损失随参数/数据/算力呈平滑幂律——大模型的"可预测性"首次成为科学，"大力出奇迹"的数学依据。

## 2. 核心贡献

- **幂律拟合**：$L(N, D, C) \approx \min$ over 幂律形式——损失可外推预测
- **算力最优分配的早期结论**：固定算力下大模型少数据优于小模型多数据
- 跨 6 个数量级验证（1e3→1e11 参数当量）

## 3. 方法概要

1. 训 400+ 模型（参数 1e3–1e9、数据 5B–500B token）
2. 拟合 $L(N,D) = E + \frac{A}{N^{0.76}} + \frac{B}{D^{0.09}}$（各贡献项可加）
3. 算力约束下求最优 $(N^*, D^*)$ 分配
4. 结论：早期算力应优先砸参数

## 4. 核心公式

- 幂律损失：$L = E + (A/N^{\alpha_N}) + (B/D^{\alpha_D})$
- **Chinchilla 修正对照**（2022，2112.11446）：$\alpha_N = 0.34, \alpha_D = 0.28$ → $D^* \propto N^{0.74}$（参数数据同步扩）——Kaplan 结论被大幅修正（欠训练时代结束）

## 5. 与前作的关系

- 前置于 Chinchilla（B6 标杆批回填链接）：同一问题两次回答
- 与 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 同团队——GPT-3 的规模选择背后是它

## 6. 影响与后续

- 全行业的训练预算分配框架（GPT-4/LLaMA/DeepSeek 的参数-数据决策全引用此谱系）
- Chinchilla 纠偏后进入"token 饥饿"时代（1T+ token 训练）
- 涌现能力讨论（B6 Emergent Abilities）的反面参照——平滑 vs 跳变之争

## 7. 读前须知

无重数学门槛；建议与 Chinchilla 对照读（同公式不同拟合）

> 近邻同族：[[An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）]] · [[Attention Is All You Need（Transformer）]]

> 数学根基：[[注意力核心公式]]
