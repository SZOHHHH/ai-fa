---
type: paper
title: "ZYFA: Speed and Accuracy of FP8 FlashAttention on AMD CDNA4"
aliases: []
year: 2026
authors: [Quentin, Anthony]
venue: 待核（占位层，来自 arXiv 2026-11-05）
arxiv: "2611.07496v1"
pdf: https://arxiv.org/pdf/2611.07496v1
line: 长上下文
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# ZYFA: Speed and Accuracy of FP8 FlashAttention on AMD CDNA4

> **占位层卡**（daily 自动采集 2026-11-07 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Attention is a core building block of frontier models and often dominates compute-bound prefill at long context. FP8 matrix instructions offer twice the peak throughput of BF16, but they accelerate only matrix multiplication, and the softmax between the two matrix multiplications of attention runs on vector units that FP8 does not accelerate. On the AMD Instinct MI355X, the vendor's AITER kernels reach 39% of peak FP8 matrix throughput at 32K tokens, compared with 49% in BF16. Attention is also more numerically sensitive to quantization than feed-forward layers, and unlike NVIDIA's Hopper and 

## 1. 一句话贡献
（待精读）

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 公式链：[[30-Formulas/FlashAttention分块计算]]（同族：IO 感知分块注意力的 AMD CDNA4/FP8 新成员——FlashAttention-3 用异步矩阵指令藏 softmax、FA4 用多项式近似指数，ZYFA 用 FP8 位型≈缩放对数这一比特技巧替代指数）· [[30-Formulas/注意力核心公式]]（改的是 softmax 的计算路径不是数学）。
- 概念链：[[40-Concepts/量化]]（FP8 e4m3 数值分析：块内 2 的幂预缩放防下溢+用舍入后概率和归一）· [[30-Formulas/量化误差与异常值]]（误差溯源：大头来自输入量化而非概率量化，且散布多数头→"保敏感头 BF16"无效，Hadamard 旋转砍半误差）· [[30-Formulas/MLA多头潜在注意力]]（支持 DeepSeek 式 MLA 形状）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.07496v1；在线全文（新论文）：https://arxiv.org/html/2611.07496v1
