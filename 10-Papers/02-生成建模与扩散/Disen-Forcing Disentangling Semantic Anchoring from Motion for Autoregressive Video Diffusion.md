---
type: paper
title: "Disen-Forcing: Disentangling Semantic Anchoring from Motion for Autoregressive Video Diffusion"
aliases: [Disen-Forcing]
year: 2026
authors: [Zhengyang Yu, Akio Hayakawa, Masato Ishii, Qingtao Yu, Xuesong Li, Takashi Shibuya, Yuki Mitsufuji, Jing Zhang]
venue: 待核（arXiv 2026-11-02）
arxiv: "2611.02822v1"
pdf: https://arxiv.org/pdf/2611.02822v1
line: 生成建模与扩散
matrix_coords: [AR视频蒸馏(frame sink再审视), 注意力头功能解耦, 长程一致性×运动动态]
tags: [paper]
---
# Disen-Forcing：语义锚定与运动解耦的 AR 视频蒸馏插件

> 中文速览：重新审视 AR 视频扩散稳长 rollout 的 frame sink 设计，发现初始帧稳定长程一致的真实机制不是 LLM 式 attention sink，而是稀疏一部分注意力头锚定语义、多数头捕获局部时序动态；现有 frame sink 把锚定上下文无差别喂给所有头，造成过度条件化——蒸馏时学生运动塌向教师的低动态模式。据此提出蒸馏期插件 Disen-Forcing：解耦上下文路由（锚定帧只喂语义头）+运动解耦正则，长视频基准上同时改善长程一致性与运动动态——打破 sink 系方法两头难全的取舍。

## 1. 一句话贡献

查明 frame sink 稳长 rollout 的真实机制（稀疏注意力头锚定语义而非 LLM 式 sink 效应），据此做蒸馏期解耦路由+运动正则插件——让 AR 视频蒸馏同时保住长程一致性与运动动态（sink 系方法只能二选一）。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- ← 前身：AR-VDM 长 rollout 稳定化的 frame sink 启发式线（Deep Forcing/Rolling Forcing 等，未入库）；蒸馏底座属 [[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]] 少步 AR 生态；
- ≡ 同族近邻（261103）：[[10-Papers/02-生成建模与扩散/DyMD Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video Wo|DyMD]]（蒸馏损伤动态的另一诊断：教师模式锁死——与本文「蒸馏塌向低动态模式」同一现象的两种归因）· [[10-Papers/02-生成建模与扩散/Mix Forcing Causal Pre-Training via Mixture Attention for Interactive World Models|Mix Forcing]]（预训练期混合注意力路线——同为「注意力结构承载长程信息」的发现）· [[10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）|WorldPlay]]（交互 WM 长程一致家族）· [[10-Papers/09-世界模型与JEPA/History Forcing Distilling History-Dependent Continuations for Long-Horizon Video World Models|History Forcing]]（同期新作：历史约束进蒸馏目标 vs 本文注意力结构解耦——长 rollout 一致性的两条互补轴）；
- 概念链：[[30-Formulas/注意力核心公式]] · [[40-Concepts/注意力机制]]（头功能分化）· [[40-Concepts/KV缓存]]（sink 常驻上下文）· [[30-Formulas/蒸馏损失]] · [[20-Algorithms/扩散模型]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.02822v1；在线全文（新论文）：https://arxiv.org/html/2611.02822v1

---

> 谱系枢纽：[[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]（图谱连通入口）

> 数学根基：[[30-Formulas/注意力核心公式]] · [[40-Concepts/注意力机制]] · [[30-Formulas/蒸馏损失]]
