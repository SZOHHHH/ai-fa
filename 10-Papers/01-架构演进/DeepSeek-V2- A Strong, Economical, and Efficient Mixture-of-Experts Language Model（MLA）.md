---
type: paper
title: DeepSeek-V2 - A Strong, Economical, and Efficient Mixture-of-Experts Language Model
aliases: [DeepSeek-V2, MLA]
year: 2024
authors: [DeepSeek-AI]
venue: arXiv 2024
arxiv: "2405.04434"
line: 架构演进
matrix_coords: [全注意力, KV压缩, 无状态]
tags: [paper]
---

# DeepSeek-V2（MLA 出处）

## 1. 一句话贡献

MLA（多头潜在注意力）把 KV 压进低秩潜在向量——cache 降一个数量级而质量反升，DeepSeek 系推理经济的核心引擎。

## 2. 核心贡献

- **MLA**：KV 联合低秩压缩 $c^{KV} = W^{DKV} h$，cache 只存 $c^{KV}$（[[30-Formulas/MLA多头潜在注意力]]）
- **解耦 RoPE**：位置分量与压缩通道分流的工程解
- **DeepSeekMoE 组合**：细粒度专家 + 共享专家 + MLA——236B 总参/21B 激活的经济学
- 生成吞吐较 V1 提升 ~5.76×（官方数字）

## 3. 方法概要

1. 每层 K/V 联合投影到 $d_c$ 维潜在向量（如 512）
2. cache 只存该向量（代替全部头的 K/V）
3. 推理时现场升维出每头 K/V
4. 带 RoPE 的 q/k 分量走独立小通道（解耦）
5. 配细粒度 MoE：专家拆小 + 共享专家常开

## 4. 核心公式

- [[30-Formulas/MLA多头潜在注意力]] —— 本文灵魂（压缩/升维/解耦三式）
- [[30-Formulas/RoPE旋转位置编码]]（解耦对象）

## 5. 与前作的关系

- 超越了 [[10-Papers/01-架构演进/Efficiently Scaling Transformer Inference（MQA）]]→[[10-Papers/01-架构演进/GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）]] 的头数削减路线：低秩压缩保表达
- 精神同源 LoRA（线 3）：低秩分解的"减法"应用
- 组合 [[20-Algorithms/混合专家（MoE）]]（DeepSeekMoE 细粒度版）

## 6. 影响与后续

- DeepSeek-V3/R1 全系沿用（API 低价的技术根）
- 其他厂商跟进 latent KV 压缩研究
- "MLA + MoE"成为 2024–25 高性价比模型的模板

## 7. 读前须知

[[40-Concepts/KV缓存]]、[[40-Concepts/注意力机制]]、[[30-Formulas/MLA多头潜在注意力]]、[[20-Algorithms/混合专家（MoE）]]
