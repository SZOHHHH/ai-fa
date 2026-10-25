---
type: paper
title: "UniW(A)M: A Unified Mixture-of-Experts Framework for World and World-Action Models"
aliases: [UniW(A)M, UniWAM]
year: 2026
authors: [Jianjie Fang, Zhuohang Li, Zihao Song, Zhaolu Wang, Xvyuan Liu, Xin Zhang, Haisheng Su, Yinzhou Tang, Chen Gao, Wei Wu, Yong Li]
venue: arXiv 2610.18697（cs.RO，清华/中关村学院/华东师大/Manifold AI，2026-10-13）
arxiv: "2610.18697v1"
pdf: https://arxiv.org/pdf/2610.18697v1
line: 世界模型与JEPA（diffusion-world-model 组命中）
matrix_coords: [扩散DiT-MoE(Wan2.2-TI2V-5B,~16.2B,五接口共享), 视频动作可见性掩码(接口=条件依赖), CATR能力对齐token路由, IDM原子能力(视频条件动作生成), PAIR部署期接口路由(冻结主干), 机器人操作(LIBERO/RoboTwin2.0/真机)]
layer: 精化层（在线全文精读）
---
# UniW(A)M: A Unified Mixture-of-Experts Framework for World and World-Action Models

> 精读升级 2026-10-14（每日日常处理段，在线全文 arxiv.org/html/2610.18697v1）。清华系 Worldscape-MoE 一脉：把"动作条件世界模型 + 四种世界-动作模型接口"塞进同一个扩散 Transformer MoE，用视频-动作可见性掩码定义接口、能力对齐 token 路由分专家，部署期外挂轻量路由器按动作块选接口。

## 1. 一句话贡献
用一个扩散 Transformer MoE 同时联合训练"动作条件世界建模（AC-WM）+ 四种 WAM 接口"——视频-动作可见性掩码显式定义每种接口的条件依赖，四种原子能力专家（VGM/VLA/WM/IDM）跨接口复用——真机操作平均成功 88.3%（最强基线 76.7%），消融显示 AC-WM 协同训练让所有动作接口涨分（连部署时不生成视频的 action-only 接口也 +31.7/+43.3pt）。

## 2. 核心贡献
- **接口即掩码的统一建模**：把 AC-WM、Joint-WAM、IDM-WAM、Action-Centric-WAM、Action-Only-WAM 五种范式统一为"同一轨迹数据上的条件依赖模式"，用训练/推理两套注意力可见性掩码显式实现——哪种 token 能看哪种 token 决定了接口的身份。
- **四种原子能力 + CATR 能力对齐路由**：VGM（无动作视频预测）/VLA（直接动作生成）/WM（动作条件视频预测）/IDM（视频条件动作生成）四种可复用预测角色；CATR 给每个视频/动作 token 组指定合格专家集、组内共享学习到的混合权重——对照同样参数量的样本级路由，action-only 接口从 10% 拉到 80%+。
- **PAIR 插件式自适应接口路由**：主干冻结后，只用目标任务的少量动作块场景离线训练一个分类头（MAE 软标签+效率偏好），部署时按动作块在四接口间切换——OOD 平均成功 63.3%→76.7%，且在帕累托前沿上（接近段选快接口、接触/精细段选带前瞻的接口）。
- **AC-WM 协同训练的迁移证据**：去掉 AC-WM 后四个 WAM 接口全线掉分，action-only 类掉得最狠（−31.7/−43.3pt）——世界建模知识可迁移给"部署时不做视频预测"的快策略，尽管每接口分到的训练步数反而更少。

## 3. 方法概要
1. **定义接口**：一段具身轨迹 = 历史观测 o_{≤t} + 指令 ℓ + 未来视频 o_{t+1:t+k} + 未来动作 a_{t+1:t+k}。接口差异只在"未来动作是条件还是目标、未来视频与动作 token 互相看不看得见"：Joint-WAM 双向可见联合去噪；IDM-WAM 先生成视频再以其为条件推动作（单向掩码）；Action-Centric-WAM 动作不看未来视频、视频看动作（视频仅作训练监督，部署不生成）；Action-Only-WAM 双向皆断；AC-WM 动作是干净条件、只预测视频。
2. **MoE 化**：把扩散 Transformer 的稠密 FFN 换成 MoE（每层 1 个共享专家 + 4 个原子能力专家，全部从预训练稠密层复制初始化，路由矩阵零初始化→初始输出与稠密层恒等）；骨干 = Wan2.2-TI2V-5B，总参 ~16.2B。
3. **CATR 路由**：按 token 组（模态×预测角色）指定合格专家集，路由器对组内池化表征出 softmax 混合权重，组内 token 共享权重、各自过专家；干净条件（历史/状态）只走共享专家。
4. **联合训练**：五接口均匀采样（各 0.2），每步只优化一个采样到的接口；流匹配目标，视频/动作共享逐块噪声水平；Action-Centric/Only 给动作损失 ×5 权重。
5. **PAIR 适配**：主干冻结；对每个目标任务的 2000 个动作块场景，让四个冻结接口各自预测动作、与真值算 MAE，归一化后经温度 τ 软化为路由监督（MAE 差 1% 以内且有快接口则 one-hot 选最快的）；八头集成分类头按当前上下文选接口执行下一块，接口切换清缓存重播种。

