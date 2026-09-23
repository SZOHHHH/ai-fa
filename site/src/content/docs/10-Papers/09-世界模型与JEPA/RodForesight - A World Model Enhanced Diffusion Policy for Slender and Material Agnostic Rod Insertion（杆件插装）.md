---
type: paper
title: "RodForesight: A World Model Enhanced Diffusion Policy for Slender and Material Agnostic Rod Insertion"
aliases: [RodForesight]
year: 2026
authors: [Chuanbo Yu, Mingyu Yue, Yan Lyu, Chuhan Song, Peng Wang]
venue: arXiv 2026-09-10（cs.RO，山东大学系）
arxiv: "2609.12103"
pdf: 已下载（PDF/）
line: 世界模型
matrix_coords: WM×扩散策略×机器人装配（制造域）
tags: [paper, 核心组命中, 世界模型]
layer: 精化层（摘要级+摘要核实，PDF 待深读）
---
# RodForesight: A World Model Enhanced Diffusion Policy for Slender and Material Agnostic Rod Insertion

> **中文速览**：做了什么——精密制造里的细长杆插孔（毫米级直径+小间隙），刚体假设失效（杆会弯，尖端运动依赖杆形/抓持/材质/接触）；提出 RodForesight 把任务分解为"粗接近→预测式插入"两阶段。怎么做的——插入阶段 diffusion policy 生成候选动作块（action chunks），**动作条件世界模型在执行前预测每个候选块对"杆-孔对齐"的影响**（倾斜误差/径向误差），按预测效果选最优块再执行。效果——成功率 88.9%→96.7%（对比 diffusion policy 等基线），两阶段可端到端打包。

## 1. 一句话贡献
把世界模型当"预执行评估器"用：扩散策略出候选、WM 先在想象里预演对齐效果、挑最好的执行——用想象中的预测误差替代真实试错，细杆插装成功率 88.9%→96.7%。

## 2. 核心贡献
- **任务分解**：粗接近（视觉伺服把多样初始状态收敛到近孔交接区）+ 预测式插入（精细对齐完成插装），两阶段可端到端联合训练。
- **WM×扩散策略的分工结构**：扩散策略负责"生成多样候选动作块"，动作条件 WM 负责"给每块打预演分"（预测倾斜/径向误差）——生成与评估解耦。
- **材质无关性**：对可弯曲杆件的材质/形变不做刚体假设，形变由 WM 隐式预测。

## 3. 方法概要（分步）
1. 粗接近阶段：视觉伺服策略把不同初始构型统一送到孔口附近的交接区域。
2. 插入阶段：diffusion policy 生成一批候选动作块（利用扩散采样的多样性）。
3. 每个候选块送入动作条件 WM，预测执行后杆-孔的倾斜误差与径向误差。
4. 取预测误差最小的候选块真实执行；循环直至插装完成。
5. 端到端变体：两阶段联合可微打包训练。

## 4. 核心公式
（待 PDF 精读补全——摘要级暂记直觉）选择规则形如 $$a^\* = \arg\min_{a \in \text{候选块}} \; \hat{e}_{\text{tilt}}(s, a) + \hat{e}_{\text{radial}}(s, a)$$，其中两个 $$\hat e$$ 是 WM 预测的对齐误差：**策略给出"怎么做"的选项菜单，WM 当裁判在想象里试吃每道菜——用模型预测的物理量替代真实执行的代价**。这与 MPC 的代价函数评估同构，但候选来自扩散策略而非参数化控制序列。

## 5. 与前作/矩阵关系
- ↔ 机器人 WM 族：[GE-Act 2.0](/explore/10-Papers/09-世界模型与JEPA/GE-Act 2.0 Pretraining and Scaling a World-Action Model for Robotic Manipulation)（世界-动作统一预训练）、[GIFT](/explore/10-Papers/09-世界模型与JEPA/GIFT Guided Intermediate Feature Training via Action-Oriented Structural Supervision for Robotic Man)（动作导向结构监督）——同"机器人操作×动作条件预测"格，RodForesight 特点是 WM 只做评估不做生成训练信号。
- ↔ E2 对偶位：[逆动力学（IDM）](/explore/40-Concepts/逆动力学（IDM）)——RodForesight 是**正演**评估器 p(对齐效果 | 状态, 动作)，E2 反推 p(a | x_t, goal) 是**反演**；一正一反共享"用模型内知识连接动作与目标状态"的问题结构。E2 论文 related work 可引作正演侧对照。
- ↔ 想象评估谱系：[Dreamer](/explore/10-Papers/09-世界模型与JEPA/Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）)（在想象中训练策略）——RodForesight 是"在想象中做选择"，想象用途从训练挪到决策。
- ↔ 同族续接（260915）：[WAM 挖掘](/explore/10-Papers/09-世界模型与JEPA/From Prediction to Decision - World-Model-Guided Action Selection for Continuous Pile Excavation（挖掘WAM）)——"扩散提案+WM 预演筛选"第二例（连续堆料耗尽+真机部署，matched-candidate 消融隔离选择规则贡献，实证更干净）。

## 6. 影响后续
- "扩散策略生成 + WM 预演筛选"的可移植结构：任何需要候选评估的连续控制任务都能套。
- 对库内：制造域外缘参考，不进 E1/E2 主线叙事；占"WM×扩散策略×装配"格。

## 7. 读前须知
- 前置：diffusion policy 的去噪采样直觉（可借 [DIAMOND](/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）) 的扩散基础）、MPC 中"模型预测代价评估"思想。
- 机器人术语（视觉伺服/构型）只需字面理解；公式细节待 PDF 深读补第 4 节。
