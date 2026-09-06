---
type: concept
aliases: [后验采样, posterior sampling, planning as inference, 规划即推断, Thompson采样]
domain: 强化学习与概率推断
tags: [concept]
---

# 后验采样与 planning-as-inference

## 1. 定义（直觉 → 形式）

**直觉**：把"做决策"改写成"从条件分布里抽一个样本"。
- 前向问题：我知道条件（当前局面+我的动作），问**未来会怎样**——$p(\text{未来}\mid \text{现在},\,a)$，这是世界模型干的事；
- 后验问题：我知道条件（当前局面+**想要的未来**），问**现在该做什么**——$p(a\mid \text{现在},\,\text{目标})$，这就是后验采样。

**形式**（贝叶斯公式的直接应用）：

$$p(a\mid s,\,x_{goal})\;=\;\frac{p(x_{goal}\mid s,\,a)\,p(a\mid s)}{p(x_{goal}\mid s)}\qquad(\text{似然}\times\text{先验，归一化})$$

**planning-as-inference**（规划即推断）：一个更宽的主张——**规划、学习、探索都能统一写成概率图模型上的推断**（求后验/边缘）。最优策略可以写成 $\pi(a\mid s)\propto\exp(\text{Q 值})$（Boltzmann 探索）这类"分布化"形式，推断工具（变分/采样）直接进场。

## 2. 三条同名近亲（防混）

| 名字 | 对什么后验采样 | 干什么用 |
|---|---|---|
| **PSRL**（Thompson 采样一族） | 对**环境模型本身**的后验 $p(\text{模型}\mid \text{数据})$ | 探索：从模型后验抽一个"假想世界"在里面贪心（不确定就多试几种世界观） |
| **目标条件后验采样** | 对**动作**的后验 $p(a\mid s, \text{goal})$ | 规划/反推：由果找因 |
| **扩散后验采样（DPS）** | 对**生成内容**的后验 $p(x\mid y)$（先验=扩散模型，y=观测） | 逆问题：超分/修复/相位恢复 |

三条共用一句话：**"条件反过来用，就是采样器"**。

## 3. 扩散时代的后验采样（工具箱）

- **Inpainting 式**（[[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]]）：把已知量（当前态+目标态）当"已涂死"的像素，去噪生成其余（含动作序列）——硬条件版。
- **引导式**（[[10-Papers/02-生成建模与扩散/Diffusion Posterior Sampling for General Noisy Inverse Problems（DPS）|DPS]]）：每步去噪时叠加 $\nabla_x\log p(y\mid x)$（似然的分数），近似的后验采样——软条件版，无需重训。
- **与 [[30-Formulas/无分类器引导（CFG）|CFG]] 的分工**：CFG 是"标签条件"（训练时见过类条件）；引导式后验是"任意似然"（测试时才给定，如"未来帧长这样"）——后者才是反推场景要的。

## 4. 为什么"后验"比"最优解"好用

1. **多模态免费**：后验本身是分布——多条可行路各留概率（对手可能左可能右时，最优单解是幻觉，混合才是真相）；
2. **不确定性可见**：分布宽=我不知道（可触发探索/求助），尖=我有把握——比 argmax 多出一整层信息；
3. **先验当正则**：$\pi(a\mid s)$ 先验把"离谱动作"自然压下去，不必硬约束。

## 5. 易混点

- **后验采样 ≠ MAP**：MAP 取峰（单解）；后验采样保留整个分布。
- **"反推"不要求模型可逆**：是条件分布的学习/采样问题，不是把神经网络倒着跑。
- **RL 里的 posterior 两个含义**：对模型的后验（PSRL）vs 对动作的后验（本文主角）——读文献先看它反推的对象。

## 6. 与库内实体的关系

- ← 地基：[[40-Concepts/贝叶斯公式]]、[[40-Concepts/条件概率]]、[[40-Concepts/期望]]
- → 工具：[[10-Papers/02-生成建模与扩散/Diffusion Posterior Sampling for General Noisy Inverse Problems（DPS）|DPS]]、[[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]]、[[30-Formulas/无分类器引导（CFG）]]
- → 镜像：正向=世界模型 [[40-Concepts/马尔可夫决策过程]]（$p(s'\mid s,a)$）；动作后验的求解器之一=[[40-Concepts/逆动力学（IDM）]]（参数化直接学后验，对比引导采样=无参数构造）
