---
type: paper
title: "LeWAM: A JEPA World Action Model with Diffusion-Steering-Based MPC"
aliases: [LeWAM, Diffusion Steering]
year: 2026
authors: [Shashank, Hegde]
venue: arXiv 2610.12407（cs.RO，14 页 6 图，2026-10-08）
arxiv: "2610.12407v1"
pdf: https://arxiv.org/pdf/2610.12407v1
line: 世界模型（e2-inversion-sentry 哨兵组命中）
matrix_coords: [JEPA潜空间WM(免解码器), 四模式(前向/后向/逆动力学/策略), 噪声空间MPC(Diffusion Steering), 机器人操作(PushT+robomimic)]
layer: 精化层（在线全文精读）
---
# LeWAM: A JEPA World Action Model with Diffusion-Steering-Based MPC

## 1. 一句话贡献
在免解码器的 JEPA 潜空间上，用一个双向 transformer 统一"前向/后向/逆动力学/策略"四种模式端到端训练；推理时把采样式 MPC 的决策变量从**动作空间**搬进流匹配策略头的**噪声空间**（Diffusion Steering, DS），修复了规划器利用动力学模型误差、优化幻觉未来导致的闭环塌陷。

## 2. 核心贡献
- **四模式统一**：一个骨干靠不同掩码服务四种模式——Forward（掩末帧回归 $z_{t+1}$）、Backward（掩首帧）、Inverse（全帧干净，对噪声化动作块预测流速度=由前后状态反推动作）、Policy（掩末帧+噪声动作块，从帧推断动作并预测未来）；每个 batch 四模式全部执行、损失求和。
- **对齐**：线性探针从 LeWAM 潜空间读取机器人/物体状态优于只做前向的 LeWM；忽略视觉干扰物与 LeWM 同级、远好于重建式 WAM（RecWAM）——重建容量花在了任务无关细节上。
- **行动**：闭环性能追平同编码器、同规模的纯流匹配 BC 策略，同时白送一个世界模型。
- **规划**：动作空间 MPC（CEM/MPPI/CMA-ES）把**所有**模型打到 3–8% 成功率（规划器钻动力学误差空子=优化幻觉未来）；噪声空间规划 DS-CEM/DS-MPPI/DS-CMA-ES 反而提升闭环。
- **消融**：四模式各自都加分（潜空间信息量/策略/规划三方面）；去掉 $\sqrt{A}$-投影在 Can 上掉 56 个点——典型集投影是关键部件。

## 3. 方法概要
1. **编码器**：ViT-tiny/14（DINOv2 small 架构、从零训练）逐帧编码 224px 帧，[CLS]→BatchNorm MLP 投影得 $z_t \in \mathbb{R}^{384}$；用 SIGReg 正则（把 batch 潜向量推向各向同性高斯）防表征塌缩，不用 EMA/stop-grad。
2. **骨干**：depth 8 / width 512 / 16 头双向 transformer，读 3 帧潜向量 + 3 动作 token（带模态/帧/σ 嵌入），掩码切换四模式；全模型 41M 参数，与 Dreamer/LeWM/RecWAM 严格对齐可控。
3. **动作生成**：rectified flow——训练采 $\sigma \sim U(0,1)$ 构造噪声动作，预测速度目标 $\epsilon - a$；测试时从 $\epsilon \sim \mathcal{N}(0, I)$ 出发 8 步 Euler 积分，形成确定性映射 $a = g(\epsilon; \mathbf{z}_t)$（噪声→动作的解码器）。
4. **目标条件规划**：从演示检索目标潜向量 $z_g$，用前向模式 rollout、按潜距离打分，采样式规划器最小化。
5. **Diffusion Steering**：决策变量从动作序列换成噪声序列 $\epsilon_{1:H}$；第 $h$ 步动作在"想象态"上解码、用前向模式推进想象；每个候选先投影回噪声典型集再解码——搜索严格活在（策略支撑集 × 世界模型想象）的交集里。
6. **数据与评测**：PushT（206 人类演示）+ robomimic 五任务（Lift/Can/Square/ToolHang/Transport，200 熟练人类演示），全部叠加动作无关的视觉干扰物；纯像素输入、无本体感知；300 epoch × 5 seeds，闭环 250 rollouts。

