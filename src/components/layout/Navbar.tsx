import React from 'react';
import { 
  Bot, 
  TrendingUp, 
  ShieldAlert, 
  Receipt, 
  Plus, 
  Sparkles,
  Award
} from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

export type MainHubTab = 'chat' | 'cashflow' | 'credit' | 'tax';

interface NavbarProps {
  activeTab: MainHubTab;
  setActiveTab: (tab: MainHubTab) => void;
  onOpenQuickAction: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenQuickAction 
}) => {
  const { healthMetrics, ficoReport } = useFinancials();

  const hubs: { id: MainHubTab; label: string; sub: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'chat', label: 'AI Counselor', sub: 'Asistente & VPS Notes', icon: Bot },
    { id: 'cashflow', label: 'Caja & Flujo', sub: 'Dashboard, Ingresos & Gastos', icon: TrendingUp },
    { id: 'credit', label: 'Deudas & FICO', sub: 'Plan Avalancha & Score', icon: ShieldAlert },
    { id: 'tax', label: 'Taxes & Bóveda', sub: 'Declaración & OCR PDF', icon: Receipt },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 md:px-8 mb-6 pointer-events-auto">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 vision-glass p-3 rounded-full shadow-2xl">
        
        {/* Brand & Health Ring */}
        <div 
          onClick={() => setActiveTab('cashflow')} 
          className="flex items-center gap-3 pl-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#7928ca] via-[#00f2fe] to-[#10b981] p-[2px] shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#05060b] rounded-full flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-[#00f2fe] animate-pulse" />
            </div>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-sm font-bold tracking-wider text-white flex items-center gap-1.5">
              AURA <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-[#00f2fe] border border-white/15">Financial OS</span>
            </h1>
          </div>
        </div>

        {/* Minimalist 4 Primary Hub Pills */}
        <nav className="flex items-center gap-1.5 bg-black/50 p-1.5 rounded-full border border-white/10 overflow-x-auto max-w-full no-scrollbar">
          {hubs.map((hub) => {
            const Icon = hub.icon;
            const isActive = activeTab === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setActiveTab(hub.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-white/20 to-white/10 shadow-[0_0_20px_rgba(0,242,254,0.3)] border border-white/35 font-bold scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00f2fe]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <span className="block leading-tight">{hub.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Right Status Badges & Quick Action */}
        <div className="flex items-center gap-2.5 pr-2">
          
          {/* FICO Badge */}
          <div 
            onClick={() => setActiveTab('credit')}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium cursor-pointer hover:bg-white/10 transition-all"
          >
            <Award className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="text-gray-400">FICO:</span>
            <span className="font-bold text-[#00f2fe]">{ficoReport.score}</span>
          </div>

          {/* Health Score Pill */}
          <div 
            onClick={() => setActiveTab('cashflow')}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium cursor-pointer hover:bg-white/10 transition-all"
          >
            <span className="text-gray-400">Score:</span>
            <span className={`font-bold ${
              healthMetrics.score >= 75 ? 'text-[#10b981]' : healthMetrics.score >= 50 ? 'text-[#f59e0b]' : 'text-[#ff416c]'
            }`}>
              {healthMetrics.score}/100
            </span>
          </div>

          {/* Quick Action button */}
          <button
            onClick={onOpenQuickAction}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#10b981] text-white text-xs font-bold shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105 transition-all border border-white/30"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Registro</span>
          </button>
        </div>

      </div>
    </header>
  );
};
