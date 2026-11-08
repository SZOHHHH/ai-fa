---
type: paper
title: "Decompose the Distillation: Interpretable Single-Pass Guidance for Diffusion Models"
aliases: [CtrlFlow]
year: 2026
authors: [Xiaolin Xu]
venue: arXiv 2026-11（Northeastern University）
arxiv: "2611.05755v1"
pdf: https://arxiv.org/pdf/2611.05755v1
line: 生成建模与扩散
matrix_coords: [CFG单遍化(引导蒸馏), 显式像素(ImageNet类条件), 文生图推理加速]
tags: [paper]
---

# Decompose the Distillation: Interpretable Single-Pass Guidance for Diffusion Models（CtrlFlow）

> 261105 精读升级（全文 https://arxiv.org/html/2611.05755v1）。一句话：把 CFG 的 $\mathbf{v}_0+s\mathbf{g}$ 分解结构原样保进单次前向——冻结 DiT 挂双 LoRA，一次前向同吐基础速度与引导方向，s 推理期任意调；多尺度统一蒸馏+三重推理稳定化，25 组 (N,s) 配置 24 组追平双倍开销的 CFG。

## 1. 一句话贡献
把无分类器引导蒸馏成"单次前向、但保留 v0/g 可分解接口"的形式：冻结 DiT 骨干+两个 LoRA 适配器（共 5% 参数）一次前向同时输出基础速度 $\hat{\mathbf{v}}_0$ 与引导方向 $\hat{\mathbf{g}}$，引导尺度 s 推理期免重训任意调节——ImageNet-256 上 25 组 (N,s) 配置 24 组追平两倍 NFE 的 CFG，N=25 提速 1.93×，高尺度 s=10 反超 CFG。

## 2. 核心贡献
- **可分解单遍蒸馏**：与既有单遍法（AGD/GFT/ERG 等把两分量揉成一个黑箱引导速度）不同，CtrlFlow 保住 CFG 的 $(\mathbf{v}_0,\mathbf{g})$ 接口——s 是推理期乘子而非训练期烙印，且 $\|\mathbf{g}\|$ 图可当诊断/归因通道（指向精度 0.81 vs Grad-CAM 0.74）；
- **多尺度统一蒸馏**：一个损失吃所有 s——引导适配器梯度天然带因子 s（实测梯度范数 4.3/15.1/52.7，贴近 $s^2$=4/16/64），训练压力自动对齐推理误差；命题 1（可辨识性）：≥2 个不同训练尺度可唯一恢复该分解；
- **推理稳定化三件套**：时间高斯窗 $w(t)$（σ 随 s 收窄）×线性幅度阻尼 $\alpha(s)$（s>4 起压）×对齐门控 $\varphi(a)$（$\cos(\mathbf{v}_0,\mathbf{g})<0$ 时才介入）——只有分解接口才装得上这些旋钮；外加时间网格 warping 把求解步挪到中段高曲率区；
- **两 regime 设计**：s≤4 忠实追 CFG；s>4 有意偏离（对精确 CFG 施同样 w·α 反而 FID 53.84→46.02）——高尺度区"更稳"胜过"更忠实"。

## 3. 方法概要
1. **架构**：冻结 DiT-XL/2 骨干；LoRA 基座（rank 64，2.5% 参数）出 $\hat{\mathbf{v}}_0$、LoRA 引导（rank 64，2.5%）出 $\hat{\mathbf{g}}$，共享同一隐藏态流（挂每个 self-attn 的 q/k/v/out）；NFE=N 精确不变（适配器仅 +15.5ms）；
2. **三段课程**：固定 s=2 蒸 15K 步（lr 5e-5）→ s~U[1,8] 蒸 20K（3e-5）→ (N,s) 双 regime 13K（1e-5）；8×A100 共 48 GPU 时；
3. **推理**：三重稳定化只削 $\mathbf{g}$ 不动 $\mathbf{v}_0$——w(t) 高斯窗（μ=0.5，σ 0.35→0.10 随 s 1→8）；α(s) 在 s_thresh=4 以上线性阻尼（β=0.3，α(8)=0.7）；φ(a) 仅反对齐时启用（φ_min=0.1）；
4. **评测**：ImageNet-256 全 25 格 (N,s) 网格：CFG 追平 24/25（唯一失手 (2,8)）vs 同课程同教师的黑箱 AGD-MultiScale 20/25；(25,8) FID 19.28 vs CFG 21.47；s=10 时 28.41 vs 31.24；Recall 0.35 vs 0.32；DiT-L/4 与 SD2.1/COCO 试点均复现方向（FID-10K 10.41 vs CFG 9.82、黑箱 11.37）；
5. **消融**：统一多尺度蒸馏贡献最大（去掉后 (4,8) 处 +19.5 FID）；对齐门控值 0.6-2.4 FID；把全部可迁移机制塞给黑箱学生仍差 1.3-2.1——分解接口本身有价值。

