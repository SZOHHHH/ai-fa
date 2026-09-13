---
type: paper
title: "When Top-K Misses the Decision: Tool-Call Drift in Multi-Teacher On-Policy Distillation"
aliases: [When Top-K Misses the Decision]
year: 2026
authors: Jiabin Shen, Guang Chen, Chengjun Mao
venue: arXiv
arxiv: 2607.07050
pdf: 10-Papers/PDF/When Top-K Misses the Decision Tool-Call Drift in Multi-Teacher On-Policy Distillation.pdf
line: 强化学习与对齐
matrix_coords: 待评
tags: [paper, 占位, 0910补扫]
---

## 1. 一句话贡献

Top-K 教师 logits 保留了 99.99% 的概率质量，却可能漏掉学生梯度最需要的 decision-critical 支撑 token——质量保留≠梯度保真，蒸馏出的学生会过度调用工具（14.2%）。

## 2. 核心贡献

- 实证发现：响应教师 top-32 留 99.99% 质量，但只在 0.4% 的提示里含入口 token；工具教师却在全部匹配对里强化它——多教师路由下的支撑不对称
- student-aware 支撑修复：按学生需要的坐标补全教师支撑，全词表下降方向恢复，过度调用 14.2%→3.7%
- 三层优化方案对照：student-aware 改坐标 / loss shaping 改强度 / 入口偏置改推理——修正范围与部署代价各异
- Llama-3.1-8B 在原生 JSON 协议下复现方向性支撑不对称

## 3. 方法概要

① 冻结 Qwen3.5-9B 审计两教师的 top-K 行为 → ② 对照实验分离"质量保留"与"梯度保真" → ③ student-aware 支撑修复 + 三层方案消融 → ④ 行为层验证（过度调用率）

## 4. 核心公式

（待精读——占位卡，Tier 升级时补）

## 5. 与前作/矩阵关系

- 谱系锚：[[40-Concepts/知识蒸馏]]，[[30-Formulas/交叉熵]]
- **哨兵研判（9/10 补扫）**：🟡 E1 弹药（强）：top-K 截断丢 decision-critical 支撑→行为漂移，正是我们"像素保真≠决策保真"命题在 cs.CL 域的直接同构证据——压缩形式不同（支撑集截断 vs 步数压缩），失败机理相同（保留"质量"丢"决策信号"）。E1 论文相关工作节可引。

## 6. 影响后续

（待精读）

## 7. 读前须知

（待精读；升级时按 [[00-Meta/模板与建模指南]] 补全）

> 建卡：2026-09-10 哨兵盲区补扫（API 429 限流期间经 arxiv.org 网页搜索通道人工核对元数据）
