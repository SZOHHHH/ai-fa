---
type: paper
title: Consistency Models
aliases: [CM, Consistency Models, 一致性模型论文]
year: 2023
authors: [Yang Song, Prafulla Dhariwal, Mark Chen, Ilya Sutskever]
venue: ICML 2023
arxiv: "2303.01469"
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, 一致性(自举)]
tags: [paper]
---

# Consistency Models（一致性模型）

## 1. 一句话贡献

定义"自洽映射"：同一条概率流 ODE 轨迹上的任意点都映到同一起点——一步生成，零步迭代。

## 2. 核心贡献

- **一致性性质**：$f_\theta(x_t, t) = f_\theta(x_{t'}, t')$（同轨道）+ 边界条件 $f_\theta(x_0,0)=x_0$
- **两种训练法**：一致性蒸馏（有教师）/ 一致性训练（无教师，自举）
- **一步生成 + 多步精化**：一步可出图，多步迭代可提质量
- **免对抗**：纯回归家族（对比 [[Generative Adversarial Networks（GAN）|GAN]] 蒸馏路线）

## 3. 方法概要

1. 参数化保证边界：$f_\theta(x,t) = c_{\text{skip}}(t)\,x + c_{\text{out}}(t)\,F_\theta(x,t)$（$t=0$ 时恒等）
2. 蒸馏式：教师 PF-ODE 相邻两点 $(x_t, x_{t'})$，拉近 $f_\theta$ 输出（EMA 教师）
3. 训练式：无教师，网络自身相邻输出自洽
4. 采样：一步 $f_\theta(x_T, T)$；或多步交替去噪-加噪精化

## 4. 核心公式

- 一致性约束与损失（本文核心）；轨道定义见 [[30-Formulas/概率流ODE]]
- 教师轨迹来自 [[30-Formulas/DDIM更新规则]]

## 5. 与前作的关系

- 改进了 [[10-Papers/02-生成建模与扩散/Progressive Distillation for Fast Sampling of Diffusion Models（渐进蒸馏）]]：从"步数减半"到"一步"，且提供无教师路线
- 对比 [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]：点对点自洽 vs 分布层面匹配

## 6. 影响与后续

- LCM（潜空间一致性蒸馏）→ SDXL-Turbo/LCM-LoRA 实用化
- 一致性训练思想外溢到流匹配（一致性 FM、Mean Flows 2024–25）
- 一步生成的理论地位：ODE 轨迹自洽性的直接利用

## 7. 读前须知

[[30-Formulas/概率流ODE]]、[[30-Formulas/DDIM更新规则]]、[[40-Concepts/常微分方程（ODE）|常微分方程]]、[[20-Algorithms/一致性模型]]
