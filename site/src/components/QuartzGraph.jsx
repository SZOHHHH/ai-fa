// QuartzGraph.jsx — Quartz 图谱引擎源码级移植（260916，用户令：替换 Cytoscape 版）
// 引擎=d3-force 仿真 + pixi.js WebGL 渲染 + tween 补间（移植自 .quartz-site/quartz/components/scripts/graph.inline.ts）
// 适配：数据=site 的 contentIndex（原始 slug 体系）；配色=ai-fa 出版 tokens；跳转=/explore/<slug>；全图模式
import React, { useEffect, useRef, useState } from 'react';
import { forceSimulation, forceManyBody, forceCenter, forceLink, forceCollide, select, drag, zoom, zoomIdentity } from 'd3';
import { Text, Graphics, Application, Container, Circle } from 'pixi.js';
import { Group as TweenGroup, Tween as Tweened } from '@tweenjs/tween.js';

const VISITED_KEY = 'ai-fa-graph-visited';
const getVisited = () => { try { return new Set(JSON.parse(localStorage.getItem(VISITED_KEY) ?? '[]')); } catch { return new Set(); } };

// 配置（对齐 Quartz 默认手感，全图模式微调斥力）
const CFG = { repelForce: 1.1, centerForce: 1, linkDistance: 30, fontSize: 0.5, opacityScale: 1, scale: 1.1, focusOnHover: true };

// 出版 tokens → Quartz 观感的颜色映射（浅色纸面上）
const INK = '#1a1a19', MUTED = '#898781', HAIR = '#e1e0d9', BLUE = '#104281', TEAL = '#1baf7a';
const FONT = '"Noto Serif SC","Source Han Serif SC","Songti SC","SimSun",serif';

