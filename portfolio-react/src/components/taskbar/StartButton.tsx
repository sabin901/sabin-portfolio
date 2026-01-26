import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartMenu } from './StartMenu';

export const StartButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-sm rounded-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-blue-700"
        aria-label="Start menu"
      >
        <span className="text-lg">🪟</span>
        <span>Start</span>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-[60]"
              onClick={() => setIsMenuOpen(false)}
            />
            <StartMenu onClose={() => setIsMenuOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
