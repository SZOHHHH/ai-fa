---
type: paper
title: "GE-Act 2.0: Pretraining and Scaling a World-Action Model for Robotic Manipulation"
aliases: [GE-Act 2.0, Genie Envisioner Act 2.0]
year: 2026
authors: [AgiBot Research Team]
venue: arXiv 2026（项目页 ge-act-v2.github.io）
arxiv: "2609.05588v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [单步流生成(MeanFlow), 压缩潜变量(CoAE), 机器人操作(动作反推)]
tags: [paper, 占位层]
layer: 占位
---
# GE-Act 2.0: Pretraining and Scaling a World-Action Model for Robotic Manipulation

> **占位层卡**（daily 自动采集 2026-09-09 建卡，处理段已按 PDF 前 12 页速读补全七节；正式精读升级待批次）。元数据出自 arXiv API=已核实。

## 1. 一句话贡献
首个**全组件从零预训练**的机器人世界-动作模型（WAM）：单步流生成器一次前向产出完整未来视觉潜变量，再由逆动力学模型（IDM）反推动作；协同训练数据 300→30000 小时，零样本 OOD 成功率 17.1%→44.1%（G1-OP），给出 WAM 预训练缩放规律。

## 2. 核心贡献
- **CoAE（控制导向自编码器）**：64× 激进空间压缩（每帧仅 24 token）+ 像素重建 + 三冻结教师特征对齐（SigLIP2 语义 / V-JEPA2.1 时空 / DINOv3 稠密），动作恢复 MAE 只落后 DINOv3 13–31% 但 token 数只用 1/16；
- **SVP（单步视觉规划器）**：条件 MeanFlow——一次可微前向把噪声变成完整未来（稠密近程帧 + 稀疏远程帧双尺度），使动作梯度能穿过生成器回传，SVP 与 IDM 可各自在互补数据上**分离预训练**（SVP 吃无动作视频、IDM 吃无指令轨迹/失败尝试/部署 rollout）；
- **validity gap + KASO**：指出生成未来与录制动作属不同"结果模式"（条件独立配对）会让 IDM 均值回归、抹掉动作多模态；KASO 采 N 个候选未来、用当前 IDM 在**动作空间**判兼容性，只对 top-k 施加生成视频-动作损失；
- **缩放证据**：100 任务 / 20 技能组 / 双本体零样本 OOD 评测协议；技能覆盖与 OOD 成功强相关（Pearson r=0.80）；<2% 数据的第二本体提升 17.7 分（跨本体迁移）。

## 3. 方法概要
1. **编码**：CoAE 把多视角当前观测压成 4×6×512 潜变量（24 token/帧），压缩的同时保住"反推动作所需的信息"；
2. **规划**：冻结 VLM（Qwen3.5）联合读当前头部视角+指令做场景接地，逐层门控融合（式 5）后给 DiT 流生成器当条件；流生成器在条件 MeanFlow 框架下**一步**去噪出未来潜变量序列（稠密帧覆盖动作执行窗、稀疏帧覆盖到片段结束）；
3. **反推**：IDM 以交叉注意力读未来潜变量序列，联合本体感觉，输出稠密动作块（部署执行）+ 稀疏远期动作（训练辅助目标）；
4. **三阶段训练**：SVP 在无动作视频上预训练 → IDM 在无指令机器人轨迹上预训练 → KASO 联训（保留双方预训练损失 + 兼容候选选择）。

## 4. 核心公式
- CoAE 对齐损失：$L_{\text{align}}=\sum_{k=1}^{3}\lambda_k\left(1-\cos\left(g_k(z),\,G_k(o)\right)\right)$ —— 直觉：重建保外观、对齐保语义/时空/结构，三教师各管一摊，逼极限压缩后的潜变量仍"看得懂、控得了"；
- MeanFlow 平均速度：$u(z_t,r,t)=\frac{1}{t-r}\int_r^t v(z_\tau,\tau)\,d\tau$，一步采样即 $z_0=z_1-(1-0)\,u(z_1,0,1)$ —— 直觉：不学瞬时速度、学**区间平均速度**，一次前向从纯噪声直接跨到数据，天生单步且可微（对比：一致性蒸馏/少步蒸馏都要先养多步老师）；
- IDM 流匹配头：$\ell_{\text{FM}}(a;o,s,z)=\mathbb{E}_{t,\epsilon}\left\lVert v_\phi(a_t,t;o,s,z)-(\epsilon-a)\right\rVert^2$，其中 $a_t=t\epsilon+(1-t)a$ —— 直觉：把动作本身当生成对象（生成式 IDM），条件=当前潜变量+未来潜变量+本体感觉，**保多模态后验**（哪些按法都行时不会塌成均值）；
- validity gap 形式化：联训对 $(\hat z, a)$ 满足 $\hat z\sim p_\theta(z\mid o,c),\; a\sim p_{\text{data}}(a\mid o,s,c),\; \hat z\perp a\mid(o,s,c)$ —— 直觉：同一场景有多条合法完成方式，随机采样的未来可能演的是"另一种解法"，硬配录制动作等于让 IDM 学两个模式的平均。

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/世界模型]]（生成式路线向控制接口的延伸——WAM=世界模型+动作头）
- ← 方法基座：[[Mean Flows for One-step Generative Modeling（MeanFlow）]]（SVP=其条件化+多视角+掩码轨迹扩展）；CoAE 初始化自 DC-AE（128→512 通道，库内无卡）
- ≡ 同族机器人 WAM：[[LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies（LaWAM）]]（潜空间 WAM）；前身 GE-Act 1.0（并行动作支路，库内无卡，本代改为显式未来接口）
- ↔ 对照 [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）]]：同为"生成式 WM 出未来"，但域（机器人操作 vs 游戏 RL）、生成方式（从零单步流 vs 多步扩散）、下游（IDM 反推 vs 策略在 WM 内训练）三处全不同——**E1 主线正面对照位**
- 概念链：[[40-Concepts/逆动力学（IDM）]]（imagine-then-act 家族最新成员）· [[30-Formulas/条件流匹配损失]]（SVP 与 IDM 双双落在流匹配框架）

## 6. 影响后续
机器人 WAM "从零预训练+缩放规律"的旗舰证据（30k 小时数据、跨本体迁移、技能覆盖-成功相关）；确立"单步生成器=可微世界-动作接口"范式，IDM 可独立吃无标注轨迹预训练。对游戏域 WAM（DIAMOND 系）构成路线压力：单步从零 vs 多步蒸馏之争。
> 敌情备注（260909）：与 E1（少步生成轴：MeanFlow 从零单步=蒸馏之外的平行路线，无决策保真度量）与 E2（后验反推轴：IDM=p(a|o,s,未来视觉) 即 p(a|x_t,goal) 的机器人版）双轴近邻不撞车，详见晨报 260909 研判；其 IDM 头工程（流匹配动作头/动作恢复探针）与 KASO（生成未来×录制动作的模式失配警示）对两轨皆有直接参照价值。

## 7. 读前须知
[[30-Formulas/条件流匹配损失]]与[[20-Algorithms/流匹配]]（流生成基础）、[[Mean Flows for One-step Generative Modeling（MeanFlow）]]（平均速度场思想）、[[40-Concepts/逆动力学（IDM）]]（由果找因的可解性地图）、[[40-Concepts/ELBO]]/[[30-Formulas/VQ-VAE目标]]（自编码器潜空间一族）、动作多模态（同一目标多种完成方式→回归 vs 生成式头的差别）。