## 4. 核心公式
- 规划代价（式 1）：$\hat{c}(a) = \lVert \hat{f}(\mathbf{z}_t, a) - z_g \rVert_2$
  - 直觉：好动作 = 让想象终点的潜向量贴近目标潜向量，全程不回像素——规划目标天然免外观干扰。
- DS 想象展开（式 2）：$a_h = g(\epsilon_h; \hat{\mathbf{z}}_{h-1})$，$\hat{z}_h = \hat{f}(\hat{\mathbf{z}}_{h-1}, a_h)$，$\hat{\mathbf{z}}_h = \mathrm{shift}(\hat{\mathbf{z}}_{h-1}, \hat{z}_h)$
  - 直觉：动作不是自由变量，而是"噪声在想象状态上解码出的产物"——规划器无法提出策略头没学过的动作，钻误差空子的通道被结构性封死。
- 典型集投影（§4.4）：$\epsilon \leftarrow \sqrt{A}\,\epsilon / \lVert \epsilon \rVert$
  - 直觉：流匹配头在半径 $\sqrt{A}$ 的噪声球面上训练；规划器收敛时提议会缩向小范数均值 = 变相低温采样（mode-seeking）。投影回球面 = 只搜方向、不偷温度，每个解码候选都是头"被训练会输出"的动作。
- 动作头（rectified flow）：$a_\sigma = (1-\sigma)a + \sigma\epsilon$，速度目标 $\epsilon - a$（详见[[30-Formulas/条件流匹配损失|条件流匹配损失]]与[[20-Algorithms/矩形流|矩形流]]）。

## 5. 与前作/矩阵关系
- ← 前身：LeWM/LeJEPA（免解码器 JEPA 世界模型，SIGReg 端到端防塌缩）——LeWAM = 其潜空间 + UWM/Cosmos Policy 式多模式骨架；库内近亲（潜空间 WAM 族）：[[10-Papers/09-世界模型与JEPA/LaWAM- Latent World Action Models for Efficient Dynamics-Aware Robot Policies（LaWAM）|LaWAM]]；
- ≡ 同构对话：[[10-Papers/09-世界模型与JEPA/Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models|Preserving Unstable Modes]]（JEPA+逆动力学，那里 IDM 用于稳定化表征，这里 Inverse 模式是任务侧四模式之一）；
- 规划族：[[10-Papers/09-世界模型与JEPA/TD-MPC2- Scalable, Robust World Models for Continuous Control（TD-MPC2）|TD-MPC2]]（免解码器潜空间 MPPI——但搜动作空间，正是 DS 要修的失败模式）；
- 概念锚：[[40-Concepts/逆动力学（IDM）]] · [[40-Concepts/JEPA联合嵌入预测架构]] · [[20-Algorithms/矩形流]] · [[20-Algorithms/世界模型]]。

## 6. 影响后续
- "免解码器表征 + 四模式 WAM"范式的系统证据；DS（噪声空间规划）是对一切流匹配/扩散策略头通用的纯推理期修复，Golden Ticket/DSRL 一系的推广；
- → 后继补记（261012）：[[10-Papers/09-世界模型与JEPA/H-JEPA End-to-End Learning of Hierarchical World Models for Visual Planning|H-JEPA]]（同出 LeWM/LeJEPA 系——那边堆层级，这里加扩散转向 MPC；两文互为 JEPA WM 的"深度轴/控制轴"延展）。

## 7. 读前须知
- 前置：[[40-Concepts/JEPA联合嵌入预测架构]]、[[30-Formulas/条件流匹配损失]]/[[20-Algorithms/矩形流]]、[[40-Concepts/逆动力学（IDM）]]；采样式 MPC（CEM/MPPI 的 propose-update-select 循环）常识。
- 原文：https://arxiv.org/pdf/2610.12407v1 ｜ 在线全文：https://arxiv.org/html/2610.12407v1
