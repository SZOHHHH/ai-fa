---
type: paper
title: "DyMD: Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video World Models"
aliases: [DyMD]
year: 2026
authors: [Haojun Xu, Jie Huang, Xin Lu, Mingchen Zhong, Zihao Fan, Linjiang Huang, Si Liu]
venue: arXiv 2026-09（北航+京东未来学院）
arxiv: "2609.31349v1"
pdf: https://arxiv.org/pdf/2609.31349v1
line: 生成建模与扩散
matrix_coords: [少步蒸馏(DMD系), 显式像素(视频), 机器人操作]
---

# DyMD：保住交互动态的少步视频世界模型蒸馏

## 1. 一句话贡献


## 2. 核心贡献

- **时序亲和度条件化重加噪采样**：教师速度转向率先验（命题 1：转向率² ≥ 后验路径 Fisher 信息下界）与基础调度按 rollout 的交互保真度（V-JEPA 特征时序亲和度 $$A_i$$）逐条混合——保真差的 rollout 多用教师先验，保真好的保留外观精化；
- **动态引导 fake-score 追踪**：轻量 MLP 从 VAE latent 时序描述子预测"噪声相对拟合难度"，对预测难的 rollout 在 critic 损失中加权——不增加 critic 更新次数；
- **规模数字**：PF-Wan 14B 教师 → 4 步 1.3B 学生（推理零辅助模块），R-Bench 任务依从 +9.6pt、PAI-Bench-G Domain +5.1，**WorldArena 下游规划成功率 16%→34%**。

## 3. 方法概要

1. **起点观察**：对机器人操作微调的视频扩散教师（PF-Wan 14B）做 vanilla DMD，得到清晰但"近乎静止"的 4 步学生——视觉质量分数反升（PAI Quality 75.3→78.1）而交互动态崩（R-Bench TAC 34.6）；
2. **诊断一（教师侧）**：把同一条静止 rollout 按不同噪声水平重加噪后交给冻结教师精化——低噪声下视频几乎不动，高噪声恢复运动但引入伪影；机制：高 SNR 时教师的干净视频后验被 Gaussian 似然锁在 $$x_0 \approx x_0^S$$ 附近；
3. **诊断二（批评家侧）**：冻结 32 条 rollout 探针发现 latent 运动越强、critic FM loss 越高——强运动样本是 critic 的"难点"，有限更新次数下追踪不准；
4. **药方一（自适应重加噪）**：离线画像教师的去噪方向转向率曲线得先验调度 $$\nu_\kappa$$；每条 rollout 在冻结 V-JEPA 2.1 特征空间算与配对参考视频的时序亲和度 $$A_i$$，按 $$A_i$$ 混合 $$\nu_{base}$$ 与 $$\nu_\kappa$$（生成器与 critic 共用同一采样规则）；
5. **药方二（难度加权追踪）**：按噪声 bin 的 EMA 基线把 log FM loss 中心化成"噪声相对难度"，MLP 从 latent 时序描述子+噪声嵌入预测之，softmax 权重加权 critic 损失；
6. **训练**：学生与 fake-score 模型从 Wan2.1-Fun-1.3B 初始化，32897 条 RoVid-X 精选片段，2500 步、batch 32，α=0.3、β=0.5。

## 4. 核心公式

DMD 的 score-difference 更新（教师−批评家）：

`$$\nabla_\theta \mathcal{L}_G \approx \mathbb{E}\big[\big(\tfrac{\partial x_0^S}{\partial \theta}\big)^{\top}\,(s_\phi - s_T)\big]$$`

**直觉**：学生沿"两个 score 之差"这个力场走——教师说往哪去，批评家（fake-score）说学生分布现在在哪，差值就是前进方向。两个病灶都发生在这个力场上：教师力被锁死（不指路）、批评家力有噪（指错路）。

教师后验的模式锁死（诊断一的机制）：

`$$p_T(x_0\mid x_t,c) \propto p_T(x_0\mid c)\,\mathcal{N}\big(x_t;\,(1-\sigma_t)x_0,\ \sigma_t^2 I\big)$$`

**直觉**：$$\sigma_t$$ 小（高 SNR）时 Gaussian 项变成尖峰，把后验（因而教师 score）钉在运动缺失的学生 rollout 旁边——**教师再准也救不了**，因为它的"证据"就是那条静止视频。要解锁只能加噪，但加太猛又毁外观证据，所以要按 rollout 状态自适应。

