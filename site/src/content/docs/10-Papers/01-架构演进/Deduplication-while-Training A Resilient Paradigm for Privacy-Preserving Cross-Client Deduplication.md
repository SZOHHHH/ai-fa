---
type: paper
title: "Deduplication-while-Training: A Resilient Paradigm for Privacy-Preserving Cross-Client Deduplication in Federated Learning"
aliases: [DwT-FL, DwT]
year: 2026
authors: [Rongxi Wang, et al.]
venue: arXiv 2026-09
arxiv: "2609.31262v1"
pdf: https://arxiv.org/pdf/2609.31262v1
line: 架构演进
matrix_coords: [数据, 去重, 联邦学习]
tags: [paper]
---

# DwT-FL：训练中去重的隐私保护跨客户端去重

## 1. 一句话贡献

把联邦学习里"先全局去重再训练"的串行范式改成"边训边去重"的并发在线服务——跨客户端去重从一次性全局同步预处理变成带状态管理/并发认领/故障恢复的持续流程，故障恢复与动态客户端加入的时间开销最高降 93%/94%。

## 2. 核心贡献

- **范式转移**：Deduplication-before-Training → Deduplication-while-Training——解除去重与训练的串行耦合（容错贵、不支持动态加入）；
- **系统三件套**：状态同步+任务接管（客户端掉线影响最小化）、**并发状态认领机制**（多客户端并行认领去重任务）、**冷热双队列调度**（安全去重与模型训练并行）；
- 动态不稳定 FL 环境下的弹性：失败恢复时间降 93.04%、动态加入开销降 94.18%（vs SOTA）。

## 3. 方法概要

1. 去重任务切成可认领的工作单元，客户端并发认领+执行（隐私保护协议下比对跨客户端数据）；
2. 热队列放高优先级/活跃任务、冷队列放待激活任务，双队列调度让去重不阻塞训练主链；
3. 掉线客户端的任务被其他客户端接管，状态同步保证不重复劳动；
4. 新客户端随时加入触发增量去重而非全局重来（摘要级：隐私比对协议细节待精读）。

## 4. 核心公式

本卡为系统/协议工作，核心贡献在调度与状态机而非数学公式；去重的判定基础是隐私保护下的相似度比对（PSI 类协议，[过拟合与正则化](/ai-fa/explore/40-Concepts/过拟合与正则化) 记录去重对 memorization 的抑制动机：重复样本=过拟合放大器+隐私泄露面）。精确协议公式待精读正文后补。

## 5. 与前作/矩阵关系

- 对照全部 Deduplication-before-Training 系（串行范式）；
- 动机链：训练语料重复 → 模型 memorization ↑ → 隐私风险 ↑（去重是 [过拟合与正则化](/ai-fa/explore/40-Concepts/过拟合与正则化) 的数据侧手段）；
- 概念链：[Transformer](/ai-fa/explore/20-Algorithms/Transformer)（被训练的 LLM 宿主）、[过拟合与正则化](/ai-fa/explore/40-Concepts/过拟合与正则化)、[马尔可夫链](/ai-fa/explore/40-Concepts/马尔可夫链)（任务状态机的离散状态转移视角）。

## 6. 影响后续

FL 数据工程的服务化范式样本；对我们主线（WM 蒸馏/反推）无直接交叉，属轮换线知识面覆盖。

## 7. 读前须知

联邦学习基础概念；去重与 memorization 的关联见 [过拟合与正则化](/ai-fa/explore/40-Concepts/过拟合与正则化)。
