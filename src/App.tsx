import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserState, LevelId } from './types';
import { LEVELS } from './constants';
import { LevelCard } from './components/LevelCard';
import { PixelButton } from './components/PixelButton';
import { GameUI } from './components/GameUI';
import { StickerBackpack } from './components/StickerBackpack';
import { Book, Star, Package } from 'lucide-react';

export default function App() {
  const [userState, setUserState] = useState<UserState>({
    currentLevel: null,
    stars: 12,
    unlockedLevels: [1],
    stickers: ['apple']
  });
  const [showBackpack, setShowBackpack] = useState(false);
  const [showCompletion, setShowCompletion] = useState<string | null>(null);

  const handleStartLevel = (id: number) => {
    setUserState(prev => ({ ...prev, currentLevel: id as LevelId }));
  };

  const handleCompleteLevel = (stickerId: string) => {
    setShowCompletion(stickerId);
    setUserState(prev => {
      const nextLevel = (prev.currentLevel || 0) + 1;
      const isLast = nextLevel > LEVELS.length;
      
      return {
        ...prev,
        currentLevel: null,
        stars: prev.stars + 3,
        stickers: prev.stickers.includes(stickerId) ? prev.stickers : [...prev.stickers, stickerId],
        unlockedLevels: isLast ? prev.unlockedLevels : 
          prev.unlockedLevels.includes(nextLevel as LevelId) ? prev.unlockedLevels : 
          [...prev.unlockedLevels, nextLevel as LevelId]
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {userState.currentLevel === null ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col pt-8 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full"
          >
            {/* Nav Header */}
            <header className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-game-blue pixel-corners flex items-center justify-center text-white p-2">
                  <div className="w-full h-full border-2 border-white/50 pixel-corners-sm flex items-center justify-center">
                    <Book className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h1 className="font-pixel text-4xl text-slate-800 leading-none">ECHOPATH</h1>
                  <p className="font-pixel text-lg text-game-blue tracking-tighter">WORD BUILDERS</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white pixel-corners px-4 py-2 flex items-center gap-2 pixel-shadow">
                  <Star className="w-5 h-5 text-game-yellow fill-game-yellow" />
                  <span className="font-pixel text-2xl text-slate-800 pt-1">{userState.stars}</span>
                </div>
                <PixelButton color="bg-game-pink" size="sm" onClick={() => setShowBackpack(true)}>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>BACKPACK</span>
                  </div>
                </PixelButton>
              </div>
            </header>

            {/* Main Map Area */}
            <main className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center mb-8">
                <h2 className="font-pixel text-6xl text-slate-800 tracking-wide mb-2">WORLD MAP</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-1 w-12 bg-slate-200 pixel-border-sm" />
                  <span className="font-pixel text-game-blue text-lg">CHAPTER 1: THE BEGINNING</span>
                  <div className="h-1 w-12 bg-slate-200 pixel-border-sm" />
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-12">
                {LEVELS.map(level => (
                  <LevelCard 
                    key={level.id}
                    level={level}
                    unlocked={userState.unlockedLevels.includes(level.id)}
                    completed={userState.unlockedLevels.includes((level.id + 1) as LevelId) || (level.id === 3 && userState.stars > 15)}
                    onSelect={handleStartLevel}
                  />
                ))}
              </div>
            </main>
          </motion.div>
        ) : (
          <GameUI 
            key="game"
            level={LEVELS.find(l => l.id === userState.currentLevel)!}
            onExit={() => setUserState(prev => ({ ...prev, currentLevel: null }))}
            onComplete={handleCompleteLevel}
          />
        )}
      </AnimatePresence>

      <StickerBackpack 
        isOpen={showBackpack}
        onClose={() => setShowBackpack(false)}
        collectedStickers={userState.stickers}
      />

      {/* Completion Reward Modal */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white pixel-corners p-12 max-w-sm w-full flex flex-col items-center text-center gap-6"
            >
              <h3 className="font-pixel text-4xl text-slate-800">LEVEL CLEAR!</h3>
              <p className="font-sans text-slate-500 uppercase font-bold text-sm tracking-widest">YOU FOUND A NEW STICKER!</p>
              
              <div className="w-40 h-40 bg-slate-50 pixel-corners flex items-center justify-center text-8xl p-4 rotate-3 shadow-inner">
                {showCompletion === 'dragon' && '🐲'}
                {showCompletion === 'rocket' && '🚀'}
                {showCompletion === 'ship' && '🚢'}
                {showCompletion === 'star' && '⭐'}
              </div>

              <PixelButton color="bg-game-green" size="md" onClick={() => setShowCompletion(null)}>
                COLLECT
              </PixelButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
