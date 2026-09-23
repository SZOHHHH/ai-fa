// LocalGraph.jsx — 内容页右下角悬浮局部图谱（260923 用户令恢复：Quartz 时代 B45 悬浮图谱的 v1.0 移植）
// 圆钮常驻右下角 → 点击展开邻域小图：中心=当前卡，邻居=出链∪入链（封顶 36，按度排序）
// 渲染=SVG + d3-force（节点少，无需 WebGL）；配色=类型色点（出版 tokens）+中心墨蓝
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { forceSimulation, forceManyBody, forceLink, forceCollide, forceX, forceY } from 'd3';

const TYPE_COLOR = {
  '10-Papers': 'var(--t-paper)', '20-Algorithms': 'var(--t-algo)', '30-Formulas': 'var(--t-formula)',
  '40-Concepts': 'var(--t-concept)', '60-Matrices': 'var(--t-matrix)', '00-Meta': 'var(--t-meta)',
};
const colorOf = (id) => TYPE_COLOR[id.split('/')[0]] || 'var(--muted)';
const MAX_NB = 36;

export default function LocalGraph({ slug }) {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(null);
  const [index, setIndex] = useState(null);

  // 邻域数据（contentIndex 到手后一次性构建）
  const view = useMemo(() => {
    if (!index || !index[slug]) return null;
    const inLinks = new Map();   // 反向入链索引
    for (const [src, e] of Object.entries(index)) {
      for (const t of e.links || []) {
        if (t !== src) { if (!inLinks.has(t)) inLinks.set(t, []); inLinks.get(t).push(src); }
      }
    }
    const outs = (index[slug].links || []).filter(t => index[t] && t !== slug);
    const ins = (inLinks.get(slug) || []).filter(s => index[s]);
    const deg = new Map();
    const nb = new Map();
    for (const t of outs) { nb.set(t, 'out'); deg.set(t, (deg.get(t) || 0) + 1); }
    for (const s of ins) { nb.set(s, nb.get(s) || 'in'); deg.set(s, (deg.get(s) || 0) + 1); }
    const kept = [...nb.keys()].sort((a, b) => (deg.get(b) || 0) - (deg.get(a) || 0)).slice(0, MAX_NB);
    const nodes = [{ id: slug, center: true }, ...kept.map(id => ({ id }))];
    const set = new Set(kept);
    const links = [];
    for (const t of outs) if (set.has(t)) links.push({ source: slug, target: t });
    for (const s of ins) if (set.has(s)) links.push({ source: s, target: slug });
    // 邻居间互连（邻域内部结构，细边）
    for (const a of kept) for (const t of index[a].links || []) if (set.has(t) && t !== slug) links.push({ source: a, target: t, thin: true });
    return { nodes, links, total: nb.size, title: index[slug].title || slug.split('/').pop() };
  }, [index, slug]);

  useEffect(() => {
    if (!open || index) return;
    fetch(`${import.meta.env.BASE_URL}static/contentIndex.json`).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(setIndex).catch(e => setErr(String(e)));
  }, [open, index]);

  // 无 slug（非内容页），或索引已加载但无此卡（如 00-Meta 导览未发布条目）——不渲染
  if (!slug || (index !== null && index[slug] === undefined)) return null;

  return (
    <>
      <button className="lg-fab" title="本卡邻域图谱" aria-label="本卡邻域图谱" onClick={() => setOpen(o => !o)}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="13" cy="5" r="2.4" /><circle cx="5" cy="20" r="2.4" /><circle cx="21" cy="20" r="2.4" />
          <path d="M11.4 6.8 6.6 17.8M14.6 6.8 19.4 17.8M7.6 20h10.8" />
        </svg>
      </button>
      {open && (
        <div className="lg-panel">
          <div className="lg-head">
            <span className="lg-title">{view ? view.title : '…'}</span>
            {view && view.total > MAX_NB && <span className="lg-more">+{view.total - MAX_NB}</span>}
            <button className="lg-close" onClick={() => setOpen(false)} aria-label="收起">×</button>
          </div>
          <div className="lg-body">
            {err ? <div className="lg-err">加载失败：{err}</div>
              : !view ? <div className="lg-err">构建中…</div>
              : view.nodes.length <= 1 ? <div className="lg-err">此卡暂无站内连接</div>
              : <GraphCanvas view={view} index={index} />}
          </div>
          <div className="lg-foot">点击节点直达 · 中心=本卡</div>
        </div>
      )}
    </>
  );
}

function GraphCanvas({ view, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const W = el.clientWidth || 440, H = el.clientHeight || 330;
    const nodes = view.nodes.map(n => ({ ...n }));
    const links = view.links.map(l => ({ ...l }));
    const sim = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(-120))
      .force('link', forceLink(links).id(d => d.id).distance(d => d.thin ? 34 : 52).strength(d => d.thin ? 0.15 : 0.9))
      .force('collide', forceCollide(9))
      .force('x', forceX(W / 2).strength(0.05))
      .force('y', forceY(H / 2).strength(0.12))
      .stop();

    const svg = el.querySelector('svg');
    const edges = svg.querySelector('.lg-edges'), dots = svg.querySelector('.lg-dots'), labels = svg.querySelector('.lg-labels');
    const mk = (tag, attrs) => { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };

    const idx = new Map(nodes.map(n => [n.id, n]));
    const lineEls = links.map(l => { const e = mk('line', { stroke: '#d8d6cf', 'stroke-width': 1 }); edges.appendChild(e); return { e, l }; });
    const nodeEls = nodes.map(n => {
      const g = mk('g', { style: 'cursor:pointer' });
      g.appendChild(mk('circle', { r: n.center ? 7 : 4, fill: n.center ? '#104281' : colorOf(n.id), stroke: n.center ? '#104281' : 'none' }));
      const t = mk('text', { x: 0, y: -9, 'text-anchor': 'middle', style: 'font-size:11px;font-family:var(--font-fs);fill:#4a4944' });
      t.textContent = (index?.[n.id]?.title || n.id.split('/').pop()).slice(0, 14);
      g.appendChild(t);
      dots.appendChild(g);
      g.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (!n.center) window.location.href = `${import.meta.env.BASE_URL}explore/` + n.id;
      });
      return { g, circle: g.querySelector('circle'), text: t, n };
    });

    sim.on('tick', () => {
      for (const { e, l } of lineEls) {
        e.setAttribute('x1', idx.get(l.source.id).x); e.setAttribute('y1', idx.get(l.source.id).y);
        e.setAttribute('x2', idx.get(l.target.id).x); e.setAttribute('y2', idx.get(l.target.id).y);
      }
      for (const { g, n } of nodeEls) g.setAttribute('transform', `translate(${n.x},${n.y})`);
    });
    sim.restart();
    return () => sim.stop();
  }, [view]);
  return <div ref={ref} className="lg-canvas-wrap"><svg width="100%" height="100%"><g className="lg-edges" /><g className="lg-dots" /><g className="lg-labels" /></svg></div>;
}
