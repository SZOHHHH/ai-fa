---
type: paper
title: "MotionJEPA: Preventing Temporal Feature Collapse by Capturing Visual Changes in Latent Space"
aliases: [MotionJEPA, DISReg]
year: 2026
authors: [Markus Karmann, Shile Li, Christian Internò, et al.]
venue: arXiv 2026
arxiv: "2609.23881v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [特征预测(JEPA系), 潜在状态, 免标签(差分自监督)]
tags: [paper]
---

# MotionJEPA

## 1. 一句话贡献

诊断并修复 JEPA 的慢特征偏置：标准防坍缩正则（SIGReg）只编码慢特征（记分板/球拍）丢掉快特征（球），逆动力学防坍缩（IDM）又依赖动作标签且偏向前者可控特征——本文用 DISReg（差分图像嵌入正则）两头兼得：零动作标签、只激励"变化的存在"而不约束嵌入分布，Pong/Dino/Golf 三特征全保留，静态干扰下规划成功率更高。

## 2. 核心贡献

- **特征抑制的干净实证**：Pong 环境三组可分离特征（快球/两拍/慢记分板）上探针可视化——SIGReg 压掉球、IDM 只留拍、DISReg 三者全在；把"JEPA 学什么特征"归结为防坍缩机制的选择问题
- **DISReg 正则**：静态项（SIGReg on 单图嵌入 $$z$$）+ 动态项（SIGReg on 差分嵌入 $$d$$ + 差分预测损失）——动态项不约束 $$z$$ 的分布形状，只要求"帧间变化的信息在场"，因此不与慢特征偏置对抗
- **零动作标签的 IDM 式模块**：DiffPred 从相邻图像嵌入 $$(z_t, z_{t+1})$$ 预测差分图像嵌入 $$d_t$$——逆动力学的"形状"，但目标是视觉自监督的差分而非动作
- **潜轨迹几何分析**：DISReg 的潜轨迹曲率显著低于 IDM 系（几何更简单），静态背景干扰子（fixed distractor）下四个环境的下游规划更稳

## 3. 方法概要

1. 标准 JEPA 骨架：编码器逐帧编码 $$z_t = \text{Enc}_\theta(o_t)$$，前向预测器 $$\hat z_{t+1} = \text{Pred}_\phi(z_{t-H+1:t}, a_{t-H+1:t})$$，全程无像素重建
2. 新增差分通路：差分图像 $$o_{t+1}-o_t$$ 经独立编码器得 $$d_t = \text{DiffEnc}_\alpha(o_{t+1}-o_t)$$
3. IDM 式预测器 $$\hat d_t = \text{DiffPred}_\beta(z_t, z_{t+1})$$：只从两个潜状态猜"画面变了什么"——不要求动作标签，也不要求重构像素
4. 总损失 $$0.25\,\mathcal{L}_z + 2\,\mathcal{L}_d + 0.5\,\mathcal{L}_{\text{pred}}$$：两个 SIGReg 分布正则防两套潜变量坍缩 + MSE 差分预测
5. 评测：三合成游戏环境的特征探针 + 潜轨迹曲率分析 + 静态干扰下 MPC 规划成功率

## 4. 核心公式

差分通路：

`$$d_t = \text{DiffEnc}_\alpha(o_{t+1} - o_t),\quad \hat d_t = \text{DiffPred}_\beta(z_t, z_{t+1})$$`

**直觉**：差分图像是"帧间变化"的像素级显式载体——球在动、记分板不动，差分图里就只有球。让潜空间里存在一个"能从 $$z_t, z_{t+1}$$ 反解出这个差分"的通路，等于强制嵌入保留变化信息；但因为预测目标只是差分的**嵌入**而非差分图像本身（无重建损失），慢特征不受挤压——激励"动态在场"，不规定"静态让位"。

总损失：

`$$\mathcal{L} = 0.25\,\mathcal{L}_z + 2\,\mathcal{L}_d + 0.5\,\lVert d_t - \hat d_t \rVert_2^2,\quad \mathcal{L}_z = \text{SIGReg}(z),\ \mathcal{L}_d = \text{SIGReg}(d)$$`

**直觉**：三支各司其职——$$\mathcal{L}_z$$ 保住 JEPA 原本的慢特征收益；$$\mathcal{L}_d$$（权重最大）防差分通路自身坍缩成常数；预测项是真正的信息泵，把"变化"从像素层抽进潜层。权重比 0.25 : 2 : 0.5 说明作者刻意压 $$z$$ 的正则强度、抬 $$d$$ 的存活优先级。

## 5. 与前作/矩阵关系

- ←修复对象：[Revisiting Feature Prediction for Learning Visual Representations from Video](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）) / [Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture（I-JEPA）) 一系（SIGReg 防坍缩=慢特征偏置来源）与 SMWM/Delta-JEPA 系（IDM 防坍缩=动作标签依赖）
- ↔对偶近邻：[Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）)——两者都在"差分"上做文章：Delta-JEPA 预测**潜差分**（动作效应显式化），MotionJEPA 预测**差分图像的嵌入**（视觉变化显式化）；一个动作条件、一个免标签，正好互补
- ↔与我们 E2 的 IDM 头直接对话：[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）) 的"免动作标签变体"——DiffPred 结构上就是从 $$(z_t, z_{t+1})$$ 反推观测变化的逆模块，与 p(a|x_t, goal) 后验反推共享"由果找因"的骨架，但其"果"是差分图像而非目标达成
- 概念/公式根基：[JEPA联合嵌入预测架构](/ai-fa/explore/40-Concepts/JEPA联合嵌入预测架构) · [VICReg三正则](/ai-fa/explore/30-Formulas/VICReg三正则)（SIGReg 属同族分布正则，用 Epps-Pulley 检验替代协方差矩阵）· [世界模型](/ai-fa/explore/20-Algorithms/世界模型)

## 6. 影响后续

- 把"JEPA 特征选择"从隐性偏置变成显式设计维度：防坍缩机制 = 特征时间尺度过滤器，后续免重建 WM 的表征设计都得回答这个问题
- 差分图像作为免标签的"变化锚点"，为无动作视频预训练 WM 提供了比 IDM 更便宜的反坍缩选项
- 游戏域（Pong/Dino/Golf）+ 静态干扰协议可复用为表征完整性的标准试金石

## 7. 读前须知

[JEPA联合嵌入预测架构](/ai-fa/explore/40-Concepts/JEPA联合嵌入预测架构)（预测-表征双层结构与坍缩问题）· [VICReg三正则](/ai-fa/explore/30-Formulas/VICReg三正则)（方差-不变-协方差正则到 SIGReg 的演化）· 慢特征分析（SFA，建议了解其"最慢可变特征"目标与 JEPA 时间对齐的等价性结论）· [逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（SMWM/Delta-JEPA 防坍缩路线的背景）。
