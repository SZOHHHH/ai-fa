---
type: paper
title: "Large Flow Language Models"
aliases: []
year: 2026
authors: [Arnav, Chavan]
venue: 待核（占位层，来自 arXiv 2026-10-20）
arxiv: "2610.28559v1"
pdf: https://arxiv.org/pdf/2610.28559v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Large Flow Language Models

> **占位层卡**（daily 自动采集 2026-10-25 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段已读在线全文（arxiv.org/html/2610.28559v1）升级七节。

## 1. 一句话贡献

把连续流语言模型首次高效做到 8B 规模：**Lafa** 用"前缀因果注意力+块内双向**异步**流"的块式设计直接改造预训练 AR 模型（<30B token 训练，比离散扩散 LM 省 ≥18×数据），流解码质量追平/超过 AR SFT，且联合训练反而**提升**保留的 AR 能力（多 token 预测效应）；用一步流草稿+自带 AR 头验证的自投机解码拿到 **2.54× AR 吞吐**（7B@B=16，质量持平）。

## 2. 核心贡献

- **块式异步流**：块内 tokenwise 时间 `$\tau^i(t)$` 让早位置先去噪（左→右偏置**从去噪损失逆 CDF 自动学出**，非手工设定）；前缀保持因果注意力，KV 缓存照常复用——与 AR 生态兼容；
- **AR 高效适配三件套**：adaLN 时间条件（identity 初始化、prefix 恒时间 1）+块内双向注意力+嵌入范数冻结只学方向（防"缩范数变相降噪声"作弊）；
- **联合训练互益**：AR 交叉熵（前缀）+去噪 CE+嵌入 MSE（块）三项联合，流精度比纯去噪训练更高，且 AR 精度反超 matched AR SFT（0.5B/7B/8B 三尺度一致）；
- **自投机解码**：一步流草稿由同模型保留的 AR 预测头从左到右验证（输出=贪心 AR 解码保真），单次融合前向同时验证旧草稿+起草新块；7B 2.54×/0.5B 5.0× TPF。

## 3. 方法概要

1. 块自回归分解 `$p(\mathbf{y}\mid\mathbf{c})=\prod_r p(\mathbf{y}^{rB+1:(r+1)B}\mid\mathbf{c},\mathbf{y}^{\le rB})$`；块内 token 用词嵌入 `$\mathbf{E}_y$`（one-hot→d 维，训练可规模化）；
2. 异步流匹配：位置级插值 `$I_t^i=(1-\tau^i(t))\mathbf{x}_0^i+\tau^i(t)\mathbf{x}_1^i$`；不直接学速度场而学**块去噪器** `$D_t$`（tokenwise 分类输出词分布），速度由恒等式（§4）从去噪器恢复；`$\\tau$` 由各位置去噪损失的逆 CDF 在线估计（损失高的噪声段走得慢，训练采样与积分步自动聚焦难区）；
3. 适配：预训练 f 吃[干净前缀+噪声块]，prefix 位置时间恒 1、块位置 `$\tau^i(t)$`；块内双向、前缀因果（prefix KV 与块状态无关→跨步跨块复用）；嵌入共享且范数冻结；
4. 训练：三项损失联合，全序列的块并行一次前向（每块独立采样基时间与噪声）；自条件化 p=0.5；
5. **流图蒸馏**：两时刻去噪器 `$\delta_{s,t}$` + semigroup 自蒸馏（对角项贴 teacher、非对角项=两段短学生跳的合成目标，KL 损失）→ 学生 `$\hat{X}_{0,1}$` 一步块生成，prefix 缓存保留；
6. 推理：K 步 Euler 流解码（步数换精度）或流图跳步；自投机=一步流草稿+AR 验证+融合前向，兼有 prefix guidance（类 CFG）与自条件化加持流解码。

## 4. 核心公式

**速度场-去噪器恒等式（eq.5，Prop A.1）**：`$b_t(\mathbf{x},\mathbf{c})^i=\frac{\dot{\tau}^i(t)}{1-\tau^i(t)}\big(D_t(\mathbf{x},\mathbf{c})^i\mathbf{E}-\mathbf{x}^i\big)$`

**直觉解释**：异步流的速度 = 经典去噪方向（预测均值嵌入−当前态）乘以**每位置自己的时钟速率** `$\dot{\tau}^i/(1-\tau^i)$`。三件事被这条恒等式焊在一起：①学的是分类去噪器（语言模型的本行 softmax），速度场白送；②块内"谁先被揭示"完全由 `$\tau$` 调度，而 `$\tau$` 又是损失感知学出来的——哪里难哪里慢走；③前缀位置 `$\tau=1$` 恒定 → 速度归零、KV 冻结——"AR 缓存兼容"由此有数学根源。蒸馏成流图后，一步就是一次"放大版的去噪差分"。

## 5. 与前作/矩阵关系

- 线锚：[[20-Algorithms/流匹配]] · [[30-Formulas/条件流匹配损失]] · [[20-Algorithms/一致性模型]]（流图少步化=一致性/流图蒸馏家族的语言版）
- ← 前身：CDCD/Dieleman 系连续扩散（类别数据连续化+损失感知时间扭曲的直接继承）· Block Diffusion（块自回归分解）· Flow Map LMs（2602.16813，流图蒸馏理论）· Qwen2.5/3（适配底座）
- ≡ 同族：[[10-Papers/02-生成建模与扩散/Distilled Continuous Diffusion Language Models Can Write Code in Few Steps---or One]]（连续扩散 LM 少步化前一棒：DMD 系蒸馏 vs 本文 AR 适配+异步流原生）· [[10-Papers/02-生成建模与扩散/Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]]（连续时间流图蒸馏族）· [[10-Papers/02-生成建模与扩散/AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）]]（流图蒸馏跨域同族：视频 vs 语言）
- 概念链：[[40-Concepts/KV缓存]]（前缀缓存保留=AR 适配的钥匙）· [[40-Concepts/知识蒸馏]]（semigroup 流图自蒸馏）· [[40-Concepts/嵌入向量（Embedding）]]（词嵌入空间的连续流）

## 6. 影响后续


## 7. 读前须知

流匹配与插值路径（[[20-Algorithms/流匹配]]）；CFM 损失（[[30-Formulas/条件流匹配损失]]）；流图/semigroup 性质 `$X_{s,t}=X_{t,u}\circ X_{s,u}$`（[[20-Algorithms/一致性模型]]）；投机解码只需"草稿+验证=分布保持"直觉。原文：https://arxiv.org/pdf/2610.28559v1；在线全文：https://arxiv.org/html/2610.28559v1
