// B7 Canvas 族谱生成器：从紧凑规格生成 Obsidian Canvas（带边语义标签）
// 用法: node 00-Meta/gen_canvas.js
// 重新生成会覆盖 50-Canvas/*.canvas
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '50-Canvas');
fs.mkdirSync(OUT, { recursive: true });

const W = 320, H = 250, TX = 300, TH = 120, GX = 920, GY = 760; // GX/GY = 两倍间距：为边标签留足空间
const at = (col, row) => ({ x: Math.round(col * GX), y: Math.round(row * GY) });
const missing = [];

const P = (id, file, col, row, color) => ({ id, kind: 'file', file, ...at(col, row), color, w: W, h: H });
// T：尊重自定义宽高（未传则用默认 TX/TH）
const T = (id, text, col, row, color, w, h) => ({ id, kind: 'text', text, ...at(col, row), color, w: w || TX, h: h || TH });
const E = (from, to, label, color, fs = 'right', ts = 'left') => ({ from, to, label, color, fs, ts });

function canvas(name, nodes, edges) {
  for (const n of nodes) if (n.kind === 'file' && !fs.existsSync(path.join(ROOT, n.file))) missing.push(`${name}: ${n.file}`);
  const data = {
    nodes: nodes.map(n => {
      const o = { id: n.id, x: n.x, y: n.y, width: n.w, height: n.h };
      if (n.kind === 'file') { o.type = 'file'; o.file = n.file; } else { o.type = 'text'; o.text = n.text; }
      if (n.color) o.color = n.color;
      return o;
    }),
    edges: edges.map((e, i) => {
      const o = { id: `e${i}`, fromNode: e.from, fromSide: e.fs, toNode: e.to, toSide: e.ts };
      if (e.label) o.label = e.label; if (e.color) o.color = e.color;
      return o;
    })
  };
  fs.writeFileSync(path.join(OUT, name + '.canvas'), JSON.stringify(data, null, 1));
  console.log(`OK ${name}  ${nodes.length}节点 ${edges.length}边`);
}

const A = '10-Papers/01-架构演进/', G = '10-Papers/02-生成建模与扩散/', PO = '10-Papers/03-后处理/',
  R = '10-Papers/04-强化学习与对齐/', M = '10-Papers/05-MoE/', L = '10-Papers/06-长上下文/',
  RE = '10-Papers/07-推理模型/', V = '10-Papers/08-多模态/', WM = '10-Papers/09-世界模型与JEPA/',
  AN = '10-Papers/10-标杆锚点/', AL = '20-Algorithms/';
const md = n => n + '.md';

const TITLE = (t, sub) => T('title', `# ${t}\n${sub}`, -0.2, -1.3, '3', 640, 150);

// ═══ 线1 架构演进 ═══
canvas('线1-架构演进族谱', [
  TITLE('线1 · 架构演进（主干线）', '主题：**AI 用什么骨架处理序列**——CNN→Transformer→SSM/混合的主干更替，加上让主干可实用的组件优化（RoPE/Flash/GQA/MLA）。**其余八条线都建在这条主干之上**。\n读法：左→右 = 时间；紫 = 组件支线；橙 = 后Transformer支线'),
  P('alexnet', md(A + 'ImageNet Classification with Deep Convolutional Neural Networks（AlexNet）'), 0, 0),
  P('transformer', md(A + 'Attention Is All You Need（Transformer）'), 1, 0),
  P('gpt1', md(A + 'Improving Language Understanding by Generative Pre-Training（GPT-1）'), 2, 0),
  P('gpt2', md(A + 'Language Models are Unsupervised Multitask Learners（GPT-2）'), 3, 0),
  P('gpt3', md(A + 'Language Models are Few-Shot Learners（GPT-3）'), 4, 0),
  P('laws', md(A + 'Scaling Laws for Neural Language Models（Scaling Laws）'), 5, 0, '4'),
  P('llama', md(A + 'LLaMA- Open and Efficient Foundation Language Models（LLaMA）'), 6, 0),
  P('resnet', md(A + 'Deep Residual Learning for Image Recognition（ResNet）'), 0, 1),
  P('bert', md(A + 'BERT- Pre-training of Deep Bidirectional Transformers for Language Understanding（BERT）'), 2, 1),
  P('vit', md(A + 'An Image is Worth 16x16 Words- Transformers for Image Recognition at Scale（ViT）'), 4, 1),
  P('rope', md(A + 'RoFormer- Enhanced Transformer with Rotary Position Embedding（RoPE）'), 1, 2, '6'),
  P('flash', md(A + 'FlashAttention- Fast and Memory-Efficient Exact Attention with IO-Awareness（FlashAttention）'), 2, 2, '6'),
  P('gqa', md(A + 'GQA- Training Generalized Multi-Query Transformer Models from Multi-Head Checkoffs（GQA）'), 3, 2, '6'),
  P('mla', md(A + 'DeepSeek-V2- A Strong, Economical, and Efficient Mixture-of-Experts Language Model（MLA）'), 4, 2, '6'),
  P('mamba', md(A + 'Mamba- Linear-Time Sequence Modeling with Selective State Spaces（Mamba）'), 0, 3, '2'),
  P('mamba2', md(A + 'Transformers are SSMs- Generalized Models and Efficient Algorithms Through Structured St（Mamba-2）'), 1, 3, '2'),
  P('jamba', md(A + 'Jamba- A Hybrid Transformer-Mamba Language Model（Jamba）'), 2, 3, '2'),
  P('rwkv', md(A + 'RWKV- Reinventing RNNs for the Transformer Era（RWKV）'), 0, 4, '2'),
  P('retnet', md(A + 'Retentive Network- A Successor to Transformer for Large Language Models（RetNet）'), 1, 4, '2'),
], [
  E('alexnet', 'transformer', '奠基：GPU+深度网络时代'),
  E('resnet', 'transformer', '奠基：残差使深网络可训', undefined, 'right', 'left'),
  E('transformer', 'gpt1', '扩展：生成式预训练范式'),
  E('gpt1', 'gpt2', '扩展：规模化+零样本'),
  E('gpt2', 'gpt3', '扩展：175B+上下文学习'),
  E('gpt3', 'laws', '同团队：总结规模规律', '4'),
  E('laws', 'llama', '规模科学→开源配方（经Chinchilla修正）', '4'),
  E('transformer', 'bert', '平行：双向理解路线'),
  E('transformer', 'vit', '扩展：patch化进视觉'),
  E('transformer', 'rope', '组件：位置编码', '6'),
  E('transformer', 'flash', '组件：IO优化（数学不变）', '6'),
  E('transformer', 'gqa', '组件：KV头优化', '6'),
  E('gqa', 'mla', '改进：头削减→低秩压缩', '6'),
  E('transformer', 'mamba', '挑战：O(n²)→线性时间', '2'),
  E('mamba', 'mamba2', '统一：SSD对偶（与注意力同族）', '6'),
  E('mamba2', 'jamba', '实用化：混合架构'),
  E('transformer', 'rwkv', '平行：注意力线性化', '2'),
  E('transformer', 'retnet', '平行：三形式等价', '2'),
  E('retnet', 'mamba2', '被SSD理论收编', '6', 'bottom', 'top'),
]);

