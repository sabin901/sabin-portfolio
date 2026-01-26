import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../windows/WindowManager';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  windowId: string;
}

export const DesktopIcon = ({ label, icon, windowId }: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const { openWindow } = useWindowManager();

  const handleDoubleClick = () => {
    openWindow(windowId);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    // Deselect other icons
    setTimeout(() => setIsSelected(false), 200);
  };

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 flex items-center justify-center text-4xl rounded-lg mb-2 transition-all ${
          isSelected
            ? 'bg-blue-500/20 ring-2 ring-blue-500'
            : 'bg-white/10 hover:bg-white/20'
        }`}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={`text-xs text-center px-2 py-1 rounded transition-all ${
          isSelected
            ? 'bg-blue-500 text-white'
            : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white group-hover:bg-white dark:group-hover:bg-gray-700'
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
};
