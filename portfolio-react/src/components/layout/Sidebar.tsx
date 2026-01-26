import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeSection: string;
}

export const Sidebar = ({ activeSection }: SidebarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#work', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 overflow-y-auto pt-20 pb-8 px-6 hidden lg:block"
    >
      {/* Navigation */}
      <nav className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Navigation
        </h3>
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tech Stack */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Python', 'SQL', 'React', 'TypeScript', 'AWS', 'C#'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Metrics
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• 8+ major projects</li>
          <li>• 3+ years experience</li>
          <li>• 50+ students mentored</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Contact
        </h3>
        <div className="space-y-2 text-sm">
          <a
            href="mailto:sabinraut343@gmail.com"
            className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            sabinraut343@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/sabin-raut"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            linkedin.com/in/sabin-raut
          </a>
          <a
            href="https://github.com/sabin901"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            github.com/sabin901
          </a>
        </div>
      </div>
    </motion.aside>
  );
};
