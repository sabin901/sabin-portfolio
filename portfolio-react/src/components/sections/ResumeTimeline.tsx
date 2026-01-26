import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2024',
    title: 'Dual Degree Completion',
    organization: 'St. Cloud State University',
    description: 'Graduating with unique combination of technical execution and financial expertise',
    type: 'education',
  },
  {
    year: '2023 - Present',
    title: 'Library Operations Supervisor',
    organization: 'St. Cloud State University Library',
    description: 'Led digital transformation, reduced conflicts by 40%, managed 8+ staff shifts',
    type: 'work',
  },
  {
    year: '2022 - Present',
    title: 'Academic Success Mentor',
    organization: 'St. Cloud State University Tutoring Services',
    description: 'Mentored 50+ students in STEM courses, created custom learning tools',
    type: 'work',
  },
  {
    year: '2021',
    title: 'Donor Ambassador',
    organization: 'American Red Cross',
    description: 'Managed social media campaigns, increased participation, tested digital systems',
    type: 'work',
  },
];

export const ResumeTimeline = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Professional Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A timeline of growth, learning, and impact
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 transform md:-translate-x-1/2 z-10 ${
                  event.type === 'work' ? 'bg-blue-500' :
                  event.type === 'education' ? 'bg-green-500' : 'bg-purple-500'
                }`}></div>

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        event.type === 'work'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : event.type === 'education'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      }`}>
                        {event.type === 'work' ? 'Work' : event.type === 'education' ? 'Education' : 'Achievement'}
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                      {event.organization}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
