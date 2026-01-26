import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { text: 'Initializing terminal...', icon: '⚡' },
    { text: 'Loading portfolio data...', icon: '📁' },
    { text: 'Preparing commands...', icon: '💻' },
    { text: 'Setting up environment...', icon: '🔧' },
    { text: 'Almost ready...', icon: '✨' },
  ];

  const welcomeMessage = useTypewriter(
    [
      'Welcome to Sabin Raut\'s Portfolio Terminal',
      'Initializing system...',
      'Loading professional profile...',
      'Ready to explore!',
    ],
    60
  );

  useEffect(() => {
    const totalDuration = 2500;
    const stepDuration = totalDuration / loadingSteps.length;
    const progressInterval = totalDuration / 100;

    // Progress bar
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(progressTimer);
        return prev;
      });
    }, progressInterval);

    // Loading steps
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, stepDuration);

    // Complete loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, totalDuration + 300);

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0d1117]"
        >
          {/* Terminal Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(201, 209, 217, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201, 209, 217, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
            {/* Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="text-sm text-[#8b949e] font-mono">Terminal — Loading</span>
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#58a6ff] mb-2 font-mono">
                {welcomeMessage}
                <span className="animate-pulse text-[#3fb950]">|</span>
              </div>
            </motion.div>

            {/* Loading Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">{loadingSteps[currentStep]?.icon}</span>
                <span className="text-[#c9d1d9] text-sm font-mono">
                  {loadingSteps[currentStep]?.text}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#161b22] rounded-full h-2 overflow-hidden border border-[#30363d]">
                <motion.div
                  className="bg-gradient-to-r from-[#3fb950] to-[#58a6ff] h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="text-xs text-[#8b949e] mt-2 font-mono">{progress}%</div>
            </motion.div>

            {/* Terminal Prompt Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-left bg-[#161b22] border border-[#30363d] rounded-lg p-4"
            >
              <div className="text-[#8b949e] text-xs mb-2 font-mono">
                ──────────────────────────────────────────────────────────────
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#3fb950] font-bold font-mono">$</span>
                <span className="text-[#c9d1d9] font-mono">help</span>
              </div>
              <div className="text-[#8b949e] text-xs ml-4 font-mono">
                Available commands: help, whoami, ls, cat, resume, contact...
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-[#3fb950] font-bold font-mono">
                  <span className="text-[#58a6ff]">sabin@portfolio</span>
                  <span className="text-[#8b949e]">:</span>
                  <span className="text-[#79c0ff]">~</span>
                  <span className="text-[#8b949e]">$</span>
                </span>
                <span className="animate-pulse text-[#3fb950] font-mono">|</span>
              </div>
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center gap-2 mt-8"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-[#3fb950] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
