---
type: paper
title: "DexTacWAM: A Visuo-Tactile World-Action Model for Dexterous Manipulation"
aliases: [DexTacWAM]
year: 2026
authors: [Haoran Yuan, Zekai Wang, Boning Shao, et al.]
venue: arXiv 2026
arxiv: "2609.24976v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [生成式WM(扩散系), 多模态(视觉+触觉), 可操作(动作条件)]
tags: [paper]
---

# DexTacWAM

## 1. 一句话贡献

视觉-触觉世界-动作模型：把五指触觉流压缩后沿"视角轴"注入视频扩散世界模型，让接触演化成为被预测的世界状态的一部分（而非仅仅是策略输入），双手灵巧操作六任务全胜（均分 70.6 vs 最强基线 38.0）。

## 2. 核心贡献

- **触觉即世界状态**：触觉潜变量与视觉潜变量一起被扩散模型联合去噪——消融显示去掉"触觉世界建模"（保留触觉条件）四任务均分从 74.7 崩到 26.6，证明收益来自预测接触演化而非触觉条件化
- **手指-位姿感知触觉压缩器**：五指流 → 每手一个潜变量（5:1 自注意力池化），保留手指身份/接触局部性/时间结构，训练提速 2.26×、推理提速 1.29×，融合前接触召回保留 89.4%
- **持续视觉→触觉学习**：复用冻结的预训练视觉 VAE 编码触觉图（1×1 灰度转 RGB 适配器），4 小时触觉编码器适配 + 每任务约 100 条示教微调视频骨干，视觉预测质量衰减 <0.5 dB——绕开触觉数据稀缺瓶颈
- **逐模态 K/V RMS 归一化动作专家**：视觉/触觉 token 分布尺度悬殊，直接拼接交叉注意力不收敛；按模态分别做无参数 RMSNorm 再拼回，无任何可学习门控

## 3. 方法概要

1. 每根手指的触觉图经灰度→RGB 适配后用**冻结视觉 VAE** 编码为潜变量（触觉图有接触区域/形变/纹理等空间结构，天然适配图像式编码，且与视频扩散 WM 潜空间兼容）
2. 加手指身份嵌入与位姿编码，自注意力池化（一手 query + 五指 token，留 hand-query 输出）压成每手一个触觉潜变量，轻量时空注意力建模滑移/换抓等时间事件
3. 左右手触觉潜变量**沿视角轴**追加到视觉潜变量后送入 DiT（视图数从 $$V_v$$ 变 $$V_v+V^\tau$$，架构零改动），跨视图自注意力让视觉与触觉 token 联合去噪
4. 动作专家交叉注意力读取 WM 预测特征（无需完整去噪出未来帧），K/V 按模态分别 RMS 归一化，输出连续动作向量（60 维指力+臂姿+手目标+本体状态）
5. 训练分两步：先冻结视觉 VAE 只适配触觉编码器（约 4 小时交互数据），再冻结触觉编码器、用每任务约 100 条遥操作示教联合微调视频骨干与动作专家

## 4. 核心公式

模态分裂去噪目标（流匹配速度预测，视觉/触觉各算各的误差）：

`$$\mathcal{L}_{\text{wm}} = \lambda_v\, \mathbb{E}\,\lVert v_\theta(s_\sigma,\sigma)[:V_v] - (\epsilon - z^v) \rVert_2^2 + \lambda_\tau\, \mathbb{E}\,\lVert v_\theta(s_\sigma,\sigma)[V_v:] - (\epsilon - \hat{z}^\tau) \rVert_2^2$$`

**直觉**：把加噪的联合潜状态 $$s = [z^v \,\Vert\, \hat{z}^\tau]$$ 交给 DiT 预测流匹配速度，但误差按模态切开、各配权重——触觉 token 与视觉 token 在同一去噪网络里被同等对待地"预测未来"，这正是"触觉是世界状态"的数学表达。

动作专家的逐模态 K/V 归一化：

`$$e_x = [\text{RMS}_v(x[:V_v L]) \,\Vert\, \text{RMS}_\tau(x[V_v L:])],\quad h_a = \text{Attn}_a(h, e_x)$$`

**直觉**：视觉潜量稠密、触觉稀疏且对接触敏感，直接共享注意力会把 softmax 挤成视觉独大；只对进入注意力前的 K/V 统计量按模态各自拉齐尺度，注意力本体保持共享——不引入可学习门控的"最简对称化"。

## 5. 与前作/矩阵关系

- 同族 WAM（视频扩散世界模型 + 动作生成耦合）：[GE-Act 2.0: Pretraining and Scaling a World-Action Model for Robotic Manipulation](/ai-fa/explore/10-Papers/09-世界模型与JEPA/GE-Act 2.0 Pretraining and Scaling a World-Action Model for Robotic Manipulation) · [LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies](/ai-fa/explore/10-Papers/09-世界模型与JEPA/LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies（LaWAM）)——两者纯视觉，本文补上"接触动力学部分可观测"这一格
- 与 [Diffusion for World Modeling- Visual Details Matter in Atari](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）) 同为"视频扩散 WM"（我们的 E1 基座同族）：游戏侧像素即全态，机器人侧触觉补上视觉看不见的接触态——同一个"世界状态该包含什么"的问题在两个域的不同答案
- 数学根基：[世界模型](/ai-fa/explore/20-Algorithms/世界模型) · [流匹配](/ai-fa/explore/20-Algorithms/流匹配)（速度预测形式）· [Scalable Diffusion Models with Transformers](/ai-fa/explore/10-Papers/02-生成建模与扩散/Scalable Diffusion Models with Transformers（DiT）)（视图轴扩展的宿主架构）

## 6. 影响后续

- "多模态=额外视角"的注入范式：不改 DiT 本体、沿视图轴拼 token 即可扩展世界状态的模态——对任何 DiT 式 WM 即插即用
- 预训练视觉先验→触觉的持续迁移（视觉数据富/触觉数据穷的不对称解法），可推广到力觉、音频等其他贫数据模态
- 消融范式值得借鉴：区分"模态作条件"vs"模态作被预测状态"两类设计，前者增益小得多

- → 后继补记（260924）：[CoPRE](/ai-fa/explore/10-Papers/09-世界模型与JEPA/CoPRE Improving Sensitivity in Proprioceptive Contact Detection for Low-Cost Robot Arms)（接触感知的分叉路线：本卡装触觉传感器走高保真，CoPRE 零额外传感器、只靠内置力矩估计+无接触参考模型残差检测弱接触）

## 7. 读前须知

[条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)（去噪目标的形式来源）· [扩散模型](/ai-fa/explore/20-Algorithms/扩散模型)（潜空间扩散基础）· [世界模型](/ai-fa/explore/20-Algorithms/世界模型)（WM→WAM 谱系）；顺带了解 VAE 潜空间复用（[变分自编码器](/ai-fa/explore/20-Algorithms/变分自编码器)）与 RMSNorm（[均方根归一化](/ai-fa/explore/30-Formulas/均方根归一化)）。
