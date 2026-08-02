import React from 'react';

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05060b]">
      
      {/* Central 3D Silver Lunar Orb Glow */}
      <div 
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full lunar-orb opacity-35 animate-lunar-pulse"
      />

      {/* Secondary accent lighting: Cyan neon flare top right */}
      <div 
        className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, #00f2fe 0%, rgba(121, 40, 202, 0.15) 70%, transparent 100%)' }}
      />

      {/* Tertiary accent lighting: Deep violet flare bottom left */}
      <div 
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
        style={{ background: 'radial-gradient(circle, #7928ca 0%, rgba(16, 185, 129, 0.1) 70%, transparent 100%)' }}
      />

      {/* Subtle Moon surface noise grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
};
