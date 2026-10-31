---
type: paper
title: "sDMD: Sinkhorn Distribution Matching Distillation"
aliases: [sDMD, Sinkhorn DMD]
year: 2026
authors: [Jaihoon Kim, Lingxiao Li, Soshi Shimada, Roshni Cooper, Minhyuk Sung, Yiwei Zhao]
venue: arXiv 2610.39889（KAIST×Netflix，实习成果）
arxiv: "2610.39889v1"
pdf: https://arxiv.org/pdf/2610.39889v1
line: 生成建模与扩散
matrix_coords: [扩散/score, 潜空间, 蒸馏(分布匹配+OT)]
tags: [paper]
layer: 精读
---
# sDMD: Sinkhorn Distribution Matching Distillation

> 261101 今日选定精读（全文已过 arxiv.org/html）。DMD→DMD2→**sDMD**：给分布匹配蒸馏家族补上「全局传输修正」。

## 1. 一句话贡献

把 DMD 严格连上 Wasserstein 梯度流（IKL 能量泛函的不动点回归恰好恢复 DMD 梯度），据此诊断反 KL 蒸馏的两大病灶（teacher 分数低密度区不可靠＋mode-seeking 塌缩），再用**判别器门控的 Sinkhorn 最优传输**只对离群样本开启全局修正——2–4 步采样质量全面超 DMD2 系基线，多样性收复 teacher 一大半，训练开销仅 +3.5%。

## 2. 核心贡献

- **理论户口**：首次证明 DMD 梯度 = IKL（对噪声水平平均的反 KL）能量下 WGF 不动点回归的梯度——「设计蒸馏=换能量泛函」的设计空间从此打开
- **病灶诊断**：双模态玩具分析证明 IKL 速度在 $\sigma_t/\alpha_t\to 0$ 或模态间距 $D\to\infty$ 时指数衰减到 0——塌在错误模态上的样本得不到任何拉回力
- **修复件**：IKL+Sinkhorn 散度（去偏熵正则 OT）组合能量，并证 $w>L/2$ 时合成流以 $W_2$ 指数收敛（Thm 1/2）；有限批估计误差用**门控**规避——复用 DMD2 判别器输出找「teacher 支撑弱」的样本，只对它们开传输
- **实证**：FLUX.1-dev/Qwen-Image-20B/Wan2.1(1.3B/14B) 上 2–4 步 GenEval/DPG/WISE/VBench 超基线；所有多样性指标（TCE/LPIPS-MPD/V-JEPA 成对距离）大幅收复 teacher 水平

## 3. 方法概要

1. **WGF 视角**：把蒸馏看作分布在 Wasserstein 空间沿能量泛函最速下降；生成器输出 $x=f_\theta(z)$ 按速度场 $V$ 做不动点回归（回归目标 $x+V(x)$，stop-gradient）
2. **选能量=选速度场**：IKL 能量的速度场=师生分数差（对噪声平均）——恰好就是 DMD 梯度
3. **诊断**：分数差是「局部密度导游」——teacher 熟悉区精细、陌生区（离群样本/弱支撑模态）失明；反 KL 的 mode-seeking 还会把学生质量集中到部分模态
4. **加全局搬运工**：Sinkhorn 散度项给出批内传输计划的重心投影差 $T_{q,p}(x)-T_{q,q}(x)$——不看密度看几何对应，离群样本也能被「配对拉回」
5. **门控调度**：有限批 Sinkhorn 速度有估计误差，会扰动本已准确的域内样本→用判别器输出 $\lambda_\phi=1-D_\phi\approx q_t/(p_t+q_t)$ 估计「该样本 teacher 支撑弱不强」，超阈值才开传输修正（只救离群、不扰域内）
6. **工程**：条件生成按 prompt 配对师生批（各 8 个，teacher 样本缓存复用）；大模型传输直接在干净潜空间算（省特征编码器）；ImageNet 用 MAE/DINOv2 特征空间

## 4. 核心公式

- IKL 能量（对噪声水平平均的反 KL；$q_t,p_t$ 为加噪边际）：
  $\mathcal{F}_{\text{IKL}}(q)=\mathbb{E}_t\left[D_{\text{KL}}(q_t\,\|\,p_t)\right]$ —— DMD 的隐性能量