// ═══ 线2 生成建模与扩散 ═══
canvas('线2-生成建模与扩散族谱', [
  TITLE('线2 · 生成建模与扩散族谱', '三代叙事：变分/对抗 → 扩散统一 → 流匹配合流 → 蒸馏加速'),
  P('vae', md(G + 'Auto-Encoding Variational Bayes（VAE）'), 0, 0),
  P('gan', md(G + 'Generative Adversarial Networks（GAN）'), 1, 0),
  P('ddpm', md(G + 'Denoising Diffusion Probabilistic Models（DDPM）'), 2, 0),
  P('adm', md(G + 'Diffusion Models Beat GANs on Image Synthesis（ADM）'), 3, 0),
  P('ldm', md(G + 'High-Resolution Image Synthesis with Latent Diffusion Models（LDM）'), 4, 0),
  P('dit', md(G + 'Scalable Diffusion Models with Transformers（DiT）'), 5, 0),
  P('vqvae', md(G + 'Neural Discrete Representation Learning（VQ-VAE）'), 0, 1),
  P('vqgan', md(G + 'Taming Transformers for High-Resolution Image Synthesis（VQGAN）'), 1, 1),
  P('smld', md(G + 'Generative Modeling by Estimating Gradients of the Data Distribution（SMLD）'), 2, 1),
  P('ssde', md(G + 'Score-Based Generative Modeling through Stochastic Differential Equations（Score-SDE）'), 3, 1),
  P('edm', md(G + 'Elucidating the Design Space of Diffusion-Based Generative Models（EDM）'), 4, 1),
  P('cfg', md(G + 'Classifier-Free Diffusion Guidance（CFG）'), 5, 1),
  P('unet', md(G + 'U-Net- Convolutional Networks for Biomedical Image Segmentation（U-Net）'), 0, 2),
  P('ddim', md(G + 'Denoising Diffusion Implicit Models（DDIM）'), 1, 2),
  P('fm', md(G + 'Flow Matching for Generative Modeling（流匹配）'), 2, 2, '5'),
  P('rf', md(G + 'Flow Straight and Fast- Learning to Generate and Transfer Data with Rectified Flow（矩形流）'), 3, 2, '5'),
  P('si', md(G + 'Building Normalizing Flows with Stochastic Interpolants（随机插值）'), 4, 2, '5'),
  P('pdist', md(G + 'Progressive Distillation for Fast Sampling of Diffusion Models（渐进蒸馏）'), 1, 3),
  P('cm', md(G + 'Consistency Models（一致性模型）'), 2, 3),
  P('dmd', md(G + 'One-step Diffusion with Distribution Matching Distillation（DMD）'), 3, 3),
  P('dmd2', md(G + 'Improved Distribution Matching Distillation for Fast Image Synthesis（DMD2）'), 4, 3),
  P('meanflow', md(G + 'Mean Flows for One-step Generative Modeling（MeanFlow）'), 2, 4, '5'),
  P('mfd', md(G + 'Mean Flow Distillation - Robust and Stable Distillation for Flow Matching Models（MFD）'), 3, 4, '5'),
  P('imm', md(G + 'Inductive Moment Matching（IMM）'), 4, 4, '5'),
  P('ayf', md(G + 'Align Your Flow- Scaling Continuous-Time Flow Map Distillation（AYF）'), 5, 4, '5'),
  P('lcm', md(G + 'Latent Consistency Models- Synthesizing High-Resolution Images with Few-Step Inference（LCM）'), 1, 4),
  P('mcm', md(G + 'Multistep Consistency Models（MCM）'), 0, 4),
  P('deis', md(G + 'Fast Sampling of Diffusion Models with Exponential Integrator（DEIS）'), 0, 5, '4'),
  T('matrix_note', '**研究矩阵**（11 张全景）见 [[60-Matrices/生成模型加速矩阵]]·[[60-Matrices/生成建模范式矩阵]]·[[60-Matrices/RL稳定化矩阵]]·[[60-Matrices/偏好优化矩阵]]·[[60-Matrices/序列架构演进矩阵]]·[[60-Matrices/模型压缩矩阵]]·[[60-Matrices/MoE路由矩阵]]·[[60-Matrices/长上下文机制矩阵]]·[[60-Matrices/推理增强矩阵]]·[[60-Matrices/多模态对齐矩阵]]·[[60-Matrices/世界模型矩阵]]——空白格 = 机会格（如 FM×矩匹配×蒸馏）', 4, 5, '3', 700, 220),
], [
  E('vae', 'ddpm', '扩展：单步隐变量→整条马尔可夫链'),
  E('gan', 'adm', '被反超（扩散加冕之战）'),
  E('ddpm', 'smld', '平行同源（变分派 vs score派）'),
  E('smld', 'ssde', '被统一：VE-SDE', '6'),
  E('ddpm', 'ssde', '被统一：VP-SDE', '6'),
  E('ssde', 'edm', '改进：设计空间系统消融'),
  E('ddpm', 'adm', '改进：架构+分类器引导'),
  E('adm', 'cfg', '简化：去分类器化'),
  E('vae', 'vqvae', '扩展：连续→离散隐空间'),
  E('vqvae', 'vqgan', '组合：+感知损失+自回归先验'),
  E('vqgan', 'ldm', '奠基：感知压缩器', undefined, 'right', 'top'),
  E('ddpm', 'ldm', '搬进潜空间（省算力两个量级）'),
  E('unet', 'dit', '骨干被替换：U-Net→Transformer', undefined, 'right', 'left'),
  E('ldm', 'dit', '骨干升级路线'),
  E('ddpm', 'ddim', '扩展：非马尔可夫+确定性采样'),
  E('ssde', 'fm', 'ODE视角→直接学速度场', '6'),
  E('fm', 'rf', '平行同构（直线+reflow）', '6'),
  E('fm', 'si', '被统一：插值框架（含ELBO证明）', '6'),
  E('ddim', 'pdist', '提供教师轨迹', undefined, 'bottom', 'top'),
  E('pdist', 'cm', '演进：步数减半→一步自洽'),
  E('cm', 'dmd', '路线切换：轨迹自洽→分布匹配'),
  E('dmd', 'dmd2', '改进：+回归项+GAN项+CFG蒸馏'),
  E('lcm', 'mfd', '范式：潜空间蒸馏→FM原生蒸馏', '5', 'bottom', 'top'),
  E('fm', 'meanflow', '平均速度：瞬时→时间积分（免蒸馏）', '5'),
  E('meanflow', 'mfd', '范式：从头→蒸馏预训练（ICML26占格）', '5'),
  E('fm', 'imm', '矩匹配：前二阶矩充分性', '5'),
  E('cm', 'ayf', '推广：单端点→任意端点flow map', '5'),
  E('cm', 'mcm', '推广：单段→多段网格', undefined, 'bottom', 'top'),
  E('cm', 'lcm', '移植：像素→潜空间（+LoRA）'),
  E('ddim', 'deis', '一阶→指数积分器高阶（训练-free）', '4'),
]);

