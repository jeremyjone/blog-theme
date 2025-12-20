/**
 * 通用工具函数集合
 */

/**
 * 防抖函数 - 延迟执行，直到最后一次调用后等待指定时间
 * @param func - 需要防抖的函数
 * @param wait - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * 节流函数 - 确保函数在指定时间段内最多执行一次
 * @param func - 需要节流的函数
 * @param limit - 时间限制（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => void>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * 等待指定毫秒数
 * @param ms - 等待时间（毫秒）
 * @returns 在指定时间后解析的 Promise
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 生成唯一 ID
 * @returns 唯一字符串 ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 * @returns 复制成功时解析的 Promise
 */
export async function copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
    } else {
        // 旧版浏览器的降级方案
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }
}

/**
 * 检查代码是否在浏览器环境中运行
 * @returns 如果在浏览器环境中返回 true
 */
export function isBrowser(): boolean {
    return typeof window !== "undefined";
}

/**
 * 格式化数字，添加千位分隔符
 * @param num - 要格式化的数字
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 将数字限制在最小值和最大值之间
 * @param num - 要限制的数字
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制后的数字
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

/**
 * 截断文本到指定长度并添加省略号
 * @param text - 要截断的文本
 * @param maxLength - 最大长度
 * @param suffix - 后缀（默认：'...'）
 * @returns 截断后的字符串
 */
export function truncate(
    text: string,
    maxLength: number,
    suffix: string = "..."
): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * 数组去重
 * @param arr - 要去重的数组
 * @returns 包含唯一值的数组
 */
export function unique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

/**
 * 按键函数对数组项进行分组
 * @param arr - 要分组的数组
 * @param keyFn - 从每个项中提取键的函数
 * @returns 包含分组项的对象
 */
export function groupBy<T>(
    arr: T[],
    keyFn: (item: T) => string | number
): Record<string | number, T[]> {
    return arr.reduce((acc, item) => {
        const key = keyFn(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<string | number, T[]>);
}

/**
 * 按多个条件对数组进行排序
 * @param arr - 要排序的数组
 * @param compareFns - 比较函数数组
 * @returns 排序后的数组
 */
export function sortBy<T>(arr: T[], ...compareFns: ((a: T, b: T) => number)[]): T[] {
    return [...arr].sort((a, b) => {
        for (const fn of compareFns) {
            const result = fn(a, b);
            if (result !== 0) return result;
        }
        return 0;
    });
}

/**
 * 检查是否在开发模式下运行
 * @returns 如果在开发模式下返回 true
 */
export function isDev(): boolean {
    return import.meta.env?.DEV ?? false;
}

/**
 * 安全地解析 JSON，解析失败时返回降级值
 * @param json - 要解析的 JSON 字符串
 * @param fallback - 解析失败时的降级值
 * @returns 解析后的对象或降级值
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json);
    } catch {
        return fallback;
    }
}

/**
 * 从 localStorage 获取值（类型安全）
 * @param key - 存储键
 * @param fallback - 降级值
 * @returns 存储的值或降级值
 */
export function getLocalStorage<T>(key: string, fallback: T): T {
    if (!isBrowser()) return fallback;
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

/**
 * 将值保存到 localStorage（类型安全）
 * @param key - 存储键
 * @param value - 要保存的值
 */
export function setLocalStorage<T>(key: string, value: T): void {
    if (!isBrowser()) return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn("保存到 localStorage 失败:", e);
    }
}

/**
 * 从 localStorage 删除项
 * @param key - 存储键
 */
export function removeLocalStorage(key: string): void {
    if (!isBrowser()) return;
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn("从 localStorage 删除失败:", e);
    }
}

/**
 * 平滑滚动到元素
 * @param elementOrSelector - 元素或 CSS 选择器
 * @param options - 滚动选项
 */
export function scrollToElement(
    elementOrSelector: Element | string,
    options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
): void {
    const element =
        typeof elementOrSelector === "string"
            ? document.querySelector(elementOrSelector)
            : elementOrSelector;

    if (element) {
        element.scrollIntoView(options);
    }
}

/**
 * 检查元素是否在视口内
 * @param element - 要检查的元素
 * @param threshold - 可见性阈值（0-1）
 * @returns 如果元素可见返回 true
 */
export function isInViewport(element: Element, threshold: number = 0): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;

    const vertInView =
        rect.top + rect.height * threshold <= windowHeight &&
        rect.top + rect.height * (1 - threshold) >= 0;
    const horInView =
        rect.left + rect.width * threshold <= windowWidth &&
        rect.left + rect.width * (1 - threshold) >= 0;

    return vertInView && horInView;
}

/**
 * 检测操作系统平台
 * @returns 平台类型
 */
export function getPlatform(): "mac" | "windows" | "linux" | "other" {
    if (!isBrowser()) return "other";
    const platform = navigator.platform.toUpperCase();
    if (platform.includes("MAC")) return "mac";
    if (platform.includes("WIN")) return "windows";
    if (platform.includes("LINUX")) return "linux";
    return "other";
}
