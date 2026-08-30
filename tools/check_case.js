/* 大小写敏感的站内链接检查（B44 事故立法落地）
 * 背景：Quartz slug 保留目录/文件名原始大小写（00-Meta、10-Papers）。Linux CI（GitHub Pages）
 *       大小写敏感；本地 Windows 文件系统不敏感——fs.existsSync 会把 10-papers 误判存在。
 *       因此手写 slug/链接时写错大小写，本地全绿、线上全 404。
 * 方案：逐段 readdirSync 取真实文件名，精确 includes 比对（Windows 上 readdirSync 也返回真实大小写）。
 * 用法: node tools/check_case.js .quartz-site/public
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.argv[2];
if (!ROOT || !fs.existsSync(ROOT)) {
  console.error("用法: node tools/check_case.js <build输出目录，如 .quartz-site/public>");
  process.exit(1);
}

// 大小写敏感的存在性检查（逐段 readdirSync 精确匹配）
function existsExact(p) {
  const abs = path.resolve(ROOT, p);
  let cur = path.resolve(ROOT);
  const parts = path.relative(path.resolve(ROOT), abs).split(/[\\/]/);
  for (const part of parts) {
    let entries;
    try {
      entries = fs.readdirSync(cur);
    } catch {
      return false;
    }
    if (!entries.includes(part)) return false;
    cur = path.join(cur, part);
  }
  return true;
}

// 递归收集 html
function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const abs = path.join(dir, name);
    if (fs.statSync(abs).isDirectory()) walk(abs, out);
    else if (name.endsWith(".html")) out.push(abs);
  }
  return out;
}

const pages = walk(ROOT, []);
const hrefRe = /href="([^"]+)"/g;
let checked = 0;
const bad = [];

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const pageDir = path.dirname(path.relative(ROOT, page));
  let m;
  while ((m = hrefRe.exec(html)) !== null) {
    let href = m[1];
    if (/^(https?:|mailto:|javascript:|#|data:)/.test(href)) continue;
    href = href.split("#")[0].split("?")[0];
    if (!href) continue;
    let target;
    try {
      target = decodeURIComponent(href);
    } catch {
      target = href;
    }
    if (target.endsWith("/")) target += "index.html";
    // 根绝对路径（如 404.html 里的 /ai-fa/...）：strip baseUrl 前缀后按站根解析
    target = target.replace(/^\/ai-fa\/?/, "/");
    if (target.startsWith("/") && !target.startsWith("//")) target = target.slice(1);
    const resolved = path.posix.normalize(path.posix.join(pageDir.split(path.sep).join("/"), target));
    if (resolved.startsWith("../") || resolved === "." || resolved === "") continue; // 站外相对
    checked++;
    // GitHub Pages 规则：无扩展名路径自动尝试 +.html（Quartz 站内链接不带后缀）
    // ⚠️ 不能用 extname 判断——文件名本身可含点（LLM.int8），一律两连试
    const ok = existsExact(resolved) || existsExact(resolved + ".html");
    if (!ok) {
      if (process.env.DBG_CASE) {
        console.log("DBG page:", path.relative(ROOT, page));
        console.log("DBG target:", JSON.stringify(target));
        console.log("DBG resolved:", JSON.stringify(resolved));
        console.log("DBG try1:", existsExact(resolved), "try2:", existsExact(resolved + ".html"));
      }
      bad.push(`${path.relative(ROOT, page)} -> ${href}`);
    }
  }
}

console.log(`检查 ${pages.length} 页 / ${checked} 个站内链接`);
if (bad.length > 0) {
  console.log(`❌ 大小写敏感死链 ${bad.length} 处：`);
  for (const b of bad.slice(0, 30)) console.log("  " + b);
  if (bad.length > 30) console.log(`  …（另有 ${bad.length - 30} 处）`);
  process.exit(1);
} else {
  console.log("✅ 大小写敏感检查通过（0 死链）");
}
