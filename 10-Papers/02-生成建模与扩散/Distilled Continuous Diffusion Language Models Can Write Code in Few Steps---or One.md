---
type: paper
title: Distilled Continuous Diffusion Language Models Can Write Code in Few Steps---or One
aliases: [PlaidQ, 连续扩散语言模型的少步/单步蒸馏代码生成]
year: 2026
authors: [Fred Zhangzhi Peng, Kaiwen Zheng, Anru R. Zhang]
venue: arXiv 2609.04531（Duke+清华，2026-09-03）
arxiv: "2609.04531v1"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/连续状态, token嵌入空间, 蒸馏(分布匹配+配对轨迹)]
tags: [paper]
---

# PlaidQ（连续扩散语言模型的少步/单步蒸馏代码生成）

> 2026-09-08 Tier B 精读升级（28 页全文过）。代码开源：github.com/pengzhangzhi/plaidq。

## 1. 一句话贡献

把预训练 AR 模型改造成连续扩散语言模型（PlaidQ，0.7B，代码生成域），再用 **DMD 蒸馏到 4/8/16 步、配对轨迹监督蒸馏到 1 步**——16 步学生反超 512 步教师，单步也能写出可执行通过测试的完整程序。

## 2. 核心贡献

- **AR→连续扩散改造**：复用 Qwen3-0.6B 的主干+词表投影，因果注意力换双向、加噪声条件 AdaLN、输出头移位对齐——AR 初始化把验证 NLL 从 3.65 压到 3.59（从头训 3.65 / AR init 3.62 / +对齐 3.59）
- **两级蒸馏策略**：少步（K=4/8/16）用 [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（推理对齐训练+on-policy critic）；**单步 DMD 失效**→换配对轨迹蒸馏（teacher/student 共享初始噪声，teacher 16 步 rollout 解码成 token 序列做逐位 CE 监督）
- **蒸馏改变 scaling 曲线**：PlaidQ-D16 达 31.78/40.49 pass@10（HumanEval/MBPP+），超过教师 128-512 步最好成绩（28.57/35.21）；1 步 D1 达 7.07 pass@1（HumanEval，5 样本）——单步可生成功能正确的程序
- **工程三件套**：SWVR 流式词表核（152k 词表×2048 序列的 $B{\times}L{\times}V$ 概率张量不落地，激活内存 −29.6% 且数值精确等价）+ 混合 Muon-AdamW 优化器 + 零样本 CFG（弱化前缀当负分支，logit 空间引导）

## 3. 方法概要

1. **底座（Plaid 形制）**：token 不是 one-hot 而是嵌入向量 $x_0=E_y$，前向加噪 $x_t=\sigma_t x_0+\sigma_t\epsilon$；去噪器出 logits→softmax→**词表期望重参数化** $\hat{x}_0=pE$（干净嵌入预测永远落在码本凸包内，最终一步 argmax 解码）
2. **AR 改造**：双向注意力+AdaLN 噪声调制（恒等初始化，初始不改变预训练计算）；输出头移一位（AR 头本来就"看 $h_{i-1}$ 预测 token $i$"），前缀保持干净嵌入做条件、只对补全位加噪
3. **少步蒸馏（DMD/DMD2 套路）**：冻结 teacher 定目标分布；student 跑完整 K 步采样器、随机留一步梯度（推理对齐）；输出重加噪后由 teacher 与 critic（跟踪 student 当前分布的第三网）各还一个 $\hat{x}_0$，**分数差=teacher−critic 之差**当修正方向回归
4. **单步蒸馏（配对轨迹）**：teacher 和 student 喂同一初始噪声，teacher 16 步采样后 argmax 解码成离散 token 序列，student 一步直接对这串 token 做补全位 CE——把"分布级监督"升级成"点对点配对监督"
5. **步数相关温度**：单步/少步时 DDIM 反向映射增益 $g^{(K)}(\tau)$ 会爆（$\sigma^{(K)}\tau K>1$ 不稳定），按步数自适应降温

## 4. 核心公式

- Plaid 训练目标（连续时间变分界）：$\log p(y) \ge -\mathcal{L}_{prior}-\mathcal{L}_{decode}-\mathbb{E}_t\, w(t)\lVert x_0-\hat{x}_0(x_t,t)\rVert_2^2,\; w(t)=-\tfrac{1}{2}\mathrm{SNR}'(t)$
  **直觉**：三项=「起点贴高斯先验+终点能解码回 token+中途能去噪」，权重 $w(t)$ 是 VDM 的噪声水平加权——语言似然被连续扩散化。
- 类别重参数化：$\hat{x}_0=\mathrm{softmax}(hW)E$——**直觉**：不回归任意向量，而是"按词表概率给码本行加权平均"，每个干净预测天然可解码；E 行单位范数⇒$\lVert\hat{x}_0\rVert\le 1$。
- DMD 方向（式 3）：$s=\lvert G-\mathrm{sg}(T)\rVert_{\bar{M}},\; G_{target}=\mathrm{sg}(G)+\bar{M}\,s\cdot \mathrm{sg}(T-F),\; \mathcal{L}_{DMD}=\lVert G-G_{target}\rVert_2^2$
  **直觉**：student 向 teacher、离 critic 的方向走一步，步长按自身误差归一——与 [[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] 原式同构（分数差∝去噪差），只是搬进嵌入空间；对照本库 RL05.5 v3 线的 $\mathcal{L}_{DMD}$ 同款。
- 配对轨迹损失（式 4）：$\mathcal{L}_{pair}=\mathbb{E}_z[\mathrm{CE}_M(p(\cdot\mid z,c),\,x(z))]$——**直觉**：同一噪声 $z$ 下 teacher 的多步答案就是标准答案，student 一步直答对答案——分布匹配只知道"像"，配对知道"哪个对哪个"。
- 反向映射增益（式 5）：$g^{(K)}(\tau)=\sigma^{(K)}\tau K,\; \sigma^{(K)}=\sqrt{1-\exp(-\tfrac{1-\sigma_0^2}{2K})}$，稳定条件 $g<1$——**直觉**：步数少时每步跨距大，温度 $\tau$ 放大去噪预测会让反向映射发散，所以步数越少温度越低。

## 5. 与前作/矩阵关系

- ← 前身：[[Building Normalizing Flows with Stochastic Interpolants（随机插值）|Plaid 一脉]]（Gulrajani & Hashimoto 2023 的连续扩散 LM 形制）；AR 初始化对齐=Peng et al. 2026b 的表示对齐技术
- ← 蒸馏骨架：[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]] + [[Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]]（on-policy critic+推理对齐训练）——图像域 DMD 的语言域移植
- → 后继方向：作者展望把更多连续蒸馏工具（consistency、flow map）搬进语言
- ≡ 谱系对照：与 [[Consistency Models（一致性模型）|一致性模型]]/[[Mean Flows for One-step Generative Modeling（MeanFlow）|MeanFlow]] 同属"学短轨迹"家族但走分布匹配+配对路线；与 [[Trajectory as the Teacher- Few-Step Discrete Flow Matching via Energy-Navigated Distillation（FS-DFM）|FS-DFM]]（离散侧轨迹蒸馏）构成"轨迹当教师"的连续/离散双版本
- ↔ 与 E1 对话：同轴不同域——他们蒸馏目标=生成质量（pass@k，执行正确性），我们 E1 蒸馏目标=决策保真（价值/奖励头读出匹配）；见⑦解读与 RL05.5

## 6. 影响后续

- 首次证明**全连续扩散 LM 在通用代码生成上可比同规模离散扩散**且可被激进蒸馏到 1 步仍有功能正确性——"连续状态是语言模型接入扩散加速基建的接口"这个论点的最强实证
- 对少步蒸馏谱系的意义：DMD 在 K=1 失效、需要配对监督补位——**步数压到极致时监督形态要换**，这个结论对一切 DMD 家族（含 E1 的 v3 线）是预警
- SWVR 流式词表读出可复用于任何"softmax×码本"结构（等价于词表注意力）

## 7. 读前须知

- **必前置**：[[40-Concepts/知识蒸馏]]（教师-学生母框架）、[[40-Concepts/NFE（函数求值次数）|NFE]]（少步化的度量衡）、[[40-Concepts/KL散度]]（DMD 的反向 KL 动机）
- **数学**：[[Score函数]]（分数差=去噪差的换算）、[[30-Formulas/DDIM更新规则|DDIM 更新规则]]（确定性反向映射与增益分析）、[[重参数化]]（类别重参数化是其离散变体）
- **谱系**：[[20-Algorithms/扩散模型]]（Plaid 形制=VP-SDE 嵌入空间版）、[[20-Algorithms/一致性模型]]（另一条少步路线）

> 谱系枢纽：[[One-step Diffusion with Distribution Matching Distillation（DMD）|DMD]]（蒸馏骨架入口）
> 近邻同族：[[Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）|DMD2]] · [[Trajectory as the Teacher- Few-Step Discrete Flow Matching via Energy-Navigated Distillation（FS-DFM）|FS-DFM]] · [[From Truncation to Commitment Persistent Context in Uniform Discrete Diffusion|连续/离散扩散 LM 邻居]]
> 数学根基：[[40-Concepts/知识蒸馏]] · [[40-Concepts/NFE（函数求值次数）|NFE]] · [[Score函数]] · [[重参数化]]
