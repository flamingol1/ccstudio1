# 快速开始指南

## 前置要求

- Node.js 18+ 
- npm 或 yarn
- Git

## 安装

```bash
# 克隆仓库
git clone https://github.com/flamingol1/ccstudio1.git
cd ccstudio1

# 安装依赖
npm install
```

## 开发

```bash
# 启动开发服务器（包含 Electron）
npm run electron:dev

# 仅启动 Vite 开发服务器
npm run dev
```

## 构建

```bash
# 构建前端资源
npm run build

# 构建 Electron 应用
npm run electron:build
```

## 项目结构

```
ccstudio1/
├── electron/          # Electron 主进程
│   ├── main.js       # 主进程入口
│   └── preload.js    # 预加载脚本
├── src/              # React 源代码
│   ├── components/   # UI 组件
│   │   ├── Sidebar.jsx
│   │   ├── MainContent.jsx
│   │   └── views/    # 视图组件
│   ├── stores/       # Zustand stores
│   │   └── useStore.js
│   ├── utils/        # 工具函数
│   │   └── cn.js
│   ├── App.jsx       # 根组件
│   └── main.jsx      # React 入口
├── public/           # 静态资源
├── index.html        # HTML 入口
└── package.json      # 项目配置
```

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 构建前端资源 |
| `npm run preview` | 预览构建结果 |
| `npm run electron:dev` | 启动 Electron 开发模式 |
| `npm run electron:build` | 构建 Electron 应用 |

## 开发注意事项

### IPC 通信

从渲染进程调用主进程功能：

```javascript
// 渲染进程
const result = await window.electronAPI.selectDirectory();
```

### 状态管理

使用 Zustand store：

```javascript
import useStore from '@stores/useStore';

const { sessions, addSession } = useStore();
```

### 样式

使用 TailwindCSS：

```jsx
<div className="bg-white dark:bg-gray-800 p-4">
  内容
</div>
```

## 故障排查

### 端口冲突

如果 5173 端口被占用，修改 `vite.config.js`：

```javascript
export default defineConfig({
  server: {
    port: 3000,  // 修改端口
  },
});
```

### Electron 窗口不显示

检查控制台输出，确保 Vite 开发服务器已启动。

### 模块未找到

运行 `npm install` 确保所有依赖已安装。

## 下一步

- 查看 [MIGRATION.md](./MIGRATION.md) 了解迁移计划
- 查看 [README.md](./README.md) 了解项目详情
- 开始开发新功能！
