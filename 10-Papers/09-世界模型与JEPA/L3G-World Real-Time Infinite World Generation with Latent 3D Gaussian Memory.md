---
type: paper
title: "L3G-World: Real-Time Infinite World Generation with Latent 3D Gaussian Memory"
aliases: []
year: 2026
authors: [Jinhyeok, Choi]
venue: 待核（占位层，来自 arXiv 2026-10-29）
arxiv: "2610.40614v1"
pdf: https://arxiv.org/pdf/2610.40614v1
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# L3G-World: Real-Time Infinite World Generation with Latent 3D Gaussian Memory

> **占位层卡**（daily 自动采集 2026-11-01 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Interactive world models generate visual content conditioned on user actions, yet maintaining spatial consistency over long-horizon exploration in real time remains challenging. Existing approaches rely on either temporal context or explicit 3D memory, both of which scale poorly because memory grows with the length of the generated stream. Moreover, explicit 3D memories condition latent video generators by re-encoding RGB renderings, which precludes real-time generation. In this paper, we introduce a Latent 3D Gaussian Memory (L3G) that combines the efficiency of feed-forward reconstruction wi

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 前身：[[10-Papers/02-生成建模与扩散/WorldCrafter Consistent Video World Model with Implicit 3D-aware Memory|WorldCrafter]]（隐式 3D 感知记忆的交互视频 WM——本文把 3D 记忆做成显式高斯并解决其扩展性与实时性瓶颈）
- ≡ 同族实时交互 WM：[[10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）|WorldPlay]]（长期几何一致轴）、[[10-Papers/09-世界模型与JEPA/minWM- 全栈实时交互世界模型框架（minWM）|minWM]]（实时全栈轴）——同族均止于生成指标
- ⊃ 载体：视频 DiT（[[10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）|DiT]]）＋每个高斯直存 VAE 潜特征（[[10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）|VAE]]），记忆免 RGB 重编码直渲染进 DiT 潜空间
- [[20-Algorithms/世界模型]] · [[40-Concepts/高斯分布]]（3D 高斯表征）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.40614v1；在线全文（新论文）：https://arxiv.org/html/2610.40614v1
