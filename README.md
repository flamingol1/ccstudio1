# ccStudio1

Electron + Node.js 重构版本的 AI 编程助手管理平台。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 项目简介

ccStudio1 是基于 Electron 和 Node.js 重构的 AI 编程助手管理平台，支持 Claude、Gemini、Codex 等多种 AI 助手的会话管理、工作空间、任务看板和文档管理。

## 技术栈

- **桌面框架**: Electron 35
- **前端**: React 18, Vite 5
- **状态管理**: Zustand 4.5
- **UI 框架**: TailwindCSS 3.4
- **数据库**: better-sqlite3
- **密钥管理**: keytar
- **编辑器**: Monaco Editor
- **终端**: xterm.js 6
- **其他**: dnd-kit, lucide-react, react-markdown

## 功能特性

### ✅ 已完成
- [x] 基础架构搭建
- [x] IPC 通信层
- [x] SQLite 数据库层
- [x] 会话管理
  - 创建/删除会话
  - 会话列表
  - AI Provider 选择
  - 模型选择
- [x] 文件系统操作
- [x] API 密钥管理
- [x] 应用设置

### 🚧 开发中
- [ ] 任务看板
- [ ] 文档中心
- [ ] 数据存储视图
- [ ] 终端控制
- [ ] 系统设置页面

### 📋 计划中
- [ ] AI API 集成
- [ ] Monaco Editor 集成
- [ ] PTY 终端
- [ ] 数据导入/导出
- [ ] 主题切换

## 开发

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run electron:dev
```

### 构建

```bash
npm run build
npm run electron:build
```

### 修复漏洞

```bash
npm audit fix
```

## 项目结构

```
ccstudio1/
├── electron/              # Electron 主进程
│   ├── main.js          # 主进程入口（包含 IPC handlers）
│   ├── database.js      # SQLite 数据库管理
│   └── preload.js       # 预加载脚本
├── src/                  # 源代码
│   ├── components/      # React 组件
│   │   ├── Sidebar.jsx
│   │   ├── MainContent.jsx
│   │   └── views/      # 视图组件
│   │       ├── WorkspaceView.jsx
│   │       ├── SessionsView.jsx
│   │       └── ...
│   ├── stores/         # Zustand stores
│   │   └── useStore.js
│   ├── services/       # API 服务层
│   │   └── api.js      # IPC 调用封装
│   ├── utils/          # 工具函数
│   ├── App.jsx         # 根组件
│   └── main.jsx        # React 入口
├── scripts/            # 工具脚本
│   └── test.js
├── public/             # 静态资源
├── index.html          # HTML 入口
├── vite.config.js      # Vite 配置
└── package.json        # 项目配置
```

## API 参考

### IPC Handlers

#### 会话管理
```javascript
// 获取所有会话
window.electronAPI.getSessions()

// 创建会话
window.electronAPI.createSession({
  id: 'session-id',
  name: '会话名称',
  provider: 'claude',
  model: 'claude-3-5-sonnet-20241022',
  messages: [],
  metadata: {}
})

// 更新会话
window.electronAPI.updateSession(id, { messages: [...] })

// 删除会话
window.electronAPI.deleteSession(id)
```

#### 文件系统
```javascript
// 选择目录
window.electronAPI.selectDirectory()

// 选择文件
window.electronAPI.selectFile()

// 读取文件
window.electronAPI.readFile('/path/to/file')

// 写入文件
window.electronAPI.writeFile('/path/to/file', 'content')
```

#### API 密钥
```javascript
// 获取 API 密钥
window.electronAPI.getApiKey('claude')

// 设置 API 密钥
window.electronAPI.setApiKey('claude', 'sk-xxx...')
```

更多 API 参考：`src/services/api.js`

## 迁移进度

从 Tauri + Rust 重构到 Electron + Node.js：

| 模块 | Tauri + Rust | Electron + Node.js | 状态 |
|------|--------------|-------------------|------|
| 桌面框架 | Tauri 2 | Electron 35 | ✅ |
| 前端 | React 18 | React 18 | ✅ |
| 状态管理 | Zustand | Zustand | ✅ |
| 数据库 | SQLite (Rust) | better-sqlite3 | ✅ |
| IPC | Tauri Commands | Electron IPC | ✅ |
| 文件系统 | Tauri FS Plugin | Node.js fs | ✅ |
| 密钥管理 | SecureStorage | keytar | ✅ |
| 会话管理 | ✅ | ✅ | ✅ |
| 看板 | ✅ | 🚧 | 🚧 |
| 文档 | ✅ | 🚧 | 🚧 |
| 终端 | ✅ | 📋 | 📋 |

详细迁移计划：[MIGRATION.md](./MIGRATION.md)

## 开发进度

最新开发进度：[PROGRESS.md](./PROGRESS.md)

### 代码统计

- 总文件：26
- 代码行数：约 1,500+
- 组件数：8
- IPC handlers：20+
- 数据库表：5

## 已知问题

### node-pty 编译失败
- 原因：缺少 Python distutils 模块
- 影响：终端功能暂无法实现
- 解决方案：后续安装 Python 构建工具

### 安全漏洞
- npm audit 报告 15 个漏洞（6 中等，9 高危）
- 建议：运行 `npm audit fix`

## 快速开始

详细指南：[QUICKSTART.md](./QUICKSTART.md)

```bash
# 克隆仓库
git clone https://github.com/flamingol1/ccstudio1.git
cd ccstudio1

# 安装依赖
npm install

# 启动开发模式
npm run electron:dev
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT

## 作者

flamingol1

---

**开始您的 AI 编程之旅！** 🚀
