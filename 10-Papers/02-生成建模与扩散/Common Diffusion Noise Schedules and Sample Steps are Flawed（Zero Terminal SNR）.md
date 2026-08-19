---
type: paper
title: Common Diffusion Noise Schedules and Sample Steps are Flawed
aliases: [Zero Terminal SNR]
year: 2023
authors: [Lin et al.]
venue: NeurIPS 2023
arxiv: "2305.08891"
pdf: 已下载（PDF/）
line: 生成建模与扩散
matrix_coords: [扩散/score, 像素空间, 调度修正]
tags: [paper]
---

# Zero Terminal SNR

## 1. 一句话贡献

噪声调度的隐疾：主流调度终点非纯噪声（terminal SNR>0）→ 模型从未见过全噪输入 → 低步采样露馅。修复：零终端 SNR+v-pred+rescale。

## 2. 核心贡献

1. 把训练噪声调度拉到真正零信号
2. 采样步 rescale

## 3. 方法概要

把训练噪声调度拉到真正零信号；预测参数换 v；采样步 rescale。
## 4. 核心公式


$$
\mathrm{SNR}(T) = 0,\ \tilde\alpha_T = 0\ \text{(严格零信号)}
$$


**直觉**：→ [[Elucidating the Design Space of Diffusion-Based Generative Models（EDM）]]（设计空间清理）同方向；SD 系社区修复运动的技术依据

## 5. 与前作/矩阵关系

扩散社区"基础设定错误也能凑合工作"的著名案例——工程审计类论文的典范

## 6. 影响后续

需要：SNR 与终端噪声的关系；为什么 latent 扩散特别易中招

## 7. 读前须知

undefined

> 近邻同族：[[Analyzing and Improving the Training Dynamics of Diffusion Models（EDM2）]] · [[Classifier-Free Diffusion Guidance（CFG）]]

> 数学根基：[[概率分布]]

> 数学根基：[[DSM目标]] · [[DDPM前向过程]]
