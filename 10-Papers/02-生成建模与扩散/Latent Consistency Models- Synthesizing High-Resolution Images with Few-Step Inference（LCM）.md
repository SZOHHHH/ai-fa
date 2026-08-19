---
type: paper
title: Latent Consistency Models - Synthesizing High-Resolution Images with Few-Step Inference
aliases: [LCM]
year: 2023
authors: [Simian Luo, Yiqin Tan, Longbo Huang, et al.]
venue: arXiv 2023
arxiv: "2310.04378"
line: 生成建模与扩散
matrix_coords: [潜扩散, 一致性, 蒸馏预训练]
tags: [paper]
---

# LCM（潜一致性模型）

## 1. 一句话贡献

一致性蒸馏搬进**潜空间**（SD 的 latent 域）——2–4 步文生图高质量输出，把一步生成从学术基准推向消费级 AIGC 应用。

## 2. 核心贡献

- **潜空间一致性蒸馏**：solver-free 教师 ODE 轨迹 + 潜域自洽约束
- ** Skipping-steps 调度**：跳步采样一致性
- LCM-LoRA：蒸馏出的“少步能力”存成 LoRA 可插拔——**蒸馏+PEFT 组合的典范**

## 3. 方法概要

1. 教师：预训练 [[High-Resolution Image Synthesis with Latent Diffusion Models（LDM）|LDM]]（冻结）
2. 学生在潜空间学一致性映射
3. 教师逐步 ODE 解当目标
4. 可选 LoRA 蒸馏（数 KB 权重换 4 步生成）

## 4. 核心公式

- 一致性损失 + 潜域蒸馏目标——[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]] 的潜空间实例化
- LCM-LoRA 组合 [[30-Formulas/LoRA分解]]

## 5. 与前作的关系

- 组合了 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]] + [[10-Papers/02-生成建模与扩散/High-Resolution Image Synthesis with Latent Diffusion Models（LDM）]]
- 同期 [[10-Papers/02-生成建模与扩散/Multistep Consistency Models（MCM）]]：多步化 vs 潜空间化——同格两优化方向

## 6. 影响与后续

- SD-Turbo/LCM-LoRA 生态；少步生成的工业标配组件
- “能力存成 LoRA”模式影响后续加速方案分发

## 7. 读前须知

[[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]、[[10-Papers/02-生成建模与扩散/High-Resolution Image Synthesis with Latent Diffusion Models（LDM）]]、[[30-Formulas/LoRA分解]]
