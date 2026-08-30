import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/topnav.scss"
import { classNames } from "../util/lang"
import { pathToRoot, resolveRelative, SimpleSlug } from "../util/path"

// 顶部主导航：把六个内容板块提升为一级入口（对应 dist 顶层目录）
// 注意：slug 一律小写连字符（Quartz slugify 规则），显示名由各目录 index.md 的 title 提供
interface NavItem {
  title: string
  slug?: SimpleSlug // 缺省 = 首页（pathToRoot）
  prefix: string // active 高亮匹配的首段 slug
}

const navItems: NavItem[] = [
  { title: "首页", prefix: "" },
  { title: "论文", slug: "10-papers" as SimpleSlug, prefix: "10-papers" },
  { title: "公式", slug: "30-formulas" as SimpleSlug, prefix: "30-formulas" },
  { title: "概念", slug: "40-concepts" as SimpleSlug, prefix: "40-concepts" },
  { title: "算法", slug: "20-algorithms" as SimpleSlug, prefix: "20-algorithms" },
  { title: "矩阵", slug: "60-matrices" as SimpleSlug, prefix: "60-matrices" },
  { title: "规范", slug: "00-meta" as SimpleSlug, prefix: "00-meta" },
]

const TopNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const slug = fileData.slug!
  const firstSegment = slug === "index" ? "" : slug.split("/")[0]
  return (
    <nav class={classNames(displayClass, "topnav")} aria-label="主导航">
      <div class="topnav-brand">
        <a href={pathToRoot(slug)}>AI 公式图谱</a>
      </div>
      <ul class="topnav-links">
        {navItems.map((item) => (
          <li>
            <a
              href={item.slug ? resolveRelative(slug, item.slug) : pathToRoot(slug)}
              class={firstSegment === item.prefix ? "active" : undefined}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

TopNav.css = style

export default (() => TopNav) satisfies QuartzComponentConstructor
