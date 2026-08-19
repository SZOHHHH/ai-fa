---
type: paper
tags: [paper]
title: DeepSeek-V3 Technical Report
aliases: [DeepSeek-V3]
year: 2024
authors: [DeepSeek-AI]
venue: arXiv 2024
arxiv: "2412.19437"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: [token级, 细粒度分段, 去偏置]
---

# DeepSeek-V3

## 1. 一句话贡献

671B/37B 激活的 MoE 旗舰：细粒度专家 + **无辅助损失均衡**（bias 法）+ MLA + 14.8T token——把 B17 占位论文的方法装配成生产系统。

## 2. 核心贡献

1. 三件核心技术：细粒度专家分割（DeepSeekMoE 系）、auxiliary-loss-free 均衡、MLA——多线汇聚的工程集成

## 3. 方法概要

三件核心技术：细粒度专家分割（DeepSeekMoE 系）、auxiliary-loss-free 均衡、MLA——多线汇聚的工程集成。
## 4. 核心公式


$$
\text{MoE}:\ \text{TopK}(s_i + b_i)\ \text{(无损失均衡)} + \text{MLA 注意力}
$$


## 5. 与前作/矩阵关系

← [[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]]（均衡策略来源）/DeepSeekMoE（专家分割）/MLA（注意力）；线1+线5 的会师之作

## 6. 影响与占位意义

B18 奠基补齐：MoE 线的当代旗舰锚点。

> 近邻同族：[[DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]]

> 数学根基：[[softmax函数]]


## 7. 读前须知

需要：无辅助损失均衡（bias 只进选择不进门控）；MLA 的低秩压缩；细粒度专家分割——三项技术分别见对应卡
