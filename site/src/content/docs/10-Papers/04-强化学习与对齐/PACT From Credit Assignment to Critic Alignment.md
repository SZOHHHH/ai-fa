---
type: paper
title: "PACT: From Credit Assignment to Critic Alignment"
aliases: [PACT]
year: 2026
authors: [Jiayan Fu, Hang Xu, Yong Zhang, et al.]
venue: arXiv 2026
arxiv: "2609.26355v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [信用分配理论(唯一表示), actor-critic(对齐更新), LLM后训练]
tags: [paper]
---

# PACT

## 1. 一句话贡献

给 token 级信用分配找到唯一数学定义：三正则条件（完备性/前缀一致性/中性）下信用=**条件奖励预测的鞅差分** $$C_i = V_i - V_{i-1}$$；用这个唯一表示统一解释 OPD 教师=隐式 critic、RLOO 响应级基线梯度等价、GAE 中 critic 误差淹没真信用三类现象，并推出 Actor-then-Critic+重要性采样校正的 PACT 训练程序——数学推理四基准均值 72.87%，超 GRPO 8.80pt。

## 2. 核心贡献

- **唯一表示定理**：满足三条件的 token 信用存在且唯一，即鞅差分序列；三条件各自必要（去掉任一条都容许别的信用分配）。粗粒度（回合级）信用=token 信用按段聚合，现有方案全是特例
- **理论透镜看旧现象**：①理想教师（KL 正则奖励改进的最优分布）下的 OPD 更新在期望上正比于真信用诱导的策略梯度——教师就是隐式 critic；②RLOO 响应级基线虽粗，期望梯度与 token 级信用等价（但统计效率更差）；③有界结果奖励下信用近似稀疏（$$\mathbb{E}[\sum C_i^2] = \text{Var}(R) \le 1/4$$），GAE 里 $$\lambda<1$$ 的中段 critic 误差可以和真信用同量级——解释了 DeepSeek-R1 的 $$\lambda=1$$ 更好
- **PACT 训练程序**：Actor-then-Critic 更新顺序（先更新 actor、再用重要性采样校正训 critic 对齐**新**策略——消除 PPO 式"critic 永远落后一个策略版本"的滞后）+ critic 用 BCE 而非 MSE（$$R \in [0,1]$$ 归一后二分类视角）

## 3. 方法概要

1. 建模：轨迹=token 与环境观测交替的信息流 $$\mathcal{F}_i = \sigma(q, T_1, O_1, \ldots, T_i, O_i)$$，终局奖励 $$R = R(Y)$$；条件奖励预测 $$V_i = \mathbb{E}[R \mid \mathcal{F}_i]$$
2. 三条件锁定唯一信用：完备性（信用总和=奖励对初始预测的偏离）、前缀一致性（前缀信用只依赖前缀信息，未来实现不追改历史）、中性（下一 token 的期望信用为零）
3. 定理 1：$$C_i = V_i - V_{i-1}$$ 且为鞅差分序列
4. 用唯一表示分析 OPD（定理 2）、RLOO（定理 3）、GAE 误差结构（定理 4），得到"$$\lambda=1$$ + critic 必须对齐当前策略"两个设计结论
5. PACT：每轮先更新 actor → 对 critic 数据做重要性采样权重校正（把旧策略 rollout 换算到新策略分布）→ BCE 训 critic → 下一轮优势用新 critic

## 4. 核心公式

唯一信用表示：

`$$C_i = V_i - V_{i-1} = \mathbb{E}[R \mid \mathcal{F}_i] - \mathbb{E}[R \mid \mathcal{F}_{i-1}]$$`

**直觉**：一个 token 的信用=“看到这个 token（及其触发的一切）之后，你对最终奖励的预测涨/跌了多少"。完备性说涨跌总和恰好吐出 $$R$$ 相对先验的偏离；中性说事前看每次涨跌期望为零（不能靠挪信用作弊）；前缀一致性说历史的涨跌一经写入不许被未来改写——三条合起来，除鞅差分外别无选择。

