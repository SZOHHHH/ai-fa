---
type: concept
aliases: [广义优势估计, GAE, Generalized Advantage Estimation, TD误差]
domain: 数学基础
tags: [concept]
---

# 广义优势估计 GAE

## 1. 定义（直觉 → 形式）

**直觉**：估计"这个动作比平均好多少"有两条路——**蒙特卡洛**（等整条轨迹跑完看总回报：准但吵）vs **自举**（用 critic 的预测：稳但有偏）。GAE 用一个参数 $$\lambda$$ 在两者之间**连续滑动**，取各自长处。

**形式**：
$$\hat{A}_t^{\text{GAE}(\gamma, \lambda)} = \sum_{l=0}^{\infty} (\gamma\lambda)^l\, \delta_{t+l}$$
其中 TD 误差 $$\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)$$。

- $$\lambda = 0$$：$$\hat A_t = \delta_t$$（纯自举，一步 TD，低方差高偏差）
- $$\lambda = 1$$：$$\hat A_t = \sum \gamma^l r_{t+l} - V(s_t)$$（纯蒙特卡洛，无偏高方差）

## 2. 数学形式

- **推导本质**：优势估计的"n 步指数混合"——每个 n 步估计都是 $$\delta$$ 的和，$$\lambda$$ 控制权重衰减
- **偏差-方差权衡**：RL 最核心的 trade-off；GAE 是它最著名的"旋钮化"
- 实践值：$$\gamma \approx 0.99$$, $$\lambda \approx 0.95$$
- **LLM 对齐中的角色**：InstructGPT/PPO 的 $$\hat{A}_t$$ 几乎都用 GAE；GRPO 用组内中心化代替（无 critic 版本）

## 教程：一条轨迹的 δ 链与 λ 旋钮（符号翻转现场）

**第 1 步：设定与 δ 链。** 玩具宇宙（[马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)，$$\pi = (0.6,0.4)$$，$$V^\pi = 0.870$$）。轨迹 $$\tau = (慢, 赢)$$：$$\delta_0 = 0+0.9\times0.870-0.870 = -0.087$$；$$\delta_1 = 1+0.9\times0-0.870 = +0.130$$。

**第 2 步：λ=0（纯自举）。** $$\hat A_0 = \delta_0 = -0.087$$——只看一步：慢比平均差 8.7%，压。

**第 3 步：λ=1（纯蒙特卡洛）。** $$\hat A_0 = G_0 - V = 0.9-0.870 = +0.030$$——看全程：这条轨迹最终赢了，整条比平均好 3%，抬。**同一个动作、两种估计、符号相反**——这就是偏差-方差的实感：自举版依赖 critic 的 $$V$$（准了才对），MC 版一条轨迹定音（方差大）。

**第 4 步：λ=0.5（折中）。** $$\hat A_0 = \delta_0 + \gamma\lambda\,\delta_1 = -0.087+0.45\times0.130 = -0.028$$——远处的 δ 打 0.45 折再累加：轻微负（近处的证据权重更大）。

**第 5 步：读法。** $$\gamma\lambda$$ 是"每远一步的证据打几折"：$$\lambda$$ 小 → 只信近处（信 critic）→ 低方差高偏差；$$\lambda$$ 大 → 信到结尾（信数据）→ 高方差低偏差。实践 $$\gamma\approx0.99,\ \lambda\approx0.95$$：几乎全程看，但对最远处轻折——LLM 对齐（InstructGPT 起）的默认配置。

## 3. 为什么 AI 需要它

| 出现场景 | 用法 |
|---|---|
| [High-Dimensional Continuous Control Using Generalized Advantage Estimation](/ai-fa/explore/10-Papers/04-强化学习与对齐/High-Dimensional Continuous Control Using Generalized Advantage Estimation（GAE）) | 提出（ Schulman et al. 2015） |
| [PPO裁剪目标](/ai-fa/explore/30-Formulas/PPO裁剪目标) | 优势项的标准估计器 |
| [Training language models to follow instructions with human feedback](/ai-fa/explore/10-Papers/04-强化学习与对齐/Training language models to follow instructions with human feedback（InstructGPT）) | PPO+GAE 直接套用于 LLM |

## 4. 常见误区

- **误区**：$$\lambda$$ 是折扣——不是！$$\gamma$$ 管折扣，$$\lambda$$ 管估计器的混合比例，职责分离
- **误区**：GAE 消除偏差——只是**可调**偏差-方差，$$\lambda\in(0,1)$$ 时两者兼有
- **误区**：GAE 需要 critic 完美——critic 误差是偏差来源，$$\lambda$$ 小则更依赖 critic。[PACT](/ai-fa/explore/10-Papers/04-强化学习与对齐/PACT From Credit Assignment to Critic Alignment) 给出定量版：有界结果奖励下 token 信用近似稀疏（$$\mathbb{E}[\sum C_i^2] = \text{Var}(R) \le 1/4$$），$$\lambda<1$$ 的中段 critic 误差可与真信用同量级甚至更大；$$\lambda=1$$ 时中段误差全消、只剩前缀误差 $$\hat A_t^1 = R - \hat V_{t-1}$$——R1 的"$$\lambda=1$$ 更好"经验由此获解释

## 5. 自测

1. $$\delta_1 = 1+0.9\times0-0.870 = ?$$（$$+0.130 = A(a_{赢})$$）
2. 轨迹 $$(慢,赢)$$ 的首步优势：λ=0 与 λ=1 各多少、符号？（$$-0.087$$ vs $$+0.030$$——自举看一步、MC 看全程，符号翻转）
3. λ=0.5 时？（$$\delta_0+0.45\,\delta_1 = -0.028$$——远处证据打折）
4. γ 与 λ 的职责？（γ：环境的折扣（价值定义）；λ：估计器混合比例——两码事）

## 6. 相关概念

- [贝尔曼方程](/ai-fa/explore/40-Concepts/贝尔曼方程)：TD 误差的定义
- [策略梯度定理](/ai-fa/explore/40-Concepts/策略梯度定理)：GAE 服务的对象
- [期望](/ai-fa/explore/40-Concepts/期望)：估计的统计基础
