'use client';

import { motion } from 'framer-motion';
import { User, MessageCircle, X } from 'lucide-react';

export default function DialogueModal({ npc, dialogue, onIgnore, onAccept }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none p-6 md:p-12">
      {/* Backdrop overlay (darken game) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        onClick={onIgnore}
      />

      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-4xl bg-slate-900/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden relative pointer-events-auto flex flex-col md:flex-row"
      >
        {/* Left: NPC Portrait / Info */}
        <div className="md:w-1/3 bg-slate-800/50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <User className="w-12 h-12 text-slate-200" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center font-cinzel tracking-wider">
            {npc?.name || 'Unknown Entity'}
          </h3>
          <div className="text-xs text-cyan-400 font-mono mt-1 uppercase tracking-widest">
            Historical Figure
          </div>
        </div>

        {/* Right: Dialogue Content */}
        <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono uppercase tracking-widest">
              <MessageCircle className="w-3 h-3" />
              Incoming Transmission
            </div>
            <button onClick={onIgnore} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 mb-8 relative">
            <span className="text-6xl absolute -top-4 -left-2 text-white/5 font-serif">"</span>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light pl-4 relative z-10">
              {dialogue}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onIgnore}
              className="px-6 py-3 rounded-lg text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-sm font-bold uppercase tracking-wider"
            >
              Ignore
            </button>
            <button
              onClick={onAccept}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all text-sm font-bold uppercase tracking-wider flex items-center gap-2 group"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Accept Mission
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
