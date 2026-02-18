import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 文件系统操作
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  selectFile: () => ipcRenderer.invoke('select-file'),
  
  // 对话框
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  
  // 事件监听
  on: (channel, callback) => {
    const validChannels = ['update-progress', 'notification'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
  off: (channel, callback) => {
    const validChannels = ['update-progress', 'notification'];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, callback);
    }
  },
});
