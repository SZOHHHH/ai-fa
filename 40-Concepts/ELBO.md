---
type: concept
aliases: [证据下界, ELBO, Evidence Lower Bound, 变分下界, Variational Lower Bound]
domain: 数学基础
tags: [concept]
---

# ELBO 证据下界

## 1. 定义（直觉 → 形式）

**直觉**：想最大化数据的对数似然 $\log p_\theta(x)$，但它内部藏着无法计算的隐变量积分。ELBO 是它的一个**可计算的下界**——抬不了真值就抬下界，下界被抬高的过程中真值大概率也跟着升。像隔着墙用磁铁引物体：看不见但能"隔空发力"。

**形式**（推导核心，一步 Jensen 不等式）：
$$\log p_\theta(x) = \log \int p_\theta(x, z)\, dz = \log \mathbb{E}_{q(z\mid x)}\!\left[ \frac{p_\theta(x, z)}{q(z \mid x)} \right] \ge \mathbb{E}_{q(z\mid x)}\!\left[ \log \frac{p_\theta(x, z)}{q(z \mid x)} \right] = \text{ELBO}$$
且 $\log p_\theta(x) = \text{ELBO} + D_{\mathrm{KL}}(q(z\mid x) \,\|\, p_\theta(z \mid x))$（差距恰好是近似后验与真后验的 KL）。

## 2. 数学形式

两种等价写法（本库两种都要认得，见 [[30-Formulas/ELBO目标]] 的对照表）：

**重建 + 正则**：
$$\text{ELBO} = \mathbb{E}_{q(z\mid x)}\!\left[ \log p_\theta(x \mid z) \right] - D_{\mathrm{KL}}\!\left( q(z\mid x) \,\|\, p(z) \right)$$
（第一项：解码得好不好；第二项：编码别离先验太远）

**联合 - 反向 KL**：
$$\text{ELBO} KLW = \mathbb{E}_{q(z\mid x)}\!\left[ \log p_\theta(x, z) \right] - D_{\mathrm{KL}}\!\left( q(z\mid x) \,\|\, p(z \mid x) \right)$$

- Jensen 不等式：凹函数（log）下 $\log \mathbb{E}[\cdot] \ge \mathbb{E}[\log \cdot]$
- **变分推断**：把推断问题（积分）变成优化问题（调 $q$）

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）]] | 整个 VAE 的训练目标就是 ELBO |
| [[30-Formulas/DDPM训练目标]] | DDPM 的变分界是 ELBO 的马尔可夫链版本，逐项化简成 MSE |
| [[30-Formulas/条件流匹配损失]] | 理论上 FM 损失是 ELBO 的连续时间/速度场版本（Stochastic Interpolants 论文证明） |
| 统一视角 | VAE / 扩散 / FM 都是"抬 ELBO"，差别只在隐变量结构和推断方式 |

**这是 B1 线最重要的"大一统"概念**：VAE（一次跳）、DDPM（T 步跳）、FM/SI（连续时间流）是同一数学骨架的三种实例化。

## 4. 常见误区

- **误区**：最大化 ELBO ≠ 最大化似然——它是下界，可能下界升真值不动（但差距项 KL ≥ 0 恒有界住）
- **误区**："证据"指数据本身 $x$（evidence = observed data），不是"证明"
- **误区**：ELBO 不是唯一的下界，但它是 KL 最优意义下最自然的

## 5. 相关概念

- [[40-Concepts/KL散度]]：ELBO 与真值的差距恰是 KL
- [[40-Concepts/期望]]：ELBO 全程是期望形式
- [[40-Concepts/重参数化]]：让 ELBO 可梯度下降的关键技巧
- [[40-Concepts/Jensen不等式]]：下界成立的原因
