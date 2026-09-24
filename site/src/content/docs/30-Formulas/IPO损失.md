---
type: formula
formula_id: IPO-LOSS
aliases: [IPO损失, Identity Preference Optimization]
domain: 强化学习与对齐
loss_type: regression
tags: [formula]
---

# IPO 损失

## 1. 标准形式

$$\mathcal{L}_{\text{IPO}}(\theta) = \mathbb{E}_{(x, y^+, y^-)}\!\left[ \left( \hat r_\theta(x, y^+) - \hat r_\theta(x, y^-) - \frac{1}{2\beta} \right)^2 \right], \qquad \hat r_\theta = \beta \log\frac{\pi_\theta}{\pi_{\text{ref}}}$$

——把 DPO 的 sigmoid 对数损失换成**平方回归**，回归目标 $$\frac{1}{2\beta}$$。

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 平方回归版（本库标准） | 如上 | Azar et al. 2023（"Ψ-PO" 一般框架的实例） | 原始 |
| Ψ-PO 一般式 | 换不同 Ψ 函数得不同算法 | 同上 | 理论框架 |
| DPO 对照 | $$-\log\sigma(\beta\Delta_{logp})$$ | DPO | 见下 |

## 教程：达标即停 vs 渐近追分（DPO 病的现场对照）

**第 1 步：设定。** $$\beta = 0.5$$ → 回归目标 $$\frac{1}{2\beta} = 1$$：让隐式奖励差 $$\hat r^+ - \hat r^- $$ **恰好等于 1**，不多不少。

**第 2 步：IPO 的账本。** 当前 $$\hat r^+ - \hat r^- = 0$$（训练起点）：$$\mathcal{L} = (0-1)^2 = 1$$。模型学到对数比 $$y^+$$ 侧 $$+1$$、$$y^-$$ 侧 $$-1$$ → $$\hat r^+ = 0.5$$、$$\hat r^- = -0.5$$ → 差 $$= 1$$ → $$\mathcal{L} = 0$$——**梯度完全归零，彻底刹车**。

**第 3 步：DPO 同场景对照。** 同点（差 $$=1$$）DPO 的损失 $$= -\log\sigma(1) = -\log 0.731 = 0.313$$——仍非零，还在追；差拉到 5：$$-\log\sigma(5) = 0.007$$；差拉到 50：$$3\times10^{-22}$$——**渐近零但永不达零**，优化器没有停机信号，继续把 $$y^-$$ 压向 $$e^{-100}$$ 量级（OOD 漂移）。

**第 4 步：目标 1 从哪来。** 不是拍的：从 RLHF-KL 目标的最优解推出"最优策略下偏好差 $$= \frac{1}{2\beta}$$"（[RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标) §2 闭式解代入 BT 似然的计算结果）——**"差这么多刚刚好"是有出处的**：差再大就意味着 KL 已经超过 $$\beta$$ 允许的预算。

**第 5 步：读法。** IPO = 把 DPO 的"分类问题"（sigmoid 无界追分）改回"回归问题"（平方损失有终点）——对齐家族在 IPO 这里短暂回归 [MSE](/ai-fa/explore/30-Formulas/均方误差（MSE）) 家族，`#loss/regression` 的标签即源于此。

## 3. 直觉解释

- **诊断 DPO 的病**：DPO 的 sigmoid 损失在偏好概率已趋于 1 时**梯度仍不归零**——模型继续无底线拉大 $$y^+/y^-$$ 差距 → 过优化、分布漂移
- **IPO 的修法**：回归到固定目标 $$\frac{1}{2\beta}$$——**达到目标就停**（有界）
- 目标值 $$\frac{1}{2\beta}$$ 从哪来：最优策略下偏好差的理论值（从 RLHF-KL 目标的解算出）——"差这么多刚刚好"
- `#loss/regression`：损失家族从 ratio 换成回归——有趣的是 DPO 系在 IPO 这里短暂回归 MSE 家族

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [A General Theoretical Paradigm to Understand Learning from Human Preferences](/ai-fa/explore/10-Papers/04-强化学习与对齐/A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）) | 提出 Ψ-PO 框架与 IPO |

## 5. 数学概念分解

- [KL散度](/ai-fa/explore/40-Concepts/KL散度)：目标值的推导
- [期望](/ai-fa/explore/40-Concepts/期望)：数据期望
- [范数](/ai-fa/explore/40-Concepts/范数)：平方损失

## 6. 自测

1. $$\beta = 0.5$$：IPO 的回归目标？（$$\frac{1}{2\beta} = 1$$——差恰好 1 即达标）
2. 差 $$=1$$ 时 IPO 与 DPO 的损失各多少？（$$0$$（停车）/ $$0.313$$（继续追））
3. 目标值的出处？（RLHF 闭式解 + BT 似然推出最优偏好差 $$= \frac{1}{2\beta}$$——KL 预算的换算）
4. DPO 的病与 IPO 的药？（sigmoid 渐近零永不达零→无底线追分；平方回归达标即停）

## 7. 与其他公式的关系

- → **修正** [DPO损失](/ai-fa/explore/30-Formulas/DPO损失) 的过优化病态
- 同族：[SimPO损失](/ai-fa/explore/30-Formulas/SimPO损失)（另一方向的简化：去参考）、[KTO损失](/ai-fa/explore/30-Formulas/KTO损失)（换理论基础）
- ⊂ **同属** RLHF 闭式解家族（[RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标) §2 闭式解的三个后裔）
