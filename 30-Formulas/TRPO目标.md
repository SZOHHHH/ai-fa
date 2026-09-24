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

## 教程：自然梯度一步的完整手算（KL 预算现场）

**第 1 步：单参数化。** 把两 logits 对称参数化 $z = (-\tfrac{d}{2}, +\tfrac{d}{2})$ → $\pi(a_{赢}) = \sigma(d)$。初始 $d = 0$（$\pi = (0.5,0.5)$，宇宙见 [[30-Formulas/贝尔曼最优方程]]）。

**第 2 步：策略梯度与 Fisher。** 代理梯度 $g = \partial J/\partial d$：单次访问期望 $= \pi_{赢}(1-\pi_{赢})(Q_{赢}-Q_{慢}) = 0.5\times0.5\times0.182 = 0.0455$，乘以折扣访问和 $\sum_t(\gamma\pi_{慢})^t = 1/(1-0.45) = 1.818$ → $g \approx 0.0826$。Fisher（伯努利对自然参数）：$F = \pi_{赢}\pi_{慢} = 0.25$。

**第 3 步：TRPO 更新公式。** $\Delta d = \sqrt{\delta/(gF^{-1}g)}\times F^{-1}g$。取 KL 预算 $\delta = 0.01$：$g^2/F = 0.0826^2/0.25 = 0.0273$；$\sqrt{0.01/0.0273} = 0.605$；$\Delta d = 0.605\times(0.0826/0.25) = 0.605\times0.330 = 0.200$。

**第 4 步：更新并验收 KL。** $d: 0 \to 0.20$ → $\pi(a_{赢}) = \sigma(0.2) = 0.550$。实测 $\mathrm{KL}(\pi_{old}\Vert\pi_{new}) = 0.5\ln\frac{0.5}{0.55} + 0.5\ln\frac{0.5}{0.45} = -0.0477+0.0527 = 0.0050 \le 0.01$ ✓ 预算内（二阶近似的保守性留了余量）。

**第 5 步：与 PPO 对照。** 同场景 PPO 的比率 $\rho = 0.55/0.5 = 1.10 < 1.2$——裁剪不触发，两家本步等效。**差别全在实现**：TRPO 解"二次约束优化"（共轭梯度+线搜索），PPO 用 min+clip 一阶搞定——这就是 PPO 赢得工程人心的原因。

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

## 6. 自测

1. 自然梯度 $F^{-1}g$ 与普通梯度 $g$ 差在哪？（按 Fisher 度量的"分布几何"重新丈量方向——参数空间各方向对分布的影响不等价）
2. KL 预算 $\delta$ 的作用？（画信赖域：一步更新的分布变化不超预算——单调改进保证的前提）
3. 教程一步把 $\pi(a_{赢})$ 推到哪？实测 KL？（0.5→0.55；KL = 0.005 ≤ 预算 0.01 ✓）
4. TRPO→PPO 简化了什么代价？（Fisher+共轭梯度+线搜索（二阶）→ min+clip（一阶）——效果相当、实现大简）

## 7. 与其他公式的关系

- → **演进为** [[30-Formulas/PPO裁剪目标]]：硬约束 → 裁剪（复杂度三级降）
- → **思想延续** [[30-Formulas/RLHF目标]] 的 KL 正则（软信赖域）
- ← **基于** [[40-Concepts/策略梯度定理]] + 重要性采样修正
- → **另一后裔** [[30-Formulas/GRPO目标]]（继承 PPO 裁剪 + 去 critic）
