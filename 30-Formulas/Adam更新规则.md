---
type: formula
formula_id: ADAM
title: Adam更新规则
aliases: [Adam更新规则, Adam, 自适应矩估计, Adaptive Moment Estimation]
domain: 优化
tags: [formula]
---

# Adam 更新规则

## 1. 标准形式

$$m_t = \beta_1 m_{t-1} + (1-\beta_1)\, g_t \qquad v_t = \beta_2 v_{t-1} + (1-\beta_2)\, g_t^2$$
$$\hat m_t = \frac{m_t}{1-\beta_1^t}, \quad \hat v_t = \frac{v_t}{1-\beta_2^t} \qquad \theta \leftarrow \theta - \eta\, \frac{\hat m_t}{\sqrt{\hat v_t} + \epsilon}$$

- $m_t$：梯度的**一阶矩**滑动平均（方向，$\beta_1{=}0.9$）——动量
- $v_t$：梯度**平方**的二阶矩滑动平均（逐参数尺度，$\beta_2{=}0.999$）
- 帽子=**偏差修正**（初期 $m, v$ 从 0 起步被低估，除以 $(1-\beta^t)$ 拉回）
- 谱系与选型见上位卡 [[20-Algorithms/梯度下降与优化器谱系]]（本卡是其中的"第 5 级"）

## 2. 教程：手算前两步（看清三件事）

**第 1 步：设定。** 单参数，梯度序列 $g_1 = 2,\ g_2 = -1$；$\beta_1=0.9,\ \beta_2=0.999$（默认），$m_0=v_0=0$，$\eta=0.1$。

**第 2 步：一阶矩（动量）。**
$$m_1 = 0.1\times2 = 0.2 \qquad m_2 = 0.9\times0.2 + 0.1\times(-1) = 0.08$$
梯度从 +2 翻到 −1（震荡），动量 0.2→0.08 仍为正——**历史在平滑对冲**，这正是动量消震荡的微观现场。

**第 3 步：二阶矩+偏差修正（初期为什么要戴帽子）。**
$$v_1 = 0.001\times4 = 0.004 \quad\Rightarrow\quad \hat v_1 = \frac{0.004}{1-0.999} = \frac{0.004}{0.001} = 4$$
**没修正的话** $\sqrt{v_1}=0.063$，步长 $\eta m/\sqrt v$ 被放大到荒谬；修正后 $\sqrt{\hat v_1}=2$——恢复到真实尺度。**偏差修正=把"从零冷启动的折扣"除回去**（$t$ 大后 $0.999^t\to0$，帽子自动失效）。

**第 4 步：更新。** 第一步：$\Delta\theta_1 = -0.1\times\frac{0.2}{2} = -0.01$（分子分母量级匹配，步长≈η）；对比 SGD 同刻步长 $0.1\times2=0.2$——Adam 的步长**自动落在 η 量级**（除非梯度持续同号，$|m|/\sqrt v \le 1$ 恒成立——Adam 的"步长上界=η"性质，训练稳定的来源之一）。

**第 5 步：读出"自适应"的字面意义。** 某参数长期梯度 1e-3（embedding 冷门位）、另一参数梯度 10（稠密层）：SGD 同 η 一刀切（前者几乎不动、后者狂飙）；Adam 各自 $m/\sqrt v\approx\pm1$——**同一步长、按各自尺度归一**，这就是"逐参数自适应"。

## 3. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| Adam（本卡） | $m, v$ 双动量+偏差修正 | [[Adam- A Method for Stochastic Optimization（Adam）]] | 默认 β=(0.9, 0.999) |
| **AdamW** | 衰减从梯度中解耦：$\theta\leftarrow(1-\eta\lambda)\theta-\eta\hat m/(\sqrt{\hat v}+\epsilon)$ | [[Decoupled Weight Decay Regularization（AdamW）]] | LLM 标配——正则语义修复 |
| RMSProp | 无 $m$（只有 $v$），无修正 | 未建卡 | Adam 前驱 |
| 带 warmup 的 Adam | 前 $t_w$ 步 $\eta$ 线性升 | Transformer 系 | 冷启动期 $m/v$ 未热身 |

## 4. 直觉解释

- **方向 ×（除以）尺度**：分子管"往哪走"（动量平滑），分母管"走多远"（按该参数自己的梯度尺度缩放）——两个正交的问题分开解决
- **为什么 LLM 爱它**：embedding/注意力/FFN 的梯度尺度差几个数量级+稀疏更新——自适应几乎必需（SGD 系在视觉小模型才常胜）
- **AdamW 的教训**：把权重衰减混入梯度会被 $\sqrt{\hat v}$ **重新缩放**（衰减强度随参数漂移）；解耦后衰减按原意工作——一行改动，正则语义归位（[[40-Concepts/过拟合与正则化]]）

## 5. 数学概念分解

- [[40-Concepts/梯度]]：$g_t$ 的来源（BP 算出）
- [[40-Concepts/期望]]：$m, v$ 都是梯度（及其平方）的指数加权"期望估计"
- [[20-Algorithms/梯度下降与优化器谱系]]：GD→SGD→Momentum→Adam 五级进化的上位叙事
- [[40-Concepts/过拟合与正则化]]：权重衰减的正则身份

## 6. 与其他公式的关系

- ⊂ 属于 [[20-Algorithms/梯度下降与优化器谱系]]（含五级手算进化史）
- ↔ 对照 [[Decoupled Weight Decay Regularization（AdamW）]]：衰减项的位置（进梯度 vs 出梯度）
- ↔ 一切训练循环的"消费者"：[[20-Algorithms/反向传播]] 算梯度 → 本公式用梯度
