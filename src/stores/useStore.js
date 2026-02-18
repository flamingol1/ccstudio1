import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        // 当前激活的视图
        activeView: 'workspace',
        setActiveView: (view) => set({ activeView: view }),

        // 会话列表
        sessions: [],
        setSessions: (sessions) => set({ sessions }),
        addSession: (session) => set((state) => ({ sessions: [...state.sessions, session] })),
        updateSession: (id, updates) => set((state) => ({
          sessions: state.sessions.map((s) => s.id === id ? { ...s, ...updates } : s),
        })),
        deleteSession: (id) => set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),

        // 当前选中的会话
        selectedSessionId: null,
        setSelectedSessionId: (id) => set({ selectedSessionId: id }),

        // 看板数据
        boards: [],
        setBoards: (boards) => set({ boards }),
        addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
        updateBoard: (id, updates) => set((state) => ({
          boards: state.boards.map((b) => b.id === id ? { ...b, ...updates } : b),
        })),
        deleteBoard: (id) => set((state) => ({
          boards: state.boards.filter((b) => b.id !== id),
        })),

        // 当前选中的看板
        selectedBoardId: null,
        setSelectedBoardId: (id) => set({ selectedBoardId: id }),

        // 任务列表
        tasks: [],
        setTasks: (tasks) => set({ tasks }),
        addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
        updateTask: (id, updates) => set((state) => ({
          tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t),
        })),
        deleteTask: (id) => set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

        // 文档列表
        documents: [],
        setDocuments: (documents) => set({ documents }),
        addDocument: (document) => set((state) => ({ documents: [...state.documents, document] })),
        updateDocument: (id, updates) => set((state) => ({
          documents: state.documents.map((d) => d.id === id ? { ...d, ...updates } : d),
        })),
        deleteDocument: (id) => set((state) => ({
          documents: state.documents.filter((d) => d.id !== id),
        })),

        // 当前选中的文档
        selectedDocumentId: null,
        setSelectedDocumentId: (id) => set({ selectedDocumentId: id }),

        // API 配置
        apiConfig: {
          claudeApiKey: '',
          geminiApiKey: '',
          codexApiKey: '',
        },
        setApiConfig: (config) => set((state) => ({
          apiConfig: { ...state.apiConfig, ...config },
        })),
      }),
      {
        name: 'ccstudio1-storage',
        version: 1,
      }
    )
  )
);

export default useStore;
