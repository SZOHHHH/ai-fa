---
type: paper
title: "Efficient Hybrid Distillation: Synergizing Score and Adversarial Objectives for One-Step Diffusion"
aliases: [EASD, Efficient Adversarial Score Distillation]
year: 2026
authors: [Fei Peng, Junqiang Wu, Haoxian Tan, Jun Zhou, Jie Hu, Xiaoming Wei, Jie Guo, Xiu Li]
venue: arXiv 2026（2611.02 提交，cs.CV；清华+鹏城实验室+美团）
arxiv: "2611.03017v1"
pdf: https://arxiv.org/pdf/2611.03017v1
line: 生成建模与扩散
matrix_coords: [一步蒸馏(score×对抗区间协同), 图像域(ImageNet), DiT/流匹配]
tags: [paper]
---
# EASD（Efficient Adversarial Score Distillation）：score×对抗的区间协同蒸馏

> 中文速览：系统研究一步扩散蒸馏中 score 蒸馏与对抗蒸馏的协同机制：理论上证明二者同源（GAN 非饱和损失的生成器梯度≈Reverse KL 梯度=score 差，都在隐式分布匹配），实证解耦出互补的生效噪声区间——score 蒸馏高噪段有效（全局结构/均值搜索）、低噪段信号消失；对抗蒸馏低噪段有效（细节锐化）、高噪段判别器失效（分布并成高斯球）。据此提出 EASD：区间自适应采样（logit-normal 各自偏置到有效段）+ DiT 冻结教师中间块挂轻量 MLP 判别头 + fake score EMA/迭代预热/潜空间模式搜索正则（并指出蒸馏中叠 CFG 有「双重引导」复合塌模风险，建议多样性受限任务关 CFG 用 LMS）。效果：SiT-XL/2+REPA 一步 FID 1.39（ImageNet 256，60 epoch，SOTA）；ImageNet-64 上 DMD2+EASD 收敛快 2×。

## 1. 一句话贡献

给「score 蒸馏+对抗蒸馏」的混合配方补上理论说明与操作指南：两者本质同源（都在消 score 差）但生效噪声段恰好互补（SD 高噪/AD 低噪）——用区间自适应采样各归其位后，SiT-XL/2+REPA 一步 FID 1.39（ImageNet 256 SOTA）。

## 2. 核心贡献

- **同源证明（对偶）**：score 蒸馏=「组合判别器」（fake score 网 criticize + 生成器 fool）的显式 score 差回归；对抗蒸馏的 GAN 非饱和损失生成器梯度≈最优判别器 odds 的 log 梯度=Reverse KL 梯度=同一 score 差——解释了为何两者可无冲突叠加；
- **区间解耦**：受控消融（限制扰动时间步采样区间 𝒰(t_min,t_max)）——SD 砍掉极低噪段反而更好（2.18@𝒰(0.2,1.0) vs 2.29@全段：低噪段信号消失+数值不稳），砍高噪段崩（2.60@𝒰(0,0.8)：全局结构没了）；AD 高噪段灾难（9.98@𝒰(0.3,1.0)：分布并成高斯球判别器失效）、极低噪段过拟合塌模，甜点在中低噪（2.31@𝒰(0,0.8)：噪声注入=流形平滑）；
- **EASD 框架**：logit-normal 区间自适应采样（SD 偏 μ=0.8、AD 偏 μ=−0.8，宽 spread s=1.6 保交叉覆盖）+ DiT 专用冻结教师判别器（中间块挂轻量 MLP 头：特征平稳+零额外显存）+ 三件稳定器（fake score EMA、迭代预热、LMS 多样性正则）+ CFG 复合陷阱的识别与对策；
- **跨架构验证**：U-Net（EDM）/DiT（Rectified Flow）、64/256 分辨率、score/流匹配三对设置全部有效——ImageNet-64 上 DMD2+EASD 100K 步 1.46 vs DMD2 200K 步 1.51（2× 收敛加速）。

## 3. 方法概要

1. **理论层**：把 SD 读作「组合判别器」的对抗游戏、把 AD 读作 score 差的隐式估计器——同一目标（消 score 差）的两种代理，故可组合；剩余问题是**每段噪声上谁更有效**；
2. **区间自适应采样**：扰动学生输出的时间步不再均匀采，改 $t=\sigma(y),\,y\sim\mathcal{N}(\mu,s^2)$——SD 用 (0.8,1.6) 偏高噪、AD 用 (−0.8,1.6) 偏低噪；软偏置而非硬截断（保留交叉覆盖的正则收益），跨数据集/架构免调参；
3. **流匹配适配**：蒸馏直接在速度空间做（$x_0$ 空间蒸馏=速度空间加权 $t$ 倍，丢掉该因子稳训练）；
4. **DiT 判别器**：不动用重型外部 VFM、不借用非平稳的学生编码器——冻结 teacher 的中间 DiT 块上挂可训练 MLP 头（teacher 本来就在显存里，判别器几乎免费；消融：冻结 teacher 块 1.47 vs fake score 网 1.85）；
5. **稳定器**：fake score 网络 EMA（防追着瞬态批过拟合）、迭代预热（先冻结生成器单训 F_φ 几步，可周期重复）、LMS 正则保多样性；蒸馏中再叠 CFG 会「双重引导」复合塌模——ImageNet 类条件任务建议关 CFG 用 LMS，T2I 对齐任务保留 CFG。

## 4. 核心公式

$\nabla_{x}\mathcal{L}_{G}^{\text{adv}}(\theta)\approx\nabla_{x}\log\frac{D^{*}(x)}{1-D^{*}(x)}=\nabla_{x}\log p_{\text{data}}(x)-\nabla_{x}\log p_{\theta}(x)$

