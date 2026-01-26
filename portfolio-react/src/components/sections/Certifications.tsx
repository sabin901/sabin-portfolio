import { motion } from 'framer-motion';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credential?: string;
}

const certifications: Certification[] = [
  {
    name: "AWS Academy Graduate – Cloud Foundations",
    issuer: "AWS Academy",
    date: "December 2025",
  },
  {
    name: "Exploring Networking with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "December 2025",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "December 2025",
  },
  {
    name: "Information Systems",
    issuer: "St. Cloud State University",
    date: "2024",
  },
  {
    name: "Finance",
    issuer: "St. Cloud State University",
    date: "2024",
  },
];

export const Certifications = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Certifications & Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Bachelor of Science – Information Systems & Finance
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            St. Cloud State University | 2024
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {cert.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Relevant Coursework
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Database Management', 'Financial Modeling', 'Data Analytics', 'Business Intelligence', 'Systems Integration', 'Corporate Finance'].map((course) => (
              <span
                key={course}
                className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm border border-gray-200 dark:border-gray-600"
              >
                {course}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
