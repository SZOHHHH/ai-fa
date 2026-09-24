---
type: formula
formula_id: GRPO-OBJ
aliases: [GRPO目标, Group Relative Policy Optimization, 组相对策略优化]
domain: 强化学习与对齐
loss_type: expectation-of-ratio
tags: [formula]
---

# GRPO 目标

## 1. 标准形式

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{x \sim \mathcal{D},\ \{y_i\}_{i=1}^G \sim \pi_{\text{old}}(\cdot\mid x)}\!\left[ \frac{1}{G}\sum_{i=1}^{G} \frac{1}{|y_i|}\sum_{t=1}^{|y_i|} \min\!\left( \rho_{i,t}(\theta)\, \hat{A}_{i,t},\ \text{clip}(\rho_{i,t}, 1-\epsilon, 1+\epsilon)\,\hat{A}_{i,t} \right) - \beta\, D_{\mathrm{KL}}(\pi_\theta \| \pi_{\text{ref}}) \right]$$

其中**组内相对优势**（GRPO 的灵魂）：
$$\hat{A}_{i,t} = \hat{A}_i = \frac{r_i - \mathrm{mean}(\{r_1, \dots, r_G\})}{\mathrm{std}(\{r_1, \dots, r_G\})}$$

- $$G$$：同一 prompt 采样的回答数（组，典型 4–64）
- $$r_i$$：每个回答的奖励（规则打分/奖励模型）
- **同一回答内所有 token 共享该回答的优势**（无 per-token credit）

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 组相对版（本库标准） | 如上 | DeepSeekMath 2024 | 原始 |
| KL 估计式 | $$D_{KL}$$ 用无偏低方差估计 $$\frac{\pi_{\text{ref}}}{\pi_\theta} - \log\frac{\pi_{\text{ref}}}{\pi_\theta} - 1$$ | 同上 | k3 估计器 |
| Dr. GRPO | 去掉 std 归一化与长度项修正（偏置修复） | Liu et al. 2025 | 消除长度/难度偏置 |
| R1 版 | 规则奖励（答案对错 + 格式分）替代奖励模型 | DeepSeek-R1 2025 | RLVR 范式 |

## 教程：一组四个回答的标准化现场（+退化病）

**第 1 步：采一组。** 同一 prompt 采 $$G = 4$$ 个回答，规则奖励（答案对错）：$$r = (1,\ 1,\ 0,\ 0)$$。

**第 2 步：组内标准化。** $$\mathrm{mean} = 0.5$$、$$\mathrm{std} = 0.5$$ → $$\hat A = \frac{r - 0.5}{0.5} = (+1,\ +1,\ -1,\ -1)$$——**0/1 奖励被标准化成 ±1**：对的全体 +1、错的全体 −1，**同一回答内所有 token 共享**（无 per-token credit：第 3 个 token 错了和第 30 个 token 错了同罪）。

**第 3 步：为什么这就是优势。** 批 5 的 [贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程) 教程验证过 $$\mathbb{E}_\pi[A] = 0$$——组内标准化天然满足"均值为零"；它等价于蒙特卡洛基线（"同状态下多个回报的均值"当 $$V$$ 的估计，[TD误差与自举](/ai-fa/explore/40-Concepts/TD误差与自举) §对照表的 MC 行）——**critic 网络被四次采样替代**，这就是"去 critic"的全部含义。

**第 4 步：其余部件照抄。** 组内每个 token 走 PPO 裁剪（$$\rho_{i,t}$$ 的四象限见 [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标) 教程）+ KL 锚住 $$\pi_{\mathrm{ref}}$$——**GRPO = PPO 裁剪 + KL 锚 + 组内优势**，三处改动一个不剩。

