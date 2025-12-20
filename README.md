# Astro Blog Theme (Headless)

这是一个基于 [Astro](https://astro.build) 构建的现代化、极简风格的博客主题。它采用了 **Headless（无头）** 架构设计，将 UI 逻辑与内容/配置完全分离，非常适合开发者使用。

## ✨ 特性

* **完全解耦**：主题作为独立子模块存在，不包含任何用户硬编码数据。
* **终端模拟器**：内置交互式终端组件，支持自定义命令和自动演示。
* **双内容流**：支持 `Blog`（长文）和 `Notes`（碎片化笔记）两种内容形态。
* **强大的分类系统**：支持标签（Tags）、分类（Categories）和专题（Topics）。
* **SEO 优化**：内置 SEO 元数据生成、Open Graph 支持。
* **极致性能**：基于 Astro 静态生成，加载速度极快。
* **TypeScript**：全类型安全开发。

## 📦 安装

本主题设计为通过 **Git Submodule** 方式集成到你的 Astro 项目中。

```bash
# 在你的 Astro 项目根目录下
git submodule add https://github.com/jeremyjone/blog-theme.git theme
```

## 🔧 配置

为了让主题正常工作，你需要在主项目中配置路径别名，并提供必要的配置文件。

### 1. TypeScript 配置 (`tsconfig.json`)

你需要配置 `paths` 以便主题能找到你的配置文件：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@theme/*": ["theme/*"],
      "@config/*": ["src/config/*"]
    }
  }
}
```

### 2. 配置文件结构 (`src/config/`)

你需要在主项目的 `src/config/` 目录下创建以下文件：

* **`site.ts`**: 站点核心配置（标题、作者、社交链接、Giscus 评论配置等）。
* **`terminal.ts`**: 终端组件的命令和行为配置。
* **`topics.ts`**: 笔记专题的定义。

### 3. 内容结构 (`src/content/`)

主题期望你的内容目录结构如下：

```
src/content/
  ├── blog/          # 博客文章 (.md / .mdx)
  └── notes/         # 碎片笔记 (.md / .mdx)
```

## 🧩 组件使用

你可以直接在你的 `.astro` 页面中导入主题组件：

```astro
---
import BaseLayout from '@theme/components/layout/BaseLayout.astro';
import BlogLayout from '@theme/components/layout/BlogLayout.astro';
---

<BaseLayout title="我的主页">
  <h1>Hello World</h1>
</BaseLayout>
```

## 🛠️ 开发

如果你想贡献代码或修改主题：

1. 进入 `theme` 目录。
2. 修改代码。
3. 提交并推送到主题仓库。

```bash
cd theme
# ... make changes ...
git add .
git commit -m "feat: add new component"
git push
```

## 📄 许可证

MIT License
