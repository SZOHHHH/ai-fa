---
type: paper
title: DeepSeekMoE - Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models
aliases: [DeepSeekMoE]
year: 2024
authors: [Damai Dai, Chengqi Deng, Chenggang Zhao, et al.]
venue: arXiv 2024
arxiv: "2401.06066"
line: MoE
matrix_coords: [token级, 细粒度分段, 辅助均衡损失]
tags: [paper]
pdf: 已下载（PDF/）
---

# DeepSeekMoE

## 1. 一句话贡献

细粒度专家切分 + 共享专家常驻——"专家专业化"的结构化设计，小激活量打平/超越粗粒度大专家。

## 2. 核心贡献

- **细粒度**：N 个大专家 → mN 个小专家（选 k 个小专家而非少数大专家）——组合自由度大增
- **共享专家**：$$K_s$$ 个常开专家承担公共知识，路由专家专心特化
- 16B 模型 ≈ Mixtral 40% 计算量同性能

## 3. 方法概要

1. 每层专家切细（如 64 个）
2. 路由 top-k（如 6）+ 共享 2 个常开
3. 输出 = 共享专家和 + 路由专家加权和
4. 辅助均衡损失（segment-wise）

## 4. 核心公式

- [MoE门控公式](/explore/30-Formulas/MoE门控公式) §2 DeepSeekMoE 行
- $$y = \sum_{i \in \text{shared}} E_i(x) + \sum_{i \in \text{routed topk}} G_i(x) E_i(x)$$

## 5. 与前作的关系

- 改进了 [Mixtral of Experts](/explore/10-Papers/05-MoE/Mixtral of Experts（Mixtral）)/Switch 的粗粒度专家：结构化专业化
- 被 [DeepSeek-V2 - A Strong, Economical, and Efficient Mixture-of-Experts Language Model](/explore/10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）)（V2/V3/R1）直接继承

## 6. 影响与后续

- DeepSeek-V2/V3/R1 的 MoE 骨架——低成本训练的组件之一
- "共享专家"被 Qwen 等广泛采纳

- → 后继补记（260914）：[SMELT](/explore/10-Papers/05-MoE/SMELT - Scaling Laws for Compute-Matched MoE Looped Transformers（循环MoE缩放律）)（MoE×循环深度复用的计算匹配 scaling）、[Pelican-Sim 1.0](/explore/10-Papers/09-世界模型与JEPA/Pelican-Sim 1.0 - A General World Model Simulator for Embodied Intelligence（具身WM仿真器）)（稀疏 MoE 吸收动作模态/异构动力学的具身 WM 实例）

## 7. 读前须知

[混合专家（MoE）](/explore/20-Algorithms/混合专家（MoE）)、[MoE门控公式](/explore/30-Formulas/MoE门控公式)、[DeepSeek-V2 - A Strong, Economical, and Efficient Mixture-of-Experts Language Model](/explore/10-Papers/01-架构演进/DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）)

> 近邻同族：[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts](/explore/10-Papers/05-MoE/Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）) · [DeepSeek-V3 Technical Report](/explore/10-Papers/05-MoE/DeepSeek-V3 Technical Report（DeepSeek-V3）)
