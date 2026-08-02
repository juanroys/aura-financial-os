import React from 'react';
import { Home, Users, ShieldCheck, MessageSquare } from 'lucide-react';
import type { MainHubTab } from './Navbar';

interface MobileBottomNavProps {
  activeTab: MainHubTab;
  setActiveTab: (tab: MainHubTab) => void;
  onOpenQuickAction: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101217]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-around font-jakarta text-white shadow-2xl">
      
      {/* 1. Home / Cashflow */}
      <button
        onClick={() => setActiveTab('cashflow')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'cashflow' ? 'text-[#10d670] scale-105' : 'text-gray-400 hover:text-white'
        }`}
      >
        <div className={`p-1.5 rounded-full ${activeTab === 'cashflow' ? 'bg-[#10d670]/20' : ''}`}>
          <Home className="w-5 h-5 stroke-[1.75]" />
        </div>
        <span className="text-[10px] font-bold">Flujo Caja</span>
      </button>

      {/* 2. Credit / FICO */}
      <button
        onClick={() => setActiveTab('credit')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'credit' ? 'text-[#d6f535] scale-105' : 'text-gray-400 hover:text-white'
        }`}
      >
        <div className={`p-1.5 rounded-full ${activeTab === 'credit' ? 'bg-[#d6f535]/20' : ''}`}>
          <Users className="w-5 h-5 stroke-[1.75]" />
        </div>
        <span className="text-[10px] font-bold">Credit FICO</span>
      </button>

      {/* 3. Tax / Vault */}
      <button
        onClick={() => setActiveTab('tax')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'tax' ? 'text-[#10d670] scale-105' : 'text-gray-400 hover:text-white'
        }`}
      >
        <div className={`p-1.5 rounded-full ${activeTab === 'tax' ? 'bg-[#10d670]/20' : ''}`}>
          <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
        </div>
        <span className="text-[10px] font-bold">Impuestos</span>
      </button>

      {/* 4. AI Chat Counselor */}
      <button
        onClick={() => setActiveTab('chat')}
        className={`flex flex-col items-center gap-1 transition-all ${
          activeTab === 'chat' ? 'text-[#d6f535] scale-105' : 'text-gray-400 hover:text-white'
        }`}
      >
        <div className={`p-1.5 rounded-full ${activeTab === 'chat' ? 'bg-[#d6f535]/20 ring-2 ring-[#d6f535]' : ''}`}>
          <MessageSquare className="w-5 h-5 stroke-[1.75]" />
        </div>
        <span className="text-[10px] font-bold">Chat IA</span>
      </button>

    </div>
  );
};
