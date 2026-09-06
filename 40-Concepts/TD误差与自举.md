---
type: concept
aliases: [TD误差, 时序差分误差, TD Error, 自举, bootstrap, 自举项]
domain: 强化学习
tags: [concept]
---

# TD 误差与自举（bootstrap）

## 1. 定义（直觉 → 形式）

**TD 误差的直觉**："我原来以为这个局面值 $V(s)$；走了一步，拿到真奖励 $r$、看到下一局面我估它值 $V(s')$——按折扣拼起来是 $r+\gamma V(s')$。**这个新估价与旧估价之差**，就是我这一步学到的'惊讶'。"

$$\delta_t \;=\; \underbrace{r_t+\gamma V(s_{t+1})}_{\text{新证据：真奖励+一步后的估价}} \;-\; \underbrace{V(s_t)}_{\text{旧估价}}$$

- $\delta>0$：实际比预期好 → 抬高 $V(s_t)$；$\delta<0$：实际比预期差 → 压低。
- TD 学习=把 $\delta$ 回灌进价值网络（最小化 $\delta^2$）；**它不用等到回合结束**就能学（对比蒙特卡洛：等总分全出来才更新）。

**自举（bootstrap）的直觉**："**拿自己后续的估计，当作自己现在的训练目标**"。$r+\gamma V(s')$ 里那个 $V(s')$ 不是真值，是同一张网络（或目标网络）自己的估计——**用自己教自己**，像拽着自己的鞋带往上拉（英文 bootstrap 的原意）。

## 2. 三个成对概念（一张表理清）

| 对照 | 更新目标 | 偏差/方差 | 代表 |
|---|---|---|---|
| 蒙特卡洛（MC） | 真实完整回报 $G_t$ | 无偏/方差大（一局定音） | REINFORCE 的回报 |
| 纯 TD（自举） | $r+\gamma V(s')$ | 有偏（V 还不准）/方差小 | Q-learning、DQN |
| **λ-return（折中）** | $(1-\lambda)\sum_n\lambda^{n-1}G_t^{(n)}$ | 偏差方差之间可调 | [[40-Concepts/广义优势估计GAE]]：$\lambda=1$ 退化成 MC，$\lambda=0$ 退化成纯 TD |

## 3. 自举项在高层的三个化身

1. **价值学习里**：$V(s')$ 进目标——上面已讲。
2. **想象训练的"收尾"**：世界模型只演 H 步，尾部没演完的未来用一个 $V(s_H)$ 打包估价（Dreamer/DIAMOND 的 15 步梦+V 收尾）——这个打包价就是自举项。
3. **λ-return 递归里**：$\hat G^\lambda_t=r_t+\gamma\big[(1-\lambda)V(s_{t+1})+\lambda\hat G^\lambda_{t+1}\big]$ 中的 $(1-\lambda)V(s_{t+1})$ 支路=每层掺一点纯自举。

## 4. 易混点

- **TD 误差 ≠ 优势**：$\delta_t$ 是一步的惊讶；优势 $A_t$ 是"这一步比平均好多少"。TD(0) 下 $A_t\approx\delta_t$，一般情形两者不同（GAE 才是它们的正式桥梁）。
- **自举 ≠ 目标网络**：目标网络是**稳定**自举的工程件（给 $V(s')$ 换个慢更新的参照，防"追自己尾巴"发散，DQN 首创）；自举本身是学习规则。
- **自举引入的偏**：目标依赖自己的估计→估计错则目标错（复合误差的来源之一）；这是价值学习所有"传播误差"分析的起点（误差沿 $\gamma$ 几何级数放大，界 $\tfrac{1-\gamma^H}{1-\gamma}$）。

## 5. 与库内实体的关系

- ← 地基：[[40-Concepts/价值函数（V与Q）]]（TD 误差作用其上）、[[40-Concepts/贝尔曼方程]]（$r+\gamma V(s')$ 即它的影子）
- → 用户：[[40-Concepts/广义优势估计GAE]]（λ 折中）、[[40-Concepts/TD误差与自举|自举]]出现在所有 Dreamer 系的"V 收尾"里
- 论文侧：[[10-Papers/04-强化学习与对齐/Playing Atari with Deep Reinforcement Learning（DQN）|DQN]]（自举+目标网络的稳定化范本）、[[10-Papers/04-强化学习与对齐/High-Dimensional Continuous Control Using Generalized Advantage Estimation（GAE）|GAE]]
