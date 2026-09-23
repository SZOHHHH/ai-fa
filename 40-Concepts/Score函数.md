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

## 教程：手算一个高斯的 score（并看懂朗之万怎么走）

**第 1 步：一维高斯的 score。** $p(x)=\mathcal{N}(\mu, 1)$：$\log p(x) = -\frac{(x-\mu)^2}{2} + \text{常数}$；求导：
$$s(x) = \nabla_x \log p(x) = -(x - \mu) = \mu - x$$
**读法**：在 $x$ 处，score 是一个**指向均值 $\mu$ 的向量**，离得越远拉力越大——"回家弹簧"，劲度系数 1。

**第 2 步：数值代入。** $\mu=3$：在 $x=5$ 处 $s=-2$（往左拉）；$x=0$ 处 $s=+3$（往右拉）；$x=3$ 处 $s=0$（山顶，静止）。**分布的峰=score 的零点**；多峰分布则有多个零点+分水岭（这就是"score 场的拓扑=分布的形状"）。

**第 3 步：归一化常数 Z 消失的现场。** $p(x) = \tilde p(x)/Z$：$\log p = \log\tilde p - \log Z$，对 $x$ 求导 $\Rightarrow \nabla\log p = \nabla\log\tilde p$——**$Z$ 与 $x$ 无关，差个常数就被导数抹掉**（对比：直接算密度必须知道 Z=高维积分，不可行——score 绕开它是 score-based 生成的立身之本）。

**第 4 步：朗之万走两步（手算）。** 从 $x_0=5$ 出发，步长 $\eta=1$：
- 第一步：$x_1 = 5 + \frac{1}{2}(1)(3-5) + \sqrt{1}\,\epsilon_0$。设 $\epsilon_0=+0.5$：$x_1 = 5-1+0.5 = 4.5$
- 第二步：$s(4.5) = -1.5$；设 $\epsilon_1=-0.3$：$x_2 = 4.5 - 0.75 - 0.3 = 3.45$——**确定性漂移拉向峰、随机项防止停在单点**；步数多了以后 $x$ 的分布收敛到 $p$ 本身（$\eta\to0$ 的理论保证）。生成=把纯噪声点灌进这个场里"顺坡滑向数据流形"。

**第 5 步：score 与 ε 预测的关系（DDPM 的另一张脸）。** $q(x_t\mid x_0)=\mathcal{N}(\sqrt{\bar\alpha_t}x_0,\ 1-\bar\alpha_t)$，按第 1 步同法求 score：$\nabla_{x_t}\log q = -\frac{x_t-\sqrt{\bar\alpha_t}x_0}{1-\bar\alpha_t} = -\frac{\epsilon}{\sqrt{1-\bar\alpha_t}}\cdot\frac{1}{\sqrt{1-\bar\alpha_t}} = -\frac{\epsilon}{1-\bar\alpha_t}$——**预测 score ⇔ 预测所加噪声**（差尺度因子）——同一枚硬币，DDPM 训练目标（[[30-Formulas/DDPM训练目标]]）与 denoising score matching 在这里合流。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[20-Algorithms/Score-Based生成模型]]（SMLD） | 多尺度加噪 + 每尺度学 score + 退火朗之万采样 |
| [[30-Formulas/Score-SDE前向过程]] | 反向 SDE 漂移项需要 $\nabla_x \log p_t$ |
| [[30-Formulas/DDPM训练目标]] | 训练目标本质是 score matching 的特例 |
| [[40-Concepts/能量模型]] | score = 能量的负梯度，绕开配分函数 |

## 4. 常见误区

- **误区**：score 与 [[40-Concepts/RL中的log导数技巧]] 里的 "score"（对数似然梯度 ∇log π）混淆——两者都是 ∇log，前者对**变量**求导，后者对**参数**求导，文献都叫 score，靠上下文区分。**完整对照（逐元素解剖 + 双数值例子 + Fisher 词源 + 两 score 在蒸馏里的串联）见 RL02 §1.5 专节**。
- **误区**：$p$ 未知时"∇log p 未知所以学不了"——denoising score matching 恰好绕开
- **误区**：score 学得准 ≠ 密度能算出来，只保证采样方向正确

## 5. 自测

1. $\mathcal{N}(\mu, \sigma^2)$ 的 score？（$(\mu-x)/\sigma^2$——劲度 $1/\sigma^2$：越尖的峰拉力越猛）
2. score 的零点是什么？（密度峰/谷——多峰分布多个零点，朗之万会陷局部峰，这正是加噪退火要解决的）
3. 为什么学 score 不用管配分函数？（$\nabla\log Z$ 对 $x$ 为零——差常数被导数消去）
4. $s_\theta(x_t,t)$ 与 $\epsilon_\theta(x_t,t)$ 的换算？（$s=-\epsilon/\sigma_t$ 量级——同一目标的两种参数化）

## 6. 相关概念

- [[40-Concepts/概率分布]]：score 是分布的属性
- [[40-Concepts/梯度]]：score 是梯度的特例用法
- [[40-Concepts/随机微分方程（SDE）|随机微分方程]]：反向 SDE 用 score 修正漂移
- [[40-Concepts/能量模型]]：能量梯度视角
