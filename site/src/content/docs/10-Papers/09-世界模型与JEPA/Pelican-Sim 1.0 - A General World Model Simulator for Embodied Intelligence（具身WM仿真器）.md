---
type: paper
title: "Pelican-Sim 1.0: A General World Model Simulator for Embodied Intelligence"
aliases: [Pelican-Sim]
year: 2026
authors: [Shilong Zou, Shilin Zhang, Yingji Zhang, Yuhang Huang, Yi Zhang, Zeyuan Ding, Han Dong, Junwei Liao, Yong Dai, Jian Tang, Xiaozhu Ju]
venue: arXiv 2026-09-10 技术报告（cs.RO+cs.AI）
arxiv: "2609.12036"
pdf: 已下载（PDF/）
line: 世界模型
matrix_coords: 通用WM仿真器×少步蒸馏×具身智能
tags: [paper, 核心组命中, 世界模型, 敌情关注]
layer: 精化层（摘要级+摘要核实，PDF 待深读；wm-distill-fewstep 组命中）
---
# Pelican-Sim 1.0: A General World Model Simulator for Embodied Intelligence

> **中文速览**：做了什么——给具身智能造"通用世界模型仿真器"：从视觉上下文+机器人动作预测未来观测，支撑下游学习与决策。怎么做的——四大设计：①28 维统一动作空间覆盖主流本体（一个模型跨异构设备）；②动作-视觉注入（用 URDF+相机渲染的"动作视频"把动作和像素桥起来，跨本体/场景/任务可控性更好，PSNR +0.904）；③稀疏 MoE（给异构动力学加容量、吸收动作模态、减少模态间冲突，FVD −6.53）；④**因果化改造+少步蒸馏：35 步模型蒸馏到 4 步自回归仿真器，5.67 倍加速**。在约百万真实+仿真轨迹上训练，PSNR 全面超基线（AgiBotWorld +4.6/RoboMIND +2.1/RoboTwin +10.3）。效果——下游四应用：50 条演示+500 条 WM 生成轨迹把策略成功率 70%→93%；策略评估与真实成功率 Pearson 相关 0.994；动作选择相对增益 +47.7%、策略改进 +20.3%。

## 1. 一句话贡献
具身智能版"通用世界模型+少步蒸馏"全家桶：统一动作空间+渲染式动作注入+稀疏 MoE 吸收动作模态，再因果化+少步蒸馏（35→4 步）压出 5.67 倍速的可 rollout 仿真器，并实证 WM 当数据增广器/策略评估器/动作选择器三种下游用法全部有效。

## 2. 核心贡献
- **统一动作表征**：28 维动作值空间覆盖主流本体——一个模型服务异构设备，不用每台机器人重训。
- **动作-视觉注入**：把动作渲染成视频（URDF 骨架+相机视角）与观测拼接，动作-像素对齐从"数值条件"升级为"视觉条件"，可控性跨本体/场景/任务提升（PSNR +0.904）。
- **稀疏 MoE 骨干**：专家吸收异构动力学与动作模态，缓解模态冲突（FVD −6.530 vs 稠密骨干）。
- **少步蒸馏 rollout**：因果适配+蒸馏把 35 步生成压到 4 步自回归，5.67× 加速——**蒸馏目标仍是生成质量指标（PSNR/FVD）**。
- **下游三用法实证**：数据增广（70%→93%）、离线策略评估（Pearson 0.994）、动作选择（+47.7%）。

## 3. 方法概要（分步）
1. 数据：~100 万真实+仿真机器人轨迹。
2. 训练视频 WM 骨干（动作条件视频预测），动作以渲染视频形式注入。
3. 稀疏 MoE 层替换稠密 FFN：专家分工异构动力学/动作。
4. 因果化适配（自回归 rollout 友好）+ 少步蒸馏：35 步采样教师 → 4 步学生。
5. 下游消费：生成轨迹掺入演示做增广训练；用 WM rollout 评估策略 checkpoint；用 WM 预演挑动作。

## 4. 核心公式
（待 PDF 精读补全——摘要级暂记直觉）少步蒸馏目标是生成质量监督的浓缩：$$\mathcal{L} = \mathcal{L}_{\text{pixel/感知}}(\hat x_{1:4步}, x)$$ 类形态。**关键在"蒸馏什么"：它蒸的是"更少步数下复现像素级未来"，不蒸决策/控制信号**——4 步学生只需画得像，不需要会决策。这正是 E1 批判的"蒸馏目标只用像素/生成质量指标"在具身域的又一个大规模实例。

## 5. 与前作/矩阵关系
- ← 谱系：[Genie 2](/explore/10-Papers/09-世界模型与JEPA/Genie 2- A Large-Scale Foundation World Model（Genie 2）)（通用基础世界模型路线）、[Genie](/explore/10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）)（动作条件交互环境生成起点）。
- ↔ 像素级动作条件 WM：[DIAMOND](/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)（像素扩散 WM×游戏）——同"像素级动作条件生成"轴，域不同（机器人 vs Atari）。
- 蒸馏轴：[知识蒸馏](/explore/40-Concepts/知识蒸馏) + [KD 奠基](/explore/10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）)——其"35→4 步"属少步蒸馏族（同族的扩散少步化：一致性/渐进蒸馏谱系），概念卡蒸馏形态表可记一行"步数蒸馏×世界模型"。
- ↔ 下游评估用法：与 [RodForesight](/explore/10-Papers/09-世界模型与JEPA/RodForesight - A World Model Enhanced Diffusion Policy for Slender and Material Agnostic Rod Insertion（杆件插装）)（同日命中，WM 当预演评估器）互证"WM 评估策略"已成工程惯例——**而其评估有效的前提恰是 WM 保真未失：从反面提醒 E1 的问题意识（蒸馏后 WM 的决策保真塌缩）在具身域同样存在但被生成指标遮蔽**。

## 6. 影响后续
- 具身智能数据飞轮（WM 造数据→策略变强→更多数据）的基础设施化；动作-视觉注入可能成为动作条件化的新默认。
- 敌情位：**"WM 少步蒸馏"词面与 E1 同轴**，但其蒸馏对象=采样步数（不是把 WM 蒸进策略）、评估口径=PSNR/FVD（无决策保真）——格不撞；不过该团队若下一步在仿真器里加策略蒸馏/闭环控制，将进入邻格，需盯 6-8 周窗口。

## 7. 读前须知
- 前置：视频预测 WM 基本结构（[Genie](/explore/10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）) 先看）、稀疏 MoE 直觉（[DeepSeekMoE](/explore/10-Papers/05-MoE/DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）)）、蒸馏基础（[知识蒸馏](/explore/40-Concepts/知识蒸馏)）。
- 少步蒸馏部分可对照扩散少步化谱系理解；技术报告工程细节多，第 4 节公式待 PDF 深读补全。
