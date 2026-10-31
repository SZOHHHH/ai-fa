---
type: paper
title: "ACWM-RM: A Reference-Free Reward Model from Complementary Mismatch Preferences"
aliases: [ACWM-RM, AVM-Eval]
year: 2026
authors: [Shibo Hong, Siyu Ren, FengJiao Chen, et al.]
venue: arXiv 2026（复旦+美团）
arxiv: "2610.32222v1"
pdf: https://arxiv.org/pdf/2610.32222v1
line: 世界模型与JEPA
matrix_coords: [奖励模型(评测), 潜在特征(JEPA), 机器人操作]
tags: [paper]
---
# ACWM-RM: A Reference-Free Reward Model from Complementary Mismatch Preferences

> 261026 精读升级（在线全文 arxiv.org/html/2610.32222v1）。

## 1. 一句话贡献
给机器人动作条件世界模型（ACWM）造一个**免参考、同时评视觉质量（VQ）与动作遵循（AF）的奖励模型**——用"动作失配对监督 AF + 视频失配对监督 VQ"的互补偏好数据训练，并顺带证明 **IDM 在真实视频上训练、拿到含伪影的生成视频上打分会显著掉可靠（最好者 86.1%→70.0%）**。

## 2. 核心贡献
- **AVM-Eval 基准（67.2k 对）**：动作失配对（同一真视频，原动作 vs 数值/语义扰动动作）测 IDM 在真实视频上的 AF 判别力；视频失配对（同一动作下不同生成视频，按 nDTW 轨迹对齐排序）测在生成视频上的可靠性。四种异构 IDM（EVA/GR00T/TAP/J-IDM）全部"真视频准≠生成视频准"。
- **ACWM-RM**：冻结 V-JEPA 2.1 编码器 + 双臂动作条件预测器（先在真视频上做动力学预训练）+ patch 加权打分头；偏好数据 AVM-Pref（506.3k 对）= 动作失配对（AF 监督）⊕ 视频失配对（VQ 监督 + 暴露生成分布），Bradley-Terry 损失联合训练。
- **下游验证**：Flow-GRPO 微调 DreamDojo-2B，ACWM-RM 在 VQ 与 AF 双指标上同时胜过 IDM 奖励、指标奖励（需参考视频）与 VLM 评委奖励，且物理一致性基本不掉。

## 3. 方法概要
1. **问题**：RL 后训练 ACWM 需要对"同条件下生成的视频"按 VQ+AF 可靠排序；指标奖励要 GT 参考视频且不评 AF，IDM 奖励免参考但只评 AF 且训练分布（真视频）≠使用分布（生成视频，含机械臂形变/穿插等伪影）。
2. **互补偏好构造**：动作失配对 = 真视频 + 扰动动作（数值扰动探端 executer 位移/旋转/夹爪量/顺序，语义扰动探抓取位置偏移/时机错误/中途漂移）→ AF 监督；视频失配对 = 同动作下四个 ACWM（DreamDojo-2B/14B、GE-Sim-2B、OSCAR-2B）各采 6 段，按全局/局部 PSNR、LPIPS 排序配对 → VQ 监督并让模型见过生成分布。
3. **两阶段训练**：先按 V-JEPA 2-AC 范式在真机器人视频上预训练动作条件预测器（学正向动力学表征）；再联合训练预测器+打分头做偏好排序——预测器从候选视频自己的动作与状态推下一步 patch 特征，与编码器实际特征逐 patch 对比（避免自回归 rollout 误差累积）。
4. **打分**：patch 级比较向量（差/逐元素积/余弦）→ 两个 MLP 出 patch 分数与空间权重 → softmax 加权聚合成帧分再平均成奖励。

## 4. 核心公式
- IDM 奖励（原文式(1)，记号改写）：$R_{\text{IDM}}=w_m\cdot\ell_{1}^{\text{smooth}}\big(\text{IDM}(v),\,a\big)$（按动作维标准差归一，越高越好指标再取负）—— **直觉：让 IDM 看生成视频反推动作，与指令动作越像分越高；隐患就在 IDM 没见过带伪影的视频**。
- patch 比较向量（原文式(3)）：$c_i=\big[\,z_i^{\text{pred}}-z_i^{\text{enc}},\;\; z_i^{\text{pred}}\odot z_i^{\text{enc}},\;\; \cos(z_i^{\text{pred}},z_i^{\text{enc}})\,\big]$ —— **直觉：差看"偏了多少"、积看"共有的东西"、余弦看"方向对不对"，三视角拼一个 patch 级证据**。
- 加权聚合（原文式(4)(5)）：$\alpha_i=\text{softmax}_i\big(\text{MLP}_w(c_i)\big)$，$R=\frac{1}{T}\sum_t\sum_i \alpha_i\,\text{MLP}_s(c_i)$ —— **直觉：机械臂区域与背景对 VQ/AF 的证据量不同，空间权重自适应分配注意力**。
- 偏好损失：Bradley-Terry 形式 $\mathcal{L}=-\log\sigma\big(R(v^{+})-R(v^{-})\big)$（同源推导见 [[30-Formulas/DPO损失]]）。

## 5. 与前作/矩阵关系
- ← 编码器地基：[[V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）]]（冻结 V-JEPA 2.1 提特征，V-JEPA 2-AC 动作条件范式）
- ↔ 工具同源：[[40-Concepts/逆动力学（IDM）]]（IDM 奖励是本文批判的基线：真视频训练→生成视频使用分布失配；与本库 IDM 用法分岔谱系互补——本文是 IDM 当**奖励信号**一支出的问题报告）
- ← 训练框架：[[20-Algorithms/GRPO与RLVR]]（Flow-GRPO：flow-matching 模型的组相对策略优化）· [[20-Algorithms/流匹配]]（ACWM 的 flow-matching 背景与 SDE 化采样）
- ↔ 表征路线：[[20-Algorithms/世界模型]]（动作条件 WM 家族定位）

## 6. 影响后续

## 7. 读前须知
- [[40-Concepts/逆动力学（IDM）]]（正逆动力学镜像）· [[V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）]]（特征空间与动作条件预测器原型 V-JEPA 2-AC）· [[20-Algorithms/GRPO与RLVR]]（Flow-GRPO 目标）
- 概念上需要：Bradley-Terry 偏好模型、PSNR/SSIM/LPIPS/nDTW 四类指标的含义、全参考 vs 免参考评测的区别。
