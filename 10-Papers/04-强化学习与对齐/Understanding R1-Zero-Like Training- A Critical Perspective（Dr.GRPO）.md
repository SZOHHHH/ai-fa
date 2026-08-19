---
type: paper
layer: 占位
title: Understanding R1-Zero-Like Training- A Critical Perspective
aliases: [Dr.GRPO]
year: 2025
authors: [（复旦大学系）]
venue: arXiv 2025
arxiv: "2503.20783"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [GRPO, —, 序列级]
tags: [paper, 占位层]
---

# Understanding R1-Zero-Like Training- A Critical Perspective（Dr.GRPO·七节版）

## 1. 一句话贡献

GRPO 的偏置诊断：除以序列长度（/std）引入长短偏置与难度偏置——Dr.GRPO（GRPO Done Right）去掉归一化分母。

## 2. 核心贡献

1. GRPO 的偏置诊断：除以序列长度（/std）引入长短偏置与难度偏置
2. Dr.GRPO（GRPO Done Right）去掉归一化分母。

## 3. 方法概要

分析 R1-Zero 式训练的四个偏置，证明 ||o|| 与 std 归一化引入系统性偏置；去偏后性能持平或更好。

## 4. 核心公式

$$
\mathcal{L}_{\text{Dr.GRPO}} = \frac{1}{\sum|o|}\sum_i \frac{1}{|o_i|}\sum_t \rho_{i,t} \hat A_{i,t}\ \text{(去 std/长度偏置的重新加权)}
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 占 GRPO×偏置修正格；≡ [[DAPO- An Open-Source LLM Reinforcement Learning System at Scale（DAPO）]]（同款偏置两条修法）；B8 遗留补卡


## 6. 影响与占位意义

"聚合替代锚定"共振的对偶面：识别并删除有害的归一化聚合。

> 近邻同族：[[DCPO- Dynamic Clipping Policy Optimization（DCPO）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[REINFORCE目标]]

## 7. 读前须知

需要：组相对优势（组均值即基线）；importance ratio；裁剪的软硬对偶；隐式奖励的 MC 估计
