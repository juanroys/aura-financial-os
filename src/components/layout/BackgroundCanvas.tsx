import React from 'react';

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080911]">
      {/* Dynamic ambient radial gradients */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-30 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, #7928ca 0%, rgba(0, 242, 254, 0.2) 70%, transparent 100%)' }}
      />
      <div 
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-25"
        style={{ background: 'radial-gradient(circle, #00f2fe 0%, rgba(16, 185, 129, 0.2) 70%, transparent 100%)' }}
      />
      <div 
        className="absolute -bottom-40 left-1/4 w-[800px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, rgba(121, 40, 202, 0.15) 70%, transparent 100%)' }}
      />

      {/* Grid overlay for spatial depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};
