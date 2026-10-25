---
type: paper
title: "GreenWAM: A World Foundation Model for Robotics"
aliases: [GreenWAM]
year: 2026
authors: [Gennady Sidorov, Valerii Kornilov, Denis Grankin, Polina Fedotova, Aleksey Postnikov]
venue: arXiv 2610.18774（cs.RO 技术报告，Sber Robotics Center Brain Team，2026-10-13）
arxiv: "2610.18774v1"
pdf: https://arxiv.org/pdf/2610.18774v1
line: 生成建模与扩散（wm-distill-fewstep 组命中）
matrix_coords: [世界基础模型(Cosmos 3 Edge 4B再训练), 79槽解剖学动作空间(20机器人族统一), 七模式联合训练(正逆动力学+WAM), action expert分裂策略, 单步一致性蒸馏(Flash-WAM配方,35.4ms/28.3Hz), 机器人操作(WorldArena/RoboTwin2.0/CALVIN/LIBERO/真机humanoid)]
layer: 精化层（PDF 前 26 页精读——无 HTML 版，临时 PDF 通道读完即删）
---
# GreenWAM: A World Foundation Model for Robotics


## 1. 一句话贡献
在 Cosmos 3 Edge 4B 上重训出跨 20 个机器人族的"一个模型两种角色"世界基础模型——79 槽解剖学动作空间统一异构本体、七种视觉/动作条件/世界-动作模式联合训练——作为世界模型在 WorldArena 1.0 拿顶级轨迹/深度/3D 精度，作为策略进 RoboTwin 2.0 榜首梯队、零样本 LIBERO-plus 最高，真机 humanoid 上 95.6% 超 π0.5（84.4%），再蒸馏成单步一致性策略 35.4ms/次（×12.3 提速），决策掉点仅 −4.5pt（ID 95.6→91.1）。

## 2. 核心贡献
- **配方三件套**：①共享解剖学动作空间——20 个机器人族的关节映射到 79 个语义槽（腿 12/躯干底座 23/臂 18/手 26），"左肘永远是第 47 槽"，本体差异全由 layout 编解码器吸收，所有机器人共享一个动作投影器；②七模式联合训练（文生视频/I2V/带历史 I2V/正动力学/带历史正动力学/**逆动力学**/WAM）——模式=哪些流是干净条件、哪些是加噪目标；③策略侧从生成器**分裂 action expert**（复制生成器为动作专家，保留父功能再优化）。
- **单步蒸馏上真机（§6.4-6.5）**：跟随 Flash-WAM 的模态分离一致性蒸馏——冻结教师+可训练学生+EMA 目标学生，视频与动作**共享一个噪声水平**（Flash-WAM 是分离时间表），教师做带 CFG 的一步（视频引导 3-4、动作不引导），学生学习在两点给出一致干净估计；动作支直接估干净目标 $$x_\sigma - \sigma \hat{v}_\theta$$，外加动作流匹配项锚住示范分布。学生 35.4ms/次（28.3 Hz，较未优化策略 ×12.32），真机 ID 91.1%/OOD 80.0% vs 教师 95.6%/84.0%。
- **三个受控结论**：机器人专门化同时改善世界预测与控制（轨迹精度 +3.0、视频预测误差 −23%、策略成功 +5.4/+8.4pt）；适配一开始就分裂 action expert +3.3%；策略适配期保留世界模型模式，随机化场景鲁棒性 +8.0%。
- **跨本体一套接口**：单臂 Franka（语料中缺席）经同一共享接口零迁移控制 CALVIN/LIBERO；真机 Green humanoid 上连续多指令打包任务全流程演示。

## 3. 方法概要
1. **解剖学动作空间**：每个 layout 的原生通道经"选择/重排/变号/平移零点"编解码进 79 槽；缺的槽用有效掩码剔出损失（不存在的关节永远不成为零目标）；正/逆动力学按模式选择绝对量或相对量编码（腿/躯干/臂默认相对块首状态 $$q_0$$，夹爪手指保持绝对）。
2. **数据管线**：1.44M 整子任务原子（1688.5h）→质检留 1.43M→指令派生留 1.19M；三相机源离线拼画布（头视角占上 2/3，双腕下排）；最大单源占比 15%（对照 Cosmos 3 的 81% 单源失衡）。
3. **七模式联合训练**：reasoner+VAE 冻结，训练生成器+共享动作投影；整流流速度预测损失，掩码归一；采样混合 3/4 给视频预测、1/4 给动作产生（逆动力学 10%+WAM 15%）；自回归模式以 4 个固定位置 RGB 锚点续块（训练推理同位，末锚永远是最新帧）。
4. **策略适配**：从生成器复制出 action expert（state/action token 改走专家支），适配期保留世界模型模式联合训练。
5. **蒸馏**：优化栈（KV 缓存/单 pass CFG/编译/8-bit）把策略压到 134.6ms，再一致性蒸馏 4 步引导采样→1 步 1 pass；蒸馏在真机 onboard（算力远低于 4090）收益最大。

