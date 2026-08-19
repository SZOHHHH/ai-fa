---
type: concept
aliases: [随机微分方程, SDE, Stochastic Differential Equation]
domain: 数学基础
tags: [concept]
---

# 随机微分方程 SDE

## 1. 定义（直觉 → 形式）

**直觉**：ODE + 随机抖动。粒子既被速度场推着走（漂移项），又被随机力踢来踢去（扩散项）。像花粉在水中：整体有水流方向（drift），同时被分子撞得乱颤（diffusion）。

**形式**：
$$dx = f(x_t, t)\, dt + g(t)\, dw$$
- $f(x_t, t)$：**漂移系数**（确定性速度）
- $g(t)$：**扩散系数**（噪声强度，本库标准只取时间函数形式）
- $dw$：[[40-Concepts/维纳过程]] 的增量，$\Delta w \sim \mathcal{N}(0, \Delta t\, I)$
- 记号 $dx$、$dw$ 是微分形式，理解成"$dt$ 时间内的增量"

## 2. 数学形式

- **每时刻诱导分布** $p_t(x)$：SDE 的解不是单条轨迹而是分布随时间的演化
- **Fokker–Planck 方程**：$p_t$ 满足的 PDE $\partial_t p = -\nabla \cdot (f p) + \frac{1}{2} g^2 \nabla^2 p$——描述整个分布如何被推着变形
- **反向 SDE**（Anderson 1982）：正向 $dx = f\,dt + g\,dw$ 的反向时间过程为
$$dx = \left[ f - g^2 \nabla_x \log p_t(x) \right] dt + g\, d\bar w$$
反向漂移需要 **[[40-Concepts/Score函数]]** $\nabla_x \log p_t$——这就是"学习 score 就能反向采样"的数学根据
- **概率流 ODE**：每个 SDE 都有同边缘分布的确定性 ODE 伴生（见 [[30-Formulas/概率流ODE]]）

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[30-Formulas/Score-SDE前向过程]] | 统一 SMLD（VP-SDE）与 DDPM（VE-SDE）的框架 |
| [[30-Formulas/DDPM前向过程]] | 离散步极限 = VP-SDE |
| [[30-Formulas/概率流ODE]] | SDE ↔ ODE 双采样通道 |
| [[10-Papers/02-生成建模与扩散/Building Normalizing Flows with Stochastic Interpolants（随机插值）|随机插值论文]] | 在 SDE 与 ODE 之间连续插值的统一理论 |

## 4. 常见误区

- **误区**：$dw$ 是普通函数——它是随机过程增量，$\mathbb{E}[dw]=0$ 但 $\mathrm{Var}[dw] = dt$
- **误区**：反向 SDE 的噪声是"去掉的噪声"——反向仍含噪声项 $g\,d\bar w$，只有概率流 ODE 才完全无噪声
- **误区**：扩散系数 $g(t)$ 影响的不只是"多吵"，还决定 VP/VE 等不同框架（见 EDM 的统一分析）

## 5. 相关概念

- [[40-Concepts/常微分方程（ODE）|常微分方程]]：无噪声版本
- [[40-Concepts/维纳过程]]：噪声的数学对象
- [[40-Concepts/Score函数]]：反向 SDE 的关键拼图
- [[40-Concepts/马尔可夫链]]：SDE 是连续时间马尔可夫过程
