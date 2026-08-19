---
type: paper
title: Align Your Flow - Scaling Continuous-Time Flow Map Distillation
aliases: [Align Your Flow, AYF]
year: 2025
authors: [Aryan Garg, Devon Schroeder, et al. (Bosch/CMU)]
venue: arXiv 2025
arxiv: "2506.14603"
line: 生成建模与扩散
matrix_coords: [FM, flow map, 蒸馏预训练]
tags: [paper]
---

# Align Your Flow（AYF）

## 1. 一句话贡献

连续时间 **flow map 蒸馏**：学"从任意噪声到数据"的映射族而非固定轨迹——泛化一致性模型到任意端点，各步数区间均高效。

## 2. 核心贡献

- **任意噪声端点**：CM 只学"噪声→数据"，AYF 学 $F(x_t, t, s)$：任意 $(t,s)$ 对间的转移
- **Scale 拟合**：多步/单步混合训练日程
- 与 [[Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] 的对照：AYF 是**样本级 flow-map 一致性**，MFD 是**分布级期望速度**对齐（MFD 论文 §2.2 亲自对比）

## 3. 方法概要

1. 定义广义 flow map $F: (x_t, t, s) \mapsto x_s$
2. 一致性损失：沿教师 ODE 的 $(x_t, x_s)$ 对监督
3. 时间-步长联合采样训练
4. 多分辨率推理（1/2/4 步皆可用）

## 4. 核心公式

- $F(x_t, t, s) \approx x_s$（s<t 均可）——[[30-Formulas/概率流ODE]] 的"整段积分算子"参数化
- 与 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]：$F(x_t, t, 0)$ 退化为 CM

## 5. 与前作的关系

- 泛化了 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]（单端点→任意端点）
- 与 [[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）]] 同格不同机制（map 级 vs 速度级）——FM 加速矩阵的占位邻居

## 6. 影响与后续

- "flow map"成为 FM 加速矩阵独立机制轴（与平均速度轴并行）
- Scaling 训练日程被后续一步生成工作引用

## 7. 读前须知

[[30-Formulas/概率流ODE]]、[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]、[[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）]]

> 相关：[[Distribution Matching Distillation without Fake Score Network（FSF-DMD）]]

> 相关：[[EM Distillation for One-step Diffusion Models（EMD）]]

> 相关：[[Exploring Diffusion and Flow Matching Under Generator Matching（Generator Matching）]]

> 相关：[[Fast Sampling of Diffusion Models with Exponential Integrator（DEIS）]]

> 相关：[[Flow Generator Matching（FGM）]]

> 相关：[[GLIDE- Towards Photorealistic Image Generation and Editing with Text-Guided Diffusion Models（GLIDE）]]

> 相关：[[How to build a consistency model- Learning flow maps via self-distillation（HTBC）]]

> 相关：[[Imitation Learning Policy based on Multi-Step Consistent Integration Shortcut Model（MsciS）]]

> 相关：[[Improved Training Technique for Shortcut Models（Shortcut改进版）]]

> 相关：[[Let 2D Diffusion Model Know 3D-Consistency for Robust Text-to-3D Generation（3D一致性）]]

> 相关：[[MeanFlow-TSE- One-Step Generative Target Speaker Extraction with Mean Flow（MeanFlow-TSE）]]

> 相关：[[On the Inverse Flow Matching Problem in the One-Dimensional and Gaussian Cases（逆FM问题）]]

> 相关：[[One Diffusion Step to Real-World Super-Resolution via Flow Trajectory Distillation（OSEDiff）]]

> 相关：[[One-step Diffusion Models with f-Divergence Distribution Matching（f-distill）]]

> 相关：[[Path-Guided Flow Matching for Dataset Distillation（PGFM）]]

> 相关：[[Perceptual Flow Matching for Few-Step Generative Modeling（PFM）]]

> 相关：[[Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding（Imagen）]]

> 相关：[[PixArt-alpha- Fast Training of Diffusion Transformer for Photorealistic Text-to-Image Synthesis（PixArt-α）]]

> 相关：[[Progressive Growing of GANs for Improved Quality, Stability, and Variation（PGGAN）]]

> 相关：[[Prompt-to-Prompt Image Editing with Cross Attention Control（P2P）]]

> 相关：[[ProReflow- Progressive Reflow with Decomposed Velocity（ProReflow）]]

> 相关：[[Reinforcing Few-step Generators via Reward-Tilted Distribution Matching（RTDM）]]

> 相关：[[ScaleDreamer- Scalable Text-to-3D Synthesis with Asynchronous Score Distillation（ScaleDreamer）]]

> 相关：[[Score Distillation of Flow Matching Models（SDS-FM）]]

> 相关：[[SDXL- Improving Latent Diffusion Models for High-Resolution Image Synthesis（SDXL）]]

> 相关：[[Self-Corrected Flow Distillation（SelfCorrect）]]

> 相关：[[Shortcutting Pre-trained Flow Matching Diffusion Models is Almost Free Lunch（Shortcutting）]]

> 相关：[[Spectral Normalization for Generative Adversarial Networks（SNGAN）]]

> 相关：[[Statistical Properties of Rectified Flow（RF统计理论）]]

> 相关：[[Teacher-Feature Drifting- One-Step Diffusion Distillation with Pretrained Diffusion Representations（TFD）]]

> 相关：[[Text-to-Image Rectified Flow as Plug-and-Play Priors（RF先验）]]

> 相关：[[Towards Hierarchical Rectified Flow（HRFlow）]]

> 相关：[[Trajectory as the Teacher- Few-Step Discrete Flow Matching via Energy-Navigated Distillation（FS-DFM）]]

> 相关：[[Transition Matching Distillation for Fast Video Generation（TMD视频）]]

> 相关：[[Variational Rectified Flow Matching（VRFM）]]

> 相关：[[Vector Quantized Diffusion Model for Text-to-Image Synthesis（VQ-Diffusion）]]
