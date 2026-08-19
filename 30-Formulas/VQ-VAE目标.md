---
type: formula
formula_id: VQ-VAE-OBJ
aliases: [VQ-VAE目标, 向量量化目标, Codebook损失]
domain: 生成建模
loss_type: expectation-of-ratio
tags: [formula]
---

# VQ-VAE 目标

## 1. 标准形式

$$\mathcal{L} = \underbrace{\mathbb{E}\left[ \log p(x \mid z_q(x)) \right]}_{\text{重建}} + \underbrace{\|\mathrm{sg}[z_e(x)] - e\|_2^2}_{\text{codebook}} + \underbrace{\beta\, \|z_e(x) - \mathrm{sg}[e]\|_2^2}_{\text{承诺}}$$

- $z_e(x)$：编码器输出；$e$：最近的 codebook 向量；$z_q = e$：量化后送解码器的
- $\mathrm{sg}[\cdot]$：stop-gradient（直通估计的记号）
- 第二项：把 codebook 拉向编码（只动 codebook）
- 第三项：把编码拉向 codebook（只动编码器）——"承诺"编码器别乱跑
- **直通估计**：前向用 $z_q$、反向梯度直通到编码器（绕过不可导的最近邻查找）

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 三项式（本库标准） | 如上 | VQ-VAE 2017 | 原文 |
| EMA codebook | 用指数滑动平均更新 codebook | VQ-VAE-2、taming | 去掉 codebook loss，训练更稳 |
| Gumbel-VQ | softmax 松弛 | DALL·E | 端到端可导替代 |
| 有限标量量化 FSQ | 少量标量代替 codebook | 2023 | 化简量化机制 |

## 3. 直觉解释

- **为什么离散**：连续隐空间"什么都可能"，离散 codebook 强制信息瓶颈 → 学到的码有语义（类似词表）
- 直通估计是权宜之计：量化不可导，硬把梯度抄送过去
- **忠诚代价**：重建压损（codebook 容量瓶颈）→ 解码器被迫当"超分网络"
- 与自回归的组合：VQGAN = VQ-VAE（压缩）+ Transformer（在码序列上自回归）——两阶段生成的范式

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Neural Discrete Representation Learning（VQ-VAE）]] | 提出 |
| [[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]] | +感知损失 + Transformer 先验 |

## 5. 数学概念分解

- [[40-Concepts/期望]]：重建项
- [[40-Concepts/范数]]：codebook/承诺项
- [[40-Concepts/重参数化]]：直通估计是其离散孪生（都为"梯度穿过不可导层"）
- [[40-Concepts/KL散度]]：ELBO 家族中 VQ-VAE 的理论位置（先验为学习所得而非固定）

## 6. 与其他公式的关系

- ⊂ **特化自** [[30-Formulas/ELBO目标]]（离散隐变量 + 学习先验版本）
- 对比 [[30-Formulas/DDPM训练目标]]：同为回归型重建，但隐空间离散 vs 连续加噪
- → **组合出** VQGAN / DALL·E / Sora 的 tokenizer 路线（多模态线会回链）
