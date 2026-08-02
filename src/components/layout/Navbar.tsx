import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  CreditCard, 
  MailCheck, 
  ShieldAlert, 
  Receipt, 
  Plus, 
  Compass, 
  Sparkles,
  Bot,
  FileText,
  Award
} from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

export type ActiveTab = 'chat' | 'dashboard' | 'vault' | 'fico' | 'future_income' | 'expenses' | 'subscriptions' | 'debts' | 'tax' | 'alerts';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickAction: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenQuickAction 
}) => {
  const { healthMetrics, alerts, ficoReport } = useFinancials();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'chat', label: 'AI Counselor', icon: Bot },
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'vault', label: 'Bóveda PDF', icon: FileText },
    { id: 'fico', label: 'FICO Crédito', icon: Award },
    { id: 'future_income', label: 'Ingresos Futuros', icon: TrendingUp },
    { id: 'expenses', label: 'Gastos & Deducibles', icon: CreditCard },
    { id: 'subscriptions', label: 'Suscripciones', icon: MailCheck },
    { id: 'debts', label: 'Deudas', icon: ShieldAlert },
    { id: 'tax', label: 'Taxes', icon: Receipt },
    { id: 'alerts', label: 'Roadmap', icon: Compass },
  ];

  const unreadAlerts = alerts.length;

  return (
    <header className="sticky top-4 z-50 px-4 md:px-8 mb-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 vision-glass p-2.5 rounded-full shadow-2xl">
        
        {/* Brand & Health Ring */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-3 pl-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#7928ca] via-[#00f2fe] to-[#10b981] p-[2px] shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-[#05060b] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00f2fe] animate-pulse" />
            </div>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-sm font-bold tracking-wider text-white flex items-center gap-1.5">
              AURA <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-[#00f2fe] border border-white/15">AI Financial OS</span>
            </h1>
            <p className="text-[11px] text-gray-400 font-medium">Vision OS Lunar Architecture</p>
          </div>
        </div>

        {/* Floating Spatial Navigation Pills */}
        <nav className="flex items-center gap-1 bg-black/50 p-1.5 rounded-full border border-white/10 overflow-x-auto max-w-full no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-white/20 to-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/35 font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00f2fe]' : 'text-gray-400'}`} />
                <span>{item.label}</span>

                {item.id === 'alerts' && unreadAlerts > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#ff416c] text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_8px_#ff416c]">
                    {unreadAlerts}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status & Quick Action Button */}
        <div className="flex items-center gap-2.5 pr-2">
          
          {/* FICO Badge */}
          <div 
            onClick={() => setActiveTab('fico')}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium cursor-pointer hover:bg-white/10 transition-all"
          >
            <Award className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="text-gray-400">FICO:</span>
            <span className="font-bold text-[#00f2fe]">{ficoReport.score}</span>
          </div>

          {/* Health Score Pill */}
          <div 
            onClick={() => setActiveTab('dashboard')}
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#10b981] text-white text-xs font-bold shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(121,40,202,0.5)] transition-all active:scale-95 border border-white/30"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Registro</span>
          </button>
        </div>

      </div>
    </header>
  );
};
