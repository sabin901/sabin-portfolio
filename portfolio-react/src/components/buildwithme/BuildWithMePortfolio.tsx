import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePage } from './HomePage';
import { MainHomePage } from './MainHomePage';
import { PromptForge } from './PromptForge';
import { ProjectStories } from './ProjectStories';
import { HowIThink } from './HowIThink';
import { NowPage } from './NowPage';

export const BuildWithMePortfolio = () => {
  const [currentSection, setCurrentSection] = useState<'landing' | 'home' | 'skills' | 'projects' | 'thinking' | 'now'>('landing');
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (section: typeof currentSection) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const sections = [
    { id: 'home', label: 'Home', path: 'home' },
    { id: 'skills', label: 'Skills', path: 'skills' },
    { id: 'projects', label: 'Projects', path: 'projects' },
    { id: 'thinking', label: 'About', path: 'thinking' },
    { id: 'now', label: 'Contact', path: 'now' },
  ];

  if (currentSection === 'landing') {
    return (
      <>
        <HomePage onExplore={() => navigateToSection('home')} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Professional Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 20
            ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm'
            : 'bg-white/60 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Professional Logo */}
            <motion.button
              onClick={() => navigateToSection('landing')}
              className="group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-all duration-200 shadow-md group-hover:shadow-lg">
                  <span className="text-white font-bold text-base tracking-tight">SR</span>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-gray-900 opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={false}
                />
              </div>
            </motion.button>

            {/* Professional Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.map((item, index) => {
                const isActive = currentSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <motion.button
                      onClick={() => navigateToSection(item.id as typeof currentSection)}
                      className="relative px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active Underline */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                          layoutId="activeNavUnderline"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover Underline */}
                      {!isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"
                        />
                      )}

                      <span className="relative">{item.label}</span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="/images/resume-example.pdf"
                download="Sabin-Raut-Resume.pdf"
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Resume
              </motion.a>
            </div>

            {/* Professional Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-5 h-[2px] bg-gray-900 rounded-full"
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-[2px] bg-gray-900 rounded-full"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-5 h-[2px] bg-gray-900 rounded-full"
                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Professional Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl shadow-xl"
              >
                <div className="px-6 py-6 space-y-1">
                  {sections.map((item, index) => {
                    const isActive = currentSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => navigateToSection(item.id as typeof currentSection)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                  <motion.a
                    href="/images/resume-example.pdf"
                    download="Sabin-Raut-Resume.pdf"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: sections.length * 0.05, duration: 0.3 }}
                    className="w-full text-left px-4 py-3 rounded-lg text-base font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 mt-2"
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Resume
                  </motion.a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Content */}
      <div className="pt-20">
        {currentSection === 'home' && <MainHomePage />}
        {currentSection === 'skills' && <PromptForge />}
        {currentSection === 'projects' && <ProjectStories />}
        {currentSection === 'thinking' && <HowIThink />}
        {currentSection === 'now' && <NowPage />}
      </div>
    </div>
  );
};
