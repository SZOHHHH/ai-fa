---
type: paper
title: Consistent Distribution Matching for Data-Free Diffusion Distillation
aliases: []
year: 2026
authors: [Yuxiang, Fu]
venue: 待核（占位层，来自 arXiv 2026-10-06）
arxiv: "2610.09221v1"
pdf: https://arxiv.org/pdf/2610.09221v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Consistent Distribution Matching for Data-Free Diffusion Distillation

> **占位层卡**（daily 自动采集 2026-10-08 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Flow and diffusion models suffer from slow inference due to computationally expensive numerical integration. Distillation provides a promising way for a student model to learn from a teacher's dynamics, enabling one-step or few-step generation. However, existing methods often depend on curated distillation datasets, costly teacher rollouts, or auxiliary proxy networks, which complicate model training and scaling. In this work, we propose Consistent Distribution Matching, a simulation-free and data-free distillation method for accelerating diffusion and flow models while preserving strong gener

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/扩散模型]] · [[20-Algorithms/一致性模型]] · [[30-Formulas/蒸馏损失]]
- ← 直系 DMD 家族：[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（分布匹配蒸馏开山）→ CDM 去掉其数据集与代理网络依赖，学生一网双任（采样＋分数估计）
- ≡ 同代"无数据/去代理"路线：[[10-Papers/02-生成建模与扩散/Distribution Matching Distillation without Fake Score Network（FSF-DMD）|FSF-DMD]]（去 fake score 网络）/[[10-Papers/02-生成建模与扩散/EM Distillation for One-step Diffusion Models（EMD）|EMD]]（E1 的蒸馏引擎）/[[10-Papers/02-生成建模与扩散/Inductive Moment Matching（IMM）|IMM]]（simulation-free 自蒸馏）
- 2601008 挂链：蒸馏对象＝图像生成本身、指标＝FID——共通红线"蒸馏目标只用像素/生成质量指标"命中；与 E1 的差＝无 WM rollout、无决策保真，🟡 格不同轴同须划界

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.09221v1；在线全文（新论文）：https://arxiv.org/html/2610.09221v1
