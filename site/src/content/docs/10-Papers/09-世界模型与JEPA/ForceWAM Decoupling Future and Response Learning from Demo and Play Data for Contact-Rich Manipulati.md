---
type: paper
title: "ForceWAM: Decoupling Future and Response Learning from Demo and Play Data for Contact-Rich Manipulation"
aliases: [ForceWAM]
year: 2026
authors: [Zijun Xu, Wendi Chen, Xinkai Wang, Jiachen Zou, Hongjin Chen, Hairuo Liu, Bokai Lin, Shihao Ma, Ke Ma, Zhiwei Zhang, Zhuohao Yan, Ke Wu, Haoming Song, Xueqi Li, Chuan Wen, Jieru Zhao, Wenchao Ding, Cewu Lu, Lixin Yang]
venue: arXiv 2610.18852（cs.RO，复旦/上交/东南大学/上海创智院/南科大/Noematrix，2026-10-13）
arxiv: "2610.18852v1"
pdf: https://arxiv.org/pdf/2610.18852v1
line: 世界模型与JEPA（e2-inversion-sentry 哨兵组命中）
matrix_coords: [力觉世界动作模型(视频+六轴力未来), 分解式p(g,A|o)=ForceWM×IDM, IDM以视觉-力未来为条件反推动作, 慢快执行(WM慢刷新/IDM流式重去噪), task∪play双数据源解耦, 机器人接触富操作(滑推/翻箱/套环)]
layer: 精化层（在线全文精读）
---
# ForceWAM: Decoupling Future and Response Learning from Demo and Play Data for Contact-Rich Manipulation


## 1. 一句话贡献
把接触富操作的联合分布显式分解为"未来生成器 × 逆动力学执行器"——ForceWM 从成功演示学联合预测未来视频+六轴力/力矩轨迹，IDM 从任务+无任务玩耍数据学"当前观测+视觉-力未来参考 → 动作块"，部署时 IDM 以生成未来为参考、拿实时力反馈反应式更新动作——真机四条件平均成功 85-95%，加 play 数据 +15~45pt。

## 2. 核心贡献
- **解耦公式**：$$p(\mathbf{g}_t, \mathbf{A}_t \mid \mathbf{o}_t, \ell) \approx p_\phi(\mathbf{g}_t \mid \mathbf{o}_t, \ell)\, p_\theta(\mathbf{A}_t \mid \mathbf{o}_t, \mathbf{g}_t)$$——"什么交互是任务兼容的"（演示教会）与"动作如何改变接触"（task∪play 都能监督 IDM，因为任何记录了未来-动作对的片段都是合法监督）分开学，两模块在执行期用力反馈再耦合。
- **视觉-力未来条件化**：ForceWM 用预训练时空视频扩散骨干，五槽潜输入（空白前缀/当前力/当前图/未来力轨迹/未来视觉潜），前三槽去噪全程钳位、后两槽联合生成，packing 适配器把 6 维力值铺满视频潜空间格；EDM 训练。
- **时间因果 IDM + 慢快执行**：慢编码器（当前图/力+正则化未来）出固定 token，快编码器用单向循环网络逐个吃实测力前缀；动作 token 的自注意力和对实测力的注意力都加下三角掩码（token k 只见 0:k），参考力 token 对窗口偏移 ≤k 者隐藏——训练全窗并行但流式推理不漏未来反馈；部署时缓存扩散噪声+慢 token，每来一个新力读数确定性重去噪出当前动作 token（DDIM 单噪声重演）。
- **未来条件增广**：对 IDM 训练的记录未来做随机 dropout+扰动（配对原动作目标），压低对 ForceWM 预测不完美的敏感度——直接针对"生成参考 vs 记录参考"的 train-inference shift。

## 3. 方法概要
1. **两数据源**：200 演示 + 200 play/任务族；play 无任务指令，但每个窗口仍是"（图像，力）未来+关联动作"的合法 IDM 监督——力响应知识从 play 来，任务兼容未来从演示来。
2. **ForceWM**：五槽 EDM 去噪（σ 混合 log-normal+高噪均匀采样），只对生成槽计损失；推理从噪声起采 $$\hat{\mathbf{g}}_t = (\hat{\mathbf{z}}_t, \hat{\mathbf{W}}_t)$$——学的是"任务兼容交互的分布"而非单一力迹线（多解性）。
3. **IDM 训练**：条件扩散（v-prediction），条件=当前图 $$\mathbf{I}_t$$ + 记录未来 $$\tilde{\mathbf{g}}_t$$（增广后）+ 动作率实测力序列；动作=窗口首相对 TCP 位姿+夹爪命令；辅助力导出目标仅训练期用（同 ImplicitRDP）。
4. **部署慢快环**：请求时刻 r ForceWM 生成未来→慢 token 入缓存，同时采样初始扩散噪声 $$\bm{\xi}_r$$；控制序 s+k 处以增长力前缀 $$\mathbf{h}^{(k)}_{r,s}$$ 过快编码器、从同一 $$\bm{\xi}_r$$ 确定性重去噪，只解码发当前 token；到下一慢更新前，生成参考与缓存姿态反复复用。
5. **评测**：滑推（5-15N 力带全程）/翻箱/受扰翻箱/套环四条件，各 20 次/任务，与 RDP/ImplicitRDP/ForceVLA/Cosmos Policy/Fast-WAM/FA-WAM/π0.5 对照。

