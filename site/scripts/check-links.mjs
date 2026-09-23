// check-links.mjs — 产物级链接验证：扫描 site/dist 全部 HTML 的内部 href，
// 验证每个链接目标文件存在（模拟 GitHub Pages 真实 404）。
// 背景（260923 事故）：正文链接漏 /ai-fa/ 前缀，几千条链接线上全 404——
// push 前只验了页面路由 200，没人扫过 HTML 内部链接。此脚本进验证链：build 后必跑。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const BASE = '/ai-fa/';   // 与 astro.config.mjs / prepare-content.mjs 同步

if (!fs.existsSync(DIST)) { console.error('dist 不存在，先 npm run build'); process.exit(1); }

const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(DIST);

// URL → dist 内文件路径；返回 null = 该 href 不归本脚本管（外链/锚点/资源）
function targetOf(href, page) {
  // 先解 HTML 实体再切 fragment——顺序不能反：&#38;（&）里的 # 会被 split('#') 从中间切断
  let h = href.replace(/&#38;|&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  h = h.split('#')[0].split('?')[0];
  if (!h || h.startsWith('http') || h.startsWith('mailto:') || h.startsWith('data:')) return null;
  let file;
  try { h = decodeURIComponent(h); } catch {}                                  // 中文/全角括号 URL 编码 → 原名
  if (h.startsWith(BASE)) file = path.join(DIST, h.slice(BASE.length));        // 站内绝对（带 base）
  else if (h.startsWith('/')) file = path.join(DIST, h.slice(1));              // 站根绝对（noBase 检查管）
  else file = path.join(path.dirname(page), h);                                // 相对路径
  file = path.normalize(file);
  // 目录 URL → index.html
  if (/\/$/.test(h) || !/\.html?$/.test(path.basename(file))) {
    const asIndex = path.join(file, 'index.html');
    const asHtml = file + '.html';
    if (fs.existsSync(asIndex)) return asIndex;
    if (fs.existsSync(asHtml)) return asHtml;
    return file;   // 不存在，留给存在性检查报错
  }
  return file;
}

let checked = 0, dead = [], noBase = [];
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const rel = path.relative(DIST, page).split(path.sep).join('/');
  // <a href> 全量（含 island 序列化 props 里的 —— Astro islands 的 props 以 &quot; 形式嵌 href）
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    if (h.startsWith('/') && !h.startsWith(BASE) && !/\.(css|js|png|svg|ico|txt|json|webmanifest|xml|map|woff2?)$/i.test(h)) {
      noBase.push(`${rel} → ${h}`);
    }
    const t = targetOf(h, page);
    if (t === null) continue;
    checked++;
    if (!fs.existsSync(t)) dead.push(`${rel} → ${h}`);
  }
}

console.log(`扫描 ${pages.length} 页 · 内部链接 ${checked} 条`);
if (noBase.length) {
  console.log(`\n⚠️ 疑似缺 ${BASE} 前缀的站根链接 ${noBase.length} 条（前 10）：`);
  noBase.slice(0, 10).forEach(x => console.log('  ' + x));
}
if (dead.length) {
  console.log(`\n❌ 死链 ${dead.length} 条（前 20）：`);
  dead.slice(0, 20).forEach(x => console.log('  ' + x));
  process.exit(1);
}
console.log(noBase.length ? '（存在缺前缀链接，人工确认）' : '✓ 死链 0 · 前缀一致');
