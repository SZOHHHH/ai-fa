---
type: formula
formula_id: DDPM-FWD
aliases: [DDPM前向过程, 扩散前向过程, 前向加噪, Forward Process]
domain: 生成建模
tags: [formula]
---

# DDPM 前向过程

## 1. 标准形式（本库统一记号）

**逐步定义**（单步转移，原始论文形式）：
$$q(x_t \mid x_{t-1}) = \mathcal{N}\!\left( x_t;\ \sqrt{1-\beta_t}\, x_{t-1},\ \beta_t I \right)$$

**闭式一步到位**（本库标准书写，训练时实际使用的形式）：
$$x_t = \sqrt{\bar\alpha_t}\, x_0 + \sqrt{1-\bar\alpha_t}\, \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$
其中 $\alpha_t = 1 - \beta_t$，$\bar\alpha_t = \prod_{s=1}^{t} \alpha_s$（累积乘积）。

**边缘分布**：$q(x_t \mid x_0) = \mathcal{N}\!\left( \sqrt{\bar\alpha_t}\, x_0,\ (1 - \bar\alpha_t) I \right)$

## 2. 表示对照表

| 表示名 | 公式 | 出处 | 差异说明 |
|---|---|---|---|
| β-参数化（逐步） | $x_t = \sqrt{1-\beta_t}\,x_{t-1} + \sqrt{\beta_t}\epsilon$ | DDPM 原文 Ho et al. 2020 | 逐步马尔可夫形式 |
| ᾱ-闭式（本库标准） | $x_t = \sqrt{\bar\alpha_t}\,x_0 + \sqrt{1-\bar\alpha_t}\,\epsilon$ | 同上 Eq.(4)，训练通用 | 一步采样 $x_t$，不必迭代 |
| 信噪比形式 | $x_t = w_t x_0 + \sigma_t \epsilon$，$\mathrm{SNR}_t = w_t^2/\sigma_t^2$ | iDDPM、EDM | 调度统一视角 |
| VP-SDE 连续极限 | $dx = -\frac{1}{2}\beta(t) x\, dt + \sqrt{\beta(t)}\, dw$ | Score-SDE 2021 | $T\to\infty$ 极限，见 [[30-Formulas/Score-SDE前向过程]] |

## 教程：两步加噪 = 一步到位（闭式现场验证）

**第 1 步：玩具调度。** 只看 2 步：$\beta_1 = 0.01,\ \beta_2 = 0.02$ → $\alpha_1 = 0.99,\ \alpha_2 = 0.98$；累积 $\bar\alpha_1 = 0.99$，$\bar\alpha_2 = 0.99\times0.98 = 0.9702$。这组数字是本库扩散族的**共用玩具宇宙**（后验/训练/反向/DDIM 各卡全程沿用）。

**第 2 步：老老实实走两步链。** $x_1 = \sqrt{0.99}\,x_0 + \sqrt{0.01}\,\epsilon_1 = 0.995\,x_0 + 0.1\,\epsilon_1$；再走一步（代入展开）：$x_2 = \sqrt{0.98}\,x_1 + \sqrt{0.02}\,\epsilon_2 = 0.985\,x_0 + \sqrt{0.0098}\,\epsilon_1 + \sqrt{0.02}\,\epsilon_2$。

**第 3 步：两个高斯并一个。** $\sqrt{0.0098}\,\epsilon_1 + \sqrt{0.02}\,\epsilon_2$ 是独立高斯之和：**方差相加** $0.0098 + 0.02 = 0.0298 = 1 - \bar\alpha_2$ ✓——所以它 $\equiv \sqrt{0.0298}\,\epsilon = 0.173\,\epsilon$。

