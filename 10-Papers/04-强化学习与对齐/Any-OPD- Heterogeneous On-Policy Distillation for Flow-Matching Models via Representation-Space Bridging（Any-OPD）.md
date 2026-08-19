---
type: paper
layer: 占位
title: Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging
aliases: [Any-OPD]
year: 2026
authors: [Siming Fu et al.]
venue: arXiv 2026
arxiv: "2608.03316"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [学生轨迹, 表示空间散度, 连续域]
tags: [paper, 占位层]
---

# Any-OPD- Heterogeneous On-Policy Distillation for Flow-Matching Models via Representation-Space Bridging（Any-OPD·七节版）

## 1. 一句话贡献

异构 FM 模型间的 OPD：teacher 当黑盒采样器，在冻结模型无关视觉表示空间对比输出，连续噪声级匹配对齐轨迹——FLUX.1-dev(12B)→SD3.5-Medium(2.5B)。

## 2. 核心贡献

1. 异构 FM 模型间的 OPD：teacher 当黑盒采样器，在冻结模型无关视觉表示空间对比输出，连续噪声级匹配对齐轨迹
2. FLUX.1-dev(12B)→SD3.5-Medium(2.5B)。

## 3. 方法概要

绕开 latent/架构不匹配：两模型输出各自解码后在共享冻结表示空间比较；锚定阶段用 student [[Auto-Encoding Variational Bayes（VAE）|VAE]] 重编码 teacher 样本保证梯度反映质量而非域差。

## 4. 核心公式

$$
\mathcal{L} = \mathbb{E}\big\|\phi(x^S_t) - \text{sg}\big[\phi(x^T_{\hat t})\big]\big\|^2,\quad \hat t = \arg\min |\sigma_T(\hat t) - \sigma_S(t)|
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩 **OPD 思想进入生成域（FM）的首批占位**——蒸馏域矩阵与 [[60-Matrices/生成模型加速矩阵]] 的跨矩阵格；关联 [[10-Papers/09-世界模型与JEPA/Learning Latent Action World Models In The Wild（3R2D）]] 的冻结表示思想


## 6. 影响与占位意义

RS 库 08-05 已收（relevance 5/5）；本卡入库使两库情报同步。

> 近邻同族：[[CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）]] · [[Entropy-Aware On-Policy Distillation of Language Models（EOPD）]]
> 数学根基（占位层）：[[策略梯度定理]]
> 数学根基：[[蒸馏损失]] · [[DSM目标]]

## 7. 读前须知

需要：KL 散度两方向（前向=质量覆盖，反向=模式搜索）；策略梯度；反向 KL 的单样本可估性——整个 OPD 家族计算可行的钥匙
