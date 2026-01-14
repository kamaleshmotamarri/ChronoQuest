'use client';

import { useState } from 'react';
import PuzzleComponent from './PuzzleComponent';

export default function EraView({ era, onComplete, onReturn }) {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [dialogueShown, setDialogueShown] = useState(false);

  const handlePuzzleSolve = () => {
    onComplete(era);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onReturn}
          className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          ← Back to Navigation Hub
        </button>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{era.background}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{era.name}</h1>
            <p className="text-2xl text-gray-300">{era.year}</p>
          </div>

          <div className="mb-8">
            <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-300 mb-3">
                {era.historicalFigure.name}
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed italic">
                "{era.historicalFigure.dialogue}"
              </p>
            </div>

            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-300 mb-2">⚠️ Timeline Anomaly Detected</h4>
              <p className="text-gray-300">{era.description}</p>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">🎯 Mission Objective</h4>
              <p className="text-gray-300">
                Solve the puzzle to restore this timeline fragment and retrieve the{' '}
                <span className="font-semibold text-yellow-400">{era.artifact}</span>.
              </p>
            </div>
          </div>

          {!showPuzzle && (
            <button
              onClick={() => setShowPuzzle(true)}
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Begin Puzzle
            </button>
          )}

          {showPuzzle && (
            <div className="mt-8">
              <PuzzleComponent puzzle={era.puzzle} onSolve={handlePuzzleSolve} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
