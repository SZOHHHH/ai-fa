---
type: paper
title: "AD-WM: Action-Discriminative World Models for Counterfactual Model Predictive Control"
aliases: [AD-WM, 动作判别世界模型]
year: 2026
authors: [Jiabin Qiu, Zixuan Chen, Hongye Cao, Jieqi Shi, Jing Huo, Yang Gao]
venue: arXiv 2026（南京大学）
arxiv: "2609.30264v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [JEPA潜空间WM(非像素扩散), IDM辅助正则(非反推任务), CEM-MPC规划, OGBench+Franka机器人]
tags: [paper]
---

# AD-WM（动作判别世界模型）

## 1. 一句话贡献

JEPA 潜空间世界模型补上"动作可恢复"正则——残差潜预测 + 逆动力学头 + 条件互信息下界的归一化恢复目标，逼"模型生成的转移"本身保住动作依赖差异供 MPC 反事实比较（辅助头测试时全部丢弃、规划器零改动）：OGBench-Cube 难起点成功率 3.7%→52.0%，Franka 零样本抓放 42.2%→71.1%；并给出规划侧诊断学实锤——**事实预测误差与全库排序都不追踪闭环成功，精英遗憾才追踪**。

## 2. 核心贡献

- **命题（本文灵魂）**：事实预测精度 ≠ 反事实动作可判别。训练只监督"实际采取的动作"的结果，规划却要比较"同一状态不同动作"——恒等捷径最小模型：转移增量小时 $F_0(z,a)=z$ 只付 $\mathbb{E}\lVert\delta_t\rVert_2^2$ 的误差却给所有动作序列同一终端代价。JEPA 的慢特征偏好（持续场景内容主导表征）放大此病：预测≈复制当前帧，"接近方块"与"远离方块"的差异被抹平
- **残差潜预测**：预测器只学增量 $\hat{z}_{t+1}=z_t+\Delta\hat{z}_t$——单独一项就把难起点成功率从 3.7% 提到 34.7%（最大单一组件；绝对/残差参数化在无约束函数类下最优解相同，差别在学习偏置：显式建模局部潜变化）
- **预测器级动作恢复（predictor-level）**：IDM 头从"当前+预测的下一表征"恢复动作嵌入，恢复目标的 sg 断梯度、**预测端点保持可微**——梯度约束的是"模型生成的转移"而非只约束观测表征；MI 头用归一化动作嵌入+高斯恢复+KL，是条件互信息 $I(\bar{e}_t;\hat{z}_{t+1}\mid z_t)$ 的 Barber–Agakov 变分下界
- **规划侧诊断学**：CAD（全库 Spearman 排序一致性）与精英遗憾 $R_k/\bar{R}_k$（CEM 留下的精英在真实环境实现代价下的遗憾）——15 个模型-种子观测上闭环成功与 CAD 相关仅 $\rho=-0.399$、与负 $R_{30}/\bar{R}_{30}$ 相关 0.863/0.810；**LeWM 事实 MSE 最低但成功最低（3.7%），AD-WM MSE 最高却 52.0%**——"预测误差不追踪决策效用"的潜空间实锤
- **实证覆盖**：五仿真环境 4/5 胜 matched LeWM（Cube 73.3→90.7、Reacher 76.7→83.3、TwoRoom 90→98、Scene 35.5→39.5，PushT 94→92）；消融定贡献序：Res 34.7% < Res+Inv 37.1% < Res+MI 54.7% ≈ AD-WM 52.0%（MI 是最大辅助贡献者，Inv 小且权重敏感）；冻结 V-JEPA 2 编码器 + DROID 后训练零迁移 Franka，三协议全胜且异常动作 6/10→2/10

## 3. 方法概要

