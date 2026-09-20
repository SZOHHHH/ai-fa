---
type: paper
title: "Astronex-World 1.0: Real-Time Interactive World Model Foundation"
aliases: [Astronex-World]
year: 2026
authors: [Xin Zhou, Cong Miao]
venue: 技术报告（Astronex Robotics + 南京信息工程大学，2026-09-17）
arxiv: "2609.20034v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: 扩散蒸馏×世界模型（交叉格）
tags: [paper]
---

# Astronex-World 1.0: Real-Time Interactive World Model Foundation

> 260918 处理段精读升级（PDF 前十二页）。开源可控视频世界模型基础模型，权重/代码/HF 全放。

## 1. 一句话贡献

在 Wan2.2-TI2V-5B 视频先验上，用**两块 L20 48GB** 后训练出 5B 双形态可控视频世界模型基础模型：因果形态靠块因果注意力+跨块 KV 缓存+8 步 UniPC 实现 832×480@24fps **单卡实时交互**，WBench Full 70.0——5B 打进 13.6B（LongCat）–22B（LTX-2.3）梯队。

## 2. 核心贡献

- **双形态同接口**：双向模型（全时间注意力，负责离线生成/域适应/当蒸馏教师）与因果模型（块下三角注意力+KV 缓存，负责流式交互）共享同一控制接口与检查点谱系（Stage I 产物 restore-2200 兼任 Stage V 真分数教师）。
- **统一控制接口**：PRoPE 把相机内外参（K, E）注入全部 30 层自注意力（投影几何当位置编码）；64 维连续动作+32 本体 ID 经 MLP 变每帧 shift/scale/gate 调制（与时间步调制叠加）；文本事件可在 rollout 中途插入且只影响插入点之后（因果形态独有——已缓存的过去块不重算）。
- **五阶段训练配方**（Stages I–V）：双向控制适配（LoRA+PRoPE+动作，Control2V/DROID）→块因果转化（干净历史 teacher forcing）→在线 UniPC 轨迹蒸馏（25 步教师→12 步学生）→混合域因果 SFT（恢复主体运动+rolling forcing 对抗 exposure bias）→非对称 DMD/DMD2+**运动保持项**。
- **预留动作输出头**：视觉 token 逐帧池化+LayerNorm-MLP 出 $[B,F,64]$ 动作序列，可后训练为**逆动力学/动作序列解码器**（输入动作可掩码、MSE 只算掩码位）——接口级为具身/驾驶留门，本版未启用。

## 3. 方法概要

1. **数据层**：Control2V（相机内外参轨迹）+ DROID（真机 64 维动作）+ CrossFPS/DrivingDojo/NVIDIA PhysicalAI（游戏/驾驶/机器人混合域），全部对齐到 20 潜帧张量（Wan2.2 VAE，4×时间 16×16 空间压缩）。
2. **Stage I 双向控制适配**：LoRA(rank 64)+PRoPE 先训相机→接动作分支（DROID，相机近静止故 PRoPE 冻结防伪几何规则）→200 步相机恢复（加动作分支会削弱相机响应）→方向增强，得双向发布版 restore-2200。
3. **Stage II 块因果转化**：时间注意力换成块下三角 mask（块内双向、跨块只看历史），每块独立时间步——当前块加噪、过去块给干净真实历史、未来块遮蔽；产物是多步 AR 扩散模型（此时只见干净历史，有 exposure bias 且采样步数多）。
4. **Stage III 在线轨迹蒸馏**：冻结 Stage II 当教师走稠密 25 步 UniPC，学生沿真实 12 步推理路径学教师轨迹上最近的噪声态（随机保留一个转移带梯度，其余 no_grad 保多步历史）；Smooth L1 状态转移+帧间时序差损失。
5. **Stage IV 混合域 SFT**：纯相机数据蒸馏会出"静止主体"（目标分布缺动态）——换混合域数据+rolling forcing（0.8 概率用自生成历史当上下文），窗口 20+sink 4，首帧 0.7 概率保持干净（同权重兼训 I2V/T2V）。
6. **Stage V 非对称 DMD**：生成器=因果 SFT 模型；真分数=冻结双向 restore-2200；假分数=在线训练（restore-2200 初始化）。分布匹配外加运动保持正则防坍缩到低运动条件均值；rollout 1–5 块只末块带梯度。
7. **推理**：8 步 UniPC+CFG 3.0，每块 8 潜帧，20 帧局部窗+4 帧 attention sink 永久保留（参考帧在 sink 内，I2V 一次启动可无限续）；相机视场重叠检索只对回访轨迹（环线/L 形/折返）开启。

## 4. 核心公式

