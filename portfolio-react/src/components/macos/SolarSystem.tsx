import { motion } from 'framer-motion';

export const SolarSystem = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-400 rounded-full shadow-[0_0_60px_rgba(255,215,0,0.8),0_0_100px_rgba(255,215,0,0.6)]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 60px rgba(255,215,0,0.8), 0 0 100px rgba(255,215,0,0.6)',
            '0 0 80px rgba(255,215,0,1), 0 0 120px rgba(255,215,0,0.8)',
            '0 0 60px rgba(255,215,0,0.8), 0 0 100px rgba(255,215,0,0.6)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full blur-sm" />
      </motion.div>

      {/* Mercury Orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-white/10 rounded-full"
        style={{
          width: '200px',
          height: '200px',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-8 h-8 bg-gray-400 rounded-full shadow-lg"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Venus Orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-white/10 rounded-full"
        style={{
          width: '280px',
          height: '280px',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-10 h-10 bg-orange-300 rounded-full shadow-lg"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-500 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Earth Orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-white/10 rounded-full"
        style={{
          width: '360px',
          height: '360px',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-12 h-12 bg-blue-500 rounded-full shadow-lg"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-500 rounded-full" />
          {/* Moon */}
          <motion.div
            className="absolute top-0 left-full w-4 h-4 bg-gray-200 rounded-full ml-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        </motion.div>
      </motion.div>

      {/* Mars Orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-white/10 rounded-full"
        style={{
          width: '460px',
          height: '460px',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-10 h-10 bg-red-500 rounded-full shadow-lg"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-600 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Jupiter Orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-white/10 rounded-full"
        style={{
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2 w-20 h-20 bg-amber-400 rounded-full shadow-lg"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full" />
          {/* Jupiter's bands */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-600/50" />
        </motion.div>
      </motion.div>

      {/* Saturn Orbit */}
      <motion.div
        className="absolute top-1/2 left-1/2 border border-white/10 rounded-full"
        style={{
          width: '750px',
          height: '750px',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute top-0 left-1/2"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-18 h-18 bg-yellow-300 rounded-full shadow-lg relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-amber-500 rounded-full" />
            {/* Saturn's rings */}
            <div className="absolute top-1/2 left-1/2 w-28 h-2 bg-yellow-200/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
            <div className="absolute top-1/2 left-1/2 w-32 h-1 bg-yellow-300/40 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-12" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