1. **设定**：离线数据 $\mathcal{D}=\{(o_t,a_t,o_{t+1})}$（图像+连续动作），编码器 $z_t=e_\phi(o_t)$、潜动力学 $\hat{z}_{t+1}=F_\theta(z_t,a_t)$；测试时给当前图+目标图，MPC 按预测终端代价 $\hat{c}(a)=\lVert\hat{z}_{t+H}-z_g\rVert_2^2$ 比较候选动作序列，执行首个动作块再重规划（无参数更新）
2. **残差预测**：动作先嵌成 $e_t=\psi_\rho(a_t)$，预测器出增量 $\Delta\hat{z}_t=f_\theta(z_t,e_t)$；监督信号是编码后的真实后继 $\mathcal{L}_{\text{pred}}=\lVert\hat{z}_{t+1}-z_{t+1}\rVert_2^2$（等价于让增量匹配编码位移 $z_{t+1}-z_t$）
3. **两个恢复头**：逆动力学头 $\hat{e}_t=g_\omega(z_t,\hat{z}_{t+1})$ 对 sg 停止梯度的 $e_t$ 回归；MI 头收 $[z_t,\hat{z}_{t+1}]$ 出高斯 $q_\eta=\mathcal{N}(\mu_\eta,I)$，对逐分量标准化的动作嵌入做似然+KL
4. **训练**（仿真）：$\mathcal{L}=\mathcal{L}_{\text{pred}}+\lambda_{\text{sig}}\mathcal{L}_{\text{sig}}+\lambda_{\text{inv}}\mathcal{L}_{\text{inv}}+\lambda_{\text{MI}}\mathcal{L}_{\text{MI}}$，ViT-tiny 编码器（192 维）与预测器联合训练，SIGReg 表征正则与 LeWM 同款；$\lambda_{\text{inv}}=0.1,\lambda_{\text{MI}}=0.01$（主权重预注册，敏感性分析显示 $\lambda_{\text{MI}}=0.03$ 更优 65.2%）
5. **部署**：辅助头全丢，CEM（300 候选/30 精英/30 迭代/视界 5）递归滚动式打分选优——**编码器架构与 MPC 流程一字不改**，改动全在训练目标里
6. **真机后训练**：冻结 V-JEPA 2 ViT-G 编码器（去 SIGReg），DROID 数据 315 epoch 后训练，800 候选/10 精英/10 迭代，零实验室图像/示教适配

## 4. 核心公式

恒等捷径（命题的最小模型）：

`$\text{取}\ F_0(z,a)=z\ \Rightarrow\ \text{误差}=\mathbb{E}\lVert\delta_t\rVert_2^2\ \text{（小），但}\ \hat{c}(a)\ \text{对所有动作相同}$`

**直觉**：转移增量小时"什么都不预测"已经很准——低事实误差与零动作信息可以并存。这不是 bug 是结构性缺口：事实监督锚定"发生过的"，从不强制"不同动作的后果可区分"。

逆动力学恢复（predictor 级）：

`$\mathcal{L}_{\text{inv}}=\lVert g_\omega(z_t,\hat{z}_{t+1})-\mathrm{sg}(e_t)\rVert_2^2$`

**直觉**：sg 只断恢复目标——恢复头本身学成什么样不重要，重要的是误差从 $\hat{z}_{t+1}$ 回传进预测器：**逼"模型自己生成的转移"可反推动作**，而不是逼真实观测的表征可反推。一字之差定乾坤：作用点在规划器实际滚动的那条动力学上。

归一化恢复（条件互信息下界）：

`$\mathcal{L}_{\text{MI}}=-\log q_\eta(\bar{e}_t\mid z_t,\hat{z}_{t+1})+\beta\,D_{\mathrm{KL}}\!\left(q_\eta(\cdot\mid z_t,\hat{z}_{t+1})\,\|\,\mathcal{N}(0,I)\right)\ \Rightarrow\ \tfrac{1}{2}\lVert\bar{e}_t-\mu_\eta\rVert_2^2+\tfrac{\beta}{2}\lVert\mu_\eta\rVert_2^2$`

**直觉**：$\bar{e}_t$ 是按批统计量标准化的动作嵌入——归一化控制目标尺度，单位协方差高斯似然才合法；第一项=恢复标准化动作（潜转移必须携带动作信息），第二项=把预测均值往零收（防联合训练漂移）。固定表征下这是 $I(\bar{e}_t;\hat{z}_{t+1}\mid z_t)$ 的 Barber–Agakov 变分下界：**"知道现在、看到预测的未来，还能猜出你干了什么"——条件互信息就是动作信息在生成转移里的存活率**。

精英遗憾（诊断学）：

