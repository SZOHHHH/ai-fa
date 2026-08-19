---
type: formula
formula_id: MOE-GATE
aliases: [MoE门控公式, 稀疏门控, Top-k路由, 负载均衡损失]
domain: 架构
tags: [formula]
---

# MoE 门控与负载均衡

## 1. 标准形式

**稀疏门控（Shazeer 2017 原始版）**：
$$G(x) = \mathrm{softmax}\!\left( \mathrm{top}\text{-}k( W_g x + \epsilon) \right), \qquad y = \sum_{i \in \text{topk}} G_i(x)\, E_i(x)$$
（$\epsilon$：噪声打破平局；top-k 外位置置 $-\infty$ 后 softmax）

**负载均衡损失（防坍缩的关键附加项）**：
$$\mathcal{L}_{\text{aux}} = \alpha \sum_{i=1}^{N} f_i \cdot P_i, \qquad f_i = \frac{\text{token 数流向专家 } i}{\text{总 token}},\quad P_i = \mathbb{E}_x[\mathrm{softmax}(W_g x)_i]$$
（$f_i \cdot P_i$ 之和在均匀分布时最小——逼路由"雨露均沾"）

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| Top-k 噪声门控（本库标准） | 如上 | [[10-Papers/03-后处理/Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]] | N=数千专家 LSTM 时代 |
| Switch（top-1） | 每 token 单专家 + 容量因子 | [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]] | 极简+规模化 |
| GShard | top-2 + 辅助损失变体 + 分片 | [[10-Papers/05-MoE/GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）]] | MoE 入 Transformer |
| Expert Choice | $G^\top$：专家选 token（转置路由） | [[10-Papers/05-MoE/Mixture-of-Experts with Expert Choice Routing（Expert Choice）]] | 天然均衡 |
| Soft MoE | $y_j = \sum_i \text{softmax}_i(X w_{ij})\, x_i$ 槽位连续混合 | [[10-Papers/05-MoE/From Sparse to Soft Mixtures of Experts（Soft MoE）]] | 离散→连续（可导） |
| DeepSeekMoE | 细粒度专家 + 共享专家常开 | [[10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]] | 专业化设计 |

## 3. 直觉解释

- **门控 = 可微寻址**：与 [[40-Concepts/注意力机制]]（softmax 软寻址）同族——注意力加权"值"，MoE 加权"专家输出"，本质都是**混合网络**
- **为什么必须负载均衡项**：训练早期随机性会让某专家"中彩"，更多 token 流入 → 它更强 → 更多 token（马太效应）→ 其他专家饿死。$f_i P_i$ 惩罚打破正反馈
- **top-k 不可导**：门控选择是离散的——梯度只流过被选中专家（直通估计，[[40-Concepts/重参数化]] 的离散亲戚）
- **容量因子**：每专家设 token 上限，超出的丢弃——防 batch 内分布不均的显存爆炸
- **参数 vs 计算的解耦**：总参数 ×N（容量），每 token 计算 ×k/N（稀疏）——"大而不贵"

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/03-后处理/Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）]] | 奠基 |
| [[10-Papers/05-MoE/Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）]] | top-1 简化 + T 参数级 |
| [[10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）]] | 细粒度专业化 |

## 5. 数学概念分解

- [[40-Concepts/softmax函数]]：门控
- [[40-Concepts/期望]]：均衡损失的统计形式
- [[20-Algorithms/混合专家（MoE）]]：母概念

## 6. 与其他公式的关系

- ↔ **同族** [[30-Formulas/注意力核心公式]]：软寻址混合（注意力=全混合、MoE=稀疏混合）
- → 配套 [[30-Formulas/MLA多头潜在注意力]]：DeepSeek 的省资源双件套
- top-k 离散化手段 ≈ VQ-VAE 的量化（[[30-Formulas/VQ-VAE目标]]）——离散选择的直通估计家族
