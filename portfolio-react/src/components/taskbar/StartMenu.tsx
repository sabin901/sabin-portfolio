import { motion } from 'framer-motion';
import { useWindowManager } from '../windows/WindowManager';

interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu = ({ onClose }: StartMenuProps) => {
  const { openWindow } = useWindowManager();

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', action: () => openWindow('home') },
    { id: 'projects', label: 'Projects', icon: '📁', action: () => openWindow('projects') },
    { id: 'about', label: 'About', icon: '📄', action: () => openWindow('about') },
    { id: 'skills', label: 'Skills', icon: '🛠️', action: () => openWindow('skills') },
    { id: 'contact', label: 'Contact', icon: '✉️', action: () => openWindow('contact') },
    { id: 'resume', label: 'Resume', icon: '📋', action: () => openWindow('resume') },
  ];

  const handleItemClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-14 left-2 w-64 bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-600 shadow-2xl rounded-lg overflow-hidden z-[70]"
    >
      {/* Menu Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 font-bold text-sm">
        Sabin Raut - Portfolio
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.action)}
            className="w-full px-4 py-3 text-left hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 group"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {item.label}
            </span>
          </button>
        ))}

        {/* Separator */}
        <div className="border-t border-gray-300 dark:border-gray-600 my-2" />

        {/* Footer Actions */}
        <button
          onClick={onClose}
          className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
        >
          <span className="text-xl">❌</span>
          <span className="text-gray-600 dark:text-gray-400">Close Menu</span>
        </button>
      </div>
    </motion.div>
  );
};
