import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // ========== 文件系统 ==========
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  selectFile: () => ipcRenderer.invoke('select-file'),
  selectSaveFile: (options) => ipcRenderer.invoke('select-save-file', options),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  readDirectory: (dirPath) => ipcRenderer.invoke('read-directory', dirPath),

  // ========== 对话框 ==========
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  showErrorBox: (title, content) => ipcRenderer.invoke('show-error-box', title, content),

  // ========== API 密钥 ==========
  getApiKey: (provider) => ipcRenderer.invoke('get-api-key', provider),
  setApiKey: (provider, key) => ipcRenderer.invoke('set-api-key', provider, key),

  // ========== 会话管理 ==========
  getSessions: () => ipcRenderer.invoke('get-sessions'),
  createSession: (session) => ipcRenderer.invoke('create-session', session),
  updateSession: (id, updates) => ipcRenderer.invoke('update-session', id, updates),
  deleteSession: (id) => ipcRenderer.invoke('delete-session', id),

  // ========== 看板管理 ==========
  getBoards: () => ipcRenderer.invoke('get-boards'),
  createBoard: (board) => ipcRenderer.invoke('create-board', board),
  updateBoard: (id, updates) => ipcRenderer.invoke('update-board', id, updates),
  deleteBoard: (id) => ipcRenderer.invoke('delete-board', id),

  // ========== 任务管理 ==========
  getTasks: (boardId) => ipcRenderer.invoke('get-tasks', boardId),
  createTask: (task) => ipcRenderer.invoke('create-task', task),
  updateTask: (id, updates) => ipcRenderer.invoke('update-task', id, updates),
  deleteTask: (id) => ipcRenderer.invoke('delete-task', id),

  // ========== 文档管理 ==========
  getDocuments: () => ipcRenderer.invoke('get-documents'),
  createDocument: (doc) => ipcRenderer.invoke('create-document', doc),
  updateDocument: (id, updates) => ipcRenderer.invoke('update-document', id, updates),
  deleteDocument: (id) => ipcRenderer.invoke('delete-document', id),

  // ========== 应用设置 ==========
  getSetting: (key) => ipcRenderer.invoke('get-setting', key),
  setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value),

  // ========== 外部链接 ==========
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  openPath: (filePath) => ipcRenderer.invoke('open-path', filePath),

  // ========== 事件监听 ==========
  on: (channel, callback) => {
    const validChannels = ['update-progress', 'notification', 'session-updated', 'board-updated'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
  off: (channel, callback) => {
    const validChannels = ['update-progress', 'notification', 'session-updated', 'board-updated'];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, callback);
    }
  },
});
