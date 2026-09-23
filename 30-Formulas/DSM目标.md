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

## 教程：一次 score 回归 + 一步朗之万

**第 1 步：造加噪样本。** $x_0 = 2$，$\sigma = 0.5$，抽 $u = 0.4$：$\tilde x = 2 + 0.5\times0.4 = 2.2$。

**第 2 步：目标 score 是闭式。** $\nabla_{\tilde x}\log q(\tilde x\mid x_0) = -(\tilde x - x_0)/\sigma^2 = -(2.2-2)/0.25 = -0.8$——**这就是标签**：不用网络、不用蒙特卡洛，加性高斯直接求导可得（score 版训练的立身之本）。

**第 3 步：回归判分。** 网络 $s_\theta(2.2, 0.5) = -0.7$：$\mathcal{L}_{\text{DSM}} = \frac12(-0.7+0.8)^2 = 0.005$。

**第 4 步：与 ε-预测对账（两派合流的换算）。** $s = -\epsilon/\sigma$：真实 $\epsilon = -\sigma s^* = 0.5\times0.8 = 0.4$ ✓（**正是第 1 步抽的 $u$**）；网络隐含 $\epsilon_\theta = -\sigma s_\theta = 0.35$。去掉 ½ 因子对账：$\|s_\theta-s^*\|^2 = 0.01$ ↔ $\|\epsilon_\theta-\epsilon\|^2 = 0.0025 = \sigma^2\times0.01$ ✓——**同一目标的两种记账单位**（差 $\sigma^2$ 倍）。

**第 5 步：朗之万走一步。** $\eta = 0.1$，抽 $\epsilon_k = 0$：$x_1 = 2.2 + \frac{0.1}{2}(-0.8) + \sqrt{0.1}\times0 = 2.16$——朝数据点 2 靠近 ✓。新点 score $= -(2.16-2)/0.25 = -0.64$，下一步只挪 $0.05\times(-0.64) = -0.032$——**步子自动变小**（越近数据拉力越弱）。噪声项 $\sqrt\eta\,\epsilon_k$ 必须留：纯梯度下降会让所有样本塌到众数一个点，噪声维持分布的宽度。

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

## 6. 自测

1. DSM 的标签为什么不用学？（加性高斯的 score 闭式：$-(\tilde x - x_0)/\sigma^2$——直接可算）
2. $s_\theta = -0.7,\ s^* = -0.8,\ \sigma = 0.5$：ε 侧误差多少？（$\epsilon_\theta = 0.35$ vs $\epsilon = 0.4$——$\sigma\times$score 误差，即 0.05）
3. 朗之万更新为什么必须带 $\sqrt\eta\,\epsilon_k$ 噪声项？（纯确定性下降塌缩到众数；噪声维持分布覆盖）
4. 为什么要多尺度退火？（单一大 σ：远离流形处 score 估计不可靠；大 σ 粗定位→小 σ 精修——SMLD 的 L 档 σ 链）

## 7. 与其他公式的关系

- ≡ **等价于** [[30-Formulas/DDPM训练目标]]（线性换算 $s_\theta \leftrightarrow \epsilon_\theta$）——"score 派"与"扩散派"合流点
- ⊂ **特化于** [[30-Formulas/Score-SDE前向过程]]：VE-SDE 的离散多尺度版本
- → **被泛化**：由 Score-SDE 统一进 SDE 框架
- 同族：[[30-Formulas/条件流匹配损失]] 也是回归型（预测速度场）
