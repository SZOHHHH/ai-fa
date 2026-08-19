---
type: algo
aliases: [混合专家, MoE, Mixture of Experts, 稀疏专家]
line: 架构演进
tags: [algo]
---

# 混合专家 MoE

## 1. 定义

**非数学语言**：每个 FFN 层变成 N 个"专家"网络 + 一个"路由员"。每个 token 只派发给最拿手的 1–2 个专家干活——**参数量巨大（容量大）但每个 token 只用零头（计算量小）**。像医院分诊：挂号总量不变，但患者只挂对口的科。

**数学语言**：FFN 输出 $y = \sum_i g_i(x)\, E_i(x)$，门控 $g$ 稀疏（top-k 或软）；路由通常带噪声与负载均衡损失。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [[10-Papers/03-后处理/Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]] | 路由 + top-k 门控 + 负载均衡 | 2017 |
| [[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]] | MoE 进 Transformer、双层路由 | 2020 |
| [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]] | top-1 路由简化、规模化验证 | 2021 |
| [[10-Papers/05-MoE/GLaM- Efficient Scaling of Language Models with Mixture-of-Experts（GLaM）]] | 1.2T 参数、64 专家、效果超 GPT-3 用 1/3 能耗 | 2021 |
| [[10-Papers/05-MoE/Mixture-of-Experts with Expert Choice Routing（Expert Choice）]] | 反转路由：专家选 token | 2022 |
| [[10-Papers/05-MoE/From Sparse to Soft Mixtures of Experts（Soft MoE）]] | 连续软混合（离散路由的连续松弛） | 2023 |
| [[10-Papers/05-MoE/Mixtral of Experts（Mixtral）]] | 开源 MoE 8×7B 顶流 | 2024 |
| [[10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]] | 细粒度专家 + 共享专家 | 2024 |

## 3. 核心公式（B4 批建公式页，此处先列骨架）

- **稀疏门控**：$G(x) = \mathrm{softmax}(\mathrm{top}\text{-}k(W_g x + \epsilon))$，$y = \sum_{i \in \text{topk}} G_i(x)\, E_i(x)$
- **负载均衡损失**：$\mathcal{L}_{\text{aux}} = \alpha \sum_i f_i P_i$（防专家贫富分化、路由坍缩）
- Switch 简化版：top-1 + 容量因子
- DeepSeekMoE：$N$ 细专家中选 $k$ + $K_s$ 共享专家常开

## 4. 数学概念分解

[[40-Concepts/softmax函数]]（门控）、[[40-Concepts/期望]]（均衡损失的统计形式）、[[40-Concepts/梯度]]（不可导 top-k 的处理：直通估计，连 [[40-Concepts/重参数化]] 孪生话题）

## 5. 变体与演进

| 变体 | 改了什么 | 代表 |
|---|---|---|
| 稠密混合 | 全专家加权（无稀疏） | 早期 MoE |
| Top-k 稀疏 | 只激活 k 个 | Shazeer 2017 / GShard |
| Top-1 | 极简路由 | Switch |
| 专家选择 | 反向分配 | Expert Choice |
| 细粒度+共享 | 专家拆小 + 常驻共享 | DeepSeekMoE |
| 软混合 | 连续化端到端 | Soft MoE |

## 6. 对比表

| | Dense | MoE |
|---|---|---|
| 参数/计算比 | 1:1 | ~1:0.1–0.3（参数大、算得少） |
| 显存（部署） | 小 | 大（全部专家常驻） |
| 训练效率 | 基准 | 同算力 loss 降更快 |
| 风险点 | — | 负载不均、路由坍缩、专家冗余 |

**与 [[30-Formulas/MLA多头潜在注意力]] 的分工**：MLA 省推理 KV cache、MoE 省激活 FLOPs——DeepSeek 系"省资源双剑客"。
