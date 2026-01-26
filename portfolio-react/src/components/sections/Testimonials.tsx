import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Sabin demonstrates exceptional technical skills combined with strong business acumen. His ability to bridge information systems and finance makes him a valuable asset to any team.",
    author: "Professor",
    role: "Faculty Member",
    company: "St. Cloud State University",
  },
  {
    quote: "Sabin's leadership in implementing our digital scheduling system reduced operational conflicts by 40%. His technical execution and attention to detail are outstanding.",
    author: "Library Manager",
    role: "Supervisor",
    company: "St. Cloud State University Library",
  },
  {
    quote: "As a tutor, Sabin has helped 50+ students succeed in challenging STEM courses. His ability to explain complex technical concepts clearly shows strong communication skills.",
    author: "Student",
    role: "Peer",
    company: "St. Cloud State University",
  },
];

export const Testimonials = () => {
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
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Feedback from colleagues, supervisors, and peers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="text-gray-900 dark:text-white font-semibold">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {testimonial.role} • {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
