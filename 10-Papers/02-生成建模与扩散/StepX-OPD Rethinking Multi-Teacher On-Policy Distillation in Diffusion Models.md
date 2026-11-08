---
type: paper
title: "StepX-OPD: Rethinking Multi-Teacher On-Policy Distillation in Diffusion Models"
aliases: [StepX-OPD]
year: 2026
authors: [Chenru Wang, et al.（StepFun + 西湖大学）]
venue: arXiv 2026（2611.03 提交；cs.CV/cs.LG）
arxiv: "2611.04386v1"
pdf: https://arxiv.org/pdf/2611.04386v1
line: 生成建模与扩散
matrix_coords: [少步蒸馏(OPD与步蒸馏单阶段合并), T2I文生图, 能力保持(指令遵从/文字渲染/偏好)]
tags: [paper]
---
# StepX-OPD：多教师在线策略蒸馏与步蒸馏的单阶段合并

> 中文速览：指出可部署文生图扩散的两大刚需——多能力（指令遵从/文字渲染/人类偏好）与少步采样——现靠串行两阶段完成（全步多教师在线策略蒸馏 OPD → 定教师步蒸馏），既拖长训练、实测每个全步模型一经压缩还都掉分。提出 StepX-OPD 合并两阶段：一个学生在自己少步 rollout 访问的状态上同时学能力与少步采样，按训练数据源路由到对应的冻结专家教师做蒸馏；插值状态用 γ 混合+精确再加噪构造；并由 reverse-KL 分解证明蒸馏信号权重在低噪端发散（w(t)=(t_i−t)(1−t)/t→∞ 当 t→0），据此在 rollout 低噪段加门控速度回归辅助项。效果：SD3.5-Medium/FLUX.1-dev 上 4 步平均 0.8901/0.8902——全部四步方法最高且超 40 步 Flow-OPD，GPU 时省约 37%；附带发现能力整合会把 prompt 词写进未要求文字的图（21→218 词，源路由变体降到 94/84）。

## 1. 一句话贡献

把文生图扩散的「能力整合」（多教师在线策略蒸馏 OPD）与「少步压缩」（步蒸馏）从串行两阶段合并为单阶段——冻结的能力专家教师直接在学生自身少步 rollout 访问的状态上监督学生，能力与少步采样同时获得；在 SD3.5-Medium/FLUX.1-dev 上 4 步平均 0.8901/0.8902（全部四步方法最高、超 40 步 Flow-OPD），训练 GPU 时比串行流程省约 37%。

## 2. 核心贡献

- **前提实证**：系统测量发现串行流水线的两病——每个全步模型一经步压缩分数一致下降（能力在压缩阶段丢失）；两阶段必须串行完成，训练周期加倍；
- **单阶段合并**：学生少步 rollout 的中间状态直接交给冻结专家教师（GenEval/OCR/PickScore 各能力 DiffusionOPD 教师）做在线策略蒸馏——能力监督与少步压缩在同一 rollout 上同时进行；
- **源路由（source routing）**：每个 mini-batch 按其训练数据源路由到对应的专家教师——消融显示路由是成败关键（OCR 能力 0.8986 vs 随机配对 0.7388/均匀混合 0.6738）；
- **精确插值状态构造**：学生轨迹相邻步间按精确 Euler 子步插值 x_base=γz_start+(1−γ)sg[z_end]，再加噪 z_τ=κx_base+βε（κ=α_τ/α_τbase，β=√max(σ_τ²−(κσ_τbase)²,0)）——保证教师看到的中间状态边际分布正确；
- **低噪速度回归**：由 reverse-KL 分解 $D_{KL}(q_b\|p_b)=D_b+\mathbb{E}[w_b(T)\|v_q-v_p\|^2]$ 推出权重 $w_b(t)=(t_i-t)(1-t)/t\to\infty$（t→0）——分布匹配信号集中在低噪端，故在 batch 平均噪声 τ≤0.5 时门控加入低噪速度回归项 $L_{total}=L_{TDM}+w_v g_v L_v$（w_v=0.5）；
- **副发现**：能力整合使模型把 prompt 里的词直接写进未要求文字的画面（基座 21 张→OPD 后 218 张；源路由变体降到 94/精确教师 84）——能力注入的过泛化副作用及缓解变体。

## 3. 方法概要

