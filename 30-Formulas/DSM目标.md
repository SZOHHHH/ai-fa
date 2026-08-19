---
type: formula
formula_id: DSM
aliases: [DSM目标, 去噪分数匹配, Denoising Score Matching, 朗之万动力学]
domain: 生成建模
loss_type: regression
tags: [formula]
---

# 去噪分数匹配 DSM

## 1. 标准形式

$$\mathcal{L}_{\text{DSM}}(\theta) = \mathbb{E}_{x_0 \sim p_{\text{data}},\ \tilde{x} \sim q_\sigma(\tilde{x}\mid x_0)}\!\left[ \frac{1}{2}\left\| s_\theta(\tilde{x}, \sigma) - \nabla_{\tilde{x}} \log q_\sigma(\tilde{x} \mid x_0) \right\|_2^2 \right]$$

- $q_\sigma(\tilde x \mid x_0) = \mathcal{N}(\tilde x; x_0, \sigma^2 I)$：预加噪分布
- 目标 $\nabla_{\tilde{x}} \log q_\sigma$ **可解析计算**：$= -(\tilde x - x_0)/\sigma^2$（加性高斯的 score 是闭式的！）
- **等价定理**（Vincent 2011）：最小化 DSM ⇔ 最小化对加噪分布的显式 score matching（差一个与 $\theta$ 无关的常数）

**采样：退火朗之万动力学（annealed Langevin）**：
$$x_{k+1} = x_k + \frac{\eta_k}{2} s_\theta(x_k, \sigma_i) + \sqrt{\eta_k}\, \epsilon_k$$
噪声尺度从大到小逐级退火，score 在每级引导向高概率区。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| DSM | 如上 | Vincent 2011；SMLD | score 版"去噪" |
| ε-MSE | $\|\epsilon - \epsilon_\theta\|^2$ | DDPM | **线性换算**：$s_\theta = -\epsilon_\theta/\sigma$ |
| 多尺度 NCSN | $\sum_i \sigma_i^2\, \mathcal{L}_{\text{DSM}}(\sigma_i)$ | SMLD | 多噪声档覆盖流形 |
| 噪声条件 score | $s_\theta(x, \sigma)$ 单网多档 | SMLD | 一个网络吃所有噪声级 |

## 3. 直觉解释

- **为什么叫"去噪"**：训练时先给 $x_0$ 加噪，再让网络学会指出"噪声从哪来"的方向——score 指向数据流形
- **与 DDPM 的孪生关系**：DSM 的目标可化简为"预测加的噪声"——**DDPM 训练目标就是 DSM 的特例**，两派论文互引但记号完全不同，本库把换算表钉死在这里
- 朗之万采样的缺陷：步数极多、对噪声尺度敏感——这是 SMLD 需要多尺度退火、后被 Score-SDE 连续化的原因
- `#loss/regression`

## 4. 出处

| 论文 | 贡献 |
|---|---|
| Vincent 2011（Stacked Denoising Autoencoders 时期） | 等价性定理 |
| [[10-Papers/02-生成建模与扩散/Generative Modeling by Estimating Gradients of the Data Distribution（SMLD）]] | 首次大规模实用化 |
| [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] | 连续化统一 |

## 5. 数学概念分解

- [[40-Concepts/Score函数]]：预测对象
- [[40-Concepts/期望]]：联合期望
- [[40-Concepts/高斯分布]]：加噪分布 score 闭式可算
- [[40-Concepts/范数]]：平方 L2

## 6. 与其他公式的关系

- ≡ **等价于** [[30-Formulas/DDPM训练目标]]（线性换算 $s_\theta \leftrightarrow \epsilon_\theta$）——"score 派"与"扩散派"合流点
- ⊂ **特化于** [[30-Formulas/Score-SDE前向过程]]：VE-SDE 的离散多尺度版本
- → **被泛化**：由 Score-SDE 统一进 SDE 框架
- 同族：[[30-Formulas/条件流匹配损失]] 也是回归型（预测速度场）
