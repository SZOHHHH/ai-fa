---
type: concept
aliases: [证据下界, ELBO, Evidence Lower Bound, 变分下界, Variational Lower Bound]
domain: 数学基础
tags: [concept]
---

# ELBO 证据下界

## 1. 定义（直觉 → 形式）

**直觉**：想最大化数据的对数似然 $\log p_\theta(x)$，但它内部藏着无法计算的隐变量积分。ELBO 是它的一个**可计算的下界**——抬不了真值就抬下界，下界被抬高的过程中真值大概率也跟着升。像隔着墙用磁铁引物体：看不见但能"隔空发力"。

**形式**（两种等价形态，本页母版；实操见 [[30-Formulas/ELBO目标]]）：
$$\log p_\theta(x) \;\ge\; \text{ELBO}(x;\theta,\phi) = \mathbb{E}_{q_\phi(z\mid x)}\!\left[ \log \frac{p_\theta(x, z)}{q_\phi(z\mid x)} \right]$$
且差距有精确身份：
$$\log p_\theta(x) = \text{ELBO} + D_{\mathrm{KL}}\big(q_\phi(z\mid x)\,\|\,p_\theta(z\mid x)\big)$$

## 2. 教程：推导慢放（每步只有一个动作）

**第 1 步：问题——一个积不出来的分母。** 隐变量模型的似然：
$$p_\theta(x) = \int p_\theta(x\mid z)\, p(z)\, dz$$
$z$ 连续、$p_\theta(x|z)$ 是神经网络 → 积分没有闭式、数值积分维度爆炸。$\log$ 也救不了。

**第 2 步：引入"替身分布" $q_\phi(z|x)$。** 造一个好算的分布（如高斯）去**模仿**真后验 $p_\theta(z|x)$，把积不出来的期望改写成对这个替身的期望：
$$p_\theta(x) = \int q_\phi(z\mid x)\,\frac{p_\theta(x, z)}{q_\phi(z\mid x)}\, dz = \mathbb{E}_{q}\!\left[\frac{p_\theta(x,z)}{q_\phi(z\mid x)}\right]$$
（恒等变换：分子分母同乘除 $q$——没动任何真东西。）

**第 3 步：Jensen 一步定乾坤。** $\log$ 是凹函数，$\log\mathbb{E}[\cdot] \ge \mathbb{E}[\log\cdot]$（[[40-Concepts/Jensen不等式]]）：
$$\log p_\theta(x) = \log\mathbb{E}_q\!\left[\frac{p_\theta(x,z)}{q}\right] \;\ge\; \mathbb{E}_q\!\left[\log\frac{p_\theta(x,z)}{q}\right] = \text{ELBO}$$
**下界就是这么来的——一行凹性，再无别的魔法。**

**第 4 步：拆开看结构（重建+正则）。** $\log p_\theta(x,z) = \log p_\theta(x|z) + \log p(z)$ 代入：
$$\text{ELBO} = \underbrace{\mathbb{E}_q[\log p_\theta(x\mid z)]}_{\text{重建：解码像不像}} \;-\; \underbrace{\mathbb{E}_q\big[\log\frac{q_\phi(z\mid x)}{p(z)}\big]}_{=\,D_{\mathrm{KL}}(q\,\|\,p(z))\ \text{正则：编码别飘}}$$

**第 5 步：gap 的精确身份（ELBO 最深刻的一行）。** 直接展开可以证明：
$$\log p_\theta(x) - \text{ELBO} = D_{\mathrm{KL}}\big(q_\phi(z\mid x)\,\big\|\,p_\theta(z\mid x)\big)$$
三个推论：①gap ≥ 0 恒成立（KL 非负）；②**抬 ELBO 一石二鸟**——要么真似然升，要么替身更贴真后验（gap 缩）；③当 $q$ 完美模仿真后验时 ELBO=真值（变分推断的收敛态）。

**第 6 步：手算一个迷你 gap。** 设真后验与替身都是一维高斯：$p(z|x)=\mathcal{N}(1, 1)$，$q=\mathcal{N}(1.5, 2)$。KL 闭式（两高斯，[[40-Concepts/KL散度]]）：
$$D_{\mathrm{KL}} = \log\frac{1}{\sqrt{2}} + \frac{2 + (1.5-1)^2}{2\cdot 1} - \frac{1}{2} = -0.347 + 1.125 - 0.5 = 0.278$$
即：替身只要偏成这样，ELBO 就比真值低 0.278 nat——**gap 是替身质量的明码标价**。

**第 7 步：为什么叫"变分"。** 变分法=在**函数/分布空间**上做优化（不是在参数空间）。这里对整个分布 $q_\phi$ 求最优（"变分推断"），Kingma 把 $q$ 参数化为神经网络（amortized）——推断一次前向完成，于是有了 [[20-Algorithms/变分自编码器|VAE]]。

## 3. 为什么 AI 需要它（大一统视角）

| 出现场景 | 用法 |
|---|---|
| [[20-Algorithms/变分自编码器|VAE]] | 整个 VAE 的训练目标就是 ELBO（一步隐变量） |
| [[30-Formulas/DDPM训练目标]] | 变分界是 ELBO 的马尔可夫链版本，逐项化简成 MSE |
| [[30-Formulas/条件流匹配损失]] | 理论上 FM 损失是 ELBO 的连续时间/速度场版本（Stochastic Interpolants 论文证明） |
| 统一视角 | VAE（一次跳）/ DDPM（T 步跳）/ FM（连续时间流）是同一骨架的三种实例化 |

**这是生成建模最重要的"大一统"概念**：三个家族的训练目标都是某个 ELBO，差别只在隐变量结构与推断网络的设计。

## 4. 常见误区

- **误区**：最大化 ELBO ≠ 最大化似然——它是下界，可能下界升真值不动；但 gap 恰是 KL，双重收益有保证（§2 第 5 步）
- **误区**："证据"指"证明"——evidence = observed data $x$（统计术语：数据是理论的"证据"），ELBO=数据似然的下界
- **误区**：ELBO 是唯一的下界——重加权版本（去噪 ELBO、β-ELBO）也是下界族的成员；重要性加权下界（IWAE）比 ELBO 更紧
- **误区**：$q$ 必须近似后验——理论上可以是任何分布（Jensen 不挑 $q$）；挑"像后验的"是因为 gap 小、蒙特卡洛估计方差小

## 5. 自测

1. 推导中唯一用到的数学性质是什么？（log 凹性——Jensen 不等式）
2. ELBO 与真值的差写成什么？（$\mathrm{KL}(q(z|x)\|p(z|x))$——替身与真后验的 KL）
3. 为什么抬 ELBO 一定不亏？（真值=ELBO+KL≥ELBO，且两项都非负）
4. "变分"指在哪优化？（分布空间——对 $q$ 整体求最优，而非点估计）

## 6. 相关概念

- [[40-Concepts/KL散度]]：正则项与 gap 项的双重身份
- [[40-Concepts/期望]]：ELBO 全程是期望形式（蒙特卡洛估计）
- [[40-Concepts/重参数化]]：让 ELBO 可梯度下降的关键技巧
- [[40-Concepts/Jensen不等式]]：下界成立的原因
- [[30-Formulas/ELBO目标]]：实操版（损失形态、闭式 KL、表示对照表）
