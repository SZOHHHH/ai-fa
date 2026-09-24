---
type: concept
aliases: [log导数技巧, Log-Derivative Trick, REINFORCE, 策略梯度, Score Function Estimator]
domain: 数学基础
tags: [concept]
---

# log 导数技巧（REINFORCE）

## 1. 定义（直觉 → 形式）

**直觉**：期望里的随机变量依赖参数（$$x \sim p_\theta$$）时，梯度怎么穿过采样？**恒等式变身**：$$\nabla_\theta p_\theta = p_\theta \nabla_\theta \log p_\theta$$，把"对分布求导"变成"对 log 密度求导 × 原期望"——梯度变成了一个新的期望，可用蒙特卡洛估计。

**形式**（核心推导一行）：
$$\nabla_\theta \mathbb{E}_{x \sim p_\theta}[f(x)] = \mathbb{E}_{x \sim p_\theta}\!\left[ f(x)\, \nabla_\theta \log p_\theta(x) \right]$$
推导：$$\nabla_\theta \int f p_\theta = \int f \nabla_\theta p_\theta = \int f\, p_\theta \nabla_\theta \log p_\theta$$。

**名字混乱警示**：$$\nabla_\theta \log p_\theta$$ 也被叫 "score function"——与 [Score函数](/ai-fa/explore/40-Concepts/Score函数)（$$\nabla_x \log p$$，对变量求导）**同名不同物**。本库约定：**对参数求导的语境叫"log 导数技巧"，对变量求导的才叫 Score 函数**。

## 2. 数学形式

- **REINFORCE 估计**：$$\hat g = f(x_i) \nabla_\theta \log p_\theta(x_i)$$，$$x_i \sim p_\theta$$——无偏但**高方差**
- **方差缩减**：减 baseline $$b$$：$$\mathbb{E}[(f - b)\nabla_\theta \log p_\theta]$$ 仍无偏、方差更小（RL 里的 value function 就是 baseline）
- **与重参数化对比**（同一问题的两条路）：

| 方法 | 梯度路径 | 方差 | 适用 |
|---|---|---|---|
| log 导数技巧 | 不穿过网络 | 高 | 离散分布 |
| [重参数化](/ai-fa/explore/40-Concepts/重参数化) | 穿过网络 | 低 | 连续（位置-尺度族）|

- **代价函数不需要可导**：$$f$$ 只需可采样评估——RL 中 reward 是黑盒的原因

## 教程：bandit 版三行验证（恒等式不是玄学）

**第 1 步：最小设定。** 两动作外生打分 $$f = (0.8,\ 1.0)$$（不依赖策略——bandit 简化，状态递归版见 [策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理)）；$$\pi = \mathrm{softmax}(z)$$，$$z = (0,0)$$ → $$\pi = (0.5, 0.5)$$。

**第 2 步：目标与数值梯度。** $$J(z) = \mathbb{E}_\pi[f] = 0.5\times0.8+0.5\times1 = 0.9$$。把 $$p = \pi(a_2)$$ 微调到 0.6：$$J = 0.4\times0.8+0.6\times1 = 0.92$$ → 数值梯度 $$\Delta J/\Delta p = 0.2/1 = 0.2$$。

**第 3 步：恒等式路线。** $$\nabla_{z_2}\log\pi(a_2) = 1-\pi_2 = 0.5$$；$$\nabla_{z_2}\log\pi(a_1) = -\pi_2 = -0.5$$。$$\mathbb{E}[f\nabla_{z_2}\log\pi] = 0.5\times0.8\times(-0.5) + 0.5\times1\times0.5 = -0.20+0.25 = +0.05$$。

**第 4 步：对账。** $$dp/dz_2 = p(1-p) = 0.25$$；$$\frac{dJ}{dp} = 0.05/0.25 = 0.2$$ ✓ **与数值梯度分毫不差**——恒等式只是"把梯度的鞋带从采样里解出来"：推导一行 $$\nabla\int fp = \int f\nabla p = \int fp\nabla\log p$$。

**第 5 步：读懂代价。** $$f$$ 全程只被**评估**（0.8、1.0 当黑盒用）从未求导——这是 RL 奖励可为任意黑盒的数学根源；代价是方差（单样本估计在 $$\pm$$ 之间摆动），于是有了 baseline、critic 与重参数化（连续分布的低方差平行路线，[重参数化](/ai-fa/explore/40-Concepts/重参数化)）。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| 策略梯度 / REINFORCE | $$\nabla_\theta J = \mathbb{E}[\nabla_\theta \log \pi_\theta \cdot R]$$——整个 RL 的地基（B2 线） |
| [Consistency Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）) | 一致性蒸馏中的期望梯度处理 |
| Gumbel-Softmax | 离散选择的可微松弛（结合两者） |
| 变分推断 | score function 估计器家族 |

## 4. 常见误区

- **误区**：与 Score 函数（$$\nabla_x$$）混淆——求导对象不同，本库已强制命名区分
- **误区**："无偏所以好用"——方差大到训不动，baseline/actor-critic 全是为压方差而生
- **误区**：$$\nabla_\theta \log p_\theta(x)$$ 要求 $$f$$ 可导——不需要！$$f$$ 只是被采样评估

## 5. 自测

1. bandit $$f = (0.8, 1)$$、$$\pi = (0.5,0.5)$$：$$\mathbb{E}[f\nabla_{z_2}\log\pi]$$？（$$-0.20+0.25 = +0.05$$）
2. 换算成对 $$p$$ 的梯度并验证？（除以 $$dp/dz = 0.25$$ → 0.2 = 数值梯度 ✓）
3. $$f$$ 需要可导吗？（不需要！只被采样评估——奖励可为黑盒）
4. 与重参数化的分工？（离散分布用 log 导数（高方差）；连续位置-尺度族用重参数化（低方差））

## 6. 相关概念

- [重参数化](/ai-fa/explore/40-Concepts/重参数化)：低方差替代方案
- [梯度](/ai-fa/explore/40-Concepts/梯度)：技巧的本质是恒等式改写
- [期望](/ai-fa/explore/40-Concepts/期望)：期望的梯度估计
