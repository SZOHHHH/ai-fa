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

## 教程：critic 量距离、生成器搬家（对偶现场）

**第 1 步：critic 一轮。** 沿用 [[40-Concepts/Wasserstein距离]] 教程的沙堆（P 在 {0,2}、Q 在 {1,3}）：critic 学到 $f(x) = x$（斜率 1 ≤ Lipschitz 上界，合法）：$\mathbb{E}_P f - \mathbb{E}_Q f = 1 - 2 = -1$——critic 损失 $= -|{-1}| = -1$（越负越好，还在拉大差距逼近真值 $W_1 = 2$）。

**第 2 步：生成器一轮。** $G$ 收到梯度"把 Q 往 P 搬"：Q 的样本（1 和 3）被推向 0 和 2 方向——搬运后 $\mathbb{E}_Q f$ 逼近 $\mathbb{E}_P f$，critic 量出的距离缩小。**JS 无梯度时 W 有梯度**：不重叠阶段每搬 0.001 距离就变 0.001（线性响应）——训练信号连续。

**第 3 步：Lipschitz 约束的三代实现。** ①权重裁剪 clip(±0.01)（原文）：粗暴损容量；②梯度惩罚 $(\|\nabla_{\hat x}D\| - 1)^2$（WGAN-GP，插值点 $\hat x$ 处逼梯度范数为 1）——主流；③谱归一化（每层除最大奇异值，[[30-Formulas/谱归一化]]）—— StyleGAN 系标配。**没有约束的 critic 会爆炸**（输出无界，"距离"失去意义）。

**第 4 步：与 GAN 的读法对照。** D 从"判别器（输出概率）"改叫"critic（输出打分）"：不判决真假、只量距离——**对抗的火药味变成测量师的精确**；代价是 critic 每轮多训几次（测量要准）。

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

## 6. 自测

1. critic $f(x) = x$ 量 P{0,2}/Q{1,3}：差值与真值？（$|1-2| = 1$——下界，逼近真值 2）
2. 为什么 W 有梯度而 JS 没有？（不重叠时 JS 恒 $\log 2$；W 随搬运距离线性响应）
3. Lipschitz 约束三代实现？（权重裁剪 / 梯度惩罚（GP，主流）/ 谱归一化）
4. D 为什么改叫 critic？（输出实数打分量距离，不判真假——测量师而非警察）

## 7. 与其他公式的关系

- → **改进自** [[30-Formulas/GAN目标]]：JS → W，判别器 → critic
- ≡ **等价变形**：Kantorovich–Rubinstein 对偶（原问题 ↔ 对偶问题）
- 对比 [[30-Formulas/DDPM训练目标]]：`#loss/adversarial` vs `#loss/regression`
- ↗ **理论连通** [[30-Formulas/条件流匹配损失]]：最优传输视角下的统一
