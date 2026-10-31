---
type: paper
title: "Beyond Distribution Matching: Self-Supervised Representation Forcing for Few-Step Video Generation"
aliases: []
year: 2026
authors: [Junyi, Chen]
venue: 待核（占位层，来自 arXiv 2026-10-26）
arxiv: "2610.35594v1"
pdf: https://arxiv.org/pdf/2610.35594v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Beyond Distribution Matching: Self-Supervised Representation Forcing for Few-Step Video Generation

> **占位层卡**（daily 自动采集 2026-10-27 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Few-step distillation is essential for deploying modern video diffusion models. Among existing approaches, Distribution Matching Distillation (DMD) has emerged as a highly promising paradigm by achieving strong output-space fidelity without adversarial training, while remaining flexible across various student architectures. We observe, however, that DMD fundamentally relies on an output-space objective, lacking explicit regularization on the model's internal representations. As the distillation step count aggressively shrinks, this output-only supervision becomes insufficient, causing the dist

## 1. 一句话贡献

诊断 DMD 少步蒸馏的结构性缺陷——**输出空间监督下学生内部表征完全无约束**，步数压到极少（K=4）时细粒度空间结构与时序动态双退化；开出处方 **SF²（Self Flow Forcing）**：从同一条蒸馏 rollout 取一脏一净两个状态，空间掩码拼成混合输入喂学生、净状态喂 EMA 教师，强制学生从更腐蚀视角**预测教师的内部表征**（余弦对齐+停梯度）——约 6% 额外开销、无外部特征提取器、双向/因果架构通用。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 前身 [[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]/[[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]：输出空间目标原样保留（$\mathcal{L}_{total}=\mathcal{L}_{DMD}+\lambda_{rep}\mathcal{L}_{rep}$），只叠加表征正则项
- → 底座与应用 [[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]（因果学生从其 ODE 回归 ckpt 初始化）· [[10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）|WorldPlay]]（蒸馏管线升级后相机/动作条件 adherence 显著升——控制信号保真的最近代理）
- 数学链 [[30-Formulas/蒸馏损失]] · [[30-Formulas/自监督掩码重建]]（预测式表征=MAE/V-JEPA 原理）· [[40-Concepts/JEPA联合嵌入预测架构]] · [[30-Formulas/逐token独立噪声]]（异质噪声造信息不对称）· [[20-Algorithms/一致性模型]]（少步家族另一支）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.35594v1；在线全文（新论文）：https://arxiv.org/html/2610.35594v1
