'use client';

import { motion } from 'framer-motion';
import { Lock, CheckCircle, ArrowRight, Hourglass } from 'lucide-react';

export default function EraSelector({ eras, completedEras, onSelectEra }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-black relative font-sans selection:bg-purple-500 selection:text-white flex flex-col items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-slate-800/50 border border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-400">TIMELINE STATUS: CRITICAL</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Temporal Navigation Hub</h1>
          <p className="text-slate-400 text-lg">Locate and repair fractures in the spacetime continuum.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" // Increased gap
        >
          {eras.map((era) => {
            const isCompleted = completedEras.includes(era.id);
            const themeColor = isCompleted ? 'border-green-500/50 hover:bg-green-900/10' : 'border-purple-500/30 hover:border-purple-500/80 hover:bg-slate-800/80';

            return (
              <motion.div
                key={era.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectEra(era)}
                className={`relative group cursor-pointer rounded-2xl p-0.5 bg-gradient-to-br from-slate-700 to-slate-800 transition-all duration-300 shadow-xl ${isCompleted ? 'grayscale-0' : ''}`}
              >
                {/* Inner Card Content */}
                <div className={`relative h-full rounded-[14px] bg-slate-900 overflow-hidden flex flex-col p-6 border-2 transition-colors duration-300 ${themeColor}`}>

                  {/* Background Gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {isCompleted && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 text-green-400 font-bold text-sm bg-green-900/80 backdrop-blur px-3 py-1 rounded-full border border-green-500/30 shadow-lg">
                      <CheckCircle className="w-4 h-4" /> RESTORED
                    </div>
                  )}

                  {!isCompleted && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 text-red-400 font-bold text-sm bg-red-900/80 backdrop-blur px-3 py-1 rounded-full border border-red-500/30 shadow-lg">
                      <Hourglass className="w-4 h-4 animate-spin-slow" /> ACTIVE ANOMALY
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Era Header Image */}
                    <div className="relative w-full h-56 mb-6 rounded-xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-purple-500/50 transition-all duration-500">
                      {/* Shimmer/Loading effect logic could act here, but simple Image is fine */}
                      {era.image ? (
                        <img
                          src={era.image}
                          alt={era.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                        />
                      ) : (
                        // Fallback if image load fails or is missing
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-6xl">
                          {era.background}
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Icon Badge */}
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-lg p-2 text-3xl border border-white/10 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        {era.background || '🌍'}
                      </div>
                    </div>

                    <div className="px-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors font-orbitron">
                        {era.name}
                      </h3>
                      <div className="text-sm font-mono text-cyan-400 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {era.year}
                      </div>

                      <p className="text-slate-400 mb-8 leading-relaxed">
                        {era.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-3 text-sm font-bold tracking-wider uppercase text-slate-500 group-hover:text-white transition-colors px-1">
                      {isCompleted ? 'Revisit Era' : 'Initiate Jump'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex gap-8 text-slate-500 text-sm font-mono bg-slate-900/50 px-6 py-3 rounded-full border border-white/5">
            <div>Completed: <span className="text-white">{completedEras.length}</span> / {eras.length}</div>
            <div className="w-px h-4 bg-slate-700 inline-block mx-4 relative top-0.5"></div>
            <div>System Integrity: <span className={`${completedEras.length === eras.length ? 'text-green-400' : 'text-yellow-400'}`}>{Math.round((completedEras.length / eras.length) * 100)}%</span></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
