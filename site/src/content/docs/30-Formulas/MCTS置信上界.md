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

（$$P(s,a)$$=策略网络给的先验概率——**先验觉得有戏的方向，探索加成更大**；$$c\approx1.25$$ 起调。）

## 2. 表示对照表

| 公式 | 出处 | 探索项差异 |
|---|---|---|
| UCB1 | 多臂老虎机（Auer 2002） | $$\sqrt{2\log t/n_i}$$——单节点（没有树）的原型 |
| UCT | UCT 应用于树（Kocsis & Szepesvári 2006） | UCB1 逐节点套用到树上 |
| PUCT | AlphaGo/MuZero | 乘先验 $$P(s,a)$$，用网络先验**剪枝** |
| 软对照 | 采样式规划（Diffuser 系） | 不算置信上界、直接从后验采样——**乐观启发式 vs 分布采样**两种对付不确定性的哲学 |

## 教程：UCT 的模拟分配现场（+PUCT 对照）

**第 1 步：设定。** 根节点 $$s_1$$ 两动作（宇宙见 [贝尔曼最优方程](/ai-fa/explore/30-Formulas/贝尔曼最优方程)）：真值 $$Q(a_{慢}) = 0.783,\ Q(a_{赢}) = 1.0$$——搜索时不知道，只有模拟均值。已模拟 10 次：$$n_{慢} = 8$$（均值 0.78）、$$n_{赢} = 2$$（均值 1.00），$$c = 1.41$$。

**第 2 步：算两个 UCT。** $$UCT(a_{慢}) = 0.78 + 1.41\sqrt{\ln 10/8} = 0.78+1.41\times0.537 = 1.54$$；$$UCT(a_{赢}) = 1.00 + 1.41\sqrt{\ln 10/2} = 1.00+1.41\times1.073 = 2.51$$——选 $$a_{赢}$$。**均值已并列，试得少的碾压**：探索项差 $$1.51-0.76 = 0.76$$，远超均值差 0.22。

**第 3 步：被选后再算（衰减现场）。** $$a_{赢}$$ 又被模拟一次（$$n=3$$）：$$UCT(a_{赢}) = 1.00+1.41\sqrt{\ln 10/3} = 1.00+1.41\times0.876 = 2.24$$——加成缩水但仍领先。分配将一直偏向 $$a_{赢}$$ 直到探索项差 < 均值差——**自动从"探索"过渡到"利用"**。

**第 4 步：反直觉情形。** 若前 8 次 $$a_{慢}$$ 运气好均值涨到 0.90：$$UCT(a_{慢}) = 0.90+0.76 = 1.66 < 2.51$$——**均值更高的动作仍输给没试够的**：0.14 的均值差被 0.76 的不确定性补偿淹没。乐观原则：不确定本身就是探索燃料。

**第 5 步：PUCT（先验加权）。** 策略网络给先验 $$P(a_{赢}) = 0.7$$：$$PUCT(a_{赢}) = 1.0 + 1.25\times0.7\times\frac{\sqrt{10}}{1+2} = 1.0+0.92 = 1.92$$；$$PUCT(a_{慢}) = 0.78 + 1.25\times0.3\times\frac{\sqrt{10}}{1+8} = 0.78+0.13 = 0.91$$——先验把预算进一步导向"网络觉得有戏"的方向（AlphaGo/MuZero 用它剪掉没前途的分支）。

## 3. 直觉解释

- **一句话**：**"分数没拉开时，优先试吃得少的菜"**——选择项=经验平均（利用）+ 访问次数反比的开方加成（探索）。访问次数悬殊时开方项抬头，把搜索预算推向没试过的分支。
- **为什么是开方**：尝试 $$n$$ 次后均值的不确定度按 $$1/\sqrt{n}$$ 收缩（中心极限）——探索项恰好补偿"还剩多少不确定"；分子 $$\log N$$ 保证**总访问数涨了，每个动作也至少被间或重访**（证明后悔值次线性的关键）。
- **为什么叫"置信上界"**：乐观原则（optimism in the face of uncertainty）——把每个动作的"潜力上界"当真实值来选：被低估的好动作会因上界高被反复试，试多了均值修正、上界回落，自动收敛。**不确定性本身成了探索的燃料**。
- **数值例**：某节点两动作，A 平均 0.7 已试 100 次，B 平均 0.6 已试 10 次，父节点 111 次：$$U_A=0.7+c\sqrt{\log 111/100}\approx0.7+0.11c$$；$$U_B=0.6+c\sqrt{\log 111/10}\approx0.6+0.51c$$——$$c\ge0.25$$ 时 B 反超被优先探索。
- **在 MuZero 里它就是"规划"本体**：策略/价值头给 $$P$$ 和叶节点价值，PUCT 沿树分配模拟次数，根节点访问分布成为改进后的策略——**学习（网络）+ 搜索（本公式）两件套**。

## 4. 出处

| 论文 | 用法 |
|---|---|
| Kocsis & Szepesvári 2006（UCT） | 树上套 UCB |
| AlphaGo（2016）/ AlphaZero | PUCT + 神经网络先验 |
| [MuZero 2019](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）) | 学到的 $$P,V$$ 头 + PUCT（不必学忠实环境） |
| [MCTS 置信上界](/ai-fa/explore/30-Formulas/MCTS置信上界) 与 [TD-MPC2](/ai-fa/explore/10-Papers/09-世界模型与JEPA/TD-MPC2- Scalable, Robust World Models for Continuous Control（TD-MPC2）) | 射击轨迹规划里同类"利用+探索"打分 |

## 5. 数学概念分解

- [期望](/ai-fa/explore/40-Concepts/期望)：$$Q(s,a)$$ 是模拟回报的样本均值
- [概率分布](/ai-fa/explore/40-Concepts/概率分布)：根节点访问分布被当作策略使用
- [贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程)：叶节点价值=价值头对 $$V$$ 的一步估计（树内是它的逐层展开）
- [马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)：树=MDP 的前向展开

## 6. 自测

1. $$N=10,\ n=2,\ \hat Q=1.0,\ c=1.41$$：探索加成与 UCT？（$$1.41\sqrt{\ln 10/2} = 1.51$$；UCT $$= 2.51$$）
2. 为什么探索项按 $$1/\sqrt{n}$$ 衰减？（$$n$$ 次后均值不确定度 $$\sim 1/\sqrt{n}$$（中心极限）——加成恰好补偿剩余不确定）
3. 均值 0.90（试 8 次）vs 均值 1.00（试 2 次），UCT 选谁？（后者——0.14 的均值差被不确定性差 0.76 淹没）
4. PUCT 比 UCT 多了什么？（先验 $$P(s,a)$$——网络看好的方向探索加成更大=用先验剪枝）

## 7. 与其他公式的关系

- → [MuZero](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model（MuZero）)：本公式是其"决策时刻规划"的心脏
- ↔ 对照 [Diffuser](/ai-fa/explore/10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）)：**搜索分配预算 vs 采样直接生成**——同在"利用模型做决策"，机制相反
- ↔ 对照 [后验采样与planning-as-inference](/ai-fa/explore/40-Concepts/后验采样与planning-as-inference)：置信上界=乐观点估计路线；后验采样=保留分布路线
