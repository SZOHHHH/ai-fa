---
type: paper
title: "LayerCheck: Adaptive Layer-wise Checkpointing for Large Language Model Post-training"
aliases: [LayerCheck]
year: 2026
authors: [Minqiu Sun, et al.]
venue: arXiv 2026-09
arxiv: "2609.27193v1"
pdf: https://arxiv.org/pdf/2609.27193v1
line: 架构演进
matrix_coords: [训练系统, 检查点, 后训练]
tags: [paper]
---

# LayerCheck：LLM 后训练的分层自适应检查点

## 1. 一句话贡献

利用"LLM 训练中权重更新在层间非均匀分布"这一动力学特征，只持久化更新量超阈值的层、把 I/O 突发摊平成持续小写入——恢复时聚合各层最近版本组成混合时间戳复合状态，检查点总量最高降 22.6 倍。

## 2. 核心贡献

- **观察**：惯例 checkpoint 全权重快照，但 LLM 权重更新跨层非均匀——"每次全存"不必要；
- **选择性分层持久化**：只存更新范数超阈值的层，分层写入随时间摊开，I/O 曲线平滑；
- **混合时间戳复合恢复**：恢复时聚合各层最近版本+对应优化器状态——在"每层陈旧度有界"的护栏下是受控扰动：标准 Adam 假设下引入有界陈旧项，实测重启后损失与无故障轨迹偏差 ≤0.54%；
- 端到端训练时间降 1.31 倍（vs SOTA 系统），收敛行为与精度保持。

## 3. 方法概要

1. 训练中监测各层权重更新量（范数型判据）；
2. 超阈值的层异步写入，未超的跳过——同一时刻不同层的"最新版"时间戳可以不同；
3. 故障恢复：逐层取最近持久化版本+其匹配的优化器状态拼装复合模型，从该状态续训；
4. 陈旧度护栏保证复合状态的偏差有界（摘要级：阈值/护栏的具体形式待精读）。

## 4. 核心公式

分层持久化判据与复合状态（示意，摘要级）：

`$$\text{save layer } l \iff \lVert W_l^{(t)} - W_l^{(t_{last})} \rVert > \tau_l,\qquad \hat W = \{\, W_l^{(\arg\max t_l)} \,\}_{l=1}^{L}$$`

**直觉**：每层问一句"自我上次存档以来动了多少"——动得少就继续用旧档；恢复时拼出来的模型各层"新旧不一"，但只要每层的滞后都有界，Adam 的误差界就把总扰动兜住（0.54% 实测）。本质是把"时间一致快照"换成"有界的空间-时间折衷"。

## 5. 与前作/矩阵关系

- 对照三代 SOTA：流水线化 checkpoint I/O、差分 checkpoint、内存持久化——都不利用训练动力学本身；
- 概念链：[Adam更新规则](/ai-fa/explore/30-Formulas/Adam更新规则)（陈旧项有界性的理论假设宿主）、[范数](/ai-fa/explore/40-Concepts/范数)（更新量判据）、[Transformer](/ai-fa/explore/20-Algorithms/Transformer)（层间非均匀性的来源）、[期望](/ai-fa/explore/40-Concepts/期望)。

## 6. 影响后续


## 7. 读前须知

[Adam更新规则](/ai-fa/explore/30-Formulas/Adam更新规则)（为何有界陈旧可控：动量/二阶矩的有界性假设）；[范数](/ai-fa/explore/40-Concepts/范数)（阈值判据）；I/O 突发与流水线的基础概念。