// ═══ 线3 后处理 ═══
canvas('线3-后处理族谱', [
  TITLE('线3 · 后处理族谱', '三条子线：蒸馏 / PEFT / 量化+剪枝——目标一致：让大模型变小变便宜'),
  P('kd', md(PO + 'Distilling the Knowledge in a Neural Network（KD）'), 0, 0),
  P('distil', md(PO + 'DistilBERT, a distilled version of BERT- smaller, faster, cheaper and lighter（DistilBERT）'), 1, 0),
  P('tiny', md(PO + 'TinyBERT- Distilling BERT for Natural Language Understanding（TinyBERT）'), 2, 0),
  P('theseus', md(PO + 'BERT-of-Theseus- Compressing BERT by Progressive Module Replacing（Theseus）'), 3, 0),
  P('adapter', md(PO + 'Parameter-Efficient Transfer Learning for NLP（Adapter）'), 0, 1),
  P('prefix', md(PO + 'Prefix-Tuning- Optimizing Continuous Prompts for Generation（Prefix-Tuning）'), 1, 1),
  P('lora', md(PO + 'LoRA- Low-Rank Adaptation of Large Language Models（LoRA）'), 2, 1),
  P('qlora', md(PO + 'QLoRA- Efficient Finetuning of Quantized LLMs（QLoRA）'), 3, 1),
  P('dora', md(PO + 'DoRA- Weight-Decomposed Low-Rank Adaptation（DoRA）'), 4, 1),
  P('int8', md(PO + 'LLM.int8()- 8-bit Matrix Multiplication for Transformers at Scale（LLM.int8）'), 0, 2),
  P('gptq', md(PO + 'GPTQ- Accurate Post-Training Quantization for Generative Pre-trained Transformers（GPTQ）'), 1, 2),
  P('smooth', md(PO + 'SmoothQuant- Accurate and Efficient Post-Training Quantization for Large Language Models（SmoothQuant）'), 2, 2),
  P('awq', md(PO + 'AWQ- Activation-aware Weight Quantization for LLM Compression and Acceleration（AWQ）'), 3, 2),
  P('lottery', md(PO + 'The Lottery Ticket Hypothesis- Finding Sparse, Trainable Neural Networks（Lottery Ticket）'), 0, 3),
  P('sparsegpt', md(PO + 'A Simple and Effective Pruning Approach for Large Language Models（SparseGPT）'), 1, 3),
  T('moe_note', '**稀疏MoE**（Shazeer 2017）→ 见 [[线5-MoE族谱]]：参数稀疏化的另一支', 3, 3, '3', 420, 150),
], [
  E('kd', 'distil', '应用：LLM蒸馏时代开启'),
  E('distil', 'tiny', '改进：输出对齐→全栈对齐'),
  E('distil', 'theseus', '改进：一次性→渐进替换'),
  E('adapter', 'prefix', '变位：层内→注意力输入侧'),
  E('adapter', 'lora', '改进：串行延迟→旁路零开销'),
  E('lora', 'qlora', '组合：+4bit量化基座'),
  E('lora', 'dora', '改进：+幅度/方向分解'),
  E('int8', 'gptq', '发现异常值→二阶误差补偿'),
  E('int8', 'smooth', '分治→难度转移（同数学异方向）'),
  E('gptq', 'awq', '重补偿→轻量等效缩放'),
  E('lottery', 'sparsegpt', '哲学对照：重训找子网→一步剪大网'),
]);