- **流匹配目标**（式 1，全阶段训练本体）：$L_{\text{flow}} = \mathbb{E}\,\lVert v_\theta(z_t, t, c_{\text{text}}, c_{\text{ctrl}}) - (\epsilon - z_0) \rVert_2^2$，其中 $z_t = (1-\sigma_t) z_0 + \sigma_t \epsilon$——直觉：学从噪声指向数据的速度场，全部控制条件（文本/相机 K,E/动作 a）都作为速度预测的条件；时间步移位沿 SD3（shift 5.0）。
- **I2V 帧掩码**（式 2/3）：$z_t = m \odot z_{\text{ref}} + (1-m) \odot \left((1-\sigma_t) z_0 + \sigma_t \epsilon\right)$，$m_1=1$ 其余 0——直觉：参考帧恒为时间 0 的干净上下文，每步采样后重置回 $z_{\text{ref}}$，损失只算生成帧；外观/身份来自 $I_0$，演化由文本/相机/动作决定。
- **CFG 引导速度**：$\hat{v} = v^\emptyset_\theta + w\,(v^c_\theta - v^\emptyset_\theta)$，$w=3$——直觉：无条件（固定负提示）与有条件速度外推，放大条件方向。
- **DMD 伪梯度**（Stage V）：$g_{\text{DMD}} = (\hat{x}^f_0 - \hat{x}^r_0)\,/\,\left(\mathrm{mean}\lvert x_g - \hat{x}^r_0 \rvert + \epsilon\right)$，$L_{\text{DMD}} = \tfrac{1}{2}\lVert x_g - \mathrm{sg}(x_g - g_{\text{DMD}}) \rVert_2^2$——直觉：真/假两个分数网络各自"猜"干净样本，两猜之差即分布级 KL 梯度方向，逐样本归一化后用 stop-gradient 包成代理损失（不回传进分数网络）。
- **运动保持正则**（防坍缩，E1 镜像点）：$L_{\text{motion}} = \lvert \mathrm{mean}\lvert x^i_g - x^{i-1}_g \rvert - \mathrm{sg}(\mathrm{mean}\lvert x^i_{\text{data}} - x^{i-1}_{\text{data}} \rvert) \rvert$，$L_G = L_{\text{DMD}} + \lambda_m L_{\text{motion}}$——直觉：分布匹配会把生成器拉向"低运动的条件均值"（多模态分布的均值处最安静），此项把相邻帧平均变化量钉在真数据水平——**像素版"蒸馏保真正则"：与 E1 决策保真同一思想投影在像素层**。

## 5. 与前作/矩阵关系

- ← 基座：Wan2.2-TI2V-5B 视频先验（库内无卡）+ minWM 工程框架（Causal Forcing/CF++ 配方来源）；
- → 家族放大：[[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]（游戏域像素扩散 WM 的基础模型化对应物——"扩散当动力学"从 1 亿参数游戏域放大到 5B 视频先验）；[[10-Papers/09-世界模型与JEPA/Genie 2- A Large-Scale Foundation World Model（Genie 2）|Genie 2]]（基础世界模型轴：闭源大算力 vs 开源两卡后训练）；[[10-Papers/09-世界模型与JEPA/Learning Interactive Real-World Simulators（UniSim）|UniSim]]（视频学交互模拟器同目标）；
- 方法链：块因果×扩散沿 [[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）|Diffusion Forcing]]（逐 token 噪声级的另一统一路径）；少步化沿 [[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]→[[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]→本卡非对称 DMD；与 [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）|一致性模型]] 同属 [[40-Concepts/NFE（函数求值次数）]] 压缩家族；
- → 同族补记（260919）：[[10-Papers/02-生成建模与扩散/AlayaVista Streaming World Modeling from Panoramic States to Perspective Video|AlayaVista]]（同底座 Wan2.2-5B 流式视频 WM 的全景表征支线：世界演化放 360° 潜状态、只对被查询视口做高保真读出——与 Astronex 的透视+动作接口路线成对，蒸馏配方几乎同款：一致性初始化+Self-Forcing+++分布匹配+像素层防坍缩锚（稀疏谱锚 vs L_motion））
- ↔ E1/E2 对照位：与 E1 重叠"像素扩散 WM×少步蒸馏"两维，但蒸馏目标与评测全线为生成质量（WBench/VBench+运动保持），无决策保真轴；预留 IDM 头对 E2 仅接口占位（无 goal 条件、无反推结果）——详见当日敌情研判。

## 6. 影响后续

- 开源可控视频 WM 基础模型新锚点（权重+代码+HF）；"两卡 L20 后训练即入 14–22B 俱乐部"把基础 WM 后训练门槛打到普通实验室级，预期催生一批域后训练衍生工作（其接口明示留给具身/驾驶）。
- 事件提示（causal 独有的局部文本编辑）与 attention sink 流式记忆，大概率成交互 WM 工程标配。
- 对本库：E1 论文 related work 的"蒸馏目标只用生成指标"对照组再添一实锤（基础模型级的蒸馏仍只配运动保持正则，决策保真无人做）；其 action_output 头结构（池化+LayerNorm-MLP→[B,F,64]，掩码输入动作+MSE）与 E2 IDM 头设计文档互参。

## 7. 读前须知

- **前置**：[[20-Algorithms/扩散模型]]、[[20-Algorithms/流匹配]]（速度参数化）、[[30-Formulas/条件流匹配损失]]、[[30-Formulas/无分类器引导（CFG）]]；
- **按需**：[[40-Concepts/NFE（函数求值次数）]]（少步轴语境）、[[40-Concepts/KV缓存]]（块因果+跨块缓存的流式推理）、[[40-Concepts/位置编码]]（PRoPE=投影几何推广的 RoPE 变体）、[[40-Concepts/逆动力学（IDM）]]（预留动作输出头视角）、[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（Stage V 前置）；
- **易混点**：①双向/因果不是教师-学生临时对，双向模型本身是发布形态之一（restore-2200 兼任 Stage V 真分数教师）；②蒸馏是 25→12 步在线轨迹蒸馏（Stage III）+分布匹配（Stage V）两段，发布默认 8 步是质量-速度折中（4 步可用但发糊）；③"实时"指因果形态单卡流式（每块 8 潜帧），不是全视频一次生成。
