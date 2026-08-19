---
type: formula
formula_id: WGAN-OBJ
aliases: [WGAN目标, Wasserstein目标, 推土机距离目标]
domain: 生成建模
loss_type: adversarial
tags: [formula]
---

# WGAN 目标

## 1. 标准形式

$$\min_G \max_{\|D\|_L \le 1}\ \mathbb{E}_{x \sim p_{\text{data}}}\!\left[ D(x) \right] - \mathbb{E}_{z \sim \mathcal{N}(0,I)}\!\left[ D(G(z)) \right]$$

- $D$ 现在叫 **critic**（不再是判别器）：输出实数打分而非概率，被约束为 **1-Lipschitz**
- 内层最大化 = 学出 [[40-Concepts/Wasserstein距离]]（Kantorovich–Rubinstein 对偶）
- 外层最小化 = 把分布搬近
- 工程实现：权重裁剪 $[-c, c]$（原文）→ 梯度惩罚（WGAN-GP）→ 谱归一化

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 对偶形式（本库标准） | 如上 | WGAN 2017 | 理论核心 |
| 权重裁剪实现 | $\mathrm{clip}(w, -0.01, 0.01)$ | WGAN 原文 | 简单粗暴，损 critic 容量 |
| 梯度惩罚 | $+ \lambda\, (\|\nabla_{\hat x} D\| - 1)^2$，$\hat x$ 插值点 | WGAN-GP 2017 | 主流实现 |
| IPM 家族 | $\sup_{f \in \mathcal{F}} \mathbb{E}_P f - \mathbb{E}_Q f$ | MMD/GAN 统一理论 | $\mathcal{F}$ 取不同函数类得不同距离 |

## 3. 直觉解释

- JS 散度在两分布不重叠时恒为 $\log 2$（梯度消失）；W 距离即使不重叠也随距离连续变小——**梯度永远存在**
- critic 是"测量员"：量出两堆沙差多少"推土量"；生成器照着搬
- 代价：critic 要训多几轮才准；Lipschitz 约束实现不好照样翻车
- 历史地位：第一个给"GAN 为什么不稳定"以数学解释并修复的论文

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Wasserstein GAN（WGAN）]] | 提出目标与理论 |
| WGAN-GP (Gulrajani 2017) | 梯度惩罚实现（B3 或 B6 补充论文卡） |
| [[10-Papers/02-生成建模与扩散/Flow Matching for Generative Modeling（流匹配）]] | FM 理论与 W 距离泛函连通 |

## 5. 数学概念分解

- [[40-Concepts/Wasserstein距离]]：本体定义
- [[40-Concepts/Lipschitz连续]]：critic 的约束
- [[40-Concepts/期望]]：双期望差
- [[40-Concepts/KL散度]]：被替换的 JS 的母概念

## 6. 与其他公式的关系

- → **改进自** [[30-Formulas/GAN目标]]：JS → W，判别器 → critic
- ≡ **等价变形**：Kantorovich–Rubinstein 对偶（原问题 ↔ 对偶问题）
- 对比 [[30-Formulas/DDPM训练目标]]：`#loss/adversarial` vs `#loss/regression`
- ↗ **理论连通** [[30-Formulas/条件流匹配损失]]：最优传输视角下的统一