// ═══ 线4 RL对齐 ═══
canvas('线4-RL对齐族谱', [
  TITLE('线4 · RL与对齐族谱', '一个目标两条路：在线（PPO→GRPO→R1）与离线（DPO系）；浅蓝 = 轻量采样路线'),
  P('trpo', md(R + 'Trust Region Policy Optimization（TRPO）'), 0, 0),
  P('ppo', md(R + 'Proximal Policy Optimization Algorithms（PPO）'), 1, 0),
  P('gae', md(R + 'High-Dimensional Continuous Control Using Generalized Advantage Estimation（GAE）'), 0, 1),
  P('rlhf', md(R + 'Deep reinforcement learning from human preferences（RLHF）'), 0, 2),
  P('lab', md(R + 'A General Language Assistant as a Laboratory for Alignment（Assistant Lab）'), 1, 2),
  P('instruct', md(R + 'Training language models to follow instructions with human feedback（InstructGPT）'), 2, 2),
  P('cai', md(R + 'Constitutional AI- Harmlessness from AI Feedback（CAI）'), 3, 2),
  P('selfrw', md(R + 'Self-Rewarding Language Models'), 4, 2),
  P('dpo', md(R + 'Direct Preference Optimization- Your Language Model is Secretly a Reward Model（DPO）'), 2, 3, '5'),
  P('ipo', md(R + 'A General Theoretical Paradigm to Understand Learning from Human Preferences（IPO）'), 3, 3),
  P('kto', md(R + 'KTO- Model Alignment as Prospect Theoretic Optimization（KTO）'), 4, 3),
  P('orpo', md(R + 'ORPO- Monolithic Preference Optimization without Reference Model（ORPO）'), 3, 4),
  P('simpo', md(R + 'SimPO- Simple Preference Optimization with a Reference-Free Reward（SimPO）'), 4, 4),
  P('dsm', md(R + 'DeepSeekMath- Pushing the Limits of Mathematical Reasoning in Open Language Models（DeepSeekMath）'), 2, 5),
  P('r1', md(R + 'DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）'), 3, 5),
  P('bon', md(R + 'Statistical Rejection Sampling Improves Preference Optimization（BoN）'), 0, 3, '5'),
  P('raft', md(R + 'RAFT- Reward rAnked FineTuning for Generative Foundation Model Alignment（RAFT）'), 1, 3, '5'),
], [
  E('trpo', 'ppo', '简化：二阶信赖域→一阶裁剪'),
  E('gae', 'trpo', '配套：优势估计器', undefined, 'bottom', 'top'),
  E('gae', 'ppo', '配套：优势估计器', undefined, 'bottom', 'top'),
  E('rlhf', 'lab', '机器人→通用助手实验台'),
  E('lab', 'instruct', '方法→LLM规模化落地'),
  E('rlhf', 'instruct', '范式搬进LLM（三阶段定型）'),
  E('instruct', 'cai', '数据源：人类标注→宪法AI'),
  E('cai', 'selfrw', '更彻底：AI反馈→自我奖励'),
  E('instruct', 'dpo', '简化：闭式化去RM去RL', '6'),
  E('dpo', 'ipo', '修正：过优化病（有界目标）'),
  E('dpo', 'kto', '放宽：成对→单标签（前景理论）'),
  E('dpo', 'orpo', '简化：去参考+单阶段'),
  E('dpo', 'simpo', '简化：去参考+长度归一'),
  E('ppo', 'dsm', '简化：去critic（组相对优势GRPO）'),
  E('dsm', 'r1', '扩展：数学→通用推理+规则奖励'),
  E('bon', 'raft', '推理筛选→训练闭环'),
  E('instruct', 'bon', '轻量替代：采样+筛选', '5', 'bottom', 'top'),
]);

