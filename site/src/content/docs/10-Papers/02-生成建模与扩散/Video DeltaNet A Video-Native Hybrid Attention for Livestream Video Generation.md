---
type: paper
title: "Video DeltaNet: A Video-Native Hybrid Attention for Livestream Video Generation"
aliases: [VDN, Video DeltaNet]
year: 2026
authors: [Haocheng Xi, Yiming Xie, Hexu Zhao, et al.]
venue: arXiv 2026
arxiv: "2609.20744v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [线性注意力(帧级delta规则), 混合注意力, 视频扩散效率]
tags: [paper]
---

# Video DeltaNet（VDN）

## 1. 一句话贡献

视频扩散的长序列注意力改造：近邻帧保留精确 Softmax（窗口对齐 VAE 分块）+ 首尾帧边界锚点 + 双向线性记忆承载远上下文（帧级 delta 规则 VDA，整帧空间 token 一次性联合写入），配分段教师对齐适配与 8 步蒸馏——8×B200 上 6.70 秒完成 14.3 秒 768p 视频 DiT 去噪，较 50 步稠密基线快 14.5×。

## 2. 核心贡献

- **按时间角色分割注意力**：局部纹理/短程运动归 Softmax（15 帧双向窗，边界不切断 VAE 分块），主体身份/长程运动归固定大小线性状态，首尾两帧全连接作全局锚点（对首末帧条件生成天然友好）
- **Video Delta Attention（VDA）帧级 delta 规则**：把 delta 规则从"逐 token 递归"推广为"逐帧整块更新"——一帧内所有空间 token 的 key 相关性共同塑形写入，避免任意 patch 顺序与相关写入互相干扰；给出继承态转移分析与高效批处理实现
- **预训练模型不重训的适配配方**：随机初始化的线性支路会破坏 Softmax 预训练残差流统计——先分段教师对齐（新支路对齐教师输出），再低秩更新协同微调，保留骨干能力
- **系统级加速闭环**：线性支 RMS 归一化+双支独立门控/输出投影校准尺度，8 步蒸馏 + SGLang 优化推理；8 步 VDN-H3 质量持平或略超 50 步稠密 H3

## 3. 方法概要

1. 视频对视频注意力按时间分工：查询块只对自己及前后相邻块做 Softmax；所有帧对首/末潜帧双向全连（锚点）
2. 远上下文由双向线性注意力处理：前向状态 $$S^\to_t$$ 汇总窗口之前、反向状态 $$S^\leftarrow_t$$ 汇总窗口之后（两区间不相交，读出可直接相加）；文本 token 先汇总成状态 $$S^T$$、两个方向各以 $$S^T/2$$ 初始化（相加恰好计一次文本）
3. VDA 每帧一次状态更新：整帧的 K/V 矩阵与 key 相关性联合参与 delta 修正（式 (2) 的矩阵形式），带衰减门与写入门（承 Gated DeltaNet/Kimi Delta Attention）
4. 双支融合：线性支经特征图（短卷积+SiLU+L2 归一化）后读出做 RMSNorm，各自 sigmoid 门控、各自输出投影再相加
5. 适配：先教师对齐引入线性支路，再 LoRA 协同，再 8 步蒸馏，最后 SGLang 分布式部署

## 4. 核心公式

帧级 delta 更新（单 token 版 → 整帧矩阵版）：

`$$S_t = S_{t-1}\,\text{Diag}(\alpha_t) + \beta_t\,(V_t - S_{t-1} K_t) K_t^{\top}$$`

**直觉**：delta 规则的本质是"先按 key 查旧账，再按残差改记忆"。单 token 版一次只改一行；VDA 把 $$K_t, V_t$$ 换成整帧的 token 矩阵——一帧内所有 patch 的 key 相关性 $$K_t K_t^{\top}$$ 共同决定每个 value 写入时怎么互相抵消，等价于"看完整帧再决定记什么"，而不是给 patch 强加一个不存在的先后顺序。$$\alpha$$ 是遗忘门（衰减旧记忆），$$\beta$$ 是写入强度门。

双支输出融合：

`$$Y = (G_S \odot O_S)\, W^S_O + (G_L \odot \text{RMSNorm}(O_L))\, W^L_O$$`

**直觉**：Softmax 被限制在局部窗后概率质量集中到少数 key 上、读出幅度变大，线性支读出尺度又自成一套——两支各配 sigmoid 门（幅度校准）与独立输出投影（残差流方向解耦），让"局部细看"与"全局粗记"在同一层里各自按需发声。

## 5. 与前作/矩阵关系

- ←线性注意力谱系直系：[Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention](/ai-fa/explore/10-Papers/01-架构演进/Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention（GDN2）)（门控与衰减机制的直接前身）· [Parallelizing Linear Transformers with the Delta Rule over Sequence Length](/ai-fa/explore/10-Papers/01-架构演进/Parallelizing Linear Transformers with the Delta Rule over Sequence Length（DeltaNet并行）)（delta 规则与并行化基础）——本文=把这套 LLM 侧机制做"视频原生"（帧粒度+双向+混合）
- ↔对照：[稀疏与线性注意力](/ai-fa/explore/40-Concepts/稀疏与线性注意力)（稀疏化 vs 线性化两条降复杂度路线，本文取混合）· [SSM序列架构（Mamba系）](/ai-fa/explore/20-Algorithms/SSM序列架构（Mamba系）)（同为固定状态压缩远上下文，选择性机制对照 delta 规则）
- 宿主与部署：[Scalable Diffusion Models with Transformers](/ai-fa/explore/10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）)（改造对象）· 少步加速承 [一致性模型](/ai-fa/explore/20-Algorithms/一致性模型) 系蒸馏
- 概念/公式根基：[注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式) · [注意力计算复杂度](/ai-fa/explore/30-Formulas/注意力计算复杂度) · [均方根归一化](/ai-fa/explore/30-Formulas/均方根归一化)

## 6. 影响后续

- "帧级 delta"确立了线性注意力进视频扩散的正确粒度——后续长视频/直播生成模型的远上下文模块大概率沿此形态
- 边界锚点+局部窗的划分对"首末帧条件"类任务（图生视频）是免费的归纳偏置，可迁移到交互式 WM 的关键帧条件生成
- 分段教师对齐+低秩协同的适配配方，是"往预训练巨人身上接新器官"的通用手术模板

## 7. 读前须知

[注意力核心公式](/ai-fa/explore/30-Formulas/注意力核心公式) 与 [注意力计算复杂度](/ai-fa/explore/30-Formulas/注意力计算复杂度)（为什么 Softmax 是瓶颈：MiniMax H3 工作负载中占去噪器 85%+ 时间）· [稀疏与线性注意力](/ai-fa/explore/40-Concepts/稀疏与线性注意力)（外积记忆/核化注意力视角）· delta 规则线性注意力（先读 [Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention](/ai-fa/explore/10-Papers/01-架构演进/Gated DeltaNet-2- Decoupling Erase and Write in Linear Attention（GDN2）)）· [Scalable Diffusion Models with Transformers](/ai-fa/explore/10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）)。
