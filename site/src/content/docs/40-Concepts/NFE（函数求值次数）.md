---
type: concept
aliases: [NFE, Number of Function Evaluations, 函数求值次数, 网络前向次数]
domain: 生成建模与数值计算
tags: [concept]
---

# NFE（函数求值次数）

## 1. 定义（直觉 → 形式）

**直觉**：数"贵的那一步"发生了几次——一次生成/求解里，最贵的操作（调一次网络、调一次右端函数）总共被调用几次。

**形式**：Number of Function Evaluations——数值积分一个微分方程时，右端函数被求值的总次数（每步 Euler 计 1 次、每步 Heun 计 2 次）。

**扩散生成里的用法（本库主战场）**：采样 = 数值积分 [概率流 ODE](/ai-fa/explore/30-Formulas/概率流ODE)，右端 = 去噪网络 $$D(x,\sigma)$$，所以：

$$\text{NFE} = \text{去噪步数} = \text{每生成一张图/一帧，调用了几次去噪网络}$$

## 2. 为什么它是扩散快慢的"度量衡"

| 模型/方法 | NFE | 说明 |
|---|---|---|
| DDPM 原版 | ~1000 | 逐步去噪 |
| DDIM / EDM 采样 | 20–50 / 3 | 好积分器 + 预条件化 |
| 蒸馏后（DMD/MFD/一致性模型） | **1** | 把多步智能压进权重 |
| 世界模型想象训练（DIAMOND） | **3/帧** | 想象 rollout 串行链的成本大头 |

- **比"秒数"更本质**：秒数随硬件变，NFE 是架构级常数；采样是串行链（第 t+1 次调用依赖第 t 次输出），墙钟时间 ∝ NFE，GPU 并行救不了串行部分
- **少步化两条路**：①更好的积分器/轨迹拉直（Rectified Flow 系）；②**蒸馏**——训练时用多步 teacher、推理用 1 步 student（本库蒸馏主线属②）

## 3. 易混点

- **NFE vs FLOPs**：NFE 数"调用次数"，FLOPs 数"一次调用内部的乘加总量"——蒸馏降 NFE，不降单次 FLOPs
- **NFE vs 训练步数**：NFE 是推理/采样侧的计数；训练的梯度更新次数是另一回事（蒸馏 4 万梯度步 ⇒ 产出 1 NFE 的 student）

## 4. 与库内实体的关系

- ← 概念源头：[常微分方程（ODE）](/ai-fa/explore/40-Concepts/常微分方程（ODE）)（数值积分的计数单位）、[采样器](/ai-fa/explore/40-Concepts/采样器)
- ← 采样语境：[概率流ODE](/ai-fa/explore/30-Formulas/概率流ODE)（扩散采样=积分它，步数即 NFE）
- ← 每次求值在问什么：[Score函数](/ai-fa/explore/40-Concepts/Score函数)（调一次去噪网络 ≈ 问一次 score 场）
- 应用侧：[DIAMOND](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)（每帧 3 NFE = 想象训练主成本）、[DMD](/ai-fa/explore/10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）)（蒸馏到 1 NFE 的代表）、[PlaidQ](/ai-fa/explore/10-Papers/02-生成建模与扩散/Distilled Continuous Diffusion Language Models Can Write Code in Few Steps---or One)（语言域少步蒸馏：K+1 NFE 计数、K=1 处 DMD 失效需配对监督）

- → 后继补记（260916）：[LookThere!](/ai-fa/explore/10-Papers/01-架构演进/LookThere! Sparse Vision by Reinforced Selection)（视觉输入端的 NFE 削减：强化学习选关键像素）
- → 后继补记（260917）：[StrucPhysVideo](/ai-fa/explore/10-Papers/02-生成建模与扩散/StrucPhysVideo Learning Physical Dynamics from Structured Captions and Robot Actions)（少步蒸馏落交互 WM：IA2V 动作条件自回归 rollout 压到 4 步去噪/帧——蒸馏动机=rollout 效率、评估=Physics-IQ 生成指标，无决策维度；与 E1"少步×决策保真"格的差异实证）
- → 后继补记（260919）：[AlayaVista](/ai-fa/explore/10-Papers/02-生成建模与扩散/AlayaVista Streaming World Modeling from Panoramic States to Perspective Video)（双分支 4 步蒸馏落流式全景 WM：一致性蒸馏初始化→Self-Forcing+++分布匹配；动机=流式效率、评估=视觉质量/相机可控——无决策维度，E1 对照组再+1）
