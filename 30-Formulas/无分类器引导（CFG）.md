---
type: formula
formula_id: CFG
aliases: [无分类器引导, Classifier-Free Guidance, CFG]
domain: 生成建模
tags: [formula]
---

# 无分类器引导 CFG

## 1. 标准形式

$$\hat\epsilon_\theta(x_t, t, c) = \epsilon_\theta(x_t, t, \varnothing) + w\,\Big( \epsilon_\theta(x_t, t, c) - \epsilon_\theta(x_t, t, \varnothing) \Big)$$

- $c$：条件（文本嵌入等）；$\varnothing$：空条件
- $w$：引导强度。$w=0$ 无条件；$w=1$ 普通条件生成；$w>1$ **外推**（沿"条件−无条件"方向放大）
- **训练**：以概率 10–20% 随机丢弃条件（置 $\varnothing$），单网络同时学会条件与无条件

## 2. 表示对照表

| 表示名 | 公式核心 | 出处 | 说明 |
|---|---|---|---|
| ε-外推（本库标准） | 如上 | Ho & Salimans 2022 | 通用形式 |
| score 形式 | $\hat s = s_u + w(s_c - s_u)$ | 同期 score 记号 | 换算 $s = -\epsilon/\sigma$ |
| v 参数化版 | 对 $v_\theta$ 同样外推 | 视频/SD3 时代 | 与 v-prediction 配套 |
| 分类器引导（前身） | $\hat\epsilon = \epsilon_\theta - \sqrt{1-\bar\alpha_t}\,\nabla_{x_t}\log p_\phi(c \mid x_t)$ | Dhariwal & Nichol 2021 | 需额外训练噪声分类器 |

**历史脉络**：classifier guidance（需分类器）→ CFG（去分类器，双倍前向换简单性）——后者成为 SD/所有文生图标配。

## 3. 直觉解释

- **外推的直觉**：无条件预测 = "平均水平"，条件预测 = "被 $c$ 拉偏"，差值 = "$c$ 的纯影响"。$w>1$ 把这个影响放大——图像更贴合 prompt，代价是多样性下降、过度饱和
- w 是生成质量/多样性的总阀门（SD 的 CFG scale 旋钮）
- 为什么不用分类器：噪声版分类器难训、易被对抗利用；CFG 只需一个网络、训练零改动
- 现代变体：Aperture/蒸馏时代的 CFG 蒸馏（把 w 折进学生权重，省双前向）

## 4. 出处

| 论文 | 贡献 |
|---|---|
| [[10-Papers/02-生成建模与扩散/Classifier-Free Diffusion Guidance（CFG）]] | 提出 CFG |
| [[10-Papers/02-生成建模与扩散/Diffusion Models Beat GANs on Image Synthesis（ADM）|Diffusion Models Beat GANs]] | 分类器引导前身 |

## 5. 数学概念分解

- [[40-Concepts/期望]]：条件期望 vs 无条件期望的操作
- [[40-Concepts/梯度]]：引导本质是沿条件信息梯度外推
- [[40-Concepts/概率分布]]：引导扭曲采样分布（trade-off 的来源）

## 6. 与其他公式的关系

- → **改进自** 分类器引导：去掉分类器依赖
- 作用于采样阶段，与 [[30-Formulas/DDIM更新规则]] / [[30-Formulas/DDPM训练目标]] 正交组合
- → **被蒸馏**：DMD/SD3-Turbo 把 CFG 融入单次前向（线 3 蒸馏应用）
