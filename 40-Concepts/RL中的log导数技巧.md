---
type: concept
aliases: [log导数技巧, Log-Derivative Trick, REINFORCE, 策略梯度, Score Function Estimator]
domain: 数学基础
tags: [concept]
---

# log 导数技巧（REINFORCE）

## 1. 定义（直觉 → 形式）

**直觉**：期望里的随机变量依赖参数（$x \sim p_\theta$）时，梯度怎么穿过采样？**恒等式变身**：$\nabla_\theta p_\theta = p_\theta \nabla_\theta \log p_\theta$，把"对分布求导"变成"对 log 密度求导 × 原期望"——梯度变成了一个新的期望，可用蒙特卡洛估计。

**形式**（核心推导一行）：
$$\nabla_\theta \mathbb{E}_{x \sim p_\theta}[f(x)] = \mathbb{E}_{x \sim p_\theta}\!\left[ f(x)\, \nabla_\theta \log p_\theta(x) \right]$$
推导：$\nabla_\theta \int f p_\theta = \int f \nabla_\theta p_\theta = \int f\, p_\theta \nabla_\theta \log p_\theta$。

**名字混乱警示**：$\nabla_\theta \log p_\theta$ 也被叫 "score function"——与 [[40-Concepts/Score函数]]（$\nabla_x \log p$，对变量求导）**同名不同物**。本库约定：**对参数求导的语境叫"log 导数技巧"，对变量求导的才叫 Score 函数**。

## 2. 数学形式

- **REINFORCE 估计**：$\hat g = f(x_i) \nabla_\theta \log p_\theta(x_i)$，$x_i \sim p_\theta$——无偏但**高方差**
- **方差缩减**：减 baseline $b$：$\mathbb{E}[(f - b)\nabla_\theta \log p_\theta]$ 仍无偏、方差更小（RL 里的 value function 就是 baseline）
- **与重参数化对比**（同一问题的两条路）：

| 方法 | 梯度路径 | 方差 | 适用 |
|---|---|---|---|
| log 导数技巧 | 不穿过网络 | 高 | 离散分布 |
| [[40-Concepts/重参数化]] | 穿过网络 | 低 | 连续（位置-尺度族）|

- **代价函数不需要可导**：$f$ 只需可采样评估——RL 中 reward 是黑盒的原因

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| 策略梯度 / REINFORCE | $\nabla_\theta J = \mathbb{E}[\nabla_\theta \log \pi_\theta \cdot R]$——整个 RL 的地基（B2 线） |
| [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）]] | 一致性蒸馏中的期望梯度处理 |
| Gumbel-Softmax | 离散选择的可微松弛（结合两者） |
| 变分推断 | score function 估计器家族 |

## 4. 常见误区

- **误区**：与 Score 函数（$\nabla_x$）混淆——求导对象不同，本库已强制命名区分
- **误区**："无偏所以好用"——方差大到训不动，baseline/actor-critic 全是为压方差而生
- **误区**：$\nabla_\theta \log p_\theta(x)$ 要求 $f$ 可导——不需要！$f$ 只是被采样评估

## 5. 相关概念

- [[40-Concepts/重参数化]]：低方差替代方案
- [[40-Concepts/梯度]]：技巧的本质是恒等式改写
- [[40-Concepts/期望]]：期望的梯度估计
