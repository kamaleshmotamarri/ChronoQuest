'use client';

import { useState, useCallback } from 'react';
import GameScene from './GameScene';
import DialogueModal from './DialogueModal';
import PuzzleComponent from './PuzzleComponent';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Map, BookOpen, User, Maximize } from 'lucide-react';

export default function InteractiveEraView({ era, character, onComplete, onReturn }) {
  const [showDialogue, setShowDialogue] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [interactingNPC, setInteractingNPC] = useState(null);

  const handleNPCInteract = useCallback((npc) => {
    setInteractingNPC(npc);
    setShowDialogue(true);
  }, []);

  const handleMissionAccept = () => {
    setShowDialogue(false);
    setShowPuzzle(true);
  };

  const handleMissionIgnore = () => {
    setShowDialogue(false);
    setInteractingNPC(null);
  };

  const handlePuzzleSolve = () => {
    onComplete(era);
  };

  // Puzzle View with premium UI overlay
  if (showPuzzle) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden font-sans">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-slate-900/90 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-black" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setShowPuzzle(false)}
              className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-slate-300 hover:text-cyan-400 transition-all font-mono text-sm uppercase tracking-wider"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors" />
              Return to Simulation
            </button>

            <div className="text-right">
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Puzzle Protocol</div>
              <div className="text-cyan-400 font-bold font-orbitron">{era.name} // SEQUENCE_01</div>
            </div>
          </div>

          {/* Puzzle Container */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50" />
              <PuzzleComponent puzzle={era.puzzle} onSolve={handlePuzzleSolve} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Game View with HUD
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* Game Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <GameScene
          era={era}
          character={character}
          onInteract={handleNPCInteract}
          onPuzzleStart={() => setShowPuzzle(true)}
          onReturn={onReturn}
        />
      </div>

      {/* HUD Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">

        {/* Top Bar */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="flex gap-4">
            <button
              onClick={onReturn}
              className="bg-slate-900/80 backdrop-blur border border-white/10 text-slate-300 hover:text-white hover:border-white/30 p-3 rounded-lg transition-all group"
              title="Return to Hub"
            >
              <Map className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-md border border-purple-500/30 px-8 py-3 rounded-b-xl shadow-[0_0_20px_rgba(168,85,247,0.2)] transform -translate-y-2">
            <h1 className="text-center font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-widest text-lg">
              {era.name.toUpperCase()}
            </h1>
            <div className="flex justify-center items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              YEAR: {era.year}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-md flex items-center justify-center text-lg">
                {character.sprite}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-mono uppercase">Operative</span>
                <span className="text-sm font-bold text-white leading-none">{character.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Bottom Bar */}
        <footer className="flex justify-between items-end pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-lg border border-white/5 p-4 max-w-sm">
            <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wide">Current Objective</div>
            <div className="text-sm text-slate-200 leading-relaxed border-l-2 border-purple-500 pl-3">
              Locate the temporal anomaly. The provided scanner indicates strong readings from the local historical figure: <span className="text-cyan-400 font-bold">{era.historicalFigure.name}</span>.
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur rounded-full px-5 py-2 border border-white/5 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-white font-sans font-bold">W</span>
                <span className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-white font-sans font-bold">A</span>
                <span className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-white font-sans font-bold">S</span>
                <span className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-white font-sans font-bold">D</span>
                <span className="ml-1">MOVE</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-1">
                <span className="px-2 h-6 rounded bg-slate-700 flex items-center justify-center text-white font-sans font-bold min-w-[3rem]">SPACE</span>
                <span>INTERACT</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Dialogue Overlay */}
      <AnimatePresence>
        {showDialogue && interactingNPC && (
          <DialogueModal
            npc={interactingNPC}
            dialogue={era.historicalFigure.dialogue}
            onIgnore={handleMissionIgnore}
            onAccept={handleMissionAccept}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
