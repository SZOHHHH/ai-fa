---
type: paper
title: "Reconstructing Is Not Acting: Action-Centric Latent Dynamics Modeling"
aliases: [ACT-LAM, 重构非行动, Action-Centric Latent Dynamics Modeling]
year: 2026
authors: [Dingjie Fu, Dianxing Shi, Yangyang Xu, Jun Yu]
venue: arXiv 2609.15189（2026-09-14，哈工深+北航）
arxiv: "2609.15189v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: E2 邻格（LAM/IDM 设计层，潜空间无扩散无后验）
tags: [paper, 精读层, E2哨兵, 每日推荐260917]
layer: 精读
---

# Reconstructing Is Not Acting: Action-Centric Latent Dynamics Modeling

> **精读层卡**（260917 每日推荐深读升级，原占位卡 2026-09-17 采集建卡）。

## 1. 一句话贡献
指出现有潜动作模型（LAM）存在根本性的**重构-动作失配**——重构误差更低并不带来更好的潜动作/潜动力学/下游规划——并归因于 IDM"提取"与 FDM"利用"两个欠约束自由度，用**动作查询 IDM（AQ-IDM）+动作 token FDM（AT-FDM）**双侧加强动作中心性：55M 轻量模型在 VP² 视觉规划聚合成功率超前 SOTA（DiLA）7.6%。

## 2. 核心贡献
- **失配实证与归因**：PlainLAM 重构损失最低却规划最差（Fig 1）；两个欠约束——(i) 重构目标分不清"动作相关转移"与"外观干扰"，IDM 会把两者都编码进潜动作；(ii) 重构不约束 FDM 对潜动作的依赖度，FDM 可走"当前状态的预测捷径"绕开动作仍重构得很准。
- **AQ-IDM（提取侧）**：M 个可学习动作查询做选择性读出——action-to-patch 注意力+门控聚合，**不用 VQ/容量正则的强信息瓶颈**（瓶颈只会间接逼动作相关，还可能把与外观纠缠的动作线索一起丢掉）。注意力图从 $$(2N+1+M)^2$$ 降为 $$MN$$。
- **AT-FDM（利用侧）**：潜动作投影为动作 token，经 L 个动作条件块（ACB）与**演化的状态表征共同更新**（FiLM 式调制+可学习标量门）——动作条件从"固定注入"变为"持续状态感知"。
- **轻量化**：砍掉 ST-Transformer 特征处理，总参 55M vs DiLA 123M；仅 teacher-forcing 训练（DiLA 需 rollout 微调）。

## 3. 方法概要
1. 冻结 DINOv2 视觉编码器抽前后帧特征 $$f_t,f_{t+1}$$，轻量 dynamics adapter 编码为状态 token $$s_t$$；
2. **AQ-IDM**：对转移差分 $$\Delta s_t = s_{t+1}-s_t$$ 编码为空间 patch token，M 个动作查询做 action-to-patch 注意力（只查不混）→ query mixer/temporal mixer → 门控聚合为**连续**潜动作 $$z_t$$（无量化、无容量正则）；
3. **AT-FDM**：$$z_t$$ 投影为初始动作 token $$a_t^0$$，与状态 token 串联过 L 个 ACB——每块先自注意力于 [状态;动作] 联合序列，再用动作 token 生成的 $$(\gamma,\beta)$$ FiLM 调制状态、状态又反哺动作 token 更新，共演化 L 轮；
4. 末块状态投影出**残差预测** $$\Delta\hat s_t$$，RAE 解码器重构未来帧特征；
5. 五项损失联合训练（重构/状态残差/动作一致性/前后向对称/动作多样性），全程 teacher-forcing；
6. 下游：VP² 协议——冻结 IDM 提潜动作，学 MLP 把真动作映入潜空间后微调 FDM，MPPI 采样规划。

