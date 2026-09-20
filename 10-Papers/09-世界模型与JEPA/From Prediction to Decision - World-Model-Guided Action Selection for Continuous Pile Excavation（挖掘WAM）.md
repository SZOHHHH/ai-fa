---
type: paper
title: "From Prediction to Decision: World-Model-Guided Action Selection for Continuous Pile Excavation"
aliases: [WAM, 挖掘WAM, World-Action Model]
year: 2026
authors: [Ailing Zhang, Fan Gao, Song Zhang, Kawa Leong, Ziyu Wu, Yafei Wang]
venue: arXiv 2026-09-14（cs.RO，Tsing-AI 上海+上海交大+上海海洋大学）
arxiv: "2609.15382"
pdf: 已下载（PDF/）
line: 世界模型
matrix_coords: WM×决策级评估×机器人挖掘（工程域）
tags: [paper, 核心组命中, 世界模型]
layer: 精读层（PDF 前 12 页全读，260915 ⑦推荐）
---
# From Prediction to Decision: World-Model-Guided Action Selection for Continuous Pile Excavation

> **中文速览**：做了什么——轮式装载机连续挖堆是"每铲都改变后续地形"的序列决策问题，把**冻结世界模型当执行时决策模块**：多候选→预演后果→选优执行→从新地形重规划。怎么做的——条件扩散提案器出 5 个可行动作（几何可行性过滤+多样性约束），冻结的动作条件 WM（DigNet++ 双头）单批预测每候选的带符号地形变化+装载量，执行预测装载量最大者。效果——固定提案器只换选择规则的对照：平均铲数 651.8→540.6（−17.1%）、32/32 配对集全部改善；整机 32/32 胜 SAC 29/32；真机闭环部署（港口铁矿砂 XCMG 电动装载机，Jetson 上 5 候选 72.4ms）。

## 1. 一句话贡献
把世界模型从"训练时的想象器"挪到"执行时的裁判"：扩散出候选动作、WM 先预演后果、挑预测装载量最大的执行——用 matched-candidate 消融证明**决策级收益（−17.1% 铲数）完全来自"预测后果再选"这一步**，并在全尺寸真机上闭环部署。

## 2. 核心贡献
- **Proposal–selection 闭环**：感知→扩散提案→几何可行动性过滤→冻结 WM 批量预演→argmax 执行→从新观测地形重规划，循环至剩余料堆体积 ≤10%。
- **物理结构化动作条件预测器**：输入 6 通道（地形高度+三通道表面法向+轨迹导出的扫掠掩码/挖深图，50×50 ROI），双头联合预测带符号地形变化 $\hat{\Delta H}$ 与装载量 $\hat{V}\ge 0$（DigNet++ Large，10.48M 参数）。
- **决策级评估口径**（对我们最相关）：主消融**固定提案机制、只换选择规则**（Diffusion-direct vs Diffusion-5+WM），隔离出 WM 的决策价值——指标全是任务量（铲数/完成率/装量），预测 MAE 只作诊断。
- **跨域接口+真机部署**：同一预测接口在 4 个仿真器（MinSlope/Chrono/Isaac Sim/Newton MPM）与真机数据各自训练均可学（IoU 0.641-0.928）；ROS2/TensorRT 部署于 Jetson AGX Orin，5 候选 72.4 ms。

## 3. 方法概要（分步）
1. **观测与检查**：LiDAR 聚合点云→高度图 $H_t$ 与法向 $n_t$；算剩余体积率 $\rho_t=V_t^{\text{rem}}/V_0$——$\rho_t>0.10$ 继续、$\le 0.10$ 停（耗尽准则）。
2. **扩散提案**：条件 DDPM（50 步 cosine、7 维归一化动作：接近朝向/横向偏移/接近距离/切削长度/最大挖深/速度尺度/斗翻角）以 $c_t=[\rho_t, g_t]$（剩余率+目标装满率，评估时 $g^\star=0.85$）为条件；每轮并行 16 个提案、按生成序收取与已收集合最小距离 $\ge\delta_a=0.02$ 的 distinct 候选，最多 8 轮（128 个）收满 5 个，不满则整组弃用、退回确定性几何候选集。
3. **几何可行动性过滤**：入口/切削起止点在 $[0,60]^2$ m² 工作区内、接近走廊高度 $\le 0.25$ m、容量限制扫掠体积 $\ge 0.05$ m³、入口位移 $\le 9$ m。
4. **批量预演**：冻结 WM 对 5 个候选一次前向，双头出 $\hat{\Delta H}_t^{(k)}$（U-Net 式解码+线性头）与 $\hat V_t^{(k)}$（GAP→MLP→Softplus 保非负）。
5. **选择执行** $k_t^\star=\arg\max_k \hat V_t^{(k)}$，观测新地形 $H_{t+1}$ 回到第 1 步。
- 提案器训练分两段：**覆盖预训练**（按装载量五分层逆频率加权采样，防"中等装量"的高频动作垄断分布）+**高效微调**（保留全分层但向高装量偏采样）——保动作空间多样覆盖又提产能。消融显示动作导出图（扫掠+挖深）是预测提升的主源（三项 MAE −43%/−42%/−51%），法向增益边际。

