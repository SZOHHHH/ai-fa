---
type: paper
title: "AlayaVista: Streaming World Modeling from Panoramic States to Perspective Video"
aliases: [AlayaVista]
year: 2026
authors: [Jiaming Tan, Mingliang Zhai, Kaipeng Zhang]
venue: arXiv（Alaya Lab+北京理工大学+东京大学，2026-09-13）
arxiv: "2609.14462v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: 扩散蒸馏×世界模型（全景表征交叉格）
tags: [paper]
---
# AlayaVista: Streaming World Modeling from Panoramic States to Perspective Video

> 260919 处理段精读升级（PDF 前十二页）。单图启动、相机可控的流式全景视频世界模型，权重/代码全开源。

## 1. 一句话贡献
把交互式视频世界模型的"表征权衡"（透视模型离屏内容靠记忆补 vs 全景模型整个球面都算到显示质量 vs 显式 3D 表征管线重）解成**不对称计算**：世界演化放在 360° 全景潜状态里（粗、全），高保真合成只给被查询的透视视口（精、省）——单张透视图启动，流式输出 1024×576 透视视频；配套发布 1318 小时 MUGEN 全景数据集。

## 2. 核心贡献
- **状态×读出解耦**：提出 panoramic state（相机中心的全方位潜表征，非度量 3D 地图）承载全局演化——离屏内容天然在状态里，不需要 landmark bank/空间记忆/3D 重建；视口渲染器按 yaw/pitch/FoV 参数从状态读出观测，把"贵的高保真合成"推迟到视口选定之后。
- **三模块潜空间管线**：ERP 感知全景生成器（Wan2.2-TI2V-5B 改造+球面 RoPE+相机射线支路）→ 潜视口渲染器（几何双线性采样+学习残差，全程不解码全景 RGB）→ 透视精修器（确定性上采样 carrier+载体条件生成细化）。
- **渐进训练配方**：全景生成器走"双向适配（10s/20s，20s 双向版留作真分数教师）→块自回归（teacher forcing+潜腐蚀+自采样历史混合）→4 步蒸馏（一致性蒸馏初始化→on-policy Self-Forcing+++分布匹配+稀疏谱锚）"；渲染器/精修器分模块单独训练，全管线**非端到端**。
- **MUGEN 数据集**：1318 小时 4K+ 一分钟全景片段（YouTube 6446 源→137209 片→亮度/COVER 质量分/字幕水印/轨迹有效性四重过滤），ViPE 相机轨迹+深度图+实例掩码+结构化语义标注；MUGEN-HQ=300h 分层采样子集，另配 Sekai2 全景子集联合训练。

