---
type: paper
title: "Inside-JEPA: From Prediction to Relational Grounding in Latent World Models"
aliases: []
year: 2026
authors: [Hossein, Resani]
venue: 待核（占位层，来自 arXiv 2026-10-22）
arxiv: "2610.31194v1"
pdf: https://arxiv.org/pdf/2610.31194v1
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Inside-JEPA: From Prediction to Relational Grounding in Latent World Models

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Joint-embedding predictive architectures (JEPAs) learn world models in latent space, enabling efficient planning but leaving their states opaque. We introduce Inside-JEPA, which places relational channels for ordered entity pairs inside the JEPA latent state and shows that an inverse-dynamics loss can ground these channels without relation labels when its head reads them, either alone or as part of the full state. On Something-Something V2, latent prediction alone performs no better than a random relation head, while inverse-dynamics supervision that recovers actions from channel changes impro

## 1. 一句话贡献
在 JEPA 潜状态内为每个有序实体对开辟关系通道，并证明一个从"通道前后变化"恢复动作的逆动力学损失能在零关系标签下接地这些通道——而纯潜空间预测不接地（Something-Something V2 关系 AUROC +.065~.103、RH20T 机器人 +.081、检测跟踪对象 +.050~.061）。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
1. 状态构造：每实体潜变量 r（冻结 ResNet-18 裁剪编码+box 坐标 Fourier 特征，96×96）+每有序实体对的 K 维软符号关系通道 s=σ(g(e_i,e_j))，拼接为 JEPA 状态 z=(r,s)；
2. 预测损失：标准 JEPA——predictor（两层 MLP）从 (z_t, 动作嵌入 u(a_t)) 预测 EMA target encoder 的 z̄_{t+k}；
3. 逆动力学接地：加一项 L_inv=ℓ(h(s_t,s_{t+k}), a_t)——逆头只读关系通道前后值去恢复动作（交叉熵/连续控制 MSE），梯度直达通道头 g 与编码器 f；总损失 L=L_JEPA+λL_inv（λ=1，无逐臂调参）；
4. 五臂受控对照（PRED 无逆头/INV-S 读通道/INV-Z 读全潜/INV-R 只读实体潜/INV-SHUF 打乱标签）+随机关系头基线+label-free（InfoNCE 等）对照，分离"什么信号接地了通道"；
5. 用途验证：动作条件关系预测（给定动作预测关系变化 AUROC .599 vs 观察 .621）+16 通道监督读出做单步关系目标 planning（top-5 命中 43% vs 预测-only 24% vs 频率先验 17%）。

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[JEPA联合嵌入预测架构](/ai-fa/explore/40-Concepts/JEPA联合嵌入预测架构) · [逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（逆动力学损失作符号接地信号——本卡核心机制）
- ← 前身：[V-JEPA 2 - Self-Supervised Video Models Enable Understanding, Prediction and Planning](/ai-fa/explore/10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）)（在其动作条件潜空间预测纲领上追问"潜状态里哪部分是有意义的"）
- ≡ 同族：[Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models)（逆动力学进 JEPA 系的平行路线：保不稳定模态 vs 接地关系通道）· [Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）)（动作敏感性同向：潜差分解码 vs 逆头接地）· [H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning](/ai-fa/explore/10-Papers/09-世界模型与JEPA/H-JEPA End-to-End Learning of Hierarchical World Models for Visual Planning)（JEPA 世界模型谱系）

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.31194v1；在线全文（新论文）：https://arxiv.org/html/2610.31194v1
