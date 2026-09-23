// prepare-content.mjs — 发布内容 → site/src/content/docs 的确定性转换 + 自产 contentIndex.json
// 职责：①收集全部 md 建 slug 索引 ②wikilink → /explore/<slug> 站内链接（代码段保护）
//       ③未解析目标/媒体引用 → 行内代码保真 ④frontmatter 原样保留
//       ⑤【260923 部署切换】自产 contentIndex.json（slug/filePath/title/links/tags/content）——
//         摆脱 Quartz 构建依赖（图谱引擎+搜索框的唯一数据源）
// 内容源自适应：本地=库根/dist（白名单副本）；CI=repo 根（10-Papers 直接在上上级目录）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
// 内容源（260923 事故加固：本地库根含 70-Ideas/80-Lessons/B报告等私有区，禁止直接作源——
// 曾因"库根优先"探测把 1879 篇全库灌进 docs，若 build+push 即私有泄漏大事故）：
//   CI（repo 根）＝白名单内容直接在根，无 dist/ 目录、无私有区标志；
//   本地（vault 根）＝必须用 dist 白名单副本，dist 缺失则 fail-closed 报错（先跑 bash tools/publish.sh）。
const isLocalVault = fs.existsSync(path.join(UP, '70-Ideas')) || fs.existsSync(path.join(UP, '00-Meta', 'daily'));
const SRC = isLocalVault
  ? (fs.existsSync(path.join(UP, 'dist', '10-Papers')) ? path.join(UP, 'dist') : null)
  : (fs.existsSync(path.join(UP, '10-Papers')) ? UP : null);
const DST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'docs');
const IDX_OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'static', 'contentIndex.json');

if (!SRC) { console.error(isLocalVault ? '本地模式：dist 白名单副本缺失——先跑 bash tools/publish.sh 再构建（禁止直接用库根，含私有区）' : 'CI 模式：repo 根缺 10-Papers，检查仓库结构'); process.exit(1); }
console.log('内容源:', SRC);

// 1. 收集
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    if (f === 'site' || f === 'node_modules' || f === 'quartz-patch' || f === '.github' || f === 'tools') continue;
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.md')) files.push(p);
  }
})(SRC);

const byBase = new Map();
const slugOf = new Map();
for (const p of files) {
  const rel = path.relative(SRC, p).split(path.sep).join('/').replace(/\.md$/, '');
  if (rel === 'README' || rel === 'index' || rel === 'LICENSE-CONTENT' || rel === 'LICENSE-CODE') continue;
  slugOf.set(p, rel);
  const base = rel.split('/').pop();
  if (!byBase.has(base)) byBase.set(base, rel);
}
const allSlugs = [...slugOf.values()];

function resolve(t) {
  if (byBase.has(t)) return byBase.get(t);
  if (t.includes('/')) {
    const hit = allSlugs.find(s => s === t || s.endsWith('/' + t));
    if (hit) return hit;
  }
  return null;
}

