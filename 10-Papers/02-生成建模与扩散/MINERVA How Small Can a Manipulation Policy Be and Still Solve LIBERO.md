---
type: paper
title: "MINERVA: How Small Can a Manipulation Policy Be and Still Solve LIBERO?"
aliases: [MINERVA, MINERVA 最小操作策略, 容量地板测量]
year: 2026
authors: [Kohei Sendai, Tatsuya Matsushima, Yusuke Iwasawa]
venue: 待核（arXiv 2609.03715，2026-09-03；东大 Matsuo-Iwasawa Lab）
arxiv: "2609.03715v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: 部署效率×策略容量｜机器人操作｜基准批判轴
tags: [paper, 精读层]
layer: 精读
---
# MINERVA: How Small Can a Manipulation Policy Be and Still Solve LIBERO?

> **精读层卡**（daily 自动采集 2026-09-08 建卡，Tier B 当日精读升级；元数据出自 arXiv API=已核实）。**Headline：0.54M 参数在 LIBERO 四套件拿到 95.1%——比 LeRobot π₀.₅（4.1B）小 7700 倍只差 2.4 个点；性能在 ~1M 饱和、0.25M 以下崩塌。**

## 1. 一句话贡献

把 LIBERO 基准的"容量地板"量出来：无语言编码器、无预训练视觉、仅 40 项任务 ID 嵌入 + 从零 CNN + 流匹配/回归动作头，0.54M 参数即达 95%——证明标准 LIBERO 本质是记忆性测试（memorization test），任务指令的因果作用=从 40 个已记住任务里选一个。

## 2. 核心贡献

- **容量地板测量**：0.54M→95.05%，0.99M→96.75%（距 π₀.₅ 仅 0.75 点）；1M-10M 只差 0.7 点=容量停止计价；0.24M 崩到 88.6%、0.09M 崩到 68.3%，且**先崩 Long 套件**（长视野链子目标是唯一真正吃容量的轴）。
- **种子带校准**：±1 点训练种子波动 ≈ 该基准常见单跑消融差——只有两个设计选择能活过三种子复验：action-chunk 长度（chunk 8 −3.16 / chunk 32 −2.20）与视觉分配（饿死视觉 −1.41）。
- **反直觉发现**：**流匹配 vs 直接 L1 回归无可检测差异**（三种子 +0.34 在带内），而回归免 10 步 Euler 积分、GPU 快 3.8 倍——最终发布版用回归头。
- **因果探针**：置换 task-ID 映射（只改 ID 不动权重）→ 96.75% 崩到 6.5%≈随机——指令条件作用主要做任务选择；Object 套件残留 22-36% 说明视觉可部分代偿。
- **鲁棒性审计**：LIBERO-Plus 扰动下 0.54M 掉到 46.7%；**光度鲁棒性全尺度近零**（光照扰动 ≤6.5%，5M 参数也救不了）。
- **部署效率**：0.54M 每步重规划 8.9ms（笔记本 8 线程 CPU，无 GPU）——比 SmolVLA 快 113 倍、比 π₀.₅ 快 1400 倍。

## 3. 方法概要

①设计原则"基准不要的一概不给"：语言→40 项任务 ID 嵌入表；预训练骨干→从零 4 阶段深度可分离 CNN + spatial-softmax 关键点；自注意力→token-mixing MLP（省 26% 参数）。②动作头：4 层 DiT 式流匹配头出 16 步 chunk，或同头改 L1 回归一步直出；训练时附 velocity 蒸馏（冻结大模型做第二回归目标，小模型级联跟大 teacher 学）。③推理策略：每步重规划 + ACT 式时间集成（重叠 chunk 指数加权平均）+ 初始噪声温度 σ=0.85 模式搜索采样（仅 sub-1M 有效，+0.2~2.25 点）。④规模扫描 9.7M→0.09M 找崩塌点；三种子复验关键消融。

## 4. 核心公式

- 流匹配训练目标（公式 1）：$L_{fm} = E_{a_0,\epsilon,t}\,[\lVert v_\theta(a_t,t,c) - (a_1 - a_0) \rVert_2^2]$，其中插值 $a_t = t\,a_1 + (1-t)\,a_0$，$a_0\sim N(0,I)$ 为噪声、$a_1$ 为真值动作 chunk、$c$ 为条件（视觉特征+本体感+任务嵌入）。**直觉**：学一个速度场，告诉任意噪声化动作"该往真值方向走多快"。
- 蒸馏附加项：$L = L_{fm} + \lambda\,\lVert v_\theta - v^{teacher} \rVert_2^2$（λ=1）——**直觉**：学生不只追真值速度，还贴着 teacher 的预测走（Hinton 式 velocity 蒸馏；蒸馏版 4.89M 甚至打赢自己的 7.12M teacher）。
- 直线化分数（该文分析工具，供对照）：$S_{straight} = \frac{1}{T-2}\sum_t \frac{\langle \Delta z_t, \Delta z_{t+1}\rangle}{\lVert\Delta z_t\rVert\,\lVert\Delta z_{t+1}\rVert}$——连续潜位移方向的平均余弦。

## 5. 与前作/矩阵关系

- 线锚：[[20-Algorithms/扩散模型]] · [[40-Concepts/知识蒸馏]]
- ← 前身：ACT（chunk+时间集成）、Diffusion Policy（生成式动作头）、π₀/π₀.₅（流匹配 VLA、teacher 参照系）、LIBERO-PRO（"LIBERO=记忆测试"论断的出处，本文把它推到容量极致）。
- ≡ 对话位：与 E1 决策保真蒸馏**同题异域**——都在问"压到多小还能保任务表现"，但 MINERVA 压**策略本体**（机器人操作、容量地板），E1 压**世界模型**（游戏 RL、蒸馏目标保真）；其"种子带 ±1 点淹没多数单跑消融"是我们评估纪律的直接参照（E1 六线每线多 seed 的做法被印证必要）。
- 近邻：[[10-Papers/09-世界模型与JEPA/Toward Physically Grounded JEPA World Models for Goal-Conditioned Robotic Planning|Physically Grounded JEPA]]——同周机器人域，一个做策略容量地板、一个做 WM 表征接地。

## 6. 影响后续

"基准批判"线的关键数据点：LIBERO 上 97% 以上的报告增益大概率不测大模型动机所系的能力（扰动协议才测得出）——VLA 社区的方法论警钟；"任务集固定→测容量地板→蒸馏到地板"被作者立为部署管线模板，直接对话蒸馏社区。

## 7. 读前须知

前置：[[20-Algorithms/扩散模型]]（流匹配=连续正规化流/扩散的直线路径变体）；概念：action chunking（一次预测 H 步再执行）、temporal ensembling（重叠预测加权平均）。LIBERO 四套件（Spatial/Object/Goal/Long）结构在图 2。
