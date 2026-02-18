import React from 'react';
import { MessageSquare, Kanban, FileText, Database, Terminal, Settings, Layout } from 'lucide-react';
import useStore from '@stores/useStore';
import WorkspaceView from './views/WorkspaceView';
import SessionsView from './views/SessionsView';
import BoardsView from './views/BoardsView';
import DocumentsView from './views/DocumentsView';
import DatabaseView from './views/DatabaseView';
import TerminalView from './views/TerminalView';
import SettingsView from './views/SettingsView';

const MainContent = () => {
  const { activeView } = useStore();

  const renderView = () => {
    switch (activeView) {
      case 'workspace':
        return <WorkspaceView />;
      case 'sessions':
        return <SessionsView />;
      case 'boards':
        return <BoardsView />;
      case 'documents':
        return <DocumentsView />;
      case 'database':
        return <DatabaseView />;
      case 'terminal':
        return <TerminalView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <WorkspaceView />;
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="h-full overflow-y-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default MainContent;
