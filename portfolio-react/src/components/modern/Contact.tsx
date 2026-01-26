import { motion } from 'framer-motion';

export const Contact = () => {
  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'sabinraut343@gmail.com',
      href: 'mailto:sabinraut343@gmail.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/sabin-raut',
      href: 'https://linkedin.com/in/sabin-raut',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/sabin901',
      href: 'https://github.com/sabin901',
    },
  ];

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let's build something together
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 bg-[#1a1a1a] border border-gray-800 rounded-2xl text-center hover:border-blue-500/50 transition-all group"
            >
              <div className="text-5xl mb-4">{method.icon}</div>
              <div className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {method.label}
              </div>
              <div className="text-gray-400 text-sm">{method.value}</div>
            </motion.a>
          ))}
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8"
        >
          <div className="text-green-400 mb-3 font-bold text-xl">✓ Available for hire</div>
          <div className="text-gray-300 mb-2">Response within 24 hours</div>
          <div className="text-gray-400 text-sm">St. Cloud, MN • Open to relocate</div>
        </motion.div>
      </div>
    </section>
  );
};
