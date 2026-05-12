import React from 'react';
import { motion } from 'motion/react';
import { Level } from '../types';
import { Star, Lock } from 'lucide-react';

interface LevelCardProps {
  level: Level;
  onSelect: (id: number) => void;
  unlocked: boolean;
  completed?: boolean;
}

export const LevelCard: React.FC<LevelCardProps> = ({ level, onSelect, unlocked, completed }) => {
  return (
    <motion.div
      whileHover={unlocked ? { y: -10, scale: 1.02 } : {}}
      onClick={() => unlocked && onSelect(level.id)}
      id={`level-card-${level.id}`}
      className={`
        relative w-72 h-[420px] pixel-corners bg-white overflow-hidden cursor-pointer group
        ${!unlocked ? 'grayscale pointer-events-none opacity-80' : 'pixel-shadow hover:shadow-xl transition-all'}
      `}
    >
      {/* Background Hero */}
      <div 
        className="w-full h-44 relative overflow-hidden"
        style={{ 
          backgroundColor: level.color,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 2px, transparent 2px), 
            linear-gradient(90deg, rgba(255,255,255,0.1) 2px, transparent 2px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-7xl filter drop-shadow-[0_8px_0_rgba(0,0,0,0.2)]"
          >
            {level.emoji}
          </motion.span>
        </div>
        
        {/* Floating elements for RPG feel */}
        <div className="absolute top-2 left-2 opacity-30 text-white">✨</div>
        <div className="absolute bottom-4 right-4 opacity-30 text-white">🌿</div>
      </div>

      <div className="p-6 flex flex-col h-[calc(420px-11rem)]">
        <div className="flex justify-between items-start mb-3">
          <span className="font-pixel text-slate-400 bg-slate-100 px-2 py-0.5 pixel-border-sm text-xs">
            {level.challenges.length} QUESTS
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3].map(i => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${completed ? 'text-game-yellow fill-game-yellow' : 'text-slate-200'}`} 
              />
            ))}
          </div>
        </div>
        
        <h3 className="font-pixel text-3xl mb-1 text-slate-800 group-hover:text-game-blue transition-colors">
          {level.title}
        </h3>
        <p className="font-sans text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mb-4">
          {level.ageRange}
        </p>
        
        <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
          {level.description}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="flex justify-between font-pixel text-xs text-slate-400">
            <span>PROGRESS</span>
            <span>{completed ? '100%' : '0%'}</span>
          </div>
          <div className="h-4 w-full bg-slate-100 pixel-border-sm relative p-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: completed ? '100%' : '0%' }}
              className="h-full bg-game-green"
            />
          </div>
        </div>
      </div>

      {!unlocked && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-white pixel-corners flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
          <span className="font-pixel text-3xl text-white drop-shadow-md">LOCKED</span>
          <p className="font-pixel text-white/70 text-sm mt-2">COMPLETE PREVIOUS STAGE</p>
        </div>
      )}
    </motion.div>
  );
};
