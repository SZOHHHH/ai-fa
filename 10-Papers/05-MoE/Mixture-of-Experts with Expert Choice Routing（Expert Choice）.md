---
type: paper
title: Mixture-of-Experts with Expert Choice Routing
aliases: [Expert Choice]
year: 2022
authors: [Yaniv Zhou, Rapha Gontijo Lopes, Samy Bengio]
venue: ICLR 2023
arxiv: "2202.09368"
line: MoE
matrix_coords: [token级, 专家自选, 天然均衡]
tags: [paper]
---

# Expert Choice Routing

## 1. 一句话贡献

路由反转——不再是 token 选专家，而是**专家选 token**：负载均衡天然成立，token 丢弃问题消失。

## 2. 核心贡献

- **转置路由**：$G^\top$ softmax——每专家固定取 top-k token
- **完美均衡**：每专家容量恒定（无需辅助损失调参）
- 相同算力下各任务稳定提升

## 3. 方法概要

1. 算 token-专家相关度矩阵
2. 转置：每专家对全 batch token 取 top-k（容量固定）
3. 溢出的是 token（可残差直通）而非专家失衡
4. 无需容量因子魔法数

## 4. 核心公式

- [[30-Formulas/MoE门控公式]] §2 Expert Choice 行

## 5. 与前作的关系

- 颠覆了 [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]] 系"token 选专家"的默认方向
- 均衡难题从损失设计（$f_iP_i$）转为结构保证

## 6. 影响与后续

- 自回归推理下需设计（因果掩码与转置路由的适配）
- 与 Switch/GShard 成为路由设计三选项之一

## 7. 读前须知

[[30-Formulas/MoE门控公式]]、[[20-Algorithms/混合专家（MoE）]]

> 近邻同族：[[Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts（无辅助损失MoE）]] · [[DeepSeek-V3 Technical Report（DeepSeek-V3）]]
