import React from 'react';

const DocumentsView = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-2">文档中心</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">管理项目文档和笔记</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
      <p className="text-gray-500 dark:text-gray-400">文档功能开发中...</p>
    </div>
  </div>
);

const DatabaseView = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-2">数据存储</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">查看和管理应用数据</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
      <p className="text-gray-500 dark:text-gray-400">数据库功能开发中...</p>
    </div>
  </div>
);

const TerminalView = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-2">终端控制</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">运行命令和脚本</p>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
      <p className="text-gray-500 dark:text-gray-400">终端功能开发中...</p>
    </div>
  </div>
);

const PlaceholderViews = {
  DocumentsView,
  DatabaseView,
  TerminalView,
};

export default PlaceholderViews;
export { DocumentsView, DatabaseView, TerminalView };
