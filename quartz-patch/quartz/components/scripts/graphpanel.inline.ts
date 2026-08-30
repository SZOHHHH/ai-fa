import { registerEscapeHandler } from "./util"

// 悬浮图谱面板交互：FAB 开关浮窗、Esc/关闭按钮收起、SPA 导航后自动收起并重绑事件
document.addEventListener("nav", () => {
  const panel = document.querySelector<HTMLElement>(".graph-panel")
  const fab = document.querySelector<HTMLElement>(".graph-panel-fab")
  const closeBtn = document.querySelector<HTMLElement>(".graph-panel-close")
  if (!panel || !fab) return

  // 导航到新页后收起（局部图内容由 stock graph 引擎随 nav 重渲染，始终与当前页同步）
  panel.classList.remove("open")

  const toggle = () => panel.classList.toggle("open")
  const close = () => panel.classList.remove("open")

  fab.addEventListener("click", toggle)
  closeBtn?.addEventListener("click", close)
  registerEscapeHandler(panel, close)

  window.addCleanup(() => {
    fab.removeEventListener("click", toggle)
    closeBtn?.removeEventListener("click", close)
  })
})
