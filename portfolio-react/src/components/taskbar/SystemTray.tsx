export const SystemTray = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-center gap-2 px-2">
      {/* Volume */}
      <button className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors">
        <span className="text-sm">🔊</span>
      </button>

      {/* Network */}
      <button className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors">
        <span className="text-sm">🌐</span>
      </button>

      {/* Time */}
      <div className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
        {currentTime}
      </div>
    </div>
  );
};
