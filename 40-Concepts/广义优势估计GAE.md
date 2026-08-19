---
type: concept
aliases: [广义优势估计, GAE, Generalized Advantage Estimation, TD误差]
domain: 数学基础
tags: [concept]
---

# 广义优势估计 GAE

## 1. 定义（直觉 → 形式）

**直觉**：估计"这个动作比平均好多少"有两条路——**蒙特卡洛**（等整条轨迹跑完看总回报：准但吵）vs **自举**（用 critic 的预测：稳但有偏）。GAE 用一个参数 $\lambda$ 在两者之间**连续滑动**，取各自长处。

**形式**：
$$\hat{A}_t^{\text{GAE}(\gamma, \lambda)} = \sum_{l=0}^{\infty} (\gamma\lambda)^l\, \delta_{t+l}$$
其中 TD 误差 $\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)$。

- $\lambda = 0$：$\hat A_t = \delta_t$（纯自举，一步 TD，低方差高偏差）
- $\lambda = 1$：$\hat A_t = \sum \gamma^l r_{t+l} - V(s_t)$（纯蒙特卡洛，无偏高方差）

## 2. 数学形式

- **推导本质**：优势估计的"n 步指数混合"——每个 n 步估计都是 $\delta$ 的和，$\lambda$ 控制权重衰减
- **偏差-方差权衡**：RL 最核心的 trade-off；GAE 是它最著名的"旋钮化"
- 实践值：$\gamma \approx 0.99$, $\lambda \approx 0.95$
- **LLM 对齐中的角色**：InstructGPT/PPO 的 $\hat{A}_t$ 几乎都用 GAE；GRPO 用组内中心化代替（无 critic 版本）

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/04-强化学习与对齐/High-Dimensional Continuous Control Using Generalized Advantage Estimation（GAE）]] | 提出（ Schulman et al. 2015） |
| [[30-Formulas/PPO裁剪目标]] | 优势项的标准估计器 |
| [[10-Papers/04-强化学习与对齐/Training language models to follow instructions with human feedback（InstructGPT）]] | PPO+GAE 直接套用于 LLM |

## 4. 常见误区

- **误区**：$\lambda$ 是折扣——不是！$\gamma$ 管折扣，$\lambda$ 管估计器的混合比例，职责分离
- **误区**：GAE 消除偏差——只是**可调**偏差-方差，$\lambda\in(0,1)$ 时两者兼有
- **误区**：GAE 需要 critic 完美——critic 误差是偏差来源，$\lambda$ 小则更依赖 critic

## 5. 相关概念

- [[40-Concepts/贝尔曼方程]]：TD 误差的定义
- [[40-Concepts/策略梯度定理]]：GAE 服务的对象
- [[40-Concepts/期望]]：估计的统计基础
