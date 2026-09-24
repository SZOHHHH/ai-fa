---
type: concept
aliases: [过程奖励模型, PRM, Outcome Reward Model, ORM, 结果奖励, 验证器]
domain: 推理
tags: [concept]
---

# 过程奖励 vs 结果奖励（PRM/ORM）

## 1. 定义（直觉 → 形式）

**直觉**：检查数学作业两种方式——只看最后答案对不对（**结果奖励 ORM**）vs 每一步都批改（**过程奖励 PRM**）。ORM 便宜但粗糙（蒙对也算对）；PRM 精确但贵（每步要人工标注）。

**形式**：
- **ORM**：$r(y) = \mathbb{I}[\text{最终答案正确}]$（或学习型打分）——[[30-Formulas/GRPO目标]] 的 RLVR 默认
- **PRM**：$r(z_t \mid x, z_{<t})$——逐步骤打分（$z_t$ 为第 t 个推理步）
- PRM 引导的搜索：$p(\text{选路径}) \propto \prod_t \sigma(r(z_t))$（best-of-N 加权）或束搜索剪枝

## 2. 数学形式

- **PRM 训练的标注困境**：逐步人工标注极贵 → "Let's Verify"用**蒙特卡洛估计**：给每步自动采样后继，用最终正确率当该步的价值——$V(z_t) \approx \hat P(\text{最终对} \mid z_{\le t})$
- **PRM800K 数据集**：80 万步级标注——OpenAI 的重投入
- **PRM vs ORM 实证**（Let's Verify）：best-of-N 搜索下 PRM 一致优于 ORM（MATH +11.6%）
- **与 RL 的关系**：PRM 也可当 RL 的密集奖励（每步 reward）——R1 选择了规则 ORM（答案对错）+ 自发长链，PRM 路线在 OpenAI o1 系（推断）

## 教程：蒙特卡洛估计一条推理链的逐步价值

**第 1 步：设定。** 数学题的推理链四步 $z_1 \to z_2 \to z_3 \to z_4$（$z_4$ 出答案）。没有人工逐步标注——用蒙特卡洛：在每个中间点接续采样 100 次，数最终答案的正确次数。

**第 2 步：采样结果。** $z_1$ 后：62/100 对 → $\hat V(z_1) = 0.62$；$z_2$ 后：45/100 → $0.45$；$z_3$ 后：80/100 → $0.80$；$z_4$：答案已出，$1.0$（对）或 $0$（错）。

**第 3 步：读逐步价值序列。** $(0.62,\ 0.45,\ 0.80,\ 1.0)$——**$z_2$ 是险步**：走到这里成功率反而从 0.62 掉到 0.45（这步把链带偏了但还有救）。每步的增量价值 $A(z_t) = V(z_t) - V(z_{t-1}) = (-0.17,\ +0.35,\ +0.20)$：第一步后是坏步、二三步是好步——**PRM 就是推理链的 critic**（[[40-Concepts/贝尔曼方程]] 的 $V$ 与优势在推理树上的化身）。

**第 4 步：ORM 对照。** 结果奖励只看到 $\hat V(z_4) = 1$（对）——中间三步全盲：哪步功劳大、哪步是隐患，一无所知。信息量对比：PRM 一条链给出 4 个数 + 3 个增量，ORM 给 1 个 bit。

**第 5 步：best-of-N 用法。** 三条候选链的 PRM 末步价值 $(0.62,\ 0.45,\ 0.80)$ → 选第 3 条；ORM 则要三条都跑完看答案——**PRM 可以中途剪枝**（束搜索按 $\prod_t\sigma(r(z_t))$ 加权），这是 Let's Verify 里 best-of-N 一致优于 ORM（MATH +11.6%）的机制来源。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/07-推理模型/Let's Verify Step by Step（PRM）]] | PRM 系统验证 |
| [[30-Formulas/GRPO目标]] | R1 的 ORM+规则路线对照 |
| best-of-N 采样 | PRM 当 reranker |
| o1（2024） | 推测采用 PRM 类密集信号（未公开） |

## 4. 常见误区

- **误区**：PRM 一定更好——PRM 本身会错（reward hacking 的面更大：每步都可被钻空子）；ORM 简单鲁棒
- **误区**：PRM 就是分步 ORM——蒙特卡洛估计的 $V(z_t)$ 是"该步后验成功率"，信息量大于单步对错
- **误区**：过程奖励=可解释——分数高不代表推理"合理"，只是与最终正确相关

## 5. 自测

1. $V$ 序列 $(0.62, 0.45, 0.80, 1.0)$：哪步是险步？（$z_1\to z_2$：增量 $-0.17$——成功率掉 17 个点的坏步）
2. 蒙特卡洛估计 $V(z_t)$ 怎么做？（中间点接续采样 N 次、数最终正确率——$\hat P(\text{最终对}\mid z_{\le t})$）
3. PRM 比 ORM 多给什么？（每步成功率 + 增量价值（3 个数 vs 1 bit）——可中途剪枝）
4. PRM 的代价面？（逐步标注贵（MC 估计省人工但费算力）；每步可被钻空子——reward hacking 面更大）

## 6. 相关概念

- [[40-Concepts/贝尔曼方程]]：$V(z_t)$ 即中间状态的价值函数——PRM 是"推理的 critic"
- [[40-Concepts/思维链（CoT）]]：作用对象
- [[10-Papers/04-强化学习与对齐/The Imitation Game When LLMs Learn to Reason Like Programs via Code-Centric Reasoning Data Synthesis]]（MIMIC 的 Code-Instrumented Reward：代码插桩的中间执行状态=免费过程监督，免外部 PRM 的另一路径，260916 挂）
- [[30-Formulas/GRPO目标]]：另一条路线
