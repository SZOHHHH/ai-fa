---
type: paper
title: "DVD: Dynamic Vector Decoding for Efficient MLLM-based Perception"
aliases: []
year: 2026
authors: [Jinghua, Hou]
venue: 待核（占位层，来自 arXiv 2026-10-08）
arxiv: "2610.12266v1"
pdf: https://arxiv.org/pdf/2610.12266v1
line: 架构演进
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# DVD: Dynamic Vector Decoding for Efficient MLLM-based Perception

> **占位层卡**（daily 自动采集 2026-10-12 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Multimodal large language models have made remarkable progress in bridging vision and language, facilitating various perception tasks essential for human-machine interaction, robotics, and autonomous driving. However, existing MLLM-based perception methods predominantly rely on text-based coordinate representation, which suffers from excessive token overhead, or fixed-range quantization, which suffers from range and precision constraints, especially for 3D domains with unbounded spatial range and high localization accuracy requirements. To address these challenges, we propose a dynamic vector 

## 1. 一句话贡献
针对 MLLM 感知任务坐标表示的两难（文本坐标 token 开销过大、固定范围量化受范围/精度限制），提出动态向量解码 DVD：把 2D 框/2D 掩码/3D 框统一转成 1D 向量序列再映射为紧凑离散 token，由轻量 de-tokenizer 解码回原始感知表示——统一 2D/3D 感知且大幅降低 token 开销与推理延迟。

## 2. 核心贡献
- （占位层，待精读补充）

## 3. 方法概要
（占位层，待精读补充）

## 4. 核心公式
（占位层，待精读补充）

## 5. 与前作/矩阵关系
- 概念锚：[[40-Concepts/视觉语言模型（VLM）]] · [[40-Concepts/Tokenization（分词）]]（连续感知量→离散 token 的表示设计）· [[20-Algorithms/Transformer]]
- 同族（表示压缩/分词器）：[[10-Papers/09-世界模型与JEPA/VideoTok4D - A 4D-Aware Video Tokenizer for Compact World Representation（4D视频分词器）|VideoTok4D]]（视频侧紧凑分词对照——DVD 是感知输出侧的动态向量化）
- 公式锚：[[30-Formulas/注意力核心公式]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.12266v1；在线全文（新论文）：https://arxiv.org/html/2610.12266v1