**直觉解释**：对偶的核心式——最优判别器 $D^*=p_{\text{data}}/(p_{\text{data}}+p_\theta)$ 下，非饱和 GAN 损失给生成器的方向=真/生分布的 log odds 梯度=两分布 score 之差。左看是 GAN、右看是 DMD 的梯度——同一枚硬币两面，这就是「可以放心混」的理论根据。

$t=\sigma(y),\quad y\sim\mathcal{N}(\mu,s^{2})$

**直觉解释**：区间自适应采样——logit-normal 把时间步软偏置到想要的一半区间（μ 定中心、s 定宽度）：SD 取 μ=0.8 高噪（管全局结构）、AD 取 μ=−0.8 低噪（管细节锐化）。软偏置优于硬截断：每个目标仍见到全区间，保留交叉覆盖的正则价值，只是把火力重心挪到各自有效段。

$\nabla_{\theta}\mathcal{L}_{\text{FSD}}=\mathbb{E}_{z,t,\epsilon}\left[\left(v_{\text{fake}}(\hat{x}_{t},t)-v_{\text{real}}(\hat{x}_{t},t)\right)\nabla_{\theta}G_{\theta}(z)\right]$

**直觉解释**：流匹配版 score 蒸馏——DMD 的 score 差回归在 Rectified Flow 参数化下化成速度差回归（$x_0$ 空间=速度空间加权 $t$ 倍，丢权稳训）。含义：score 蒸馏的思想与参数化无关，换载体只换皮。

$\mathcal{L}_{\text{LMS}}=\lVert z_{1}-z_{2}\rVert\big/\lVert G_{\theta}(z_{1})-G_{\theta}(z_{2})\rVert$

**直觉解释**：潜空间模式搜索（多样性正则）——输出距离相对噪声距离被拉大=对不同噪声施加「互斥力」，防止塌到单模。它是 CFG 关闭后的 diversity 替补：CFG 在蒸馏里会递归复合（学生学已引导的 teacher 又被再引导），ImageNet 这类多样性瓶颈域宁可关 CFG 用 LMS。

## 5. 与前作/矩阵关系

- ← 前身 [[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（score 差框架+GAN 辅助项的原始混合）与 [[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]（混合配方的规模化）；SiD（未入库）的 score 差视角；
- ≡ 噪声段调度实践对照：[[10-Papers/02-生成建模与扩散/CrossDistill Balancing Quality and Diversity via Trajectory-Level Hybrid Few-Step Distillation|CrossDistill]]（把分布匹配放低噪段做锐化、高噪段留给轨迹保持——与本文「SD 属高噪段」结论表面相悖实则目标不同，互为参照系）；
- ≡ DiT 一步流匹配家族对照组：[[10-Papers/02-生成建模与扩散/Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]]、[[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]]、[[10-Papers/02-生成建模与扩散/One Step Diffusion via Shortcut Models（Shortcut）|Shortcut]]（免蒸馏/自蒸馏路线 vs 本文蒸馏路线的效率-质量三角）；
- 概念链：[[30-Formulas/GAN目标]]（对偶的原形式）、[[30-Formulas/条件流匹配损失]]（速度参数化）、[[20-Algorithms/流匹配]]、[[20-Algorithms/生成对抗网络]]、[[40-Concepts/Score函数]]、[[40-Concepts/KL散度]]（Reverse KL）、[[40-Concepts/NFE（函数求值次数）]]。

## 6. 影响后续

- 混合蒸馏从「经验叠加」升到「区间论」：每个目标在自己的有效噪声段发力——为一切多目标蒸馏（含我们的决策保真+像素混合目标）提供了「监督该落在哪段」的分析模板；
- DiT 上的轻量判别器方案（冻结 teacher 中间块+MLP 头）可直接复用于视频/DiT 系蒸馏；

## 7. 读前须知

- **必前置**：[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 卡（双网络结构）、[[30-Formulas/GAN目标]]（非饱和损失）、[[40-Concepts/Score函数]]、logit-normal 分布直觉（sigmoid 压正态=软区间）；
- **易混点**：①「regime/区间」指**扰动学生输出的噪声水平 t**，不是采样步数，也不是训练阶段；②对偶式是在**最优判别器**假设下的局部近似（附录 E），不是恒等式；③LMS 的比值形式是**最大化**目标（写成损失要取负）；④「SD 低噪失效」指监督信号消失（两个去噪器在近净数据上预测趋同），不是生成质量论断；
- **读法建议**：图 2（统一视角图：两条路都通向 score 差）→ 表 1（区间消融主证据：SD/AD 各自的 FID-区间曲线）→ 图 3（三种噪声段的判别器行为示意）→ 式 9-11（采样与 FM 适配）→ 表 3/4（FID 1.39 与 2× 收敛）→ 附录 D（CFG 复合陷阱推导）。

> 原文：https://arxiv.org/pdf/2611.03017v1 ｜ 在线全文：https://arxiv.org/html/2611.03017v1 ｜ 代码：https://github.com/pf0607/EASD

---

> 谱系枢纽：[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（图谱连通入口）

> 近邻同族：[[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]] · [[10-Papers/02-生成建模与扩散/CrossDistill Balancing Quality and Diversity via Trajectory-Level Hybrid Few-Step Distillation|CrossDistill]] · [[10-Papers/02-生成建模与扩散/Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）|MFD]] · [[10-Papers/02-生成建模与扩散/One Step Diffusion via Shortcut Models（Shortcut）|Shortcut]]

> 数学根基：[[30-Formulas/GAN目标]] · [[40-Concepts/Score函数]] · [[30-Formulas/条件流匹配损失]] · [[40-Concepts/KL散度]]
