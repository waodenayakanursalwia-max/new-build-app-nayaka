import React from 'react';
import { motion } from 'motion/react';

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  color = "bg-game-blue",
  size = "md",
  disabled = false
}) => {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm pt-2 pb-1",
    md: "px-6 py-2 text-xl pt-3 pb-2",
    lg: "px-10 py-4 text-3xl pt-5 pb-3"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
      onClick={onClick}
      id={`pixel-button-${Math.random().toString(36).substr(2, 9)}`}
      className={`
        relative font-pixel uppercase tracking-widest text-white transition-opacity
        pixel-corners ${color} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
