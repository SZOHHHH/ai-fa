---
type: paper
title: "DualHeads: Reward-tilted few-step diffusion made simple"
aliases: []
year: 2026
authors: [Yuanzhi, Zhu]
venue: 待核（占位层，来自 arXiv 2026-10-20）
arxiv: "2610.28858v1"
pdf: https://arxiv.org/pdf/2610.28858v1
line: 生成建模与扩散
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# DualHeads: Reward-tilted few-step diffusion made simple

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Distilled diffusion models generate high-quality images in a few sampling steps, but aligning them with task requirements and human preferences is difficult. Methods developed for multi-step diffusion models rely on differentiable rewards, or on score fields and stochastic trajectories that distilled generators may lack. We ask whether a few-step generator can be adapted using only external reward evaluations and reference samples, and show that two binary classifiers suffice. Our method, DualHeads, implements them as lightweight heads on a frozen diffusion backbone. The reward head learns whi

## 1. 一句话贡献
证明少步扩散生成器的奖励对齐只需两个二分类器：冻结骨干上加轻量 reward head（同 prompt 分高低分样本）+reference head（分参考图与生成图），生成器最大化两者 logit 加权和——head 最优时等价 KL 正则化的奖励最大化，少步生成器拿到接近 40 步 RL 方法的任务奖励且零额外推理开销。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
1. 设定：少步生成器只保证能出样本——不用可微奖励、不用 score field、不用随机轨迹，只允许黑盒奖励评估+参考样本；
2. reward head：同 prompt 的生成样本两两比较，学"哪个得分高"（二元分类）；
3. reference head：区分参考模型的优质图与生成图（防塌向高奖励离域区）；
4. 生成器更新：沿两头 logit 加权和的梯度走（权重比 λ_D/λ_R 即等价 KL 正则强度 β_eq）；
5. 验证：规则奖励（OCR 文本渲染、GenEval 组合生成）+模型奖励（PickScore/CLIPScore/HPSv2.1、HPSv3 on Z-Image-Turbo），任务奖励接近 40 步 RL（DDPO 系）水平而保持图像质量。

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/扩散模型]] · [[20-Algorithms/一致性模型]]（少步生成器载体谱系）
- ← 近前身：[[10-Papers/02-生成建模与扩散/Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）]]（一步生成器偏好对齐但依赖 teacher score；DualHeads 只要黑盒奖励+参考样本）
- ↔ 同族：[[10-Papers/02-生成建模与扩散/Diffusion Fine-tuning with Rewarded Moment Matching Distillation（RMMD）]]（奖励×蒸馏交叉家族）· [[10-Papers/02-生成建模与扩散/Enabling Preference-driven Unlearning in Few-step Distilled Text-to-Image Diffusion Models]]（少步蒸馏模型的后训练家族）
- 概念链：[[40-Concepts/KL散度]]（head 最优时目标=reverse-KL 正则化奖励最大化）· [[40-Concepts/NFE（函数求值次数）]]（少步=蒸馏后 NFE 1-4）· [[30-Formulas/蒸馏损失]]

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.28858v1；在线全文（新论文）：https://arxiv.org/html/2610.28858v1
