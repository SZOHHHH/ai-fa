---
type: paper
title: Asynchronous Flow Map Language Models
aliases: [aFMLM]
year: 2026
authors: [Chanhyuk Lee, Wonjung Kim, Patrick Pynadath, Jaehoon Yoo, Satoshi Hayakawa, Ruqi Zhang, Jinwoo Kim, Seunghoon Hong]
venue: arXiv 2026（2610.30 提交，cs.CL；KAIST+Purdue+东京大学）
arxiv: "2610.42018v1"
pdf: https://arxiv.org/pdf/2610.42018v1
line: 生成建模与扩散
matrix_coords: [流图蒸馏(一步), 语言域(one-hot流), 预测顺序轴]
tags: [paper]
---
# Asynchronous Flow Map Language Models（aFMLM）

> 中文速览：把"预测顺序"（哪个 token 先生成）引入一步并行语言建模，提出异步流图语言模型 aFMLM。做法：给每个 token 配独立时间 $\tau^i$（tokenwise 时间调度控制各位置相对去噪进度，支持预设与按模型输出学习的两类调度），定义 token 状态与时间耦合演化的"异步流"，再用流图蒸馏（自蒸馏+半群一致性）把整条异步轨迹压成单次前向——顺序信息被内化进隐层计算，一步吐出全部 token。效果：Sudoku 求解与 GSM8K 数学题代码生成上刷新一步生成 SOTA。

## 1. 一句话贡献

让一步并行生成的语言模型也能利用"预测顺序"：用 tokenwise 时间调度定义异步流（不同 token 以不同速率去噪），再蒸馏成异步流图——顺序效应全部内化进一次前向，Sudoku/GSM8K 代码生成一步性能新 SOTA。

## 2. 核心贡献

- **异步流形式化**：token 位置各带时间 $\tau\in[0,1]^L$，调度器 $\omega_t$ 定各位置速率，token 状态与时间组成耦合 ODE（Prop 1-2：路径无穷多、耦合流仍精确收敛到数据分布）——覆盖预设调度（左到右等）与学习式 state-adaptive 调度（MDM unmasking 准则的连续化）；
- **调度器无关训练**：diffusion forcing 式独立采样 $\tau^i\sim U[0,1]$ 学调度无关去噪器 $D_\tau$（Prop 3）——训练后可任选/再学调度，不绑定；
- **异步流图+蒸馏目标**：证明异步流定义合法流图（半群条件，Prop 5），导出自蒸馏 KL 目标学两时间 denoiser $\delta_{s,t}$ 的异步版——一步跳 $(x_0,\mathbf{0})\to(x_1,\mathbf{1})$ 时模型同时输出 token 与其时间进度；
- **实证**：Sudoku 与 GSM8K 代码生成一步 SOTA；隐层分析显示顺序/调度效应确被内部化（一步前向里"早定 token 指导晚定 token"）。

## 3. 方法概要

1. **基座（FLM）**：token one-hot 与噪声线性插值 $I_t=(1-t)x_0+tx_1$，学去噪器 $D_t$（每位置输出词表分布，tokenwise 交叉熵训练）；
2. **异步化**：插值改成逐位 $I_\tau=(\mathbf{1}-\tau)x_0+\tau x_1$——$\tau^i$ 即第 i 位"解噪进度"；生成=把 $\tau$ 从 $\mathbf{0}$ 推到 $\mathbf{1}$ 的路径（顺序自由度出现：Prop 1 证明 0→1 的路径唯一而 $\mathbf{0}\to\mathbf{1}$ 的路径无穷）；
3. **调度器**：$\dot\tau_t=\omega_t(x_t,\tau_t)$ 定速率，异步速度=速率×条件均值速度；耦合 ODE $\dot z_t=(\omega_t b_{\tau_t},\ \omega_t)$ 定义异步流；
4. **训练**：调度器无关版用独立 $\tau^i$ 采样（diffusion forcing 思路）；预设调度版可只沿调度路径采样训练（Cor 4：此时速度近似精确）；
5. **蒸馏成流图**：学两时间 denoiser $\delta_{s,t}=x+(1-s)v_{s,t}$（单形值），KL 自蒸馏+半群拼接一致性（$\bar\delta_{s,t}$ 由 sg 停梯度的两段跳加权合成）；异步版把 $\tau$ 并进状态一起跳；
6. **推理**：单次前向一步跳到全序列；调度信息不再显式执行——全部在隐层计算里。

## 4. 核心公式

$I_{\tau}=(\mathbf{1}-\tau)\,{\bf x}_{0}+\tau\,{\bf x}_{1},\qquad \tau=(\tau^{1},\dots,\tau^{L})\in[0,1]^{L}$

