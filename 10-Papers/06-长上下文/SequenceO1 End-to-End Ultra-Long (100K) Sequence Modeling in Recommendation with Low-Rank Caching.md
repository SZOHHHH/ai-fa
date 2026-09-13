---
type: paper
title: "SequenceO1: End-to-End Ultra-Long (100K) Sequence Modeling in Recommendation with Low-Rank Caching"
aliases: []
year: 2026
authors: [Lin, Guan]
venue: 待核（占位层，来自 arXiv 2026-09-08）
arxiv: "2609.08443v1"
pdf: 已下载（PDF/）
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# SequenceO1: End-to-End Ultra-Long (100K) Sequence Modeling in Recommendation with Low-Rank Caching

> **占位层卡**（daily 自动采集 2026-09-12 建卡；处理段同日完成中文速览+挂链，七节精读待批次升级）。
> **方法速览（中文）**：做了什么——抖音全量部署的端到端 100K 长行为序列推荐建模框架（RecSys '26，ByteDance），核心观察是超长历史应当**既可压缩又可复用**：100K 的瓶颈是系统性的（特征存储/通信/训练吞吐/在线时延），逐层算子优化救不了。怎么做的——模型侧 Sketch Attention 用可学习原型+原型级归一化把 100K 历史压成定长"用户草图"（长度维隐式低秩表示，与目标 item 无关故可缓存），近端 10K 后缀与草图两路 STCA 双时间尺度推理后轻融合；系统侧训练端本地 KV cache 按 user 复用草图（MRLB 多请求用户级批处理摊销），推理端同缓存跨连续请求复用——缓存命中路径对原始序列长度 **O(1)**，配 FlashSA 融合核。效果：100K 下比直接 STCA 该分支训练省 49.9×/推理省 63.9× FLOPs，保留直接扩长 83% 的 AUC 增益。

## 1. 一句话贡献
抖音全量部署的 100K 行为序列端到端建模：Sketch Attention 把超长历史压成与目标无关的定长用户草图（长度维隐式低秩），训练/推理共享缓存复用草图使命中路径对序列长度 O(1)——压缩（模型）与摊销（系统）协同设计。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 概念/公式锚：[[40-Concepts/低秩分解]]（草图=序列长度维的隐式低秩压缩，尺寸与 $n$ 无关）· [[40-Concepts/KV缓存]]（跨请求/跨目标复用的可缓存状态）· [[30-Formulas/注意力计算复杂度]]（$O(L^2)\to O(L)\to O(1)$ 的完整阶梯）
- 同族：[[Information-Aware KV Cache Compression for Long Reasoning（InfoKV）]]（长序列压缩家族：推理期 KV 压缩 vs 原型草图摘要）· [[40-Concepts/稀疏与线性注意力]]（STCA 稀疏目标注意力属保留家族）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）自动下载备注：已下载（PDF/）
