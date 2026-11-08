---
type: paper
title: "Compression Forcing: Hierarchical History Tokenization Enables Flexible World Models"
aliases: [Compression Forcing, CF]
year: 2026
authors: [Siqiao Huang, et al.]
venue: arXiv 2026（2611.02 提交；cs.CV/cs.LG）
arxiv: "2611.04028v1"
pdf: https://arxiv.org/pdf/2611.04028v1
line: 世界模型与JEPA
matrix_coords: [历史token化压缩(部分压缩=部分掩蔽), 显式像素/潜帧扩散WM, 游戏模拟+机器人+Real2Sim策略评估]
tags: [paper]
---
# Compression Forcing（CF）：部分压缩即部分掩蔽的分层历史 token 化世界模型

> 中文速览：提出 Compression Forcing：世界模型的历史压缩应服务「预测效用」而非视频生成的「感知保真」，用「部分压缩=部分掩蔽」取代 Diffusion Forcing 的「部分加噪=频率低通」。三件套：①DAT 动态感知分词器——把历史压成 L 个因果 slot token，双目标训练（前缀→整段静态重建、前缀+当前帧→未来残差预测）且权重随 token 位次单调增，梯度竞争把动态信息自组织排到前段、静态细节沉到后段；②前缀条件扩散骨干——滑窗编码历史，每窗随机截断预算 l_t~U[0,L] 训练任意前缀长度条件化，动作与噪声经 AdaLN 注入；③HG-H 分层历史引导——推理期组合不同前缀长度的 score，放大动态关键历史。效果：Kinetics-600 预测 FID 88.13（SD-VAE 90.57）；CS:GO 游戏模拟 5.5M 帧 FVD 123.0（DIAMOND-HQ 368.5/DIAMOND-Fast 577.1）；RT-1 机器人 FVD 101.5（DIAMOND 382.4、Dreamer 4 984.1）；Real2Sim 策略评估最忠实保持 4 个 RT-1 策略的真实成功率排名（SD-VAE 会反转排名），目标点追踪人类偏好胜率 48.4%。

## 1. 一句话贡献

用「部分压缩=部分掩蔽」取代 Diffusion Forcing 的「部分加噪=频率低通」——历史先被动态感知分词器（DAT）压成按动态显著性排序的 token 序列，截断前缀即信息量可控的历史压缩；配合任意前缀条件训练与推理期分层历史引导（HG-H），把「压缩多少历史、用多少历史」变成训练一次、推理自由调节的旋钮，在视频预测/游戏模拟/机器人操作三域全面超越 SD-VAE、ElasticTok、DIAMOND、Dreamer 4 等基线。

## 2. 核心贡献

- **原则升级**：指出 WM 从视频生成继承的 token 化与条件化以感知保真为目标、与预测效用错配（视觉噪声与任务无关背景挤占表征预算）；提出「部分压缩=部分掩蔽」——DF 的部分加噪等价于频率低通（保低频静态），CF 改在动态显著性排序的 token 序列上截断前缀，历史操纵与预测目标对齐；
- **DAT 分层 token 化**：ViViT 编码器+L 个因果 slot token；静态重建（前缀→整段）+动态预测（前缀+当前帧→未来残差）双目标，权重 ω(m) 随位次单调增——「前段动/后段静」的排序由梯度竞争自组织涌现；
- **前缀条件骨干**：滑窗 DAT 编码+每窗随机截断预算 l_t~U[0,L]（任意前缀长度都在训练分布内）；CDiT 骨干，历史走 cross-attention，动作与噪声水平走 AdaLN；
- **HG-H 推理期引导**：分层组合不同前缀长度的 score，CFG 式放大「动态领先」前缀的贡献——不改权重、推理时自由调历史用量；
- **决策保真评估先例**：Real2Sim 策略评估（4 个 RT-1 策略×50 rollouts 比真实成功率排名）：CF=2/54/64/40 vs 真实=0/70.4/81.5/51.9——唯一保持排名且最接近 y=x；感知质量更好的 SD-VAE 反而把排名反转（36 vs 32）。附录 A 线性理论：未来残差（变化量）的低秩投影对预测的主导性优于原始帧投影。

## 3. 方法概要

