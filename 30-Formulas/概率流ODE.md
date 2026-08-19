---
type: formula
formula_id: PROB-FLOW-ODE
aliases: [概率流ODE, Probability Flow ODE, PF-ODE]
domain: 生成建模
tags: [formula]
---

# 概率流 ODE

## 1. 标准形式

$$\frac{dx}{dt} = f(x, t) - \frac{1}{2}\, g^2(t)\, \nabla_x \log p_t(x)$$

（正向 SDE $dx = f\,dt + g\,dw$ 的确定性伴生。）

**反向使用**（生成，本库标准方向 $t: 1 \to 0$）：
$$\frac{dx}{dt} = f(x,t) - \frac{1}{2} g^2(t)\, s_\theta(x, t)$$

**定理**：PF-ODE 的解 $x(t)$ 的边缘分布 $p_t$ 与原 SDE **逐时刻相同**——随机性被"平均"进了漂移修正项。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| score 参数化 | 漂移 $f - \frac12 g^2 s_\theta$ | Score-SDE 2021 | score 派 |
| ε 参数化 | $\propto -\epsilon_\theta/\sigma_t$ 方向 | DDIM/EDM 记号 | 扩散派 |
| v 参数化（FM） | $dx/dt = v_\theta(x_t, t)$ | [[30-Formulas/条件流匹配损失]] | **FM 直接学 PF-ODE 右端** |
| DDIM 离散 | $x_{t-1} = \sqrt{\bar\alpha_{t-1}} \hat{x}_0 + \sqrt{1-\bar\alpha_{t-1}}\, \epsilon_\theta$ | DDIM 2020 | PF-ODE 的一阶离散 |

## 3. 直觉解释

- **同一枚硬币的两面**：SDE 采样（随机、多样）与 ODE 采样（确定、可逆）共享同一边缘分布——想换随时换，模型不用重训
- **ODE 的三大红利**：①精确对数似然（连续归一化流视角）②隐空间插值（起终点编码）③少步采样（好积分器 + 直轨迹）
- FM 与扩散的和解点：**FM 学的就是 PF-ODE 的速度场**——Rectified Flow 拉直轨迹 = 让 PF-ODE 更好积分
- DDIM 就是 PF-ODE 的欧拉离散——"确定性采样"不是新发明，是同一数学的不同离散

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] | 严格证明同边缘 |
| [[10-Papers/02-生成建模与扩散/Denoising Diffusion Implicit Models（DDIM）]] | 离散特例、少步实用化 |
| [[10-Papers/02-生成建模与扩散/Flow Matching for Generative Modeling（流匹配）]] | 直接学右端速度场 |
| [[10-Papers/02-生成建模与扩散/Building Normalizing Flows with Stochastic Interpolants（随机插值）]] | 统一证明：插值 → ODE/SDE 族 |

## 5. 数学概念分解

- [[40-Concepts/常微分方程（ODE）|常微分方程]]：本体
- [[40-Concepts/Score函数]]：右端项
- [[40-Concepts/随机微分方程（SDE）|随机微分方程]]：母过程
- [[40-Concepts/采样器]]：数值积分实现

## 6. 与其他公式的关系

- → **由** [[30-Formulas/Score-SDE前向过程]] **推导**（Fokker-Planck 消噪声项）
- ≡ **等价变形** 于 [[30-Formulas/反向SDE]] 的确定性版本
- → **离散化为** [[30-Formulas/DDIM更新规则]]
- ⊃ **被特化**：[[30-Formulas/条件流匹配损失]] 训练目标的速度场即其右端