## 4. 核心公式
- 分解式（式 1）：$$p(\mathbf{g}_t, \mathbf{A}_t \mid \mathbf{o}_t, \ell) \approx p_\phi(\mathbf{g}_t \mid \mathbf{o}_t, \ell)\, p_\theta(\mathbf{A}_t \mid \mathbf{o}_t, \mathbf{g}_t)$$（直觉：任务兼容性进第一个因子（只靠演示），局部执行响应进第二个因子（task∪play 皆可教）——**IDM 不吃指令 ℓ，只吃"要实现什么未来"**，这让无任务的 play 变成一等监督）
- ForceWM EDM 损失（式 2）：$$\mathcal{L}_{\mathrm{WM}} = \mathbb{E}\left[\lambda(\sigma) \lVert \mathbf{M}_{\mathrm{gen}} \odot (\mathbf{x}_t - D_\phi(\mathbf{x}_t^{\sigma}; \ell, \sigma)) \rVert_2^2\right]$$（直觉：只对两个生成槽算重构，钳位条件槽零损失；一个骨干同时出视频与力——力被 packing 适配器抬到视频潜的时空格上共享算力）
- IDM 逐 token v-损失（式 3，统一记号）：$$\mathcal{L}_{\mathrm{IDM}} = \mathbb{E}\left[\sum_{k=0}^{H_a-1} \lVert v_{q,k} - v_{\theta,k}(\mathbf{A}_t^{q}, q; \mathbf{I}_t, \tilde{\mathbf{g}}_t, \mathbf{w}_{t:t+k}) \rVert_2^2\right]$$（直觉：写成逐动作偏移 k 的形式是为了暴露"第 k 步能拿到哪些力反馈"——因果掩码保证训练所见=流式推理可得，无未来泄漏）
- 慢快重去噪（式 5）：$$\hat{\mathbf{a}}_{s,k} = \left[F_\theta(\bm{\xi}_r; \hat{\mathbf{C}}^{\mathrm{slow}}_r, E_{\mathrm{fast}}(\mathbf{h}^{(k)}_{r,s}))\right]_k$$（直觉：固定同一份初始噪声消除"重采样抖动"，只让新力读数改变条件——动作变化完全归因于反馈，这是"反应式"三字的数学实现）

## 5. 与前作/矩阵关系
- 线锚：[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）) · [世界模型](/ai-fa/explore/20-Algorithms/世界模型) · [扩散条件去噪](/ai-fa/explore/30-Formulas/扩散条件去噪)（EDM 去噪损失）· [行为克隆与模仿学习](/ai-fa/explore/40-Concepts/行为克隆与模仿学习)（演示+play 双源）
- ← 前身路线：UniPi/VERA（视频规划+独立 IDM 的分离路线，文中明引）→ ForceWAM 把 IDM 的条件从"纯视觉未来"扩成"视觉-力未来"并加反应式流式推理
- ≡ 同族对话：[UniW(A)M](/ai-fa/explore/10-Papers/09-世界模型与JEPA/UniW(A)M A Unified Mixture-of-Experts Framework for World and World-Action Models)（同日同题近邻：那边把 IDM 做成 MoE 里的原子能力专家联合训练，这边 WM×IDM 两段分开训练各管各的数据源——联合 vs 解耦两条路线同天出现）· [DexTacWAM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/DexTacWAM A Visuo-Tactile World-Action Model for Dexterous Manipulation)（视-触 WAM 家族）· [Preserving Unstable Modes](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models)（IDM 稳表征的 JEPA 侧用法）· [GE-Act 2.0](/ai-fa/explore/10-Papers/09-世界模型与JEPA/GE-Act 2.0 Pretraining and Scaling a World-Action Model for Robotic Manipulation)（WAM 基线家族）
- 概念锚：[on-policy与off-policy](/ai-fa/explore/40-Concepts/on-policy与off-policy)（reactive 重规划 vs 开环执行的分界）

## 6. 影响后续
- 接触富操作"未来条件化 IDM"路线的代表作；play 数据经 IDM 目标变成一等监督的论证（任何动作-未来对皆可教执行）会被后续数据高效操作工作引用。

## 7. 读前须知
- 前置：[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)、[扩散条件去噪](/ai-fa/explore/30-Formulas/扩散条件去噪)（EDM 参数化与 σ 采样）、条件扩散策略（Diffusion Policy 的 v-prediction 惯例；库内 [扩散模型](/ai-fa/explore/20-Algorithms/扩散模型)）、下三角注意力掩码直觉（流式推理对齐训练所见）。
- 原文：https://arxiv.org/pdf/2610.18852v1 ｜ 在线全文：https://arxiv.org/html/2610.18852v1 ｜ 项目页：https://force-wam.github.io/
