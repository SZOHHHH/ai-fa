---
type: formula
formula_id: REV-SDE
aliases: [反向SDE, Reverse SDE, 逆时间SDE]
domain: 生成建模
tags: [formula]
---

# 反向 SDE

## 1. 标准形式

正向 $dx = f(x,t)\,dt + g(t)\,dw$（$t: 0\to T$）的反向时间过程（Anderson 1982）：
$$dx = \left[ f(x, t) - g^2(t)\, \nabla_x \log p_t(x) \right] dt + g(t)\, d\bar w$$

- $\bar w$：反向时间的维纳过程（与正向独立的新噪声）
- $t: T \to 0$，从纯噪声出发积分回数据分布
- 唯一未知量：$s_\theta(x,t) \approx \nabla_x \log p_t(x)$——**学 score 即可生成**

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| Anderson 反向 | 如上 | Anderson 1982 / Score-SDE | 理论标准 |
| VP 反向 | 漂移 $-\frac12\beta x - \beta s_\theta$ | Score-SDE（VP 特例） | DDPM 祖先采样的连续母体 |
| VE 反向 | 漂移 $-g^2 s_\theta$ | Score-SDE（VE 特例） | SMLD 朗之万的连续母体 |
| 离散祖先采样 | $x_{t-1} = \mu_\theta(x_t,t) + \sigma_t z$ | DDPM | 一阶离散化 |
| predictor-corrector | ODE/SDE 预测 + 朗之万校正 | Score-SDE 采样器 | 效果最好的一族 |

## 3. 直觉解释

- 正向把数据"抹成"噪声；反向把噪声"雕回"数据——但反向的方程**不能白嫖**：需要知道每点的 score
- score 项像"纠偏器"：纯扩散会把样本推向无信息区，score 项持续把它拽回数据流形
- 反向**仍有噪声项**——与 [[30-Formulas/概率流ODE]]（完全无噪声）的区别
- 离散化误差 + 步数决定质量：预测-校正采样器把 SDE 步与朗之万步交替使用

## 4. 出处

| 论文 | 贡献 |
|---|---|
| Anderson 1982（随机过程文献） | 反向方程原初形式 |
| [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] | 首次用作生成模型 + score 网络 |
| [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）]] | 离散版隐含使用 |

## 5. 数学概念分解

- [[40-Concepts/随机微分方程（SDE）|随机微分方程]]：母类
- [[40-Concepts/Score函数]]：漂移修正项
- [[40-Concepts/维纳过程]]：反向噪声
- [[40-Concepts/采样器]]：离散化策略

## 6. 与其他公式的关系

- → **由** [[30-Formulas/Score-SDE前向过程]] **推导**
- ≡ **等价变形**（去噪声版）：[[30-Formulas/概率流ODE]]
- → **离散化为** DDPM 祖先采样（[[30-Formulas/DDPM后验分布]] 的采样实现）
- 训练靠 [[30-Formulas/DSM目标]] / [[30-Formulas/DDPM训练目标]]（score/噪声预测）