`$R_k=\dfrac{\min_{a\in E_k(\hat{c})}c^\star(a)-\min_{a\in\mathcal{A}}c^\star(a)}{D_\mathcal{A}},\qquad D_\mathcal{A}=\max_{a\in\mathcal{A}}c^\star(a)-\min_{a\in\mathcal{A}}c^\star(a)$`

**直觉**：不问"全库 300 个候选排序对不对"（CAD，$\rho$ 只有 −0.4），问"你留下的 30 个精英里最好的那个有多好"——CEM 只拿精英重拟合采样分布，全库排错几位无所谓，**精英里保住一个真好货就行**；分母用全库实现代价范围归一化成无量纲量。诊断用真实环境执行取 $c^\star$，只在仿真里做、不进训练不进 MPC。

## 5. 与前作/矩阵关系

- ←直接基线 **LeWM/LeWorldModel**（LeCun 系端到端 JEPA 世界模型，本库未单独建卡）：matched 复现对照，本文全部增益相对它度量
- ≡同格同盟 [[Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning]]（2608.18746，库内）：同一修复思想的平行实现——那篇命名 decision-metric alignment、用 IDM+目标动作头修 LeWM 的 latent 几何、双 Spearman 诊断；本文用 IDM+MI 正则修、elite regret 诊断。**两篇合起来 = "IDM 塑形潜空间几何供规划"已成月更级小簇**
- ≡最近亲 [[Delta-JEPA- Learning Action-Sensitive World Models via Latent Difference Decoding（Delta-JEPA）]]（本文引用[26]）：同样"从潜位移恢复动作"，差别在 Delta-JEPA 用**观测到的**潜差分解码动作，本文把恢复目标作用在**预测的**转移上（predictor-level，梯度直达动力学）
- ←病理根源：JEPA 慢特征聚焦（Sobal et al.——JEPA 预测器偏向缓变特征，动作依赖的快变小差异最容易被牺牲）；[[Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）]] 家族设定
- ←IDM 作表征学习信号的经典谱系：Learning to Poke by Poking、[[40-Concepts/逆动力学（IDM）]] 概念（ICM 好奇心同源）；Markov 状态抽象/动作充分表征理论（Allen et al./Huang et al.）
- ↔正反对照 [[Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）]]：像素侧"视觉细节携带策略信号" vs 潜空间侧"动作差异必须在潜转移里存活"——同一命题（预测保真≠决策效用）在两种表征载体上的双证词
- ⊥同域竞品（本文实验对照，均无卡）：Fast-LeWM（rollout 加速）、Sub-JEPA（子空间高斯正则）、INTACT（意图到动作免搜索）、Qantara（桥流训练）
- 谱系锚 [[20-Algorithms/世界模型]]

## 6. 影响后续

- JEPA-MPC 线的新基线：残差预测+MI 恢复大概率成为该线后续工作的默认组件（对照 LeWM 之于本文的位置）
- **评测学方向**（对我们最有价值）："事实误差→选择质量→闭环成功"三层解耦 + 精英遗憾类决策相关诊断指标——E1 评测章的直接同构参照（我们的三层=像素指标/LPIPS→蒸馏目标→游戏分）
- IDM-as-regularizer（本文）与 IDM-as-task（E2 后验反推）的分岔点：同一工具两种用法，此后引用 IDM×WM 的工作须先问"恢复是目标还是手段"
- 真机零样本协议（冻结 V-JEPA 2+DROID 后训练、无实验室适配）为潜 WM 迁移评估立了模板

## 7. 读前须知

- JEPA 家族基础：先过 [[Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）]]（潜特征预测、无像素重建）与"JEPA 聚焦慢特征"结论，理解"快变小差异被牺牲"的病理
- CEM 规划：交叉熵方法=采样候选→按模型代价留精英→重拟合采样分布迭代，概念级即可（[[30-Formulas/MCTS置信上界]] 的表亲，都是"搜索分布聚焦"思想）
- 变分互信息下界：Barber–Agakov 2003——$I(X;Y)$ 用恢复网络 $q(y\mid x)$ 的对数似然下界，本文的 MI 头就是其条件版
- OGBench：离线目标条件 RL 基准（Cube/PushT/Scene 等），success=达到目标图像，难起点协议 P00–P04 是本文加的扰动强度梯