## 4. 核心公式
- LAM 骨架：$$z_t = I_\phi(s_t, s_{t+1})$$，$$\hat s_{t+1} = s_t + \Delta\hat s_t$$，$$\Delta\hat s_t = F_\theta(s_t, z_t)$$——IDM 由果找因、FDM 只预测**残差**（大势由当前态承载，动作只解释变化量；见 [逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)）。
- 唯一自由监督：$$\mathcal{L}_{\text{rec}} = \lVert f_{t+1} - \hat f_{t+1} \rVert_2$$——直觉：无动作标注时重构是唯一损失，但它**既不指定 IDM 该提取什么、也不指定 FDM 该用动作用多深**，失配的病根在此。
- 查询读出：$$A_t = \text{Softmax}\big((QW_q)(E_tW_k)^{\text{T}}/\sqrt{d_k}\big)$$，$$H_t = A_t(E_tW_v)$$——M 个查询各自盯住空间转移 patch 中的动作相关区域（注意力热图实证聚集在显著运动区），是 DETR/BLIP-2 查询血统搬进动力学（见 [注意力机制](/ai-fa/explore/40-Concepts/注意力机制)）。
- 门控聚合：$$\alpha_t = \text{Softmax}(g(\tilde H_t))$$，$$z_t = f_{\text{action}}(\alpha_t^{\text{T}} C_t)$$——各查询捕获互补线索后软加权合并，**选择性来自聚合而非压缩**。
- 动作调制：$$s_t^{l+1} = \tilde s_t^l + \sigma(g^l)[\gamma_t^l \odot \text{LN}(\tilde s_t^l) + \beta_t^l] + \text{FFN}_s(\tilde s_t^l)$$，其中 $$(\gamma_t^l,\beta_t^l) = h(\tilde a_t^l)$$——动作 token 逐块生成 FiLM 仿射参数调制状态、门控 $$g^l$$ 控深度，动作信息随状态演化持续注入。
- 验钞机正则：$$\mathcal{L}_{\text{act}} = \text{SmoothL1}\big[I_\phi(s_{t+1}-s_t) - I_\phi(\hat s_{t+1}-s_t)\big]$$——真转移与预测转移应反推出**同一个**潜动作（动作一致性），把 IDM 自己变成 FDM 的质检员。

## 5. 与前作/矩阵关系
- ← 范式地基：[LAPA](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Latent Action Pretraining from Videos（LAPA）)（潜动作预训练本源）·[Genie](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）)（latent action 概念源头）
- ↔ 直接对照：DiLA（前 SOTA：结构压缩+AdaLN-zero 固定条件化+需 rollout 微调）·CoMo（连续潜动作同路但全局自注意力+固定条件化）·[FLAM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Factored Latent Action World Models（FLAM）)（因子化潜动作，AdaLN-zero 族）
- ↔ 命题同盟：[Decision-Metric Alignment](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning)（潜 WM 诊断指标与决策指标脱节的同命题）·[GIFT](/ai-fa/explore/10-Papers/09-世界模型与JEPA/GIFT Guided Intermediate Feature Training via Action-Oriented Structural Supervision for Robotic Man)（动作导向表征监督同族）
- 线锚：[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）) ·[世界模型](/ai-fa/explore/20-Algorithms/世界模型) ·[注意力机制](/ai-fa/explore/40-Concepts/注意力机制)

## 6. 影响后续
- 设计范式转移信号：LAM 的 IDM 从"信息瓶颈逼动作相关"（VQ/容量正则）转向"查询选择性读出"（保留富表征、聚合时才做选择）——潜动作质量与重构质量解耦的正式化。
- 为 VLA 预训练提供更干净的潜动作监督（SSv2/RT-1/RECON/LoopNav 预训练→VP² 迁移），轻量化（55M/CPU 级 FLOPs）利于具身端侧部署。
- 对本库：E1/E2 引言的**外部同盟证据**——"重构/生成指标不预测动作质量"在 LAM 域的正式实证（Fig 1 三指标失联+Tab 4 重构弱但规划强），与本库"像素指标不保决策"命题跨域互证；E2 引用矩阵 IDM 设计轴新增"查询读出"支线。

## 7. 读前须知
- 前置：[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（正逆动力学镜像与良定义性——本文 k=1 帧对版，确定动态下点估计合理，多峰场景未处理）·[注意力机制](/ai-fa/explore/40-Concepts/注意力机制)（learnable query 读出，DETR object query/BLIP-2 Q-Former 血统）·teacher forcing vs rollout 训练之分。
- 评测口径：VP² benchmark（RoboDesk 5 任务+RoboSuite，MPPI 采样规划，聚合成功率按模拟器上限归一）；linear probing MSE/Push-T、奇异值谱（RankME）量潜动作质量；"动作利用率"实验=冻 IDM 换 FDM 后用常数动作替换真动作测 MSE 增幅。
- 读时提醒：其潜动作是**连续向量点估计**（无后验无 goal 条件），与 E2 的全后验反推不同格；长视野 rollout MSE 与生成指标并不占优——作者明言这正是论点（重构强≠动力学强）。