## 3. 方法概要
1. **全景初始化**：HY-World 2.0 预训练扩展模型把单张透视图 $I_0$ 撑成 2:1 ERP 全景 $P_0$（未见区域由先验补全），重图编码为干净初始化块（13 RGB 帧→4 潜切片）。
2. **ERP 感知全景状态生成器 $G_\theta$**：Wan2.2-TI2V-5B+48 通道 WanVideoVAE；SpheRoPE 双路球面位置编码（高频=整数经度谐波跨缝周期，低频=连续球坐标，极区降经度依赖）+经度循环 padding（VAE 冻结）；相机条件=UCPE 改造的并行注意力支路（逐 ERP token 光线坐标架，q/k/v 射线架变换，注意力只依赖相对光线变换，零初始化输出投影保预训练）；块因果演化=块内双向+跨块因果，双路注意力都带对齐时间偏移的 KV 缓存。工作分辨率 960×480 ERP（潜格 30×60）。
3. **潜视口渲染器 $R_\psi$**：把全景潜轨迹直接映射成 512×288 视口潜（18×32），不经"全景解码→像素投影→再编码"；几何对齐 ERP 邻居+分数采样偏移+球面位置/畸变特征构造查询，投影足迹+相机运动扫掠的软几何偏置 cross-attention，再加局部 4×4 适配器；输出=几何条件双线性采样 $S_\kappa$+全局残差+局部残差。训练目标=冻结的"解码-心射投影-再编码"参考算子（视口轨迹覆盖静止/平滑/急转/全旋/跨缝）。
4. **透视精修器**：确定性潜上采样器 $U_\omega$（3D 残差块+空间 PixelShuffle 2×：最近邻 carrier+学习残差，18×32→36×64 即 1024×576）→载体条件生成细化 $F_\phi$（4 潜切片/chunk：载体重加噪出发、干净载体对齐拼接当参考、前块细化结果当干净前缀；块内双向/跨块因果）；蒸馏到每 chunk 4 步，长视频=细化块直接拼接。
5. **训练组织（三组分离）**：全景生成器（双向适配→chunk-AR→少步蒸馏：50 步因果教师一致性蒸馏出 4 步学生（EMA 学生当下游目标）→on-policy Self-Forcing+++分布匹配；真分数=冻结 20s 双向检查点、假分数在线学；稀疏谱锚复用早期缓存特征钉低频布局/颜色）；渲染器（参考算子缓存对训练）；精修器（上采样器→多步质量训练=流匹配+低频锚+高频恢复+感知+时序→4 步 Self-Forcing 蒸馏）。全景初始化器与两个 VAE 全程冻结。
6. **部署链**：$O(I_0) \to G_\theta \to R_\psi \to U_\omega \to F_\phi \to$ VAE 解码 RGB——像素空间投影只造监督，推理全程潜空间。

## 4. 核心公式
- 掩码流路径：$Z_\sigma = (1-\sigma M) \odot Z + \sigma M \odot \epsilon$——直觉：掩码 M=1 的目标态向噪声插值、M=0 的条件态保持干净；一条插值式给出"任意潜切片子集可监督"的部分可观测训练（Astronex 的 I2V 帧掩码是其特例，这里泛化到任意条件配置）。
- 流匹配损失：$L_{\text{FM}} = \mathbb{E}\left[ \frac{w_{\text{Wan}}(\sigma)}{\lVert M \rVert_1} \lVert M \odot \left( v_\theta(Z_\sigma, \sigma, \Pi, c) - (\epsilon - Z) \right) \rVert_F^2 \right]$——直觉：Wan 速度参数化（学 $\epsilon - Z$ 方向），相机轨迹 $\Pi$ 与文本 $c$ 全作速度场条件；逐样本按监督位数归一。
- 相机射线条件：$\Gamma_i = I_{d_h/4} \otimes T_i$，$q'_i = \Gamma_i^{\top} q_i$，$k'_j = \Gamma_j^{-1} k_j$，$v'_j = \Gamma_j^{-1} v_j$——直觉：每个 ERP token 绑定自己的光线坐标架（Kronecker 结构铺满 head 维），注意力内积自动只剩相对光线变换 $\Gamma_i \Gamma_j^{-1} \propto T_i T_j^{-1}$——相机控制=注意力几何的坐标系选择，而非特征拼接。
- 块自回归分解：$p_\theta(B^{\text{pan}}_{1:N} \mid P_0, \Pi, c) = \prod_{n=1}^{N} p_\theta(B^{\text{pan}}_n \mid M_n, P_0, \Pi_{[\le n]}, c)$——直觉：世界演化=块条件链，$M_n$ 是 KV 缓存历史，流式=逐步扩积；训练混入腐蚀历史与自采样历史模拟部署态（exposure bias 对策）。
- 分布匹配伪梯度：$g = (\hat{Z}_{\text{fake}} - \hat{Z}_{\text{real}}) / (\mathrm{mean} \lvert \hat{Z}_{\text{stu}} - \hat{Z}_{\text{real}} \rvert + \epsilon)$，$L_{\text{DMD}} = \tfrac{1}{2} \lVert \hat{Z}_{\text{stu}} - \mathrm{sg}(\hat{Z}_{\text{stu}} - g) \rVert_F^2$——直觉：与 DMD/DMD2/Astronex Stage V 同式（真分数=冻结双向 20s 版、假分数=在线学习）；作用域从图像/透视视频换成全景潜空间。
- 载体重加噪：$X_{n,\sigma_0} = (1-\sigma_0) C_n + \sigma_0 \epsilon_n$——直觉：精修不走全噪声链，从上采样载体轻加噪起步——carrier 供布局/运动骨架（低频被结构锚损失钉住），生成网络只补高频纹理，故 4 步够用。

