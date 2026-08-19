---
type: paper
title: Mixtral of Experts
aliases: [Mixtral]
year: 2024
authors: [Albert Q. Jiang, Alexandre Sablayrolles, Antoine Roux, et al.]
venue: arXiv 2024
arxiv: "2401.04088"
line: MoE
matrix_coords: [token级, Top-K稀疏路由, 辅助均衡损失]
tags: [paper]
---

# Mixtral

## 1. 一句话贡献

8 专家 top-2 的 46.7B 总参/12.9B 激活开源模型——性能超 LLaMA-2 70B 而推理快 6×，开源 MoE 时代开启。

## 2. 核心贡献

- **开源 MoE 顶流**：8×7B 配置、top-2 路由
- **配方证明**：SwiGLU+GQA+RoPE + MoE——"现代四件套+MoE"组合定型
- **专家分工实证分析**：路由的领域/句法偏好统计（专家非按主题分工！）

## 3. 方法概要

1. 32 层、每层 8 专家 top-2（第一层稠密）
2. 标准 decoder 配方（GQA、RoPE、SwiGLU）
3. 13B 稀疏激活、上下文 32k
4. 路由分析：专家选择与 token 位置/语法相关度高、主题相关度低

## 4. 核心公式

- [[30-Formulas/MoE门控公式]]（Switch 系 top-2 配置）

## 5. 与前作的关系

- 开源化了 [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]/GLaM 路线（此前 MoE 皆闭源）
- 与 [[10-Papers/01-架构演进/LLaMA- Open and Efficient Foundation Language Models（LLaMA）]] 稠密路线正面竞争

## 6. 影响与后续

- DeepSeek 系、Qwen-MoE、DBRX 等跟进——开源 MoE 竞赛
- 专家路由可解释性讨论进入大众视野

## 7. 读前须知

[[20-Algorithms/混合专家（MoE）]]、[[30-Formulas/MoE门控公式]]

> 谱系成员（9）：[[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]] · [[DeepSeek-V3 Technical Report（DeepSeek-V3）]] · [[DeepSeek-VL2- Mixture-of-Experts Vision-Language Models for Advanced Multimodal Understanding（VL2）]] · [[DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]] · [[From Sparse to Soft Mixtures of Experts（Soft MoE）]] · [[GLaM- Efficient Scaling of Language Models with Mixture-of-Experts（GLaM）]] · [[GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]] · [[Mixture-of-Experts with Expert Choice Routing（Expert Choice）]] · [[Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]
