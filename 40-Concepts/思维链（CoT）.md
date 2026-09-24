---
type: concept
aliases: [思维链, Chain-of-Thought, CoT, 推理链]
domain: 推理
tags: [concept]
---

# 思维链 CoT

## 1. 定义（直觉 → 形式）

**直觉**：问模型"答案是什么"常答错；问它"一步一步想，把过程写出来"正确率大涨——**生成的中间 token 是免费的计算**。像做数学题打草稿：草稿不是答案，但没有草稿做不对。

**形式**：自回归分解的视角（Wei et al. 2022 的核心洞察）：
$$p(y \mid x) = \frac{p(y, z \mid x)}{p(z \mid x, y)} \le p(y, z \mid x)$$
（$z$ = 中间推理步）——**先给 $z$ 再给 $y$ 的联合概率 ≥ 直接给 $y$**。且 CoT 把推理"外化"成序列计算：Transformer 单层是固定深度电路，但生成 $k$ 个推理 token = 展开成 $k$ 层深度的计算图。

## 2. 数学形式

- **计算深度论证**：常数深度的 Transformer 表达能力有限（电路复杂度类 TC⁰）；CoT 步数 $t$ 使可表达问题类随 $t$ 扩展（如迭代算法、组合问题）——"时间换深度"
- **涌现性**：CoT 增益随模型规模阶跃（小模型 CoT 反而降分）——[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 规模叙事的延续
- **测试时计算**（2024–25 主线）：答案质量随"思考预算"（采样条数/步长）提升——o1/R1/s1 的经济学

## 教程：一道乘法的两种算法（时间换深度现场）

**第 1 步：直答模式。** 问"34 × 17 =？"直接答——模型须在**一次前向**（固定深度电路）里完成全部进位乘法：常数深度电路连多个任意位数的数相加都做不到（复杂度类 TC⁰ 的限制）——长算式直答必错不是"不认真"，是**架构级算力不够**。

**第 2 步：CoT 模式。** 生成中间 token：`34×17 = 34×10 + 34×7 = 340 + 238 = 578`——三个中间步 = **把计算展开成 3 次前向**（每步只用电路做一小段加/乘）。生成 $k$ 个推理 token = $k$ 层深度的计算图：**深度不够，时间来凑**。

**第 3 步：中间 token 的身份。** 它们是**草稿**：不进最终答案、但把"不可一步解"拆成"每步可解"——且草稿写进上下文后，后续步**能看见**（自回归的免费记忆）。

**第 4 步：涌现阈值。** 小模型用 CoT 反而降分（草稿自己都写不对）；规模过阈值后增益阶跃——"会打草稿"是涌现能力（[[10-Papers/01-架构演进/Language Models are Few-Shot Learners（GPT-3）]] 规模叙事的延续）。

**第 5 步：测试时计算的经济学。** 同一模型：直答 = 1 NFE 级；CoT 长链 = 数百 token；Self-Consistency 采 40 条投票 = 40 倍预算——**答案质量随思考预算上升**（o1/R1 时代把"买多少思考"变成显式旋钮，[[30-Formulas/GRPO目标]] 的 RL 塑形训练让模型自己学会分配草稿）。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [[10-Papers/07-推理模型/Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）]] | 提出（few-shot CoT） |
| [[10-Papers/07-推理模型/Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）]] | 多数投票增强 |
| [[10-Papers/07-推理模型/Tree of Thoughts- Deliberate Problem Solving with Large Language Models（ToT）]] | 链 → 树（搜索化） |
| [[10-Papers/07-推理模型/ReAct- Synergizing Reasoning and Acting in Language Models（ReAct）]] | 推理+行动交织 |
| R1/o1 | RL 训练自发长 CoT（见 [[10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）]]） |
| [[10-Papers/07-推理模型/Structural Process Supervision for Latent Chain-of-Thought Reasoning（PMPS）]] | 显式→潜压缩：原型过程监督 |
| [[10-Papers/07-推理模型/Think Wider - Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning（WIDER）]] | 潜推理的秩坍缩与谱正则 |
| [[10-Papers/07-推理模型/Answer-Distribution Trajectories - A Stochastic-Dynamics View of LLM Reasoning（ADT）]] | 推理过程的分布动力学读法 |

## 4. 常见误区

- **误区**：CoT 只是提示工程——它揭示的是**架构深度与生成长度的等价性**（理论意义远超 prompt）
- **误区**：中间步骤写出来=模型"真的在推理"——可解释性与忠实度是两个问题（CoT 忠实度研究是独立方向）
- **误区**：所有任务受益——简单任务 CoT 无益甚至有害（涌现阈值以下）

## 5. 自测

1. 34×17 直答为什么错？（常数深度电路算不动多位进位乘法——架构级算力不够，非态度问题）
2. CoT 怎么绕过限制？（中间 token 把计算展开成 k 次前向——时间换深度）
3. 草稿 token 的两个身份？（不进答案的中间产物 + 写进上下文供后续步看见（自回归免费记忆））
4. 测试时计算指什么？（答案质量随思考预算（链长/采样条数）上升——o1/R1 的经济学）

## 6. 相关概念

- [[40-Concepts/马尔可夫链]]：生成即逐步展开
- [[40-Concepts/期望]]：Self-Consistency 的边缘化视角
- [[30-Formulas/GRPO目标]]：R1 时代 CoT 被 RL 塑形

- → 后继补记（260916）：[[10-Papers/07-推理模型/Continuous Actions from Discrete Minds Latent-Aligned Planning for End-to-End Autonomous Driving|Continuous Actions from Discrete Minds]]（CoT 落地控制：离散推理到连续动作）

- → 后继补记（260916）：[[10-Papers/07-推理模型/Legibility is Not Interpretability Comparing Judged and Actual Importance in Chain-Of-Thought Reason|Legibility is Not Interpretability]]（CoT 语义审计：可读≠可解释）
- → 后继补记（260917）：[[10-Papers/03-后处理/Rollback the World, Keep the Reflection Rollback-Induced Reflection for Long-Horizon LLM Agents|RIR]]（反思记忆=CoT 的经验固化形态：回滚环境状态但保留从被弃轨迹蒸馏的结构化反思，指导后续决策）