1. **起点诊断**：先实测串行两阶段（DiffusionOPD 全步整合能力 → TDM 定教师压步数）：全步模型各项能力达标，但压缩后每个模型分数一致下滑——「能力先整合、后压缩」的假设破产；
2. **单阶段训练循环**：学生按少步采样器 rollout（每步 redraw 随机化 rollout 网格防过拟合特定步数格点）；对轨迹上/轨迹间构造的中间状态，路由到该 batch 数据源对应的冻结专家教师取目标，做在线策略蒸馏（教师看到的必须是学生自己会访问的状态分布，而不是教师的全步轨迹）；
3. **插值状态构造**：相邻采样步间取精确 Euler 子步的凸组合作为 base，再按噪声表精确再加噪——任意细粒度的中间噪声级都有了且边际正确；
4. **双目标加权**：主目标=转移匹配蒸馏（TDM 型分布匹配）；由 reverse-KL 分解知低噪端权重发散，故当 batch 平均 τ≤0.5 时门控开启低噪速度回归辅助项——把低噪细节监督显式补上；
5. **评测**：SD3.5-Medium 与 FLUX.1-dev 两底座、4 步采样、全能力套件（指令遵从/OCR/人类偏好综合 Average）；对比 40 步 Flow-OPD 与各四步基线。

## 4. 核心公式

$D_{\mathrm{KL}}(q_b\,\|\,p_b)=D_b+\mathbb{E}\left[w_b(T)\,\lVert v_q-v_p\rVert^2\right],\quad w_b(t)=\frac{(t_i-t)(1-t)}{t}$

**直觉解释**：把学生 q 与教师 p 的 KL 差距按噪声级 t 分解：常数项之外，剩下的差距就是「速度场之差」按权重 w_b(t) 的加权积分——权重在 t→0（低噪端）发散。含义：分布匹配蒸馏的有效信号天然堆在低噪细节段，高噪段近似无信号；但学生的少步 rollout 在低噪端恰恰访问得稀疏（步长被拉大）——所以显式补一个门控的低噪速度回归项，等于把「信号最重但采样最稀」的地段单独加固（与库内「监督落在哪段噪声」谱系同一问题意识）。

$z_\tau=\kappa x_{\mathrm{base}}+\beta\epsilon,\quad x_{\mathrm{base}}=\gamma z_{\mathrm{start}}+(1-\gamma)\,\mathrm{sg}[z_{\mathrm{end}}],\quad \kappa=\frac{\alpha_\tau}{\alpha_{\tau_{\mathrm{base}}}},\quad \beta=\sqrt{\max\left(\sigma_\tau^2-\kappa^2\sigma_{\tau_{\mathrm{base}}}^2,\,0\right)}$

**直觉解释**：在学生少步轨迹的两点之间「无中生有」中间状态：先按精确 Euler 子步插值出 base（γ 混合，终点 stop-gradient），再按噪声调度精确再加噪到目标级 τ——κ/β 两个系数保证加噪后的边际分布与真实前向过程一致（不是简单线性混合）。教师因此能在学生实际访问的分布上、以任意细的噪声粒度给监督——「在线策略」三字的数学落点。

$L_{\mathrm{total}}=L_{\mathrm{TDM}}+w_v\,g_v\,L_v$

**直觉解释**：主项=转移匹配蒸馏（分布层面学少步采样），辅项=低噪速度回归（w_v=0.5，g_v 为 batch 平均 τ≤0.5 才开启的门）——一项管全局分布、一项管低噪细节，门控避免两项在高噪段互相拉扯。

## 5. 与前作/矩阵关系

