# Terminal 组件使用说明

## 📦 组件特性

### ✅ 已实现的改进

1. **固定高度**
   - 桌面端：480px
   - 移动端：400px
   - 内容超出时自动滚动，不会撑大页面

2. **100% 终端还原**
   - 使用 `contenteditable` 替代 `<input>` 元素
   - 完全模拟真实终端的输入体验
   - 光标位置完美跟随
   - 无任何可见的输入框边框

3. **Tab 自动补全**
   - 输入命令时显示灰色提示（第一个匹配项）
   - 按 `Tab` 键自动补全命令
   - 完全符合终端使用习惯

4. **命令配置化**
   - 命令定义在 `src/lib/terminal-commands.ts`
   - 方便添加和修改命令
   - 支持特殊参数命令（如 `cat`, `echo`）

## 🎮 支持的命令

| 命令 | 描述 | 示例 |
|------|------|------|
| `whoami` | 显示用户信息 | `whoami` |
| `pwd` | 显示当前目录 | `pwd` |
| `ls` | 列出文件 | `ls` |
| `ps` | 显示博客统计 | `ps` |
| `date` | 显示当前时间 | `date` |
| `cat <file>` | 显示文件内容 | `cat about.md` |
| `echo <text>` | 输出文本 | `echo hello` |
| `clear` | 清空终端 | `clear` |
| `history` | 显示命令历史 | `history` |
| `help` | 显示帮助信息 | `help` |

## 🔧 如何添加新命令

编辑 `src/lib/terminal-commands.ts` 文件：

### 1. 简单命令（无参数）

```typescript
export const commands: Record<string, () => string> = {
    // ... 现有命令

    // 添加新命令
    mycommand: () => "这是我的命令输出",
};
```

### 2. 带参数的命令

在 `executeSpecialCommand` 函数中添加：

```typescript
export function executeSpecialCommand(input: string): string | null {
    // ... 现有特殊命令

    // 添加新的特殊命令
    if (trimmed.startsWith("mycommand ")) {
        const args = trimmed.substring(10).trim();
        return `处理参数: ${args}`;
    }

    return null;
}
```

### 3. 更新帮助信息

别忘了在 `help` 命令中添加新命令的描述！

## 🎨 交互功能

- ✅ **回车执行**：输入命令后按回车
- ✅ **方向键上/下**：浏览历史命令
- ✅ **Tab 键**：自动补全命令
- ✅ **点击聚焦**：点击终端任意位置聚焦输入
- ✅ **自动滚动**：新内容自动滚到底部
- ✅ **自动演示**：页面加载后自动执行 `whoami`, `ls`, `help`

## 💡 自定义自动演示命令

修改 `src/lib/terminal-commands.ts` 中的：

```typescript
export const autoCommands = ["whoami", "ls", "help"];
```

改为你想要的命令序列。

## 🎯 技术细节

### 为什么使用 `contenteditable`？

- 更接近真实终端的输入体验
- 光标完全可控且跟随文本
- 无任何 UI 元素干扰（无输入框边框）
- 支持复制粘贴等原生行为

### 自动补全实现

- 实时监听输入变化
- 匹配命令库中以输入文本开头的命令
- 以半透明灰色显示补全建议
- Tab 键触发补全，自动填充完整命令

### 光标闪烁效果

- 使用 CSS `@keyframes` 实现
- `step-end` 确保不会有渐变效果
- 与文本颜色保持一致（黑/白）

## 📱 响应式设计

- 移动端字体和高度自动调整
- 滚动条在移动端更窄
- 保持完整功能，体验无损

## 🚀 未来可扩展功能

- [ ] 更多命令（如 `cd`, `mkdir`, `rm` 等虚拟操作）
- [ ] 彩色输出（ANSI 颜色支持）
- [ ] 命令别名系统
- [ ] 管道符支持（`|`）
- [ ] 更复杂的文件系统模拟
- [ ] 游戏彩蛋命令（如 `sl`, `cowsay`）
