---
type: paper
title: "Combining Hierarchical Cognitive Process with Process Supervision for Interpretable Scene Safety Understanding"
aliases: [层级认知+过程监督场景安全]
year: 2026
authors: [Zhiyun Jiang, et al.]
venue: arXiv 2026
arxiv: "2609.26399v1"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: [应用MoE(场景安全), 层级认知过程建模, 过程监督数据集, LoRA+MoE专家分工]
tags: [paper]
---

# 层级认知过程×过程监督（可解释场景安全理解）

## 1. 一句话贡献

场景安全理解不学"场景→安全等级"直接映射，改学**人类认知过程**：先建层级认知安全结构（多步推理链），据此造带过程标签的高质量数据集（兼基准+训练资源），再用 LoRA+MoE 组合把推理链各子过程分给不同专家模块——可解释性（信息流+显著性逐中间步分析）与性能双胜传统直接映射法。

## 2. 核心贡献

- 层级认知安全结构：把"判断场景安不安全"拆成多步认知子过程（层次化推理链），是数据构建与模型设计的共同骨架
- 过程监督数据集：多步推理+过程标签，既当基准又当训练资源，支持中间推理步的细粒度分析（信息流/显著性技术）
- 模块化过程监督框架：LLM 为核心，LoRA+MoE 策略实现专家模块分工协作——每个专家负责推理链的一段子过程
- 实证：可解释性与性能双指标优于传统直接映射

## 3. 方法概要

1. 构建层级认知安全结构（从人类认知过程解读出推理链分层）
2. 按该结构造多步推理+过程标签数据集（基准+训练双用途）
3. LLM 骨干+LoRA 高效适配+MoE 专家分工：子过程→专家模块的映射与协作
4. 过程监督训练+中间步可解释性分析（信息流/显著性）

## 4. 核心公式

本文核心是数据/框架贡献，无新算法公式；MoE 分工骨架即家族门控（见 [[30-Formulas/MoE门控公式]]）：

`$y=\sum_{e\in\mathrm{TopK}} g(x)_e\,E_e(x)\quad\Rightarrow\quad \text{专家 }e\ \text{接管推理链子过程}\ \pi(e)$`

**直觉**：把"哪段认知子过程"当作路由语义——门控不只按 token 语义分工，而是按**推理功能**分工（这段是风险识别、那段是证据权衡）；LoRA 再给每个专家低秩可插拔的领域适配，两层模块化叠加。

## 5. 与前作/矩阵关系

- ←过程监督（process supervision）思想：奖励中间推理步而非只看最终对错（PRM 谱系在安全理解域的移植）
- ≡应用域 MoE 同族 [[Multi-View Mixture-of-Experts with Vision-Language Reranking for Cross-View Object Geo-Localization]]：都是"MoE 当任务分解器"的应用研究（那篇跨视角地理定位、本篇认知子过程）
- ↔[[From Sparse to Soft Mixtures of Experts（Soft MoE）]]：专家分工的软/硬谱系参照
- 实体锚 [[20-Algorithms/混合专家（MoE）]] · 概念锚 [[40-Concepts/低秩分解]]（LoRA 的数学本体）

## 6. 影响后续

"认知结构→数据结构→模型结构"三同构的方法论示范，对安全关键域可解释 AI 有模板价值；对库内谱系是 MoE 应用分支的一张普通卡，轮换线知识覆盖。

## 7. 读前须知

- LoRA 概念：[[40-Concepts/低秩分解]]（低秩增量适配）
- MoE 分工语义：[[20-Algorithms/混合专家（MoE）]]
- 过程监督 vs 结果监督的差别概念级即可
