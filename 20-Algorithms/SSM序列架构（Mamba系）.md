---
type: algo
aliases: [状态空间模型序列架构, Mamba架构, SSM序列模型, 选择性状态空间, 后Transformer架构]
line: 架构演进
tags: [algo]
---

# SSM 序列架构（Mamba 系）

## 1. 定义

**非数学语言**：RNN 的现代复活。读序列时维护一个"压缩记忆"（隐状态），新 token 来了更新记忆、从记忆产出输出——**每步只算常数时间**。Mamba 的突破是"选择性"：记忆更新规则由内容决定，该记的记该忘的忘。

**数学语言**：[[30-Formulas/状态空间模型方程]]——$h_t = \bar A(x_t) h_{t-1} + \bar B(x_t) x_t$（参数随输入变化即"选择性"）；训练用并行扫描、推理用 $O(1)$ 递归。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| HiPPO（2008.01061）/ S4（2111.00396） | 理论记忆压缩 + 结构化 SSM 可训 | 2020/2021 |
| [[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]] | 选择性机制 + 硬件感知扫描 | 2023 |
| [[10-Papers/01-架构演进/Transformers are SSMs- Generalized Models and Efficient Algorithms Through Structured St（Mamba-2）]] | SSD 对偶理论：注意力与 SSM 统一 | 2024 |
| Jamba（2404.07418，AI21） | 混合架构实用化（注意力+Mamba+MoE） | 2024 |
| RWKV（2305.13048） | 线性注意力 RNN 化（平行路线） | 2023 |
| RetNet（2307.08621） | 保留机制：训练/推理双形式 | 2023 |

## 3. 核心公式

- [[30-Formulas/状态空间模型方程]] —— 定义公式（含卷积/递归双形式与 SSD 对偶）
- [[30-Formulas/注意力计算复杂度]] —— 与注意力的复杂度对照

## 4. 数学概念分解

[[40-Concepts/常微分方程（ODE）]]（连续源头与离散化）、[[40-Concepts/注意力机制]]（对偶对象）、[[40-Concepts/马尔可夫链]]（隐状态演化结构）

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表 |
|---|---|---|
| LTI SSM（S4） | 固定参数（线性时不变）→ 卷积训练 | S4 2021 |
| 选择性 SSM | 参数随输入变（内容寻址记忆） | [[10-Papers/01-架构演进/Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）]] |
| SSD（Mamba-2） | 与注意力统一，训练更快 | [[10-Papers/01-架构演进/Transformers are SSMs- Generalized Models and Efficient Algorithms Through Structured St（Mamba-2）]] |
| 混合架构 | 注意力层+SSM 层交替（取长补短） | Jamba / Zamba / Samba |
| RWKV/RetNet | 从注意力端出发的姊妹路线 | 2023 |

## 6. 对比表（序列建模三范式）

| | Attention | RNN | SSM/Mamba |
|---|---|---|---|
| 记忆 | 全历史精确（KV cache） | 隐状态有损 | 隐状态有损但选择性 |
| 训练 | $O(n^2)$ 全并行 | $O(n)$ 串行 | $O(n)$ 并行扫描 |
| 推理/步 | $O(n)$ 读 cache | $O(1)$ | $O(1)$ |
| 检索精度 | 强（回忆原文） | 弱 | 中（可召回关键信息） |
| 工业现状 | 主导（含 Flash 优化） | 已淘汰 | 混合架构中服役（Jamba/Griffin 等） |

**历史坐标**：2023–24 的"后 Transformer"浪潮（Mamba 爆火）→ 2024–25 混合架构成为务实答案 → 2026 线性注意力与 SSM 在 SSD 框架下合流——**架构之争正在收敛成一个矩阵族的统一理论**。
