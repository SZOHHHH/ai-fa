---
type: paper
title: "Where Did the Update Go? Certifying Declared Change Envelopes for Model Updates"
aliases: [Where Did the Update Go, Declared Change Envelopes]
year: 2026
authors: [Muhammad Usama, et al.]
venue: 待核（arXiv 2026-11-03）
arxiv: "2611.04192v1"
pdf: https://arxiv.org/pdf/2611.04192v1
line: 强化学习与对齐
matrix_coords: [更新审计(泄漏认证), anytime-valid检验, LoRA/FT/PO/RL全谱测量]
tags: [paper]
---
# Where Did the Update Go?：模型更新的声明变更包络认证

> 中文速览：把「证明模型更新只改变声明过的行为」形式化为 declared change envelopes：训练前开发者承诺一个输入区域，区域外的任何决策改变都算泄漏；泄漏只需比较新旧两个模型，可用无标注流量上的 anytime-valid 检验认证并给出样本量上下界，逐次认证可合成全生命周期漂移界。实测窄域更新泄漏广泛：LoRA/全参/偏好优化/RL/知识编辑（1.5B-72B）里域/策略 LoRA 仅 7-36% 的决策改变落在声明范围，泄漏幅度与域外 KL 的 Spearman 达 0.94；锚定式更新（在部署格式无标注提示上蒸馏现任模型决策）可用几百到几千样本认证 5% 泄漏率，开放域聊天则没有任何更新能通过认证。

## 1. 一句话贡献

把「更新只改变声明过的行为」形式化为声明变更包络（区域外决策改变=泄漏），用 anytime-valid 检验从无标注流量认证泄漏并给样本量界；实测所有主流更新方式（LoRA/全参/偏好优化/RL/知识编辑）泄漏都远超直觉（域/策略 LoRA 仅 7-36% 变化在声明内），泄漏幅度与域外 KL 高相关（Spearman 0.94），锚定式更新（蒸馏现任模型决策）是唯一能被低成本认证的修补。

## 2. 核心贡献
- （待精读）

## 3. 方法概要
（待精读）

## 4. 核心公式
（待精读）

## 5. 与前作/矩阵关系
- 线锚：[[20-Algorithms/RLHF]]（RL/偏好优化也在其测量谱内——「更新走了多远」的审计视角补全对齐流水线）；
- ≡ 工具近邻：[[20-Algorithms/参数高效微调（PEFT）]]（LoRA 更新是其主要测量对象——「局部参数修改≠局部行为改变」的实证）；[[20-Algorithms/DPO系（离线偏好优化）]] 同属被测更新族；
- 概念/公式链：[[40-Concepts/KL散度]]（泄漏示性量：域外 KL 与泄漏幅度 Spearman 0.94——KL 做「更新走了多远」的度量）· [[40-Concepts/策略梯度定理]] · [[40-Concepts/on-policy与off-policy]]（部署流量=无标注认证数据源）。

## 6. 影响后续
（待精读）

## 7. 读前须知
（待精读）原文：https://arxiv.org/pdf/2611.04192v1；在线全文（新论文）：https://arxiv.org/html/2611.04192v1

---

> 谱系枢纽：[[40-Concepts/KL散度]]（图谱连通入口）

> 数学根基：[[40-Concepts/KL散度]] · [[20-Algorithms/参数高效微调（PEFT）]] · [[20-Algorithms/RLHF]]
