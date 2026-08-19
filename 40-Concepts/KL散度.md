---
type: concept
aliases: [KL散度, 相对熵, KL Divergence, Relative Entropy]
domain: 数学基础
tags: [concept]
---

# KL 散度 KL Divergence

## 1. 定义（直觉 → 形式）

**直觉**：用分布 $Q$ 冒充分布 $P$ 时"平均多付的信息代价"。KL 越大，两个分布差异越大。**不对称**：用错误模型近似真实分布的代价，不等于反过来。

**形式**：
$$D_{\mathrm{KL}}(P \,\|\, Q) = \mathbb{E}_{x \sim P}\!\left[ \log \frac{P(x)}{Q(x)} \right] = \int p(x) \log \frac{p(x)}{q(x)}\, dx \ \ge 0$$
等号成立当且仅当 $P = Q$。

**本库标准记号**：$D_{\mathrm{KL}}(P \| Q)$，读作"P 相对 Q 的 KL"。方向约定：被近似的真分布在竖线**左**边。

## 2. 数学形式

- **不对称**：$D_{\mathrm{KL}}(P\|Q) \neq D_{\mathrm{KL}}(Q\|P)$
  - 前向 KL $D_{\mathrm{KL}}(P\|Q)$：质量覆盖（Q 被迫覆盖 P 的所有模式）→ "均值搜索"
  - 反向 KL $D_{\mathrm{KL}}(Q\|P)$：模式坍缩（Q 集中在 P 的单一众数）→ GAN 早期坍缩、VAE 的选择
- **与交叉熵**：$D_{\mathrm{KL}}(P\|Q) = H(P, Q) - H(P)$，当 $H(P)$ 固定时最小化 KL = 最小化交叉熵 = 分类损失
- **与 ELBO**：见 [[30-Formulas/ELBO目标]]—— $\log p(x) = \text{ELBO} + D_{\mathrm{KL}}(q \| p_\theta)$，所以最大化 ELBO = 最小化近似后验与真后验的差距
- **两个高斯的 KL 有闭式解**（扩散论文反复使用）

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[30-Formulas/ELBO目标]] | ELBO 的正则项就是 KL |
| [[30-Formulas/DDPM训练目标]] | 变分界 = 逐步 KL 之和，化简后得 MSE |
| RLHF/PPO | KL 惩罚防止策略偏离参考策略 |
| 蒸馏（线 3） | 学生模仿教师的软标签 = 最小化 KL |

## 4. 常见误区

- **误区**：KL 是"距离"——不是！不对称、也不满足三角不等式
- **误区**：KL ≥ 0 恒成立，但"很小"不代表形状像（可以在不同区域各有偏差）
- **误区**：$P$ 支撑集外 $Q$ 为零时 KL = ∞——这是前向 KL 覆盖性质的形式根源

## 5. 相关概念

- [[40-Concepts/概率分布]]：KL 比较两个分布
- [[40-Concepts/期望]]：KL 本质是对数似然比的期望
- [[40-Concepts/Wasserstein距离]]：另一种分布距离，对称且即使支撑不重叠也有限——WGAN 的根基