- IKL 速度场（代回 WGF 定义即得；与 DMD 梯度只差常数因子）：
  $V_{\text{IKL}}(x)=\mathbb{E}_{t,\epsilon}\left[\alpha_t\left(\nabla\log p_t(x_t)-\nabla\log q_t(x_t)\right)\right]$，$x_t=\alpha_t x+\sigma_t\epsilon$ —— 师生分数差=局部密度导游
- Sinkhorn 散度（去偏熵正则 OT；$S_\beta\ge 0$ 且仅在 $q=p$ 取零）：
  $S_\beta(q,p)=\text{OT}_\beta(q,p)-\tfrac{1}{2}\text{OT}_\beta(q,q)-\tfrac{1}{2}\text{OT}_\beta(p,p)$
- Sinkhorn 速度（传输计划重心投影之差=全局配对搬运方向）：
  $V_{S_\beta}(x)=T_{q,p}(x)-T_{q,q}(x)$，$T_{q,p}(x)=\int y\,\text{d}\pi_{q,p}(y\mid x)$
- 门控判别器（最优判别器下等式精确成立；大=teacher 支撑弱）：
  $\lambda_\phi(x_t,t)=1-D_\phi(x_t,t)\approx \dfrac{q_t(x_t)}{p_t(x_t)+q_t(x_t)}$
- sDMD 合成速度（$\mathbbm{1}[\cdot]$ 指示函数；$\lambda\approx 0.5\text{-}0.55$）：
  $V_{\text{sDMD}}(x)=V_{\text{IKL}}(x)+w\cdot\mathbbm{1}\left[\lambda_\phi(x_t,t)>\lambda\right]V_{S_\beta}(x)$ —— 只在失明时问搬运工
- 训练目标（不动点回归＋DMD2 对抗项交替）：
  $\mathcal{L}_{\text{sDMD}}(\theta,\phi)=\mathbb{E}_{z\sim p_{\text{ref}}}\left\|f_\theta(z)-\text{sg}\left(f_\theta(z)+V_{\text{sDMD}}(x)\right)\right\|^2+\mathcal{L}_{\text{adv}}(\phi,\theta)$
- 收敛定理（$L$=IKL 沿 OT 插值的负曲率上界）：$W_2(q_\tau,p)\le e^{-(w-L/2)\tau}W_2(q_0,p)$ —— $w>L/2$ 时 OT 压过 IKL 的反向拉扯，指数收敛

## 5. 与前作/矩阵关系

- ← 直系：[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（本文给其噪声平均技巧补上 WGF 户口）、[[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]（直接基线；判别器复用其 GAN 头）
- ≡ 换散度设计空间的另一支：[[10-Papers/02-生成建模与扩散/One-step Diffusion Models with f-Divergence Distribution Matching（f-distill）|f-distill]]（f-散度族 vs 本文 IKL+OT 组合）；同族去 fake-score 方向：[[10-Papers/02-生成建模与扩散/Distribution Matching Distillation without Fake Score Network（FSF-DMD）|FSF-DMD]]
- IKL 能量原始出处 = Luo et al. 2023（Diff-Instruct，直接推 IKL 梯度但未连 WGF）；同期 Han/He 2026 用 Sinkhorn-WGF 从头训一步生成器——本文把它接到「蒸馏 pretrained teacher」主战场
- 理论底座：[[40-Concepts/KL散度]]（反 KL 的 mode-seeking）、[[40-Concepts/Wasserstein距离]]（WGF 底座）、[[20-Algorithms/扩散模型]]、[[30-Formulas/蒸馏损失]]、[[40-Concepts/知识蒸馏]]

## 6. 影响后续

- WGF 不动点视角把「蒸馏目标设计」统一成「能量泛函选择」——后续组合（IKL+其他传输/散度项）有模板可套
- 首次在 20B 级文生图/文生视频蒸馏上量化「反 KL 塌多样性」并给出近零开销修复——DMD2 系产品的直接升级件（diag-mask 版 +3.5% GPU 时）

## 7. 读前须知

[[40-Concepts/KL散度]]（反 KL 梯度=分数差）、[[40-Concepts/Wasserstein距离]]（WGF=分布空间最速下降）、[[30-Formulas/蒸馏损失]]、[[20-Algorithms/扩散模型]]（加噪边际 $q_t,p_t$ 与噪声调度）；对比路线 [[20-Algorithms/一致性模型]]。原文：https://arxiv.org/pdf/2610.39889v1；在线全文：https://arxiv.org/html/2610.39889v1