1. **病理定位**：视频生成的 token 化/条件化服务感知保真；WM 需要的是「压缩掉 nuisance、保住影响未来的动态」——两者目标错配；
2. **DAT 训练**：历史 clip 经 ViViT 编码器进 L 个因果 slot token；每个 token 位次上按 schedule 混合两个目标——静态目标（该前缀重建整段 clip）与动态目标（该前缀+当前帧预测未来帧，残差学习）；ω(m) 随位次单调增→早期位次动态主导、后期静态主导，排序自组织；
3. **骨干训练**：滑窗 DAT 编码历史序列，每个窗口随机采截断预算 l_t~U[0,L]（保留前 l_t 个 token）；CDiT 去噪未来块，历史 token 经 cross-attention 注入，动作 a 与噪声水平经 AdaLN 注入——「历史信息量」轴在训练期被均匀覆盖；
4. **HG-H 推理**：对同一噪声状态用不同前缀长度各出一次 score，分层组合（长前缀=全信息基线、短前缀=动态聚焦）放大动态关键历史的贡献——推理期可调的「历史用量」旋钮；
5. **三层评测**：Kinetics-600 视频预测（感知）→CS:GO 5.5M 帧自播模拟（交互）→RT-1 机器人操作（跨域）+Real2Sim 策略评估与目标点跟踪（决策保真）。

## 4. 核心公式

$L_{\mathrm{DAT}}=\mathbb{E}_{m}\left[\omega(m)\,L_{\mathrm{static}}(m)+\left(1-\omega(m)\right)\,L_{\mathrm{dyn}}(m)\right]$

**直觉解释**：m 是 token 位次，ω(m) 随 m 单调增——位次越靠前，静态重建权重越低、动态预测权重越高。两类梯度在同一批位次上竞争：想当好「动态预测者」的 token 被挤到前段，安于「静态细节」的沉到后段——重要性排序不是人工标注而是 schedule 诱导的自组织（与课程学习同型机制）。截断前缀=按重要性丢信息，前缀长度就是压缩率。

$p_\theta\left(x_{t+1}\mid z_{\le l},\,a_t\right),\quad l_t\sim U[0,L]$

**直觉解释**：训练时每个滑窗随机采前缀长度 l_t（0 到 L 均匀），把「历史信息量」这条轴整个照亮——推理时任取一个压缩率都不出训练分布。截断=掩蔽=压缩，三个词是同一个操作：这就是「部分压缩即部分掩蔽」的训练层落点（DF 的部分加噪则是在像素/频率空间做同等事，且其掩蔽方向由频率决定而非预测效用决定）。

$s_{\mathrm{HG}}=s\left(l_{\mathrm{long}}\right)+\lambda\left[\,s\left(l_{\mathrm{short}}\right)-s\left(l_{\mathrm{long}}\right)\,\right]$（记号统一写法，原文分层组合的精确形式见其方法节）

**直觉解释**：与 CFG「有条件−无条件之差」完全同构：长前缀 score=全信息基线，短前缀 score=动态聚焦，两者之差隔离出「动态关键历史」的贡献方向；放大它=推理期把注意力压到历史上真正影响未来的部分。CFG 放大提示遵从、HG-H 放大历史遵从——同一个外挂引导算子换了对比维度。

## 5. 与前作/矩阵关系

