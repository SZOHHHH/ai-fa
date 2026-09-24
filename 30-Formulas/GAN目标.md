---
type: formula
formula_id: GAN-OBJ
aliases: [GAN目标, 对抗损失, 极小极大目标, Adversarial Objective]
domain: 生成建模
loss_type: adversarial
tags: [formula]
---

# GAN 对抗目标

## 1. 标准形式

$$\min_G \max_D\ \mathbb{E}_{x \sim p_{\text{data}}}\!\left[ \log D(x) \right] + \mathbb{E}_{z \sim \mathcal{N}(0, I)}\!\left[ \log\!\left( 1 - D(G(z)) \right) \right]$$

- $D(x) \in (0, 1)$：判别器——输出"$x$ 是真图"的概率
- $G(z)$：生成器——噪声 $z$ → 假图
- **读法**：$D$ 想把真图判 1、假图判 0；$G$ 想骗过 $D$。两人对抗，均衡点 = $p_G = p_{\text{data}}$，此时 $D^* = 1/2$（完全分不清）

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 极小极大（本库标准） | 如上 | GAN Goodfellow 2014 | 原始理论形式 |
| 非饱和损失 | $G$ 最大化 $\log D(G(z))$（而非最小化 $\log(1-D)$） | GAN 原文实操 | 避免早期梯度消失——最常用工程版 |
| Wasserstein 目标 | $\min_G \max_{\|D\|_L \le 1} \mathbb{E}[D(x)] - \mathbb{E}[D(G(z))]$ | WGAN 2017 | 距离换成 W，见 [[30-Formulas/WGAN目标]] |
| hinge 判别损失 | $\mathbb{E}[\max(0, 1-D(x)) + \max(0, 1+D(G(z)))]$ | BigGAN、StyleGAN 系 | 现代默认，输出无 sigmoid |

**损失家族**：`#loss/adversarial`（对抗型）——与回归型（MSE）形成两极。

## 教程：一步博弈的价值函数手算（+JS 无梯度的祸根）

**第 1 步：当前局面。** 判别器对真图输出 $D(x) = 0.9$（很能认真）、对假图 $D(G(z)) = 0.3$（假图多数被抓）。

**第 2 步：价值函数。** $V = \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1-D(G(z)))] = \log 0.9 + \log 0.7 = -0.105 + (-0.357) = -0.462$——$D$ 想最大化它（把真判得更真、假判得更假）；$G$ 想最小化（把 $D(G(z))$ 推向 1）。

**第 3 步：JS 祸根现场。** 训练早期 $p_G$ 与 $p_{\text{data}}$ 支撑**完全不重叠**（生成器还没学到任何真图区域的样本）：此时最优 D 在真假区域分别输出 1 和 0，JS 散度恒 $= \log 2$——**G 的梯度为零**：分布不重叠时 JS 是常数，G 不知道往哪挪。数值感：把 G 的样本挪 0.001 还是挪 1，JS 都纹丝不动；W 距离则会线性响应（[[40-Concepts/Wasserstein距离]] 教程的 P/Q 沙堆手算）。

**第 4 步：均衡点验证。** 设 $p_G = p_{\text{data}}$：真假同分布 → 最优 $D^*(x) = \frac{p_{\text{data}}}{p_{\text{data}}+p_G} = 0.5$ 处处——$V = \log 0.5 + \log 0.5 = -2\log 2$；G 再动只会更差（D 会重新拉开）——纳什均衡。

**第 5 步：实践修正两条。** ①非饱和损失（G 改最大化 $\log D(G(z))$——D(G)≈0 时信号最强，[[20-Algorithms/生成对抗网络]] 教程第 3 步）；②hinge 判别损失（去 sigmoid，BigGAN/StyleGAN 默认）——原始极小极大更多活在理论里。

## 3. 直觉解释

- **造假者 vs 警察**：造假者越强，警察鉴别力越强，互相逼着进化
- 均衡时不是"和平"而是"完美"：$p_G$ 与真分布重合，警察只能瞎猜
- **理论优美，实践凶险**：训练不稳定（博弈无总目标函数）、模式坍缩（$G$ 只出几种图）、JS 散度在不重叠分布时无梯度——WGAN 用 [[40-Concepts/Wasserstein距离]] 逐条修复
- **与扩散的本质区别**：GAN 直接学"噪声→数据"映射（一步生成、快、锐利），扩散学逐步去噪（多步、慢、稳、多样）

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Generative Adversarial Networks（GAN）]] | 提出框架与均衡理论 |
| [[10-Papers/02-生成建模与扩散/Wasserstein GAN（WGAN）]] | 距离换 W，稳定性修复 |
| [[10-Papers/02-生成建模与扩散/Diffusion Models Beat GANs on Image Synthesis（ADM）|Diffusion Models Beat GANs]] | 扩散首次反超 GAN——两大路线会师点 |

## 5. 数学概念分解

- [[40-Concepts/概率分布]]：博弈的战场是两个分布的距离
- [[40-Concepts/Jensen-Shannon散度]]：原版 GAN 均衡时等价于最小化 JS——不重叠时梯度为零的祸根
- [[40-Concepts/Wasserstein距离]]：WGAN 的替换方案
- [[40-Concepts/Lipschitz连续]]：WGAN critic 的约束
- [[40-Concepts/期望]]：双期望形式

## 6. 自测

1. $D(x) = 0.9,\ D(G(z)) = 0.3$：$V = ?$（$\log 0.9 + \log 0.7 = -0.462$——D 想最大化）
2. 支撑不重叠时 JS 多少、G 梯度如何？（恒 $\log 2$——梯度为零（G 不知道往哪挪）——WGAN 动机）
3. 均衡点的 $D^*$？（处处 0.5（$p_G = p_{\text{data}}$ 时真假同分布不可分）——$V = -2\log 2$）
4. 两条实践修正？（非饱和损失（G 换 $\max\log D(G)$）/ hinge 判别（去 sigmoid））

## 7. 与其他公式的关系

- → **被改进为** [[30-Formulas/WGAN目标]]：JS → W 距离
- 对比 [[30-Formulas/DDPM训练目标]]：`#loss/adversarial` vs `#loss/regression`——生成建模两大损失家族
- 对比 [[30-Formulas/ELBO目标]]：三大路线（下界 / 对抗 / 回归）的分野
- → **被组合**：StyleGAN 系持续迭代；扩散时代 GAN 作为蒸馏的对抗项复活（DMD 里的判别器）
