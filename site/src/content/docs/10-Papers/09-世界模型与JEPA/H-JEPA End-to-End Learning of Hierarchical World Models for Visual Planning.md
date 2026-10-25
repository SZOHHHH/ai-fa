---
type: paper
title: "H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning"
aliases: [H-JEPA, 层级JEPA]
year: 2026
authors: [Wancong Zhang, Basile Terver, Michael Rabbat, Yann LeCun, Randall Balestriero]
venue: arXiv 2610.06805（cs.LG，NYU/AMI/INRIA/Brown，2026-10-05）
arxiv: "2610.06805v1"
pdf: https://arxiv.org/pdf/2610.06805v1
line: 世界模型（e2-inversion-sentry 哨兵组命中）
matrix_coords: [JEPA潜空间WM(每层独立潜空间), 时间层级(多步长多视野), top-down子目标规划, IDM防坍缩正则, 导航+操作(FourRoom/AntMaze/PushT/Cube/DROID)]
layer: 精化层（在线全文精读）
---
# H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning

> 精读升级 2026-10-12（每日日常处理段，在线全文 arxiv.org/html/2610.06805v1）。LeCun 系 JEPA 家族正牌军：把 flat JEPA 世界模型堆成"每层独立潜空间、越往上时间步长越粗、视野越长"的金字塔，规划自顶向下逐层分解成子目标。

## 1. 一句话贡献
把 action-conditioned JEPA 世界模型做成层级金字塔——每层在自己的潜空间里以更粗的时间步长预测更远的未来，顶层盯目标、其预测成为下一层的子目标——长视野视觉规划用更少的规划算力把成功率从 18% 提到 73%（Visual AntMaze，三层 vs flat）。

## 2. 核心贡献
- **端到端层级 JEPA 训练法**：每层有自己的观测编码器/动作编码器/潜预测器，上层逐点消费下层潜状态并聚合动作嵌入，全栈联合训练（上层梯度穿透到下层编码器）；防坍缩靠 SIGReg 正则。
- **选择性抽象实证**：当环境因素以分离的时间尺度演化时，高层自动丢弃快而不可预测的细节（蚂蚁腿姿态）、保留慢而任务相关的状态（位置+迷宫布局）。
- **层级规划双机制拆解**：对比 HWM（共享一个潜空间的分层），证明收益同时来自①时间分解（长任务拆成子目标）与②高层在更抽象潜空间里给目标打分；AntMaze 上三层 H-JEPA ≈ 两倍于 HWM 的成功率。
- **DROID 实机视频扩展（IDM 项）**：场景每集都变时，纯预测目标会"编码场景、丢弃智能体"（慢特征坍缩，附录 L 给出构造证明）；加逆动力学（IDM）损失项——从相邻两个潜状态反推动作——把表征拉回智能体侧，层级收益继续叠加。

## 3. 方法概要
1. **建层级**：第 1 层编码原始观测（可拼接本体感受）为潜状态；第 k 层状态编码器对第 k−1 层的潜状态按步长 γ_k 采样、按窗口 w_k 池化（实验取 w_k=1，即逐点）；动作编码器聚合 γ_k 个下层动作嵌入成宏动作块。
2. **逐层训练（端到端）**：每层是一个标准 JEPA——给定过去 L 个潜状态+动作嵌入，预测下一步潜状态（teacher-forced）；层目标 = 预测损失 + SIGReg（潜分布推向各向同性高斯防坍缩）+（DROID 场景）IDM 损失。
3. **自顶向下规划**：当前/目标观测自底向上编码成每层的初始/目标潜状态；顶层用梯度下降优化宏动作序列，使其展开的最终预测潜状态贴近目标潜状态；其预测轨迹成为下层子目标，下层再优化本层动作去命中子目标（下层预测经状态编码器提升回上层潜空间比对），递归到第 1 层输出原始动作。
4. **DROID 分支**：无仿真器，用 Fréchet fidelity 离线打分——规划出的末端执行器 3D 路径与专家路径的离散 Fréchet 距离，按"完全不动"路径归一化（0=不动，1=专家路径）。

