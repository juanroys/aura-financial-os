import React from 'react';
import { 
  ArrowLeft, 
  Home, 
  Calendar, 
  Plus, 
  Folder, 
  Users, 
  ClipboardCheck, 
  Megaphone, 
  Wrench, 
  ShieldCheck, 
  FileText, 
  PieChart, 
  Search, 
  Bell 
} from 'lucide-react';

export type MainHubTab = 'chat' | 'cashflow' | 'credit' | 'tax';

interface NavbarProps {
  activeTab: MainHubTab;
  setActiveTab: (tab: MainHubTab) => void;
  onOpenQuickAction: () => void;
}

// 3D Stacked Diamond Cube Logo matching reference image exactly
const CubeStackedLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 12l10 5 10-5-10-5-10 5z" opacity="0.8" />
    <path d="M2 17l10 5 10-5-10-5-10 5z" opacity="0.6" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab,
  setActiveTab, 
  onOpenQuickAction 
}) => {
  return (
    <header className="w-full px-8 py-5 flex items-center justify-between gap-4 border-b border-gray-200/60">
      
      {/* Left: Brand Logo & Standalone Circular Back Arrow Button */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-[#101217]">
          <CubeStackedLogo className="w-5.5 h-5.5 text-[#101217]" />
          <span className="tracking-tight text-xl font-extrabold text-[#101217]">sugarcrm</span>
        </div>

        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-10 h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-[#101217] hover:bg-white transition-all shadow-2xs ml-2"
          title="Regresar"
        >
          <ArrowLeft className="w-4 h-4 stroke-[1.75]" />
        </button>
      </div>

      {/* Center: Standalone Floating Circular Buttons (Exact 11 Floating Circles from Reference Image) */}
      <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        
        {/* 1. Home */}
        <button 
          onClick={() => setActiveTab('cashflow')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'cashflow' ? 'bg-white/90 text-gray-700 shadow-2xs' : 'bg-white/90 text-gray-700 shadow-2xs'
          }`}
          title="Home"
        >
          <Home className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 2. Calendar */}
        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Calendario"
        >
          <Calendar className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 3. Plus */}
        <button 
          onClick={onOpenQuickAction}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Agregar Registro"
        >
          <Plus className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 4. Active Module (SOLID BLACK CIRCLE matching image) */}
        <button 
          onClick={() => setActiveTab('chat')}
          className="w-10 h-10 rounded-full bg-[#101217] text-white shadow-md hover:scale-105 flex items-center justify-center transition-all"
          title="Módulo Activo / Chat AI"
        >
          <Folder className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 5. Users */}
        <button 
          onClick={() => setActiveTab('credit')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Cuentas & Crédito"
        >
          <Users className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 6. Clipboard Tasks */}
        <button 
          onClick={() => setActiveTab('tax')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Tareas & Deducibles"
        >
          <ClipboardCheck className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 7. Megaphone */}
        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Alertas & Noticias"
        >
          <Megaphone className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 8. Wrench / Tools */}
        <button 
          onClick={() => setActiveTab('credit')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Herramientas"
        >
          <Wrench className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 9. Shield Security */}
        <button 
          onClick={() => setActiveTab('tax')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Protección Impuestos"
        >
          <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 10. File Document */}
        <button 
          onClick={() => setActiveTab('tax')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Documentos PDF"
        >
          <FileText className="w-4 h-4 stroke-[1.75]" />
        </button>

        {/* 11. Clock / Chart */}
        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
          title="Historial"
        >
          <PieChart className="w-4 h-4 stroke-[1.75]" />
        </button>
      </nav>

      {/* Right: Search, Notification Bell with Red Dot & User Avatar */}
      <div className="flex items-center gap-3">
        <button 
          className="w-10 h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-2xs"
          title="Buscar"
        >
          <Search className="w-4 h-4 stroke-[1.75]" />
        </button>

        <button 
          className="relative w-10 h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-2xs"
          title="Notificaciones"
        >
          <Bell className="w-4 h-4 stroke-[1.75]" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ff3b30]" />
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-2xs cursor-pointer hover:scale-105 transition-all">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </header>
  );
};
