---
type: formula
formula_id: CLIP-LOSS
aliases: [CLIP损失, 对比学习损失, InfoNCE, 双塔对比]
domain: 多模态
loss_type: contrastive
tags: [formula]
---

# CLIP 对比损失

## 1. 标准形式

$$\mathcal{L} = -\frac{1}{2}\mathbb{E}\!\left[ \sum_{i} \log\frac{e^{\langle v_i, t_i\rangle/\tau}}{\sum_{j} e^{\langle v_i, t_j\rangle/\tau}} + \sum_{i} \log\frac{e^{\langle v_i, t_i\rangle/\tau}}{\sum_{j} e^{\langle v_j, t_i\rangle/\tau}} \right]$$

- $v_i$：图像嵌入；$t_i$：文本嵌入（同一对图文为正样本，批内其余为负样本）
- $\tau$：可学习温度（[[40-Concepts/温度参数]] 的第四位使用者）
- 双向对称：图→文与文→图各做一次 softmax 交叉熵

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| InfoNCE（本库标准） | 如上 | [[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] | 双向对称版 |
| ALIGN 版 | 同结构、噪声数据 18 亿对 | [[10-Papers/08-多模态/Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]] | 规模战胜清洗 |
| SigLIP | sigmoid 逐对独立（非 softmax 批内竞争） | 2023 | 更稳更大批 |
| 图像-文本-其他 | 三塔/多模态扩展 | ImageBind 等 | 嵌入空间家族 |

## 教程：批内 2×2 配对手算（警察抓配对现场）

**第 1 步：设定。** batch 只有两对图文 $(v_1, t_1), (v_2, t_2)$；余弦相似度矩阵（温度 τ=1）取 $S = \begin{pmatrix}4 & 1 \\ 3 & 2\end{pmatrix}$（$S_{ij} = \langle v_i, t_j\rangle$）——**对角线是正确配对**；注意 row2 里图 2 与错误文本 $t_1$ 的相似度（3）反而高于正确配对 $t_2$（2）——一个真实的"犯错现场"。

**第 2 步：图→文方向（行 softmax）。** row1 $= \mathrm{softmax}(4, 1) = (0.95,\ 0.05)$ ✓ 图 1 配得很准；row2 $= \mathrm{softmax}(3, 2) = (0.73,\ 0.27)$——**图 2 把 73% 的概率押给了错误文本**。

**第 3 步：算损失。** 图→文：$-\log 0.95 - \log 0.27 = 0.05 + 1.31 = 1.36$（错误配对贡献 96% 的损失——**难例主导梯度**）；文→图同法（列 softmax）：列1 $= \mathrm{softmax}(4, 3) = (0.73,\ 0.27)$、列2 $= \mathrm{softmax}(1, 2) = (0.27,\ 0.73)$——$-\log 0.73 - \log 0.73 = 0.63$。总损失 = 双向平均 $\approx 1.0$——**梯度推高对角线、压低非对角**。

**第 4 步：温度 τ 的角色。** τ 小（如 0.07，CLIP 初值）：softmax 变尖——分母被最大负样本主导，梯度聚焦**最难负样本**（"最像的错误"）；τ 大：全员平摊。可学习 τ 让模型自己调难度——[[40-Concepts/温度参数]] 的第四位使用者。

**第 5 步：零样本分类（对齐的免费红利）。** 类别写成文本（"一张猫的照片"/"一张狗的照片"）→ 图像嵌入与各文本算余弦 → argmax——**没训过一个分类头就得到了分类器**（CLIP 的零样本能力的机制）。

## 3. 直觉解释

- **"警察抓配对"**：批内 N 对图文打乱洗牌，模型学习把正确配对拉近、错误推远——softmax 分母里全是负样本
- **为什么用对比不用生成**：不重建像素/文本（省算力），只对齐语义空间——"对齐"比"描述"便宜
- **零样本分类**：把类别写成文本（"一张猫的照片"），算图像与各文本的余弦相似度取最大——**分类器免费**
- **温度 τ 可学习**：控制批内负样本的"难度分布"——τ 小则聚焦最难的负样本
- `#loss/contrastive`（本库四大 LOSS 家族的最后一块拼图）

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/08-多模态/Learning Transferable Visual Models From Natural Language Supervision（CLIP）]] | 4 亿图文对 + 对比对齐 |
| [[10-Papers/08-多模态/Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）]] | 噪声规模路线 |

## 5. 数学概念分解

- [[40-Concepts/内积]]：相似度
- [[40-Concepts/softmax函数]]：批内竞争
- [[40-Concepts/温度参数]]：τ
- [[40-Concepts/期望]]：batch 期望

## 6. 自测

1. $S = \begin{pmatrix}4&1\\3&2\end{pmatrix}$：row2 的图→文概率？（$\mathrm{softmax}(3,2) = (0.73, 0.27)$——押错方向）
2. 该批图→文损失？（$-\log 0.95 - \log 0.27 = 1.36$——难例贡献 96%）
3. τ 变小的效果？（softmax 变尖——梯度聚焦最难负样本；τ 可学习）
4. 零样本分类怎么来？（类别写成文本算余弦取最大——免费分类器）

## 7. 与其他公式的关系

- `#loss/contrastive` 与 [[30-Formulas/GAN目标]]（对抗）、[[30-Formulas/DDPM训练目标]]（回归）、[[30-Formulas/DPO损失]]（比率）并列为四大损失家族——**本页补全家族最后一块**
- → 被扩散模型复用：CFG 与 SD 系列的文本编码器即 CLIP
- → 对齐思想延续到 VLM（LLaVA 系的视觉-语言投影本质是弱化版对齐）
