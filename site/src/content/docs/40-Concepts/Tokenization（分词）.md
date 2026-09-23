---
type: concept
aliases: [Tokenization, 分词, tokenizer, BPE, 字节对编码, WordPiece, 词表, vocab]
domain: 架构
tags: [concept]
---

# Tokenization（分词）

## 1. 定义（直觉 → 形式）

**直觉**：模型只认数字，不认字——**先把文本切成小块（token）、编上号，模型才能开工**。切法是个精妙的折中：按词切（词表爆炸、生词没法办）、按字/字节切（序列太长、费算力）、**按统计高频片段切（BPE，现代默认）**。

**形式**：分词器=双射映射 $$\text{text} \leftrightarrow (\text{token 序列}) \to (\text{编号序列})$$，再查 [嵌入向量（Embedding）](/ai-fa/explore/40-Concepts/嵌入向量（Embedding）) 表进模型：
$$\text{"低秩分解"} \to [\text{低秩}, \text{分解}] \to [48213, 9017] \to [E[:,48213],\, E[:,9017]]$$

## 2. 教程：BPE 从零跑一遍（手算）

**第 0 步：语料预备。** 语料："low low lower lowest"（示意）。先切成最小单位（英文=字符，中文=单字）：
`l o w / l o w / l o w e r / l o w e s t`

**第 1 步：数频次，合并最黏的一对。** 相邻对频次：`(l,o)`×4、`(o,w)`×4、`(w,e)`×2……并频次最高的 `(l,o)`→`lo`：
`lo w / lo w / lo w e r / lo w e s t`

**第 2 步：重复。** 现在最频对 `(lo,w)`×4 → 合并成 `low`：
`low / low / low e r / low e s t`；再并 `(low,e)`×2……**每合并一次，词表长一条规则**。

**第 3 步：词表=单字+合并规则。** 最终词表形如：{所有单字符（保底——任何文本都切得开）, "lo", "low", "lower", "est", ...}。**新文本来了按学到的规则贪婪切**：见 "low" 整块吐出，没见过的 "lowerest" 退化成已知的最大块拼接（`lower`+`est` 或逐字符）——**永不出现"词表外"死局**（对比词级分词的 `<UNK>` 惨案）。

**第 4 步：三个流派的取舍。**

| 流派 | 切法 | 词表 | 代表 |
|---|---|---|---|
| 词级 | 整词一切 | 数十万+，生词=UNK | 史前时代 |
| 字符级 | 逐字符 | 极小（英文~100） | 序列长、建模难 |
| **子词（BPE/WordPiece/SentencePiece）** | 高频片段 | 3-15 万，可调 | **GPT/BERT/LLaMA 全系** |

WordPiece（BERT）与 BPE 差在合并准则（似然增益而非裸频次）；SentencePiece 把空格当普通字符处理（语言无关，中日韩友好）。**字节级 BPE（GPT-2 起）**：先映射到 256 个字节再合并——任何 UTF-8 文本（emoji、生僻字、代码）都保证可编码。

**第 5 步：切法如何影响模型行为。**
- **算力账**：中文一个字≈1-2 token、英文一个词≈1.3 token——同样内容中英文 token 数差 1.5-2 倍，直接换算成推理成本
- **边界效应**：数字"1234567"按 3 位一切=`123|456|7`——模型看到的世界被切法扭曲（算术能力受损的著名原因之一）
- **拼写类任务**：字符被合并进大块后，模型对"字母级"操作（数 r 个数）莫名出错——**token 边界即模型的"感知盲区"**
- **对抗面**：越狱文本利用切法歧义绕过过滤器（相同字符串不同 tokenization）

## 3. 为什么 AI 需要它

| 场景 | 用法 | 库内链接 |
|---|---|---|
| LLM 入口 | 一切文本的必经第一站 | [Transformer](/ai-fa/explore/20-Algorithms/Transformer) |
| 训练目标 | next-token 预测=预测"下一个编号" | [最大似然估计（MLE）](/ai-fa/explore/40-Concepts/最大似然估计（MLE）)（序列 MLE） |
| 上下文长度 | 上下文按 token 计数 | [KV缓存](/ai-fa/explore/40-Concepts/KV缓存) |
| 采样生成 | 从词表分布里挑编号、解码回文本 | [采样器](/ai-fa/explore/40-Concepts/采样器) |
| 计价 | API 按 token 计费 | 工程常识 |

## 4. 常见误区

- **误区**：token=词——中文一字≈1-2 token、英文一词≈1.3 token；"token 数=词数×系数（语言相关）"才是对的换算
- **误区**：分词是无关紧要的预处理——切法决定模型"看得见什么"（数字切碎损害算术、拼写边界扭曲感知）；换 tokenizer=换模型的世界观（必须重训）
- **误区**：词表越大越好——大词表序列短（省算力）但嵌入参数多、低频 token 训不充分（欠拟合的碎片）；3-15 万是实证甜区
- **误区**：BPE 学的是"语言学词根"——纯统计黏着（频次），切出的块常与语素边界无关；"语义合理"只是高频共现的副产品

## 5. 自测

1. BPE 为什么永不产生 UNK？（单字符保底——任何字节序列都能退化到逐字符切）
2. 为什么中文比英文费 token？（单位信息密度：一字多义但 token 化系数高——同名内容更多 token）
3. 词表大小的三难（三角取舍）？（序列长度 vs 嵌入参数量 vs 低频 token 的充分训练）
4. tokenizer 与 embedding 的分工？（切+编号 vs 编号→向量——查表发生在嵌入层）

## 6. 相关概念

- [嵌入向量（Embedding）](/ai-fa/explore/40-Concepts/嵌入向量（Embedding）)：编号→向量的下一站
- [独热编码（One-Hot）](/ai-fa/explore/40-Concepts/独热编码（One-Hot）)：编号的数学载体（查表视角）
- [Transformer](/ai-fa/explore/20-Algorithms/Transformer)：消费 token 序列的主干
- [采样器](/ai-fa/explore/40-Concepts/采样器)：生成侧的出口（token 分布→文本）
- [KV缓存](/ai-fa/explore/40-Concepts/KV缓存)：上下文以 token 为单位计价与缓存
