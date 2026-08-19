---
type: formula
formula_id: TRPO-OBJ
aliases: [TRPO目标, 信赖域策略优化目标]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# TRPO 目标

## 1. 标准形式

$$\max_\theta\ \hat{\mathbb{E}}\!\left[ \frac{\pi_\theta(a \mid s)}{\pi_{\text{old}}(a \mid s)}\, \hat{A}_t \right] \quad \text{s.t.}\quad \hat{\mathbb{E}}\!\left[ D_{\mathrm{KL}}\!\left( \pi_{\text{old}}(\cdot\mid s)\ \Big\|\ \pi_\theta(\cdot\mid s) \right) \right] \le \delta$$

- 代理目标 = [[40-Concepts/重要性采样]] 比率 × 优势（旧数据评估新策略）
- KL 硬约束画"信赖域"（[[40-Concepts/信赖域]]）
- 解法：目标线性近似 + 约束二次近似（Fisher 矩阵）→ 共轭梯度求自然梯度方向 → 线搜索回溯

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 带约束优化（本库标准） | 如上 | TRPO 2015 | 原始 |
| 代理目标（无约束版） | $\mathbb{E}[\rho_t(\theta)\hat A]$ | 同上 | 未近似前的形态 |
| KL 软惩罚版 | 目标 $- \beta\,\hat{\mathbb{E}}[\mathrm{KL}]$（自适应 $\beta$） | PPO 论文对照实验 | 折中方案 |
| 裁剪版 | 见 [[30-Formulas/PPO裁剪目标]] | PPO 2017 | 工程简化终极形态 |

## 3. 直觉解释

- 策略梯度一步跨太大 → 重要性比率爆炸 → 学习崩；TRPO 用 KL 画圈"每步只走这么多"
- **理论保证**：信赖域内的更新有单调改进保证（策略改进定理）
- **工程痛点**：二阶近似 + 共轭梯度，实现复杂、批间采样浪费——PPO 用一阶裁剪达到同等效果后 TRPO 退居理论
- Fisher 矩阵 $F$ = KL 的 Hessian：从"概率分布几何"看参数步长——自然梯度视角

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）]] | 提出 |
| [[10-Papers/04-强化学习与对齐/High-Dimensional Continuous Control Using Generalized Advantage Estimation（GAE）]] | 同作者配套的 $\hat A$ 估计器 |
| Kakade & Langford 2002 | 策略改进理论前史 |

## 5. 数学概念分解

- [[40-Concepts/信赖域]]：全部思想
- [[40-Concepts/重要性采样]]：代理目标形态
- [[40-Concepts/KL散度]]：约束度量
- [[40-Concepts/广义优势估计GAE]]：优势估计

## 6. 与其他公式的关系

- → **演进为** [[30-Formulas/PPO裁剪目标]]：硬约束 → 裁剪（复杂度三级降）
- → **思想延续** [[30-Formulas/RLHF目标]] 的 KL 正则（软信赖域）
- ← **基于** [[40-Concepts/策略梯度定理]] + 重要性采样修正
- → **另一后裔** [[30-Formulas/GRPO目标]]（继承 PPO 裁剪 + 去 critic）
