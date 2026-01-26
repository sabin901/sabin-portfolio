import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { projects } from '../../data/projects';

interface ProjectStory {
  id: string;
  visual: string;
  oneLiner: string;
  problem: string;
  keyDecision: string;
  tradeoff: string;
  outcome: string;
  differentNow: string;
}

const projectStories: Record<string, ProjectStory> = {
  'application-manager': {
    id: 'application-manager',
    visual: '📋',
    oneLiner: "This started messy. I made it calm.",
    problem: "College students struggle to track multiple job applications, deadlines, and interview stages. The chaos of spreadsheets and sticky notes leads to missed opportunities.",
    keyDecision: "Build a Windows desktop app instead of a web app. Why? Students need something that works offline, doesn't require constant internet, and feels native to their workflow.",
    tradeoff: "Desktop apps are harder to update, but they're more reliable for this use case. I chose reliability over convenience.",
    outcome: "A centralized system that reduced scheduling conflicts by 40%. Students could focus on applications instead of managing them.",
    differentNow: "I'd add cloud sync as an option, not a requirement. And I'd make the deadline reminders more proactive — maybe even integrate with calendar apps."
  },
  'neural-muse': {
    id: 'neural-muse',
    visual: '🧠',
    oneLiner: "Complex data needs simple presentation.",
    problem: "Medical teams need to analyze EEG data, but existing tools are either too technical or too simplified. There's no middle ground.",
    keyDecision: "Focus on visualization first, analysis second. If people can't see patterns, they can't act on them.",
    tradeoff: "I could have added more analysis features, but clarity won. A simple, clear visualization beats a complex dashboard that nobody understands.",
    outcome: "An intuitive dashboard that researchers actually use. Real-time processing without overwhelming the interface.",
    differentNow: "I'd add collaborative features — let multiple researchers annotate the same data. And I'd build in export templates for research papers."
  },
  'scsu-event': {
    id: 'scsu-event',
    visual: '🎓',
    oneLiner: "Discovery shouldn't be work.",
    problem: "Students miss campus events because finding them is harder than it should be. Manual browsing through event lists is tedious.",
    keyDecision: "Use recommendation algorithms, but keep them transparent. Show why events are recommended, so users can learn their preferences.",
    tradeoff: "Transparency means more complexity in the UI. But trust is worth it — users need to understand why something is recommended.",
    outcome: "Increased event participation by 25%. Students discovered events they wouldn't have found otherwise.",
    differentNow: "I'd add social features — see what friends are attending. And I'd integrate with calendar apps automatically."
  },
  'weather-analyzer': {
    id: 'weather-analyzer',
    visual: '🌤️',
    oneLiner: "Data tells stories when you know how to listen.",
    problem: "Organizations need to analyze historical weather patterns, identify trends, and make data-driven decisions for planning, risk management, and operational efficiency.",
    keyDecision: "Build a C# application focused on time-series analysis. Prioritize accuracy and statistical rigor over flashy visuals.",
    tradeoff: "Could have used Python for easier ML integration, but C# provided better performance for the specific use case.",
    outcome: "Accurate forecasting models that help organizations plan better. Statistical analysis that identifies meaningful patterns.",
    differentNow: "I'd integrate real-time weather APIs and add machine learning models for improved forecasting accuracy."
  },
  'mac-service': {
    id: 'mac-service',
    visual: '💻',
    oneLiner: "E-commerce shouldn't be complicated.",
    problem: "Service businesses need an online platform to manage orders, payments, customer data, and service scheduling efficiently, replacing manual processes with automated systems.",
    keyDecision: "Build a full-stack TypeScript/React application. Focus on security first, then user experience.",
    tradeoff: "Could have used a simpler solution, but building custom gave full control over the user experience and business logic.",
    outcome: "Complete e-commerce platform with secure payment processing, automated workflows, and centralized customer management.",
    differentNow: "I'd add inventory management, automated email notifications, and an analytics dashboard for business insights."
  },
  'ayur': {
    id: 'ayur',
    visual: '🌿',
    oneLiner: "Health insights should be personal, not generic.",
    problem: "Users lack personalized health insights and wellness tracking tools. Existing solutions are either too complex or don't provide actionable recommendations based on individual health data.",
    keyDecision: "Prioritize privacy and user trust. Build a platform that collects data responsibly and provides clear, actionable insights.",
    tradeoff: "Could have added more features, but simplicity and trust were more important for user adoption.",
    outcome: "A health platform that users actually trust. Personalized insights that help people understand themselves better.",
    differentNow: "I'd add wearable device integration and expand the recommendation engine with more data sources."
  },
  'age-calc': {
    id: 'age-calc',
    visual: '📅',
    oneLiner: "Simple tools solve real problems.",
    problem: "Users need a simple, accurate tool to calculate age, date differences, and time spans for various purposes (legal, planning, analysis). Existing calculators are often cluttered or inaccurate.",
    keyDecision: "Focus on accuracy and simplicity. Handle edge cases properly (leap years, time zones).",
    tradeoff: "Could have added more features, but accuracy and simplicity were the core value proposition.",
    outcome: "A reliable utility tool that people actually use. Clean interface, accurate calculations.",
    differentNow: "I'd add calendar integration and export functionality for documentation purposes."
  }
};

