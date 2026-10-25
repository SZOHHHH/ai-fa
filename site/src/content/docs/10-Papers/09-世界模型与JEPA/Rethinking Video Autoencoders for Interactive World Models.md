---
type: paper
title: Rethinking Video Autoencoders for Interactive World Models
aliases: []
year: 2026
authors: [Adrien, Ramanana, Rahary]
venue: 待核（占位层，来自 arXiv 2026-10-21）
arxiv: "2610.30129v1"
pdf: https://arxiv.org/pdf/2610.30129v1
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Rethinking Video Autoencoders for Interactive World Models

> **占位层卡**（daily 自动采集 2026-10-24 建卡，元数据出自 arXiv API=已核实）。本链 Claude 处理段将自动精读升级：七节补全+中文速览+挂全链。
> 摘要（原文）：Video world models predict future frames from past frames and actions. They serve as simulators in which agents train, plan or are evaluated, and that humans can control interactively. They generate in the latent space of a video autoencoder, whose compression sets their cost per frame and how long each action waits to take effect. Yet world models often reuse the autoencoders of text-to-video generators, built for offline generation with no agent waiting and, without their training data and code, not retrainable at another compression. We therefore ask how, where and how much a world model sh

## 1. 一句话贡献
为交互式世界模型量身设计开源因果扩散表征自编码器家族 CADRE（七档时空压缩，冻结 DINOv3 特征+小瓶颈+单/少步自蒸馏扩散解码器），并用四环境受控实验给出"在哪压缩、压多少"的延迟-质量-动作跟随权衡地图（20fps@单 H100、动作反应 <230ms）。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
1. 动机：世界模型常复用文生视频自编码器（8×8 时间压缩→20fps 下每个动作延迟 ≥400ms，超人类 230ms 察觉阈），且无数据/代码不可换压缩率重训——故自建"压缩率可扫描"的开放家族；
2. 编码器：冻结 DINOv3 逐 patch 特征（RAEv2 式多层聚合）+单个训练的 3D 卷积瓶颈（核 (τ,k,k)/步幅 (τ,s′,s′)）——家族成员只差这一层；
3. 解码器：时空分解因果 DiT，潜 z 三处注入（与 patchified 噪声剪辑相加/每块 AdaLN/零初始化卷积头 skip）；流匹配 x-prediction + 感知（LPIPS+DINO-LPIPS）+小波损失；
4. 少步化：shortcut/flow-map 式渐进自蒸馏——一大步被训练去拟合两个半步的落点，一阶段完成（自己是自己的老师，无对抗损失、无需两阶段蒸馏）；
5. 评测：同一个 MIRA 式 1.2B 因果扩散 transformer WM（diffusion forcing 训练）分别在每个自编码器上训练，四环境（机器人 ABC/人手 EgoDex/驾驶 Physical AI AV/室内 RealEstate10K），看 rollout FVD + 动作跟随（ARR），不看重建。

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[世界模型](/ai-fa/explore/20-Algorithms/世界模型)（交互式 WM 的自编码器侧设计空间）· [潜在扩散模型（LDM）](/ai-fa/explore/20-Algorithms/潜在扩散模型（LDM）)（潜空间生成谱系的"压缩率为交互服务"分支）
- ← 前身：[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)（其 WM 即 DF 训练的因果扩散 transformer）· MIRA（编码器配方与"以 WM rollout 评自编码器"的方法论来源，未入库）
- ≡ 评测近邻：[WorldExam- Benchmarking World Models from Apparent Appearance to Inherent Reactivity](/ai-fa/explore/10-Papers/09-世界模型与JEPA/WorldExam- Benchmarking World Models from Apparent Appearance to Inherent Reactivity（WorldExam）)（把"反应性/动作跟随"立为 WM 一等评测维度——CADRE 的 ARR 与此同向）
- ↔ 像素路线对照：[Diffusion for World Modeling- Visual Details Matter in Atari](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)（DIAMOND 论证"像素细节携带策略信号"，CADRE 量化"粗空间 token 伤动作跟随远超图像质量"——两路线在"压缩即决策代价"上互证）
- 概念链：[NFE（函数求值次数）](/ai-fa/explore/40-Concepts/NFE（函数求值次数）)（1-2 步解码=自蒸馏流图）· [逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（附录 E 用 IDM 探针测潜表征的动作可恢复性）· [条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2610.30129v1；在线全文（新论文）：https://arxiv.org/html/2610.30129v1