**第 5 步：退化病。** 若 $$r = (1,1,1,1)$$（全对）：$$\mathrm{std} = 0$$、$$\hat A$$ 全零——**梯度消失**（全错同理）。稀疏奖励下简单题全对、难题全错都是死组；代价面：每个 prompt 要生成 $$G$$ 份回答（推理成本 ×G）。Video-HopChain 的 CGE（零方差组重采）与 Dr. GRPO（去 std 修偏置）都是这个病与它的邻域的修法。

## 3. 直觉解释

- **去 critic**：PPO 需要 $$V_\phi$$ 网络算优势 → 显存翻倍、训练抖。GRPO：**同一题让模型做 G 遍，组内标准化**当优势——"比同组平均好就是正优势"
- **为什么组内基线合法**：蒙特卡洛基线（同状态多个回报取均值）的无偏替代——正是 [贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程) 误区区说的"组均值 = V 的蒙特卡洛替身"
- **数学可读性**：整个目标 = PPO 裁剪项 + KL 锚 + 换掉的优势估计器——**三处改动，一个不剩**
- **代价**：每个 prompt 要生成 G 个样本（推理成本 ×G）；稀疏奖励下组内全对/全错时优势全零（梯度消失）——[Video-HopChain](/ai-fa/explore/10-Papers/04-强化学习与对齐/Video-HopChain Multi-Hop Questions and Confidence-Gated Exploration for Video Reasoning Models) 的 CGE 专修此病（零方差组屏蔽最自信 token 重采制造组内对照）
- `#loss/expectation-of-ratio`

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [DeepSeekMath - Pushing the Limits of Mathematical Reasoning in Open Language Models](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）) | 提出 GRPO |
| [DeepSeek-R1 - Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）) | GRPO + 规则奖励训练推理（规模化证明） |
| [Proximal Policy Optimization Algorithms](/ai-fa/explore/10-Papers/04-强化学习与对齐/Proximal Policy Optimization Algorithms（PPO）) | 裁剪目标来源 |

## 5. 数学概念分解

- [重要性采样](/ai-fa/explore/40-Concepts/重要性采样)：比率 $$\rho_{i,t}$$
- [期望](/ai-fa/explore/40-Concepts/期望)：组内均值与批均值
- [KL散度](/ai-fa/explore/40-Concepts/KL散度)：参考锚
- [贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程)：优势概念的出处（组均值是 V 的替身）

## 6. 自测

1. 组 $$r = (1,1,0,0)$$：$$\hat A$$？（mean 0.5、std 0.5 → $$(+1,+1,-1,-1)$$，组内共享）
2. 组内均值为什么合法当优势？（MC 基线——同状态多回报均值是 $$V$$ 的无偏估计；且天然满足 $$\mathbb{E}[A] = 0$$）
3. $$r = (1,1,1,1)$$ 会怎样？（std = 0 → 优势全零 → 梯度消失（死组）——CGE/Dr. GRPO 修此邻域）
4. GRPO 相对 PPO 的三处改动？（去 critic（组内标准化替优势）+ 保留裁剪 + KL 锚——就这三处）

## 7. 与其他公式的关系

- → **简化自** [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标)（裁剪保留）+ [RLHF目标](/ai-fa/explore/30-Formulas/RLHF目标)（KL 锚保留），仅换优势估计
- 对比 [DPO损失](/ai-fa/explore/30-Formulas/DPO损失)：在线采样组对比 vs 离线成对对比
- → **服务于** R1 的纯 RL 训练路线（[DeepSeek-R1 - Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](/ai-fa/explore/10-Papers/04-强化学习与对齐/DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）)，与线 7 交叉）
- → **被修正**：Dr. GRPO（长度偏置）——"每个后面的算法优化前面"的最新一环
- → **被解释**：[PACT](/ai-fa/explore/10-Papers/04-强化学习与对齐/PACT From Credit Assignment to Critic Alignment) 唯一表示定理——token 级信用=条件奖励预测的鞅差分，响应级基线（组均值一族）与真信用期望梯度等价、只是统计效率更粗，给"组内标准化为何合法"补了信用级证明
