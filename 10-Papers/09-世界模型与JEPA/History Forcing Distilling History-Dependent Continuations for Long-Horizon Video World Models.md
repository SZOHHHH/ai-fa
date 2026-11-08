---
type: paper
title: "History Forcing: Distilling History-Dependent Continuations for Long-Horizon Video World Models"
aliases: [History Forcing, HF]
year: 2026
authors: [Hangyi Kuang, Chengzhi Wang, Yefei He, Weijie Wang, Yuke Zhao, Zhuokun Chen, Zisu Huang, Yifan Yang, Xiaoxuan He, Feng Chen, Bohan Zhuang]
venue: arXiv 2026（2611.02 提交，cs.CV；浙大+微软亚研+莫纳什+阿德莱德，Zhuang 组）
arxiv: "2611.02782v1"
pdf: https://arxiv.org/pdf/2611.02782v1
line: 世界模型与JEPA
matrix_coords: [少步AR蒸馏(历史对比残差), 显式像素, 世界模型评测(PlayWorld/MemoBench)]
tags: [paper]
---
# History Forcing（HF）：少步 AR 视频扩散的历史对比残差蒸馏

> 中文速览：针对少步自回归视频扩散长 rollout 的一致性漂移（主体/场景离视野后再现易走样），提出 History Forcing：让 AR teacher 对同一噪声学生块分别「带历史/不带历史」各预测一次，取两者 score 之差作为历史约束残差，按 CFG 式加权叠加到蒸馏参考目标上——历史监督与画质监督解耦（避免 AR teacher 画质弱拖累学生）。历史来源两种：长视频用学生自己更早的块（累积漂移更小），离视野世界建模用固定视角 teacher rollout（学生看别处时教师盯住场景演化）。效果：1.3B 模型 VBench 85.07（15s）/VBench-Long 79.82（60s 外推，训练 rollout 仅 ≤15s，超 14B teacher 系方法）；PlayWorld 离视野子集演化质量 2.35→2.70、MemoBench 物体一致性 58.43→62.18；训练开销仅 +2.3% 时间/+2.0% 显存。

## 1. 一句话贡献

用「AR teacher 带史/无史两次预测的 score 差」作为历史约束残差、以 CFG 式外挂修正 DMD 蒸馏目标——把长程历史一致性从生成画质监督里**解耦**出来（破 history–quality coupling），1.3B 学生 60s 外推逼近 5B 模型，且离视野世界建模的场景演化与回访一致性显著提升。

## 2. 核心贡献

- **病理命名与诊断**：history–quality coupling——双向 teacher 画质强但预测不含远历史；AR teacher 带历史但画质弱，直接蒸其全条件分布会把弱点传给学生。既有工作（Context Forcing/Context-Matched Distillation/OPSD-V）对历史的利用仍是隐式的；
- **对比残差算子**：同一加噪学生块上，AR teacher「带 h/不带 h」两次预测之差（乘 λ）叠加到双向参考 score——只要 teacher 对历史的敏感度方向，不要它的分布本身；CFG 形式，可无缝嵌进 DMD 与 on-policy 自蒸馏；
- **两套历史构造策略**：长视频=学生 rollout 更早的连续块（漂移小；消融证明优于 sink 帧）；离视野=固定视角 teacher rollout（特权观察：学生看别处时教师盯住场景），后者监督 revisit chunk 的演化；
- **实证规模**：VBench 85.07（15s，1.3B 组最高）；VBench-Long 79.82（60s，1.3B+1.3B teacher 超用 14B teacher 的 Rolling Forcing 79.22/LongLive 79.12，逼近 5B LongLive-2.0 的 79.90）——训练 rollout 只用 ≤15s；PlayWorld 离视野子集 4 指标全优（演化质量 2.70、主体一致性 2.98）、MemoBench Real 9 指标全升（物体一致性 62.18）。

## 3. 方法概要

