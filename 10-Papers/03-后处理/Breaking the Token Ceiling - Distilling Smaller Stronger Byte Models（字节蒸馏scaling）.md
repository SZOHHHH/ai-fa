---
type: paper
title: "Breaking the Token Ceiling: Distilling Smaller, Stronger Byte Models"
aliases: [Token Ceiling, 字节蒸馏scaling]
year: 2026
authors: [Kalyani Marathe, Artidoro Pagnoni, Tomasz Limisiewicz, Margaret Li, Mike Lewis, Luke Zettlemoyer, Srinivasan Iyer]
venue: arXiv 2026-09-11（cs.CL，UW+Meta FAIR）
arxiv: "2609.12303"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: 蒸馏×scaling law×表征选择
tags: [paper, 轮换命中, 蒸馏, 深读]
layer: 精读层（PDF 前 12 页全读，9-14 ⑦推荐）
---
# Breaking the Token Ceiling: Distilling Smaller, Stronger Byte Models

> **中文速览**：做了什么——首个大规模研究"蒸馏学生该用什么 tokenization"：byte 模型（词表≈256）与 token 模型（词表≈10 万）在蒸馏 vs 交叉熵两目标下、层参数匹配（≈1B）×数据量（至 1T bytes）双向扫开，拟合 scaling law。怎么做的——先解决拦路虎"大 token 教师的 logits 怎么变成 byte logits"：单次前向的两种转换（近似版 Marginalize-It 重归一化 / 精确版 End-Of-Token 加终止符吸收残差概率）；再六配置全扫+幂律拟合+外推。效果——**Token-1B 低算力区间强但很快平台化；byte 模型起步差、斜率陡、天花板更高**：外推预测蒸馏 EOT-1B 渐近超蒸馏 Token-1B 至多 4%，且 1/6 数据就能匹配后者，logit 存储省到 1/5；渐近超 Llama 3.2-1B / Gemma-3-1B / Gemma 2B 达 6.5%/8.1%/2.1%。

## 1. 一句话贡献
蒸馏学生的"表征选择"决定天花板：层参数同量级下，byte 学生起步慢但渐近性能上限显著高于 token 学生（蒸馏后渐近 +4%），数据效率 6 倍、logit 存储 1/5——"小模型装多少"不只看参数量，更看它把概率质量铺在什么表征上。

## 2. 核心贡献
- **单前向 token→byte logits 转换两法**：Marginalize-It（按字节前缀子集词表重归一化，近似）与 End-Of-Token（词表加 `<eot>`，残差概率质量全部吸收，精确）——跨 tokenization 蒸馏的工程前提。
- **双轴×六配置的 overtraining 扫描**：tokenization（Tokens/Bytes/Bytes w/ eot）×目标（蒸馏/交叉熵），层参数匹配 1.28B、数据至 1T bytes、三档学习率。
- **三条 scaling law 链**：验证 BPB vs FLOPs 幂律（$R^2$≥0.997）→ 下游任务性能 vs FLOPs → 下游误差 vs BPB（+连接等 FLOP 点的 Feather Plots），层层外推到渐近点。
- **渐近结论**：EOT 蒸馏 > Marginalize-It 蒸馏（+1.9%）> Token 蒸馏（EOT +4%）；byte 蒸馏 1/6 数据匹配 token 蒸馏；小词表免 top-k 截断、logit 存储约 1/5。

## 3. 方法概要（分步）
1. **转换层**：教师（Llama 3-8B，token 词表 128K）逐位输出 next-token 分布；要把这份监督翻译给学生吃的 byte 序列分布。
   - Marginalize-It：预测某 token 的第 k 个字节时，把词表限制在"前缀匹配真实已见字节"的 token 子集上，按首字节/次字节边缘化；token 的更长延续被静默丢弃后**重归一化**剩余概率（近似）。
   - End-Of-Token：训练数据里每个 BPE token 后插 `<eot>`（词表 261），预测"token 内部字节串"后的分布时，把该前缀所有可能延续的概率质量**吸收进 `<eot>`**——精确保真教师分布，且每 token 多花 ≈30.94% FLOPs（每 4.5 字节一个 `<eot>`）反而渐近更好。
2. **六配置训练**：Token-1B(1.81B 总参)/Bytes-1B(1.28B)/EOT-1B(1.28B) 层参数对齐；监督（CE）与蒸馏（对教师分布 KL）两目标；Llama-2 数据混合，9 档数据规模（20B→1.2T bytes）。
3. **第一层 law**：验证 BPB vs 训练 FLOPs 拟合 $y=b\cdot x^a+c$——token 曲线低算力领先、快速饱和；byte 曲线起点高、指数缓（−0.36~−0.40 vs −0.48~−0.50）但渐近线 $c$ 显著更低（0.889~0.902 vs 0.941~0.957，教师 0.855）。
4. **第二层 law**：八基准（MC-QA×4/生成×2/翻译）的准确率 vs FLOPs——与 BPB 趋势一致；生成任务上 token 平台化最明显、byte 曲线无饱和迹象。
5. **第三层 law+外推**：下游误差 vs 验证 BPB 拟合并外推渐近点；Feather Plots 连接等 FLOP 点，给出"给定预算该选谁"的决策图——低预算 token、高预算 byte，交叉点可查。

