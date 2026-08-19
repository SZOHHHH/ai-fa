---
type: formula
formula_id: ELBO
aliases: [ELBO目标, 证据下界, 变分下界公式, Evidence Lower Bound]
domain: 生成建模
tags: [formula]
---

# ELBO 目标

## 1. 标准形式

$$\log p_\theta(x) \ \ge\ \text{ELBO} = \mathbb{E}_{q(z\mid x)}\!\left[ \log \frac{p_\theta(x \mid z)\, p(z)}{q(z\mid x)} \right]$$

**等价分解（本库标准展开式，便于理解）**：
$$\text{ELBO} = \underbrace{\mathbb{E}_{q(z\mid x)}\left[ \log p_\theta(x \mid z) \right]}_{\text{重建项: 解码像不像}} \ -\ \underbrace{D_{\mathrm{KL}}\!\left( q(z\mid x)\, \|\, p(z) \right)}_{\text{正则项: 编码别飘}}$$

最大化 ELBO ⇔ 同时把"解码误差"压小、"编码分布"拉向先验。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 重建 + KL（本库标准） | 如上分解式 | VAE 原文 Kingma & Welling 2013 | 最常用直觉版 |
| 联合 - 反向KL | $\mathbb{E}_q[\log p_\theta(x,z)] - D_{\mathrm{KL}}(q(z\|x)\|p_\theta(z\|x))$ | 变分推断教材 | 暴露"差距=KL(q‖真后验)" |
| 累积式（多步） | $\sum_t \mathbb{E}[\log p_\theta(x_{t-1}\mid x_t)] - \mathrm{KL}(q(x_T\mid x_0)\|\mathcal{N})$ | DDPM 论文 | 隐变量 = 整条链 $x_{1:T}$ |
| 连续时间 | ELBO = $\frac{1}{2}\mathbb{E}\int_0^1 \|\ldots\|^2 dt$ | Score-SDE / Stochastic Interpolants | 积分代替求和 |

## 3. 直觉解释

- 想直接最大化 $\log p_\theta(x)$，但 $p_\theta(x) = \int p_\theta(x\mid z) p(z)\, dz$ 积不出来 → 只能抬下界
- 重建项和正则项**互相拉扯**：编码太贴先验 → 重建糊；重建太准 → 编码乱——这就是 VAE 生成模糊的根源（相比 GAN 锐利）
- 差距恒为 $D_{\mathrm{KL}}(q(z\mid x) \| p_\theta(z\mid x)) \ge 0$：ELBO 抬到顶 = 近似后验完美贴合真后验
- **同一骨架的三种实例化**：VAE（$z$ 一步跳）、DDPM（$x_{1:T}$ 逐步跳）、FM/SI（连续时间流）——三者都是"抬 ELBO"，结构不同而已

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）]] | 引入可导 ELBO + 重参数化训练 |
| [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] | 马尔可夫链版 ELBO（变分界） |
| [[10-Papers/02-生成建模与扩散/Building Normalizing Flows with Stochastic Interpolants（随机插值）]] | 连续时间 ELBO 统一 FM 与扩散 |

## 5. 数学概念分解

- [[40-Concepts/ELBO]]：概念母页（推导、变体详述）
- [[40-Concepts/Jensen不等式]]：下界成立的唯一魔法
- [[40-Concepts/KL散度]]：正则项与差距项
- [[40-Concepts/期望]]：整体是期望，蒙特卡洛估计
- [[40-Concepts/重参数化]]：让梯度穿过采样

## 6. 与其他公式的关系

- ⊃ **泛化为** [[30-Formulas/DDPM训练目标]]（把 $z$ 换成整条马尔可夫链再化简）
- ⊃ **泛化为** [[30-Formulas/条件流匹配损失]]（连续时间、速度场参数化下的 ELBO）
- ≡ **等价于** VAE 的完整损失（VAE 页直接使用本式）
- 对比 [[30-Formulas/GAN目标]]：不走下界路线，直接对分布距离做对抗博弈——两条技术路线的分水岭
