---
type: paper
title: "WorldCrafter: Consistent Video World Model with Implicit 3D-aware Memory"
aliases: [WorldCrafter]
year: 2026
authors: [Wangbo Yu, Kunhao Liu, Wenbo Hu, et al.]
venue: arXiv 2026
arxiv: "2609.24984v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [生成式WM(扩散系), 显式记忆(隐式3D), 可交互(相机控制)]
tags: [paper]
---

# WorldCrafter

## 1. 一句话贡献

给视频世界模型装一块"相机可查询的隐式 3D 感知记忆"：按即将到来的视角把全部历史观测压缩进固定 token 预算再注入 DiT，分钟级探索重访一致性较最强基线 +47.6%，配少步蒸馏做到实时流式。

## 2. 核心贡献

- **隐式 3D 感知记忆**：记忆编码器用新视角重建任务（LagerNVS）预训练权重初始化，继承"几何+外观"双保留的 3D 归纳偏置，与视频 DiT 联合训练让记忆空间与 DiT token 空间共适应——不物化显式点云/深度对应
- **位姿引导读出**：从目标相机轨迹采样查询位姿，让"请求的视角"决定固定记忆预算怎么花——比位姿无关读出的一致性与相机控制精度都更好
- **最大覆盖历史检索**：按联合视场覆盖贪心选 k−1 帧互补历史（而非成对相似度排序），对单帧误选更鲁棒
- **实时系统**：记忆 + 近期上下文 + 相机条件自回归生成 + 少步蒸馏 → 单图/文本起流式探索

## 3. 方法概要

1. 底座为分块自回归的潜视频扩散（DiT + 条件流匹配），每步去噪处理 $[z_r; z_t]$（近期历史+当前噪声块）
2. 历史潜帧+相机参数送记忆编码器 $\Phi$ 写入紧凑表征 $R$；推理时只保留最新帧并贪心选出联合 FoV 覆盖最大的 k−1 帧互补帧
3. 读出模块以目标轨迹中采样的查询位姿 $C_q$ 为条件，从 $R$ 读出**固定大小**记忆 token 集 $M$——视角决定压缩取向
4. DiT 处理 $[M; z_r; z_t]$ 单一潜序列；相机条件经 UCPE 并行相机注意力支路（PRoPE 相对几何）只注入噪声段 $z_t$
5. 生成块回写历史，编码器输入与记忆预算恒定；最后少步蒸馏成实时推理

## 4. 核心公式

记忆条件化的自回归流：

`$\frac{dz_t}{dt} = v_\theta(z_t,\, t \mid M,\, z_r,\, C,\, y)$`

**直觉**：标准分块自回归只看 $z_r$（滑窗近期历史），这里多了一项 $M$——一块"按你要去的方向重新打包的过去"：同样的历史，转身回望时读出的内容就不同。

位姿引导读出：

`$M = \text{Readout}(\Phi(z_s, C_s),\, C_q),\quad C_q \subset C$`

**直觉**：$\Phi$ 把多视角证据写成无视角偏的表征，$C_q$ 像一束探照灯——照到哪儿，哪儿的证据被抽出来换成 DiT 认识的 token。预算固定、内容随目标视角变，这就是"让请求的视角塑造压缩"。

## 5. 与前作/矩阵关系

- 流式交互 WM 同族：[[AlayaVista Streaming World Modeling from Panoramic States to Perspective Video]]（全景态→透视流，另一条"跨视角一致性"路线）· [[Astronex-World 1.0 Real-Time Interactive World Model Foundation]]（实时交互基座）· [[Genie 2- A Large-Scale Foundation World Model（Genie 2）]]
- 记忆机制三分法的定位：上下文记忆（全历史注意力/检索）过贵，空间记忆（显式新视角合成）过约束动态场景，本文属隐式记忆但用重建预训练而非几何估计预训练——为外观保真服务
- 分块自回归底座承自 [[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]] 一系；蒸馏走 [[20-Algorithms/一致性模型]] 少步路线
- 数学根基：[[20-Algorithms/扩散模型]] · [[20-Algorithms/流匹配]] · [[Scalable Diffusion Models with Transformers（DiT）]]

## 6. 影响后续

- "固定 token 预算的隐式记忆"为长程 WM 提供了介于全注意力与显式 3D 重建之间的第三条路，对交互式游戏/仿真 WM 的长程一致性直接可用
- 位姿引导读出的思想（目标条件塑造记忆分配）可迁移到目标条件规划：按目标读出历史经验
- 与我们 E1 的对话点在"少步蒸馏×实时交互 WM"：蒸馏目标是视觉一致性而非决策质量（见敌情研判）

## 7. 读前须知

[[30-Formulas/条件流匹配损失]]（训练目标形式）· [[20-Algorithms/扩散模型]] 与 [[Scalable Diffusion Models with Transformers（DiT）]]（DiT 结构）· [[40-Concepts/位置编码]]（PRoPE/UCPE 相机位姿作为注意力内位置变换的背景）；建议先了解新视角合成（NVS）任务设定。
