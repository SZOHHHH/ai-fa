---
type: formula
formula_id: MCTS-UCT
aliases: [MCTS置信上界, UCT, UCB树选择, PUCT]
domain: 树搜索与规划
tags: [formula]
---

# MCTS 置信上界（UCT / PUCT）

## 1. 标准形式

$$a^{*}\;=\;\arg\max_{a}\Big[\underbrace{Q(s,a)}_{\text{利用：平均分}}\;+\;\underbrace{c\,\sqrt{\tfrac{\log N(s)}{N(s,a)}}}_{\text{探索：没试够的加成}}\Big]\qquad(\text{UCT})$$

MuZero/AlphaGo 实际用的**先验加权版（PUCT）**：

$$a^{*}\;=\;\arg\max_{a}\Big[Q(s,a)\;+\;c\,P(s,a)\,\frac{\sqrt{N(s)}}{1+N(s,a)}\Big]$$

（$P(s,a)$=策略网络给的先验概率——**先验觉得有戏的方向，探索加成更大**；$c\approx1.25$ 起调。）

## 2. 表示对照表

| 公式 | 出处 | 探索项差异 |
|---|---|---|
| UCB1 | 多臂老虎机（Auer 2002） | $\sqrt{2\log t/n_i}$——单节点（没有树）的原型 |
| UCT | UCT 应用于树（Kocsis & Szepesvári 2006） | UCB1 逐节点套用到树上 |
| PUCT | AlphaGo/MuZero | 乘先验 $P(s,a)$，用网络先验**剪枝** |
| 软对照 | 采样式规划（Diffuser 系） | 不算置信上界、直接从后验采样——**乐观启发式 vs 分布采样**两种对付不确定性的哲学 |

## 3. 直觉解释

- **一句话**：**"分数没拉开时，优先试吃得少的菜"**——选择项=经验平均（利用）+ 访问次数反比的开方加成（探索）。访问次数悬殊时开方项抬头，把搜索预算推向没试过的分支。
- **为什么是开方**：尝试 $n$ 次后均值的不确定度按 $1/\sqrt{n}$ 收缩（中心极限）——探索项恰好补偿"还剩多少不确定"；分子 $\log N$ 保证**总访问数涨了，每个动作也至少被间或重访**（证明后悔值次线性的关键）。
- **为什么叫"置信上界"**：乐观原则（optimism in the face of uncertainty）——把每个动作的"潜力上界"当真实值来选：被低估的好动作会因上界高被反复试，试多了均值修正、上界回落，自动收敛。**不确定性本身成了探索的燃料**。
- **数值例**：某节点两动作，A 平均 0.7 已试 100 次，B 平均 0.6 已试 10 次，父节点 111 次：$U_A=0.7+c\sqrt{\log 111/100}\approx0.7+0.11c$；$U_B=0.6+c\sqrt{\log 111/10}\approx0.6+0.51c$——$c\ge0.25$ 时 B 反超被优先探索。
- **在 MuZero 里它就是"规划"本体**：策略/价值头给 $P$ 和叶节点价值，PUCT 沿树分配模拟次数，根节点访问分布成为改进后的策略——**学习（网络）+ 搜索（本公式）两件套**。

## 4. 出处

| 论文 | 用法 |
|---|---|
| Kocsis & Szepesvári 2006（UCT） | 树上套 UCB |
| AlphaGo（2016）/ AlphaZero | PUCT + 神经网络先验 |
| [[10-Papers/09-世界模型与JEPA/Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）|MuZero 2019]] | 学到的 $P,V$ 头 + PUCT（不必学忠实环境） |
| [[30-Formulas/MCTS置信上界|MCTS 置信上界]] 与 [[10-Papers/09-世界模型与JEPA/TD-MPC2- Scalable, Robust World Models for Continuous Control（TD-MPC2）|TD-MPC2]] | 射击轨迹规划里同类"利用+探索"打分 |

## 5. 数学概念分解

- [[40-Concepts/期望]]：$Q(s,a)$ 是模拟回报的样本均值
- [[40-Concepts/概率分布]]：根节点访问分布被当作策略使用
- [[40-Concepts/贝尔曼方程]]：叶节点价值=价值头对 $V$ 的一步估计（树内是它的逐层展开）
- [[40-Concepts/马尔可夫决策过程]]：树=MDP 的前向展开

## 6. 与其他公式的关系

- → [[10-Papers/09-世界模型与JEPA/Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）|MuZero]]：本公式是其"决策时刻规划"的心脏
- ↔ 对照 [[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]]：**搜索分配预算 vs 采样直接生成**——同在"利用模型做决策"，机制相反
- ↔ 对照 [[40-Concepts/后验采样与planning-as-inference]]：置信上界=乐观点估计路线；后验采样=保留分布路线
