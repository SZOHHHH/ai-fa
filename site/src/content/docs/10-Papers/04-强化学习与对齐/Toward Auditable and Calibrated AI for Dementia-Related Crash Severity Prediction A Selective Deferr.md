---
type: paper
title: "Toward Auditable and Calibrated AI for Dementia-Related Crash Severity Prediction: A Selective Deferral Framework to Support Human Review"
aliases: [Crash Triage Deferral]
year: 2026
authors: [Gaurab Chhetri, Anika Baitullah, Subasish Das]
venue: arXiv 2026
arxiv: "2609.22694v1"
pdf: 已下载（PDF/）
line: 强化学习与对齐
matrix_coords: [决策感知评测(分诊), 校准与选择性推迟, 应用统计(交通安全)]
tags: [paper]
---

# Crash Triage Deferral（痴呆相关事故严重度分诊）

## 1. 一句话贡献

把痴呆相关事故严重度预测从"普通分类器评测"重构为**决策感知分诊问题**：控结果泄漏、报告重度漏分、校准置信度、保留每条原始预测供审计，并用选择性推迟把难例路由给人——70% 覆盖下 macro-F1 从 0.522 升至 0.573、严重度代价降至 0.577，推迟例进入建议的人工复核流程。

## 2. 核心贡献

- **问题重构**：三级分诊（无伤/仅财产损失 O、轻中度伤 BC、致命或重伤 KA）而非裸分类；评测维度扩到结果泄漏控制、重度漏分报告（under-triage 比漏报更致命）、置信度校准、全程可审计四个公共部门刚需
- **泄漏控制协议**：警方叙事文本中"事后才可知"的结果线索（直接结果词+语料衍生的结果代理短语）遮蔽；全量/控漏成对评测量化叙事泄漏的虚增
- **六类基线的系统对比**：结构化字段、叙事文本、融合、校准融合、BERT 系、本地 LLM——分层 70/15/15 划分下控漏 Gemma 观测最高 macro-F1 0.545（bootstrap CI [0.507, 0.583]）；最佳校准融合 ECE 0.033
- **选择性推迟框架**：低置信样本推迟、留存样本性能单调提升；覆盖率-性能曲线成为主要汇报口径（而非单一准确率）

## 3. 方法概要

1. 数据：德州 CRIS 2017-2025 约 500 万条事故记录，高召回词检索+人工语境复筛得 4,781 条痴呆相关（叙述须给出痴呆/近缘认知条件参与事故的充分证据）
2. 泄漏遮蔽：预定义结果揭示词+语料衍生短语屏蔽（自认"控漏"而非"无漏"）
3. 六类基线训练与调参（25 个结构化预测子+叙事文本）
4. 置信度校准（校准融合 ECE 0.033）
5. 选择性推迟：按置信度阈值放行/推迟，扫阈值出覆盖率-性能/代价曲线；推迟例视作人工复核候选（本实验不再评估）
6. 审计层：每条原始预测保留可查

## 4. 核心公式

选择性推迟（概念式）：

`$$c(x) \ge \tau \Rightarrow \text{放行自动分类 } f(x);\quad c(x) < \tau \Rightarrow \text{推迟入人工复核};\quad \text{coverage}(\tau) = \text{P}\{c(X) \ge \tau\}$$`

**直觉**：阈值 $$\tau$$ 是"机器自尊心"的旋钮——只报置信够高的例，剩下的承认不会、交给人。评测跟着换口径：macro-F1 与严重度代价只在**留存集**上算，覆盖率单列——性能数字永远和"机器到底接了多少"绑定呈现，防止"只挑软柿子"的高分幻觉。

## 5. 与前作/矩阵关系

- 评测学表亲（跨线）：[Decision-Metric Alignment in Latent World Models: Diagnostics and Action-Conditioned Objectives for MPC Planning](/ai-fa/explore/10-Papers/09-世界模型与JEPA/Decision-Metric Alignment in Latent World Models Diagnostics and Action-Conditioned Objectives for MPC Planning)——同属"预测指标≠决策效用"家族：那边是潜距离不保任务排序，这边是准确率不保分诊工作流（漏分代价不对称）；两枚跨域证据可并列引用
- 基线谱系：[BERT - Pre-training of Deep Bidirectional Transformers for Language Understanding](/ai-fa/explore/10-Papers/01-架构演进/BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）)（BERT 系基线）与 Gemma/本地 LLM 基线（07-推理模型线交叉）
- 数学根基：[交叉熵](/ai-fa/explore/30-Formulas/交叉熵)（校准视角下的损失）· [温度参数](/ai-fa/explore/40-Concepts/温度参数)（置信度校准的标配工具）· [条件概率](/ai-fa/explore/40-Concepts/条件概率)（ECE=分箱内置信对精度的条件平均偏差）
- 线锚：本卡挂 04-强化学习与对齐线系 decision-aware 哨兵轮换命中（决策感知，非 RL 算法本体）

## 6. 影响后续

- "分类器→分诊系统"的重构模板（泄漏控制+非对称代价+校准+推迟+审计五件套）可直接移植到其他公共部门预测任务
- 覆盖率-性能联合汇报口径，是对"单一 F1 评比"的方法论纠偏
- 痴呆×事故严重度这个数据格本身首次系统填充（此前文献只做风险/行为关联）

## 7. 读前须知

[交叉熵](/ai-fa/explore/30-Formulas/交叉熵)（分类损失与置信度）· 期望校准误差 ECE（分箱置信-精度差的均值，建议先理解可靠性图）· 选择性预测与拒绝学习（Geifman & El-Yaniv 一系的基本设定）· 结果泄漏（decision-time 不可得信息混入训练特征——特征工程里最隐蔽的作弊）。