## 4. 核心公式
- **缩放幂律（Chinchilla 变体）**：$y = b \cdot x^{a} + c$——$x$=训练 FLOPs，$y$=验证 BPB，$c$=无限算力渐近线。**直觉：学习是"以幂律速度逼近一个地板"——token 学生地板高但逼近快（指数陡），byte 学生地板低但走得慢；蒸馏（KL 目标）主要压低 $c$（Token：0.9568→0.9407；byte：0.8967→0.8983/EOT：0.8891→0.8983——注意 byte 侧蒸馏只在大算力反超监督）。"选学生"=在"起点高度×斜率×地板"三点间按预算做权衡，不是选"最会学的"。**
- **End-Of-Token 残差吸收**：$P(\text{is}\langle\text{eot}\rangle)=\frac{0.125}{0.5+0.125+0.125}=0.167$（前缀 is 的全部延续概率被 `<eot>` 收编）。**直觉：教师说"接下来是 is 开头的 token"但学生活在字节世界、看不到 token 边界——`<eot>` 就是把"token 级的不确定性"原封不动交给学生自己消化，而不是像 Marginalize-It 那样擅自重分蛋糕（丢弃延续再归一化=往监督里注入教师的偏见）。精确保真>近似方便，是这个研究的核心对照轴。**

## 5. 与前作/矩阵关系
- ← 蒸馏谱系：[[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）|KD 奠基]]（软目标优于硬标签）、[[10-Papers/03-后处理/DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）|DistilBERT]]（固定表征蒸馏的工程标杆）——本文把"蒸馏学生"从固定 tokenization 解放出来，问"表征本身对蒸馏天花板的影响"。
- 公式链：[[30-Formulas/蒸馏损失]]（KD/CE 混合的标准形态——本文蒸馏臂即 KL 对教师分布，无 α 混合）、[[30-Formulas/归一化温度与蒸馏]]（温度在这类 top-k logit 蒸馏里的角色）。
- 概念链：[[40-Concepts/知识蒸馏]]（蒸馏 scaling 专项：此前蒸馏 scaling 研究基本在 token 域内，byte 域首个系统对照）。
- ↔ **E1 对话位（H5 容量归因）**：E1 说六线失败归因学生容量不足（H5）；本文实证"容量"不只是参数量——**同层参数下换表征（byte vs token）就能改变蒸馏天花板 ±4%**。给 E1 的启示：容量归因应显式包含"表征效率"维度；且 byte 模型"起步差、天花板高"与 E1 学生"低样本期尚可、训练后期塌"的动态画像不同——蒸馏目标与表征的相互作用值得在 E1 台账补一列"潜表征有效秩/词表效率"诊断（呼应 9/13 WIDER 卡的有效秩度量）。

## 6. 影响后续
- 蒸馏 scaling law 的表征轴被打开：后续会扫"其他表征选择"（多语/代码/模态混合词表、动态 tokenization）对蒸馏天花板的影响。
- 工程直接可用：离线 logit 蒸馏选 byte 学生（存储 1/5、免 top-k 截断、数据效率 6 倍）；Meta FAIR+UW 出品，数字可信度高。
- 敌情位：与 E1/E2 无域重叠（LM 蒸馏 scaling vs 像素扩散 WM×游戏），🟢 动机同盟/引用候选——E1 论文 related work"蒸馏 scaling 与容量"段的引用位。

- → 后继补记（260924）：[[10-Papers/03-后处理/Towards Foundation Models on Hardware Accelerators for Particle Physics|粒子物理 FM 硬件蒸馏]]（同族"大预训练→可部署小网络"，约束更硬：离线精度换触发级微秒延迟，硬件算子级学生）

## 7. 读前须知
- 前置：KD 蒸馏基本形（[[10-Papers/03-后处理/Distilling the Knowledge in a Neural Network（KD）|KD 卡]]）、BPB（bits-per-byte）与困惑度的关系、幂律缩放直觉（$a\cdot x^{-\alpha}+b$ 家族）。
- 本文特殊性：三层 scaling law 级联（BPB→FLOPs、任务→FLOPs、任务→BPB）需要耐心区分"哪条曲线对哪条外推"；Feather Plots（等 FLOP 点连线）是作者自造可视化，读图先找交叉点。
- BPE tokenization 基础（token=多字节串）是理解转换层的前提。
