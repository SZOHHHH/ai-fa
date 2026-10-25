---
type: paper
title: "DivMoE: Fine-Grained MoE Upcycling via Cross-Domain Expert Composition"
aliases: [DivMoE]
year: 2026
authors: [Yuxuan, Lou]
venue: arXiv 2610.11317（2026-10-08）
arxiv: "2610.11317v1"
pdf: https://arxiv.org/pdf/2610.11317v1
line: MoE
matrix_coords: [细粒度MoE, Upcycling(域特化专家初始化), 多样性约束路由(跨域组合)]
tags: [paper, 精读层]
layer: 精化层（摘要级+摘要核实，全文待深读）
---
# DivMoE: Fine-Grained MoE Upcycling via Cross-Domain Expert Composition

## 1. 一句话贡献
量化并修复细粒度 MoE upcycling 的结构病理——单源稠密模型切出的细粒度专家 + 朴素路由会塌到近随机（Qwen3-1.7B 上 23.2% ≈ 从头训 22.2%，同法粗粒度却有 50.2%）——用"域特化专家初始化 + 多样性硬约束路由"首次做出结构均衡的细粒度 upcycling。

## 2. 核心贡献
- **病理量化**：细粒度 upcycling（Drop-Upcycling 类）在 Qwen3-1.7B 上 15 基准平均仅 23.2%，与从头训持平；粗粒度变体 50.2%——问题出在"单源切细"的结构同质化。
- **域特化专家初始化**：专家从经过域自适应持续预训练的源模型导出，天然带域偏置（首个结构均衡的细粒度 upcycling 框架）。
- **多样性约束路由**：硬约束保证每个 token 激活的专家来自互异的域组。
- **实证**：Qwen3-1.7B 上 55.6% vs 最强基线 51.6%，且 Stage 2 后每个基准都严格超过稠密基座；12B 版 SFT 后 64.5% 追平 Moonlight-MoE 16B、超 NVIDIA upcycling 对照 6.1pt。

## 3. 方法概要
1. 同一基座分别做不同域的持续预训练，得到多个域特化源模型；
2. 从每个源模型切出细粒度专家（继承域分化，避免"全部同质碎片"）；
3. 路由加硬约束：每个 token 的 top-K 必须落在不同域组上（强制跨域组合）；
4. upcycle 后 Stage 2 继续预训练收编，弥合回归缺口。

## 4. 核心公式
- 多样性约束（按摘要重述）：被激活专家的域组互异数 $$=$$ 激活数，即 $$\bigl\lvert \mathrm{domains}(\mathrm{TopK}(x)) \bigr\rvert = K$$
  - 直觉：把"细粒度"从同质碎片改成"跨域乐高"——路由即使想塌，也没有同质专家可塌，组合性由结构保证。
- 路由本体见[MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)。

## 5. 与前作/矩阵关系
- ← 前身：[DeepSeekMoE](/ai-fa/explore/10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）)（细粒度专家范式，从零训练版）；
- upcycling 族：[MoRE](/ai-fa/explore/10-Papers/05-MoE/MoRE Mixture of Reused Experts)（专家复用路线）；细粒度对照 [From Experts to Sub-experts](/ai-fa/explore/10-Papers/05-MoE/From Experts to Sub-experts Fine-grained Parameter-Efficient Fine-Tuning for MoE LLMs)；
- 锚：[混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）) · [MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)。

## 6. 影响后续
- upcycling 路线"细粒度可行性"的首个证明；域分组先验与同日 [RouterInterp](/ai-fa/explore/10-Papers/05-MoE/RouterInterp Understanding Superposed Specialisation in Mixture of Experts Routing) 的 SSH（专家=特征不相交并集）形成呼应——域组就是受控的"叠加"单元。

## 7. 读前须知
- 前置：upcycling 概念（稠密→稀疏改造）、[MoE门控公式](/ai-fa/explore/30-Formulas/MoE门控公式)。
- 原文：https://arxiv.org/pdf/2610.11317v1 ｜ 在线全文：https://arxiv.org/html/2610.11317v1
