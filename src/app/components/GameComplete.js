'use client';

import { motion } from 'framer-motion';
import { Trophy, Clock, ShieldCheck, Zap, RotateCcw } from 'lucide-react';

export default function GameComplete({ artifacts, onRestart }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-black" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Visual & Status */}
        <div className="md:w-5/12 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-8 flex flex-col justify-between border-r border-white/5">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Mission Status: Success
            </div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white font-orbitron leading-tight mb-4"
            >
              Timeline <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Restored</span>
            </motion.h1>

            <p className="text-slate-300 leading-relaxed text-sm md:text-base opacity-80">
              Temporal stability has been achieved. The fractures in the continuum have been sealed. Excellent work, Agent.
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 uppercase">Reality Integrity</span>
                <span className="text-green-400 font-bold">100%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Report & Artifacts */}
        <div className="md:w-7/12 p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Artifacts Secured
            </h2>
            <Clock className="w-5 h-5 text-slate-500" />
          </div>

          <div className="space-y-3 mb-10">
            {artifacts.map((artifact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="group flex items-center gap-4 bg-slate-800/40 hover:bg-slate-800/60 p-3 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300 group-hover:text-indigo-200 group-hover:bg-indigo-500/30 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-200 font-medium text-sm">{artifact}</div>
                  <div className="text-xs text-slate-500 font-mono">Status: Secure</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-lg mb-4">
              <p className="text-yellow-200/80 text-sm italic text-center">
                "History is not a burden on the memory but an illumination of the soul."
              </p>
            </div>

            <button
              onClick={onRestart}
              className="w-full py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <RotateCcw className="w-5 h-5" />
              Initialize New Simulation
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