// ═══ 线5 MoE ═══
canvas('线5-MoE族谱', [
  TITLE('线5 · MoE族谱', '一条路由演进线：稀疏门控→Transformer化→极简→开源→专业化'),
  P('shazeer', md(PO + 'Outrageously Large Neural Networks- The Sparsely-Gated Mixture-of-Experts Layer（稀疏MoE）'), 0, 0),
  P('gshard', md(M + 'GShard- Scaling Giant Models with Conditional Computation and Automatic Sharding（GShard）'), 1, 0),
  P('switch', md(M + 'Switch Transformers- Scaling to Trillion Parameter Models with Simple and Efficient Spars（Switch）'), 2, 0),
  P('glam', md(M + 'GLaM- Efficient Scaling of Language Models with Mixture-of-Experts（GLaM）'), 3, 0),
  P('ec', md(M + 'Mixture-of-Experts with Expert Choice Routing（Expert Choice）'), 2, 1),
  P('softmoe', md(M + 'From Sparse to Soft Mixtures of Experts（Soft MoE）'), 3, 1),
  P('mixtral', md(M + 'Mixtral of Experts（Mixtral）'), 4, 0),
  P('dsmoe', md(M + 'DeepSeekMoE- Towards Ultimate Expert Specialization in Mixture-of-Experts Language Model（DeepSeekMoE）'), 5, 0),
], [
  E('shazeer', 'gshard', 'LSTM层→Transformer FFN'),
  E('gshard', 'switch', '简化：top-2→top-1'),
  E('switch', 'glam', '规模化：能耗经济学实证'),
  E('glam', 'mixtral', '闭源→开源时代'),
  E('mixtral', 'dsmoe', '改进：粗粒度→细粒度+共享专家'),
  E('switch', 'ec', '反转：token选→专家选（天然均衡）'),
  E('switch', 'softmoe', '松弛：离散路由→连续可导'),
]);

// ═══ 线6 长上下文 ═══
canvas('线6-长上下文族谱', [
  TITLE('线6 · 长上下文族谱', '两条正交战线：注意力稀疏化（上）与位置编码手术（中）；绿 = 系统级'),
  P('longformer', md(L + 'Longformer- The Long-Document Transformer（Longformer）'), 0, 0),
  P('bigbird', md(L + 'Big Bird- Transformers for Longer Sequences（BigBird）'), 1, 0),
  P('performer', md(L + 'Rethinking Attention with Performers（Performer）'), 2, 0),
  P('ring', md(L + 'Ring Attention with Blockwise Transformers for Near-Infinite Context（Ring Attention）'), 3, 0, '4'),
  P('moba', md(L + 'MoBA- Mixture of Block Attention for Long-Context LLMs（MoBA）'), 4, 0),
  P('nsa', md(L + 'Native Sparse Attention- Hardware-Aligned and Natively Trainable Sparse Attention（NSA）'), 5, 0),
  P('pi', md(L + 'Extending Context Window of Large Language Models via Positional Interpolation（PI）'), 3, 1),
  P('yarn', md(L + 'YaRN- Efficient Context Window Extension of Large Language Models（YaRN）'), 4, 1),
  P('stream', md(L + 'Efficient Streaming Language Models with Attention Sinks（StreamingLLM）'), 3, 2),
  P('infini', md(L + 'Leave No Context Behind- Efficient Infinite Context Transformers with Infini-attention（Infini-attention）'), 4, 2),
], [
  E('longformer', 'bigbird', '工程直觉→理论保证（图灵完备）'),
  E('bigbird', 'performer', '稀疏（精确）→核近似（O(n)）'),
  E('performer', 'moba', '演进：随机近似→学习式块路由（2025）', undefined, 'bottom', 'top'),
  E('moba', 'nsa', '同期双雄：块路由→三分支原生稀疏'),
  E('pi', 'yarn', '改进：均匀压缩→频率谱+温度修正', '6'),
  E('stream', 'infini', '平行：保sink原始→压成参数记忆'),
]);

