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
| [[10-Papers/05-MoE/Chimaera A Mixture-of-Graph-Experts Architecture for Cross-Task and Cross-Dataset Graph Learning]] | MoE 思想跨域移植（图学习跨任务/跨数据集） | 2026 |
| [[10-Papers/05-MoE/Data Scarcity and Model Sparsity Mixtures-of-Experts Overfit More to Repeated Data]] | 稀疏性风险实证（MoE 更易过拟合重复数据） | 2026 |

## 3. 核心公式（B4 批建公式页，此处先列骨架）

- **稀疏门控**：$G(x) = \mathrm{softmax}(\mathrm{top}\text{-}k(W_g x + \epsilon))$，$y = \sum_{i \in \text{topk}} G_i(x)\, E_i(x)$
- **负载均衡损失**：$\mathcal{L}_{\text{aux}} = \alpha \sum_i f_i P_i$（防专家贫富分化、路由坍缩）
- Switch 简化版：top-1 + 容量因子
- DeepSeekMoE：$N$ 细专家中选 $k$ + $K_s$ 共享专家常开

## 教程：一个 token 的一次路由（稀疏前向导览）

**第 1 步：token 到达 FFN 层。** Transformer 块的 FFN 位换成 N 个并列专家 + 一个门控（本卡场景：N=4）。

**第 2 步：门控打分。** 门控网络算 logits $(2.0,\ 1.0,\ 0.5,\ -1.0)$ → top-2 选中 $E_1, E_2$ → 局部 softmax 得 $G = (0.73,\ 0.27)$——**完整手算见 [[30-Formulas/MoE门控公式]] 教程**（$E_3, E_4$ 本步完全不计算）。

**第 3 步：稀疏执行。** 输出 $y = 0.73\,E_1(x) + 0.27\,E_2(x)$——每 token 只算 2/N 的 FFN 参数：**总参数 ×N、每 token 计算 ×2/N**（"大而不贵"的解耦账）。

**第 4 步：训练侧的两件保安装置。** ①噪声打破平局（训练早期 logits 并列防锁定）；②负载均衡损失 $\sum f_i P_i = 0.325$ vs 均衡 0.25 的"偏心税"（[[30-Formulas/MoE门控公式]] 教程第 5 步：马太效应的解药）。

**第 5 步：谱系读法。** 稀疏 MoE（LSTM 时代）→ Switch（top-1 极简）→ GShard（进 Transformer）→ DeepSeekMoE（细粒度+共享专家）——路由粒度与专家设计两条演进轴；与 MLA 并列为 DeepSeek 系"省显存两大件"（[[30-Formulas/MLA多头潜在注意力]]）。

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

- → 后继补记（260916）：[[10-Papers/01-架构演进/ACE Adaptive Calibration-Free Expert Skipping for MoE-based LLMs|ACE]]（MoE 推理效率轴：免校准专家跳过）
- → 后继补记（260918）：[[10-Papers/05-MoE/Higher-order pruning of experts in mixture-of-experts language models|HOPE]]（专家剪枝从一阶可加假设升级到二阶协作目标）、[[10-Papers/05-MoE/Infinite-Parameter LLMs Generating and Adapting Weights from Live Data|Infinite-Parameter LLMs]]（静态专家池→活数据生成权重的变体轴）

## 自测

1. 一个 token 的路由流程？（logits→top-2→局部 softmax G=(0.73,0.27)→加权输出，其余专家不算）
2. 参数与计算的解耦账？（总参数 ×N、每 token 计算 ×2/N——大而不贵）
3. 负载均衡损失治什么？（马太效应（中彩专家垄断）——偏心税 0.325 vs 均衡 0.25）
4. MoE 与 MLA 并列的原因？（DeepSeek 系省显存两大件：省激活 FLOPs vs 省 KV cache）
