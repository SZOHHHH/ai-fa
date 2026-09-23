---
type: formula
formula_id: VQ-VAE-OBJ
aliases: [VQ-VAE目标, 向量量化目标, Codebook损失]
domain: 生成建模
loss_type: expectation-of-ratio
tags: [formula]
---

# VQ-VAE 目标

## 1. 标准形式

$$\mathcal{L} = \underbrace{\mathbb{E}\left[ \log p(x \mid z_q(x)) \right]}_{\text{重建}} + \underbrace{\|\mathrm{sg}[z_e(x)] - e\|_2^2}_{\text{codebook}} + \underbrace{\beta\, \|z_e(x) - \mathrm{sg}[e]\|_2^2}_{\text{承诺}}$$

- $z_e(x)$：编码器输出；$e$：最近的 codebook 向量；$z_q = e$：量化后送解码器的
- $\mathrm{sg}[\cdot]$：stop-gradient（直通估计的记号）
- 第二项：把 codebook 拉向编码（只动 codebook）
- 第三项：把编码拉向 codebook（只动编码器）——"承诺"编码器别乱跑
- **直通估计**：前向用 $z_q$、反向梯度直通到编码器（绕过不可导的最近邻查找）

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| 三项式（本库标准） | 如上 | VQ-VAE 2017 | 原文 |
| EMA codebook | 用指数滑动平均更新 codebook | VQ-VAE-2、taming | 去掉 codebook loss，训练更稳 |
| Gumbel-VQ | softmax 松弛 | DALL·E | 端到端可导替代 |
| 有限标量量化 FSQ | 少量标量代替 codebook | 2023 | 化简量化机制 |

## 教程：一次量化 + 三项损失记账

**第 1 步：玩具设定。** 一维码本 $\{e_1 = 0,\ e_2 = 4\}$（两个码字），编码器输出 $z_e(x) = 1.5$。

**第 2 步：最近邻查找。** $|1.5-0| = 1.5 < |1.5-4| = 2.5$ → 选中 $e_1$，量化值 $z_q = 0$——**解码器只拿到 0**，1.5 这个连续值被吞掉（信息瓶颈就在这一口；若输入 5.5 则选 $e_2$：$|5.5-4| = 1.5$）。

**第 3 步：两项距离损失。** codebook 项 $\|\mathrm{sg}[1.5] - 0\|^2 = 2.25$（梯度只改 $e_1$：往 1.5 拉）；承诺项 $\beta\|1.5 - \mathrm{sg}[0]\|^2 = 0.25\times2.25 = 0.56$（梯度只改编码器：往 0 拉）——**两个 stop-gradient 各锁一边**，两股力分而治之、不再互相抵消式拉扯。总账（不含重建）$= 2.25+0.56 = 2.81$。

**第 4 步：直通估计（骗反向传播）。** 前向：解码器吃 $z_q = 0$；反向：$\partial/\partial z_e$ 被当恒等映射抄送——重建损失假装"解码器吃的是 1.5"来训练编码器。与 [[40-Concepts/重参数化]] 同一动机（梯度穿过不可导层）：一个靠恒等捷径、一个靠路径拆分。

**第 5 步：码本塌缩（真实工程头号病）。** 训练早期若 $e_2$ 总选不中 → 它的 codebook 梯度恒为零 → 永远选不中（死码循环）——本玩具 50% 的码白养。解法：EMA 更新（用批次均值挪码）+ 死码重启；根治派 = FSQ（干脆不要码本）。码本用活时，输入空间被切成两片势力范围——**码字开始带语义**（类似词表的"词"，VQGAN 的码=视觉词表）。

## 3. 直觉解释

- **为什么离散**：连续隐空间"什么都可能"，离散 codebook 强制信息瓶颈 → 学到的码有语义（类似词表）
- 直通估计是权宜之计：量化不可导，硬把梯度抄送过去
- **忠诚代价**：重建压损（codebook 容量瓶颈）→ 解码器被迫当"超分网络"
- 与自回归的组合：VQGAN = VQ-VAE（压缩）+ Transformer（在码序列上自回归）——两阶段生成的范式

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Neural Discrete Representation Learning（VQ-VAE）]] | 提出 |
| [[10-Papers/02-生成建模与扩散/Taming Transformers for High-Resolution Image Synthesis（VQGAN）]] | +感知损失 + Transformer 先验 |

## 5. 数学概念分解

- [[40-Concepts/期望]]：重建项
- [[40-Concepts/范数]]：codebook/承诺项
- [[40-Concepts/重参数化]]：直通估计是其离散孪生（都为"梯度穿过不可导层"）
- [[40-Concepts/KL散度]]：ELBO 家族中 VQ-VAE 的理论位置（先验为学习所得而非固定）

## 6. 自测

1. $z_e = 3$，码本 $\{0, 5\}$：选哪个码？codebook/承诺损失各多少？（$|3-5|=2<3$ → $e_2$；codebook $= 4$，承诺 $= 0.25\times4 = 1$）
2. 两个 stop-gradient 各保护谁？（codebook 项锁编码器只动码字；承诺项锁码字只动编码器——分而治之防拉扯死锁）
3. 直通估计与前向行为矛盾吗？（不矛盾——前向严格量化（送 $z_q$），只有反向梯度被当恒等抄送："前向离散、反向连续"的权宜）
4. 码本塌缩的成因与两味药？（选中概率低→梯度为零→永不再选中的死循环；EMA 均值挪码+死码重启，或 FSQ 根治）

## 7. 与其他公式的关系

- ⊂ **特化自** [[30-Formulas/ELBO目标]]（离散隐变量 + 学习先验版本）
- 对比 [[30-Formulas/DDPM训练目标]]：同为回归型重建，但隐空间离散 vs 连续加噪
- → **组合出** VQGAN / DALL·E / Sora 的 tokenizer 路线（多模态线会回链）
