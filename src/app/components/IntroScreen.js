'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield } from 'lucide-react';

export default function IntroScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/40 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[100px] opacity-40 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-700/20 rounded-full blur-[80px]" />

        {/* Animated particles/grid (simulated with CSS for now) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 py-12">
        <div className="flex flex-col items-center">

          {/* Logo / Agency Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8 p-4 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-md shadow-2xl relative group"
          >
            <Shield className="w-16 h-16 text-cyan-400" />
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center space-y-2 mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 tracking-tight">
              CHRONO<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">QUEST</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] text-slate-400 uppercase">
              Temporal Preservation Agency
            </h2>
          </motion.div>

          {/* Mission Briefing Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full max-w-3xl bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl mb-12 relative overflow-hidden"
          >
            {/* Decorative line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed text-center">
              <p>
                <span className="text-cyan-400 font-bold">Agents needed.</span> The timeline is fracturing. Anomalies are detected across four key historical eras.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                {['Ancient Egypt', 'Medieval', 'Renaissance', 'Space Age'].map((era, i) => (
                  <div key={era} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-slate-300">{era}</span>
                  </div>
                ))}
              </div>

              <p className="font-light">
                Your mission: <strong className="text-white font-semibold">Repair Reality.</strong>
              </p>
              <p className="text-sm text-slate-400 mt-4 italic border-t border-white/10 pt-4">
                * Agency Protocol: Secure authentication required to access the timeline. Progress will be synced to your neural profile.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={onStart}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg tracking-wide overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                ACCEPT MISSION <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.button>

            <HowToPlayBtn />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-xs text-slate-600 uppercase tracking-widest"
          >
            System v2.4.1 // Connected to Temporal Mainframe
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function HowToPlayBtn() {
  const [isOpen, setIsOpen] = (require('react').useState)(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="px-10 py-5 bg-slate-900 border border-white/10 text-white rounded-full font-bold text-lg tracking-wide hover:bg-slate-800 transition-colors"
      >
        HOW TO PLAY
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-2xl w-full bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600" />

            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="text-cyan-400 w-8 h-8" /> Field Guide: Temporal Preservation
            </h3>

            <div className="space-y-6 text-slate-300">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex-shrink-0 flex items-center justify-center text-cyan-400 font-bold border border-cyan-400/20">1</div>
                <div>
                  <h4 className="text-white font-bold mb-1 font-orbitron tracking-wider">CHOOSE YOUR AGENT</h4>
                  <p className="text-sm">Each specialist has unique stats and expertise. Select the one that matches your playstyle.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-400/10 flex-shrink-0 flex items-center justify-center text-purple-400 font-bold border border-purple-400/20">2</div>
                <div>
                  <h4 className="text-white font-bold mb-1 font-orbitron tracking-wider">NAVIGATE THE TIMELINE</h4>
                  <p className="text-sm">Travel through Ancient Egypt, the Medieval Era, the Renaissance, and the Space Age to find fractures.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex-shrink-0 flex items-center justify-center text-emerald-400 font-bold border border-emerald-400/20">3</div>
                <div>
                  <h4 className="text-white font-bold mb-1 font-orbitron tracking-wider">SOLVE & RESTORE</h4>
                  <p className="text-sm">Explore interactive environments (WASD/Arrows), interact with NPCs (Space), and solve puzzles to repair historical anomalies.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-slate-500 uppercase tracking-widest italic">
                  * Warning: Temporal fractures are unstable. Failure to complete a mission will require a full era reboot.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-slate-200 transition-colors"
            >
              UNDERSTOOD
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
