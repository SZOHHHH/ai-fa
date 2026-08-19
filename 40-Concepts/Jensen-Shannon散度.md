---
type: concept
aliases: [Jensen-Shannon散度, JS散度, JS Divergence]
domain: 数学基础
tags: [concept]
---

# Jensen–Shannon 散度

## 1. 定义（直觉 → 形式）

**直觉**：两个分布"各一半混合后，与各自的信息差"。它是 [[40-Concepts/KL散度]] 的**对称化、有界版**——用两个 KL 的平均构造，消除了 KL 的不对称和无穷大问题（但没解决不重叠时的梯度消失）。

**形式**：
$$D_{\mathrm{JS}}(P \| Q) = \frac{1}{2} D_{\mathrm{KL}}\!\left( P \,\Big\|\, \frac{P+Q}{2} \right) + \frac{1}{2} D_{\mathrm{KL}}\!\left( Q \,\Big\|\, \frac{P+Q}{2} \right)$$

## 2. 数学形式

- **对称**：$D_{\mathrm{JS}}(P\|Q) = D_{\mathrm{JS}}(Q\|P)$，有界 $[0, \log 2]$
- **GAN 的等价距离**：原版 GAN 在判别器最优时，生成器的目标 = 最小化 $D_{\mathrm{JS}}(p_{\text{data}} \| p_G)$
- **致命弱点**：$P, Q$ 支撑不重叠（高维几乎必然）时 $D_{\mathrm{JS}} = \log 2$ **恒定**——梯度为零，生成器学不到任何东西。这是 GAN 训练不稳定的数学根源，也是 WGAN 换用 [[40-Concepts/Wasserstein距离]] 的全部动机

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[30-Formulas/GAN目标]] | 最优判别器下的等价目标 |
| [[10-Papers/02-生成建模与扩散/Wasserstein GAN（WGAN）]] | 被批评的"前任"，理解 WGAN 动机的前提 |
| 蒸馏 / 分布匹配 | 分布间距离的候选之一 |

## 4. 常见误区

- **误区**：JS 有界就"好优化"——有界恰恰意味着不重叠时梯度消失
- **误区**：JS = 对称 KL——是"对混合分布的 KL 平均"，不是两个方向 KL 的平均
- **误区**：$\log 2$ 是自然对数底——是（nats）；底数 2 时上界为 1

## 5. 相关概念

- [[40-Concepts/KL散度]]：构造材料
- [[40-Concepts/Wasserstein距离]]：继任者
- [[40-Concepts/概率分布]]：作用对象
