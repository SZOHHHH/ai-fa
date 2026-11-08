---
type: paper
title: Training-Free Predictive Spatio-Temporal Token Pruning for Few-Step Autoregressive Video Diffusion
aliases: [PreSTP]
year: 2026
authors: [Jia Li, Xurui Peng, Xing Wang, Hayden Kwok-Hay So]
venue: arXiv 2026-11（港大+字节 Seed）
arxiv: "2611.07551v1"
pdf: https://arxiv.org/pdf/2611.07551v1
line: 生成建模与扩散
matrix_coords: [AR视频扩散, training-free token剪枝, 少步/一步加速]
layer: 占位
---
# Training-Free Predictive Spatio-Temporal Token Pruning for Few-Step Autoregressive Video Diffusion

> 摘要（原文）：Few-step autoregressive (AR) video diffusion models generate videos chunk by chunk and have made efficient video generation practical. However, further accelerating these models toward real-time generation remains challenging, as few-step distillation leaves little cross-step redundancy for existing training-free caching methods to exploit. We revisit this regime and identify two token-level redundancy patterns: cross-frame redundancy from static content shared across adjacent frames, and cross-step redundancy from tokens that converge early during denoising. Crucially, we find that early clean estimates along the model's own denoising trajectory provide an effective online signal for locating both patterns, requiring no retraining, auxiliary predictor, or reference video.

## 1. 一句话贡献

诊断出**少步蒸馏后的 AR 视频扩散在"步轴冗余耗尽"之后仍保有 token 级冗余**（跨帧静态 + 跨步收敛两型），用模型自身去噪轨迹的早期干净估计在线定位冗余 token、免训练跳算——5 秒生成 1.52×–3.20× 加速，且在步轴彻底坍缩的**一步 regime**（步级缓存全部失效）仍有 1.10×–1.22×。

## 2. 核心贡献

- **两类 token 冗余实证**（图 1）：①跨帧静态冗余——相邻帧空间对齐 token 因静态内容几乎不变（cos > τs≈0.95-0.97）；②跨步收敛冗余——帧内大量 token 在去噪中途就稳定（连续两步干净估计 cos > τf≈0.99-0.997），且**第一步后就有相当比例 token 基本定型**。
- **早期干净估计 = 在线信号**：流匹配速度场可反推干净估计（式 5），无需重训练、辅助预测器或参考视频——对比视频编辑线（如 Regione）依赖参考输入先验导出掩码，文生视频没有参考可用。
- **统一掩码 + 恢复规则 + 复用策略三件套**：跨帧静态掩码 Ms 与累积冻结掩码 Mf 合成统一掩码，被跳过 token 按"最近计算值"恢复输出与 KV 条目保持时序记忆一致；内容自适应掩码复用（静态率 ρ 门控继承 + 每 Δ 帧强制重锚）进一步省掉密集探测开销。
- **一步 regime 泛化**：One-Forcing / Causal Forcing++ 上仍加速 1.10×–1.22×，30 秒设置甚至反超 dense 的 VBench-Long（CF++ 76.81→80.02）——跨帧轴不依赖去噪步数。

## 3. 方法概要

1. **首帧密集 warm-up**：首帧是后续帧的参考锚，用原始稠密计算（无前帧可对比、且早误差会沿 rollout 传播）。
2. **Step-0 探测建静态掩码**：每帧第 0 步的干净估计与上一帧参考 R（每 token 存"最后计算的干净值"）逐 token 比余弦相似度，超阈值 τs 判为静态可跳。
3. **逐步增量冻结**：后续每步只对仍活跃 token 比较相邻两步干净估计，新收敛者并入冻结掩码 Mf（只增不减，帧内终身冻结）。
4. **统一掩码选活跃集**：M = Ms ∨ Mf，只有活跃集 S 里的 token 进 transformer；被跳 token 的输出与 KV 条目保留最近计算值。
5. **内容自适应复用**：上一帧静态率 ρ ≥ g(0.50) 则整帧继承掩码免密集探测，每 Δ=3 帧强制重锚防陈旧掩码误差累积。

## 4. 核心公式

- 干净估计（式 5）：$\hat{x}^{(i)}_{0|t_k} = x^{(i)}_{t_k} - t_k\, v^{(i,k)}_\theta$——**直觉**：流匹配参数化下，当前噪声 latent 减去"时间×速度"就得到模型此刻对最终干净帧的预测；这个免费副产品（ solver 本来就要算 vθ）就是全文唯一信号源，因此全程 training-free。
- 跨帧静态掩码（式 9）：$M^{(i)}_s(j) = \mathbb{I}\left[\cos\left([\hat{x}^{(i)}_{0|t_0}]_j, [R^{(i)}]_j\right) > \tau_s\right]$——**直觉**：新帧第 0 步的"预览"如果和上一帧定格的对应位置几乎一样，这块 patch 再算 K 步也不会变，直接抄旧值。
- 冻结掩码累积（式 11-12）：$M^{(i,k)}_f = M^{(i,k-1)}_f \lor C^{(i,k)},\quad M^{(i,k)} = M^{(i)}_s \lor M^{(i,k-1)}_f$——**直觉**：收敛判定像棘轮，一旦某 token 被判稳就永久跳过；两个来源（帧间静态/帧内收敛）取并集，互补覆盖两类冗余。

## 5. 与前作/矩阵关系

- 线锚：[[20-Algorithms/扩散模型]] · [[20-Algorithms/流匹配]]（velocity 参数化与干净估计）· [[20-Algorithms/一致性模型]]（少步生成大家族）
- ≡ 被加速对象=9/24 实时交互 WM 家族：[[10-Papers/02-生成建模与扩散/AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）|AnyFlow]]（收益最大 3.20×——它重编码全历史 KV、跨帧冗余最重）；同族被测=CausVid / Self-Forcing / LongLive / One-Forcing / Causal Forcing++
- ↔ 蒸馏侧对照：[[10-Papers/02-生成建模与扩散/DyMD Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video Wo|DyMD]]（蒸馏压动态的病理）——本文反向证据：蒸馏耗尽步轴冗余后，token 轴冗余仍独立存在
- ≡ 步级缓存基线（本文判其失效域）：TeaCache / FlowCache——蒸馏后步轴没肉，1.07× 还掉 VBench
- 概念链：[[40-Concepts/NFE（函数求值次数）]]（少步蒸馏=NFE 压缩；本文=NFE 压缩后转攻 token 轴）· [[40-Concepts/KV缓存]]（last-computed-value 恢复保 AR 历史 KV 一致性）· [[30-Formulas/注意力计算复杂度]]（剪 token = 砍注意力 QKV 算力）

## 6. 影响后续


## 7. 读前须知

需要 [[40-Concepts/NFE（函数求值次数）]]（为什么蒸馏后步轴缓存没肉）、[[20-Algorithms/流匹配]]（velocity 场→干净估计的换算）、[[40-Concepts/KV缓存]]（AR 视频生成的历史上下文机制与恢复规则）；余弦相似度阈值判定只需直观理解（同方向=稳）。原文：https://arxiv.org/pdf/2611.07551v1
