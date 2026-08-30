---
type: meta
title: "AI Formula Atlas"
tags: [home]
---

# AI 公式图谱 · AI Formula Atlas

> **给数学基础薄弱、想进入算法领域的学习者的 AI 论文知识网络**——公式优先、直觉先行、可验证。
>
> 🔍 **全文搜索**：点击顶部搜索框（或 `Ctrl/⌘ + K`），支持**中文与英文**混搜——论文别名、公式名、概念名都能直达。

一个以**数学公式与推导**为主导的知识库：**307 张论文卡**（10 条研究主线）+ **61 个公式实体** + **44 个概念实体** + **17 个算法族** + **12 张研究矩阵**，构成双网络（论文演化网 × 数学公式网）。

## 内容板块

| 板块 | 规模 | 是什么 |
|---|---|---|
| 📚 **[论文 Papers](10-papers/)** | 307 卡 · 10 条主线 | 每张卡七节结构，核心是"公式 + 逐项直觉解释"——不是摘要罗列 |
| 🧮 **[公式 Formulas](30-formulas/)** | 61 实体 | 数学对象的独立卡片：定义、推导、直觉、被哪些论文使用 |
| 💡 **[概念 Concepts](40-concepts/)** | 44 实体 | 术语与观念：on-policy、模式坍塌、去噪——看不懂论文里的词就来查 |
| ⚙️ **[算法 Algorithms](20-algorithms/)** | 17 族 | 计算流程实体：把公式组装成可运行步骤的"菜谱"（PPO、DMD、DIAMOND…） |
| 🗺️ **[研究矩阵 Matrices](60-matrices/)** | 12 张 | 多维研究版图：每格一篇代表作，看方向间的空位与机会 |
| 🛠 **[规范与设置](00-meta/)** | 4 文档 | 底层治理：记号规范、矩阵规范、建模指南、论文来源策略 |

## 十条研究主线（论文库内部结构）

[01 架构演进](10-papers/01-架构演进/) · [02 生成建模与扩散](10-papers/02-生成建模与扩散/) · [03 后处理](10-papers/03-后处理/) · [04 强化学习与对齐](10-papers/04-强化学习与对齐/) · [05 MoE](10-papers/05-MoE/) · [06 长上下文](10-papers/06-长上下文/) · [07 推理模型](10-papers/07-推理模型/) · [08 多模态](10-papers/08-多模态/) · [09 世界模型与JEPA](10-papers/09-世界模型与JEPA/) · [10 标杆锚点](10-papers/10-标杆锚点/)

## 从哪里开始

- **入门旗舰**：[[10-Papers/01-架构演进/Attention Is All You Need（Transformer）|Transformer]] · [[10-Papers/02-生成建模与扩散/Denoising Diffusion Probabilistic Models（DDPM）|DDPM]]
- **前沿深水区**：[[10-Papers/09-世界模型与JEPA/Diffusion for World Modeling- Visual Details Matter in Atari（DIAMOND）|DIAMOND]] · [[60-Matrices/世界模型矩阵|世界模型矩阵]]
- **右侧图谱**（Graph view）：看任意一页的双链网络——这正是本库的灵魂

## 三件别人没做的事

1. **公式优先** 🧮：统一记号规范，非主流符号有对照表换算——看不懂某个公式，点开它链接的公式/概念卡就是零基础解释
2. **可验证** ✅：`node tools/check_links.js` 保证 0 红链、frontmatter 类型正确——CI 中红链即构建失败，库本身是质量工程的示范
3. **两层收录** 🗺️：奠基层（范式论文）+ 占位层（方向占位者）——既是学习库，也是 AI 算法研究方向的雷达

## 想要 Obsidian 完整版？

本站由开源仓库 [SZOHHHH/ai-fa](https://github.com/SZOHHHH/ai-fa) 自动构建——clone 后用 Obsidian 打开仓库根目录即得可编辑版本（含贡献规范与验收工具链）。PDF 全文不入库（版权），卡片 frontmatter 的 `arxiv` 字段直达原文。

## License

- 内容：[CC BY-NC 4.0](./LICENSE-CONTENT)（禁商用，转载署名）
- 代码：[MIT](./LICENSE-CODE)
