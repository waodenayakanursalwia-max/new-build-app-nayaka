import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, X } from 'lucide-react';
import { STICKERS } from '../constants';

interface StickerBackpackProps {
  isOpen: boolean;
  onClose: () => void;
  collectedStickers: string[];
}

export const StickerBackpack: React.FC<StickerBackpackProps> = ({ isOpen, onClose, collectedStickers }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            id="sticker-backpack-panel"
            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-stone-100 z-50 pixel-corners m-4 p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-game-pink pixel-corners flex items-center justify-center text-white">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-pixel text-4xl text-slate-800">STICKER BACKPACK</h2>
                  <p className="font-sans text-sm text-slate-500 uppercase font-bold tracking-widest">
                    {collectedStickers.length} / {STICKERS.length} COLLECTED
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-white pixel-corners flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 overflow-y-auto pr-4 pb-12 custom-scrollbar">
              {STICKERS.map(sticker => {
                const isCollected = collectedStickers.includes(sticker.id);
                return (
                  <motion.div
                    key={sticker.id}
                    whileHover={isCollected ? { scale: 1.1, rotate: 5 } : {}}
                    className={`
                      aspect-square pixel-corners flex flex-col items-center justify-center p-4 bg-white
                      ${!isCollected ? 'opacity-20 grayscale' : 'pixel-shadow'}
                    `}
                  >
                    <span className="text-5xl mb-2">{sticker.icon}</span>
                    <span className="font-pixel text-xs text-center text-slate-600">{sticker.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
