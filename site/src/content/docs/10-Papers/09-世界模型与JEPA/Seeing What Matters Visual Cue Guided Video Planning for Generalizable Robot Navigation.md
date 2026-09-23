---
type: paper
title: "Seeing What Matters: Visual Cue Guided Video Planning for Generalizable Robot Navigation"
aliases: [CueNav]
year: 2026
authors: [Hojin Lee, Sizhe Lester Li, Maximilian Hilger, Susie Lu, Achim J. Lilienthal, Vincent Sitzmann, Daniel A. Duecker]
venue: arXiv 2026-09-15（cs.RO，TUM MIRMI+MIT CSAIL，MIT-TUM 合作项目）
arxiv: "2609.16737v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: 视频扩散规划器×光流IDM反演×机器人导航(非游戏域)
tags: [paper, 核心组命中(e2-inversion-sentry), 世界模型与JEPA]
layer: 精读层（PDF 前 8 页全读，260916）
---
# Seeing What Matters: Visual Cue Guided Video Planning for Generalizable Robot Navigation（CueNav）

> **中文速览**：做了什么——把视频扩散模型当导航规划器（想象未来画面），再用**光流中介的 embodiment 专用 IDM** 把画面翻译成连续控制；视觉线索补两样上下文：BEV 地图给全局任务语境（迷宫成功率近 2×，6×6 未见迷宫 55% vs 30%）、机身入镜给具身线索（0.7m 宽 Husky 过 1.0m 窄道 70% 成功）。怎么做的——Wan2.2-5B 做 action-free 后训练（diffusion forcing 式自回归视频预测，只用导航视频无动作标签），预测的 16 帧用 AllTracker 算密集光流，时空 transformer IDM 回归 15 步动作（MSE），执行后滚动重规划闭环。效果——真机零样本语义导航成功率 0.933（StreamVLN 0.467/InternVLA-N1 0.733）；同一视频规划器换 IDM 即跨轮式/足式平台。

## 1. 一句话贡献
视频模型生成"该怎么动"的未来画面、embodiment 专用光流 IDM 把画面落地成连续动作——用**视觉线索而非指令工程**撑长视野（BEV 全局+机身具身），规划器跨平台共享、只换 IDM 适配本体。

## 2. 核心贡献
- **视觉线索双通道**：BEV 地图嵌进观测给全局任务语境（路径不标注、只给起点终点）；部分机身留在自视角内暴露几何/与障碍空间关系——都不改模型结构，只改输入构成。
- **Action-free 视频后训练**：Wan2.2-5B TI2V 骨干，上下文帧+导航 prompt 条件、生成损失只施于未来帧（diffusion forcing 式）；VAE 冻结、DiT 上 LoRA——零动作标签。
- **光流 IDM**：IDM 输入不是 RGB 帧而是相邻帧对的密集光流（AllTracker 离线算），卷积编码+自适应池化+3D RoPE 时空 transformer，回归 $$q=15$$ 步动作；窗口两端各加 $$p=1$$ 个填充流以容纳控制延迟等动力学效应；每个平台单独训练（轮式 $$a=(v_x,\omega_z)$$、足式加 $$v_y$$）。
- **闭环滚动视野**：执行 15 步→新观测入窗→重新规划；Jetson Thor 全链约 4s/步。

## 3. 方法概要（分步）
1. 构观测：自视角帧（含/不含机身）或与 BEV 地图拼成 832×480 单图。
2. 视频规划器以 $$N=21$$ 上下文帧+文本 prompt 采 $$M=16$$ 未来帧。
3. 对"观测+预测"拼接序列算 $$q+2p$$ 个相邻帧对的密集光流。
4. IDM 从流窗口回归 $$q=15$$ 个动作并执行。
5. 新观测入窗回到 2，直至任务终止。

## 4. 核心公式
- 视频规划：$$\hat I_{t+1:t+M}\sim P(\cdot\mid I_{t-(N-1):t},\,g)$$——直觉：goal 以文本/视觉线索形式进**规划器**条件，动作层完全不见 goal。
- 光流反演：$$a_{t:t+q-1}=\pi_{\text{IDM}}(f_{t-p},\dots,f_{t+q+p-1})$$——直觉：反演的输入不是帧而是**帧间密集流**——把"画面怎么动了"显式化、吞掉外观变化，输出确定性点估计序列（MSE 回归）；帧对条件 $$q(a\mid x_t,x_{t+1})$$ 的流中介实现，无后验无分布。
- 消融锚点：CueNav(w/o IDM)=同规划器+MASt3R 几何重建+启发式跟踪控制器——SR 0.667 vs 0.933：**视觉运动→动作的接地质量是闭环成败的主闸门**（比具身线索更关键）。

## 5. 与前作/矩阵关系
- 线锚：[世界模型](/ai-fa/explore/20-Algorithms/世界模型) · [逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（方法核心实体：光流中介、MSE 点估计、embodiment 专用）
- 近邻同族：[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)（其后训练即 diffusion forcing 式自回归视频预测）· [From Prediction to Decision: World-Model-Guided Action Selection for Continuous Pile Excavation](/ai-fa/explore/10-Papers/09-世界模型与JEPA/From Prediction to Decision - World-Model-Guided Action Selection for Continuous Pile Excavation（挖掘WAM）)（同周对照组：WAM"撒动作候选+WM 正演排序"vs CueNav"生成未来视频+IDM 反演"——imagine-then-act 族的正演/反演两条落地路径，已互挂）· [Diffusion for World Modeling- Visual Details Matter in Atari](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)（像素扩散 WM 的游戏域对应物——同为"扩散视频预测当动力学"，用途分叉在规划器 vs 可玩环境）
- ↔ E2 划界（占位研判 260916 详见当日晨报⑤）：其 IDM 是帧对条件确定性回归（流中介、MSE 点估计、无后验），goal 走视频规划器不进 IDM 本体；E2 是 goal 条件下从像素直接反推**全后验** $$p(a\mid x_t,\text{goal})$$ 并以闭环 goal-hit 评命中——反演深度与条件结构两维都不同格，域=机器人导航非游戏。

## 6. 影响后续
- video-planning+IDM 族再添一员（ImagiNav/NavDreamer/ImagineUAV/SparseVideoNav 之后），本文补上"全局任务线索+具身线索+流 IDM"三件并给跨平台共享规划器的实例。
- 作者自列 future work=**少步/潜空间蒸馏**缓解 4s/步推理瓶颈——视频规划器的蒸馏需求被点名但未做，恰是 E1 轴与该族的交叉空位。
- 局限：IDM 绑定固定相机配置（自列）；短视野+有限观测窗；模拟域仅 DeepMind Lab 迷宫。

## 7. 读前须知
[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)、[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)、[世界模型](/ai-fa/explore/20-Algorithms/世界模型)
