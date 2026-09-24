---
type: formula
aliases: [REINFORCE目标, 最简策略梯度, REINFORCE Objective]
domain: 数学基础
loss_type: expectation-of-ratio
tags: [concept]
---

# REINFORCE 目标（最简策略梯度）

> 本页按公式页标准写（虽归在概念区，因为是 RL 线公式的起点）。

## 1. 标准形式

$$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}\!\left[ \sum_t \nabla_\theta \log \pi_\theta(a_t \mid s_t)\, G_t \right]$$
或带基线版：
$$\nabla_\theta J(\theta) = \mathbb{E}\!\left[ \nabla_\theta \log \pi_\theta(a_t \mid s_t)\, (G_t - b(s_t)) \right]$$

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 轨迹回报版 | $$\nabla\log p(\tau) G(\tau)$$ | Williams 1992 | 原始 REINFORCE |
| 带基线版 | $$G_t - b(s_t)$$ | Williams 1992 | 方差缩减 |
| 优势版 | $$A_t$$（[贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程)） | Actor-Critic 谱系 | 现代默认 |

## 教程：一条轨迹的 REINFORCE 更新（方差现场）

**第 1 步：初始策略。** softmax logits $$z = (0,0)$$ → $$\pi = (0.5, 0.5)$$（宇宙见 [贝尔曼最优方程](/ai-fa/explore/30-Formulas/贝尔曼最优方程) 教程：$$Q^\pi(a_{慢}) = 0.818,\ Q^\pi(a_{赢}) = 1$$，$$V^\pi = 0.909$$）。

**第 2 步：抽到好轨迹。** $$\tau_1 = (s_1, a_{赢}, 1, s_2)$$，$$G = 1$$。样本梯度：$$\nabla_{z_{赢}} \hat J = G\times(1-\pi_{赢}) = 1\times0.5 = +0.5$$。lr $$= 0.1$$：$$z_{赢} \mathrel{+}= 0.05$$ → $$\pi(a_{赢}) = \sigma(0.1) = 0.525$$ ✓ 赢的概率被抬高。

**第 3 步：抽到慢轨迹（问题浮现）。** $$\tau_2 = (s_1, a_{慢}, 0, s_1, a_{赢}, 1, s_2)$$：$$G_0 = 0 + 0.9\times1 = 0.9$$。它对 $$z_{慢}$$ 的贡献 $$= 0.9\times(1-\pi_{慢}) = +0.45$$——**正回报把"慢"的概率也抬高了**！慢明明是较差动作（0.818 < 1），只因绝对回报为正就被奖励——符号语义错位，这是 REINFORCE 低效的第一根源。

**第 4 步：基线修正。** 换 $$G - b$$，$$b = V^\pi = 0.909$$：$$\tau_1$$ 贡献 $$(1-0.909)\times0.5 = +0.045$$；$$\tau_2$$ 对 $$z_{慢}$$ 贡献 $$(0.9-0.909)\times0.5 = -0.005$$——**符号立即归位**（比平均好的抬、差的压）。基线不改变期望（$$\mathbb{E}[b\nabla\log\pi] = b\nabla\sum_a\pi = 0$$），只砍方差。

**第 5 步：方差账单。** 无基线时样本贡献在 $$+0.5$$ 与 $$+0.45$$ 间（对 $$z$$ 的两个分量还有负侧）大幅摆动；有基线后摆动 $$\pm0.05$$ 量级——**同一条演进线（baseline → critic → GAE → 信赖域 → 裁剪）都是为了这张方差账单**。

## 3. 直觉解释

- 每条轨迹结束后，按总回报"奖惩"全程每个动作的对数概率
- **为什么是 log**：$$\nabla p = p \nabla\log p$$（[RL中的log导数技巧](/ai-fa/explore/40-Concepts/RL中的log导数技巧)），采样被拆出梯度外
- **致命弱点**：单轨迹回报 $$G_t$$ 方差巨大——催生基线 → critic → GAE → 信赖域 → 裁剪整条演进线
- `#loss/expectation-of-ratio` 族（log-概率加权期望）

## 4. 出处

| 论文 | 贡献 |
|---|---|
| Williams, "Simple Statistical Gradient-Following Algorithms..."（1992） | 提出 |
| [Trust Region Policy Optimization](/ai-fa/explore/10-Papers/04-强化学习与对齐/Trust Region Policy Optimization（TRPO）) | 稳定化起点 |

## 5. 数学概念分解

[RL中的log导数技巧](/ai-fa/explore/40-Concepts/RL中的log导数技巧)、[马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)、[期望](/ai-fa/explore/40-Concepts/期望)

## 6. 自测

1. $$\pi=(0.5,0.5)$$、抽到 $$(a_{赢}, G{=}1)$$：$$\nabla_{z_{赢}}$$ 的样本估计？（$$1\times(1-0.5) = +0.5$$）
2. 轨迹 $$(慢,赢)$$ 的 $$G_0$$ 与它对 $$z_{慢}$$ 的无基线贡献？（$$G_0 = 0.9$$；$$+0.45$$——正绝对回报抬高慢概率，符号语义错位）
3. 基线为什么可以随便减？（$$\mathbb{E}[b\nabla\log\pi] = b\nabla\textstyle\sum_a\pi = 0$$——期望不变方差骤降）
4. REINFORCE→PPO 演进主线一句话？（一路压方差：baseline → critic → GAE → 信赖域 → 裁剪）

## 7. 与其他公式的关系

- → **演进为** [TRPO目标](/ai-fa/explore/30-Formulas/TRPO目标)（+信赖域）→ [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标)（+裁剪）
- → **另一支** [GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标)（+组内相对优势）
- 与 [策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理) 互为"实例/定理"
