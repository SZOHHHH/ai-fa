---
type: paper
title: "GestureFAR: Streaming Co-Speech Gesture Generation with Flow Autoregression"
aliases: [GestureFAR]
year: 2026
authors: [Pinxin Liu, Haiyang Liu, Jiahao Luo, et al.]
venue: arXiv 2026
arxiv: "2609.21576v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [流匹配(AR连续潜变量), 少步蒸馏(仅头部), 流式生成]
tags: [paper]
---

# GestureFAR

## 1. 一句话贡献

流式协同手势生成框架：自回归对象从离散运动码本换成**连续运动潜变量**（transformer 建模流式音频-运动上下文 + 逐 token 流匹配头从连续分布采样下一潜变量），再"只蒸馏头"把多步流头压成单步——token 级因果、实时、连续表达力三者兼得，BEAT2 上流式方法中质量-延迟折中最佳。

## 2. 核心贡献

- **流自回归（Flow Autoregression）**：保留自回归的从左到右因果分解，但每步输出不是码本索引而是从连续分布采样的潜变量——绕开离散化对高维全身运动的表征天花板
- **仅头部流蒸馏（Multi-Procedure Distribution Matching Distillation）**：观察到多步开销集中在流头（transformer 已产出条件向量），于是冻结分词器与因果骨干、缓存条件，只用一致性+分布匹配目标蒸馏流头为单步采样器——保因果、除延迟瓶颈
- **流式系统级结论**：BEAT2 上 FGD（质量）与逐 token 生成成本同时占优，落在"离线/分块/流式离散"三类方法的质量-延迟前沿之外

## 3. 方法概要

1. 因果运动自编码器（因果卷积+上下采样）把全身运动映成可流式连续潜变量序列
2. 因果音频-运动 transformer 消费过去运动潜变量+当前可听语音，输出下一潜变量的条件向量（严格不看未来）
3. 轻量流匹配头（rectified flow MLP）以该条件为条件、多步采样下一连续潜变量（教师）
4. 部署蒸馏：冻结分词器+骨干，缓存条件向量，流头用一致性目标 + 分布匹配目标（DMD 系，含反向散度）蒸成**一次网络求值**
5. 解码器逐步潜变量还原为全身手势，实现边听边动的实时生成

## 4. 核心公式

流自回归分解（概念式）：

`$$z_t \sim p_\theta(\,\cdot \mid z_{<t},\, c_{\text{audio} \le t}),\quad \hat x = \text{Dec}(z_{1:T})$$`

**直觉**：把"下一 token"的分布从 softmax over 码本换成一个小流匹配模型的终点分布——因果实现在条件的截断上（只喂 ≤t 的语音），连续性实现在采样的分布上，两头互不牺牲。

仅头部蒸馏（概念式）：

`$$\min_{\text{student}}\ \mathcal{L}_{\text{consist}}(\text{head}_s) + \mathcal{L}_{\text{DM}}(\text{head}_s \Vert \text{head}_t),\quad \text{backbone/tokenizer frozen}$$`

**直觉**：延迟瓶颈被定位在"每发一个 token 就要多步迭代"的流头，而条件向量算一次就能缓存——所以蒸馏边界划在头颈之间而非整网：教师多步轨迹只用来教这一个头的单步行为，骨干的因果知识原封不动，避免了蒸馏整网时常伴随的分布漂移。

## 5. 与前作/矩阵关系

- 蒸馏方法谱系：[One-step Diffusion with Distribution Matching Distillation](/ai-fa/explore/10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）) → [Improved Distribution Matching Distillation for Fast Image Synthesis](/ai-fa/explore/10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）) 系分布匹配思想，本文的"多程序蒸馏"是其流式 AR 变体；一致性目标承自 [Consistency Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）)
- AR×扩散混合谱系：[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)（分块滚动去噪）与离散 token AR（MIBURI/LiveGesture，本文的对照组）之间，本文占"连续潜变量严格 token 因果"格
- 数学根基：[流匹配](/ai-fa/explore/20-Algorithms/流匹配) · [条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失) · [蒸馏损失](/ai-fa/explore/30-Formulas/蒸馏损失) · [NFE（函数求值次数）](/ai-fa/explore/40-Concepts/NFE（函数求值次数）)

## 6. 影响后续

- "AR 骨干产条件 + 生成头管采样 + 只蒸头"的三段式对一切流式潜变量自回归（语音、音乐、运动、乃至动作序列生成）直接可搬
- 部署视角的蒸馏粒度选择（头 vs 整网）是个可迁移的工程判断：延迟在哪个模块，蒸馏边界就划在哪

## 7. 读前须知

[流匹配](/ai-fa/explore/20-Algorithms/流匹配)（rectified flow 与条件采样）· [One-step Diffusion with Distribution Matching Distillation](/ai-fa/explore/10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）)（分布匹配蒸馏的原始形式）· [NFE（函数求值次数）](/ai-fa/explore/40-Concepts/NFE（函数求值次数）)（少步蒸馏的计量口径）· 因果卷积（流式分词器不打未来泄漏的基础）。
