import { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import { projects, getProjectById } from '../../data/projects';
import { ProjectModal } from './ProjectModal';
import { ExperienceTimeline } from './ExperienceTimeline';
import { CodeSnippets } from './CodeSnippets';

export const TerminalPortfolio = () => {
  const [commandHistory, setCommandHistory] = useState<Array<{ command: string; output: string }>>([]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showTerminal, setShowTerminal] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const welcomeMessage = useTypewriter(
    ['Welcome to Sabin Raut\'s Portfolio', 'Type "help" to see commands'],
    60
  );

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'code', 'experience', 'education', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case 'help':
        output = `╔═══════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                      ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  help        - Show this help message                      ║
║  whoami      - Display professional profile                 ║
║  about       - Navigate to About section                   ║
║  projects    - View all projects                           ║
║  skills      - View technical skills                      ║
║  experience  - Work experience timeline                     ║
║  education   - Education details                           ║
║  code        - View code snippets                          ║
║  stats       - Portfolio statistics                        ║
║  resume      - Download resume PDF                         ║
║  contact     - Contact information                         ║
║  github      - Open GitHub profile                         ║
║  linkedin    - Open LinkedIn profile                       ║
║  open <id>   - Open project details                        ║
║  clear       - Clear terminal                              ║
║                                                             ║
║  Tip: Use ↑↓ for command history, Tab for completion      ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`;
        break;
      case 'whoami':
        output = `╔═══════════════════════════════════════════════════════════╗
║              SABIN RAUT - PROFESSIONAL PROFILE              ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  Name:        Sabin Raut                                   ║
║  Title:       Software Developer & Data Engineer           ║
║  Education:   B.S. Information Systems & Finance          ║
║  University:  St. Cloud State University                   ║
║  GPA:         3.8/4.0                                       ║
║  Status:      Available for hire | Open to relocate        ║
║                                                             ║
║  Experience:  3+ years                                     ║
║  Projects:    8+ completed                                  ║
║  Mentored:    50+ students                                  ║
║                                                             ║
║  Core Skills: Python, SQL, React, TypeScript, AWS,         ║
║               Financial Modeling, Data Analytics            ║
║                                                             ║
║  Philosophy:  Building tools that save time and reduce     ║
║               errors. Focus on measurable impact.           ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`;
        break;
      case 'stats':
        output = `╔═══════════════════════════════════════════════════════════╗
║                    PORTFOLIO STATISTICS                     ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  Years Experience:     3+                                    ║
║  Projects Completed:  8+                                    ║
║  Students Mentored:    50+                                  ║
║  Technologies:        15+                                    ║
║  GitHub Repos:        8+                                    ║
║                                                             ║
║  Key Achievements:                                          ║
║    • 40% reduction in scheduling conflicts                  ║
║    • 30% reduction in manual effort                        ║
║    • 35% improvement in student comprehension             ║
║    • 20% increase in campaign ROI                          ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`;
        break;
      case 'experience':
        scrollToSection('experience');
        output = '✓ Navigating to Experience section...';
        break;
      case 'education':
        scrollToSection('education');
        output = `╔═══════════════════════════════════════════════════════════╗
║                      EDUCATION                               ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  Institution:  St. Cloud State University                  ║
║  Degree:       B.S. Information Systems & Finance          ║
║  Expected:     2024                                        ║
║  GPA:          3.8/4.0                                      ║
║                                                             ║
║  Relevant Coursework:                                       ║
║    • Database Management                                    ║
║    • Financial Modeling                                     ║
║    • Data Analytics                                         ║
║    • Business Intelligence                                  ║
║    • Systems Integration                                    ║
║    • Corporate Finance                                      ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`;
        break;
      case 'code':
        scrollToSection('code');
        output = '✓ Navigating to Code Snippets section...';
        break;
      case 'open':
        const projectId = args[0];
        if (projectId) {
          const project = getProjectById(projectId);
          if (project) {
            setSelectedProject(projectId);
            output = `✓ Opening ${project.title}...`;
          } else {
            output = `✗ Project not found: ${projectId}\nType 'projects' to see available projects.`;
          }
        } else {
          output = 'Usage: open <project-id>\nExample: open application-manager';
        }
        break;
      case 'about':
        scrollToSection('about');
        output = '✓ Navigating to About section...';
        break;
      case 'projects':
        scrollToSection('projects');
        output = `╔═══════════════════════════════════════════════════════════╗
║                      PROJECTS                               ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
${projects.map(p => `║  ${p.id.padEnd(25)} ${p.category.padEnd(20)} ║`).join('\n')}
║                                                             ║
║  Use 'open <project-id>' to view details                    ║
║  Example: open application-manager                          ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`;
        break;
      case 'skills':
        scrollToSection('skills');
        output = '✓ Navigating to Skills section...';
        break;
      case 'resume':
        window.open('/images/resume-example.pdf', '_blank');
        output = '✓ Opening resume PDF in new tab...';
        break;
      case 'contact':
        scrollToSection('contact');
        output = '✓ Navigating to Contact section...';
        break;
      case 'github':
        window.open('https://github.com/sabin901', '_blank');
        output = '✓ Opening GitHub profile...';
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/sabin-raut', '_blank');
        output = '✓ Opening LinkedIn profile...';
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      default:
        output = `✗ Command not found: ${command}\nType 'help' for available commands.`;
    }

    setCommandHistory(prev => [...prev, { command: cmd, output }]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex].command);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = ['help', 'whoami', 'about', 'projects', 'skills', 'experience', 'education', 'code', 'stats', 'resume', 'contact', 'github', 'linkedin', 'clear', 'open'].filter(cmd => 
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      }
    }
  };

  const sections = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#c9d1d9] font-mono overflow-x-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(88, 166, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(88, 166, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Fixed Navigation Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 bottom-0 z-40 w-20 bg-[#161b22]/95 backdrop-blur-md border-r-2 border-[#30363d] flex flex-col items-center py-6 shadow-2xl"
      >
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                scrollToSection(section.id);
                setInput(section.id);
                handleCommand(section.id);
              }}
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${
                activeSection === section.id
                  ? 'bg-[#58a6ff] text-white shadow-lg scale-110'
                  : 'bg-[#0d1117] text-[#8b949e] hover:bg-[#30363d] hover:text-[#58a6ff] hover:scale-105'
              }`}
              title={section.label}
            >
              {section.icon}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Fixed Terminal Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-20 right-0 z-50 bg-[#161b22]/95 backdrop-blur-md border-b-2 border-[#30363d] px-6 py-4 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-lg"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-lg"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-lg"></div>
            </div>
            <div>
              <span className="text-sm text-[#8b949e] font-semibold">sabin@portfolio</span>
              <span className="text-[#58a6ff] mx-2">:</span>
              <span className="text-[#79c0ff]">~</span>
              <span className="text-[#3fb950] mx-2">$</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6 text-sm">
              {sections.slice(1).map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    scrollToSection(section.id);
                    setInput(section.id);
                    handleCommand(section.id);
                  }}
                  className={`transition-all font-medium ${
                    activeSection === section.id
                      ? 'text-[#58a6ff] scale-110'
                      : 'text-[#8b949e] hover:text-[#58a6ff] hover:scale-110'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className="px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#8b949e] hover:text-[#58a6ff] hover:border-[#58a6ff] transition-all text-sm"
            >
              {showTerminal ? 'Hide Terminal' : 'Show Terminal'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-20 right-0 h-1 bg-[#30363d] z-[60]"
        style={{ originX: 0 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#58a6ff] to-[#3fb950]"
          style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        />
      </motion.div>

      {/* Portfolio Content */}
      <div className="pt-20 pl-20 relative z-10">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Terminal Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">whoami</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] via-[#79c0ff] to-[#3fb950] mb-6 tracking-tight"
            >
              Sabin Raut
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-4xl text-[#c9d1d9] mb-4 font-semibold"
            >
              Software Developer & Data Engineer
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-[#8b949e] mb-12"
            >
              B.S. Information Systems & Finance • St. Cloud State University
              <br />
              <span className="text-[#58a6ff]">GPA: 3.8/4.0</span> • Available for hire
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
            >
              {[
                { value: '3+', label: 'Years Experience', icon: '💼', color: 'from-[#58a6ff] to-[#79c0ff]' },
                { value: '8+', label: 'Projects', icon: '🚀', color: 'from-[#3fb950] to-[#58a6ff]' },
                { value: '50+', label: 'Students Mentored', icon: '👥', color: 'from-[#79c0ff] to-[#3fb950]' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-[#30363d] rounded-xl p-6 hover:border-[#58a6ff] transition-all shadow-xl hover:shadow-2xl"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#8b949e] font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <button
                onClick={() => {
                  scrollToSection('about');
                  setInput('about');
                  handleCommand('about');
                }}
                className="px-10 py-4 bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#3fb950] text-white rounded-xl transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Explore Portfolio
              </button>
              <button
                onClick={() => {
                  setInput('resume');
                  handleCommand('resume');
                }}
                className="px-10 py-4 bg-[#161b22] border-2 border-[#58a6ff] hover:bg-[#58a6ff]/10 text-[#58a6ff] rounded-xl transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Download Resume
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex justify-center gap-8"
            >
              {[
                { name: 'GitHub', url: 'https://github.com/sabin901', icon: '🐙' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/sabin-raut', icon: '💼' },
                { name: 'Email', url: 'mailto:sabinraut343@gmail.com', icon: '📧' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 px-6 py-3 bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] rounded-lg transition-all text-[#8b949e] hover:text-[#58a6ff] hover:scale-110"
                >
                  <span>{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg mb-4">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">cat about</span>
              </div>
              <h2 className="text-6xl font-black text-[#c9d1d9] mb-2">About Me</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#58a6ff] to-[#3fb950] rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-[#30363d] rounded-2xl p-10 space-y-6 hover:border-[#58a6ff] transition-all shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-xl text-[#c9d1d9] leading-relaxed mb-4">
                    Hybrid Information Systems & Finance professional with <strong className="text-[#58a6ff]">3+ years of experience</strong> designing and implementing data-driven systems, analytics solutions, and workflow automations.
                  </p>
                  <p className="text-lg text-[#8b949e] leading-relaxed">
                    Currently pursuing a dual degree in Information Systems and Finance at St. Cloud State University, combining technical expertise with business acumen to solve complex problems at the intersection of technology and finance.
                  </p>
                </div>
                <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6">
                  <div className="text-[#3fb950] mb-4 font-bold text-lg">Quick Facts</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#8b949e]">Location:</span>
                      <span className="text-[#c9d1d9]">St. Cloud, MN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b949e]">Status:</span>
                      <span className="text-[#3fb950]">Available for hire</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b949e]">Response:</span>
                      <span className="text-[#c9d1d9]">Within 24hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b949e]">Relocation:</span>
                      <span className="text-[#3fb950]">Open</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-[#30363d]">
                <div className="text-[#3fb950] mb-6 font-bold text-xl flex items-center gap-2">
                  <span>▸</span> Key Achievements
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Led digital scheduling system redesign, reducing conflicts by 40%',
                    'Built automation tools reducing manual effort by 30%',
                    'Mentored 50+ students in computer science and finance',
                    'Developed interactive learning tools improving comprehension by 35%',
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-[#0d1117] border border-[#30363d] rounded-lg hover:border-[#3fb950] transition-colors">
                      <span className="text-[#3fb950] text-xl mt-0.5">✓</span>
                      <span className="text-[#c9d1d9]">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg mb-4">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">ls projects</span>
              </div>
              <h2 className="text-6xl font-black text-[#c9d1d9] mb-2">Featured Projects</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#58a6ff] to-[#3fb950] rounded-full"></div>
              <p className="text-[#8b949e] mt-4 text-lg">Click any project to view detailed case study</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => {
                    setSelectedProject(project.id);
                    setInput(`open ${project.id}`);
                    handleCommand(`open ${project.id}`);
                  }}
                  className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-[#30363d] rounded-2xl p-6 hover:border-[#58a6ff] transition-all shadow-2xl hover:shadow-[#58a6ff]/20 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 bg-gradient-to-r from-[#58a6ff] to-[#79c0ff] rounded-lg text-white text-xs font-bold`}>
                      {project.category}
                    </div>
                    <div className="text-[#3fb950] text-xs font-semibold">
                      {Object.keys(project.results).length} results
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#c9d1d9] mb-3 group-hover:text-[#58a6ff] transition-colors">{project.title}</h3>
                  <p className="text-[#8b949e] leading-relaxed mb-4 line-clamp-3">{project.problem}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[#0d1117] border border-[#30363d] rounded-lg text-xs text-[#8b949e]">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-[#0d1117] border border-[#30363d] rounded-lg text-xs text-[#8b949e]">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="text-[#58a6ff] font-semibold text-sm group-hover:gap-2 transition-all flex items-center">
                    <span>View Details</span>
                    <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Snippets Section */}
        <section id="code" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg mb-4">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">cat code</span>
              </div>
              <h2 className="text-6xl font-black text-[#c9d1d9] mb-2">Code Snippets</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#58a6ff] to-[#3fb950] rounded-full"></div>
              <p className="text-[#8b949e] mt-4 text-lg">Real code from my projects showcasing technical skills</p>
            </motion.div>
            <CodeSnippets />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg mb-4">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">cat experience</span>
              </div>
              <h2 className="text-6xl font-black text-[#c9d1d9] mb-2">Work Experience</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#58a6ff] to-[#3fb950] rounded-full"></div>
            </motion.div>
            <ExperienceTimeline />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg mb-4">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">cat education</span>
              </div>
              <h2 className="text-6xl font-black text-[#c9d1d9] mb-2">Education</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#58a6ff] to-[#3fb950] rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-[#30363d] rounded-2xl p-10 hover:border-[#58a6ff] transition-all shadow-2xl"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="text-6xl">🎓</div>
                <div>
                  <h3 className="text-3xl font-bold text-[#c9d1d9] mb-2">St. Cloud State University</h3>
                  <div className="text-xl text-[#58a6ff] mb-2">B.S. Information Systems & Finance</div>
                  <div className="text-[#8b949e]">Expected Graduation: 2024</div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#30363d]">
                <div className="text-[#3fb950] mb-4 font-bold text-xl">GPA: 3.8/4.0</div>
                <div className="text-[#3fb950] mb-4 font-semibold text-lg">Relevant Coursework:</div>
                <div className="flex flex-wrap gap-3">
                  {['Database Management', 'Financial Modeling', 'Data Analytics', 'Business Intelligence', 'Systems Integration', 'Corporate Finance', 'Data Structures & Algorithms'].map((course) => (
                    <span key={course} className="px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] hover:border-[#58a6ff] transition-colors">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg mb-4">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">cat skills</span>
              </div>
              <h2 className="text-6xl font-black text-[#c9d1d9] mb-2">Skills & Technologies</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#58a6ff] to-[#3fb950] rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-[#30363d] rounded-2xl p-10 hover:border-[#58a6ff] transition-all shadow-2xl"
            >
              <div className="mb-10">
                <div className="text-[#3fb950] mb-6 text-2xl font-bold flex items-center gap-3">
                  <span>▸</span> Technical Skills
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Python', level: 90, years: '3+' },
                    { name: 'SQL', level: 90, years: '3+' },
                    { name: 'React', level: 80, years: '2+' },
                    { name: 'TypeScript', level: 80, years: '2+' },
                    { name: 'C#', level: 75, years: '2+' },
                    { name: 'Java', level: 70, years: '1+' },
                    { name: 'AWS', level: 70, years: '1+' },
                    { name: 'FastAPI', level: 70, years: '1+' },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-[#0d1117] border-2 border-[#30363d] rounded-xl hover:border-[#3fb950] transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#c9d1d9] font-semibold">{skill.name}</span>
                        <span className="text-[#8b949e] text-xs">{skill.years}</span>
                      </div>
                      <div className="w-full bg-[#161b22] rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-[#3fb950] to-[#58a6ff] rounded-full"
                        />
                      </div>
                      <div className="text-[#3fb950] text-xs mt-1">{skill.level}%</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[#3fb950] mb-6 text-2xl font-bold flex items-center gap-3">
                  <span>▸</span> Finance & Analytics
                </div>
                <div className="flex flex-wrap gap-4">
                  {['Financial Modeling', 'Forecasting', 'Risk Analysis', 'Excel', 'Data Analytics', 'Tableau', 'KPI Development', 'Budgeting'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="px-5 py-3 bg-[#0d1117] border-2 border-[#30363d] rounded-xl text-[#c9d1d9] hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all font-semibold cursor-default shadow-lg"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg mb-4">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#58a6ff]">cat contact</span>
              </div>
              <h2 className="text-6xl font-black text-[#c9d1d9] mb-2">Get In Touch</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#58a6ff] to-[#3fb950] rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-[#30363d] rounded-2xl p-10 hover:border-[#58a6ff] transition-all shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: '📧', label: 'Email', value: 'sabinraut343@gmail.com', href: 'mailto:sabinraut343@gmail.com', color: 'from-[#58a6ff] to-[#79c0ff]' },
                  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/sabin-raut', href: 'https://linkedin.com/in/sabin-raut', color: 'from-[#3fb950] to-[#58a6ff]' },
                  { icon: '🐙', label: 'GitHub', value: 'github.com/sabin901', href: 'https://github.com/sabin901', color: 'from-[#79c0ff] to-[#3fb950]' },
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center p-6 bg-[#0d1117] border-2 border-[#30363d] rounded-xl hover:border-[#58a6ff] transition-all shadow-lg"
                  >
                    <div className="text-4xl mb-3">{contact.icon}</div>
                    <div className={`text-sm font-bold bg-gradient-to-r ${contact.color} bg-clip-text text-transparent mb-2`}>
                      {contact.label}
                    </div>
                    <div className="text-[#c9d1d9] text-sm text-center">{contact.value}</div>
                  </motion.a>
                ))}
              </div>
              <div className="pt-8 border-t border-[#30363d] text-center">
                <div className="text-[#3fb950] mb-3 font-bold text-xl">Status</div>
                <div className="text-[#c9d1d9] text-lg mb-2">✅ Available for hire</div>
                <div className="text-[#8b949e]">Response within 24 hours • St. Cloud, MN • Open to relocate</div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Fixed Terminal - Bottom */}
      {showTerminal && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-20 right-0 z-40 bg-[#161b22]/95 backdrop-blur-md border-t-2 border-[#30363d] shadow-2xl"
        >
          <div
            ref={terminalRef}
            className="max-h-64 overflow-y-auto p-6 text-sm"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#30363d #161b22' }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Welcome */}
            {commandHistory.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#58a6ff] mb-4 text-lg"
              >
                {welcomeMessage}
                <span className="animate-pulse text-[#3fb950]">|</span>
              </motion.div>
            )}

            {/* History */}
            {commandHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#3fb950] font-bold">$</span>
                  <span className="text-[#c9d1d9] font-semibold">{item.command}</span>
                </div>
                {item.output && (
                  <div className="text-[#8b949e] ml-4 whitespace-pre-wrap leading-relaxed">
                    {item.output}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-6">
              <span className="text-[#3fb950] font-bold text-lg">
                <span className="text-[#58a6ff]">sabin@portfolio</span>
                <span className="text-[#8b949e]">:</span>
                <span className="text-[#79c0ff]">~</span>
                <span className="text-[#8b949e]">$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#c9d1d9] font-mono text-lg"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="Type 'help' for commands"
              />
              <span className="animate-pulse text-[#3fb950] text-xl">|</span>
            </form>
          </div>
        </motion.div>
      )}

      {/* Project Modal */}
      <ProjectModal projectId={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
