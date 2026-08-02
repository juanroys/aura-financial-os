import React, { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'coral' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  glow = 'none',
  onClick 
}) => {
  const glowClasses = {
    cyan: 'hover:border-[#00f2fe]/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)]',
    violet: 'hover:border-[#7928ca]/40 hover:shadow-[0_0_30px_rgba(121,40,202,0.15)]',
    emerald: 'hover:border-[#10b981]/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    amber: 'hover:border-[#f59e0b]/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    coral: 'hover:border-[#ff416c]/40 hover:shadow-[0_0_30px_rgba(255,65,108,0.15)]',
    none: ''
  };

  return (
    <div 
      onClick={onClick}
      className={clsx(
        'vision-card p-6 relative overflow-hidden',
        glowClasses[glow],
        onClick && 'cursor-pointer active:scale-[0.99]',
        className
      )}
    >
      {/* Specular top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
