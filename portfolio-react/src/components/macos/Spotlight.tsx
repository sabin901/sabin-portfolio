import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../windows/WindowManager';

export const Spotlight = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow } = useWindowManager();

  const items = [
    { id: 'home', label: 'Home', icon: '🏠', windowId: 'home', category: 'Portfolio' },
    { id: 'projects', label: 'Projects', icon: '📁', windowId: 'projects', category: 'Portfolio' },
    { id: 'about', label: 'About Me', icon: '📄', windowId: 'about', category: 'Portfolio' },
    { id: 'skills', label: 'Skills', icon: '🛠️', windowId: 'skills', category: 'Portfolio' },
    { id: 'contact', label: 'Contact', icon: '✉️', windowId: 'contact', category: 'Portfolio' },
    { id: 'resume', label: 'Resume', icon: '📋', windowId: 'resume', category: 'Portfolio' },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (windowId: string) => {
    openWindow(windowId);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            onClick={() => {
              setIsOpen(false);
              setSearchTerm('');
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[201]"
          >
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xl">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white text-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && filteredItems.length > 0) {
                      handleSelect(filteredItems[0].windowId);
                    }
                  }}
                />
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                  ⌘K
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.windowId)}
                      className="w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-left"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.category}</div>
                      </div>
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                        Return
                      </kbd>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
