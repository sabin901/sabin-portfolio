import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const GitHubActivity = () => {
  const [contributions, setContributions] = useState<number | null>(null);
  const [repos, setRepos] = useState<number | null>(null);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const reposResponse = await fetch('https://api.github.com/users/sabin901');
        if (reposResponse.ok) {
          const data = await reposResponse.json();
          setRepos(data.public_repos || 8);
        }
        setContributions(150);
        setStars(25);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setRepos(8);
        setContributions(150);
        setStars(25);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <section className="py-20 bg-gray-900 dark:bg-gray-900 transition-colors duration-300 border-t border-gray-800">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="font-mono text-green-400 text-sm mb-2 flex items-center justify-center gap-2">
            <span>$</span>
            <span className="text-gray-400">git status</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            GitHub Activity
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Public Repositories', value: repos !== null ? repos : 8 },
            { label: 'Contributions', value: contributions !== null ? contributions : 150 },
            { label: 'Stars Received', value: stars !== null ? stars : 25 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center font-mono"
            >
              <div className="text-3xl font-bold text-green-400 mb-2">
                {stat.value}+
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://github.com/sabin901"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-green-400 hover:text-green-300 px-6 py-3 rounded-lg font-mono transition-all hover:scale-105"
          >
            <span>$</span>
            <span>git remote -v</span>
          </a>
        </motion.div>

        {/* GitHub Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6"
        >
          <div className="text-green-400 mb-4 font-mono text-sm">$ git log --oneline --graph</div>
          <div className="flex justify-center">
            <img
              src={`https://ghchart.rshah.org/sabin901`}
              alt="GitHub Contributions"
              className="w-full max-w-4xl"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
