# ccStudio1

Electron + Node.js 重构版本的 AI 编程助手管理平台。

## 项目简介

ccStudio1 是基于 Electron 和 Node.js 重构的 AI 编程助手管理平台，支持 Claude、Gemini、Codex 等多种 AI 助手的会话管理、工作空间、任务看板和文档管理。

## 技术栈

- **桌面框架**: Electron 35
- **前端**: React 18, Vite 5
- **状态管理**: Zustand 4.5
- **UI 框架**: TailwindCSS 3.4
- **编辑器**: Monaco Editor
- **终端**: xterm.js 6
- **其他**: dnd-kit, lucide-react, react-markdown

## 功能特性

- ✅ 工作空间管理
- ✅ 会话管理（开发中）
- ✅ 任务看板（开发中）
- ✅ 文档中心（开发中）
- ✅ 数据存储（开发中）
- ✅ 终端控制（开发中）
- ✅ 系统设置（开发中）

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

## 项目结构

```
ccstudio1/
├── electron/          # Electron 主进程代码
│   ├── main.js       # 主进程入口
│   └── preload.js    # 预加载脚本
├── src/              # 源代码
│   ├── components/   # React 组件
│   ├── stores/       # Zustand 状态管理
│   ├── utils/        # 工具函数
│   ├── App.jsx       # 主应用组件
│   └── main.jsx      # React 入口
├── public/           # 静态资源
├── index.html        # HTML 入口
├── vite.config.js    # Vite 配置
└── package.json      # 项目配置
```

## 迁移进度

从 Tauri + Rust 重构到 Electron + Node.js：

- [x] 项目初始化
- [x] Electron 主进程
- [x] React 基础架构
- [x] 状态管理（Zustand）
- [x] 基础 UI 组件
- [ ] 会话管理功能
- [ ] 看板功能
- [ ] 文档功能
- [ ] 终端功能
- [ ] API 密钥管理
- [ ] 文件系统操作
- [ ] 数据持久化

## License

MIT

## 作者

flamingol1
