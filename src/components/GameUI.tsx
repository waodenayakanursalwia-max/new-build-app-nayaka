import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Level, Challenge } from '../types';
import { Star, ArrowLeft, Sparkles, X } from 'lucide-react';
import { getHint } from '../services/gemini';

interface GameUIProps {
  level: Level;
  onExit: () => void;
  onComplete: (stickerId: string) => void;
}

export const GameUI: React.FC<GameUIProps> = ({ level, onExit, onComplete }) => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const currentChallenge = level.challenges[currentChallengeIndex];
  const totalSlots = currentChallenge.correctIds.length;

  const handleShowHint = async () => {
    if (hint || isLoadingHint) return;
    setIsLoadingHint(true);
    const optionsText = currentChallenge.options.map(o => o.label);
    const aiHint = await getHint(currentChallenge.question, optionsText, level.title);
    setHint(aiHint);
    setIsLoadingHint(false);
  };

  const handleSelectOption = (id: string) => {
    if (isAnimating || selectedIds.includes(id)) return;
    
    const newSelected = [...selectedIds, id];
    setSelectedIds(newSelected);

    // If we've filled all slots for this challenge
    if (newSelected.length === totalSlots) {
      const isCorrect = newSelected.every((val, idx) => val === currentChallenge.correctIds[idx]);
      
      if (isCorrect) {
        setFeedback('correct');
        setHint(null);
        setIsAnimating(true);
        setTimeout(() => {
          if (currentChallengeIndex < level.challenges.length - 1) {
            setCurrentChallengeIndex(prev => prev + 1);
            setSelectedIds([]);
            setFeedback('none');
            setIsAnimating(false);
          } else {
            // Level complete
            const stickerMapping: Record<number, string> = { 1: 'dragon', 2: 'rocket', 3: 'ship' };
            onComplete(stickerMapping[level.id] || 'star');
          }
        }, 2000);
      } else {
        setFeedback('incorrect');
        setTimeout(() => {
          setSelectedIds([]);
          setFeedback('none');
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow number keys 1-4 to select options
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key) - 1;
        if (currentChallenge.options[index]) {
          handleSelectOption(currentChallenge.options[index].id);
        }
      }
      // Press 'h' for hint
      if (e.key.toLowerCase() === 'h') {
        handleShowHint();
      }
      // Press Escape to exit
      if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChallenge, selectedIds, isAnimating]);

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-start p-4 md:p-8 font-sans overflow-y-auto">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ 
          backgroundColor: level.color,
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)` 
        }}
      />
      
      {/* Header with Stepping Stones */}
      <div className="w-full max-w-4xl flex justify-between items-center z-10">
        <button 
          onClick={onExit}
          className="w-12 h-12 bg-white pixel-corners flex items-center justify-center text-slate-800 hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* Stepping Stones Path */}
        <div className="flex gap-4 items-center bg-black/20 p-4 pixel-corners">
          {level.challenges.map((_, i) => (
            <div key={i} className="flex items-center">
              <motion.div 
                animate={i === currentChallengeIndex ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`
                  w-10 h-10 pixel-corners flex items-center justify-center font-pixel text-xl
                  ${i < currentChallengeIndex ? 'bg-game-yellow text-white shadow-[0_4px_0_0_#ca8a04]' : 
                    i === currentChallengeIndex ? 'bg-white text-slate-800 shadow-[0_4px_0_0_#94a3b8]' : 
                    'bg-slate-700/50 text-slate-500'}
                `}
              >
                {i < currentChallengeIndex ? '★' : i + 1}
              </motion.div>
              {i < level.challenges.length - 1 && (
                <div className={`w-4 h-1 mx-1 ${i < currentChallengeIndex ? 'bg-game-yellow' : 'bg-slate-700'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-right flex flex-col items-end gap-2">
          <div>
            <h2 className="font-pixel text-2xl text-white tracking-widest">{level.title}</h2>
            <p className="font-pixel text-game-yellow">QUEST {currentChallengeIndex + 1}/5</p>
          </div>
          
          <button 
            onClick={handleShowHint}
            disabled={isLoadingHint}
            className={`
              flex items-center gap-2 px-4 py-2 bg-game-pink pixel-corners text-white font-pixel text-lg
              hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50
              ${isLoadingHint ? 'animate-pulse' : ''}
            `}
          >
            <Sparkles className="w-4 h-4" />
            {isLoadingHint ? 'THINKING...' : 'AI HINT'}
          </button>
        </div>
      </div>

      {/* AI Hint Popover */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
          >
            <div className="bg-game-indigo text-white pixel-corners p-6 relative pixel-shadow border-2 border-white/20">
              <button 
                onClick={() => setHint(null)}
                className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex gap-4 items-start">
                <div className="bg-white/20 p-2 pixel-corners">
                  <Star className="w-6 h-6 text-game-yellow fill-game-yellow" />
                </div>
                <div>
                  <p className="font-pixel text-game-yellow text-sm mb-1">AI TEACHER SAYS:</p>
                  <p className="font-sans font-medium italic">"{hint}"</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Action Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center gap-12 z-10">
        {/* Character/Situation Zone */}
        <div className="w-full flex items-center justify-center gap-8 relative min-h-64">
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="text-9xl filter drop-shadow-2xl"
           >
             {level.id === 1 ? '🦕' : level.id === 2 ? '👨‍🚀' : '🦜'}
           </motion.div>

           {/* Speech Bubble */}
           <div className="bg-white pixel-corners p-8 max-w-md relative pixel-shadow">
              <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[20px] border-r-white"></div>
              <div className="font-pixel text-4xl text-slate-800 flex flex-wrap gap-x-3 items-baseline leading-relaxed">
                {(() => {
                  let slotIndex = 0;
                  return currentChallenge.question.split(' ').map((word, i) => {
                    if (word === '[___]') {
                      const currentSlot = slotIndex++;
                      const filledId = selectedIds[currentSlot];
                      const filledLabel = filledId ? currentChallenge.options.find(o => o.id === filledId)?.label : '';
                      
                      return (
                        <div 
                          key={i}
                          className={`
                            inline-flex h-12 min-w-32 border-b-4 border-dashed border-slate-300 items-end justify-center transition-colors
                            ${feedback === 'correct' ? 'border-game-green text-game-green' : ''}
                            ${feedback === 'incorrect' ? 'border-red-400 text-red-400' : ''}
                            ${filledId ? 'border-solid border-slate-800' : ''}
                          `}
                        >
                          {filledLabel}
                        </div>
                      );
                    }
                    return <span key={i}>{word}</span>;
                  });
                })()}
              </div>
           </div>
        </div>

        {/* Options Zone */}
        <div className="flex flex-wrap justify-center gap-6 p-8 bg-black/40 backdrop-blur-md pixel-corners w-full border-t-4 border-white/10">
          <AnimatePresence>
            {feedback !== 'correct' && currentChallenge.options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                disabled={selectedIds.includes(option.id)}
                onClick={() => handleSelectOption(option.id)}
                className={`
                  bg-white pixel-corners p-6 min-w-40 flex flex-col items-center justify-center cursor-pointer pixel-shadow transition-all
                  ${selectedIds.includes(option.id) ? 'opacity-40 grayscale pointer-events-none' : ''}
                  ${feedback === 'incorrect' && selectedIds.includes(option.id) ? 'bg-red-100' : ''}
                `}
              >
                {option.icon && <span className="text-5xl mb-2">{option.icon}</span>}
                <span className="font-pixel text-2xl text-slate-800">{option.label}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback === 'correct' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-game-green p-12 pixel-corners flex flex-col items-center gap-4 text-white shadow-2xl">
              <span className="text-8xl">☀️</span>
              <h2 className="font-pixel text-6xl">PERFECT!</h2>
              <div className="flex gap-2 text-game-yellow">
                <Star className="w-12 h-12 fill-game-yellow" />
                <Star className="w-12 h-12 fill-game-yellow" />
                <Star className="w-12 h-12 fill-game-yellow" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
