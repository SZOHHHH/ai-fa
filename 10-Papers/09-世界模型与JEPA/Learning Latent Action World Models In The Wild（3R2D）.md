---
type: paper
title: Learning Latent Action World Models In The Wild
aliases: [3R2D]
year: 2026
authors: [Isaac Kalidindi, Nivedita Rufus, Karmesh Patel, Yann LeCun, Ishita Verma, Amy Zhang]
venue: arXiv 2026（2601.05230）
arxiv: "2601.05230"
pdf: 已下载
line: 世界模型与JEPA
matrix_coords: [隐式(视频自监督), 潜在状态+潜动作, 可操作(动作条件)]
tags: [paper]
---

# 3R2D（野外视频的潜动作世界模型）

## 1. 一句话贡献

把潜动作世界模型从受控机器人视频推广到**in-the-wild 任意视频**，并训练一个**控制器把真实动作映射回潜动作**——潜动作因此成为"接任何机器人"的通用接口（LeCun 组工作）。

## 2. 核心贡献

1. 野外视频训练潜动作世界模型（Garrido 等 3R2D 系列的延续：无需动作标签）
2. **Interface 问题**的解法：已知动作的机器人数据上学一个映射 a→z（真动作到潜动作），使世界模型可以规划
3. 分层规划在潜动作空间进行（配合后续 HPLWM 工作的时间尺度分层）

## 3. 方法概要

世界模型：JEPA 式潜在状态预测（在表示空间预测下一状态，不做像素重建）+ 潜动作条件。潜动作本身从视频自监督学出。控制器：小网络以真动作序列为输入预测对应潜动作，在少量带动作标注的数据上训练——**标注只花在接口上，不花在世界模型上**。

## 4. 核心公式

$$\hat{s}_{t+1} = f_\theta\big(s_t,\, z_t\big),\quad z_t \sim q_\phi(\cdot \mid s_t, s_{t+1}),\quad \hat{z}_t = g_\psi(a_{1..t})$$

预测损失在潜空间：$\|P(s_{t+1}) - f_\theta(s_t, z_t)\|^2$（P 为预测头，H-JEPA 风格）。

**直觉**：世界模型像看纪录片学会"世界怎么运转"（潜动作=隐含的导演指令）；控制器像翻译耳机，把机器人真说的话（关节指令）翻译成导演语言。世界模型零真机成本，接口只花一点点。

## 5. 与前作关系

- ← LAPA（[[10-Papers/09-世界模型与JEPA/Latent Action Pretraining from Videos（LAPA）]]）：潜动作 VQ 化 → 这里改为连续潜空间 + 接口学习
- ← [[10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）]]：JEPA 表示骨干
- ⊃ Garrido et al. 3R2D 原始工作（潜动作世界模型雏形）：扩展到野外数据 + 接口
- → [[60-Matrices/世界模型矩阵]] 的"潜动作"列正式入轴（本次升级）

## 6. 影响后续

潜动作接口成为世界模型×机器人学的活跃方向（Hierarchical Planning with Latent World Models 等续作）；与 [[60-Matrices/世界模型矩阵]] §3 的"JEPA×生成头"机会格互补（一个保理解、一个保可玩）。

## 7. 读前须知

- 需要：JEPA 的潜空间预测思想（为什么不在像素域预测——容量不被浪费在无关细节上）
- 开放痛点（文献共识）：**真动作↔潜动作映射的稳定性**（不同机器人域之间接口是否通用）、**长时程潜动态漂移**——这两个都是 [[60-Matrices/世界模型矩阵]] 新机会格的候选切入点

> 近邻同族：[[Co-Evolving Latent Action World Models（CoLA）]] · [[Factored Latent Action World Models（FLAM）]]

> 数学根基：[[扩散条件去噪]] · [[贝尔曼方程]]
