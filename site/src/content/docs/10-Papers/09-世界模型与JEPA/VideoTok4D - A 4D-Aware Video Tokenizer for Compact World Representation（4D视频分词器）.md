---
type: paper
title: "VideoTok4D: A 4D-Aware Video Tokenizer for Compact World Representation"
aliases: [VideoTok4D]
year: 2026
authors: [Xinyi Chen, Hanxin Zhu, Xijun Wang, Xingrui Wang, Sen Liang, Xin Li, Zhibo Chen]
venue: arXiv 2026-09-11（cs.CV，中科大）
arxiv: "2609.12874"
pdf: 已下载（PDF/）
line: 世界模型
matrix_coords: 表征轴-视频tokenizer×4D场景
tags: [paper, 轮换命中, 世界模型]
layer: 精化层（摘要级+摘要核实，PDF 待深读）
---
# VideoTok4D: A 4D-Aware Video Tokenizer for Compact World Representation

> **中文速览**：做了什么——指出现有视频 tokenizer 把视频当"2D 图像序列"观察而非"动态 3D 世界的观测"，token 因此带观察中心偏置、压不下真实 4D 场景；提出 4D 感知的视频 tokenizer VideoTok4D。怎么做的——三件套：①时空解耦（视频分解为静态 token + 动态 token 两套，各自建模世界的不变骨架与运动过程）；②轨迹感知动态注意力（聚合轨迹对齐的线索，强制跨视角运动一致）；③在所得 token 空间上学扩散先验 Co4DGen，做高效 4D 场景生成。效果——SOTA 且比稠密 4D 表征省最多 4 个数量级存储；紧凑 token 还大幅缩短扩散序列长度、加速生成。

## 1. 一句话贡献
把视频 tokenizer 从"2D 观察序列压缩器"升级为"4D 世界表征器"：静态/动态 token 解耦+轨迹感知注意力，让潜空间先验地编码动态三维世界，存储省 4 个数量级且扩散生成更短更快。

## 2. 核心贡献
- **时空解耦策略**：视频 →（静态 token：场景结构与外观骨架）+（动态 token：运动与时变内容），避免"一张张图"式的观察中心偏置。
- **轨迹感知动态注意力（track-aware dynamic attention）**：以点轨迹为对齐线索聚合跨视角特征，保证同一物理运动在不同视角下的 token 表征一致。
- **Co4DGen 扩散先验**：直接在 VideoTok4D token 空间学扩散模型用于 4D 生成——token 紧凑所以扩散序列短、生成高效。
- **实证**：4D 表征 SOTA，存储最多少 4 个数量级（对比稠密 4D 表征如 NeRF/3DGS 类）。

## 3. 方法概要（分步）
1. 输入多视角/单目视频，tokenizer 编码为两组潜 token：静态组承载跨时间不变的结构，动态组承载运动。
2. 训练侧：重建+轨迹一致性约束，动态注意力按轨迹对齐查询不同视角的对应内容。
3. 生成侧：Co4DGen 在 token 空间做扩散去噪（扩散的不是像素而是紧凑 token），解码回 4D 场景。
4. 评估：重建/生成质量、存储成本、跨视角一致性对比稠密 4D 表征基线。

## 4. 核心公式
（待 PDF 精读补全——摘要级暂记直觉）时空解耦可写作 $$z = (z_s, z_d)$$，$$z_s$$ 对时间置换/视角变化不变、$$z_d$$ 沿轨迹对齐聚合：**世界 = 不变的骨架（静态）+ 沿轨迹演化的过程（动态），token 预算按这个先验分账，而不是按帧切片平摊**。

## 5. 与前作/矩阵关系
- ← 谱系前身：[Genie](/explore/10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）)（视频→离散潜 token 驱动交互环境生成的 tokenizer 路线源头）——VideoTok4D 把该路线从 2D 观察 token 推向 4D 世界 token。
- ↔ 同域对照：[Diffusion Forcing](/explore/10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）)（在什么粒度上组织"序列+扩散"——DF 逐帧扩散、VideoTok4D 在解耦 token 上扩散）。
- 概念链：[逆动力学（IDM）](/explore/40-Concepts/逆动力学（IDM）)（4D 表征的意义侧：轨迹级世界表征正是 IDM 反推动作的理想潜空间——E2 侧参考）。

## 6. 影响后续
- 视频 tokenizer 从"压缩工具"转向"世界先验载体"的一步；后续 4D 生成/世界模型可能直接吃这类 token。
- 对库内：占据"表征轴×4D"格，与 E1/E2 的像素扩散 WM（帧级 2D 观察）形成表征粒度对照位。

## 7. 读前须知
- 前置：视频自编码/tokenizer 基本流程、扩散模型去噪（可先看 [知识蒸馏](/explore/40-Concepts/知识蒸馏) 之外的概念卡与 [DIAMOND](/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）) 的扩散 WM 直觉）。
- 4D/轨迹相关术语（track、多视角一致）需要少量多视几何直觉；公式细节待 PDF 深读后补全第 4 节。