信用稀疏与 GAE 误差分解：

`$$\mathbb{E}\!\left[\sum_{i=1}^{\tau} C_i^2 \,\middle|\, \mathcal{F}_0\right] = \text{Var}(R \mid \mathcal{F}_0) \le \tfrac{1}{4},\quad \hat A_t^{\lambda} = \sum_{i \ge t} \lambda^{i-t} C_i - \varepsilon_{t-1} + (1-\lambda) \sum_{i > t} \lambda^{i-t} \varepsilon_i$$`

**直觉**：奖励方差有界（$$R \in [0,1]$$ 时 $$\le 1/4$$）但 token 数无界，所以信用平方和摊到长序列上大多很小——真信号本来就细。而 critic 估计误差 $$\varepsilon_i$$ 通过 $$(1-\lambda)$$ 加权项全程留在优势里，与细小真信用同量级甚至更大；取 $$\lambda = 1$$ 时中段误差全消，只剩 $$\hat A_t^1 = R - \hat V_{t-1}$$——"宁可只用一个前缀误差，不要一串中段误差"。

## 5. 与前作/矩阵关系

- 信用/优势估计谱系：→ **统一解释** [GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标)（组内标准化）与 [REINFORCE目标](/ai-fa/explore/30-Formulas/REINFORCE目标) 的 RLOO 变体（响应级基线=梯度等价的粗粒度代理）；↔ [GRPO is Secretly a Process Reward Model](/ai-fa/explore/10-Papers/04-强化学习与对齐/GRPO is Secretly a Process Reward Model（GRPO-PRM）)（同在问"GRPO 的信号到底是什么"，一从过程奖励视角、一从唯一信用视角）
- → **修复** [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标) 的 actor-critic 滞后（critic 对齐旧策略）：重要性采样校正+更新顺序对调；理论根基接 [广义优势估计GAE](/ai-fa/explore/40-Concepts/广义优势估计GAE) 与 [TD误差与自举](/ai-fa/explore/40-Concepts/TD误差与自举)
- ↔ [CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning](/ai-fa/explore/10-Papers/04-强化学习与对齐/CausalOPD- First-Wrong-Step Supervision for Distilling Causal Chain Reasoning（CausalOPD）)：定理 2 给"OPD=隐式 critic"补上信用级证明，on-policy 蒸馏家族的理论底座
- ↔ [DeepSeek-R1 - Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）)：其 $$\lambda=1$$ 优于 $$0.95$$ 的经验观察在此获得误差结构解释
- 数学根基：[策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理) · [价值函数（V与Q）](/ai-fa/explore/40-Concepts/价值函数（V与Q）) · [重要性采样](/ai-fa/explore/40-Concepts/重要性采样) · [期望](/ai-fa/explore/40-Concepts/期望)（条件期望/鞅差分）

## 6. 影响后续

- "token 级信用"从算法各自为政的操作性定义变成有唯一性定理的对象——后续 LLM RL 的分析文有了公共坐标（谁是真信心的近似、谁只是梯度等价的代理）
- Actor-then-Critic+IS 校正是即插即用的训练框架改造，不换算法只换更新顺序与权重
- 信用稀注定理提示：长序列上"细分信用"的估计误差下限由 $$\text{Var}(R)$$ 锁死，比信用本身还细的估计是白费——为粗粒度基线的持续存在提供合法性

## 7. 读前须知

[期望](/ai-fa/explore/40-Concepts/期望)（条件期望与 $$\sigma$$-代数filtration——全部定理的语言）· 鞅与鞅差分序列（期望为零的增量序列，建议先看Doob分解直觉）· [广义优势估计GAE](/ai-fa/explore/40-Concepts/广义优势估计GAE)（$$\lambda$$ 加权 TD 残差的原始形式）· [重要性采样](/ai-fa/explore/40-Concepts/重要性采样)（分布换算的方差代价）· [GRPO目标](/ai-fa/explore/30-Formulas/GRPO目标)（本文所解释的算法现状）。
