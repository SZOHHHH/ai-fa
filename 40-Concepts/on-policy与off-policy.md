---
type: concept
aliases: [on-policy, off-policy, 在线策略, 离线策略, replay buffer, 经验回放]
domain: 强化学习
tags: [concept]
---

# on/off-policy 与 replay buffer

## 1. 定义（直觉 → 形式）

**直觉**：问"**用谁的数据学**"——
- **on-policy**：只用**自己当前策略**刚刚跑出来的数据学（学完就扔，策略一变数据就"过期"）；
- **off-policy**：可以用**别人的/旧的/存着的**数据学（数据不必来自当前策略）。

**形式判据**：期望里的数据分布是谁的——

$$\text{on：}\;J(\pi_\theta)=\mathbb{E}_{s,a\sim\pi_\theta}\big[\cdot\big]\qquad\text{off：}\;J=\mathbb{E}_{s,a\sim\mu\,\text{（行为策略/回放池}）}\big[\cdot\big]\;\text{+ 重要性修正}$$

分布不一致时需要**重要性采样**修正：$\mathbb{E}_\mu\big[\tfrac{\pi(a\mid s)}{\mu(a\mid s)}f\big]=\mathbb{E}_\pi[f]$（见 [[40-Concepts/重要性采样]]）。

## 2. 两族对比

| | on-policy 家族 | off-policy 家族 |
|---|---|---|
| 代表 | REINFORCE、A3C、PPO（近 on：小步更新+裁剪） | Q-learning、DQN、SAC |
| 数据来源 | 当前策略现采现用 | 回放池/旧策略/别的策略 |
| 样本效率 | 低（数据用一次就过期） | 高（一条经验反复榨） |
| 稳定性 | 高（目标与数据同分布，策略梯度定理直接适用） | 低（要修正分布差；价值自举+旧数据易发散） |
| 代价 | 每步都要真交互 | 要目标网络/裁剪/双 Q 等稳定化件 |

**没有免费午餐**：样本效率与稳定性互为代价——PPO 靠"多新数据+小修正"求稳，DQN/SAC 靠"旧数据+工程件"求省。

## 3. replay buffer（经验回放池）

**是什么**：把 $(s,a,r,s')$ 转移存进大池子，训练时随机抽 minibatch。

**为什么有效**（DQN 的两件宝之一）：
1. **打破时间相关**：连续转移高度相关，独立同分布假设崩坏；随机抽样近似 i.i.d.；
2. **一鱼多吃**：一条经验被多次学习，样本效率翻倍；
3. **平滑分布**：池里混着新旧策略的数据，天然是个慢变的混合行为分布 $\mu$。

**代价/变体**：数据越旧越 off → 偏差↑（PER 优先级回放、frozen lake 的比例控制都是补丁）；连续控制里 SAC 用大池+双 Q 压住发散。

## 4. 在更高层的三个化身（概念迁移）

| 场景 | "on/off" 的对应物 |
|---|---|
| 蒸馏 | 开环蒸馏=off（只在固定数据分布上约束）；闭环条件化=把训练分布拉回"策略会到的分布"（on 化）——分布错配的失败与 DAgger 定理同构 |
| 模仿学习 | BC 是极端 off（完全不交互）；DAgger 把执行分布采进训练集 |
| 世界模型想象 | 梦里训练=用 WM 当"行为分布"造数据——梦分布与真环境分布的错配即"梦山≠真山"问题的分布侧根源 |

## 5. 易混点

- **on-policy ≠ 不用旧数据就是全部**：PPO 也存 rollout 池，但小批量内用完即弃+裁剪限制策略漂移——"近似 on"。
- **off-policy ≠ offline RL**：off-policy 仍在线交互（只是学习用旧数据）；offline RL 连交互都没有（纯固定数据集）。
- **目标网络的真正职责**：不是让数据变新，是让**自举目标**（$V(s')$）变慢——off-policy + 自举的双雷分开拆。

## 6. 与库内实体的关系

- ← 地基：[[40-Concepts/重要性采样]]（分布修正的数学）、[[40-Concepts/TD误差与自举]]（off 系的学习信号）
- → 用户：[[10-Papers/04-强化学习与对齐/Playing Atari with Deep Reinforcement Learning（DQN）|DQN]]（replay+目标网络开山）、[[10-Papers/04-强化学习与对齐/Asynchronous Methods for Deep Reinforcement Learning（A3C）|A3C]]（用并行去相关替代 replay 的 on 路线）、[[10-Papers/04-强化学习与对齐/Soft Actor-Critic- Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor（SAC）|SAC]]（off 家族集大成）、[[10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）|PPO]]（近 on 的裁剪路线）
