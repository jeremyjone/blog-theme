/**
 * 博客文章接口定义
 * 对应 Astro Content Collections 中的 blog 集合结构
 */
export interface IBlog {
    /** 文章唯一标识符 */
    id: string;
    /** 文章的 URL 别名 */
    slug: string;
    /** 文章的正文内容 */
    body: string;
    /** 集合名称：'blog' */
    collection: "blog";
    /** 文章的元数据（Frontmatter） */
    data: {
        /** 文章标题 */
        title: string;
        /** 发布日期 (YYYY-MM-DD) */
        date: string;
        /** 自定义 URL slug */
        slug?: string;
        /** 文章简短描述 */
        description?: string;
        /** 文章标签列表 */
        tags: string[];
        /** 文章分类 */
        category: string;
        /** 是否为草稿 */
        draft: boolean;
        /** 预计阅读时间（分钟） */
        readingTime?: number;
        /** 最后更新时间 */
        updated?: string;
    };
}

/**
 * 随手记接口定义
 * 对应 Astro Content Collections 中的 notes 集合结构
 */
export interface INote {
    /** 笔记唯一标识符 */
    id: string;
    /** 笔记的 URL 别名 */
    slug: string;
    /** 笔记的正文内容 */
    body: string;
    /** 集合名称：'notes' */
    collection: "notes";
    /** 笔记的元数据（Frontmatter） */
    data: {
        /** 笔记标题（可选） */
        title?: string;
        /** 记录日期 */
        date: string;
        /** 笔记标签列表 */
        tags: string[];
        /** 笔记主题 */
        topic: string;
        /** 重要程度 (1-5) */
        importance: number;
        /** 是否为草稿 */
        draft: boolean;
    };
}