1. **底座**：学生=Causal Forcing 因果 ODE ckpt 初始化（4 SDE 步/chunk），双向 DMD teacher+fake score 从 Wan2.1-T2V-1.3B 初始化，AR teacher=Causal Forcing 多步 AR ckpt（5s，可再在 10s 上微调）；
2. **对比残差**：对当前 chunk $x_0^i$ 取额外历史 $h^i$（长视频：共享近况 6 帧之外再前推 12 帧；两个 teacher 输入共享这 6 帧保证连续性），AR teacher 带史/无史各预测一次，得 $s_{\mathrm{AR}}^{+}/s_{\mathrm{AR}}^{-}$；
3. **修正目标进 DMD**：$s_{\mathrm{HF}}$ 替换参考 score，学生 rollout 用推理期采样程序生成（on-policy），监督只加在每步随机抽的 1 个合格 chunk 上（省开销）；
4. **世界模型分支**：沿 OPSD-V 用 EMA teacher 的 velocity 预测做同型修正（$v_{\mathrm{EMA}}^{-}+\lambda(v_{\mathrm{EMA}}^{+}-v_{\mathrm{EMA}}^{-})$，MSE 回归，LoRA 100 步微调 DreamX-World-5B）——少步生成器不是好的 score teacher，但 EMA 速度目标可用；
5. **超参要点**：长视频 λ=1、只在 t<750 低噪段监督（τ=500 更好）；世界模型 λ=3、全部 4 个去噪步都监督；残差与 DMD 梯度**联合归一化**（否则 Dynamic Degree 从 78 掉到 60）。

## 4. 核心公式

$s_{\mathrm{HF}}=s_{\mathrm{ref}}+\lambda\left(s_{\mathrm{AR}}^{+}-s_{\mathrm{AR}}^{-}\right)$

**直觉解释**：CFG 的完美类比——CFG 是「有提示/无提示」预测之差放大提示遵从，HF 是「有史/无史」之差放大历史遵从。双向 teacher 出画质基线 $s_{\mathrm{ref}}$，AR teacher 只贡献对历史的敏感方向（残差），两者各司其职=解耦的本质。

$p_{\mathrm{HF},t}(x_{t}^{i})=\frac{1}{Z_{t}}\,p_{\mathrm{ref},t}(x_{t}^{i})\cdot\left(\frac{p_{\mathrm{AR},t}^{+}(x_{t}^{i})}{p_{\mathrm{AR},t}^{-}(x_{t}^{i})}\right)^{\lambda}$

**直觉解释**：score 相加对应分布相乘——蒸馏目标=参考分布×「历史似然比」的 λ 次幂。由贝叶斯，似然比=历史后验/先验，故 $s_{\mathrm{HF}}=s_{\mathrm{ref}}+\lambda\nabla_{x_t^i}\log p_{\mathrm{AR}}(h^i\mid x_t^i,c)$：推着学生生成「更能解释那段历史」的续写（最大化 teacher 对历史的后验解释力）——监督信号不是「像历史」而是「让历史看起来更可能发生」。

$\mathcal{J}_{t}(\theta)=-D_{\mathrm{KL}}\left(q_{\theta,t}\,\|\,p_{\mathrm{ref},t}\right)+\lambda\,\mathbb{E}_{x_{t}^{i}\sim q_{\theta,t}}\left[\log p_{\mathrm{AR},t}\left(h^{i}\mid x_{t}^{i},c\right)\right]$

**直觉解释**：等价目标的分解式：前项管画质（与双向参考分布匹配），后项管历史（AR teacher 后验解释力）——两项可独立调 λ 权衡，这就是「解耦」的数学落点；λ 消融：λ↑ 一致性↑但 Dynamic Degree↓（视频生成 λ=1 最优、世界模型 λ=3 最优）。

$v_{\mathrm{HF}}=v_{\mathrm{EMA}}^{-}+\lambda\left(v_{\mathrm{EMA}}^{+}-v_{\mathrm{EMA}}^{-}\right)$

**直觉解释**：世界模型分支的同型算子——残差思想平移到 velocity 空间：EMA teacher 带史/无史速度预测之差就是「历史对演化的影响方向」，叠加成回归目标（stop-gradient）。残差算子与载体无关（score/velocity 皆可），是真正的可移植组件。

## 5. 与前作/矩阵关系

