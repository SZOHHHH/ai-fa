---
type: concept
aliases: [价值函数, 状态价值函数, 动作价值函数, Q函数, Value Function]
domain: 强化学习
tags: [concept]
---

# 价值函数（V 与 Q）

## 1. 定义（直觉 → 形式）

**直觉**：给"一个局面"估价，有两种问法——
- **V（还没决定怎么走）**："从这个局面出发，按我现有的打法一路走下去，平均能拿多少分？"
- **Q（已经决定走某一步）**："从这个局面出发，**先走这一步**、再按现有打法走下去，平均能拿多少分？"

V 是"局面的价"，Q 是"局面里某一步的价"。两者差的就是那一步的选择权。

**形式**（策略 $\pi$ 下、折扣回报 $G_t=\sum_k\gamma^k r_{t+k}$）：

$$V^\pi(s)=\mathbb{E}_\pi[G_t\mid s_t=s],\qquad Q^\pi(s,a)=\mathbb{E}_\pi[G_t\mid s_t=s,\,a_t=a]$$

**两者互推**（对策略取平均 / 对平均求最优）：

$$V^\pi(s)=\sum_a\pi(a\mid s)\,Q^\pi(s,a),\qquad Q^\pi(s,a)=r(s,a)+\gamma\,\mathbb{E}_{s'}\big[V^\pi(s')\big]$$

## 2. 谁在用它们

| 用法 | 用哪个 | 代表 |
|---|---|---|
| 选动作（贪心） | $\arg\max_a Q(s,a)$——Q 直接给每步的价 | Q-learning/DQN 系 |
| 评价+引导策略 | $V$ 当 baseline 减方差 | actor-critic 系（critic=V） |
| 策略梯度里的优势 | $A(s,a)=Q(s,a)-V(s)$（这一步比平均好多少） | [[40-Concepts/广义优势估计GAE]] |
| 世界模型想象训练 | V 收尾（H 步后没演完的尾部用 $V(s_H)$ 打包估价） | Dreamer/DIAMOND 系 |

## 3. 易混点

- **V vs Q**：V 不指定动作，Q 指定第一步动作；离散小动作集可由 V 逐动作展开成 Q，连续/大动作集则必须直接学 Q 或用采样。
- **最优 vs 当前策略**：$V^*$、$Q^*$ 是"打法换到最优"后的价（[[40-Concepts/贝尔曼方程]] 的最优形式）；学习中的 critic 估的是当前 $\pi$ 的价——训练中两者不等，收敛后才趋同。
- **"价值"与"奖励"**：奖励是一步的即得分；价值是"从今往后的期望总分"——向前看多远（$\gamma$ 几何折算）是它与奖励的本质区别。
- **critic 就是价值函数的网络化身**：critic 出标量=V 版；出每个动作一个值=Q 版（DQN 式）。

## 4. 与库内实体的关系

- ← 数学地基：[[40-Concepts/马尔可夫决策过程]]（价值定义在 MDP 上）、[[40-Concepts/贝尔曼方程]]（价值的递归分解）、[[40-Concepts/期望]]（定义即条件期望）
- → 消费者：[[40-Concepts/策略梯度定理]]（V 作 baseline）、[[40-Concepts/TD误差与自举]]（学习它的误差信号）、[[40-Concepts/广义优势估计GAE]]（V 与 Q 之差的平滑版）
- 论文侧：[[10-Papers/04-强化学习与对齐/Playing Atari with Deep Reinforcement Learning（DQN）|DQN]]（从像素直接学 Q）；世界模型系（Dreamer/DIAMOND）的 critic 头=V
