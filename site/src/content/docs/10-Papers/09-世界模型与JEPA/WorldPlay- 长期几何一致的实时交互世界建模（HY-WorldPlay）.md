---
type: paper
title: "WorldPlay: Towards Long-Term Geometric Consistency for Real-Time Interactive World Modeling"
aliases: [WorldPlay, HY-WorldPlay]
year: 2025
authors: [Wenqiang Sun, Haiyu Zhang, Haoyuan Wang, Junta Wu, Zehan Wang, Zhenwei Wang, et al.]
venue: arXiv 2025-12（腾讯混元）
arxiv: "2512.14614"
pdf: 已下载（PDF/WorldPlay（HY-WorldPlay）.pdf）
line: 世界模型与JEPA
matrix_coords: [实时交互(流式扩散), 显式像素, 可操作(键鼠)]
tags: [paper]
---

# WorldPlay（腾讯混元）：流式扩散的实时交互世界模型

## 1. 一句话贡献

流式视频扩散做到**实时（720p@24FPS）、交互（键鼠控制）、长程几何一致**的 世界模型——用"记忆重建+上下文对齐蒸馏"解决长时滚动的误差累积，是当前开源实时交互 WM 的 SOTA 基座（WorldCompass/minWM 的宿主）。

## 2. 核心贡献

- **Dual Action Representation**：键盘/鼠标双通道动作表征，鲁棒的低层控制；
- **Reconstituted Context Memory**：从历史帧**动态重建上下文**+时间重构（temporal reframing），把"几何重要但很久远"的帧留在感受野内——**对抗长滚动中的记忆衰减**（DIAMOND 的 4 帧滑窗在这些场景早已不够）；
- **Context Forcing（本卡核心）**：**面向记忆的蒸馏新法——对齐 teacher 与 student 的 memory context**，保住学生使用长程信息的能力，**防实时化（少步化）后的误差漂移**。

## 3. 方法概要

1. 双向视频扩散基座 → 加动作条件微调（键鼠）；
2. 流式 AR 化（因果注意力+滑动上下文窗）；
3. 少步蒸馏（Context Forcing：蒸馏时学生看到的学生上下文与 teacher 的上下文做对齐——**不只是对齐输出帧，先对齐输入记忆**）；
4. 推理：上下文记忆动态重构（不是简单滑窗丢帧，而是"重新组织"保留几何锚点）。

## 4. 核心公式

Context Forcing 的对齐目标（示意）：

`$$\mathcal{L}_{cf} = \mathcal{L}_{distill} + \lambda\,\big\lVert \text{ctx}_{student} - \text{sg}[\text{ctx}_{teacher}]\big\rVert^2$$`

**直觉解释**：普通蒸馏只对齐"产出"（帧）；Context Forcing 额外对齐"工作记忆"——因为 AR 学生在滚动中吃自己生成的上下文，**记忆失配=误差漂移的源头**。**与我们闭环 EMDMD 的动机同构**（我们在学生自生成分布上做 DMD 对齐，他们在记忆表征上对齐——同一病根"开环蒸馏 covariate shift"的两家处方）。

## 5. 与前作/矩阵关系

- ← HY-World 1.5 框架（腾讯混元系）；
- ≡ 蒸馏侧与 [Causal Forcing](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）) 平行（他们理论派、WorldPlay 工程派）；
- → 后继：[WorldCompass](/ai-fa/explore/10-Papers/09-世界模型与JEPA/WorldCompass- 强化学习训练长视野世界模型（WorldCompass）)（RL 后训练宿主）、minWM（框架化适配）。

## 6. 影响后续

确立"记忆重建+上下文对齐蒸馏"为长程实时 WM 的标配组件；对 DIAMOND 系（4 帧滑窗）是**架构级碾压**，但规模与算力不在学生射程内——我们引用其思想（上下文对齐）而非复现其基座。

## 7. 读前须知

流式 AR 扩散（[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)）；上下文记忆与误差漂移（对比我们的 E1_实验数据台账 尸检节）。

