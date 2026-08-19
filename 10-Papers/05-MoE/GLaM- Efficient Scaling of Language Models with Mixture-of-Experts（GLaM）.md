---
type: paper
title: GLaM - Efficient Scaling of Language Models with Mixture-of-Experts
aliases: [GLaM]
year: 2021
authors: [Nan Du, Yanping Huang, Andrew M. Dai, et al.]
venue: ICML 2022
arxiv: "2112.06905"
line: MoE
matrix_coords: [token级, Top-K稀疏路由, 辅助均衡损失]
tags: [paper]
---

# GLaM

## 1. 一句话贡献

1.2T 参数 64 专家 MoE——GPT-3 级质量只花 1/3 训练能耗，MoE 经济学首个大规模实证。

## 2. 核心贡献

- **能耗叙事**：质量/能耗双轴对比 GPT-3（同水平省 3×）
- **Top-2 + 容量**工程化：64 专家×64 层的稳定训练
- 少样本全任务评测（29 项）

## 3. 方法概要

1. 1.2T 总参/仅 8% 激活（~97B/token）
2. 每 层 FFN → 64 专家 top-2
3. 1.6T token 训练
4. 与 GPT-3 175B 全面对比

## 4. 核心公式

- [[30-Formulas/MoE门控公式]]（GShard 系配置）

## 5. 与前作的关系

- 规模化验证了 [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]/[[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]] 路线
- 对比 [[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]]：稠密巨兽 vs 稀疏经济学的正面交锋

## 6. 影响与后续

- "质量每能耗"成为 MoE 论文标配指标
- 为 Mixtral/DeepSeek 系的开源 MoE 浪潮提供方法模板

## 7. 读前须知

[[20-Algorithms/混合专家（MoE）]]、[[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]]

> 近邻同族：[[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]] · [[DeepSeek-V3 Technical Report（DeepSeek-V3）]]
