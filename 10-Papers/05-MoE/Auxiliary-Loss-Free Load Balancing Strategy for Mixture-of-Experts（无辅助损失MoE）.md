---
type: paper
layer: 占位
title: Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts
aliases: [无辅助损失MoE]
year: 2024
authors: [Wang et al. (DeepSeek)]
venue: arXiv 2024
arxiv: "2408.15664"
pdf: 已下载（PDF/）
line: MoE
matrix_coords: [token级, Top-K稀疏路由, 去偏置]
tags: [paper, 占位层]
---

# Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE·七节版）

## 1. 一句话贡献

**删掉均衡辅助损失**：给路由分数加 per-expert 偏置（只影响 Top-K 选择不影响门控值），过载专家偏置自动下调——均衡与主目标梯度零冲突。

## 2. 核心贡献

1. 删掉均衡辅助损失：给路由分数加 per-expert 偏置（只影响 Top-K 选择不影响门控值），过载专家偏置自动下调
2. 均衡与主目标梯度零冲突。

## 3. 方法概要

偏置项按各专家近期负载动态调整（过载降/欠载升），只进选择不进加权——梯度通路保持纯净；DeepSeek-V3 全面采用。

## 4. 核心公式

$$
\text{TopK}\big(s_i + b_i\big),\ b_i \leftarrow b_i - \gamma\,\mathrm{sign}(\text{load}_i - \bar{\text{load}}),\ \text{门控值不含 } b_i
$$

**直觉**：占位层公式为结构示意，精读原文后应校正为论文最终形式并补逐项解释。

## 5. 与前作/矩阵关系

🚩🚩 **占 [[60-Matrices/MoE路由矩阵]] "去偏置路由"机会格的主位**——B9 机会格"去偏置路由×理论"的工程实现已被 DeepSeek 占（理论保证侧仍薄但窗口窄）


## 6. 影响与占位意义

榜上格核查：去偏路由格 🚩 关闭。

---

> 谱系枢纽：[[Mixtral of Experts（Mixtral）]]（图谱连通入口）
> 近邻同族：[[DeepSeek-V3 Technical Report（DeepSeek-V3）]] · [[DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]]
> 数学根基（占位层）：[[softmax函数]]

## 7. 读前须知

需要：Top-K 路由；负载均衡损失与主目标的梯度冲突；容量因子
