---
type: paper
title: An ODE-based Sampler for Discrete Diffusion Models
aliases: [ERF, Exponential Residual Flows]
year: 2026
authors: [Samson Gourevitch, Yazid Janati, Eric Moulines, Eric P. Xing, Alain Durmus, Giacomo Zanella]
venue: 待核（arXiv 2026-10-29）
arxiv: "2610.40618v1"
pdf: https://arxiv.org/pdf/2610.40618v1
line: 生成建模与扩散
matrix_coords: [离散扩散, 概率流ODE类比, 一致性蒸馏移植]
tags: [paper]
---
# ERF：离散扩散模型的 ODE 采样器（指数残差流）

> 中文速览：给离散扩散模型构造概率流 ODE 的类比——指数残差流（ERF）：给每个 token 位置增配一个连续残差变量，按分段定义的 ODE 确定性演化（向量场依赖当前离散状态与前向/反向速率矩阵），残差触零时离散状态跳变；证明该构造保持原扩散过程的边缘分布，导出实用离散化格式并特化到掩码/均匀扩散两类。确定性轨迹使一致性蒸馏得以移植到离散域，代码与文本生成基准上超越既有做法。

## 1. 一句话贡献

为离散扩散补上连续扩散享有多年的概率流 ODE 基础设施：状态增广（离散 token+连续残差）后确定性演化且边缘分布不变——确定性轨迹让加速采样与一致性蒸馏第一次在离散域有了 ODE 级理论支点。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 前身：连续扩散的概率流 ODE 理论（[[30-Formulas/概率流ODE]]）+ 离散扩散框架（[[10-Papers/02-生成建模与扩散/Vector Quantized Diffusion Model for Text-to-Image Synthesis（VQ-Diffusion）|VQ-Diffusion]] 的类别转移噪声与 D3PM 系，未全入库）；
- ≡ 同族近邻（261103）：[[10-Papers/02-生成建模与扩散/Bernoulli Flow Models Self-Consistent Generative Modeling for Binary Data|Bernoulli Flow Models]]（离散/二值数据的连续时间生成路线）· [[10-Papers/02-生成建模与扩散/Asynchronous Flow Map Language Models|aFMLM]]（同为「给离散/token 生成配连续时间结构」的努力）；
- → 后续：离散域一致性蒸馏（其确定性轨迹直接支撑）——[[20-Algorithms/一致性模型]] 的离散移植通道；
- 概念链：[[40-Concepts/常微分方程（ODE）]] · [[40-Concepts/马尔可夫链]]（速率矩阵/转移核）· [[40-Concepts/采样器]] · [[30-Formulas/蒸馏损失]] · [[20-Algorithms/扩散模型]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.40618v1；在线全文（新论文）：https://arxiv.org/html/2610.40618v1

---

> 谱系枢纽：[[10-Papers/02-生成建模与扩散/Vector Quantized Diffusion Model for Text-to-Image Synthesis（VQ-Diffusion）|VQ-Diffusion]]（图谱连通入口）

> 数学根基：[[30-Formulas/概率流ODE]] · [[40-Concepts/马尔可夫链]] · [[40-Concepts/常微分方程（ODE）]]
