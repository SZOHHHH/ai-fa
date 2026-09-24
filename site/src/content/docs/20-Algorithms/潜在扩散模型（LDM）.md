---
type: algo
aliases: [潜在扩散模型, 潜空间扩散, Latent Diffusion, LDM, Stable Diffusion算法]
line: 生成建模与扩散
tags: [algo]
---

# 潜在扩散模型 LDM

## 1. 定义

**非数学语言**：像素太多太贵 → 先用自编码器把图压成 1/8 尺寸的"潜草图"，在潜草图上跑扩散，最后解码回像素。生成质量不掉，算力降一到两个数量级。

**数学语言**：两阶段：①训练 autoencoder $$\mathcal{E}, \mathcal{D}$$（重建 + KL 正则）；②在 $$z = \mathcal{E}(x)$$ 上训练条件扩散 $$p_\theta(z_{t-1} \mid z_t, c)$$，条件 $$c$$ 经 cross-attention 注入 U-Net。

## 2. 本命论文群

| 论文 | 引入/发展了什么 | 年份 |
|---|---|---|
| [High-Resolution Image Synthesis with Latent Diffusion Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/High-Resolution Image Synthesis with Latent Diffusion Models（LDM）) | 两阶段范式、cross-attn 条件注入 | 2022 |
| Stable Diffusion（工业产品） | LDM + 大规模文图对训练 | 2022+ |
| SDXL / SD3 / Flux | 尺度化 + FM 化 | 2023–24 |

## 3. 核心公式

- 复用 [DDPM训练目标](/ai-fa/explore/30-Formulas/DDPM训练目标)（在 $$z$$ 空间）
- [无分类器引导（CFG）](/ai-fa/explore/30-Formulas/无分类器引导（CFG）) —— 文生图标配
- [VQ-VAE目标](/ai-fa/explore/30-Formulas/VQ-VAE目标) / [ELBO目标](/ai-fa/explore/30-Formulas/ELBO目标) —— 压缩器的理论根基

## 教程：一张 512×512 图的两级流水线（账单导览）

**第 1 步：第一级——压缩。** 自编码器（VQ-VAE 或连续 AE）把 $$512\times512\times3$$ 压到 $$64\times64\times4$$ 潜空间（f8 下采样）：**像素量 $$\times 1/48$$**（512²·3 = 78.6 万 → 64²·4 = 1.6 万）——压缩机制见 [VQ-VAE目标](/ai-fa/explore/30-Formulas/VQ-VAE目标)（码本/直通估计）。

**第 2 步：第二级——潜空间扩散。** DDPM 全套（[DDPM训练目标](/ai-fa/explore/30-Formulas/DDPM训练目标)：抽三元组造题回归）**在 64×64×4 上跑**，不在像素上——每步计算量同样 ÷48；文本条件走交叉注意力 + CFG 引导（[无分类器引导（CFG）](/ai-fa/explore/30-Formulas/无分类器引导（CFG）)：w=7.5 的外推）。

**第 3 步：生成的逆流水线。** 潜空间从噪声去噪 20-50 步（DDIM，[DDIM更新规则](/ai-fa/explore/30-Formulas/DDIM更新规则)）→ 解码器一次性放大回 512×512——**扩散的迭代浪费被压在便宜的潜空间，昂贵的解码只做一次**。

**第 4 步：账单对比。** 像素扩散 vs LDM 同质量：训练算力约 ÷20+（Stable Diffusion 可在单卡级集群训）；代价=压缩损失（潜空间必须保住生成所需的所有细节——f8 是甜点，压太狠丢细节、太松不省钱）。

**第 5 步：读法。** LDM = "**在哪算**"的工程革命：数学一字未改（还是那套 DDPM），改的是坐标系——与 FlashAttention（不改数学改计算图）同一类创新；后续 SDXL/SD3/视频生成的标配底座。

## 4. 数学概念分解

同 [扩散模型](/ai-fa/explore/20-Algorithms/扩散模型)，外加：自编码、信息瓶颈直觉（8× 下采样是"丢弃高频细节换算力"的甜点）

## 5. 变体与演进

| 变体 | 相比本概念改了什么 | 代表论文 |
|---|---|---|
| DiT 潜扩散 | 骨干 U-Net → Transformer | [Scalable Diffusion Models with Transformers](/ai-fa/explore/10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）) |
| 视频潜扩散 | 潜空间加时间轴（Sora 系） | Sora 报告（多模态线交叉） |
| FM 潜扩散 | 扩散 → 流匹配骨干 | SD3/Flux |

## 6. 对比表

| | 像素扩散 | LDM |
|---|---|---|
| 计算量 | 高（像素维 O(HW)） | 低（潜维 1/64） |
| 高频细节 | 直接保 | 靠解码器超分 |
| 工业可用性 | 差 | **消费级 GPU 可跑**——AIGC 爆发的直接推手 |

## 自测

1. 两级流水线各做什么？（f8 压缩（78.6万→1.6万）→ 潜空间 DDPM+CFG → 解码一次放大）
2. 算力省在哪？（迭代浪费压在便宜潜空间（÷48），昂贵解码只做一次——训练 ÷20+）
3. f8 为什么是甜点？（压太狠丢细节、太松不省钱）
4. LDM 的创新层级？（"在哪算"的工程革命——数学一字未改（同 FlashAttention 改计算图不改数学））
