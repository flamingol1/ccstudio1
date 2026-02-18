import React, { useEffect, useState } from 'react';
import { Layout, Database, Terminal, FileText, Settings } from 'lucide-react';
import Sidebar from '@components/Sidebar';
import MainContent from '@components/MainContent';
import useStore from '@stores/useStore';

function App() {
  const { activeView, setActiveView } = useStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 初始化应用
    const initApp = async () => {
      // 检查 Electron API 是否可用
      if (window.electronAPI) {
        console.log('Electron API available');
      }
      setIsInitialized(true);
    };

    initApp();
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
