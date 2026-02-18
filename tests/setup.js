import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.electronAPI
global.window.electronAPI = {
  selectDirectory: vi.fn(),
  selectFile: vi.fn(),
  selectSaveFile: vi.fn(),
  readFile: vi.fn(),
  writeFile: vi.fn(),
  readDirectory: vi.fn(),
  showMessageBox: vi.fn(),
  showErrorBox: vi.fn(),
  getApiKey: vi.fn(),
  setApiKey: vi.fn(),
  getSessions: vi.fn(),
  createSession: vi.fn(),
  updateSession: vi.fn(),
  deleteSession: vi.fn(),
  getBoards: vi.fn(),
  createBoard: vi.fn(),
  updateBoard: vi.fn(),
  deleteBoard: vi.fn(),
  getTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
  getDocuments: vi.fn(),
  createDocument: vi.fn(),
  updateDocument: vi.fn(),
  deleteDocument: vi.fn(),
  getSetting: vi.fn(),
  setSetting: vi.fn(),
  openExternal: vi.fn(),
  openPath: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
};

// Mock confirm
global.confirm = vi.fn(() => true);