## 4. 核心公式
- WM 联合预测：$(\hat{\Delta H}_t,\ \hat V_t)=f_\theta(H_t,\ n_t,\ m_t,\ d_t)$——输入只含**执行前可得**的信息（当前地形/法向/扫掠掩码 $m$/挖深图 $d$）。直觉：正演一步 $\text{p}(\text{后果}\mid\text{状态},\text{动作})$，双头=同一后果的稠密形态（地形变化场）与标量摘要（装量）——摘要头供排序，稠密头供诊断。
- 联合损失：$\mathcal{L}=\mathcal{L}_H+\lambda_V\mathcal{L}_V,\ \lambda_V=1$，地形头逐像素权重 $w_p=M_p(1+4\cdot\mathbf{1}\{|\Delta H_p|\ge\tau_H\})$——**改变过的像素权重 ×5**。直觉：绝大多数像素不变，不加权模型会收敛到"预测不变"的平凡解；把损失质量压到稀疏关键事件区（与 E1 修复件"事件加权蒸馏"同一直觉：梯度要花在决策相关的事件上）。
- 选择规则：$k_t^\star=\arg\max_{1\le k\le 5}\hat V_t^{(k)}$——排序只看装量头不看 $\hat{\Delta H}$。直觉：**用于决策的 WM 输出必须与任务目标同轴**；预测得"全"不如排得"对"，是决策保真思想的工程版。
- SAC 对照奖励（系统级基线）：$r_t=\frac{V_t}{C}-0.08-0.15\cdot\mathbf{1}\{V_t<0.25\}+2\cdot\mathbf{1}\{\rho_{t+1}<0.10\}+0.10\frac{r_t^{\text{dyn}}}{C}$——装量进度为主项+低产罚+终局奖+动力学保护项（滑移/能耗/颠簸）。

## 5. 与前作/矩阵关系
- ↔ 同族（propose-then-rank 第二例）：[[10-Papers/09-世界模型与JEPA/RodForesight - A World Model Enhanced Diffusion Policy for Slender and Material Agnostic Rod Insertion（杆件插装）|RodForesight]]（9/10 杆件插装）——同构"扩散提案+WM 预演筛选"；本文实证更干净（matched-candidate 消融隔离选择规则贡献）且闭环规模更大（连续耗尽 vs 单次插装）+真机部署。
- ↔ E1 动机线同盟：[[10-Papers/09-世界模型与JEPA/Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning|Decision-Metric Alignment]]（latent 距离不保证任务排序）——同说"预测保真≠决策保真"，本文把它落成工程收益数字；E1 论文动机节的工程域外部证据（决策级指标当 WM 评估主口径）。
- ↔ E2 对偶位：[[40-Concepts/逆动力学（IDM）]]——E2 反推 $p(a\mid x_t,\text{goal})$ 是由果找因；本文**goal 条件提案+正演排序**是"先按目标撒候选、再用正演模型挑"——用 5 次正演+一次 argmax 近似一次反演；E2 related work 的"采样+排序 vs 显式反演"对照位（goal 以目标装满率 $g^\star$ 形式进提案条件，监督式分层学得而非反演）。
- ↔ 想象谱系：[[10-Papers/09-世界模型与JEPA/Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）|Dreamer]]（在想象中训练策略）——本文在想象中做**选择**（WM 冻结、不进训练回路），想象用途从训练期挪到执行期。
- 谱系锚：[[20-Algorithms/世界模型]]、[[20-Algorithms/扩散模型]]；公式链 [[30-Formulas/DDPM训练目标]]（提案器即条件 DDPM）、[[30-Formulas/RSSM转移模型]]（动作条件转移模型的一步确定性 CNN 特例）。

## 6. 影响后续
- "propose-then-rank"模式两例成族（RodForesight→WAM）：机器人域正在形成的标准分工——**扩散管多样性、WM 管后果、几何管可行、决策管选择**。
- 局限=我们的机会位：选择器只排序即时预测装量、**无地形前瞻**（作者自列 future work=terrain-aware multi-step objectives——与 E1 修复件"多步 rollout"同款方向）；真机试验只证闭环可行不证统计收益；预测器按域分别训练、无零样本迁移。
- 对库内：占"WM×决策级评估×挖掘（工程域）"格；E1 动机引用位+E2 对照位，不进主线实验。

## 7. 读前须知
- 前置：条件 DDPM 去噪采样直觉（[[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]] 的扩散基础+[[30-Formulas/DDPM训练目标]]）；动作条件转移模型概念（[[30-Formulas/RSSM转移模型]] 的潜空间版对照）。
- 工程术语字面理解即可：工作面=正对的料堆面；扫掠掩码=铲斗轨迹投影到地形网格的二值图；挖深图=轨迹中切削刃最低点相对初始地形的高差截零。挖掘物理被简化为高度场动力学——定量结论限于该简化（作者自承）。
