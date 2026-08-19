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

## 6. 与其他公式的关系

- → **由** [[30-Formulas/DDPM前向过程]] **推导**（贝叶斯 + 高斯代数）
- → **推导出** [[30-Formulas/DDPM训练目标]]：KL(q‖p_θ) 化简后只剩 MSE
- ≡ **等价于** [[30-Formulas/反向SDE]] 的离散化（随机采样每步的转移）
- ⊃ **被泛化**：Score-SDE 的反向 SDE 是它的连续极限
