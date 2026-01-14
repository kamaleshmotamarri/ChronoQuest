'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, ShieldCheck } from 'lucide-react';

export default function PuzzleComponent({ puzzle, onSolve }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isEraRestored, setIsEraRestored] = useState(false);

  // Safety check - handle missing puzzle data
  // Updated to check for puzzle.questions array
  if (!puzzle || (!puzzle.questions && !puzzle.question)) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/30">
        <p className="text-red-400">Error: Puzzle data is missing or invalid.</p>
      </div>
    );
  }

  // Normalize questions to an array even if legacy single question format is used
  // And randomly select 3 questions for this session
  const [questions] = useState(() => {
    const allQuestions = puzzle.questions || [
      {
        question: puzzle.question,
        options: puzzle.options,
        correctAnswer: puzzle.correctAnswer,
        hint: puzzle.hint
      }
    ];
    // Shuffle and pick 3, then shuffle their options
    return [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));
  });

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setFeedback('Please select an answer');
      return;
    }

    const isCorrect = selectedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();

    if (isCorrect) {
      setFeedback('✓ Correct! Calculating temporal stability...');

      // Delay before moving to next question or finishing
      setTimeout(() => {
        setFeedback('');
        setSelectedAnswer('');
        setShowHint(false);

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setIsEraRestored(true);
        }
      }, 1000);

    } else {
      setFeedback('✗ Incorrect. The timeline rejects this answer.');
    }
  };

  if (isEraRestored) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/50 shadow-2xl max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-24 h-24 mb-6 rounded-full bg-green-500/20 flex items-center justify-center border-4 border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.5)]"
        >
          <CheckCircle className="w-12 h-12 text-green-400" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4 font-orbitron">
          TIMELINE RESTORED!
        </h2>

        <div className="space-y-4 mb-8">
          <p className="text-xl text-slate-300">
            Temporal anomalies have been stabilized.
          </p>
          <div className="flex items-center justify-center gap-2 text-green-400/80 font-mono text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>REALITY INTEGRITY: 100%</span>
          </div>
        </div>

        <button
          onClick={onSolve}
          className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-xl border border-green-500/50 hover:border-green-400 transition-all duration-300"
        >
          <div className="absolute inset-0 w-full h-full bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300" />
          <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:w-[200%] transition-all duration-700 ease-in-out transform -skew-x-12 -translate-x-full group-hover:translate-x-full" />

          <span className="relative flex items-center gap-3 text-green-300 font-bold tracking-widest uppercase">
            <Zap className="w-5 h-5" />
            Return to Hub
          </span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col">
      {/* Background Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px]" />

      {/* Progress Header */}
      <div className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white font-orbitron tracking-wide">
            Temporal Challenge
          </h3>
          <p className="text-slate-400 text-sm font-mono mt-1">
            Sequence {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${idx <= currentQuestionIndex
                ? idx === currentQuestionIndex
                  ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                  : 'bg-green-500'
                : 'bg-slate-700'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Question Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-8">
              {currentQuestion.question}
            </p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${isSelected
                      ? 'border-purple-400 bg-purple-900/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'border-slate-700 bg-slate-800/40 text-gray-300 hover:border-purple-500/50 hover:bg-slate-800/80'
                      }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative flex items-center z-10">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${isSelected
                        ? 'border-purple-400 bg-purple-500'
                        : 'border-slate-600 group-hover:border-purple-400/50'
                        }`}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm"></div>
                        )}
                      </div>
                      <span className="text-lg font-medium tracking-wide">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback & Actions */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/5">
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-4 p-3 rounded-lg flex items-center gap-2 font-mono text-sm ${feedback.includes('✓')
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`flex-1 px-6 py-4 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${selectedAnswer
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transform hover:scale-[1.02]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
          >
            CONFIRM SEQUENCE
          </button>

          <button
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700 transition-all duration-300"
          >
            {showHint ? 'HIDE INTEL' : 'REQ INTEL'}
          </button>
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-xl overflow-hidden"
            >
              <div className="flex gap-3">
                <div className="text-yellow-500 font-bold font-mono text-xs uppercase pt-1">Intel:</div>
                <p className="text-yellow-200/90 italic">
                  {currentQuestion.hint}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
