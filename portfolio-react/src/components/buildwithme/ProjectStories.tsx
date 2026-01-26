import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export const ProjectStories = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Projects
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Real solutions to real problems — built with purpose and precision
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex gap-3 justify-center mb-12 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filter === category
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => {
            const story = projectStories[project.id];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedStory(project.id)}
                className="bg-white border-2 border-transparent rounded-xl p-8 hover:border-gray-900 transition-all hover:shadow-xl cursor-pointer group"
              >
                <div className="text-5xl mb-4">{story?.visual || '🚀'}</div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-900 transition-colors text-xl">→</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                {story && (
                  <p className="text-gray-600 font-light italic mb-4 leading-relaxed">{story.oneLiner}</p>
                )}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{project.problem}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedStory && projectStories[selectedStory] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedStory(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="text-6xl">{projectStories[selectedStory].visual}</div>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="text-gray-400 hover:text-gray-900 text-3xl transition-colors w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {projects.find(p => p.id === selectedStory)?.title || selectedStory}
                </h2>
                <p className="text-xl text-gray-600 font-light italic mb-8 border-l-4 border-blue-500 pl-4 leading-relaxed">
                  {projectStories[selectedStory].oneLiner}
                </p>

                <div className="space-y-8">
                  <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Problem
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedStory].problem}</p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Key Decision
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedStory].keyDecision}</p>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Tradeoff
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedStory].tradeoff}</p>
                  </div>

                  <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Outcome
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedStory].outcome}</p>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      What I'd Do Differently Now
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">{projectStories[selectedStory].differentNow}</p>
                  </div>

                  {projects.find(p => p.id === selectedStory)?.links.github && (
                    <div className="pt-8 border-t border-gray-200">
                      <a
                        href={projects.find(p => p.id === selectedStory)!.links.github}
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
      </div>
    </div>
  );
};
