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

最大化 ELBO ⇔ 同时把"解码误差"压小、"编码分布"拉向先验。推导与 gap 的精确身份见概念母页 [ELBO](/ai-fa/explore/40-Concepts/ELBO)（§2 七步慢推）。

## 2. 教程：从公式到代码（实操形态全程代入）

**第 1 步：套上具体分布。** VAE 标准配置：$$q_\phi(z|x)=\mathcal{N}(\mu, \mathrm{diag}(\sigma^2))$$（编码器输出），$$p(z)=\mathcal{N}(0, I)$$，$$p_\theta(x|z)$$ 由解码器输出决定分布族。

**第 2 步：KL 项化成闭式（不再采样）。** 对角高斯 vs 标准正态，逐维求积：
$$D_{\mathrm{KL}}\big(\mathcal{N}(\mu,\sigma^2)\,\|\,\mathcal{N}(0,1)\big) = \frac{1}{2}\sum_{j=1}^{d}\left(\mu_j^2 + \sigma_j^2 - \log\sigma_j^2 - 1\right)$$
代入验证（$$d{=}1$$，$$\mu{=}2$$，$$\sigma{=}3$$）：$$\frac{1}{2}(4+9-2.197-1)\approx 4.90$$ ✓（手算见 [变分自编码器](/ai-fa/explore/20-Algorithms/变分自编码器) §3 第 4 步）。**训练时这一项不用采样、精确可算**——它只是网络输出的初等函数。

**第 3 步：重建项化成你认识的损失。** 重建项 $$\mathbb{E}_q[\log p_\theta(x|z)]$$ 的形态由解码器的**分布假设**决定（[最大似然估计（MLE）](/ai-fa/explore/40-Concepts/最大似然估计（MLE）) 出身）：

| 解码器输出假设 | $$\log p(x\|z)$$ 化成 | 何时用 |
|---|---|---|
| 逐像素 Bernoulli（sigmoid） | **BCE**（二值图/MNIST） | 像素∈{0,1} |
| 固定方差 Gaussian | **MSE**（$$\|x-\hat x\|^2/2\sigma^2$$） | 连续像素常态 |
| 分类 logits（VQ 系） | **交叉熵** | 离散 codebook |
| GMM 参数（[MDN-RNN](/ai-fa/explore/20-Algorithms/MDN-RNN)） | **混合 NLL** | 序列/隐状态预测 |

**第 4 步：只剩一个采样——重参数化。** 完整损失（高斯解码示例）：
$$\mathcal{L} = \frac{1}{2\sigma^2}\big\|x - \hat x(z)\big\|^2 + \frac{1}{2}\sum_j\big(\mu_j^2 + \sigma_j^2 - \log\sigma_j^2 - 1\big), \qquad z = \mu + \sigma\odot\epsilon$$
一次前向：$$x\to(\mu,\sigma)\to z\to\hat x$$；KL 精确、重构项单样本蒙特卡洛（样本量=1 通常就够——重参数化梯度方差小的红利，[重参数化](/ai-fa/explore/40-Concepts/重参数化)）。

**第 5 步：β 重加权的合法性。** $$\mathcal{L}_\beta = \text{重建} - \beta\,\mathrm{KL}$$：β>1=β-VAE（压信息换解耦）；DDPM 的 $$\|\epsilon-\hat\epsilon\|^2$$ 是变分界各项的**重加权**（非等价 ELBO 但同为下界族成员）；IWAE 用 K 个重要性样本抬得更紧。**加权的代价**：β≠1 时优化的不再是原似然的界——是"率-失真"意义上的另一点。

## 3. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 重建 + KL（本库标准） | 如上分解式 | Kingma & Welling 2013 | 最常用直觉版 |
| 联合 - 反向KL | $$\mathbb{E}_q[\log p_\theta(x,z)] - D_{\mathrm{KL}}(q(z\|x)\|p_\theta(z\|x))$$ | 变分推断教材 | 暴露"差距=KL(q‖真后验)" |
| 累积式（多步） | $$\sum_t \mathbb{E}[\log p_\theta(x_{t-1}\mid x_t)] - \mathrm{KL}(q(x_T\mid x_0)\|\mathcal{N})$$ | DDPM 论文 | 隐变量 = 整条链 $$x_{1:T}$$ |
| 连续时间 | ELBO = $$\frac{1}{2}\mathbb{E}\int_0^1 \|\ldots\|^2 dt$$ | Score-SDE / Stochastic Interpolants | 积分代替求和 |

## 4. 直觉解释

- 重建项和正则项**互相拉扯**：编码太贴先验 → 重建糊；重建太准 → 编码乱——这就是 VAE 生成模糊的根源（相比 GAN 锐利）
- 差距恒为 $$D_{\mathrm{KL}}(q(z\mid x) \| p_\theta(z\mid x)) \ge 0$$：ELBO 抬到顶 = 近似后验完美贴合真后验
- **同一骨架的三种实例化**：VAE（$$z$$ 一步跳）、DDPM（$$x_{1:T}$$ 逐步跳）、FM/SI（连续时间流）——三者都是"抬 ELBO"，结构不同而已

## 5. 出处

| 论文 | 贡献 |
|---|---|
| [Auto-Encoding Variational Bayes](/ai-fa/explore/10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）) | 引入可导 ELBO + 重参数化训练 |
| [Denoising Diffusion Probabilistic Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）) | 马尔可夫链版 ELBO（变分界） |
| [Building Normalizing Flows with Stochastic Interpolants](/ai-fa/explore/10-Papers/02-生成建模与扩散/Building Normalizing Flows with Stochastic Interpolants（随机插值）) | 连续时间 ELBO 统一 FM 与扩散 |

## 6. 与其他公式的关系

- 母页概念：[ELBO](/ai-fa/explore/40-Concepts/ELBO)（七步推导+gap 手算）
- ⊃ **泛化为** [DDPM训练目标](/ai-fa/explore/30-Formulas/DDPM训练目标)（把 $$z$$ 换成整条马尔可夫链再化简）
- ⊃ **泛化为** [条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)（连续时间、速度场参数化下的 ELBO）
- ↔ **条件先验版**：[潜变量变分下界](/ai-fa/explore/30-Formulas/潜变量变分下界)（先验 $$p(z|u)$$ 带辅助变量）
- ≡ **等价于** [变分自编码器](/ai-fa/explore/20-Algorithms/变分自编码器) 的完整损失（实操形态见本卡 §2）
- 对比 [GAN目标](/ai-fa/explore/30-Formulas/GAN目标)：不走下界路线，直接对分布距离做对抗博弈——两条技术路线的分水岭