- ← 前身流水线：DiffusionOPD（多教师全步能力整合，未入库）与 TDM 型步蒸馏 [[10-Papers/02-生成建模与扩散/Transition Matching Distillation for Fast Video Generation（TMD视频）|TMD]]——本文证明其串行组合「先整能力再压缩」必然丢能力，改为单阶段；
- ← 方法源流：[[10-Papers/02-生成建模与扩散/Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）|Diff-Instruct++]]（在线策略蒸馏做人类偏好——OPD 家族先声）与 [[10-Papers/02-生成建模与扩散/Reinforcing Few-step Generators via Reward-Tilted Distribution Matching（RTDM）|RTDM]]/[[10-Papers/02-生成建模与扩散/DualHeads Reward-tilted few-step diffusion made simple|DualHeads]]（少步生成器的奖励/能力对齐家族）——StepX-OPD 把「能力」从单一奖励扩成多专家路由；
- ≡ 「在学生自己的状态上蒸馏」家族：[[10-Papers/02-生成建模与扩散/DyMD Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video Wo|DyMD]]（少步视频 WM 蒸馏保交互动态）与 [[10-Papers/09-世界模型与JEPA/AnyFlow- 任意步视频扩散的在线策略流图蒸馏（AnyFlow）|AnyFlow]]（on-policy 流图蒸馏压曝光偏差）——同一条「教师必须在学生 rollout 状态上出手」的原则在不同域的落地；
- 线锚：[[20-Algorithms/扩散模型]] · [[20-Algorithms/一致性模型]]；
- 概念/公式链：[[30-Formulas/蒸馏损失]] · [[40-Concepts/知识蒸馏]]（on-policy 蒸馏=蒸馏与 RL 的交叉）、[[40-Concepts/KL散度]]（reverse-KL 分解定低噪权重）、[[40-Concepts/NFE（函数求值次数）]]（4 步部署指标）。

## 6. 影响后续

- 「能力整合与步压缩必须同时进行」成为少步扩散部署的新共识候选——串行两阶段范式（先 OPD 后蒸馏）被判死缓；
- 源路由消融（0.8986 vs 0.6738）给多教师蒸馏立了硬规矩：教师必须与数据源对口，均匀混合反而有害；
- reverse-KL 分解的低噪权重发散结论，为「蒸馏监督的噪声段配置」再添一块理论拼图（与 EASD 的 score/对抗区间理论同谱系）；
- prompt 词写入画面的副作用（21→218→94）提示能力注入存在过泛化，偏好/文字能力与无条件生成质量需要联合调度；

## 7. 读前须知

- **必前置**：[[40-Concepts/KL散度]]（reverse-KL 分解是低噪回归项的全部理论来源）、[[30-Formulas/蒸馏损失]]与 [[40-Concepts/知识蒸馏]]（DMD/分布匹配蒸馏范式）、[[10-Papers/02-生成建模与扩散/Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）|Diff-Instruct++]]（OPD 概念先声）；
- **易混点**：①「单阶段」指训练阶段合并，不是把教师合并成一个——多专家冻结教师仍在，路由按 batch 数据源走；②插值状态的边际正确靠精确再加噪系数 κ/β 保证，不是朴素线性插值（朴素插值会让教师看到偏移的分布）；③低噪速度回归是门控项（τ≤0.5 才开），不是全程常开的第二损失；④Average 是多基准综合分，单看 OCR/偏好分项与综合分结论可能不同；
- **读法建议**：表 1（全步模型压缩后一致掉分的诊断表=全文前提）→ 方法节源路由与插值公式 → reverse-KL 分解小节 → 主表（4 步 0.8901/0.8902 vs 40 步 Flow-OPD）→ 消融表（路由 0.8986/0.7388/0.6738 = 全文最锋利的一组数字）→ 附录 prompt 词写入现象。

> 原文：https://arxiv.org/pdf/2611.04386v1 ｜ 在线全文：https://arxiv.org/html/2611.04386v1

---

> 谱系枢纽：[[10-Papers/02-生成建模与扩散/Diff-Instruct++- Training One-step Text-to-image Generator Model to Align with Human Preferences（Diff-Instruct++）|Diff-Instruct++]]（图谱连通入口）

> 近邻同族：[[10-Papers/02-生成建模与扩散/Transition Matching Distillation for Fast Video Generation（TMD视频）|TMD]] · [[10-Papers/02-生成建模与扩散/Reinforcing Few-step Generators via Reward-Tilted Distribution Matching（RTDM）|RTDM]] · [[10-Papers/02-生成建模与扩散/DualHeads Reward-tilted few-step diffusion made simple|DualHeads]] · [[10-Papers/02-生成建模与扩散/DyMD Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video Wo|DyMD]] · [[10-Papers/09-世界模型与JEPA/AnyFlow- 任意步视频扩散的在线策略流图蒸馏（AnyFlow）|AnyFlow]]

> 数学根基：[[40-Concepts/KL散度]] · [[30-Formulas/蒸馏损失]] · [[40-Concepts/知识蒸馏]] · [[40-Concepts/NFE（函数求值次数）]] · [[20-Algorithms/一致性模型]]
