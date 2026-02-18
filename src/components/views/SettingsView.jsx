import React, { useEffect, useState } from 'react';
import { Key, Save, Check, X, Eye, EyeOff, Shield } from 'lucide-react';
import { apiKeys as apiKeysAPI } from '@services/api';

const SettingsView = () => {
  const [apiKeys, setApiKeys] = useState({
    claude: '',
    gemini: '',
    codex: '',
  });
  const [showKeys, setShowKeys] = useState({
    claude: false,
    gemini: false,
    codex: false,
  });
  const [saving, setSaving] = useState({});
  const [saved, setSaved] = useState({});

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    const providers = ['claude', 'gemini', 'codex'];
    const keys = {};

    for (const provider of providers) {
      try {
        const result = await apiKeysAPI.get(provider);
        if (result.success && result.key) {
          keys[provider] = result.key;
        }
      } catch (error) {
        console.error(`Failed to load ${provider} API key:`, error);
      }
    }

    setApiKeys(keys);
  };

  const handleSaveKey = async (provider) => {
    setSaving((prev) => ({ ...prev, [provider]: true }));
    setSaved((prev) => ({ ...prev, [provider]: false }));

    try {
      const result = await apiKeysAPI.set(provider, apiKeys[provider]);
      if (result.success) {
        setSaved((prev) => ({ ...prev, [provider]: true }));
        setTimeout(() => {
          setSaved((prev) => ({ ...prev, [provider]: false }));
        }, 2000);
      }
    } catch (error) {
      console.error(`Failed to save ${provider} API key:`, error);
    } finally {
      setSaving((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const providers = [
    { id: 'claude', name: 'Claude', color: 'bg-orange-500', description: 'Anthropic Claude API' },
    { id: 'gemini', name: 'Gemini', color: 'bg-blue-500', description: 'Google Gemini API' },
    { id: 'codex', name: 'Codex', color: 'bg-green-500', description: 'OpenAI Codex API' },
  ];

  const formatKey = (key) => {
    if (!key) return '';
    if (key.length <= 8) return key;
    return key.slice(0, 8) + '...' + key.slice(-4);
  };

  return (
    <div className="p-6">
      {/* 头部 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">系统设置</h1>
        <p className="text-gray-600 dark:text-gray-400">配置应用和 AI 助手</p>
      </div>

      {/* API 密钥配置 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">API 密钥配置</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                配置 AI 助手的 API 密钥，密钥将安全存储在系统密钥链中
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {providers.map((provider) => (
            <div key={provider.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold',
                      provider.color
                    )}
                  >
                    {provider.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{provider.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{provider.description}</p>
                  </div>
                </div>

                {saved[provider.id] && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">已保存</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showKeys[provider.id] ? 'text' : 'password'}
                    value={apiKeys[provider.id]}
                    onChange={(e) =>
                      setApiKeys((prev) => ({ ...prev, [provider.id]: e.target.value }))
                    }
                    placeholder="输入 API 密钥"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700"
                  />
                  <button
                    onClick={() =>
                      setShowKeys((prev) => ({ ...prev, [provider.id]: !prev[provider.id] }))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showKeys[provider.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => handleSaveKey(provider.id)}
                  disabled={saving[provider.id]}
                  className={cn(
                    'px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors',
                    saving[provider.id] && 'opacity-75 cursor-not-allowed'
                  )}
                >
                  {saving[provider.id] ? (
                    '保存中...'
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      保存
                    </span>
                  )}
                </button>
              </div>

              {apiKeys[provider.id] && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  当前密钥: {formatKey(apiKeys[provider.id])}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 安全提示 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">安全提示</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• API 密钥将使用系统密钥链（keytar）安全存储</li>
              <li>• 密钥仅存储在本地，不会上传到任何服务器</li>
              <li>• 请妥善保管您的 API 密钥，不要与他人分享</li>
              <li>• 定期更换 API 密钥以提高安全性</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 其他设置 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">其他设置</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            更多设置功能开发中...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
