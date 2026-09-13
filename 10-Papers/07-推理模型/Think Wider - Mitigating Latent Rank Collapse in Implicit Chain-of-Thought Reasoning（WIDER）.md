---
type: paper
title: "Think Wider: Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning"
aliases: [WIDER, 潜秩坍缩]
year: 2026
authors: [Yuwen Hao, Menglin Yang]
venue: arXiv 2609.07406（2026-09-07，HKUST 广州）
arxiv: "2609.07406v1"
pdf: 10-Papers/PDF/Think Wider - Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning（WIDER）.pdf
line: 推理模型
matrix_coords: 待评（轮换线）
tags: [paper]
---
# Think Wider: Mitigating Latent Rank Collapse in Implicit Chain-of-Thought Reasoning（WIDER）

## 1. 一句话贡献
识别并形式化隐式 CoT 的"潜秩坍缩"——多个潜状态挤向同一主方向、有效秩趋近 1，多步不等于多计算——提出训练期谱正则 WIDER 惩罚对共享方向的投影，即插即用、推理零开销，主方向能量 0.989→0.736、有效秩 1.49→3.82，四组匹配对比全部涨分。

## 2. 核心贡献
- **latent rank collapse 形式化**：潜轨迹逐行归一后集中在主方向 $v_1$ 附近（$h_i \approx \alpha_i v_1$）；命题 1（子空间因子化）证明秩 1 坍缩下解码器家族退化为 m 个标量坐标的函数——条件容量被轨迹秩卡死
- **WIDER 谱正则**：用列和方向（归一化均值）做主方向的免 SVD 代理（stop-gradient），惩罚各行对它的投影平方——附证明该代理上界化平均两两对齐
- **机制分析闭环**：NMI（步间依赖）砍 70%、主方向能量降、尾能量升；主方向过 LM 头投影发现 16% 是虚词捷径 token，正则后清零；边缘 $p(y)$ 不动而逐样本准确率升——增益确来自更"输入可分"的潜轨迹

## 3. 方法概要
1. 取每题的 m 个潜状态做**逐行归一化**（只看方向不看模长）
2. **共享方向代理**：$c(x) = \sum_i z_i$，归一化后得 $q(x)$（stop-gradient）——若各步方向雷同，和向量就指向那个公共方向
3. **投影惩罚**：$L_{spec} = \frac{1}{m}\sum_i (z_i^\top q)^2$，加在原损失上：$L = L_{base} + \lambda\, L_{spec}$
4. 骨干/潜调度/解码全部不动；只改训练目标；$\lambda$=0.10 最优（0.20 过度正则）
5. 坍缩成因的局部模型：潜状态迭代更新若在一个方向放大最多，重复施加≈幂迭代——逐步对齐到 $v_1$

## 4. 核心公式
- 谱正则损失：$L_{spec}(x) = \frac{1}{m}\sum_{i=1}^{m}\big(z_i(x)^\top q(x)\big)^2 = \frac{1}{m}\lVert Z(x)\,q(x)\rVert_2^2$，其中 $q(x) = sg\big(c(x)/(\lVert c(x)\rVert_2+\epsilon)\big)$
**直觉**：$z_i^\top q$ 是第 i 步在"大家共有方向"上的分量——惩罚它就是逼每一步把能量花在别人没占的方向上，潜 token 预算才不被复读浪费。
- 谱解释（上界夹逼）：$\gamma_q\,\rho_1(Z) \le L_q(Z) \le \rho_1(Z)$，$\rho_1 = \sigma_1^2/m$
**直觉**：投影损失被第一奇异值能量上下夹住——压它就是在压主奇异方向，免 SVD 的代价只是夹逼而非精确。

## 5. 与前作/矩阵关系
- 线锚：[[40-Concepts/思维链（CoT）]] · [[30-Formulas/VICReg三正则]]（同族防坍缩正则：VICReg 治表征学习维度坍缩，本文治推理轨迹秩坍缩——同一几何病灶换了器官）· [[40-Concepts/范数]]（投影与归一化）
- ← 应用基座：CODI / SIM-CoT（WIDER 是挂在其上的即插即用损失，两基座都涨）
- 同日同题：[[Structural Process Supervision for Latent Chain-of-Thought Reasoning（PMPS）]]（原型锚治语义坍缩，本文谱正则治几何坍缩——正交互补）· [[Astar-Thought-V2 - Efficient Latent Reasoning via Geometric Dynamics of LLM（Astar-Thought-V2）]]

## 6. 影响后续
"潜子空间利用率"成为隐式推理的新诊断轴；有效秩/主方向能量可成为任何 latent 表征质量评估的标准仪表（对我们：蒸馏学生策略表征、WM 潜状态质量分析同款工具）。

## 7. 读前须知
需要 [[30-Formulas/VICReg三正则]]（方差-协方差正则的防坍缩思想）与奇异值/有效秩直觉（$erank = \exp(H(\sigma^2/\sum\sigma^2))$，熵加权的秩）；命题 1 证明在附录 A.1，只需懂"矩阵行都落在 r 维子空间 ⇒ 信息只剩 m×r 个坐标"。
