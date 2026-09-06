---
type: paper
title: Diffusion Posterior Sampling for General Noisy Inverse Problems
aliases: [DPS, 扩散后验采样]
year: 2022
authors: [Hyungjin Chung, Jeongsol Kim, Michael T. McCann, Marc L. Klasky, Jong Chul Ye]
venue: ICLR 2023 Spotlight
arxiv: "2209.14687"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [—(采样与推断), 后验采样(引导式), 有]
tags: [paper]
---

# DPS（扩散后验采样：任何观测都能当条件，无需重训）

## 1. 一句话贡献

给"用扩散模型解逆问题"一个通用配方：**每步去噪时，把观测似然的梯度叠上去**——从 $p(x\mid y)$ 后验里采样，不需要改训练、不需要成对数据、不需要知道观测过程长什么样（线性/非线性、有噪/无噪通吃）。

## 2. 核心贡献

- **通用性**：逆问题 $y=\mathcal{A}(x)+n$（超分/修复/着色/稀疏采样 MRI/相位恢复/去模糊）统一进一个公式——之前的解法一个任务一套专门设计；
- **似然梯度近似**：真正的后验分数 $\nabla\log p(y\mid x_t)$ 不可算，用"先去噪出干净估计 $x_0'(x_t)$、再算它与观测的残差梯度"近似——**一步 $\hat x_0$ 预览**是全部魔法的核心；
- **噪声感知**：对含噪观测（泊松/高斯），加权系数随噪声水平 $\sigma_y$ 与当前步 $t$ 自适应缩放——早期步多信先验、后期步多信观测，走出"先验流形上的引导路径"；
- **与 MCG 的关系**：流形约束梯度（MCG）+ 不做严格测量一致性投影的混合采样——比前人更柔的路径在含噪时显著更好。

## 3. 方法概要

1. 预训练扩散模型当**先验** $p(x)$（与任务无关，拿现成的）；
2. 推理时正常反向去噪；每一步先用当前 $x_t$ 估干净图 $x_0'$（Tweedie 公式一步预测）；
3. 把观测残差 $\lVert y-\mathcal{A}(x_0')\rVert$ 的梯度反传到 $x_t$，按步长 $\zeta_t$（随 $\sigma_y$、$t$ 定标）叠加进取噪方向；
4. 迭代到 $t=0$，得到后验样本——**换观测类型只换 $\mathcal{A}$ 与 $\sigma_y$，模型与训练零改动**。

## 4. 核心公式

$$\hat\epsilon_t\;=\;\epsilon_\theta(x_t,t)\;-\;\sqrt{1-\bar\alpha_t}\;\zeta_t\,\nabla_{x_t}\big\lVert y-\mathcal{A}\big(x_0'(x_t)\big)\big\rVert^2$$

**直觉解释**：第一项是扩散先验自己的"去噪方向"（往数据流形拉）；第二项是观测的"拉力"（往满足测量那边拉）——每一步都在两种力之间走钢丝，最终落在"既像真实数据、又解释了观测"的区域。**为什么用 $x_0'$ 而不是 $x_t$ 算残差**：观测模型定义在干净图上，$x_t$ 还带着噪声，先一步预测干净版本再对照——这一步近似是它比早期方法稳的关键。

- 需要的前置：[[40-Concepts/贝叶斯公式]]（后验=先验×似然）、[[40-Concepts/Score函数]]（分数叠加=方向叠加）、[[30-Formulas/DDPM训练目标]]、[[40-Concepts/后验采样与planning-as-inference]]

## 5. 与前作/矩阵关系

- ← 图像逆问题的扩散解法一线（Song 等 2021 的修复、RePaint 的重采样、MCG 的流形约束）——DPS 把它们统一成"通用似然引导"；
- ← 数学近亲：[[30-Formulas/无分类器引导（CFG）]]（训练时条件）与经典 [[40-Concepts/贝叶斯公式]] 推断；
- → ΠGDM（伪逆引导闭式近似）、DAPS（退火后验采样）、共轭梯度引导（CGD）……"引导式后验"小家族；
- → 在决策语境的潜在用法：把"未来帧=goal"当观测 $y$、把动作（或未来轨迹）当 $x$——**由果找因的引导式实现**（与 [[10-Papers/04-强化学习与对齐/Planning with Diffusion for Flexible Behavior Synthesis（Diffuser）|Diffuser]] 的 inpainting 硬钉路线互补）。

## 6. 影响与后续

- ICLR 2023 Spotlight，"通用后验采样"成为科学计算（MRI/CT 重建）与生成控制共同的引用锚；
- **零训练条件化**思想扩散：ControlNet 之前/之外，"推理时加梯度"是另一条活路（各有稳定性权衡）；
- 局限：步长 $\zeta_t$ 要调；近似在强噪声/强非线性时退化；采样成本=完整扩散步数（少步化采样器可叠加）。

## 7. 读前须知

- **必前置**：[[40-Concepts/贝叶斯公式]]、[[40-Concepts/Score函数]]、[[30-Formulas/DDPM训练目标]]、[[40-Concepts/后验采样与planning-as-inference]]；
- **易混点**：①DPS 采的是**内容后验** $p(x\mid y)$，不是动作后验——用到决策上需要自己定义"观测=目标的映射"；②它与 CFG 的区别=测试时任意似然 vs 训练时已知条件类；③$\mathcal{A}$（观测算子）必须可微或可绕（不可微时用代理或有限差分）；
- **读法建议**：§3.1（公式推导两页）+ 图 2（噪声水平感知的定性对比）；实验部分按兴趣选读。