时序亲和度混合调度（药方一）：

`$$g_i = \dfrac{\alpha}{\alpha + (1-\alpha)A_i},\qquad \nu_i(t) = (1-g_i)\,\nu_{base}(t) + g_i\,\nu_\kappa(t)$$`

**直觉**：$$A_i$$ 是学生与参考视频在 V-JEPA 空间的多尺度时序变化相似度（0~1）。$$A_i$$ 低（交互动态差得远）→ $$g_i$$ 大 → 多采教师先验（去高转向率=后验剧烈变动的噪声区间"摇醒"教师）；$$A_i$$ 高 → 保留基础调度精化外观。

难度加权 critic 损失（药方二）：

`$$r_i = \mathrm{sg}\big[\log \ell_i^{FM} - b_k(t_i)\big],\qquad w_i = \dfrac{\exp(\beta \hat{r}_i)}{\frac{1}{B}\sum_j \exp(\beta \hat{r}_j)}$$`

**直觉**：$$b_k(t_i)$$ 是同噪声档的跑动基线，$$r_i>0$$ 表示"这条比同噪声下的典型样本更难拟合"。预测器只看 latent 时序动态就能预判难度，权重均值归一到 1——同一更新预算下把力气花在难样本上。

## 5. 与前作/矩阵关系

- ← DMD/DMD2 谱系（[FSF-DMD](/ai-fa/explore/10-Papers/02-生成建模与扩散/Distribution Matching Distillation without Fake Score Network（FSF-DMD）)、[Diff-Instruct](/ai-fa/explore/10-Papers/02-生成建模与扩散/Diff-Instruct- A Universal Approach for Transferring Knowledge From Pre-trained Diffusion Models（Diff-Instruct）)、[EMD](/ai-fa/explore/10-Papers/02-生成建模与扩散/EM Distillation for One-step Diffusion Models（EMD）)——**EMD 正是我们 EMDMD 的源头**）；
- ≡ 蒸馏失配三家处方：[WorldPlay](/ai-fa/explore/10-Papers/09-世界模型与JEPA/WorldPlay- 长期几何一致的实时交互世界建模（HY-WorldPlay）) 的 Context Forcing（对齐记忆）、[Causal Forcing](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Causal Forcing- 自回归扩散蒸馏的正确姿势（Causal Forcing）)（因果教师）、DyMD（自适应重加噪）——**同一病根"开环蒸馏的分布/后验失配"的三个独立药方**，与我们 EMDMD 的 on-policy 化同方向；
- ≡ 9/24 实时交互 WM 家族续篇：[AnyFlow](/ai-fa/explore/10-Papers/02-生成建模与扩散/AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）)（on-policy 流图蒸馏）、[minWM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/minWM- 全栈实时交互世界模型框架（minWM）)、[WorldCompass](/ai-fa/explore/10-Papers/09-世界模型与JEPA/WorldCompass- 强化学习训练长视野世界模型（WorldCompass）)；
- ⊃ 表征工具：时序亲和度用 [V-JEPA 2](/ai-fa/explore/10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）) 特征度量交互保真度；
- 概念链：[NFE（函数求值次数）](/ai-fa/explore/40-Concepts/NFE（函数求值次数）)（4 NFE vs 教师 80）、[知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏)、[on-policy与off-policy](/ai-fa/explore/40-Concepts/on-policy与off-policy)（rollout 自适应=向 on-policy 靠拢）、[条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)（式 3 critic 回归）、[贝叶斯公式](/ai-fa/explore/40-Concepts/贝叶斯公式)（式 4 后验分解）、[KL散度](/ai-fa/explore/40-Concepts/KL散度)（reverse KL 目标+式 8 Fisher 展开）、[蒸馏损失](/ai-fa/explore/30-Formulas/蒸馏损失)。

## 6. 影响后续


## 7. 读前须知

DMD 基础：[FSF-DMD](/ai-fa/explore/10-Papers/02-生成建模与扩散/Distribution Matching Distillation without Fake Score Network（FSF-DMD）) 卡的 score-difference 推导；流匹配回归：[流匹配](/ai-fa/explore/20-Algorithms/流匹配)+[条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)；后验/Fisher 信息视角：[贝叶斯公式](/ai-fa/explore/40-Concepts/贝叶斯公式)+[KL散度](/ai-fa/explore/40-Concepts/KL散度)；与我们病理的对照：E1_实验数据台账（EMDMD 分布伤/决策保真三层互锁节）。