## 4. 核心公式
- CFG 分解：$\mathbf{v}_{cfg}=\mathbf{v}_0+s\,\mathbf{g}$（$\mathbf{g}=\mathbf{v}_{cond}-\mathbf{v}_{uncond}$——基础流+引导方向，见 [[30-Formulas/无分类器引导（CFG）]]）
- 统一蒸馏损失：$\mathcal{L}=\mathbb{E}\left\|\hat{\mathbf{v}}_0+s\hat{\mathbf{g}}-\mathbf{v}_{cfg}^{teacher}\right\|^2$（s 写在损失里——引导分支梯度自带权重 s，尺度越大训练压力越大）
- 推理稳定化：$\mathbf{v}_{out}=\mathbf{v}_0+s\,w(t)\,\alpha(s)\,\varphi(a)\,\mathbf{g}$（三因子只在需要时削 $\mathbf{g}$：中段外的时间窗/高尺度幅度/反对齐方向）

**直觉**：蒸馏时把"推理时会犯多大错"（含因子 s）写进损失，学生自然在高尺度处更用力；推理时三重门控只在引导方向不可靠的时空位削它——黑箱单遍法没有 $\mathbf{g}$ 这个把手，什么也削不了。

## 5. 与前作/矩阵关系
- ← [[10-Papers/02-生成建模与扩散/Classifier-Free Diffusion Guidance（CFG）|CFG 原文]]（被单遍化的对象）
- ↔ 单遍/少步家族：[[10-Papers/02-生成建模与扩散/How to build a consistency model- Learning flow maps via self-distillation（HTBC）|HTBC]]、[[10-Papers/02-生成建模与扩散/One Step Diffusion via Shortcut Models（Shortcut）|Shortcut]]（步数压缩）vs 本文（NFE=N 不变、砍的是每步双前向——正交加速轴）；黑箱对手 AGD/GFT/ERG（本文对照面）
- 线锚：[[20-Algorithms/扩散模型]] · [[20-Algorithms/一致性模型]]（少步化谱系的邻格）；概念链 [[40-Concepts/NFE（函数求值次数）]] · [[40-Concepts/低秩分解]]（LoRA 适配器）· [[10-Papers/03-后处理/LoRA- Low-Rank Adaptation of Large Language Models（LoRA）|LoRA 原文]]

## 6. 影响后续
- "可分解接口 > 黑箱蒸馏"的干净实证（同预算黑箱学生仍差 1.3-2.1 FID）——为蒸馏场景"保留诊断通道"路线背书；
- s 免重训可调+训练压力自动对齐推理误差，是"事后可控性"蒸馏的范例；
- 后续可期：分解接口 × 少步蒸馏叠加（本文 NFE=N 未动步数）。

## 7. 读前须知
前置：CFG（[[30-Formulas/无分类器引导（CFG）]]）、速度参数化（[[20-Algorithms/流匹配]]）、LoRA（[[40-Concepts/低秩分解]]）。读时抓三点：损失里的因子 s 如何自动配权、三重稳定化各自救哪个 failure mode、两 regime 设计（s≤4 忠实/s>4 有意偏离）的动机。原文：https://arxiv.org/html/2611.05755v1