## 5. 与前作/矩阵关系
- ← 基座：Wan2.2-TI2V-5B 视频先验（与 Astronex-World 同底座）+ HY-World 2.0（全景扩展初始化）+ SpheRoPE/UCPE（球面位置编码与相机条件来源，库内无卡）；
- → 同族最强近亲：[[10-Papers/02-生成建模与扩散/Astronex-World 1.0 Real-Time Interactive World Model Foundation|Astronex-World]]（同底座同配方家族——块因果+KV 缓存+一致性初始化+Self-Forcing+++分布匹配，几乎同周发布；分岔在表征：Astronex 透视+动作接口，AlayaVista 全景状态×视口读出）；
- 方法链：块因果×扩散沿 [[10-Papers/09-世界模型与JEPA/Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）|Diffusion Forcing]]；少步化沿 [[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]→[[10-Papers/02-生成建模与扩散/Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]→本卡分布匹配；一致性蒸馏初始化 ↔ [[10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）|一致性模型]]；同属 [[40-Concepts/NFE（函数求值次数）]] 压缩家族；
- 家族对照：[[10-Papers/09-世界模型与JEPA/Genie 2- A Large-Scale Foundation World Model（Genie 2）|Genie 2]]（基础 WM 闭源轴）/[[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]]（游戏域像素扩散 WM——决策侧对应物）；
- ↔ E1/E2 对照位：与 E1 重叠"像素扩散 WM×少步蒸馏"两维，但蒸馏目标与评测全线生成质量（视觉质量/相机可控/长horizon稳定/流式效率），稀疏谱锚=像素层防坍缩正则；对 E2 仅"状态演化×按参数读出"架构思想擦边，无反推无 goal 条件——详见当日敌情研判。

## 6. 影响后续
- 给交互 WM 表征之争开出第三条路（透视+记忆 vs 显式 3D vs 全景潜状态×视口渲染）；MUGEN（1318h 4K 全景+轨迹/深度/掩码）预计成全景生成与世界模型的事实数据基准；"全局粗/局部精"不对称计算与人类视觉（周边粗视场+中央凹高敏）同构，可能外溢到具身/机器人观测设计。
- 对本库：E1 related work"蒸馏目标只用生成指标"对照组再+1（与 Astronex 运动保持正则、StrucPhysVideo 组成跨层证据链——连全景低频布局都要显式锚住，决策信号更不会被自动保住）；E2 侧"内部状态+条件读出"思想亲戚（视口参数 κ 条件的观测读出 ↔ goal 条件的动作读出）。

## 7. 读前须知
- **前置**：[[20-Algorithms/扩散模型]]、[[20-Algorithms/流匹配]]（速度参数化）、[[30-Formulas/条件流匹配损失]]；
- **按需**：[[40-Concepts/NFE（函数求值次数）]]（双分支各 4 步）、[[40-Concepts/KV缓存]]（块因果缓存流式）、[[40-Concepts/位置编码]]（SpheRoPE=RoPE 的球面推广）、[[10-Papers/02-生成建模与扩散/One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（分布匹配前置）；
- **易混点**：①panoramic state 是相机中心的潜表征不是度量 3D 地图（无几何重建环节）；②视口渲染在潜空间完成，"解码-投影-再编码"只造训练监督；③管线分模块冻结渐进训练、非端到端——生成器与精修器各自蒸馏到 4 步。
