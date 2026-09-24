---
type: algo
aliases: [Score-Based生成模型, 基于分数的生成模型, SMLD, 噪声条件分数网络, NCSN]
line: 生成建模与扩散
tags: [algo]
---

# Score-Based 生成模型（SMLD）

## 1. 定义

**非数学语言**：不去学"图的分布"，学"在任意一点上，往数据密集区走的方向"（score 场）。生成时像下山：从随机点出发，每步沿 score 方向走 + 一点抖动，最终落到数据流形上。

**数学语言**：多尺度加噪 $\{\sigma_i\}$，每个噪声级学 $s_\theta(x, \sigma_i) \approx \nabla_x \log p_{\sigma_i}(x)$（[[30-Formulas/DSM目标]]），采样用退火朗之万动力学；连续极限即 VE-SDE。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [[10-Papers/02-生成建模与扩散/Generative Modeling by Estimating Gradients of the Data Distribution（SMLD）]] | 噪声条件 score 网络 + 退火朗之万 | 2019 |
| [[10-Papers/02-生成建模与扩散/Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）]] | 连续化统一（VE-SDE） | 2021 |
| Vincent 2011 | DSM 等价定理（前史） | 2011 |

## 3. 核心公式

- [[30-Formulas/DSM目标]] —— 训练目标
- [[30-Formulas/Score-SDE前向过程]] —— 连续极限与 VE 框架
- [[30-Formulas/反向SDE]] —— 采样方程

## 教程：score 视角的完整生成循环（SMLD→SDE 导览）

**第 1 步：score 是什么。** $s(x) = \nabla_x\log p(x)$——**概率地形的坡度指向**（哪里数据密集往哪指）。弹簧直觉与两步朗之万手算见 [[40-Concepts/Score函数]]。

**第 2 步：训练（DSM）。** 加噪后目标闭式：$s^* = -(\tilde x - x_0)/\sigma^2$，回归网络输出（[[30-Formulas/DSM目标]] 教程：−0.8 的标签现场、与 ε-预测差 σ 倍的换算）。

**第 3 步：采样（退火朗之万）。** $x \leftarrow x + \frac{\eta}{2}s_\theta + \sqrt\eta\,\epsilon$——大 σ 粗定位、小 σ 精修（L 档噪声链，[[30-Formulas/DSM目标]] §采样）。

**第 4 步：连续化（Score-SDE）。** 噪声档→无穷细 = SDE；反向方程只需把 score 塞进漂移项（[[30-Formulas/反向SDE]] 教程第 4 步：修正项 −g²s 就是"拽回流形的手"）；去噪声版 = ODE（[[30-Formulas/概率流ODE]]）。

**第 5 步：读法。** score 派（SMLD）与扩散派（DDPM）两族论文用两套记号干了同一件事（s = −ε/σ），Score-SDE 把它们连同 VE/VP 两个家族统一进一个框架（[[30-Formulas/Score-SDE前向过程]] 教程：欧拉一步 2.037 vs DDPM 2.036 的泰勒对账）——**本卡是这条统一史的主线叙事，数字全在各公式卡里**。

## 4. 数学概念分解

[[40-Concepts/Score函数]]、[[40-Concepts/能量模型]]（score = 负能量梯度）、[[40-Concepts/朗之万动力学]]、[[40-Concepts/随机微分方程（SDE）|随机微分方程]]、[[40-Concepts/采样器]]

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表论文 |
|---|---|---|
| Score-SDE | 多尺度 → 连续时间 | 2021 |
| EDM | σ-空间再参数化、统一 VP/VE 设计空间 | [[10-Papers/02-生成建模与扩散/Elucidating the Design Space of Diffusion-Based Generative Models（EDM）]] |
| 与 DDPM 合流 | ε-预测 ↔ score 线性换算 | [[30-Formulas/DSM目标]] §2 |

## 6. 对比表

| | SMLD（score 派） | DDPM（扩散派） |
|---|---|---|
| 表面目标 | $\nabla_x \log p$ | 噪声 $\epsilon$ |
| 采样 | 退火朗之万 | 祖先采样 |
| 数学等价 | 两者互为线性换算、连续极限同族（VP vs VE） | |
| 记号外观 | 完全不同——本库的换算表就是为终结这种混乱 | |

**教学定位**：与扩散模型是"同一模型的两个学派"——2021 Score-SDE 之后学界统一认知。

## 自测

1. score 的物理直觉？（概率地形坡度——指向数据密集方向）
2. DSM 标签为什么闭式？（加性高斯的 $\nabla\log q = -(\tilde x - x_0)/\sigma^2$）
3. score 派与扩散派怎么合流的？（$s = -\epsilon/\sigma$ 换算——Score-SDE 统一记号）
4. 朗之万采样为什么退火？（单 σ 低密度区 score 不可靠——大 σ 定位、小 σ 精修）
