---
type: paper
title: Progressive Distillation for Fast Sampling of Diffusion Models
aliases: [Progressive Distillation, 渐进蒸馏]
year: 2022
authors: [Tim Salimans, Jonathan Ho]
venue: ICLR 2022
arxiv: "2202.00512"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, 蒸馏(轨迹)]
tags: [paper]
---

# Progressive Distillation（渐进蒸馏）

## 1. 一句话贡献

把 1000+ 步的教师扩散模型逐轮蒸馏成步数减半的学生（1024→1 步），开启扩散加速的蒸馏路线。

## 2. 核心贡献

- **步数减半迭代**：每轮学生 2 步拟合教师相邻 2 步的联合轨迹
- **v-预测参数化**：蒸馏全程数值稳定的关键（ε-预测在极少步时崩）
- **自适应加权**：按噪声级加权蒸馏损失

## 3. 方法概要

1. 教师：标准 DDPM（N 步）
2. 学生初始化自教师，学"2 步走完教师 2 步的路径"
3. 下一轮以学生为新教师，重复直到 4/8/16…步
4. 损失：学生两步端点 vs 教师轨迹端点（加权的 v 空间 MSE）

## 4. 核心公式

- v-预测形式见 [[30-Formulas/DDPM训练目标]] §2 对照表
- 轨迹拟合目标（教师-学生 MSE）+ [[40-Concepts/采样器]]（DDIM 轨迹）

## 5. 与前作的关系

- 组合了 [知识蒸馏（Hinton KD，线 3 祖先）] 与 [[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]] 的确定性轨迹
- 奠基了 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]]（同为加速线）

## 6. 影响与后续

- v-预测因此扩散开（视频扩散/Sora 主用）
- 蒸馏加速范式：CM → [[Latent Consistency Models- Synthesizing High-Resolution Images with Few-Step Inference（LCM）]]
- 少步生成的商业价值（实时生成）自此路线展开

## 7. 读前须知

[[30-Formulas/DDIM更新规则]]、[[30-Formulas/DDPM训练目标]]（v-预测行）、[[40-Concepts/采样器]]