**第 4 步：闭式对账。** 走链展开 $x_2 = 0.985\,x_0 + 0.173\,\epsilon$；闭式公式 $x_2 = \sqrt{\bar\alpha_2}\,x_0 + \sqrt{1-\bar\alpha_2}\,\epsilon = 0.985\,x_0 + 0.173\,\epsilon$——**逐系数相同**。代数字：$x_0 = 2$（某像素值），抽 $\epsilon_1 = 0.4,\ \epsilon_2 = -0.3$：$x_2 = 1.970 + 0.099\times0.4 - 0.141\times0.3 = 1.967$。

**第 5 步：闭式为什么是训练命脉。** 训练每步随机抽 $t$（1..1000）——没有闭式就得从 $x_0$ 逐步走到 $x_t$（抽 $t$ 次噪声）；有闭式**一次乘加一步到位**。加噪 1000 步的蒙特卡洛被一条代数恒等式替代——这就是 $\bar\alpha$ 记号的全部存在意义。

**第 6 步：信噪比读数。** $\mathrm{SNR}_2 = \bar\alpha_2/(1-\bar\alpha_2) = 0.9702/0.0298 = 32.6$（还有 97% 信号）；真实 $T=1000$ 时 $\bar\alpha_T$ 降到 $10^{-5}$ 量级 → SNR ≈ 0——纯噪声，生成的起点。

## 3. 直觉解释

- $\sqrt{\bar\alpha_t}$：$x_0$ 的"信号保真系数"——$t$ 越大越接近 0（信号被稀释）
- $\sqrt{1-\bar\alpha_t}$：噪声的标准差——$t$ 越大越接近 1（噪声占主导）
- $\bar\alpha_t$：调度曲线——决定"多快加满噪声"。线性 β 调度（原文）→ 余弦调度（iDDPM 改进）→ EDM 的 Karras 调度
- $t=0$：$x_t = x_0$ 纯数据；$t=T$：$x_T \approx \mathcal{N}(0, I)$ 纯噪声——**生成的起点**

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] | 定义并首次大规模成功 |
| [[10-Papers/02-生成建模与扩散/Improved Denoising Diffusion Probabilistic Models（iDDPM）]] | 余弦调度、L_simple 加权 |
| [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] | 连续时间统一 |

## 5. 数学概念分解

- [[40-Concepts/马尔可夫链]]：前向过程是马尔可夫链（只依赖 $x_{t-1}$）
- [[40-Concepts/高斯分布]]：每步转移是高斯；闭式来自"高斯线性组合仍高斯"
- [[40-Concepts/重参数化]]：闭式 = 一步采样技巧
- [[40-Concepts/概率分布]]：前向 = 数据分布 → 噪声分布的分布变换

## 6. 自测

1. $\beta_1 = 0.02,\ \beta_2 = 0.03$：$\bar\alpha_2 = ?$（$0.98\times0.97 = 0.9506$，$\sqrt{\bar\alpha_2}\approx0.975$）
2. 合并两步噪声时方差怎么算？（独立高斯方差相加：$0.0098+0.02 = 0.0298 = 1-\bar\alpha_2$——系数平方和）
3. 训练为什么离不开闭式？（随机抽 $t$ 要一步造出 $x_t$，逐步走链每样本 $O(t)$ 次噪声采样）
4. $t = T$ 时分布是什么、为什么选它？（$\mathcal{N}(0,I)$——各向同性标准高斯：采样器知道怎么抽的"已知起点"）

## 7. 与其他公式的关系

- ⊃ **泛化于** [[30-Formulas/Score-SDE前向过程]]：VP-SDE 是本公式的连续时间极限
- ≡ **等价于** [[30-Formulas/条件流匹配损失]] 中的插值 $x_t = \alpha_t x_0 + \sigma_t z$（当 $\alpha_t = \sqrt{\bar\alpha_t}$、$\sigma_t = \sqrt{1-\bar\alpha_t}$ 时逐点相同）——扩散与流是同族
- → **被推导出** [[30-Formulas/DDPM后验分布]]：$q(x_{t-1} \mid x_t, x_0)$（贝叶斯 + 高斯条件分布）
- → **服务于** [[30-Formulas/DDPM训练目标]]：闭式让训练能一步抽任意 $t$
