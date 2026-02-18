# ccStudio1 重构迁移计划

## 项目概述

从 Tauri + Rust 重构到 Electron + Node.js 的 AI 编程助手管理平台。

## 技术栈对比

| 功能 | 原项目 (Tauri + Rust) | 新项目 (Electron + Node.js) |
|------|-------------------------|----------------------------|
| 桌面框架 | Tauri 2 | Electron 35 |
| 前端 | React 18 | React 18 |
| 构建工具 | Vite 5 | Vite 5 |
| 状态管理 | Zustand 4.5 | Zustand 4.5 |
| 后端语言 | Rust | JavaScript/Node.js |
| 数据库 | SQLite (Rust) | SQLite (better-sqlite3) |
| IPC | Tauri Commands | Electron IPC |
| 文件系统 | Tauri FS Plugin | Node.js fs + electronAPI |

## 迁移阶段

### 阶段 1: 基础架构 ✅
- [x] 创建 Electron 主进程
- [x] 创建预加载脚本
- [x] 配置 React + Vite
- [x] 配置 TailwindCSS
- [x] 设置 Zustand 状态管理
- [x] 创建基础 UI 组件

### 阶段 2: IPC 通信层
- [ ] 实现 IPC handlers
  - [ ] 文件系统操作
  - [ ] 对话框
  - [ ] 系统通知
- [ ] 实现 preload API
- [ ] 测试 IPC 通信

### 阶段 3: 状态管理迁移
- [ ] 迁移 sessions store
- [ ] 迁移 boards store
- [ ] 迁移 tasks store
- [ ] 迁移 documents store
- [ ] 迁移 API 配置
- [ ] 数据持久化

### 阶段 4: 核心功能迁移
- [ ] 会话管理
  - [ ] 创建会话
  - [ ] 编辑会话
  - [ ] 删除会话
  - [ ] 会话列表
- [ ] 看板管理
  - [ ] 创建看板
  - [ ] 拖拽排序 (dnd-kit)
  - [ ] 任务管理
- [ ] 文档中心
  - [ ] Markdown 编辑
  - [ ] 文档列表
  - [ ] 实时预览

### 阶段 5: 高级功能
- [ ] API 密钥管理
  - [ ] 存储加密
  - [ ] Keychain 集成
- [ ] 终端集成
  - [ ] xterm.js
  - [ ] PTY 进程管理
- [ ] Monaco Editor
  - [ ] 代码高亮
  - [ ] 自动补全
  - [ ] 语法检查

### 阶段 6: 数据持久化
- [ ] SQLite 数据库
  - [ ] 数据库初始化
  - [ ] 迁移脚本
  - [ ] 数据备份/恢复
- [ ] 文件系统
  - [ ] 工作空间管理
  - [ ] 项目导入/导出

### 阶段 7: 测试与优化
- [ ] 单元测试
- [ ] 集成测试
- [ ] 性能优化
- [ ] 错误处理
- [ ] 日志系统

## 关键问题与解决方案

### P0: API 密钥解密
**原项目问题**: `decrypt_string` 函数为空实现
**解决方案**: 使用 Node.js `keytar` 库实现系统密钥链

### P1: 文件系统操作
**迁移**: Tauri FS Plugin → Node.js fs + electron API
**安全性**: 使用 Electron 的 sandbox 限制

### P2: 数据库迁移
**迁移**: Rust SQLite → better-sqlite3
**兼容性**: 保持数据结构一致，编写迁移脚本

### P3: 终端 PTY
**迁移**: Tauri shell plugin → node-pty
**跨平台**: 测试 Windows/macOS/Linux 兼容性

## 开发优先级

1. **高优先级**
   - IPC 通信层
   - 状态管理迁移
   - 会话管理功能

2. **中优先级**
   - 看板功能
   - 文档中心
   - API 密钥管理

3. **低优先级**
   - 终端集成
   - Monaco Editor 高级功能
   - 性能优化

## 下一步行动

1. 实现 IPC 通信层
2. 迁移状态管理
3. 实现会话管理功能
4. 测试和调试

## 参考资源

- [Electron 文档](https://www.electronjs.org/docs)
- [Vite 文档](https://vitejs.dev/)
- [Zustand 文档](https://zustand-demo.pmnd.rs/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [node-pty](https://github.com/microsoft/node-pty)
