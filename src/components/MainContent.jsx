import React from 'react';
import useStore from '@stores/useStore';
import WorkspaceView from './views/WorkspaceView';
import SessionsView from './views/SessionsView';
import BoardsView from './views/BoardsView';
import PlaceholderViews from './views/PlaceholderViews';
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
        return <PlaceholderViews.DocumentsView />;
      case 'database':
        return <PlaceholderViews.DatabaseView />;
      case 'terminal':
        return <PlaceholderViews.TerminalView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <WorkspaceView />;
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="h-full overflow-y-auto">{renderView()}</div>
    </div>
  );
};

export default MainContent;