export default function QuartzGraph({ onStats }) {
  const ref = useRef(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cleanup = null;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}static/contentIndex.json`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const index = await res.json();
        if (cancelled) return;

        // ── 数据（原始 slug；站内有效边；无 tags 虚拟节点）──
        const ids = new Set(Object.keys(index));
        const nodes = [...ids].map(id => ({ id, text: index[id].title || id.split('/').pop(),
          href: (index[id].filePath || id + '.md').replace(/\.md$/, '') }));   // 跳转用原始路径（Quartz slug 与 Astro 路由不同体系）
        const byId = new Map(nodes.map(n => [n.id, n]));
        const links = [];
        const degree = new Map();
        for (const [src, e] of Object.entries(index)) {
          for (const t of e.links || []) {
            if (t !== src && ids.has(t)) { links.push({ source: src, target: t }); degree.set(t, (degree.get(t) || 0) + 1); }
          }
        }
        const graphData = { nodes, links: links.map(l => ({ source: byId.get(l.source), target: byId.get(l.target) })) };
        if (onStats) onStats(nodes.length, links.length);

        const graph = ref.current;
        const width = graph.offsetWidth, height = Math.max(graph.offsetHeight, 400);
        const visited = getVisited();

        // ── d3-force 仿真（同参数族）──
        const nodeRadius = (n) => 2 + Math.sqrt(degree.get(n.id) || 0);
        const simulation = forceSimulation(nodes)
          .force('charge', forceManyBody().strength(-100 * CFG.repelForce))
          .force('center', forceCenter().strength(CFG.centerForce))
          .force('link', forceLink(graphData.links).distance(CFG.linkDistance))
          .force('collide', forceCollide(nodeRadius).iterations(3));

        const color = (d) => visited.has(d.id) ? TEAL : MUTED;

        let hoveredNodeId = null, hoveredNeighbours = new Set();
        const linkRenderData = [], nodeRenderData = [];
        function updateHoverInfo(id) {
          hoveredNodeId = id;
          if (id === null) {
            hoveredNeighbours = new Set();
            nodeRenderData.forEach(n => { n.active = false; });
            linkRenderData.forEach(l => { l.active = false; });
          } else {
            hoveredNeighbours = new Set();
            for (const l of linkRenderData) {
              const ld = l.simulationData;
              if (ld.source.id === id || ld.target.id === id) { hoveredNeighbours.add(ld.source.id); hoveredNeighbours.add(ld.target.id); }
              l.active = ld.source.id === id || ld.target.id === id;
            }
            for (const n of nodeRenderData) n.active = hoveredNeighbours.has(n.simulationData.id);
          }
        }

        const tweens = new Map();
        function renderNodes() {
          tweens.get('hover')?.stop();
          const g = new TweenGroup();
          for (const n of nodeRenderData) {
            const alpha = hoveredNodeId !== null && CFG.focusOnHover ? (n.active ? 1 : 0.2) : 1;
            g.add(new Tweened(n.gfx, g).to({ alpha }, 200));
          }
          g.getAll().forEach(t => t.start());
          tweens.set('hover', { update: g.update.bind(g), stop() { g.getAll().forEach(t => t.stop()); } });
        }
        function renderLinks() {
          tweens.get('link')?.stop();
          const g = new TweenGroup();
          for (const l of linkRenderData) {
            const alpha = hoveredNodeId ? (l.active ? 1 : 0.2) : 1;
            l.color = l.active ? MUTED : HAIR;
            g.add(new Tweened(l).to({ alpha }, 200));
          }
          g.getAll().forEach(t => t.start());
          tweens.set('link', { update: g.update.bind(g), stop() { g.getAll().forEach(t => t.stop()); } });
        }
        function renderLabels() {
          tweens.get('label')?.stop();
          const g = new TweenGroup();
          const ds = 1 / CFG.scale, as = ds * 1.1;
          for (const n of nodeRenderData) {
            if (hoveredNodeId === n.simulationData.id) g.add(new Tweened(n.label).to({ alpha: 1, scale: { x: as, y: as } }, 100));
            else g.add(new Tweened(n.label).to({ scale: { x: ds, y: ds } }, 100));
          }
          g.getAll().forEach(t => t.start());
          tweens.set('label', { update: g.update.bind(g), stop() { g.getAll().forEach(t => t.stop()); } });
        }
        const renderPixi = () => { renderNodes(); renderLinks(); renderLabels(); };

        // ── pixi 渲染 ──
        const app = new Application();
        await app.init({ width, height, antialias: true, autoStart: false, autoDensity: true, backgroundAlpha: 0,
          preference: 'webgl', resolution: window.devicePixelRatio, eventMode: 'static' });
        if (cancelled) { app.destroy(); return; }
        graph.appendChild(app.canvas);

        const labelsC = new Container({ zIndex: 3, isRenderGroup: true });
        const nodesC = new Container({ zIndex: 2, isRenderGroup: true });
        const linkC = new Container({ zIndex: 1, isRenderGroup: true });
        app.stage.addChild(nodesC, labelsC, linkC);

        let dragStartTime = 0, dragging = false;

        for (const n of graphData.nodes) {
          const label = new Text({
            interactive: false, eventMode: 'none', text: n.text,
            alpha: Math.max((CFG.scale * CFG.opacityScale - 1) / 3.75, 0),
            anchor: { x: 0.5, y: 1.2 },
            style: { fontSize: CFG.fontSize * 15, fill: INK, fontFamily: FONT },
            resolution: window.devicePixelRatio * 4,
          });
          label.scale.set(1 / CFG.scale);
          let oldLabelAlpha = 0;
          const gfx = new Graphics({ interactive: true, label: n.id, eventMode: 'static', hitArea: new Circle(0, 0, nodeRadius(n)), cursor: 'pointer' })
            .circle(0, 0, nodeRadius(n)).fill({ color: color(n) })
            .on('pointerover', (e) => {
              updateHoverInfo(e.target.label); oldLabelAlpha = label.alpha;
              if (!dragging) renderPixi();
            })
            .on('pointerleave', () => {
              updateHoverInfo(null); label.alpha = oldLabelAlpha;
              if (!dragging) renderPixi();
            });
          nodesC.addChild(gfx); labelsC.addChild(label);
          nodeRenderData.push({ simulationData: n, gfx, label, color: color(n), alpha: 1, active: false });
        }
        for (const l of graphData.links) {
          const gfx = new Graphics({ interactive: false, eventMode: 'none' });
          linkC.addChild(gfx);
          linkRenderData.push({ simulationData: l, gfx, color: HAIR, alpha: 1, active: false });
        }

        // ── 拖拽 + 点击跳转 ──
        let currentTransform = zoomIdentity;
        select(app.canvas).call(
          drag().container(() => app.canvas)
            .subject(() => graphData.nodes.find(n => n.id === hoveredNodeId))
            .on('start', (event) => {
              if (!event.subject) return;
              if (!event.active) simulation.alphaTarget(1).restart();
              event.subject.fx = event.subject.x; event.subject.fy = event.subject.y;
              event.subject.__p0 = { x: event.subject.x, y: event.subject.y };
              dragStartTime = Date.now(); dragging = true;
            })
            .on('drag', (event) => {
              if (!event.subject) return;
              event.subject.fx = event.subject.__p0.x + (event.x - event.subject.__p0.x) / currentTransform.k;
              event.subject.fy = event.subject.__p0.y + (event.y - event.subject.__p0.y) / currentTransform.k;
            })
            .on('end', (event) => {
              if (!event.subject) return;
              if (!event.active) simulation.alphaTarget(0);
              event.subject.fx = null; event.subject.fy = null; dragging = false;
              if (Date.now() - dragStartTime < 500) window.location.href = `${import.meta.env.BASE_URL}explore/` + (event.subject.href || event.subject.id);
            })
        );
        select(app.canvas).call(
          zoom().extent([[0, 0], [width, height]]).scaleExtent([0.25, 4])
            .on('zoom', ({ transform }) => {
              currentTransform = transform;
              app.stage.scale.set(transform.k, transform.k);
              app.stage.position.set(transform.x, transform.y);
              const so = Math.max((transform.k * CFG.opacityScale - 1) / 3.75, 0);
              const activeLabels = nodeRenderData.filter(n => n.active).map(n => n.label);
              for (const label of labelsC.children) if (!activeLabels.includes(label)) label.alpha = so;
            })
        );

        let stop = false;
        function animate(time) {
          if (stop) return;
          for (const n of nodeRenderData) {
            const { x, y } = n.simulationData;
            if (!x || !y) continue;
            n.gfx.position.set(x + width / 2, y + height / 2);
            n.label.position.set(x + width / 2, y + height / 2);
          }
          for (const l of linkRenderData) {
            const ld = l.simulationData;
            l.gfx.clear();
            l.gfx.moveTo(ld.source.x + width / 2, ld.source.y + height / 2);
            l.gfx.lineTo(ld.target.x + width / 2, ld.target.y + height / 2).stroke({ alpha: l.alpha, width: 1, color: l.color });
          }
          tweens.forEach(t => t.update(time));
          app.renderer.render(app.stage);
          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        cleanup = () => { stop = true; tweens.forEach(t => t.stop()); simulation.stop(); app.destroy(true); };
      } catch (e) { if (!cancelled) setErr(String(e)); }
    })();

    return () => { cancelled = true; if (cleanup) cleanup(); };
  }, []);

  if (err) return <div className="qg-boot">图谱加载失败：{err}</div>;
  return <div ref={ref} className="qg-canvas" />;
}
