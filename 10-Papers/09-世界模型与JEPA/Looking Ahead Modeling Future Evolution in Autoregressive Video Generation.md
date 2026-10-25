---
type: paper
title: "Looking Ahead: Modeling Future Evolution in Autoregressive Video Generation"
aliases: []
year: 2026
authors: [Ruopeng, Gao]
venue: 待核（占位层，来自 arXiv 2026-10-21）
arxiv: "2610.29989v1"
pdf: https://arxiv.org/pdf/2610.29989v1
line: 世界模型与JEPA
matrix_coords: 待评
tags: [paper, 占位层]
layer: 占位
---
# Looking Ahead Modeling Future Evolution in Autoregressive Video Generation

> **占位层卡**（daily 自动采集 2026-10-25 建卡，元数据出自 arXiv API=已核实；作者=南京大学+腾讯 ARC Lab）。本链 Claude 处理段已按⑦推荐读在线全文（arxiv.org/html/2610.29989v1）升级七节。

## 1. 一句话贡献

指出自回归视频扩散在 teacher forcing 下存在**连续性捷径**——相邻 chunk 时间冗余度高，局部视觉连续性足以支撑当前 chunk 去噪，模型不被逼着学"场景如何演化"——并提出 **FCP（Future Chunk Prediction）**辅助目标：用生成器中间表征预测**中间上下文被屏蔽的远处未来 chunk**，推理时辅助头全部丢弃零开销；物理合理性（Physics-IQ Verified）1.3B 上 IQ 27.6→30.9、5B 上 I2V 30.4→33.8/V2V 40.6→44.4，且训练算力低于 teacher-forcing 基线。

## 2. 核心贡献

- **FCP 辅助目标**：teacher-forced 去噪之外，让第 k chunk 隐状态 h_k 预测 k+Δ（Δ>1）未来 chunk，**中间 chunk 不可见**；监督直接来自训练视频，不需外部预训练编码器（对比 REPA/VideoREPA 系表征对齐路线）；
- **反捷径架构消融**：①并行而非链式辅助头（链式让中间未来信息沿链泄漏=新捷径，5B 下链式增益归零、V2V 无增益）；②辅助头**不给文本条件**（文本会泄露未来事件线索，IQ −1.1）；③只条件 h_k 不条件全历史 h_{≤k}（比 Next Forcing 省约 42.6%~50.7% 训练算力，IQ 打平）；clean/noisy 双源表征都课税（单源 +1.2/+2.3，双源 +3.3）；
- **表征结构化副产物**：FCP 训练后 query-token 相似度图空间更聚焦、时间上跟随内容运动（teacher forcing 则弥散到无关区域）——作者自认对自回归世界模型可能有价值。

## 3. 方法概要

1. 载体：Wan2.1-1.3B / Wan2.2-TI2V-5B 图生视频，chunk-causal 注意力 DiT，teacher-forced 流匹配训练（干净真值历史为条件，chunk=3 潜帧）；
2. 源表征：从生成器 4 个 DiT 层抽 chunk k 的双态特征（clean 历史态 h_k^clean + 噪声目标态 h_k^noisy），通道维拼接+两层 MLP 融合；
3. 辅助头：每个偏移 Δ 一个独立轻量 DiT（3 块，自生成器对应层初始化），token 级 AdaLN 注入融合特征；同 Δ 的 clean/noisy 源共享一套头；各 Δ **并行无横向信息流**（可跨 GPU 并行、可随时启停）；
4. 训练：teacher-forcing 损失 + 各 Δ 流匹配辅助损失联合优化（w_Δ=0.5），辅助损失反传穿过 h_k 回到生成器=给表征征"演化税"；每个 Δ 独立重采噪声与流时间；
5. 推理：**丢弃全部 FCP 模块**，rollout 与 teacher-forcing 基线完全一致（UniPC 50 步/chunk、CFG 3.0，无额外开销）；
6. 评测：Physics-IQ Verified 为主基准（参考式数值指标，不依赖 VLM 评分，198 样本×4 种子）+ WorldModelBench/PAI-Bench-G/PhyGround（VLM 评审类，增益较温和）；训练数据=内部视频+WISA-80K，无物理仿真器数据。

## 4. 核心公式

**FCP 目标（eq.5→eq.6）**：标准 next-chunk 建模 `$p(\mathbf{x}_{k+1}\mid \mathbf{x}_{\le k},\mathbf{c})$`，FCP 要求同一上下文支撑更远目标 `$p_{\mathrm{FCP}}(\mathbf{x}_{k+\Delta}\mid \mathbf{x}_{\le k},\mathbf{c}),\ \Delta>1$`，实现上刻意收窄条件为只看第 k chunk 隐状态 `$p_{\mathrm{FCP}}(\mathbf{x}_{k+\Delta}\mid \mathbf{h}_{k})$`（去掉文本与全历史）。

**联合损失（eq.7）**：`$\mathcal{L}_{\mathrm{total}}=\mathcal{L}_{\mathrm{TF}}+\sum_{\Delta\in\mathcal{D}} w_{\Delta}\,\frac{\mathcal{L}_{\Delta}^{\mathrm{clean}}+\mathcal{L}_{\Delta}^{\mathrm{noisy}}}{2}$`

**直觉解释**：`$\mathcal{L}_{\mathrm{TF}}$` 是"看着紧邻上文做去噪"——连续性捷径就能应付；`$\mathcal{L}_{\Delta}$` 是"蒙住中间帧猜远处"——局部连续性帮不上忙，唯一出路是 `$\mathbf{h}_k$` 真正编码"接下来会怎么演化"。辅助损失反传穿回生成器，等于给主干表征**征演化税**；推理时收税官（辅助头）全部撤走，只留下被税出来的好表征。双源=历史信息与去噪过程两种角色都被课税；并行头=堵死"中间未来信息沿链下传"的第二条捷径。

## 5. 与前作/矩阵关系

- 线锚：[[20-Algorithms/世界模型]]（自回归视频扩散=生成式世界模型主线之一）· [[20-Algorithms/流匹配]]（主损失与辅助损失同为流匹配目标）· [[30-Formulas/条件流匹配损失]]
- ← 前身：[[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]]（teacher-forced chunk 去噪范式——FCP 正是给它打"防捷径"训练侧补丁）· Wan 系视频扩散骨干（载体，未入库）
- ≡ 同族：[[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）]]（同攻 teacher forcing/蒸馏病理：CF 修**蒸馏架构**（单射性），FCP 修**训练监督**（未来预测税），正交可叠加）· [[10-Papers/09-世界模型与JEPA/minWM- 全栈实时交互世界模型框架（minWM）]] · [[10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）]]（实时交互 WM 家族邻位）· [[10-Papers/02-生成建模与扩散/AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）]]（加速轴：蒸馏少步 vs 训练监督，互不排斥）
- ⊃ 泛化谱系：未来预测辅助监督 ↔ DeepSeek-v3 MTP 多 token 预测（其链式版被本文以泄漏论证证伪）；表征正则化 ↔ REPA/VideoREPA（外部预训练编码器对齐版——FCP 用数据内生的未来 chunk 替代，免编码器可随数据扩）

## 6. 影响后续


## 7. 读前须知

流匹配基础（[[30-Formulas/条件流匹配损失]]：线性插值路径与速度目标 `$\epsilon-\mathbf{x}$`）；chunk 级自回归因子分解（[[40-Concepts/马尔可夫链]]：rollout 即逐步条件展开）；表征相似度图只需余弦相似度直觉。原文：https://arxiv.org/pdf/2610.29989v1；在线全文：https://arxiv.org/html/2610.29989v1
