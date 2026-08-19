---
type: formula
formula_id: DDIM-UPDATE
aliases: [DDIM更新规则, 非马尔可夫前向, DDIM采样]
domain: 生成建模
tags: [formula]
---

# DDIM 更新规则

## 1. 标准形式

$$x_{t-1} = \sqrt{\bar\alpha_{t-1}}\, \underbrace{\hat{x}_0(x_t, t)}_{\text{预测干净图}} + \sqrt{1 - \bar\alpha_{t-1} - \sigma_t^2}\ \underbrace{\epsilon_\theta(x_t, t)}_{\text{方向项}} + \underbrace{\sigma_t\, \epsilon}_{\text{可选随机项}}$$

- $\hat{x}_0 = \frac{x_t - \sqrt{1-\bar\alpha_t}\,\epsilon_\theta}{\sqrt{\bar\alpha_t}}$
- $\sigma_t = \eta \sqrt{\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}} \sqrt{1 - \frac{\bar\alpha_t}{\bar\alpha_{t-1}}}$：**$\eta$ 控制随机性**
  - $\eta = 0$：**确定性 DDIM**（= 概率流 ODE 欧拉离散）——少步采样的主力
  - $\eta = 1$：还原 DDPM 祖先采样

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| η-族（本库标准） | 如上 | DDIM 原文 | 统一 DDPM 与 DDIM |
| 确定性形式（η=0） | 只剩 $\hat x_0$ + 方向项 | 同上 | ODE 等价 |
| 非马尔可夫前向构造 | $q_\sigma(x_{1:T}\mid x_0) = \prod$ 非链式 | 同上 | 理论出发点：同一训练目标多种前向 |

**核心洞见**：DDIM 证明 DDPM 的训练目标（学 $\epsilon_\theta$）**不唯一决定前向过程**——存在一族非马尔可夫前向，共享同一训练损失但允许确定性采样。"训练目标"与"采样方式"解耦。

## 3. 直觉解释

- 每步 = "先猜干净图 $\hat x_0$，再沿调度往前走一小段，可选抖动一点噪声"
- **提速的本质**：确定性轨迹平滑可大步跳，50→10 步几乎不掉质量
- **可逆性红利**：$\eta=0$ 时映射 $x_0 \leftrightarrow x_T$ 双射——图像编辑、插值、inversion 的基础
- DDPM 与 DDIM 共用同一个训练好的网络——采样器只是"用网络的方式"不同

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]] | 提出非马尔可夫族与确定性采样 |

## 5. 数学概念分解

- [[40-Concepts/高斯分布]]：随机项来源
- [[40-Concepts/采样器]]：确定性 vs 随机采样的权衡
- [[40-Concepts/常微分方程（ODE）|常微分方程]]：η=0 时即 ODE 欧拉步
- [[40-Concepts/马尔可夫链]]：打破的假设（非马尔可夫前向）

## 6. 与其他公式的关系

- ≡ **等价变形**：[[30-Formulas/概率流ODE]] 的一阶离散（η=0）
- ⊂ **特化自** DDPM 采样族（η=1 时回到 [[30-Formulas/DDPM后验分布]] 采样）
- 训练与 [[30-Formulas/DDPM训练目标]] 完全共用——同一网络、两种玩法
- → **被加速**：蒸馏线（Progressive Distillation / Consistency Models / DMD）都以少步 ODE 轨迹为教师
