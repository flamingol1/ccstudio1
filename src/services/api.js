/**
 * API 服务 - 封装所有 IPC 调用
 */

// ========== 文件系统 ==========

export const fileSystem = {
  selectDirectory: () => window.electronAPI.selectDirectory(),
  selectFile: () => window.electronAPI.selectFile(),
  selectSaveFile: (options) => window.electronAPI.selectSaveFile(options),
  readFile: (filePath) => window.electronAPI.readFile(filePath),
  writeFile: (filePath, content) => window.electronAPI.writeFile(filePath, content),
  readDirectory: (dirPath) => window.electronAPI.readDirectory(dirPath),
};

// ========== 对话框 ==========

export const dialogs = {
  showMessage: (options) => window.electronAPI.showMessageBox(options),
  showError: (title, content) => window.electronAPI.showErrorBox(title, content),
};

// ========== API 密钥 ==========

export const apiKeys = {
  get: (provider) => window.electronAPI.getApiKey(provider),
  set: (provider, key) => window.electronAPI.setApiKey(provider, key),
};

// ========== 会话管理 ==========

export const sessions = {
  getAll: () => window.electronAPI.getSessions(),
  create: (session) => window.electronAPI.createSession(session),
  update: (id, updates) => window.electronAPI.updateSession(id, updates),
  delete: (id) => window.electronAPI.deleteSession(id),
};

// ========== 看板管理 ==========

export const boards = {
  getAll: () => window.electronAPI.getBoards(),
  create: (board) => window.electronAPI.createBoard(board),
  update: (id, updates) => window.electronAPI.updateBoard(id, updates),
  delete: (id) => window.electronAPI.deleteBoard(id),
};

// ========== 任务管理 ==========

export const tasks = {
  getByBoard: (boardId) => window.electronAPI.getTasks(boardId),
  create: (task) => window.electronAPI.createTask(task),
  update: (id, updates) => window.electronAPI.updateTask(id, updates),
  delete: (id) => window.electronAPI.deleteTask(id),
};

// ========== 文档管理 ==========

export const documents = {
  getAll: () => window.electronAPI.getDocuments(),
  create: (doc) => window.electronAPI.createDocument(doc),
  update: (id, updates) => window.electronAPI.updateDocument(id, updates),
  delete: (id) => window.electronAPI.deleteDocument(id),
};

// ========== 应用设置 ==========

export const settings = {
  get: (key) => window.electronAPI.getSetting(key),
  set: (key, value) => window.electronAPI.setSetting(key, value),
};

// ========== 外部链接 ==========

export const external = {
  openURL: (url) => window.electronAPI.openExternal(url),
  openPath: (filePath) => window.electronAPI.openPath(filePath),
};
