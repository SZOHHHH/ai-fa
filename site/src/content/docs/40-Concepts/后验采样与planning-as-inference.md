---
type: concept
aliases: [后验采样, posterior sampling, planning as inference, 规划即推断, Thompson采样]
domain: 强化学习与概率推断
tags: [concept]
---

# 后验采样与 planning-as-inference

## 1. 定义（直觉 → 形式）

**直觉**：把"做决策"改写成"从条件分布里抽一个样本"。
- 前向问题：我知道条件（当前局面+我的动作），问**未来会怎样**——$$p(\text{未来}\mid \text{现在},\,a)$$，这是世界模型干的事；
- 后验问题：我知道条件（当前局面+**想要的未来**），问**现在该做什么**——$$p(a\mid \text{现在},\,\text{目标})$$，这就是后验采样。

**形式**（贝叶斯公式的直接应用）：

$$p(a\mid s,\,x_{goal})\;=\;\frac{p(x_{goal}\mid s,\,a)\,p(a\mid s)}{p(x_{goal}\mid s)}\qquad(\text{似然}\times\text{先验，归一化})$$

**planning-as-inference**（规划即推断）：一个更宽的主张——**规划、学习、探索都能统一写成概率图模型上的推断**（求后验/边缘）。最优策略可以写成 $$\pi(a\mid s)\propto\exp(\text{Q 值})$$（Boltzmann 探索）这类"分布化"形式，推断工具（变分/采样）直接进场。

## 2. 三条同名近亲（防混）

| 名字 | 对什么后验采样 | 干什么用 |
|---|---|---|
| **PSRL**（Thompson 采样一族） | 对**环境模型本身**的后验 $$p(\text{模型}\mid \text{数据})$$ | 探索：从模型后验抽一个"假想世界"在里面贪心（不确定就多试几种世界观） |
| **目标条件后验采样** | 对**动作**的后验 $$p(a\mid s, \text{goal})$$ | 规划/反推：由果找因 |
| **扩散后验采样（DPS）** | 对**生成内容**的后验 $$p(x\mid y)$$（先验=扩散模型，y=观测） | 逆问题：超分/修复/相位恢复 |

三条共用一句话：**"条件反过来用，就是采样器"**。

## 教程：一行贝叶斯的"由果找因"落地（含多模态现场）

**第 1 步：设定。** 当前局面 $$s$$；目标 = 想要的未来帧 $$x_{goal}$$；动作 $$a \in \{$$左, 右$$\}$$；先验 $$\pi(a|s) = (0.5, 0.5)$$（还没偏好）。

**第 2 步：世界模型供似然。** $$p(x_{goal}|s, a{=}左) = 0.2$$、$$p(x_{goal}|s, a{=}右) = 0.8$$（走右更可能达成目标）。分母 $$p(x_{goal}|s) = 0.5\times0.2+0.5\times0.8 = 0.5$$。

**第 3 步：算后验。** $$p(a{=}左|s, x_{goal}) = \frac{0.2\times0.5}{0.5} = 0.2$$；$$p(a{=}右|\cdot) = 0.8$$——先验均匀时**后验形状 = 似然形状**（贝叶斯只做了重新归一化）。采样执行：80% 概率出"右"。

**第 4 步：多模态现场（与 argmax 的分水岭）。** 若两条路都通（$$p(x_{goal}|左) = p(x_{goal}|右) = 0.5$$）→ 后验 $$(0.5, 0.5)$$——**不选边，两条路各留一半**；argmax/MAP 会随便挑一条（实现细节决定），把"我其实不确定"的信息全部丢弃。后验采样每次掷骰——探索与多样性免费获得（[贝叶斯公式](/ai-fa/explore/40-Concepts/贝叶斯公式) 批 1 教程的 odds 拔河在此换成动作版）。

**第 5 步：怎么算这个后验（工程三路）。** ①参数化直接学（[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)：$$q_\theta(a|s, s_{goal})$$ 一步到位）；②引导采样（DPS：扩散先验 + 每步叠加 $$\nabla\log p(y|x)$$，无需重训）；③硬条件 inpainting（Diffuser：已知帧涂死、生成其余）——三路的取舍见 §3 工具箱。

## 3. 扩散时代的后验采样（工具箱）

- **Inpainting 式**（[Diffuser](/ai-fa/explore/10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）)）：把已知量（当前态+目标态）当"已涂死"的像素，去噪生成其余（含动作序列）——硬条件版。
- **引导式**（[DPS](/ai-fa/explore/10-Papers/02-生成建模与扩散/Diffusion Posterior Sampling for General Noisy Inverse Problems（DPS）)）：每步去噪时叠加 $$\nabla_x\log p(y\mid x)$$（似然的分数），近似的后验采样——软条件版，无需重训。
- **与 [CFG](/ai-fa/explore/30-Formulas/无分类器引导（CFG）) 的分工**：CFG 是"标签条件"（训练时见过类条件）；引导式后验是"任意似然"（测试时才给定，如"未来帧长这样"）——后者才是反推场景要的。

## 4. 为什么"后验"比"最优解"好用

1. **多模态免费**：后验本身是分布——多条可行路各留概率（对手可能左可能右时，最优单解是幻觉，混合才是真相）；
2. **不确定性可见**：分布宽=我不知道（可触发探索/求助），尖=我有把握——比 argmax 多出一整层信息；
3. **先验当正则**：$$\pi(a\mid s)$$ 先验把"离谱动作"自然压下去，不必硬约束。

## 5. 易混点

- **后验采样 ≠ MAP**：MAP 取峰（单解）；后验采样保留整个分布。
- **"反推"不要求模型可逆**：是条件分布的学习/采样问题，不是把神经网络倒着跑。
- **RL 里的 posterior 两个含义**：对模型的后验（PSRL）vs 对动作的后验（本文主角）——读文献先看它反推的对象。

## 6. 自测

1. 似然 $$(0.2, 0.8)$$、先验均匀：后验？（$$(0.2, 0.8)$$——先验均匀时后验=似然形状）
2. 两路等优（似然各 0.5）时后验采样 vs MAP 的差别？（$$(0.5,0.5)$$ 保留两路 vs argmax 随便挑一条——不确定信息全丢）
3. PSRL 与目标条件后验采样的反推对象各是什么？（环境模型本身（"世界观"）/ 动作（"该做什么"））
4. 工程三路？（参数化学 IDM / 引导采样 DPS / inpainting 式 Diffuser——重训成本与柔性各不同）

## 7. 与库内实体的关系

- ← 地基：[贝叶斯公式](/ai-fa/explore/40-Concepts/贝叶斯公式)、[条件概率](/ai-fa/explore/40-Concepts/条件概率)、[期望](/ai-fa/explore/40-Concepts/期望)
- → 工具：[DPS](/ai-fa/explore/10-Papers/02-生成建模与扩散/Diffusion Posterior Sampling for General Noisy Inverse Problems（DPS）)、[Diffuser](/ai-fa/explore/10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）)、[无分类器引导（CFG）](/ai-fa/explore/30-Formulas/无分类器引导（CFG）)
- → 镜像：正向=世界模型 [马尔可夫决策过程](/ai-fa/explore/40-Concepts/马尔可夫决策过程)（$$p(s'\mid s,a)$$）；动作后验的求解器之一=[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（参数化直接学后验，对比引导采样=无参数构造）
