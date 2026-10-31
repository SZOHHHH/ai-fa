---
type: paper
title: Looped Uniform Diffusion Language Models
aliases: [Looped UDLM]
year: 2026
authors: [Saiteja Utpala, Chieh-Hsin Lai, Yuki Mitsufuji, Praneeth Vepakomma]
venue: arXiv 2026（MBZUAI+Sony+MIT）
arxiv: "2610.30066v1"
pdf: https://arxiv.org/pdf/2610.30066v1
line: 架构演进
matrix_coords: [循环层, 离散扩散LM, 训练/推理效率]
tags: [paper]
---
# Looped Uniform Diffusion Language Models（循环均匀扩散语言模型）

> 261026 升级（在线全文摘要+结果节目录）。

## 1. 一句话贡献
把"选择性循环"（在扩散去噪步内递归复用前几层 Transformer）引入**均匀扩散语言模型（UDLM）**：训练目标与采样器不动，同等 FLOP 下训练效率与生成质量双升，并找到"训练时多采小循环数"的最优循环分布。

## 2. 核心贡献
- 循环使 UDLM 训练更省算力：达到非循环 UDLM 在约 0.5T token 上的验证 NLL，OpenWebText 最多省更多训练 FLOPs、FineWeb-Edu 亦省。
- 同 NFE 预算下生成困惑度最多低于非循环 UDLM，中等循环数即拿走大部分收益。
- 循环数分布研究：训练时更频繁采小循环数 → 推理用更少循环不掉精度（推理效率免费提升）。

## 3. 方法概要
UDLM 对普通词表 token 序列迭代去噪（任意位置可腐蚀可重写，训练需在**不可靠上下文**中去噪——比 MDLM 干净上下文更难但推理更强）；在每个去噪步内递归套用前几层 Transformer 若干次（looping），训练目标/采样器不变；系统比较 uniform / FLOP-proportional / noise-proportional 三种循环数分布。

## 4. 核心公式
（扩散训练目标同离散扩散家族，见 [[30-Formulas/DDPM训练目标]] 的连续时间对应；本文增量在循环调度的 FLOP 记账，非新损失形式。）

## 5. 与前作/矩阵关系
- ← 地基：[[20-Algorithms/扩散模型]]（离散/均匀扩散 LM：Duo/Duo++ 谱系）· [[20-Algorithms/Transformer]]（被循环的载体）
- ↔ 同族循环线：[[FlashLoop Fast and Memory-Efficient Looped Transformers via Lazy Updates|FlashLoop]]（06-长上下文线的 looped transformer 惰性更新——循环层效率家族在语言/长上下文两侧的呼应）

## 6. 影响后续
- "循环 = 免费深度"在离散扩散 LM 上的系统验证；训练/推理双侧循环数分布的调法（小循环数偏采）有直接工程价值。

## 7. 读前须知
- [[20-Algorithms/扩散模型]]（需要：离散扩散、UDLM vs MDLM 的上下文可靠性差异）；循环 Transformer（universal transformer 谱系）概念。
