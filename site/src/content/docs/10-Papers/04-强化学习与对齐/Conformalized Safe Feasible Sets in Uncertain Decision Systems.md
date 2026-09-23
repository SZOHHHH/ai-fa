---
type: paper
title: Conformalized Safe Feasible Sets in Uncertain Decision Systems
aliases: [DISC, Conformalized Safe Feasible Sets]
year: 2026
authors: [Yajie Bao, Yinjie Min, Haojie Ren, Changliang Zou]
venue: arXiv 2026
arxiv: "2609.24496v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [安全决策(保形校准), 集值输出, 下游优化感知]
tags: [paper]
---

# Conformalized Safe Feasible Sets（DISC）

## 1. 一句话贡献

提出 DISC（定向包含安全校准）：安全决策问题里不做"先预测标签集、再对集内每个值都安全"的两步保守法，而是把"候选决策集 ⊆ 真可行集"这一包含事件本身约化为标量分数做保形校准——有限样本、分布无关地保证 $$\text{P}\{D(X) \subseteq A(X,Y)\} \ge 1-\alpha$$，且可行域比两步法更大。

## 2. 核心贡献

- **包含事件的标量化**：嵌套候选集族 $$D(X;\lambda)$$（$$\lambda$$ 越大越保守）下，每个标注样本对应唯一"最小安全嵌套水平"，测试时取经验分位数定 $$\lambda$$——把集合包含判定精确转化为标量阈值事件
- **两个实用集族 + 包含关系定理**：预测集族（嵌套预测集替换式 (3) 的鲁棒优化构造）与加性残差族（预测约束值加可调裕量）下，DISC 输出严格包含对应基线的可行集（更不保守）
- **可计算性**：分数求解 = 逐 λ 验证"最坏违反 ≤ 0"的约束优化 + 二分；精确解不可得时给出保守上界且不破坏有限样本保证
- **O-DISC / FO-DISC**：按下游决策风险优化集族参数，给包含误差上界与非渐近超额决策风险界；FO-DISC 恢复精确有限样本保证

## 3. 方法概要

1. 问题设定：约束优化 $$\min_u \phi(u)$$ s.t. $$f(u; X, Y) \le 0$$，真标签 $$Y$$ 决策时不可观测——目标造安全子集 $$D(X) \subseteq A(X,Y)$$，任意目标函数都可在其上优化
2. 基线（两步法）：保形预测出标签集 $$C(X)$$，保留对**所有** $$y \in C(X)$$ 都可行的决策——标签覆盖是包含的**充分不必要**条件，中间事件过强导致可行域无谓收缩甚至为空
3. DISC：预先给嵌套族 $$D(X;\lambda)$$；对每个标注点算分数 $$V_i$$（使子集恰好整体安全的最小 $$\lambda$$）；测试时 $$\hat\lambda$$ = 校准分数的经验 $$(1-\alpha)$$ 分位数，输出 $$D(X_{n+1}; \hat\lambda)$$
4. 交换性下定理 2.1 给有限样本保证（且分数几乎必然互异时覆盖上限 $$1-\alpha + 1/(n+1)$$）
5. 实例化到两个集族并开发决策感知的集族学习（O-DISC）

## 4. 核心公式

DISC 分数与校准：

`$$V_i = \inf\{\lambda \in \mathbb{R}: \sup_{u \in D(X_i;\lambda)} f(u; X_i, Y_i) \le 0\},\quad \hat\lambda = Q_{1-\alpha}(\{V_i\}_{i=1}^n)$$`

**直觉**：对每个历史样本问一句"候选集要收缩到多保守，才连最坏的那个决策都安全？"——这个临界收缩量就是分数。嵌套性保证"一旦安全便一直安全"，于是分数是个良定义的标量阈值；交换性让"新样本的分数不超过校准分位数"恰好等价于"输出的集合整体落在真可行域内"。两步法校准的是"标签猜没猜中"，DISC 直接校准"决策集越没越界"——中间事件更弱，所以省下的保守性全部变成更大的可行域。

## 5. 与前作/矩阵关系

- 决策感知线近邻：[Accuracy Is Not Service: A Decision-Aware Benchmark for Intermittent-Demand Forecasting](/ai-fa/explore/10-Papers/04-强化学习与对齐/Accuracy Is Not Service A Decision-Aware Benchmark for Intermittent-Demand Forecasting)（同为"预测质量 ≠ 决策质量"纲领，本文是其统计保证侧）· [Concept-Level Risk and Calibration for Governance in Diffusion Foundation Models](/ai-fa/explore/10-Papers/04-强化学习与对齐/Concept-Level Risk and Calibration for Governance in Diffusion Foundation Models)（校准思想在扩散治理侧的呼应）
- 方法谱系：split conformal prediction（标签覆盖）→ conformal risk control（期望风险控制，本文校准原则来源）→ 本文（集值包含事件直接校准）
- 概念根基：[条件概率](/ai-fa/explore/40-Concepts/条件概率)（保证语句的形式）· [概率分布](/ai-fa/explore/40-Concepts/概率分布)（分位数/交换性）

## 6. 影响后续

- 为"不确定下先定可行域、再任意优化"的决策管线（机会约束规划、避障规划、LLM 结构化输出）提供比鲁棒优化两步法更紧的安全保证
- 对我们仅是外围：若未来 WM rollout 需要给动作加统计安全罩（如安全动作集校准），这是现成的框架

## 7. 读前须知

保形预测基础（split conformal + 可交换性）· 机会约束规划（chance-constrained programming）概念 · [条件概率](/ai-fa/explore/40-Concepts/条件概率)；本文为统计方法文（stat.ME），不涉及学习世界模型或强化学习算法本体。
