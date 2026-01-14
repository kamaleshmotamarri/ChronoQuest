'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Clock, ArrowRight } from 'lucide-react';

const characters = [
  {
    id: 'agent-1',
    name: 'Agent Phoenix',
    role: 'Ancient Civilizations Expert',
    description: 'Master of historical linguistics and cultural integration. Can blend into any era flawlessly.',
    sprite: '🧑‍🚀',
    image: '/agent_phoenix.png',
    icon: Sparkles,
    color: 'from-orange-500 to-red-600',
    accent: 'text-orange-400',
    stat: 'Charisma',
    statValue: 95,
  },
  {
    id: 'agent-2',
    name: 'Agent Nova',
    role: 'Temporal Mechanics Engineer',
    description: 'Brilliant physicist capable of stabilizing time paradoxes and repairing the fabric of reality.',
    sprite: '👩‍🔬',
    image: '/agent_nova.png',
    icon: Zap,
    color: 'from-cyan-400 to-blue-600',
    accent: 'text-cyan-400',
    stat: 'Intellect',
    statValue: 98,
  },
  {
    id: 'agent-3',
    name: 'Agent Chronos',
    role: 'Timeline Guardian',
    description: 'Veteran operative specializing in combat and tactical extraction from unstable timelines.',
    sprite: '🧙‍♂️',
    image: '/agent_chronos.png',
    icon: Clock,
    color: 'from-purple-500 to-indigo-600',
    accent: 'text-purple-400',
    stat: 'Combat',
    statValue: 92,
  },
];

export default function CharacterSelection({ onSelect, user, onLogout, onBack }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative font-sans selection:bg-purple-500 selection:text-white flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6 flex justify-between items-start gap-4 pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-slate-800 transition-all group"
        >
          <motion.div whileHover={{ x: -2 }}>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </motion.div>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>

        {onLogout && (
          <div className="pointer-events-auto flex flex-col items-end gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl max-w-[200px] md:max-w-none">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] md:text-xs text-slate-300 truncate">
                Logged in: <span className="text-white font-medium">{user?.email}</span>
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-[10px] md:text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest border-t border-white/5 pt-2 w-full text-right"
            >
              Abort Mission
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 py-8 mt-12">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="text-xs font-medium uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              ChronoQuest Initiative
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Operative</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The timeline is fracturing. Choose the specialist best suited to navigate the chaos and restore order to history.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {characters.map((character) => {
            const isSelected = selectedCharacter?.id === character.id;
            const Icon = character.icon;

            return (
              <motion.div
                key={character.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedCharacter(character)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-colors duration-300 ${isSelected
                  ? 'border-purple-500/80 bg-slate-900/90'
                  : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
                  }`}
              >
                {/* Glow Effect on Selection */}
                {isSelected && (
                  <motion.div
                    layoutId="outline"
                    className="absolute inset-0 z-0 border-2 border-purple-500 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Top Image/Sprite Area - NOW USING IMAGE */}
                <div className={`relative h-64 w-full bg-slate-900 overflow-hidden`}>

                  {/* Fallback pattern if image loads slow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-20`} />

                  <img
                    src={character.image}
                    alt={character.name}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 ${isSelected ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
                  />

                  {/* Gradient fade at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                <div className="relative p-6 -mt-12 z-10">
                  {/* Floating Icon Badge */}
                  <div className={`absolute top-0 right-6 -translate-y-full mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-slate-800 border border-white/20 shadow-lg ${isSelected ? 'ring-2 ring-purple-500' : ''}`}>
                    <Icon className={`w-6 h-6 ${character.accent}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                    {character.name}
                  </h3>
                  <div className={`text-xs font-medium uppercase tracking-wider mb-4 ${character.accent}`}>
                    {character.role}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {character.description}
                  </p>

                  {/* Stat Bar */}
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                      <span>{character.stat}</span>
                      <span className="font-mono text-white">{character.statValue}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${character.statValue}%` }}
                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${character.color}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => selectedCharacter && onSelect(selectedCharacter)}
            disabled={!selectedCharacter}
            className={`group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 rounded-full overflow-hidden ${selectedCharacter
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] hover:scale-105'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {selectedCharacter ? 'Initialize Mission' : 'Select an Operative'}
              {selectedCharacter && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
            {selectedCharacter && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>
        </motion.div>

        {/* Footer/Controls Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center items-center gap-8 text-slate-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-white/10 border border-white/5 font-mono text-xs text-slate-300">WASD</span>
            <span>to Move</span>
          </div>
          <div className="w-1 h-1 bg-slate-700 rounded-full" />
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-white/10 border border-white/5 font-mono text-xs text-slate-300">Space</span>
            <span>to Interact</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
