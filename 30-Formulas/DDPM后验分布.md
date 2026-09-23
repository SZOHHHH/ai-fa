---
type: formula
formula_id: DDPM-POST
aliases: [DDPM后验分布, 反向转移, Posterior of Diffusion]
domain: 生成建模
tags: [formula]
---

# DDPM 后验分布

## 1. 标准形式

反向一步的条件分布（$x_0$ 已知时的"真值目标"）：
$$q(x_{t-1} \mid x_t, x_0) = \mathcal{N}\!\left( x_{t-1};\ \tilde\mu_t(x_t, x_0),\ \tilde\beta_t I \right)$$
其中：
$$\tilde\mu_t = \frac{\sqrt{\bar\alpha_{t-1}}\, \beta_t}{1-\bar\alpha_t}\, x_0 + \frac{\sqrt{\alpha_t}\,(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}\, x_t, \qquad \tilde\beta_t = \frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}\, \beta_t$$

**为什么它是"目标"**：生成（反向）时 $x_0$ 未知 → 用网络估 $\hat{x}_0$ 或 $\hat\epsilon$ 代入 $\tilde\mu_t$，得到 $p_\theta(x_{t-1}\mid x_t) = \mathcal{N}(\mu_\theta(x_t, t), \tilde\beta_t I)$，逐采样步执行。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| x₀-代入（本库标准） | $\tilde\mu_t(\ldots x_0)$ 如上 | DDPM 原文 Eq.(6-7) | 理论推导最清晰 |
| ε-代入 | $\hat{x}_0 = \frac{1}{\sqrt{\bar\alpha_t}}(x_t - \sqrt{1-\bar\alpha_t}\,\epsilon_\theta)$ 代入上式 | DDPM 实操 | 网络预测噪声更稳 |
| v-预测代入 | $\hat{x}_0 = \sqrt{\bar\alpha_t}\,x_t - \sqrt{1-\bar\alpha_t}\,v_\theta$ | v-prediction (Salimans & Ho 2022) | 数值更稳，Sora 时代主流 |

三种代入完全等价（线性换算），差别只在**网络预测哪个量训练更稳**。

## 教程：后验一步手算（已知两端猜中间）

**第 0 步：沿用 [[30-Formulas/DDPM前向过程]] 的玩具宇宙。** $\beta_2 = 0.02$，$\bar\alpha_1 = 0.99$，$\bar\alpha_2 = 0.9702$；前向真实走过 $x_0 = 2 \to x_1 = 2.030 \to x_2 = 1.967$。

**第 1 步：代入均值系数。** $\tilde\mu_2 = \frac{\sqrt{0.99}\times0.02}{0.0298}x_0 + \frac{\sqrt{0.98}\times0.01}{0.0298}x_2 = \frac{0.01990}{0.0298}x_0 + \frac{0.00990}{0.0298}x_2 = 0.668\,x_0 + 0.332\,x_2$——**两权重之和 ≈ 1**（本例 0.99997；$x_0$ 的系数随 $t$ 变大而变小，正是"晚期偏 $x_t$"的来源）。

**第 2 步：方差。** $\tilde\beta_2 = \frac{1-\bar\alpha_1}{1-\bar\alpha_2}\beta_2 = \frac{0.01}{0.0298}\times0.02 = 0.0067$，$\sqrt{\tilde\beta_2} = 0.082$——比前向步的 $\sqrt{0.02} = 0.141$ **小**：知道两端后，中间的不确定性收窄了。

**第 3 步：代数字出样本。** $\tilde\mu_2 = 0.668\times2 + 0.332\times1.967 = 1.336+0.653 = 1.989$；抽 $z = 0.5$：$x_1 = 1.989 + 0.082\times0.5 = 2.030$——**恰与前向真实走过的 $x_1 = 2.030$ 撞在一起**（本例的 $z$ 恰是正确耦合；即使不撞，方差 0.082 也保证样本贴着真值）。后验描述的正是"两端已知时中间在哪"。

**第 4 步：生成时 $x_0$ 未知怎么办。** 用网络反猜 $\hat{x}_0 = (x_t - \sqrt{1-\bar\alpha_t}\,\epsilon_\theta)/\sqrt{\bar\alpha_t}$ 代回 $\tilde\mu_t$，代数整理后就是 ε-代入版 $\mu_\theta = \frac{1}{\sqrt{\alpha_t}}\left(x_t - \frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon_\theta\right)$——**先反解干净图再折中，与直接加权折中，同一条路的两种写法**（数值对账见 [[30-Formulas/反向SDE]] 教程：两种代入算出同一个 2.019）。

**第 5 步：$\tilde\beta$ 为什么不用学。** 它由调度唯一决定（$\beta, \bar\alpha$ 全是超参数）——网络只需输出均值（维度=图像维度），方差白送。DDPM 只学均值 = 网络省一半输出的根源。

## 3. 直觉解释

- 反向每步 = "已知当前 noisy 图和真值原图，原图在 $t-1$ 时刻长什么样"的高斯
- $\tilde\mu_t$ 是 $x_0$ 与 $x_t$ 的**加权折中**：早期（$t$ 小）偏 $x_0$，晚期偏 $x_t$（权重随调度变）
- $\tilde\beta_t$：反问步的噪声方差——**不需要学**（由调度唯一决定），只学均值即可
- DDPM 只学均值 → 网络输出维度 = 图像维度（省一半参数）——这是它比某些前作高效的原因

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] | 推导并用于训练 |
| [[10-Papers/02-生成建模与扩散/Improved Denoising Diffusion Probabilistic Models（iDDPM）]] | 讨论学习 $\Sigma$ 的变体 |

## 5. 数学概念分解

- [[40-Concepts/高斯分布]]：**高斯条件分布仍是高斯**——后验有闭式解的根源
- [[40-Concepts/马尔可夫链]]：反向链的转移核
- [[40-Concepts/贝叶斯公式]]：$q(x_{t-1}\mid x_t, x_0) \propto q(x_t\mid x_{t-1}) q(x_{t-1}\mid x_0)$
- [[40-Concepts/期望]]：均值即条件期望

## 6. 自测

1. 后验均值的两个权重有什么性质？（近似凸组合——例中 $0.668+0.332\approx1$（小 β 时）；中间点落在 $x_0$ 与 $x_t$ 之间）
2. 后验方差为什么比前向步方差小？（知道两端消除了不确定性：例中 0.0067 < 0.02）
3. 生成时后验里哪个量被网络替换？（$x_0$ → $\hat{x}_0$（由 $\epsilon_\theta$ 反解）——只换均值，方差由调度白送）
4. x₀-代入与 ε-代入什么关系？（代数恒等——把 $\hat{x}_0$ 表达式塞进 $\tilde\mu$ 展开即得；训练稳定性不同（预测 ε 更稳）但模型等价）

## 7. 与其他公式的关系

- → **由** [[30-Formulas/DDPM前向过程]] **推导**（贝叶斯 + 高斯代数）
- → **推导出** [[30-Formulas/DDPM训练目标]]：KL(q‖p_θ) 化简后只剩 MSE
- ≡ **等价于** [[30-Formulas/反向SDE]] 的离散化（随机采样每步的转移）
- ⊃ **被泛化**：Score-SDE 的反向 SDE 是它的连续极限