export const MainHomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const keyMetrics = [
    { 
      value: '3+', 
      label: 'Years Professional Experience', 
      color: 'from-blue-600 to-blue-800',
      icon: '💼',
      description: 'Diverse experience spanning operations management, technical development, and academic leadership',
      details: ['Library Operations & System Design', 'Academic Mentoring & Training', 'Data Analytics & Business Intelligence', 'Full-Stack Development']
    },
    { 
      value: '8+', 
      label: 'Technical Projects Delivered', 
      color: 'from-emerald-600 to-emerald-800',
      icon: '🚀',
      description: 'End-to-end development across multiple technology domains',
      details: ['Desktop Applications (C#/.NET)', 'Web Platforms (React/TypeScript)', 'Data Analytics & Visualization Systems', 'E-commerce & Business Applications']
    },
    { 
      value: '50+', 
      label: 'Students Successfully Mentored', 
      color: 'from-indigo-600 to-indigo-800',
      icon: '👥',
      description: 'Proven track record in academic mentorship and skill development',
      details: ['Computer Science & Programming', 'Data Analytics & Statistical Methods', 'Financial Analysis & Modeling', 'Average grade improvement: +1.2 letter grades']
    },
    { 
      value: '40%', 
      label: 'Operational Efficiency Improvement', 
      color: 'from-amber-600 to-amber-800',
      icon: '📊',
      description: 'Measurable impact through process optimization and automation',
      details: ['Workflow Automation & System Integration', 'Scheduling & Resource Optimization', 'Manual Process Elimination & Streamlining']
    },
  ];

  const coreCompetencies = [
    {
      category: 'Technical Execution',
      skills: ['Python', 'SQL', 'JavaScript / TypeScript', 'React', 'C#', 'Java', '.NET', 'FastAPI', 'AWS', 'Git'],
      description: 'Full-stack development, cloud infrastructure, and automation',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Data & Analytics',
      skills: ['Pandas', 'NumPy', 'ETL Pipelines', 'Data Visualization', 'Tableau', 'Statistical Analysis'],
      description: 'Data engineering, analytics, and business intelligence',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Finance & Business',
      skills: ['Financial Modeling', 'Forecasting & Budgeting', 'Risk Analysis', 'KPI Development', 'Excel'],
      description: 'Financial insight paired with technical execution',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      category: 'Professional Skills',
      skills: ['Cross-functional Collaboration', 'Technical Communication', 'Mentorship & Training', 'Process Optimization'],
      description: 'Leadership, communication, and problem-solving',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const achievements = [
    {
      title: 'Led Digital System Redesign',
      impact: '40% reduction in scheduling conflicts',
      context: 'Library Operations Supervisor at SCSU',
    },
    {
      title: 'Built Automation Tools',
      impact: '30% reduction in manual effort',
      context: 'Python and Excel-based solutions',
    },
    {
      title: 'Mentored 50+ Students',
      impact: '1.2 letter-grade average improvement',
      context: 'Academic Success Mentor',
    },
    {
      title: 'Developed Learning Tools',
      impact: '~35% improvement in comprehension',
      context: 'Interactive Python and Java applications',
    },
  ];

  const featuredProjects = projects; // Show all projects

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative py-24 md:py-32 px-6 bg-[#EBEBEB] overflow-hidden">
        {/* Minimalist Geometric Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Corner Line */}
          <div className="absolute top-12 left-12 w-px h-32 bg-gray-900"></div>
          <div className="absolute top-12 left-12 w-32 h-px bg-gray-900"></div>
          
          {/* Bottom Right Corner Line */}
          <div className="absolute bottom-12 right-12 w-px h-32 bg-gray-900"></div>
          <div className="absolute bottom-12 right-12 w-32 h-px bg-gray-900"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight"
              >
                Sabin Raut
              </motion.h1>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-4 font-bold tracking-tight"
              >
                Technology Professional & Systems Analyst
              </motion.p>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-8 space-y-2"
              >
                <p className="text-xl md:text-2xl text-gray-800 font-semibold">
                  IS & Finance
                </p>
                <p className="text-lg md:text-xl text-gray-600">
                  St. Cloud State University
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-600">
                  <span className="flex items-center gap-1">
                    <span>📍</span>
                    <span>St. Cloud, MN | Open to Relocate</span>
                  </span>
                </div>
                <div className="pt-2">
                  <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg font-semibold text-sm">
                    Status: Open to Hire
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <motion.a
                  href="/images/resume-example.pdf"
                  download="Sabin-Raut-Resume.pdf"
                  className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 group"
                  aria-label="Download Resume"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Resume
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://github.com/sabin901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 group"
                  aria-label="View GitHub"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  GitHub
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/sabin-raut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 group"
                  aria-label="View LinkedIn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  LinkedIn
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                {/* Photo Container */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden shadow-2xl border-4 border-white z-10 bg-gray-100"
                >
                  <img
                    src="/images/profile-pic.png"
                    alt="Sabin Raut - Technology Professional & Systems Analyst"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.src = 'https://via.placeholder.com/400x400?text=SR';
                    }}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-xl border-4 border-white"
                >
                  <div className="text-sm font-bold">Available</div>
                  <div className="text-xs opacity-90">Open to hire</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Professional Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-16">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gray-900 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
                
                {/* Value */}
                <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-3`}>
                  {metric.value}
                </div>
                
                {/* Label */}
                <div className="text-sm text-gray-900 font-bold uppercase tracking-wider mb-4">
                  {metric.label}
                </div>
                
                {/* Description */}
                <div className="text-xs text-gray-600 mb-4 leading-relaxed min-h-[40px]">
                  {metric.description}
                </div>
                
                {/* Professional Details */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <ul className="space-y-2 text-left">
                    {metric.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${metric.color} mt-1.5 flex-shrink-0`}></span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          {/* Professional Summary */}
          <section id="summary" className="py-24 px-6 bg-[#EBEBEB] scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Professional Summary
            </h2>
            <div className="bg-white border border-gray-300 rounded-none p-10 md:p-12 space-y-6">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                A <strong className="font-semibold text-gray-900">hybrid Information Systems and Finance professional</strong> with over <strong className="font-semibold text-gray-900">3 years of progressive experience</strong> in designing, developing, and implementing technology solutions that drive operational efficiency and business value. Proven expertise in full-stack development, data engineering, and systems analysis across academic, nonprofit, and startup environments.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Combines strong technical capabilities in software development, database design, and cloud technologies with practical business acumen in financial modeling, risk analysis, and performance optimization. Specializes in building scalable applications, automating workflows, and transforming complex data into actionable insights.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Demonstrated success in leading technical initiatives, mentoring teams, and delivering solutions that result in <strong className="font-semibold text-gray-900">measurable efficiency gains and improved business outcomes</strong>. Open to opportunities in software engineering, data analytics, systems architecture, and technology consulting roles.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

          {/* Featured Projects */}
          <section id="projects" className="py-24 px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 mb-6">Real solutions to real problems</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>{featuredProjects.length} Projects Available</span>
                <span>•</span>
                <span>All with Case Studies</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => {
              const story = projectStories[project.id];
              const projectIcon = story?.visual || '🚀';
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Project Icon & Category */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-4xl">
                        {projectIcon}
                      </div>
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h3>

                    {/* Problem Summary */}
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3 min-h-[60px]">
                      {project.problem}
                    </p>

                    {/* Tech Stack - Minimalist */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-md text-xs font-medium">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons - Uniform Size and Order */}
                    <div className="flex flex-col gap-3 pt-5 border-t border-gray-100">
                      {projectStories[project.id] && (
                        <motion.button
                          onClick={() => setSelectedCaseStudy(project.id)}
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          View Case Study
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      )}
                      {project.links.github && (
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-semibold text-sm hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          View on GitHub
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCaseStudy && projectStories[selectedCaseStudy] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedCaseStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="text-6xl">{projectStories[selectedCaseStudy].visual}</div>
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="text-gray-400 hover:text-gray-900 text-3xl transition-colors w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {projects.find(p => p.id === selectedCaseStudy)?.title || selectedCaseStudy}
              </h2>
              <p className="text-xl text-gray-600 font-light italic mb-8 border-l-4 border-blue-500 pl-4 leading-relaxed">
                {projectStories[selectedCaseStudy].oneLiner}
              </p>

              {/* What I Did Summary */}
              {projects.find(p => p.id === selectedCaseStudy) && (
                <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    What I Did
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="leading-relaxed">
                      <strong className="font-semibold text-gray-900">Context:</strong> {projects.find(p => p.id === selectedCaseStudy)?.context}
                    </p>
                    <p className="leading-relaxed">
                      <strong className="font-semibold text-gray-900">Approach:</strong> {projects.find(p => p.id === selectedCaseStudy)?.approach}
                    </p>
                    {projects.find(p => p.id === selectedCaseStudy)?.results && (
                      <div className="mt-4">
                        <strong className="font-semibold text-gray-900">Results:</strong>
                        <ul className="mt-2 space-y-2 ml-4">
                          {Object.entries(projects.find(p => p.id === selectedCaseStudy)!.results).map(([key, value]) => (
                            <li key={key} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span><strong className="font-medium">{key}:</strong> {value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-8">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Problem
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedCaseStudy].problem}</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Key Decision
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedCaseStudy].keyDecision}</p>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Tradeoff
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedCaseStudy].tradeoff}</p>
                </div>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Outcome
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedCaseStudy].outcome}</p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    What I'd Do Differently Now
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedCaseStudy].differentNow}</p>
                </div>

                {projects.find(p => p.id === selectedCaseStudy)?.links.github && (
                  <div className="pt-8 border-t border-gray-200">
                    <a
                      href={projects.find(p => p.id === selectedCaseStudy)!.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                    >
                      View on GitHub
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core Competencies */}
      <section id="competencies" className="py-24 px-6 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Core Competencies
            </h2>
            <p className="text-xl text-gray-600">Technical execution meets business acumen</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreCompetencies.map((competency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white border border-gray-300 rounded-none p-10 hover:border-gray-900 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{competency.category}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{competency.description}</p>
                <div className="flex flex-wrap gap-3">
                  {competency.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section id="achievements" className="py-24 px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Key Achievements
            </h2>
            <p className="text-xl text-gray-600">Quantified impact and measurable results</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                    <div className="text-3xl font-extrabold text-emerald-600 mb-3">{achievement.impact}</div>
                    <p className="text-sm text-gray-600">{achievement.context}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          {/* Professional Experience */}
          <section id="experience" className="py-24 px-6 bg-[#EBEBEB] scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600">Real-world impact across diverse environments</p>
          </motion.div>

          <div className="space-y-10">
            {[
              {
                role: 'Full-Stack Developer & Co-Founder',
                company: 'Tech Startup (Self-Founded)',
                period: '2022 – Present',
                achievements: [
                  'Co-founded and developed multiple full-stack web applications using React, TypeScript, and modern JavaScript frameworks',
                  'Architected and implemented e-commerce platforms with secure payment processing and customer management systems',
                  'Built health and wellness platforms with data analytics, personalization engines, and user tracking capabilities',
                  'Designed scalable database schemas and RESTful APIs for production applications',
                  'Led product development from concept to deployment, managing both technical and business aspects',
                ],
                impact: { 'Applications Built': '3+', 'Technologies Used': 'React/TypeScript', 'Full-Stack Projects': '100%' }
              },
              {
                role: 'Data Analytics Engineer',
                company: 'Independent Projects',
                period: '2021 – Present',
                achievements: [
                  'Developed data analysis and visualization systems for EEG data processing and medical research applications',
                  'Built recommendation algorithms and user profiling systems for event discovery platforms',
                  'Created time-series analysis tools for weather pattern forecasting and statistical trend detection',
                  'Implemented data processing pipelines using Python, Pandas, and NumPy for large-scale datasets',
                  'Designed interactive dashboards for real-time data visualization and pattern recognition',
                ],
                impact: { 'Data Projects': '4+', 'Analysis Tools': 'Python/C#', 'Visualization Systems': 'React/Tableau' }
              },
              {
                role: 'Library Operations Supervisor',
                company: 'St. Cloud State University Library',
                period: 'Jul 2023 – Present',
                achievements: [
                  'Led a digital scheduling system redesign, reducing staff scheduling conflicts by 40%',
                  'Designed Python- and Excel-based automation tools, reducing manual effort by 30%',
                  'Collaborated with IT stakeholders to integrate new digital systems',
                  'Supervised, trained, and evaluated 8+ student employees',
                ],
                impact: { 'Conflict Reduction': '40%', 'Manual Effort Reduction': '30%', 'Team Leadership': '8+ employees' }
              },
              {
                role: 'Academic Success Mentor / Private Tutor',
                company: 'St. Cloud State University Tutoring Services',
                period: 'May 2022 – Present',
                achievements: [
                  'Developed interactive learning tools using Python and Java, improving student comprehension by ~35%',
                  'Mentored 50+ students in computer science, quantitative methods, and financial analysis',
                  'Achieved an average 1.2 letter-grade improvement across mentees',
                ],
                impact: { 'Comprehension Improvement': '~35%', 'Students Mentored': '50+', 'Grade Improvement': '1.2 letter-grade' }
              },
              {
                role: 'Donor Ambassador',
                company: 'American Red Cross',
                period: 'Jun 2021 – Dec 2021',
                achievements: [
                  'Supported data-driven digital outreach campaigns, increasing blood drive participation by 25%',
                  'Provided UX feedback during a donor management system pilot rollout',
                  'Applied analytics to refine outreach strategies, increasing campaign ROI by 20%',
                ],
                impact: { 'Participation Increase': '25%', 'ROI Increase': '20%' }
              },
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.01, y: -3 }}
                className="bg-white border border-gray-300 rounded-none p-10 hover:border-gray-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.role}</h3>
                    <div className="text-lg text-blue-600 font-semibold mb-2">{exp.company}</div>
                    <div className="text-sm text-gray-500">{exp.period}</div>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <span className="text-blue-600 mt-1.5 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-8 pt-6 border-t border-gray-200">
                  {Object.entries(exp.impact).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{key}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24 px-6 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Education
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01, y: -3 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-10 md:p-12 hover:shadow-xl transition-shadow duration-300"
          >
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">St. Cloud State University</h3>
                    <div className="text-xl text-blue-600 font-semibold mb-3">Bachelor of Science — Information Systems & Finance</div>
                    <div className="text-gray-600">Expected Graduation: 2024</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-3">
                      {['Database Management', 'Data Analytics & Business Intelligence', 'Systems Integration', 'Financial Modeling', 'Corporate Finance', 'Data Structures & Algorithms'].map((course) => (
                        <span key={course} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
          </motion.div>
        </div>
      </section>

          {/* Resume Section */}
          <section id="resume" className="py-24 px-6 bg-[#EBEBEB] scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Resume
            </h2>
            <p className="text-xl text-gray-600">Download my resume or view it online</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-2xl p-10 md:p-12 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.a
                href="/images/resume-example.pdf"
                download="Sabin-Raut-Resume.pdf"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                aria-label="Download Resume PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Resume
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sabin-raut"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                aria-label="View LinkedIn Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                View LinkedIn Profile
              </motion.a>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">📧 <a href="mailto:sabinraut343@gmail.com" className="text-blue-600 hover:underline">sabinraut343@gmail.com</a></p>
              <p>📍 St. Cloud, MN | Open to Relocate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Availability & Contact */}
      <section id="contact" className="py-24 px-6 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-12 md:p-16 text-center shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Availability
            </h2>
            <div className="mb-8 space-y-4">
              <div className="text-xl font-semibold text-gray-900">Open to Opportunities</div>
              <div className="flex flex-wrap gap-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <span>📍</span>
                  <span>St. Cloud, MN | Open to Relocate</span>
                </span>
                <span className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Average Response Time: Within 24 Hours</span>
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-2">Available</div>
                <div className="text-gray-600">Open to hire</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-2">St. Cloud, MN</div>
                <div className="text-gray-600">Open to relocate</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-2">24 Hours</div>
                <div className="text-gray-600">Response time</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-900 mb-4">📩 Contact:</div>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="mailto:sabinraut343@gmail.com"
                  className="px-10 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  aria-label="Contact Me"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/sabin-raut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  aria-label="Connect on LinkedIn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect on LinkedIn
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </div>
              <div className="text-center text-sm text-gray-600 mt-4">
                🔗 <a href="https://linkedin.com/in/sabin-raut" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://linkedin.com/in/sabin-raut</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
