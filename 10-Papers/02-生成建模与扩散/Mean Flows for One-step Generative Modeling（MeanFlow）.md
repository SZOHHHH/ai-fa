---
type: paper
title: Mean Flows for One-step Generative Modeling
aliases: [MeanFlow, Mean Flow]
year: 2025
authors: [Zhengyang Geng, Mingyang Deng, Xingjian Bai, J. Zico Kolter, Kaiming He]
venue: arXiv 2025（Tech Report）
arxiv: "2505.13447"
line: 生成建模与扩散
matrix_coords: [FM, 平均速度, 从头训练]
tags: [paper]
---

# MeanFlow（平均流一步生成）

## 1. 一句话贡献

把流匹配的训练目标从瞬时速度换成**平均速度**——单模型单阶段从头训练直接一步生成，免蒸馏免教师，何恺明团队作品。

## 2. 核心贡献

- **平均速度监督**：$\bar u(x_t, t, r) = \frac{1}{r}\int$ 目标不再是 $u_t$ 而是 $[t, t+r]$ 的平均
- **免蒸馏一步生成**：与蒸馏路线（教师→学生）相反，从零训练即得一步模型
- ResNet-50 ImageNet 无教师一步生成 SOTA；FLUX 骨干微调到 8 步高性能

## 3. 方法概要

1. 定义平均速度场 $\bar u$（含 r 参数：窗口长度）
2. 训练损失：JVP（Jacobian-vector product）技术免二阶导
3. EMA 目标网络稳定训练（改进版处理目标依赖）
4. 一步推理：$x_1 = x_0 + r \cdot \bar u(x_0)$

## 4. 核心公式

- 平均速度恒等式：$\bar u(x_t, t, r) = \frac{x_{t+r} - x_t}{r}$（位移均分）
- 目标：$\mathbb{E}\| v_\theta - \bar u_{\text{target}} \|^2$——[[30-Formulas/条件流匹配损失]] 的平均化变体

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Flow Matching for Generative Modeling（流匹配）]]：瞬时→平均，一步生成为直接目标
- 对照蒸馏系（[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]/[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]）：免教师路线的代表作
- **被 [[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 发展**：[[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）]] 把它从"从头训练"格推到"蒸馏预训练"格

## 6. 影响与后续

- 2025 FM 加速最重要新作之一；衍生 Improved MeanFlow、Riemannian MeanFlow（2602.07744）等族系
- "平均速度"成为 FM 加速矩阵的独立机制轴（与蒸馏/一致性并列）

## 7. 读前须知

[[30-Formulas/条件流匹配损失]]、[[10-Papers/02-生成建模与扩散/Flow Matching for Generative Modeling（流匹配）]]、[[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）]]