## 4. 核心公式
- 层内一步预测损失（teacher-forced，统一记号）：$$\mathcal{L}^{(k)}_{\text{pred}} = \lVert \phi^{(k)}(\bar{s}^{(k)}_{t-L:t}, \bar{a}^{(k)}_{t}) - \text{sg}[\bar{s}^{(k)}_{t+1}] \rVert_2^2$$（sg=stop-gradient，目标侧 detach——JEPA 的"预测表征不预测像素"）
- 层总目标：$$\mathcal{L}^{(k)} = \mathcal{L}^{(k)}_{\text{pred}} + \lambda_1 \mathcal{L}^{(k)}_{\text{SIGReg}} + \lambda_2 \mathcal{L}^{(k)}_{\text{IDM}}$$（直觉：第一项学动态，第二项防全塌缩，第三项只在 DROID 多场景数据上必要——防"只编码背景"的慢特征坍缩）
- IDM 项（从两潜状态反推动作块）：$$\mathcal{L}^{(k)}_{\text{IDM}} = \lVert g^{(k)}(s^{(k)}_t, s^{(k)}_{t+1}) - \text{sg}[\bar{a}^{(k)}_t] \rVert_2^2$$（直觉：若编码器丢掉了智能体，仅靠两个潜状态猜不出连接它们的动作——IDM 是作用于跨时刻联合分布的防坍缩屏障，这是任何只看边缘分布的正则都做不到的）
- 顶层规划目标：$$\hat{a}^{(K)*} = \arg\min_{a} \lVert \hat{s}^{(K)}_{H}(a) - s^{(K)}_{\text{goal}} \rVert_2^2$$（直觉：不匹配像素不匹配奖励，在最抽象层的潜空间里"离目标还差多少"变成光滑可优化的地形——Fig.7 显示高层代价面沿走廊更平缓、低代价盆地更宽）

## 5. 与前作/矩阵关系
- ← 前身/基线：LeWM/LeJEPA（flat 免解码器 JEPA 世界模型 + SIGReg，H-JEPA 即"把 LeWM 堆深"；库内近亲同源 [LeWAM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/LeWAM A JEPA World Action Model with Diffusion-Steering-Based MPC)，其前身注记同指此系）
- 家族树：[I-JEPA](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture（I-JEPA）) → [V-JEPA 2](/ai-fa/explore/10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）)（视频预训练+动作条件预测）→ H-JEPA（分层化）；与 [Dreamer](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）) 系对照（同样潜空间想象规划，但免奖励免像素重建、任务无关）
- 分层近亲：[HPLWM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Hierarchical Planning with Latent World Models（HPLWM）) 一系（时间分层但共享单一潜空间=文中 HWM 对照路线——H-JEPA 论证"每层独立潜空间"才是第二收益来源）
- ≡ IDM 对话：[Preserving Unstable Modes](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models)（IDM 稳定 JEPA 表征，同族不同用途）；[Delta-JEPA](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）)（动作敏感表征）；[MotionJEPA](/ai-fa/explore/10-Papers/09-世界模型与JEPA/MotionJEPA Preventing Temporal Feature Collapse by Capturing Visual Changes in Latent Space)（防时间特征坍缩近邻话题）
- 概念锚：[JEPA联合嵌入预测架构](/ai-fa/explore/40-Concepts/JEPA联合嵌入预测架构) · [逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）) · [VICReg三正则](/ai-fa/explore/30-Formulas/VICReg三正则)（SIGReg 同族正则）· [世界模型](/ai-fa/explore/20-Algorithms/世界模型)

## 6. 影响后续
- JEPA 纲领从 flat 到层级的正牌落地（LeCun 署名）；"时间尺度分离→高层自动丢快留慢"给分层表征学习补了系统证据。

## 7. 读前须知
- 前置：[JEPA联合嵌入预测架构](/ai-fa/explore/40-Concepts/JEPA联合嵌入预测架构)、[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)、[VICReg三正则](/ai-fa/explore/30-Formulas/VICReg三正则)（理解 SIGReg 为何只能管边缘分布）、梯度优化式 MPC（规划=对动作序列做梯度下降）常识；慢特征分析（slow-feature analysis）背景可跳读。
- 原文：https://arxiv.org/pdf/2610.06805v1 ｜ 在线全文：https://arxiv.org/html/2610.06805v1