- ← 直接前身与对话对象：[[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）|Diffusion Forcing]]（CF 的「部分压缩=部分掩蔽」点名取代其「部分加噪」——命名即立场：同为「部分可观测历史」操纵，掩蔽维度从频率换成预测效用排序）；
- ↔ 基线：[[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]（CS:GO FVD 123.0 vs 368.5、RT-1 101.5 vs 382.4——游戏像素扩散 WM 家族的新 SOTA 点）与 Dreamer 4（RT-1 984.1）；
- ≡ 「历史如何条件化」家族 2611 月更级新作：[[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]/[[10-Papers/09-世界模型与JEPA/History Forcing Distilling History-Dependent Continuations for Long-Horizon Video World Models|History Forcing]]（HF 改蒸馏目标、CF 改历史表征——同月两作分占历史条件化的两个部件）/[[10-Papers/02-生成建模与扩散/Mix Forcing Causal Pre-Training via Mixture Attention for Interactive World Models|Mix Forcing]]；
- ≡ 视频分词器主线：[[10-Papers/09-世界模型与JEPA/Rethinking Video Autoencoders for Interactive World Models]]/[[10-Papers/09-世界模型与JEPA/VideoTok4D - A 4D-Aware Video Tokenizer for Compact World Representation（4D视频分词器）|VideoTok4D]]（「为 WM 重新设计分词器」主线上的动态显著性版）；记忆侧近邻 [[10-Papers/09-世界模型与JEPA/EDELINE- Enhancing Memory in Diffusion-based World Models via Linear-Time Sequence Modeling（EDELINE）|EDELINE]]、[[10-Papers/09-世界模型与JEPA/WorldDynCache- Risk-Controlled Latent Dynamics Approximation for Diffusion World Models（WorldDynCache）|WorldDynCache]]（同样在做「历史信息分级使用」，CF 用排序+截断、EDELINE 用线性时序记忆、WorldDynCache 用风险控制近似）；
- 线锚：[[20-Algorithms/世界模型]] · [[20-Algorithms/扩散模型]]；
- 概念/公式链：[[30-Formulas/无分类器引导（CFG）]]（HG-H 的形式母体）、[[40-Concepts/JEPA联合嵌入预测架构]]（「压缩服务预测效用而非感知重建」=JEPA 立场在扩散 WM 的回声）、[[40-Concepts/注意力机制]]（slot token 的因果注意力载体）。

## 6. 影响后续

- 「部分可观测历史」的操纵维度从噪声级（DF）升级为信息效用级（CF）：此后「历史压缩率」成为 WM 的显式设计轴——推理时可调、训练时可课程化；
- 为「WM 分词器该为预测效用服务」立论：视频分词器家族（Rethinking Video Autoencoders/VideoTok4D 一线）新增动态显著性排序这一分支；
- Real2Sim 策略评估协议（多策略×多 rollout 比成功率排名）为「WM 评测必须看决策指标」提供了可复用模板——生成指标（FVD）与决策保真（排名保持）会背离（SD-VAE 现象）；

## 7. 读前须知

- **必前置**：[[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）|Diffusion Forcing]]（不懂「部分加噪」就读不出「部分压缩」的对位升级）、[[30-Formulas/无分类器引导（CFG）]]（HG-H 的形式母体）、[[40-Concepts/注意力机制]]（slot token/因果注意力）；
- **易混点**：①「压缩」发生在 token 空间（截断排序后的前缀），不是像素/频率空间——与 DF 的部分加噪（频率低通）是两个空间里的同类操作；②DAT 的排序是训练出来的（schedule 诱导自组织），不是按光流/运动分数标注的；③HG-H 是推理期 score 组合，不改任何权重——与「训练期引导内化」路线（如 CAViLD 的 EMA 教师内化 CFG）相反方向；④Real2Sim 是评估协议，决策保真没有进任何训练目标；
- **读法建议**：图 1（部分加噪 vs 部分压缩对位图）→ DAT 双目标与 schedule → 主表（K600/CS:GO/RT-1 三域）→ Real2Sim 节（排名保持实验=全文最有信息量的一节）→ 附录 A（残差投影线性理论）。

> 原文：https://arxiv.org/pdf/2611.04028v1 ｜ 在线全文：https://arxiv.org/html/2611.04028v1

---

> 谱系枢纽：[[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）|Diffusion Forcing]]（图谱连通入口）

> 近邻同族：[[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]] · [[10-Papers/09-世界模型与JEPA/History Forcing Distilling History-Dependent Continuations for Long-Horizon Video World Models|History Forcing]] · [[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]] · [[10-Papers/09-世界模型与JEPA/EDELINE- Enhancing Memory in Diffusion-based World Models via Linear-Time Sequence Modeling（EDELINE）|EDELINE]] · [[10-Papers/09-世界模型与JEPA/WorldDynCache- Risk-Controlled Latent Dynamics Approximation for Diffusion World Models（WorldDynCache）|WorldDynCache]]

> 数学根基：[[30-Formulas/无分类器引导（CFG）]] · [[40-Concepts/注意力机制]] · [[40-Concepts/JEPA联合嵌入预测架构]] · [[20-Algorithms/世界模型]]