- ← 底座 [[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]：学生=其因果 ODE ckpt、AR teacher=其多步 AR ckpt——家族谱系在其上直接加历史监督；
- ← 谱系 [[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]]（逐帧噪声 AR 框架）+ Self Forcing（on-policy DMD 训练范式，未入库）；
- ≡ 开环蒸馏「分布/后验失配」处方家族第四张：[[10-Papers/02-生成建模与扩散/DyMD Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video Wo|DyMD]]（自适应重加噪）/[[10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）|WorldPlay]]（对齐记忆）/Causal Forcing（因果教师）/HF（历史对比残差）——同病不同药；
- ≡ 实时交互 WM 家族（9/24 批）：[[10-Papers/09-世界模型与JEPA/minWM- 全栈实时交互世界模型框架（minWM）|minWM]]、[[10-Papers/09-世界模型与JEPA/AnyFlow- 任意步视频扩散的在线策略流图蒸馏（AnyFlow）|AnyFlow]]、[[10-Papers/02-生成建模与扩散/Mix Forcing Causal Pre-Training via Mixture Attention for Interactive World Models|Mix Forcing]]——评测对面（PlayWorld/MemoBench）与我们三病理互证但全走视频指标；
- 概念链：[[30-Formulas/无分类器引导（CFG）]]（残差构造的形式母体）、[[30-Formulas/DDPM训练目标]]、[[40-Concepts/贝叶斯公式]]（似然比=后验/先验）、[[40-Concepts/on-policy与off-policy]]（学生 rollout 上监督）、[[40-Concepts/KV缓存]]（sink 帧/上下文窗口）。

## 6. 影响后续

- 少步 AR 蒸馏的「目标侧外挂修正」范式确立：不改管线、只加一个 teacher 对比残差即可注入新监督维度（此处=历史一致性），且开销 ~2%——监督维度可插拔的示范；
- 「监督区间」（λ 与噪声段 τ）成为显式设计自由度：低噪段加历史监督最优、λ 权衡一致性与动态度——与 EASD 的区间理论（SD 高噪/AD 低噪）同属「监督该落在哪」的谱系；

## 7. 读前须知

- **必前置**：[[30-Formulas/无分类器引导（CFG）]]（对比残差的形式母体，不懂 CFG 的「有/无之差」就读不出方法的优雅）、DMD 双网络结构（[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 卡）、AR-VDM 按 chunk 生成的流程（[[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）|Diffusion Forcing]]）；
- **易混点**：①「Forcing」家族命名（teacher/self/causal/context/history forcing）——共性是「用 conditioning 对比产生监督信号」的一族，HF 的对比维度=历史；②残差加在 **score/velocity 目标**上，不是加在损失项上——形式是 CFG 式引导不是正则项；③「解耦」指监督解耦（画质来自双向 teacher、历史来自残差），不是架构解耦；④世界模型分支无 fake score 网络（OPSD-V 路线）与长视频分支（DMD 路线）是两套训练配方；
- **读法建议**：图 2/3（三种蒸馏策略对比=病理图）→ 式 4-7（残差→重加权分布→后验梯度三步推导）→ 表 1/2（1.3B 打 14B 的主表）→ 表 5（历史构造消融：连续早块>sink 帧）→ 表 7/8（联合归一化与 λ 消融）。

> 原文：https://arxiv.org/pdf/2611.02782v1 ｜ 在线全文：https://arxiv.org/html/2611.02782v1

---

> 谱系枢纽：[[10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）|Causal Forcing]]（图谱连通入口）

> 近邻同族：[[10-Papers/02-生成建模与扩散/DyMD Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video Wo|DyMD]] · [[10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）|WorldPlay]] · [[10-Papers/09-世界模型与JEPA/minWM- 全栈实时交互世界模型框架（minWM）|minWM]] · [[10-Papers/09-世界模型与JEPA/AnyFlow- 任意步视频扩散的在线策略流图蒸馏（AnyFlow）|AnyFlow]] · [[10-Papers/02-生成建模与扩散/Mix Forcing Causal Pre-Training via Mixture Attention for Interactive World Models|Mix Forcing]]

> 数学根基：[[30-Formulas/无分类器引导（CFG）]] · [[40-Concepts/贝叶斯公式]] · [[30-Formulas/DDPM训练目标]] · [[20-Algorithms/世界模型]]
