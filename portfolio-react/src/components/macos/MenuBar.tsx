import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const MenuBar = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    {
      label: 'Sabin Raut',
      items: [
        { label: 'About This Portfolio', action: () => {} },
        { label: 'Preferences...', action: () => {} },
        { separator: true },
        { label: 'Hide Portfolio', action: () => {}, shortcut: '⌘H' },
        { label: 'Hide Others', action: () => {}, shortcut: '⌥⌘H' },
        { label: 'Show All', action: () => {} },
        { separator: true },
        { label: 'Quit Portfolio', action: () => {}, shortcut: '⌘Q' },
      ],
    },
    {
      label: 'File',
      items: [
        { label: 'New Window', action: () => {}, shortcut: '⌘N' },
        { label: 'Open...', action: () => {}, shortcut: '⌘O' },
        { separator: true },
        { label: 'Close Window', action: () => {}, shortcut: '⌘W' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', action: () => {}, shortcut: '⌘Z' },
        { label: 'Redo', action: () => {}, shortcut: '⇧⌘Z' },
        { separator: true },
        { label: 'Cut', action: () => {}, shortcut: '⌘X' },
        { label: 'Copy', action: () => {}, shortcut: '⌘C' },
        { label: 'Paste', action: () => {}, shortcut: '⌘V' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Show Sidebar', action: () => {} },
        { label: 'Enter Full Screen', action: () => {}, shortcut: '⌃⌘F' },
      ],
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', action: () => {}, shortcut: '⌘M' },
        { label: 'Zoom', action: () => {} },
        { separator: true },
        { label: 'Bring All to Front', action: () => {} },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Portfolio Help', action: () => {} },
        { label: 'Keyboard Shortcuts', action: () => {} },
      ],
    },
  ];

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-7 z-[100] flex items-center px-2 text-xs font-medium text-white/90"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* SR Logo (Sabin Raut) */}
      <button
        onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
        className="px-3 py-1 hover:bg-white/10 rounded transition-colors flex items-center justify-center w-8 h-6"
      >
        <span className="text-[10px] font-bold text-white">SR</span>
      </button>

      {/* Menu Items */}
      {menuItems.map((menu) => (
        <div key={menu.label} className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            className={`px-3 py-1 rounded transition-colors ${
              activeMenu === menu.label
                ? 'bg-white/20'
                : 'hover:bg-white/10'
            }`}
          >
            {menu.label}
          </button>

          <AnimatePresence>
            {activeMenu === menu.label && (
              <>
                <div
                  className="fixed inset-0 z-[101]"
                  onClick={() => setActiveMenu(null)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1 z-[102]"
                >
                  {menu.items.map((item, index) => (
                    <div key={index}>
                      {item.separator ? (
                        <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                      ) : (
                        <button
                          onClick={() => {
                            item.action?.();
                            setActiveMenu(null);
                          }}
                          className="w-full text-left px-4 py-1.5 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors text-sm flex items-center justify-between group"
                        >
                          <span>{item.label}</span>
                          {item.shortcut && (
                            <kbd className="text-xs text-gray-400 group-hover:text-white/70">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* System Icons - macOS Style */}
      <div className="ml-auto flex items-center gap-1 px-2">
        <button
          onClick={toggleTheme}
          className="p-1.5 hover:bg-white/10 rounded transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <div className="text-[11px] font-medium px-2">
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
