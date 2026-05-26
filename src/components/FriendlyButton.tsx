import React from 'react';
import { motion } from 'motion/react';

interface FriendlyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const FriendlyButton: React.FC<FriendlyButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button"
}) => {
  const baseClasses = "font-display font-semibold transition-all duration-200 outline-none flex items-center justify-center gap-2 rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";
  
  const variantClasses = {
    primary: "bg-brand-sage text-white shadow-md hover:bg-brand-sage/90 shadow-brand-sage/10",
    secondary: "bg-brand-clay text-stone-700 hover:bg-brand-clay/80",
    accent: "bg-brand-terracotta text-white shadow-md hover:bg-brand-terracotta/90 shadow-brand-terracotta/10",
    danger: "bg-red-500 text-white shadow-md hover:bg-red-600 shadow-red-100"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98, y: 0 }}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
