---
type: paper
title: "Reliable Federated TinyML Deployment for IoT Security"
aliases: [FedTinyML-IoT]
year: 2026
authors: [Younsoo Park, et al.]
venue: arXiv 2026
arxiv: "2609.27202v1"
pdf: 已下载（PDF/）
line: 后处理
matrix_coords: [联邦学习×TinyML, 模型压缩, IoT入侵检测, 隐私]
tags: [paper]
---

# Reliable Federated TinyML Deployment for IoT Security

## 1. 一句话贡献

把联邦学习与 TinyML 压缩组合到一起，让隐私保护的 IoT 入侵检测系统直接跑在微控制器级设备上——联邦训练解决"原始数据不出设备"，TinyML 压缩解决"模型塞得进 KB 级内存"。

## 2. 核心贡献

- 问题定位：联邦模型通常太大太不稳，微控制器跑不动；TinyML 通常只管推理不管训练——两条线在"设备上入侵检测"场景合流
- 系统研究联邦学习+TinyML 压缩组合在资源受限硬件上的部署可靠性与检测性能权衡
- 隐私+资源双重约束下给出可部署的入侵检测方案（摘要级结论；量化数字待精读）

## 3. 方法概要

1. 各 IoT 设备用本地流量数据训练入侵检测模型（数据不出设备，满足隐私）
2. 联邦聚合（如 FedAvg 类）在服务端汇总模型更新，得到全局模型
3. TinyML 压缩（量化/剪枝/小架构）把全局模型压进微控制器级内存与算力预算
4. 部署后设备本地实时检测入侵，评估可靠性（摘要未给全数字，待精读补）

## 4. 核心公式

应用组合类论文，其骨架是联邦聚合公式：

`$$w^{(t+1)} = \sum_{k=1}^{K} \frac{n_k}{n}\, w_k^{(t+1)}$$`

**直觉**：全局模型=各设备本地模型的按数据量加权平均——"数据不动模型动"，隐私由此而来；TinyML 压缩随后作用在这个聚合结果上。

## 5. 与前作/矩阵关系

- ≡压缩部署同族 [DistilBERT, a distilled version of BERT - smaller, faster, cheaper and lighter](/ai-fa/explore/10-Papers/03-后处理/DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）)：同是"大模型能力→小设备"的迁移，此处叠加联邦维度
- ↔[量化](/ai-fa/explore/40-Concepts/量化)：TinyML 压缩工具箱的核心件
- ↔[知识蒸馏](/ai-fa/explore/40-Concepts/知识蒸馏)：压缩手段谱系中的一员（与量化/剪枝并列）

## 6. 影响后续

IoT 安全+边缘智能方向的工程组合参考；对库内主线（游戏 RL/WM）无直接影响，留作量化/联邦概念的场景引例。

## 7. 读前须知

- 联邦学习基本流程（本地训练+服务端聚合）与 [量化](/ai-fa/explore/40-Concepts/量化) 概念
- 微控制器级约束：内存 KB-MB 级、无浮点加速——理解"为什么必须压缩"即可