## 4. 核心公式
- 槽编解码（式 1，统一记号）：$$q_j = \rho_j^{\ell}(x_{\pi_\ell(j)} - o_j^{\ell})$$，$$\bar{q}_j = (q_j - \mu_j^{\ell}) / s_j^{\ell}$$（直觉：原生通道→语义槽只做"选/排/翻号/移零点"四件事，物理对应关系进数据不进模型参数）
- 块首相对编码（式 2）：$$\delta_k = q_k - d_\ell \odot q_0$$，$$\hat{q}_k = \hat{\delta}_k + d_\ell \odot q_0$$（直觉：$$d_\ell$$ 是 layout 级二值掩码——哪些坐标相对、哪些绝对是本体先验，不是学出来的；既非速度也非累计增量）
- 七模式统一整流流损失（式 3）：$$\mathcal{L}_m = \mathbb{E}_{\sigma, \epsilon} \sum_{s \in \mathcal{S}_m} \frac{\lambda_s \lVert M_s \odot (\hat{v}_\theta(x_\sigma, c_m, \sigma)_s - v_s) \rVert_2^2}{\lVert M_s \rVert_1}$$，$$x_\sigma = (1-\sigma)x_0 + \sigma \epsilon$$，$$v = \epsilon - x_0$$（直觉：模式之间只差"哪些流是目标 $$\mathcal{S}_m$$、哪些是条件 $$c_m$$"——接口与 UniW(A)M 的掩码思想同源，一个用注意力掩码、一个用条件/目标划分）
- 单步蒸馏损失（式 9）：$$\mathcal{L}_{\mathrm{distill}} = \lambda_v \mathcal{L}_{\mathrm{CD},v} + \lambda_a \mathcal{L}_{\mathrm{CD},a} + \lambda_{\mathrm{FM}} \mathcal{L}_{\mathrm{FM},a}$$（直觉：视频/动作各自的一致性蒸馏图——视频用含噪依赖的 skip/输出系数，动作直接回归干净状态估计；$$\mathcal{L}_{\mathrm{FM},a}$$ 是 Flash-WAM 只在正则基线里用的动作流匹配项，这里拿来锚住示范目标防一致性塌偏——**动作支锚真值**正是保决策的抓手）

## 5. 与前作/矩阵关系
- 线锚：[一致性模型](/ai-fa/explore/20-Algorithms/一致性模型) · [流匹配](/ai-fa/explore/20-Algorithms/流匹配) · [蒸馏损失](/ai-fa/explore/30-Formulas/蒸馏损失) · [条件流匹配损失](/ai-fa/explore/30-Formulas/条件流匹配损失) · [知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏) · [NFE（函数求值次数）](/ai-fa/explore/40-Concepts/NFE（函数求值次数）)
- ← 前身/基座：Cosmos 3 Edge（4B reasoner-generator，动作粗学六本体）→ GreenWAM 机器人专门化再训练；蒸馏配方 ← Flash-WAM（2606.05254，"WAM 一致性蒸馏"，库外需补卡监控）
- ≡ 少步蒸馏同族：[Consistency Models](/ai-fa/explore/10-Papers/02-生成建模与扩散/Consistency Models（一致性模型）)（单步化鼻祖）· [DyMD](/ai-fa/explore/10-Papers/02-生成建模与扩散/DyMD Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video Wo)（少步视频 WM 蒸馏保交互动态——同为"蒸馏别丢动态"命题，DMD 路线 vs 一致性路线）· [AnyFlow](/ai-fa/explore/10-Papers/02-生成建模与扩散/AnyFlow- Any-Step Video Diffusion Model with On-Policy Flow Map Distillation（AnyFlow）)（任意步流图蒸馏）· [AYF](/ai-fa/explore/10-Papers/02-生成建模与扩散/Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）)
- ⊃ WAM 家族：[GE-Act 2.0](/ai-fa/explore/10-Papers/09-世界模型与JEPA/GE-Act 2.0 Pretraining and Scaling a World-Action Model for Robotic Manipulation)（跨本体 WAM 预训练）· [Genie 2](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Genie 2- A Large-Scale Foundation World Model（Genie 2）)（环境侧基础模型对照）
- 今日同族：[UniW(A)M](/ai-fa/explore/10-Papers/09-世界模型与JEPA/UniW(A)M A Unified Mixture-of-Experts Framework for World and World-Action Models)（同日同题"一个模型两角色"——一个用 MoE 接口统一，一个用动作空间统一+单步蒸馏提速；评测面 RoboTwin/WorldArena 重叠直接可比）

## 6. 影响后续
- 跨本体世界基础模型的标准配方候选（解剖学槽位比"每本体一个投影/EEF 位姿图"更严格的对齐先验）；后续跨本体 WAM 工作的对照基线。

## 7. 读前须知
- 前置：[一致性模型](/ai-fa/explore/20-Algorithms/一致性模型)（一致性蒸馏的 skip/输出系数与 EMA 目标）、[蒸馏损失](/ai-fa/explore/30-Formulas/蒸馏损失)、[流匹配](/ai-fa/explore/20-Algorithms/流匹配)（整流流速度参数化）、[混合专家（MoE）](/ai-fa/explore/20-Algorithms/混合专家（MoE）)（Cosmos 3 的 reasoner-generator MoT 结构）。
- 原文：https://arxiv.org/pdf/2610.18774v1（无 HTML 版；本卡据 PDF 前 26 页）
