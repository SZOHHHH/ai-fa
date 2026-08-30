import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/SZOHHHH/ai-fa",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "目录",
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      // 以下三个函数会被 toString() 序列化后在浏览器执行——必须自包含，不得捕获外部变量
      // ⚠️ slugSegment 保留原始大小写（00-Meta、50-Canvas）
      filterFn: (node) => {
        const seg = node.slugSegment
        return seg !== "tags" && seg !== "50-Canvas" && seg !== "index"
      },
      mapFn: (node) => {
        if (!node.isFolder) return
        const rename = {
          "00-Meta": "规范与设置",
          "10-Papers": "论文 Papers",
          "20-Algorithms": "算法 Algorithms",
          "30-Formulas": "公式 Formulas",
          "40-Concepts": "概念 Concepts",
          "60-Matrices": "研究矩阵 Matrices",
        }
        if (rename[node.displayName] !== undefined) {
          node.displayName = rename[node.displayName]
        } else {
          node.displayName = node.displayName.replace(/^\d+-/, "")
        }
      },
      sortFn: (a, b) => {
        if (a.isFolder !== b.isFolder) {
          return a.isFolder ? -1 : 1
        }
        // 00-Meta 沉底；其余按目录名数字前缀排序（01-架构演进 → 1）
        const rank = (n) => (n.slugSegment === "00-Meta" ? 999 : parseInt(n.slugSegment) || 500)
        const r = rank(a) - rank(b)
        if (r !== 0) return r
        return a.displayName.localeCompare(b.displayName, "zh-CN", { numeric: true })
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "目录",
      folderDefaultState: "collapsed",
      folderClickBehavior: "link",
      filterFn: (node) => {
        const seg = node.slugSegment
        return seg !== "tags" && seg !== "50-Canvas" && seg !== "index"
      },
      mapFn: (node) => {
        if (!node.isFolder) return
        const rename = {
          "00-Meta": "规范与设置",
          "10-Papers": "论文 Papers",
          "20-Algorithms": "算法 Algorithms",
          "30-Formulas": "公式 Formulas",
          "40-Concepts": "概念 Concepts",
          "60-Matrices": "研究矩阵 Matrices",
        }
        if (rename[node.displayName] !== undefined) {
          node.displayName = rename[node.displayName]
        } else {
          node.displayName = node.displayName.replace(/^\d+-/, "")
        }
      },
      sortFn: (a, b) => {
        if (a.isFolder !== b.isFolder) {
          return a.isFolder ? -1 : 1
        }
        const rank = (n) => (n.slugSegment === "00-Meta" ? 999 : parseInt(n.slugSegment) || 500)
        const r = rank(a) - rank(b)
        if (r !== 0) return r
        return a.displayName.localeCompare(b.displayName, "zh-CN", { numeric: true })
      },
    }),
  ],
  right: [],
}
