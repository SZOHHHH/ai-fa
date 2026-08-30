import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graphpanel.inline"
// @ts-ignore
import graphScript from "./scripts/graph.inline" // 引擎本体——构建器只打包 layout 中组件的脚本，
// 右栏 Graph 移除后引擎不会自动进包，GraphPanel 必须自带（B45 第三坑）
// @ts-ignore
import graphStyle from "./styles/graph.scss"
import style from "./styles/graphpanel.scss"
import { classNames } from "../util/lang"
import { concatenateResources } from "../util/resources"

// 悬浮图谱面板（B45）：
//  - 右下角 FAB 按钮 → 弹出大尺寸「当前页关系图谱」浮窗（复用 stock graph 引擎：任何
//    .graph-container 都会在 nav 事件时被渲染为当前页邻居图）
//  - 浮窗头部 + 首页大按钮均带 .global-graph-icon → 复用 stock 全屏全库图谱逻辑（Ctrl/⌘+G 同效）
//  - 浮窗用 visibility/opacity 而非 display:none 隐藏——display:none 会让容器 clientWidth=0，
//    d3 在 nav 时渲染成空图（B45 设计要点）
const localCfg = {
  drag: true,
  zoom: true,
  depth: 1,
  scale: 1.2,
  repelForce: 2.0,
  centerForce: 1.0,
  linkDistance: 120,
  fontSize: 0.81, // 用户令：标签缩至原 1.35 的 60%
  opacityScale: 3,
  removeTags: [],
  showTags: false,
  focusOnHover: false,
}

const globalCfg = {
  drag: true,
  zoom: true,
  depth: -1,
  scale: 0.9,
  repelForce: 0.5,
  centerForce: 0.2,
  linkDistance: 30,
  fontSize: 0.6,
  opacityScale: 1,
  removeTags: [],
  showTags: false,
  focusOnHover: true,
  enableRadial: true,
}

export default (() => {
  const GraphPanel: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const isHome = fileData.slug === "index"
    return (
      <div class={classNames(displayClass, "graph-panel-host")}>
        {isHome && (
          <div class="home-graph-entry">
            <button class="global-graph-icon home-graph-button">
              <span>🌐 查看全库知识图谱</span>
              <span class="hint">452 页 · 论文网 × 公式网 · Ctrl/⌘ + G</span>
            </button>
          </div>
        )}
        <button class="graph-panel-fab" aria-label="打开当前页图谱" title="当前页关系图谱">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="5" cy="6" r="3"></circle>
            <circle cx="19" cy="6" r="2"></circle>
            <circle cx="12" cy="19" r="3"></circle>
            <line x1="7.5" y1="7.5" x2="10" y2="16.5"></line>
            <line x1="17" y1="7.5" x2="13.5" y2="16.8"></line>
            <line x1="7.2" y1="6" x2="17" y2="6"></line>
          </svg>
        </button>
        <div class="graph-panel" role="dialog" aria-label="当前页关系图谱">
          <div class="graph-panel-head">
            <span class="graph-panel-title">当前页关系图谱</span>
            <div class="graph-panel-actions">
              <button class="global-graph-icon" aria-label="展开全库图谱" title="全库图谱（Ctrl/⌘+G）">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
              <button class="graph-panel-close" aria-label="关闭" title="关闭 (Esc)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <div class="graph-container" data-cfg={JSON.stringify(localCfg)}></div>
        </div>
        <div class="global-graph-outer">
          <div class="global-graph-container" data-cfg={JSON.stringify(globalCfg)}></div>
        </div>
      </div>
    )
  }

  GraphPanel.css = [style, graphStyle].join("\n")
  GraphPanel.afterDOMLoaded = concatenateResources(script, graphScript)

  return GraphPanel
}) satisfies QuartzComponentConstructor
