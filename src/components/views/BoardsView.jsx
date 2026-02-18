import React, { useEffect, useState } from 'react';
import { Plus, Trash2, LayoutGrid, Settings, MoreVertical } from 'lucide-react';
import useStore from '@stores/useStore';
import { boards as boardsAPI, tasks as tasksAPI } from '@services/api';
import { generateId, cn } from '@utils/cn';

const BoardsView = () => {
  const { boards, setBoards, selectedBoardId, setSelectedBoardId } = useStore();
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardColor, setNewBoardColor] = useState('#0ea5e9');

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    setLoading(true);
    try {
      const result = await boardsAPI.getAll();
      if (result.success) {
        setBoards(result.boards);
        // 选择第一个看板
        if (result.boards.length > 0 && !selectedBoardId) {
          setSelectedBoardId(result.boards[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to load boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;

    try {
      const board = {
        id: generateId(),
        name: newBoardName,
        color: newBoardColor,
      };

      const result = await boardsAPI.create(board);
      if (result.success) {
        setBoards([...boards, result.board]);
        setSelectedBoardId(result.board.id);
        setShowCreateDialog(false);
        setNewBoardName('');
        setNewBoardColor('#0ea5e9');
      }
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  const handleDeleteBoard = async (id) => {
    try {
      const result = await boardsAPI.delete(id);
      if (result.success) {
        const newBoards = boards.filter((b) => b.id !== id);
        setBoards(newBoards);
        if (selectedBoardId === id) {
          setSelectedBoardId(newBoards[0]?.id || null);
        }
      }
    } catch (error) {
      console.error('Failed to delete board:', error);
    }
  };

  const selectedBoard = boards.find((b) => b.id === selectedBoardId);

  return (
    <div className="p-6">
      {/* 头部 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">任务看板</h1>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建看板
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">可视化管理您的任务</p>
      </div>

      {/* 看板选择器 */}
      {boards.length > 0 && (
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => setSelectedBoardId(board.id)}
              className={cn(
                'px-4 py-2 rounded-lg whitespace-nowrap transition-colors',
                selectedBoardId === board.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
              style={
                selectedBoardId === board.id
                  ? { backgroundColor: board.color }
                  : {}
              }
            >
              {board.name}
            </button>
          ))}
          <button
            onClick={() => {
              const id = boards.find((b) => b.id === selectedBoardId)?.id;
              if (id && confirm('确定要删除这个看板吗？')) {
                handleDeleteBoard(id);
              }
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 看板内容 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500">加载中...</div>
        ) : !selectedBoard ? (
          <div className="p-12 text-center">
            <LayoutGrid className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 mb-2">暂无看板</p>
            <p className="text-sm text-gray-400">点击"新建看板"创建您的第一个看板</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: selectedBoard.color }}
                >
                  {selectedBoard.name.charAt(0)}
                </div>
                <h2 className="text-xl font-semibold">{selectedBoard.name}</h2>
              </div>
            </div>

            {/* 列表视图 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                任务功能开发中...
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-2">
                拖拽排序和任务管理即将推出
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 创建看板对话框 */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">创建新看板</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">看板名称</label>
                <input
                  type="text"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="输入看板名称"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">看板颜色</label>
                <div className="flex gap-2 flex-wrap">
                  {['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewBoardColor(color)}
                      className={cn(
                        'w-8 h-8 rounded-full transition-all',
                        newBoardColor === color && 'ring-2 ring-offset-2 ring-gray-400'
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowCreateDialog(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreateBoard}
                disabled={!newBoardName.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardsView;
