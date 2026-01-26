import { useWindowManager } from '../windows/WindowManager';

export const TaskbarIcons = () => {
  const { windows, focusWindow } = useWindowManager();

  return (
    <>
      {windows.map((window) => (
        <button
          key={window.id}
          onClick={() => focusWindow(window.id)}
          className={`px-3 py-1 rounded-sm text-sm font-medium transition-all flex items-center gap-2 ${
            window.isFocused
              ? 'bg-gray-400 dark:bg-gray-600 text-white shadow-inner'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span>{window.icon}</span>
          <span className="hidden sm:inline">{window.title}</span>
        </button>
      ))}
    </>
  );
};