// ═══ 线7 推理模型 ═══
canvas('线7-推理模型族谱', [
  TITLE('线7 · 推理模型族谱', '提示工程（上）→ 自举训练（中）→ RL涌现+测试时缩放（下）'),
  P('cot', md(RE + 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models（CoT）'), 0, 0),
  P('selfcon', md(RE + 'Self-Consistency Improves Chain of Thought Reasoning in Language Models（Self-Consistency）'), 1, 0),
  P('tot', md(RE + 'Tree of Thoughts- Deliberate Problem Solving with Large Language Models（ToT）'), 2, 0),
  P('l2m', md(RE + 'Least-to-Most Prompting Enables Complex Reasoning in Large Language Models（Least-to-Most）'), 0, 1),
  P('react', md(RE + 'ReAct- Synergizing Reasoning and Acting in Language Models（ReAct）'), 1, 1),
  P('star', md(RE + 'STaR- Bootstrapping Reasoning With Reasoning（STaR）'), 2, 1),
  P('prm', md(RE + "Let's Verify Step by Step（PRM）"), 0, 2),
  P('r1', md(R + 'DeepSeek-R1- Incentivizing Reasoning Capability in LLMs via Reinforcement Learning（R1）'), 1, 2),
  P('s1', md(RE + 's1- Simple test-time scaling（s1）'), 2, 2),
  P('ttc', md(RE + 'Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Param（Test-Time Compute）'), 3, 2, '4'),
], [
  E('cot', 'selfcon', '增强：单链→多链投票（边缘化）'),
  E('cot', 'tot', '扩展：链→树（搜索化）'),
  E('cot', 'l2m', '扩展：步骤→结构化分解'),
  E('cot', 'react', '扩展：推理→+行动（Agent范式）'),
  E('cot', 'star', '内化：提示→自举进权重'),
  E('star', 'r1', '极限化：数据筛选→纯RL涌现'),
  E('prm', 'r1', '路线对照：过程奖励→规则结果奖励', '6'),
  E('r1', 's1', '对照：纯RL→1k数据SFT'),
  E('s1', 'ttc', '工程配方→定量科学', '4'),
]);

// ═══ 线8 多模态 ═══
canvas('线8-多模态族谱', [
  TITLE('线8 · 多模态族谱', '对齐预训练（左）→ VLM三代（中）→ 视频/统一模态（右）'),
  P('clip', md(V + 'Learning Transferable Visual Models From Natural Language Supervision（CLIP）'), 0, 0),
  P('align', md(V + 'Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision（ALIGN）'), 1, 0),
  P('lit', md(V + 'LiT- Zero-Shot Transfer with Locked-image text Tuning（LiT）'), 2, 0),
  P('flamingo', md(V + 'Flamingo- a Visual Language Model for Few-Shot Learning（Flamingo）'), 3, 0),
  P('blip2', md(V + 'BLIP-2- Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Lan（BLIP-2）'), 4, 0),
  P('llava', md(V + 'Visual Instruction Tuning（LLaVA）'), 5, 0),
  P('minigpt', md(V + 'MiniGPT-4- Enhancing Vision-Language Understanding with Advanced Large Language Models（MiniGPT-4）'), 4, 1),
  P('whisper', md(V + 'Robust Speech Recognition via Large-Scale Weak Supervision（Whisper）'), 0, 1),
  P('videopoet', md(V + 'VideoPoet- A Large Language Model for Zero-Shot Video Generation（VideoPoet）'), 3, 2),
  P('sora', md(V + 'Sora 技术报告- Video Generation Models as World Simulators（Sora）'), 4, 2),
  P('chameleon', md(V + 'Chameleon- Mixed-Modal Early-Fusion Foundation Models（Chameleon）'), 5, 2),
], [
  E('clip', 'align', '平行互证：噪声规模路线'),
  E('clip', 'lit', '消融：双塔同训→锁定视觉塔'),
  E('clip', 'flamingo', '复用：CLIP当视觉编码器'),
  E('flamingo', 'blip2', '改进：插层→Q-Former桥'),
  E('blip2', 'llava', '简化：复杂桥→线性投影'),
  E('blip2', 'minigpt', '复用：Q-Former+两阶段策略'),
  E('videopoet', 'sora', '路线之争：自回归vs扩散（2024）', '6'),
  E('llava', 'chameleon', '路线对照：晚融合→早融合统一token', '6'),
]);

// ═══ 线9 世界模型 ═══
canvas('线9-世界模型族谱', [
  TITLE('线9 · 世界模型族谱', '三路线并行：重建式（Dreamer）· 预测式（JEPA）· 生成式（Genie/Sora）'),
  P('wm', md(WM + 'World Models（世界模型）'), 0, 0),
  P('dreamer', md(WM + 'Dream to Control- Learning Behaviors by Latent Imagination（Dreamer）'), 1, 0),
  P('dreamerv3', md(WM + 'Mastering Diverse Domains through World Models（DreamerV3）'), 2, 0),
  P('vjepa', md(WM + 'Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA）'), 0, 1, '5'),
  P('vjepa2', md(WM + 'V-JEPA 2- Self-Supervised Video Models Enable Understanding, Prediction and Planning（V-JEPA 2）'), 1, 1, '5'),
  P('genie', md(WM + 'Genie- Generative Interactive Environments（Genie）'), 3, 1),
  P('genie2', md(WM + 'Genie 2- A Large-Scale Foundation World Model（Genie 2）'), 4, 1),
  T('routes', '**三路线对照表**\n- 重建式：像素/潜变量重建（Dreamer系）\n- 预测式：表征空间预测，拒绝生成（JEPA/LeCun）\n- 生成式：完整可交互世界（Genie/Sora）\n2025-26 最大争论：视频生成=世界模拟器？', 2, 2, '3', 560, 220),
], [
  E('wm', 'dreamer', '概念→潜空间RL实用化'),
  E('dreamer', 'dreamerv3', '跨域稳定+规模化（Minecraft钻石）'),
  E('vjepa', 'vjepa2', '理解→预测+规划（机器人零样本）', '5'),
  E('genie', 'genie2', '2D动作发现→3D世界生成'),
  E('dreamerv3', 'routes', '', '3', 'bottom', 'top'),
]);

// ═══ 总图 ═══
canvas('总图-知识网络全景', [
  TITLE('总图 · AI 算法发展总体方向（跨线全景）', '这一张回答"AI 算法整体怎么走到今天、往哪去"：绿色 = 缩放定律时间轴；青色 = 九条线的算法枢纽；紫边 = 统一/对偶关系。各线内部细部见 9 张分图'),
  P('gpt3', md(A + 'Language Models are Few-Shot Learners（GPT-3）'), 1, 0, '4'),
  P('laws', md(A + 'Scaling Laws for Neural Language Models（Scaling Laws）'), 2, 0, '4'),
  P('chinchilla', md(AN + 'Training Compute-Optimal Large Language Models（Chinchilla）'), 3, 0, '4'),
  P('gpt4', md(AN + 'GPT-4 Technical Report（GPT-4）'), 4, 0, '4'),
  P('tf', md(AL + 'Transformer'), 1, 1, '5'),
  P('gan', md(AL + '生成对抗网络'), 0, 2, '5'),
  P('diff', md(AL + '扩散模型'), 2, 2, '5'),
  P('fm', md(AL + '流匹配'), 3, 2, '5'),
  P('cm', md(AL + '一致性模型'), 4, 2, '5'),
  P('rlhf', md(AL + 'RLHF'), 1, 3, '5'),
  P('dpo', md(AL + 'DPO系（离线偏好优化）'), 2, 3, '5'),
  P('grpo', md(AL + 'GRPO与RLVR'), 3, 3, '5'),
  P('ssm', md(AL + 'SSM序列架构（Mamba系）'), 0, 4, '5'),
  P('moe', md(AL + '混合专家（MoE）'), 1, 4, '5'),
  P('peft', md(AL + '参数高效微调（PEFT）'), 2, 4, '5'),
  P('wmodel', md(AL + '世界模型'), 3, 4, '5'),
], [
  E('gpt3', 'laws', '实证→规律', '4'),
  E('laws', 'chinchilla', '修正（数据权重×3）', '4'),
  E('chinchilla', 'gpt4', '最优配比→工程巅峰', '4'),
  E('tf', 'rlhf', 'LLM即策略'),
  E('rlhf', 'dpo', '闭式化（离线路线）', '6'),
  E('rlhf', 'grpo', '在线路线（去critic）'),
  E('tf', 'diff', '骨干+cross-attn条件注入'),
  E('gan', 'diff', '路线竞争：被扩散反超'),
  E('diff', 'fm', '≡ 同族统一（换参数化）', '6'),
  E('diff', 'cm', '少步加速（蒸馏线）'),
  E('tf', 'ssm', '复杂度挑战→SSD对偶统一', '6'),
  E('tf', 'moe', 'FFN稀疏化'),
  E('tf', 'peft', '冻结主干+轻适配'),
  E('diff', 'wmodel', '生成式世界模型（Sora/Genie）'),
  E('fm', 'wmodel', 'JEPA之外的主流生成骨干', '5'),
]);

console.log(missing.length ? `\n⚠ ${missing.length} 个文件路径不存在：\n` + missing.join('\n') : '\n全部文件路径校验通过 ✓');

// ===== B21 新增：研究矩阵全景 Canvas（格=节点，含占位状态） =====
canvas('矩阵-机会格全景', [
  T('title', '# 研究矩阵全景（12 矩阵 · 机会格战况 2026-08-19）\n\n🔴 已占死 | 🚩 部分占/竞争中 | 🌱 存活\n敌情终复查报告见 [[00-Meta/敌情终复查报告]]', 0, 0, 1, 1200, 200),
  // 行1：生成侧
  T('m_acc', '**生成模型加速矩阵**\n\n🔴 视频×FM（AnyFlow封顶）\n🔴 流×离散（FS-DFM）\n🌱 **格③ FM×矩匹配×蒸馏**（唯一头部存活，三面被围）', 0, 1, 2, 560, 240),
  T('m_paradigm', '**生成建模范式矩阵**\n\n🔴 流×离散码本\n范式统一线持续活跃（Generator Matching）', 1, 1, 2, 560, 240),
  T('m_distill', '**蒸馏域矩阵**\n\n🔴 OPD 主格（五连占）\n🔴 混合奖励格（G-OPD等五连）\nOPD×FM 新前线（Any-OPD/OPTD）', 2, 1, 2, 560, 240),
  // 行2：RL 侧
  T('m_rl', '**RL 稳定化矩阵**\n\n🔴 PRM×GRPO（GRPO-PRM 证明隐式PRM）\n🚩 序列级×理论（LF-clip 部分）\nDAPO/Dr.GRPO 偏置修正已占', 0, 2, 2, 560, 240),
  T('m_pref', '**偏好优化矩阵**\n\n🚩 自我奖励×无参考（PSR 半占）\n去RL化趋势终点：无参考无奖励无对', 1, 2, 2, 560, 240),
  T('m_reason', '**推理增强矩阵**\n\n🔴 测试时标度律（PSL 可证版 NeurIPS25）\n🔴 PRM×GRPO 合围\n分解-聚合母题贯穿', 2, 2, 2, 560, 240),
  // 行3：系统侧
  T('m_arch', '**序列架构演进矩阵**\n\n🌱 线性注意力×缩放律（升温中）\n🔴 IO感知（DeltaNet并行）\n混合配方=生产标配（Kimi Linear/Qwen3-Next）', 0, 3, 2, 560, 240),
  T('m_compress', '**模型压缩矩阵**\n\n🚩 KV×量化（KIVI/KVQuant/InfoKV 五连）\n量化×预训练介入度（BitNet）', 1, 3, 2, 560, 240),
  T('m_long', '**长上下文机制矩阵**\n\n外推管线收束（YaRN 终点）\n率失真统一语言未做（分析型机会）', 2, 3, 2, 560, 240),
  // 行4：结构/应用侧
  T('m_moe', '**MoE 路由矩阵**\n\n🔴 去偏路由（DeepSeek bias 法生产验证）\n粒度轴：token→专家→块', 0, 4, 2, 560, 240),
  T('m_mm', '**多模态对齐矩阵**\n\n🚩 JEPA×生成头（VL-JEPA 近邻已踩）\n视频=交叉热点坐标', 1, 4, 2, 560, 240),
  T('m_world', '**世界模型矩阵**\n\n🔴 潜动作 7 连占（3R2D→FLAM/SWIRL）\n🔴 接口可辨识性理论侧被填\n评测独立成域（WorldExam）', 2, 4, 2, 560, 240),
  // 底部：共振思想与死格档案
  T('insight', '**跨线共振思想（idea 土壤）**\n\n1. 聚合替代锚定（MeanFlow/GSPO/Self-Consistency/OPD自锚——五线开花）\n2. 判别-生成对偶（CLIP↔生成对齐、JEPA↔像素）\n3. 软硬对偶（裁剪↔软门控、TopK↔SoftMoE）\n4. 粒度轴（token→序列→组→步）', 0, 5, 2, 1200, 220),
  T('dead', '**死格档案（防重复踩坑）**\n\n🚫 SSM×KV压缩（结构死格）\n🚫 对比×早期融合（目标不匹配）\n😴 纯提示×链、卷积×长依赖\n⚠️ 隐式×像素（大厂重器格）', 2, 5, 2, 560, 220),
], [
  E('m_acc', 'm_distill', '蒸馏脊（#loss/distillation）', '3'),
  E('m_distill', 'm_rl', 'OPD = RL 换锚（G-OPD 证明）', '3'),
  E('m_rl', 'm_reason', 'PRM×GRPO 公共格', '3'),
  E('m_pref', 'm_rl', '去RL化 vs 在线化对偶', '3'),
  E('m_arch', 'm_long', '线性显存共同目标', '3'),
  E('m_compress', 'm_long', 'KV 行共享', '3'),
  E('m_moe', 'm_mm', '注意力=专家类比', '3'),
  E('m_world', 'm_mm', '判别-生成对偶汇', '3'),
  E('m_world', 'm_reason', '世界模型=推理链类比', '3'),
  E('m_paradigm', 'm_acc', '存在→效率分工', '3'),
]);
