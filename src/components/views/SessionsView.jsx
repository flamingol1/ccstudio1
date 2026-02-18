import React, { useEffect, useState } from 'react';
import { Plus, Trash2, MessageSquare, Clock, MoreVertical, Edit2 } from 'lucide-react';
import useStore from '@stores/useStore';
import { sessions as sessionsAPI } from '@services/api';
import { generateId, formatDateTime } from '@utils/cn';
import { cn } from '@utils/cn';

const SessionsView = () => {
  const { sessions, selectedSessionId, setSelectedSessionId, setSessions } = useStore();
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionProvider, setNewSessionProvider] = useState('claude');
  const [newSessionModel, setNewSessionModel] = useState('claude-3-5-sonnet-20241022');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const result = await sessionsAPI.getAll();
      if (result.success) {
        setSessions(result.sessions);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    if (!newSessionName.trim()) return;

    try {
      const session = {
        id: generateId(),
        name: newSessionName,
        provider: newSessionProvider,
        model: newSessionModel,
        messages: [],
        metadata: {},
      };

      const result = await sessionsAPI.create(session);
      if (result.success) {
        setSessions([...sessions, result.session]);
        setShowCreateDialog(false);
        setNewSessionName('');
      }
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      const result = await sessionsAPI.delete(id);
      if (result.success) {
        setSessions(sessions.filter((s) => s.id !== id));
        if (selectedSessionId === id) {
          setSelectedSessionId(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const providerColors = {
    claude: 'bg-orange-500',
    gemini: 'bg-blue-500',
    codex: 'bg-green-500',
  };

  const providerNames = {
    claude: 'Claude',
    gemini: 'Gemini',
    codex: 'Codex',
  };

  return (
    <div className="p-6">
      {/* 头部 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">会话管理</h1>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建会话
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">管理与 AI 助手的对话会话</p>
      </div>

      {/* 会话列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500">加载中...</div>
        ) : sessions.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 mb-2">暂无会话</p>
            <p className="text-sm text-gray-400">点击"新建会话"开始与 AI 助手对话</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  'p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer',
                  selectedSessionId === session.id && 'bg-primary-50 dark:bg-primary-900/20'
                )}
                onClick={() => setSelectedSessionId(session.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Provider Badge */}
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0',
                        providerColors[session.provider]
                      )}
                    >
                      {providerNames[session.provider].charAt(0)}
                    </div>

                    {/* Session Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg mb-1 truncate">{session.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {session.messages?.length || 0} 条消息
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDateTime(session.updated_at)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('确定要删除这个会话吗？')) {
                          handleDeleteSession(session.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 创建会话对话框 */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">创建新会话</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">会话名称</label>
                <input
                  type="text"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="输入会话名称"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">AI 提供商</label>
                <select
                  value={newSessionProvider}
                  onChange={(e) => setNewSessionProvider(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700"
                >
                  <option value="claude">Claude</option>
                  <option value="gemini">Gemini</option>
                  <option value="codex">Codex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">模型</label>
                <select
                  value={newSessionModel}
                  onChange={(e) => setNewSessionModel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700"
                >
                  {newSessionProvider === 'claude' && (
                    <>
                      <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</option>
                      <option value="claude-3-opus-20240229">Claude 3 Opus</option>
                    </>
                  )}
                  {newSessionProvider === 'gemini' && (
                    <>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                    </>
                  )}
                  {newSessionProvider === 'codex' && (
                    <>
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    </>
                  )}
                </select>
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
                onClick={handleCreateSession}
                disabled={!newSessionName.trim()}
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

export default SessionsView;