## 4. 核心公式
- Joint/IDM-WAM 因子分解（附录 A.1 式 3/4，同式异义）：$$p(o_{t+1:t+k}, a_{t+1:t+k} \mid C_t) = p_{\mathrm{VGM}}(o_{t+1:t+k} \mid C_t)\, p_{\mathrm{IDM}}(a_{t+1:t+k} \mid C_t, o_{t+1:t+k})$$（直觉：联合分布拆成"视频边缘 × 动作条件"——Joint 版双向注意力让两支去噪表征互通，IDM 版按此顺序串行采样；IDM 因子=给定未来视频反推动作，即逆动力学）
- Action-Centric-WAM 因子分解（式 5）：$$p(o_{t+1:t+k}, a_{t+1:t+k} \mid C_t) = p_{\mathrm{VLA}}(a_{t+1:t+k} \mid C_t)\, p_{\mathrm{WM}}(o_{t+1:t+k} \mid C_t, a_{t+1:t+k})$$（直觉：动作从上下文直接出、视频只是训练期监督其后果——部署时 WM 专家关闭，这正是"快接口"）
- CATR 组路由（式 8/9）：$$\operatorname{MoE}(h_j) = \sum_{e \in \mathcal{E}_g} \alpha_{g,e} f_e(h_j)$$，其中 $$\alpha_{g,e} = \exp((W_r \bar{h}_g)_e / \tau) / \sum_{e' \in \mathcal{E}_g} \exp((W_r \bar{h}_g)_{e'} / \tau)$$（直觉：合格集外的专家权重恒 0——"哪种角色用哪些专家"是手工先验，"集内怎么混"是学出来的；组内 token 同权重、异输出）
- 流匹配目标（式 19/20，统一记号）：$$u_m^\star = \epsilon_m - x_m$$，$$\mathcal{L}_m^{(p)} = \mathbb{E}\left[\frac{1}{N_m D_m} \sum_{j=1}^{N_m} w(\sigma_{m,j}) \lVert b_{m,j} \odot (\hat{u}_{\theta,m,j}^{(p)} - u_{m,j}^\star) \rVert_2^2\right]$$（直觉：预测把噪声拉回数据的速度场；掩码 b 剔除无效动作维）
- PAIR 软标签（式 1）：$$\tilde{y}_t^{(i)} = \frac{\exp(-\Delta_t^{(i)} / \tau)}{\sum_{j \in \mathcal{I}_{\mathrm{WAM}}} \exp(-\Delta_t^{(j)} / \tau)}$$，$$\Delta_t^{(i)}$$ 为四接口 MAE 的 min-max 归一化（直觉：哪个接口在同类场景里推得准，路由器就学着选谁；τ 控软硬）

## 5. 与前作/矩阵关系
- 线锚：[世界模型](/ai-fa/explore/20-Algorithms/世界模型) · [扩散模型](/ai-fa/explore/20-Algorithms/扩散模型) · [混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）) · [条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)（五接口统一流匹配目标）· [逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（IDM 原子能力=视频条件动作生成）
- ← 前身：Worldscape-MoE（2607.03964，同第一作者 Fang——共享专家+条件专家的异构动作控制）；骨干 Wan2.2 系视频生成
- ≡ 同题近邻：[GE-Act 2.0](/ai-fa/explore/10-Papers/09-世界模型与JEPA/GE-Act 2.0 Pretraining and Scaling a World-Action Model for Robotic Manipulation)（WAM 预训练规模化）· [MiniWAM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/MiniWAM Learning Compact Future Targets for Efficient World-Action Modeling)（效率轴改目标表征，此篇效率轴改专家路由）· [V-JEPA 2](/ai-fa/explore/10-Papers/09-世界模型与JEPA/V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）)（免生成式对照路线）
- ⊃ 泛化：[Genie](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Genie- Generative Interactive Environments（Genie）)→[Genie 2](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Genie 2- A Large-Scale Foundation World Model（Genie 2）) 的"环境侧世界模型"与 VLA/WAM"动作侧"在此合流（游戏侧对照 [DIAMOND](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）)——同为像素扩散 WM×控制，但域=Atari 游戏）
- 今日同族：[GreenWAM](/ai-fa/explore/10-Papers/02-生成建模与扩散/GreenWAM A World Foundation Model for Robotics)（同日同题：一个走 MoE 接口统一，一个走解剖学动作空间+单步蒸馏）· [ForceWAM](/ai-fa/explore/10-Papers/09-世界模型与JEPA/ForceWAM Decoupling Future and Response Learning from Demo and Play Data for Contact-Rich Manipulati)（其 IDM 接口的力模态深化版=分解式 WM×IDM 两段训练）

## 6. 影响后续
- WM/WAM 统一建模的接口级框架：把"哪种条件依赖"从模型设计问题变成掩码+路由的组合问题，后续多接口 WAM、接口选择器工作可直接沿用其五接口分解。

## 7. 读前须知
- 前置：[扩散模型](/ai-fa/explore/20-Algorithms/扩散模型)、[条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失)（统一训练目标）、[混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）)（共享专家/路由权重）、[逆动力学（IDM）](/ai-fa/explore/40-Concepts/逆动力学（IDM）)（四种原子能力中最易混淆的是 IDM×VLA 之分：条件里有没有未来视频）。
- 原文：https://arxiv.org/pdf/2610.18697v1 ｜ 在线全文：https://arxiv.org/html/2610.18697v1（附录 A 掩码图/G.4 消融表值得细看）
