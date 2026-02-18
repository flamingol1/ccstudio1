import React from 'react';
import { Layout, Database, Terminal, FileText, Settings, MessageSquare, Kanban, FolderKanban } from 'lucide-react';
import useStore from '@stores/useStore';
import { cn } from '@utils/cn';

const Sidebar = () => {
  const { activeView, setActiveView } = useStore();

  const menuItems = [
    { id: 'workspace', icon: Layout, label: '工作空间' },
    { id: 'sessions', icon: MessageSquare, label: '会话管理' },
    { id: 'boards', icon: Kanban, label: '任务看板' },
    { id: 'documents', icon: FileText, label: '文档中心' },
    { id: 'database', icon: Database, label: '数据存储' },
    { id: 'terminal', icon: Terminal, label: '终端控制' },
    { id: 'settings', icon: Settings, label: '系统设置' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">CC</span>
          </div>
          <span className="font-semibold text-lg">ccStudio1</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>版本: 1.0.0</p>
          <p>Electron + Node.js</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