// 标题提取
const titleCache = new Map();
function titleOf(slug) {
  if (titleCache.has(slug)) return titleCache.get(slug);
  const p = path.join(SRC, slug + '.md');
  let t = slug.split('/').pop();
  try { const m = fs.readFileSync(p, 'utf8').match(/^title:\s*["']?(.+?)["']?\s*$/m); if (m) t = m[1]; } catch {}
  titleCache.set(slug, t);
  return t;
}

// 2. 转换（按 ``` 分段，只处理非代码段）
// BASE：必须与 astro.config.mjs 的 base 保持同步——260923 事故：正文链接漏 /ai-fa/ 前缀，
// Astro base 只作用于框架自身生成的链接，md 手写链接原样输出 → 线上正文链接全 404
const BASE = '/ai-fa/';
const WIKI = /\[\[([^\]|#]+)(#[^\]|]*)?(?:\|([^\]]*))?\]\]/g;
// 行内公式 → 块级（260916 用户令：公式单行显示——段落内 $$ 化；复杂度分流由 remark 插件做）
const INLINE_MATH = /(^|[^$])\$(?!\$)((?:[^$\n]|\$\$)+?)\$(?!\$)/g;
const converted = new Map();   // slug → 转换后文本（contentIndex 的 content 供搜索/面板用原文）
function convert(text) {
  const segs = text.split(/(```[\s\S]*?```)/g);
  return segs.map((seg, i) => {
    if (i % 2 === 1) return seg;
    let s = seg.replace(WIKI, (m, rawT, anchor, alias) => {
      const t = String(rawT).replace(/\s+$/, '').trim();
      if (!t || /^(https?:|#)/.test(t)) return m;
      if (/\.(png|jpe?g|gif|webp|svg|avif|ico|mp4|webm|mov|canvas|pdf)$/i.test(t)) {
        return '`' + (alias || t.split('/').pop()) + '`';
      }
      const slug = resolve(t);
      if (!slug) return '`' + (alias || t) + '`';
      const label = alias || titleOf(slug);
      return `[${label}](${BASE}explore/${slug}${anchor || ''})`;
    });
    s = s.replace(INLINE_MATH, (m, pre, body) => pre + '$$' + body + '$$');
    return s;
  }).join('');
}

// 3. 输出 md + 收集 contentIndex 数据
let n = 0, linked = 0, unresolved = 0;
fs.rmSync(DST, { recursive: true, force: true });
const index = {};
for (const [p, slug] of slugOf) {
  const out = path.join(DST, slug + '.md');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const text = fs.readFileSync(p, 'utf8');
  const before = (text.match(/\[\[/g) || []).length;
  const conv = convert(text);
  const after = (conv.match(/\[\[/g) || []).length;
  linked += before - after; unresolved += after;
  fs.writeFileSync(out, conv, 'utf8');
  converted.set(slug, conv);
  n++;
}

// contentIndex：links 用站内有效 wikilink 目标（原始 slug 体系）；content=速览块（搜索+图谱面板摘要）
const fmGet = (t, k) => { const m = t.match(new RegExp('^' + k + ':\\s*(.+)$', 'm')); return m ? m[1].trim() : ''; };
for (const [slug, conv] of converted) {
  const raw = fs.readFileSync(path.join(SRC, slug + '.md'), 'utf8');
  const links = [];
  const seen = new Set();
  let mm; WIKI.lastIndex = 0;
  const segs = raw.split(/(```[\s\S]*?```)/g);
  for (let i = 0; i < segs.length; i += 2) {
    while ((mm = WIKI.exec(segs[i]))) {
      const t = mm[1].replace(/[\s\\]+$/, '').trim();
      if (!t || /^(https?:|#)/.test(t)) continue;
      if (/\.(mp4|webm|mov|png|jpe?g|gif|webp|svg|ico|avif|pdf|canvas)$/i.test(t)) continue;
      const r = resolve(t);
      if (r && r !== slug && !seen.has(r)) { seen.add(r); links.push(r); }
    }
  }
  const tagsRaw = fmGet(raw, 'tags');
  const tags = tagsRaw ? tagsRaw.replace(/[\[\]]/g, '').split(',').map(x => x.trim()).filter(Boolean) : [];
  const zhao = (conv.match(/>\s*\*\*中文速览\*\*[^\n]*\n([^\n]+)/) || [])[1] || '';
  // links 必须从 raw 提取——260923 连线消失根因：conv 里 wikilink 已被转成 markdown 链接，
  // 扫 conv 永远空 → 图谱/搜索入度全瞎（Quartz 时代数据是 Quartz 生成的所以旧版有边）
  index[slug] = {
    slug,
    filePath: slug + '.md',
    title: titleOf(slug),
    links,
    tags,
    content: zhao.slice(0, 600),
  };
}
fs.mkdirSync(path.dirname(IDX_OUT), { recursive: true });
fs.writeFileSync(IDX_OUT, JSON.stringify(index), 'utf8');
console.log(`内容管道：${n} 篇 → ${path.relative(UP, DST)}｜wikilink 转链 ${linked}，代码块内保留 ${unresolved}`);
console.log(`contentIndex 自产：${Object.keys(index).length} 条 → ${path.relative(UP, IDX_OUT)}（Quartz 依赖已解除）`);
