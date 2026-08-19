---
type: concept
aliases: [Jensen不等式, Jensen's Inequality]
domain: 数学基础
tags: [concept]
---

# Jensen 不等式

## 1. 定义（直觉 → 形式）

**直觉**：**凹函数下"先平均再代入"≥"先代入再平均"**。打车类比：两队人各自到同一目的地，"平均后走一条路"（凹函数作用于期望）不亏于"每人各走各的再平均"（期望的函数）——凹函数有"先合并不吃亏"的性质。log 是凹函数，所以 $\log \mathbb{E}[\cdot] \ge \mathbb{E}[\log \cdot]$。

**形式**：若 $f$ 凸：$f(\mathbb{E}[X]) \le \mathbb{E}[f(X)]$；若 $f$ 凹（如 $\log$）：$f(\mathbb{E}[X]) \ge \mathbb{E}[f(X)]$。

## 2. 数学形式

- **ELBO 推导中的关键一步**（$\log$ 凹）：
$$\log p_\theta(x) = \log \mathbb{E}_{q(z\mid x)}\!\left[ \frac{p_\theta(x,z)}{q(z\mid x)} \right] \ \ge\ \mathbb{E}_{q(z\mid x)}\!\left[ \log \frac{p_\theta(x,z)}{q(z\mid x)} \right] = \text{ELBO}$$
- **取等条件**：$X$ 退化（无随机性）或 $f$ 线性
- **相关孪生**：EM 算法、变分推断、RL 里的策略评估都以同一不等式为骨架

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[40-Concepts/ELBO]] | 下界成立的唯一一步魔法 |
| [[10-Papers/02-生成建模与扩散/Auto-Encoding Variational Bayes（VAE）]] | 训练目标的合法性来源 |
| [[30-Formulas/DDPM训练目标]] | DDPM 的 ELBO 是其多步版本 |
| RL（PPO 下界） | $\log \mathbb{E} \ge \mathbb{E}\log$ 同样出现 |

## 4. 常见误区

- **误区**：方向记反——口诀"**凹上凸下**"（凹函数：函数在期望之上；凸函数：函数在期望之下）
- **误区**：Jensen 给的是下界不是等式；差距 = [[40-Concepts/KL散度]]
- **误区**：只对"期望"成立，对"任意平均"也成立（加权平均同理）

## 5. 相关概念

- [[40-Concepts/ELBO]]：最重要的应用
- [[40-Concepts/期望]]：不等式的作用对象
- [[40-Concepts/高斯分布]]：log-凹性使高斯相关推导顺畅
