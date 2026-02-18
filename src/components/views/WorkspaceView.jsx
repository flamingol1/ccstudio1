import React from 'react';
import { Plus, Search } from 'lucide-react';

const WorkspaceView = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">工作空间</h1>
        <p className="text-gray-600 dark:text-gray-400">管理您的 AI 编程助手工作空间</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">快速操作</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4" />
            新建项目
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">创建新会话</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">开始与 AI 助手的对话</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">创建看板</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">组织和管理您的任务</p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">导入项目</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">从本地或 Git 导入</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">最近项目</h2>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>暂无最近项目</p>
          <p className="text-sm mt-2">创建第一个项目开始使用</p>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceView;
