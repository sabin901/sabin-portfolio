import { StartButton } from './StartButton';
import { TaskbarIcons } from './TaskbarIcons';
import { SystemTray } from './SystemTray';

export const Taskbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-t-2 border-gray-400 dark:border-gray-600 shadow-lg z-50 flex items-center px-2">
      {/* Start Button */}
      <StartButton />

      {/* Taskbar Icons (Open Windows) */}
      <div className="flex-1 flex items-center gap-1 px-2">
        <TaskbarIcons />
      </div>

      {/* System Tray */}
      <SystemTray />
    </div>
  );
};
