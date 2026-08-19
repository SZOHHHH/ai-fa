---
type: algo
aliases: [潜在扩散模型, 潜空间扩散, Latent Diffusion, LDM, Stable Diffusion算法]
line: 生成建模与扩散
tags: [algo]
---

# 潜在扩散模型 LDM

## 1. 定义

**非数学语言**：像素太多太贵 → 先用自编码器把图压成 1/8 尺寸的"潜草图"，在潜草图上跑扩散，最后解码回像素。生成质量不掉，算力降一到两个数量级。

**数学语言**：两阶段：①训练 autoencoder $\mathcal{E}, \mathcal{D}$（重建 + KL 正则）；②在 $z = \mathcal{E}(x)$ 上训练条件扩散 $p_\theta(z_{t-1} \mid z_t, c)$，条件 $c$ 经 cross-attention 注入 U-Net。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [[10-Papers/02-生成建模与扩散/High-Resolution Image Synthesis with Latent Diffusion Models（LDM）]] | 两阶段范式、cross-attn 条件注入 | 2022 |
| Stable Diffusion（工业产品） | LDM + 大规模文图对训练 | 2022+ |
| SDXL / SD3 / Flux | 尺度化 + FM 化 | 2023–24 |

## 3. 核心公式

- 复用 [[30-Formulas/DDPM训练目标]]（在 $z$ 空间）
- [[30-Formulas/无分类器引导（CFG）]] —— 文生图标配
- [[30-Formulas/VQ-VAE目标]] / [[30-Formulas/ELBO目标]] —— 压缩器的理论根基

## 4. 数学概念分解

同 [[20-Algorithms/扩散模型]]，外加：自编码、信息瓶颈直觉（8× 下采样是"丢弃高频细节换算力"的甜点）

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表论文 |
|---|---|---|
| DiT 潜扩散 | 骨干 U-Net → Transformer | [[10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）]] |
| 视频潜扩散 | 潜空间加时间轴（Sora 系） | Sora 报告（多模态线交叉） |
| FM 潜扩散 | 扩散 → 流匹配骨干 | SD3/Flux |

## 6. 对比表

| | 像素扩散 | LDM |
|---|---|---|
| 计算量 | 高（像素维 O(HW)） | 低（潜维 1/64） |
| 高频细节 | 直接保 | 靠解码器超分 |
| 工业可用性 | 差 | **消费级 GPU 可跑**——AIGC 爆发的直接推手 |
