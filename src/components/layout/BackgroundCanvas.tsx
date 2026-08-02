import React from 'react';

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030408]">
      
      {/* Central 3D Silver Lunar Orb Glow */}
      <div 
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full lunar-orb opacity-40 animate-lunar-pulse"
      />

      {/* Floating Star Light Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-12 left-1/5 w-1.5 h-1.5 rounded-full bg-white opacity-60 animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#00f2fe] opacity-50 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-white opacity-40 animate-ping" style={{ animationDuration: '5s' }} />
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 rounded-full bg-[#7928ca] opacity-50 animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      {/* Secondary accent lighting: Cyan neon flare top right */}
      <div 
        className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #00f2fe 0%, rgba(121, 40, 202, 0.15) 70%, transparent 100%)' }}
      />

      {/* Tertiary accent lighting: Deep violet flare bottom left */}
      <div 
        className="absolute -bottom-40 -left-40 w-[750px] h-[750px] rounded-full blur-[160px] opacity-25"
        style={{ background: 'radial-gradient(circle, #7928ca 0%, rgba(16, 185, 129, 0.12) 70%, transparent 100%)' }}
      />

      {/* Subtle Moon surface grid overlay for spatial depth */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '90px 90px'
        }}
      />
    </div>
  );
};
