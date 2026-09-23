---
type: paper
title: "ForeDrive: Foresight-Guided End-to-End Autonomous Driving with a Planning-Relevant Latent World Model"
aliases: [ForeDrive]
year: 2026
authors: [Sinuo Wang, Zichong Gu, Yuhan Huang, et al.]
venue: arXiv 2026
arxiv: "2609.26299v1"
pdf: 已下载（PDF/）
line: 世界模型与JEPA
matrix_coords: [特征预测(JEPA系), 潜在状态, 规划消费(非辅助损失)]
tags: [paper]
---

# ForeDrive

## 1. 一句话贡献

把潜世界模型的预测未来从"预训练/辅助损失"升格为**轨迹规划器的直接条件信号**：JEPA 式潜世界模型与 DiT 规划器非对称耦合（规划梯度更新共享编码器、停梯度隔离预测器），纯模仿学习+单前视摄像头拿到 NAVSIM v1 89.9 PDMS / v2 90.0 单阶段 EPDMS——并实证"预测对齐最优的表征反而规划最差"。

## 2. 核心贡献

- **规划相关潜表征+非对称耦合**：在线编码器由预测与规划双目标共同塑形（规划梯度可改编码器），但停梯度路由保证预测器只吃预测损失——防止规划梯度把预测器改写成"规划特征适配器"、也防止两目标梯度互相干扰
- **规划导向注入接口三件套**：门控视觉融合（当前 token 为 query 的残差交叉注意力+每 horizon 样本共享 sigmoid 门——当前证据永远为主干）、未来状态注入（预测的未来自车运动门控后并入 ego memory）、轨迹自适应偏置 TAB（BEV 轨迹候选投影回前视图，高斯亲和场的 log 偏置加进交叉注意力 logits——补上 BEV 轨迹与图像 token 缺失的显式对应）
- **"消费未来"才是增益来源**：辅助预测损失单独只 +0.1 PDMS，把预测未来喂给规划器 +0.7——预测监督不进规划器就白训
- **预测对齐≠规划有用（关键实证）**：两阶段冻结 WM 的变体潜预测对齐最好（$L_{\text{lat}}$ 5.93、余弦 0.843）但 PDMS 最低（87.9）；全联合训练对齐更差（7.64/0.759）却 PDMS 最高（89.9）——规划塑形故意让表征"偏离预测最优"以保决策相关信息

## 3. 方法概要

1. DINOv3 ViT-B/16 在线编码器把当前前视图像编成 512 个 patch token；EMA 副本（只镜像视觉编码器）编码未来帧做停梯度预测目标（未来帧仅训练期用）
2. 因果潜预测：每个 horizon（1/2/3/4 s）配可学习 query token，帧级块因果 mask 下**单次前向**并行预测多尺度视觉潜变量+自车状态（导航命令 CE+速度/加速度 MSE）——非自回归滚动，未来是"多尺度互补上下文"
3. 注入 DiT 规划器（DiffusionDrive 式 20 锚点截断扩散、两级 DiT 级联）：门控视觉融合+未来状态注入+TAB（去噪中轨迹候选每变一次偏置重算一次，mode 专属、可微）
4. 非对称优化：规划损失更新编码器+规划器但不碰预测器；预测器只由预测损失训练；EMA 目标只经"编码器→EMA"路径间接被规划影响
5. 纯模仿学习一阶段训练；推理只需当前单帧前视图（58.2 ms/帧，118.4M 参数）

## 4. 核心公式

多尺度因果潜预测：

`$\{(\hat z_t, \hat s_t)\}_{t \in \mathcal{H}} = P_\psi(z_0, s_0, Q_\mathcal{H}),\quad \mathcal{H} = \{1,2,3,4\}\ \text{s}$`

**直觉**：一次前向把四个 horizon 全预测出来——早期 horizon 对晚期可见、晚期对早期不可见（块因果），但它们不是滚动的链式状态而是并列的"近视/远视"多个焦段，规划器按需取用。

非对称梯度路由+总损失：

`$\mathcal{L} = \lambda_{\text{traj}} \mathcal{L}_{\text{plan}} + \lambda_z \mathcal{L}_{\text{lat}} + \lambda_s \mathcal{L}_{\text{status}},\quad \mathcal{L}_{\text{plan}} \to E_\theta, F;\ \mathcal{L}_{\text{plan}} \not\to P_\psi$`

**直觉**：编码器是双目标共享的地盘，谁都能动；预测器是预测的独占领地，规划不许插手——"塑形表征"与"保持预测者身份"分家，梯度路由就是两家之间的墙。这堵墙正是 Table 6 里"全联合 89.9 > 冻结 WM 87.9"的来源：没有墙，规划会把预测器也拖离纯预测。

TAB 轨迹自适应偏置（概念式）：

`$\text{logit}_{m,n} \mathrel{+}= \log \max_{p \in \text{proj}(\tau_m)} \exp\!\left(-\lVert u_n - p \rVert_2^2 / 2\sigma^2\right),\quad \sigma = 0.25$`

**直觉**：BEV 轨迹候选 $\tau_m$ 投影回图像平面，哪个视觉 token $u_n$ 离投影路径近就在注意力 logits 里加分——"这条路要看哪片像素"由几何直接给出，不用学。无效投影时偏置退化为常数、注意力分布不变（软先验不绑架）。

## 5. 与前作/矩阵关系

- **论题近亲**：[[Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning]]——"预测保真≠决策保真"的潜空间版论题，本文 Table 6（对齐最优变体规划最差）是该论题迄今最干净的驾驶域消融实证；其"修复=让动作结构塑形 latent 几何"，ForeDrive 的修复=让规划梯度塑形共享编码器，同一家族两种实现
- JEPA 谱系：[[Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）]] / [[V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）]] 的 online/EMA+免像素重建骨架（DINOv3 初始化空间），[[40-Concepts/JEPA联合嵌入预测架构]]
- 同域对照：[[Sometimes You Gotta Run Before You Can Walk Run-then-Walk Scheduling Strategy for VLM Autonomous Dri|Run-then-Walk]]——同在 NAVSIM 上做 RL 后训练（GRPO 奖励调度），ForeDrive 反向证明纯 IL+未来注入已够打，两条路线互补
- 线锚：[[20-Algorithms/世界模型]] · [[20-Algorithms/扩散模型]]（DiT 规划器骨干）· [[40-Concepts/行为克隆与模仿学习]]（纯 IL 协议）

## 6. 影响后续

- "辅助损失不够、必须消费未来"（+0.1 vs +0.7）与"对齐最优≠规划最优"（87.9 vs 89.9）两枚消融，将成为 WM-for-planning 工作的标准自证项——只报预测指标不报下游消费的论文会越来越难自圆
- 非对称梯度路由（双目标共享模块时"谁的地盘谁训练"）是可迁移的训练配方
- TAB 示范了"坐标系错位时用几何先验桥接注意力"的轻量做法（无可学参数也能 +0.6）

## 7. 读前须知

[[40-Concepts/JEPA联合嵌入预测架构]]（online/EMA 双编码器与免重建预测）· [[40-Concepts/注意力机制]]（残差交叉注意力与 logit 偏置注入）· [[40-Concepts/行为克隆与模仿学习]]（模仿学习协议与截断扩散轨迹解码）· NAVSIM 非反应式仿真（ego 提交一条 4 s 轨迹、他车按日志回放——开环承诺式评测的局限本文自认，闭环交互是下一步）。
