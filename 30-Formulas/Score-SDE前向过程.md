---
type: formula
formula_id: SCORE-SDE-FWD
aliases: [Score-SDE前向过程, VP-SDE, VE-SDE, 统一SDE框架]
domain: 生成建模
tags: [formula]
---

# Score-SDE 前向过程（统一框架）

## 1. 标准形式

**一般前向 SDE**：
$$dx = f(x, t)\, dt + g(t)\, dw$$

两大特例（该论文统一的两条脉）：

| 框架 | SDE | 对应原模型 | 特点 |
|---|---|---|---|
| **VP-SDE**（方差保持） | $dx = -\frac{1}{2}\beta(t)\, x\, dt + \sqrt{\beta(t)}\, dw$ | DDPM 的连续极限 | 数据被缩到原点附近 |
| **VE-SDE**（方差爆炸） | $dx = \sqrt{\frac{d[\sigma^2(t)]}{dt}}\, dw$ | SMLD 的连续极限 | 数据不动、噪声堆上去 |

**反向 SDE**（生成的数学根据，本库标准记号）：
$$dx = \left[ f(x, t) - g^2(t)\, \nabla_x \log p_t(x) \right] dt + g(t)\, d\bar w$$
只需学 [[40-Concepts/Score函数]] $\nabla_x \log p_t$ 即可反向采样。

**概率流 ODE**（确定性伴生）：
$$dx = \left[ f(x,t) - \frac{1}{2} g^2(t)\, \nabla_x \log p_t(x) \right] dt$$
与反向 SDE 的边缘分布**相同**——同一模型的两种采样方式。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| VP-SDE | 漂移 $-\frac12\beta x$ | Song et al. 2021 | DDPM 极限 |
| VE-SDE | 纯扩散 | 同上 | SMLD 极限 |
| 概率流 ODE | 漂移减半、无噪声 | 同上 | 确定性采样、精确似然 |
| EDM 重参数化 | $\sigma$-空间统一 + 预处理 $D_\theta$ | Karras 2022 | 把 VP/VE 两个参数空间合并成一个 $\sigma$ 轴 |

## 教程：一步欧拉验证"DDPM = VP-SDE 离散"

**第 1 步：VP-SDE 一步欧拉（Euler-Maruyama）。** $dx = -\frac12\beta x\,dt + \sqrt{\beta}\,dw$；取 $\beta = 0.02$，$x_0 = 2$，$dt = 1$，抽 $w = 0.4$：$x_1 = 2 - 0.5\times0.02\times2 + \sqrt{0.02}\times0.4 = 2 - 0.02 + 0.0566 = 2.037$。

**第 2 步：DDPM 离散步同噪声对照。** $x_1 = \sqrt{0.98}\times2 + \sqrt{0.02}\times0.4 = 1.980 + 0.0566 = 2.036$——**小数点后两位一致**（差 $10^{-4}$ 量级）。

**第 3 步：为什么这么近。** 泰勒展开：$\sqrt{1-\beta} = 1 - \beta/2 - \beta^2/8 - \cdots \approx 1 - \beta/2$（$\beta = 0.02$：$\sqrt{0.98} = 0.98995$ vs $1-0.01 = 0.99$，差 $5\times10^{-5}$）——**DDPM 的缩放系数就是 VP-SDE 漂移项的一阶泰勒**。离散模型与连续 SDE 不是两家人，是同一数学的两种采样密度。

**第 4 步：VE 对照（另一极）。** $dx = \sqrt{d\sigma^2/dt}\,dw$，$\sigma: 0\to0.5$：$x_1 = 2 + 0.5\times0.4 = 2.2$——**信号系数纹丝不动**（2 还是 2），纯堆噪声。VP 把数据拉向原点再盖噪声（终点 $\mathcal{N}(0,I)$）；VE 原地埋噪声（终点 $\mathcal{N}(x_0, \sigma_{\max}^2)$）。**方向相反、目的相同**：终点分布已知、可采样。

**第 5 步：统一框架买了什么。** DDPM（VP 脉）与 SMLD（VE 脉）原是两套记号两族论文；Score-SDE 证明它们只是 $f, g$ 的两个系数选择——**反向 SDE、概率流 ODE、Fokker-Planck 全套定理证一次、全族通用**（[[30-Formulas/反向SDE]]、[[30-Formulas/概率流ODE]] 直接继承）。

## 3. 直觉解释

- **统一价值**：DDPM（VP）与 SMLD（VE）此前是两套记号，Score-SDE 证明它们是同一 SDE 的两个系数选择——**记号混乱的终结者**
- 反向 SDE 的漂移项 = 正向漂移 − score 修正：score 是"往数据密集处走"的方向盘
- 概率流 ODE：把随机过程换成确定性轨迹，得到：精确似然可算、可逆、可插值（[[30-Formulas/DDIM更新规则]] 是其离散特例）
- $g(t)$ 决定"噪声怎么长"：VP 把数据往原点缩、VE 往外炸——**方向不同但都是加噪**

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] | 统一框架、反向 SDE、概率流 ODE |
| [[10-Papers/02-生成建模与扩散/Generative Modeling by Estimating Gradients of the Data Distribution（SMLD）]] | VE 脉源头（被统一） |
| [[10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）]] | 跨 VP/VE 的统一消融与再参数化 |

## 5. 数学概念分解

- [[40-Concepts/随机微分方程（SDE）|随机微分方程]]：骨架
- [[40-Concepts/维纳过程]]：噪声源
- [[40-Concepts/Score函数]]：反向与 ODE 的核心量
- [[40-Concepts/常微分方程（ODE）|常微分方程]]：概率流 ODE
- [[40-Concepts/马尔可夫链]]：离散极限与连续版本的桥

## 6. 自测

1. VP 与 VE 对信号的处置差异？（VP 缩向原点（$\sqrt{1-\beta}$ 系数）；VE 不动信号纯加噪——终点各为 $\mathcal{N}(0,I)$ / $\mathcal{N}(x_0,\sigma^2_{\max})$）
2. 欧拉一步 $-\frac12\beta x\,dt$ 对应 DDPM 的哪个系数？（$\sqrt{1-\beta}\approx1-\beta/2$ 一阶泰勒——差 $O(\beta^2)$）
3. 统一框架的核心红利？（反向 SDE/概率流 ODE 定理一次证明覆盖 VP/VE 全族——记号战争终结）
4. EDM 在这框架上做了什么？（重参数化把 VP/VE 两套调度合并到一条 σ 轴 + 预处理 $D_\theta$——设计空间系统消融）

## 7. 与其他公式的关系

- ⊃ **泛化于** [[30-Formulas/DDPM前向过程]]（VP 极限）与 SMLD 噪声链（VE 极限）
- → **推导出** [[30-Formulas/反向SDE]]、[[30-Formulas/概率流ODE]]
- ≡ **等价于** [[30-Formulas/DDIM更新规则]] 的连续时间母体
- → **连接** [[30-Formulas/条件流匹配损失]]：FM 的速度场 = 概率流 ODE 右端（预测量换算表见 FM 页 §2）