**直觉解释**：每个 token 有自己的"解噪时钟"——$\tau^i=0.9$ 的位置已经基本看清（近 clean），$\tau^i=0.1$ 的位置还是噪声；预测顺序=各时钟快慢的安排。

$\dot{\bf z}_{t}=\big(\omega_{t}({\bf x}_{t},\tau_{t})\,b_{\tau_{t}}({\bf x}_{t}),\ \ \omega_{t}({\bf x}_{t},\tau_{t})\big),\qquad {\bf z}_{t}=({\bf x}_{t},\tau_{t})$

**直觉解释**：token 状态与它们的时钟耦合着走同一条流——先解噪的位置进入后续位置的"视线"（条件里），这就是"早 token 指导晚 token"的连续化；$\tau_t^i=t$（全员同步）时退化为普通流。

$\mathcal{L}_{\mathsf{KL}}(\hat{\delta})=\mathbb{E}\left[\mathsf{KL}(D_{t}(I_{t})\,\|\,\hat{\delta}_{t,t}(I_{t}))\right]+\mathbb{E}\left[\mathsf{KL}(\bar{\delta}_{s,t}\,\|\,\hat{\delta}_{s,t}(I_{s}))\right]$

**直觉解释**：自蒸馏两件套——单点项让任意时刻的"一步外推"与"原地诚实预测"一致；拼接项让"直接跳 s→t"等于"经中转 u 分两跳"（半群条件，教师由自己的两段跳停梯度合成）。蒸馏的是**整条异步轨迹**，所以顺序效应被烙进网络。

## 5. 与前作/矩阵关系

- ← 流图语言模型 FMLM（Lee et al. 2026，同步流图一步生成，库内无卡）：把其"全员同步"放宽为"各走各的钟"；
- ← [[Diffusion Forcing- Next-token Prediction Meets Full-Sequence Diffusion（Diffusion Forcing）]]：其逐 token 独立噪声级训练是本文"调度器无关训练"的直接来源；
- ↔ [[Mean Flows for One-step Generative Modeling（MeanFlow）]] / [[How to build a consistency model- Learning flow maps via self-distillation（HTBC）]] / [[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]]：同属"流图/平均速度一步跳"族——本文把该族从连续图像域搬到离散语言域并加上顺序轴；
- ↔ [[Large Flow Language Models]] / [[Distilled Continuous Diffusion Language Models Can Write Code in Few Steps---or One]]：语言域少步/一步生成的近亲——前两者不带显式顺序控制，本文把顺序做成一等公民；
- ↔ MDM 自适应采样器（unmasking 准则）：本文调度器=其连续类比，且可被蒸馏（离散轨迹难蒸馏正是其痛点）。

## 6. 影响后续

- 一步并行 LM 的"顺序内化"路线开山：证明调度信息不必显式分步执行、可压进单次前向——对"少步化丢信息"质疑的跨域反例（语言域）；
- 异步流理论（耦合 ODE+半群流图）给视频/多模态的"分速率去噪"提供了可蒸馏的形式框架。

## 7. 读前须知

- **必前置**：[[30-Formulas/条件流匹配损失]]、[[20-Algorithms/流匹配]]（概率流/去噪器参数化）、流图与半群条件直觉（[[How to build a consistency model- Learning flow maps via self-distillation（HTBC）]] 讲得最细）；
- **易混点**：①"异步"指**训练/采样期** token 各有噪声进度，不是推理期多步——蒸馏后推理就一步；②one-hot 插值是连续松弛，token 始终离散（denoiser 每位输出词表分布）；③学习式调度下终点分布不再精确等于数据分布（Prop 2 只保 prescribed/无关版精确）——换生成质量的自觉取舍；
- **读法建议**：图 1（rhyme 例子：kitten 先出来带着前词走）→ Prop 1（顺序自由度=路径无穷）→ §4.2（流图蒸馏主菜）→ §5（Sudoku/GSM8K 主表+隐层分析）。

> 原文：https://arxiv.org/pdf/2610.42018v1 ｜ 在线全文：https://arxiv.org/html/2610.42018v1 ｜ 代码：github.com/david3684/async-fmlm

---

> 谱系枢纽：[[Flow Matching for Generative Modeling（流匹配）]]（图谱连通入口）

> 近邻同族：[[Large Flow Language Models]] · [[Distilled Continuous Diffusion Language Models Can Write Code in Few Steps---or One]] · [[Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）]] · [[Train the Sampler You Run Few-Step Masked Diffusion Language Models via Mixture-Likelihood Fine-Tuni|Mix-FT]]

> 数学根基：[[30-Formulas/条件流匹配损失]] · [[20-Algorithms/流匹配]] · [[20-Algorithms/一致性模型]]
