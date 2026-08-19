---
type: concept
aliases: [Score函数, Score Function, 对数密度梯度]
domain: 数学基础
tags: [concept]
---

# Score 函数 Score Function

## 1. 定义（直觉 → 形式）

**直觉**：分布的"登山向导"。在任意一点 $x$，score 告诉你**往哪个方向走、概率密度会上升最快**。生成数据 = 从低概率区被 score 引导走向高概率区（数据所在的地方）。

**形式**：
$$s(x) = \nabla_x \log p(x)$$
注意：梯度对 **$x$** 求（不是对参数求！），所以也叫"对数密度的空间梯度"。

**为什么它好学**：估计 score 不需要密度的归一化常数 $Z$！$p(x) = \tilde{p}(x)/Z \Rightarrow \nabla_x \log p(x) = \nabla_x \log \tilde{p}(x)$——$Z$ 被对数差消掉了。这是 score-based 生成的核心优势（对比：直接学密度必须算 $Z$，高维下不可行）。

## 2. 数学形式

- **朗之万动力学（Langevin dynamics）**：$x_{k+1} = x_k + \frac{\eta}{2} \nabla_x \log p(x_k) + \sqrt{\eta}\, \epsilon_k$——只用 score 就能采样（$\eta \to 0$ 时收敛）
- **denoising score matching**：$\mathbb{E}_{x_0, \tilde{x}}\left[ \| s_\theta(\tilde x) - \nabla_{\tilde{x}} \log q(\tilde x \mid x_0) \|_2^2 \right]$——不用真 score（不可得）而用加噪条件分布的 score 当目标，等价化简后 = 预测所加噪声（DDPM 训练目标的孪生兄弟）
- **与噪声预测的关系**：$s_\theta(x_t, t) \approx -\epsilon_\theta(x_t, t) / \sigma_t$——学 score 就是学噪声（差一个已知的尺度因子）

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[20-Algorithms/Score-Based生成模型]]（SMLD） | 多尺度加噪 + 每尺度学 score + 退火朗之万采样 |
| [[30-Formulas/Score-SDE前向过程]] | 反向 SDE 漂移项需要 $\nabla_x \log p_t$ |
| [[30-Formulas/DDPM训练目标]] | 训练目标本质是 score matching 的特例 |
| [[40-Concepts/能量模型]] | score = 能量的负梯度，绕开配分函数 |

## 4. 常见误区

- **误区**：score 与 [[40-Concepts/RL中的log导数技巧]] 里的 "score"（对数似然梯度 ∇log π）混淆——两者都是 ∇log，前者对**变量**求导，后者对**参数**求导，文献都叫 score，靠上下文区分
- **误区**：$p$ 未知时"∇log p 未知所以学不了"——denoising score matching 恰好绕开
- **误区**：score 学得准 ≠ 密度能算出来，只保证采样方向正确

## 5. 相关概念

- [[40-Concepts/概率分布]]：score 是分布的属性
- [[40-Concepts/梯度]]：score 是梯度的特例用法
- [[40-Concepts/随机微分方程（SDE）|随机微分方程]]：反向 SDE 用 score 修正漂移
- [[40-Concepts/能量模型]]：能量梯度视角
