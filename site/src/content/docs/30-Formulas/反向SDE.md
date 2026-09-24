---
type: formula
formula_id: REV-SDE
aliases: [反向SDE, Reverse SDE, 逆时间SDE]
domain: 生成建模
tags: [formula]
---

# 反向 SDE

## 1. 标准形式

正向 $$dx = f(x,t)\,dt + g(t)\,dw$$（$$t: 0\to T$$）的反向时间过程（Anderson 1982）：
$$dx = \left[ f(x, t) - g^2(t)\, \nabla_x \log p_t(x) \right] dt + g(t)\, d\bar w$$

- $$\bar w$$：反向时间的维纳过程（与正向独立的新噪声）
- $$t: T \to 0$$，从纯噪声出发积分回数据分布
- 唯一未知量：$$s_\theta(x,t) \approx \nabla_x \log p_t(x)$$——**学 score 即可生成**

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| Anderson 反向 | 如上 | Anderson 1982 / Score-SDE | 理论标准 |
| VP 反向 | 漂移 $$-\frac12\beta x - \beta s_\theta$$ | Score-SDE（VP 特例） | DDPM 祖先采样的连续母体 |
| VE 反向 | 漂移 $$-g^2 s_\theta$$ | Score-SDE（VE 特例） | SMLD 朗之万的连续母体 |
| 离散祖先采样 | $$x_{t-1} = \mu_\theta(x_t,t) + \sigma_t z$$ | DDPM | 一阶离散化 |
| predictor-corrector | ODE/SDE 预测 + 朗之万校正 | Score-SDE 采样器 | 效果最好的一族 |

## 教程：反向一步全程手算（ε-代入还原后验均值）

**第 0 步：接续玩具宇宙。** [DDPM训练目标](/ai-fa/explore/30-Formulas/DDPM训练目标) 的考题 $$x_2 = 2.056$$；训练成材的网络 $$\epsilon_\theta = 0.5$$ 恰好猜中真值。现在反向走一步。

**第 1 步：ε-代入均值公式。** $$\mu_\theta = \frac{1}{\sqrt{\alpha_2}}\left(x_2 - \frac{\beta_2}{\sqrt{1-\bar\alpha_2}}\epsilon_\theta\right) = \frac{1}{0.990}\left(2.056 - \frac{0.02}{0.173}\times0.5\right) = \frac{2.056 - 0.058}{0.990} = \frac{1.998}{0.990} = 2.019$$。

**第 2 步：与 x₀-加权后验对账。** [DDPM后验分布](/ai-fa/explore/30-Formulas/DDPM后验分布) 的系数（$$0.668/0.332$$）代入同一宇宙：$$\tilde\mu_2 = 0.668\times2 + 0.332\times2.056 = 2.019$$——**两法分毫不差**（尾差纯属舍入）。ε-代入不是新发明：把 $$\hat{x}_0 = (x_t-\sqrt{1-\bar\alpha_t}\,\epsilon_\theta)/\sqrt{\bar\alpha_t}$$ 塞进 $$\tilde\mu_t$$ 代数展开的结果。先反解干净图再折中，与直接加权折中，同一条路。

**第 3 步：加噪声出样本。** $$x_1 = \mu_\theta + \sqrt{\tilde\beta_2}\,z = 2.019 + 0.082\times0.5 = 2.060$$（抽 $$z=0.5$$）——反向链走出一步，重复直到 $$x_0$$。

**第 4 步：score 项在 SDE 语言里是谁。** 对照标准式 $$dx = [f - g^2\nabla\log p_t]dt + g\,d\bar w$$：均值里的修正项 $$-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon_\theta$$ 正是 $$-g^2 s_\theta$$ 的离散化（换算 $$s = -\epsilon/\sigma$$，[DSM目标](/ai-fa/explore/30-Formulas/DSM目标) 第 4 步）——**"往数据密集处拽"的那只手**。没有它，反向 = 纯随机游走，永远回不了数据流形。

**第 5 步：末项噪声的去留。** 留着（SDE 采样）：多样性强、误差自我修正；去掉（→ [概率流ODE](/ai-fa/explore/30-Formulas/概率流ODE)）：确定性、可逆、大步长友好——同一模型两种采样法、边缘分布相同，训练完随取随换。

## 3. 直觉解释

- 正向把数据"抹成"噪声；反向把噪声"雕回"数据——但反向的方程**不能白嫖**：需要知道每点的 score
- score 项像"纠偏器"：纯扩散会把样本推向无信息区，score 项持续把它拽回数据流形
- 反向**仍有噪声项**——与 [概率流ODE](/ai-fa/explore/30-Formulas/概率流ODE)（完全无噪声）的区别
- 离散化误差 + 步数决定质量：预测-校正采样器把 SDE 步与朗之万步交替使用

## 4. 出处

| 论文 | 贡献 |
|---|---|
| Anderson 1982（随机过程文献） | 反向方程原初形式 |
| [Score-Based Generative Modeling through Stochastic Differential Equations](/ai-fa/explore/10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）) | 首次用作生成模型 + score 网络 |
| [Denoising Diffusion Probabilistic Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）) | 离散版隐含使用 |

## 5. 数学概念分解

- [随机微分方程](/ai-fa/explore/40-Concepts/随机微分方程（SDE）)：母类
- [Score函数](/ai-fa/explore/40-Concepts/Score函数)：漂移修正项
- [维纳过程](/ai-fa/explore/40-Concepts/维纳过程)：反向噪声
- [采样器](/ai-fa/explore/40-Concepts/采样器)：离散化策略

## 6. 自测

1. 反向 SDE 里唯一需要学的量？（score $$\nabla_x\log p_t$$——$$f, g$$ 由前向定死，全部知识浓缩在 score 里）
2. 教程里两个 2.019 各怎么来的、为何相等？（ε-代入公式 / x₀-加权后验——$$\hat{x}_0$$ 代入 $$\tilde\mu$$ 的代数恒等）
3. score 项去掉后反向过程变成什么？（纯扩散随机游走——推离数据、永不生成；它是"拽回流形"的方向盘）
4. 反向 SDE 与概率流 ODE 怎么选？（要多样性与纠错→SDE；要确定性/可逆/少步→ODE——边缘同分布，免重训互换）

## 7. 与其他公式的关系

- → **由** [Score-SDE前向过程](/ai-fa/explore/30-Formulas/Score-SDE前向过程) **推导**
- ≡ **等价变形**（去噪声版）：[概率流ODE](/ai-fa/explore/30-Formulas/概率流ODE)
- → **离散化为** DDPM 祖先采样（[DDPM后验分布](/ai-fa/explore/30-Formulas/DDPM后验分布) 的采样实现）
- 训练靠 [DSM目标](/ai-fa/explore/30-Formulas/DSM目标) / [DDPM训练目标](/ai-fa/explore/30-Formulas/DDPM训练目标)（score/噪声预测）
