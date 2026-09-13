---
type: paper
title: "DSAQuant: Denoising-Stage-Aligned Quantization-Aware Training for Video Generation"
aliases: [DSAQuant, DSAQuant 视频生成量化, 去噪阶段对齐的量化感知训练]
year: 2026
authors: [Shuaiting Li 等]
venue: 待核（arXiv 2609.04031，2026-09-03）
arxiv: "2609.04031v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: 扩散×压缩｜视频生成｜量化轴
tags: [paper, 精读层]
layer: 精读
---
# DSAQuant: Denoising-Stage-Aligned Quantization-Aware Training for Video Generation

> **精读层卡**（daily 自动采集 2026-09-08 建卡，Tier B 当日精读升级；元数据出自 arXiv API=已核实；PDF 全通道下载失败后直连补档成功，38.7MB，EOF 校验过）。
> 摘要（原文）：Video diffusion models (VDMs) have achieved impressive progress in text-to-video generation, but their high memory and computational costs hinder practical deployment. Quantization-aware training (QAT) is an effective solution for compressing and accelerating advanced generative models without runtime overhead at inference. However, existing QAT methods suffer from a distinctive challenge in VDMs: while they often preserve prompt semantics, global layout, and coarse motion, the quantized model severely degrades visual details, texture fidelity, and sharpness. In this paper, we trace this degra[ration to denoising-stage misalignment]…

## 1. 一句话贡献

视频扩散模型的量化感知训练（QAT）失效根因定位在"去噪阶段错配"——量化噪声与不同去噪阶段的敏感度不匹配——并提出按阶段对齐的 QAT 方案，专救被现有量化"砍掉的细节/纹理/清晰度"。

## 2. 核心贡献

- **问题定位**：VDM 量化后语义/布局/粗运动保得住、**细节与纹理塌**——把退化溯源到去噪阶段（早期定布局、晚期出细节）与量化粒度的错配。
- **方法**：denoising-stage-aligned QAT——让量化感知训练随去噪阶段自适应（晚期步骤对高保真更敏感→差异化处理），而非全程一套量化配置。
- **战场**：文生视频（VDM）部署效率轴，与少步化（NFE 压缩）正交——一个压单次前向成本（位宽），一个压前向次数。

## 3. 方法概要

（据摘要级信息，PDF 已入库待全篇核验）①观察：QAT 后的 VDM 保粗不保细；②归因：去噪各阶段对量化扰动的敏感度不同，统一量化配置在细节关键阶段超限；③方案：按去噪阶段对齐的 QAT 训练策略；④验证：视频生成视觉细节/纹理/清晰度恢复。

## 4. 核心公式

（待 PDF 全篇精读补全——量化感知训练的典型形式为 $L_{QAT} = E_{x,t}\,[\lVert f_W(x_t,t) - f_{\tilde W}(x_t,t) \rVert^2]$，即全精度权重与量化权重 $\tilde W$ 输出的蒸馏对齐；本文的阶段对齐项按去噪阶段 $t$ 加权。直觉：让"学生=量化网络"在每一步去噪都贴近"老师=全精度网络"，且对细节关键阶段给更大权重。）

## 5. 与前作/矩阵关系

- 线锚：[[20-Algorithms/扩散模型]] · [[40-Concepts/量化]]
- 谱系：QAT for Diffusion 家族（图像扩散量化→视频扩散量化）；与 [[10-Papers/02-生成建模与扩散/SelfLift Accelerating Few-Step Diffusion via Self-Recovering Resolution Transition|SelfLift]] 同属"扩散部署效率"战线的两条正交轴——SelfLift 压**空间**（分辨率），DSAQuant 压**位宽**（精度），E1 压**步数**（NFE）。
- 对我们：Related Work"扩散压缩三轴（步数/空间/位宽）"的位宽轴代表，一句话引用位。

## 6. 影响后续

扩散模型部署效率线的位宽轴最新数据点；若其"阶段敏感度不均"论断成立，可能与少步化交互（步数越少每步越关键→量化容差越小），是 E1 落地讨论段可引的工程约束。

## 7. 读前须知

前置：[[20-Algorithms/扩散模型]]（去噪阶段语义）；量化基础（INT8/位宽/伪量化）概念可从摘要级理解。PDF 已入库，全篇精读时补第 4 节公式。
