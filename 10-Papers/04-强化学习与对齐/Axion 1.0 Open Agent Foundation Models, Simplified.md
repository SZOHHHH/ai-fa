---
type: paper
title: "Axion 1.0: Open Agent Foundation Models, Simplified"
aliases: [Axion 1.0]
year: 2026
authors: [Yuqi Jia, et al.]
venue: 待核（arXiv 2026-11-02，v2）
arxiv: "2611.03233v2"
pdf: https://arxiv.org/pdf/2611.03233v2
line: 强化学习与对齐
matrix_coords: [agent基座(全开源), 2×SFT+RL三阶段, 模型感知数据构造]
tags: [paper]
---
# Axion 1.0：极简三阶段全开源智能体基座

> 中文速览：发布全开源智能体基座模型 Axion 1.0，主打极简三阶段配方：两段轻量 SFT+一段 RL，不用中途训练/DPO/在线策略蒸馏。第一段 SFT 以「模型感知数据构造」培养独立自足推理——从基座自身成功策略出发合成高难问题并对抗性强化；第二段用真实数据源构造可自动验证的工具依赖任务（确定性计算管线验证），把推理能力扩展到工具调用；RL 段强化长程推理与工具/环境交互。在广泛智能体基准上取得强成绩、部分可比商用模型；权重、数据构造/生成/过滤/验证管线、prompt 与训练代码全部开源。

## 1. 一句话贡献

全开源智能体基座：只用两段轻量 SFT（模型感知数据构造的独立推理 + 可自动验证的工具任务）加一段 RL（长程推理与工具/环境交互），不用中途训练/DPO/在线策略蒸馏，在广泛智能体基准上部分可比商用模型，且数据构造到训练代码全链开源。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/RLHF]] · [[20-Algorithms/GRPO与RLVR]]（RL 段=可验证奖励的长程推理/工具交互——RLVR 范式在 agent 基座上的工业化落地）；
- ≡ 数据构造近邻：[[40-Concepts/过程奖励与结果奖励（PRM-ORM）]]（第二段 SFT 的「确定性计算管线验证」=ORM 的极致形态——验证完全免模型）；[[40-Concepts/思维链（CoT）]]（第一段 SFT 先立独立 CoT 再扩工具调用——「先会想、再用工具」的次序主张）；
- 概念/公式链：[[30-Formulas/GRPO目标]] · [[40-Concepts/策略梯度定理]]。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.03233v2；在线全文（新论文）：https://arxiv.org/html/2611.03233v2

---

> 谱系枢纽：[[20-Algorithms/GRPO与RLVR]]（图谱连通入口）

> 数学根基：[[30-Formulas/GRPO目标]] · [[40-Concepts/过程奖励与结果奖励（PRM-ORM）]] · [[20-Algorithms/RLHF]]
