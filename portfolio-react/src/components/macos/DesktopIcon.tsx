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
      {/* Icon - macOS Style with glow */}
      <div
        className={`w-20 h-20 flex items-center justify-center text-5xl rounded-3xl mb-2 transition-all ${
          isSelected
            ? 'bg-blue-500/40 ring-2 ring-blue-400'
            : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20'
        }`}
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
          boxShadow: isSelected ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
        }}
      >
        {icon}
      </div>

      {/* Label - macOS Style */}
      <span
        className={`text-xs text-center px-3 py-1 rounded-lg transition-all max-w-[100px] truncate ${
          isSelected
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-black/40 backdrop-blur-sm text-white group-hover:bg-black/60 shadow-sm'
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
};
