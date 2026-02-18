import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';
import keytar from 'keytar';
import Store from 'electron-store';
import database from './database.js';

const store = new Store();
const SERVICE_NAME = 'ccstudio1';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
    title: 'ccStudio1',
  });

  // 加载开发服务器或生产构建文件
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ========== 文件系统操作 ==========

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory'],
  });
  return result;
});

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
  });
  return result;
});

ipcMain.handle('select-save-file', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, options);
  return result;
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-file', async (event, filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-directory', async (event, dirPath) => {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    const result = await Promise.all(
      files.map(async (file) => {
        const stat = await fs.stat(path.join(dirPath, file.name));
        return {
          name: file.name,
          isDirectory: file.isDirectory(),
          size: stat.size,
          modified: stat.mtimeMs,
        };
      })
    );
    return { success: true, files: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ========== 对话框 ==========

ipcMain.handle('show-message-box', async (event, options) => {
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});

ipcMain.handle('show-error-box', async (event, title, content) => {
  dialog.showErrorBox(title, content);
  return { success: true };
});

// ========== API 密钥管理 ==========

ipcMain.handle('get-api-key', async (event, provider) => {
  try {
    const key = await keytar.getPassword(SERVICE_NAME, provider);
    return { success: true, key };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('set-api-key', async (event, provider, key) => {
  try {
    if (!key) {
      await keytar.deletePassword(SERVICE_NAME, provider);
    } else {
      await keytar.setPassword(SERVICE_NAME, provider, key);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ========== 会话管理 ==========

ipcMain.handle('get-sessions', async () => {
  try {
    const sessions = database.getSessions();
    const parsedSessions = sessions.map((s) => ({
      ...s,
      messages: JSON.parse(s.messages),
      metadata: JSON.parse(s.metadata),
    }));
    return { success: true, sessions: parsedSessions };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-session', async (event, session) => {
  try {
    const created = database.createSession(session);
    return { success: true, session: created };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-session', async (event, id, updates) => {
  try {
    const updated = database.updateSession(id, updates);
    return { success: true, session: updated };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-session', async (event, id) => {
  try {
    database.deleteSession(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ========== 看板管理 ==========

ipcMain.handle('get-boards', async () => {
  try {
    const boards = database.getBoards();
    return { success: true, boards };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-board', async (event, board) => {
  try {
    const created = database.createBoard(board);
    return { success: true, board: created };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-board', async (event, id, updates) => {
  try {
    const updated = database.updateBoard(id, updates);
    return { success: true, board: updated };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-board', async (event, id) => {
  try {
    database.deleteBoard(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ========== 任务管理 ==========

ipcMain.handle('get-tasks', async (event, boardId) => {
  try {
    const tasks = database.getTasks(boardId);
    return { success: true, tasks };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-task', async (event, task) => {
  try {
    const created = database.createTask(task);
    return { success: true, task: created };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-task', async (event, id, updates) => {
  try {
    const updated = database.updateTask(id, updates);
    return { success: true, task: updated };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-task', async (event, id) => {
  try {
    database.deleteTask(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ========== 文档管理 ==========

ipcMain.handle('get-documents', async () => {
  try {
    const documents = database.getDocuments();
    return { success: true, documents };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-document', async (event, doc) => {
  try {
    const created = database.createDocument(doc);
    return { success: true, document: created };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-document', async (event, id, updates) => {
  try {
    const updated = database.updateDocument(id, updates);
    return { success: true, document: updated };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-document', async (event, id) => {
  try {
    database.deleteDocument(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ========== 应用设置 ==========

ipcMain.handle('get-setting', async (event, key) => {
  try {
    const value = database.getSetting(key);
    return { success: true, value };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('set-setting', async (event, key, value) => {
  try {
    database.setSetting(key, value);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ========== 外部链接 ==========

ipcMain.handle('open-external', async (event, url) => {
  try {
    await shell.openExternal(url);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('open-path', async (event, filePath) => {
  try {
    await shell.openPath(filePath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
