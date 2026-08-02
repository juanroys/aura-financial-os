import React, { useState } from 'react';
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

import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { NotificationsDrawer } from '../common/NotificationsDrawer';
import { FounderEditModal } from '../common/FounderEditModal';

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <header className="w-full px-8 py-5 flex items-center justify-between gap-4 border-b border-gray-200/60 font-jakarta">
        
        {/* Left: Brand Logo & Standalone Circular Back Arrow Button */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setActiveTab('cashflow')}
            className="flex items-center gap-2 font-bold text-[#101217] cursor-pointer hover:opacity-80 transition-all"
          >
            <CubeStackedLogo className="w-5.5 h-5.5 text-[#101217]" />
            <span className="tracking-tight text-xl font-extrabold text-[#101217]">sugarcrm</span>
          </div>

          <button 
            onClick={() => setActiveTab('cashflow')}
            className="w-10 h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-[#101217] hover:bg-white transition-all shadow-2xs ml-2"
            title="Regresar al Inicio"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>

        {/* Center: Standalone Floating Circular Buttons (Exact 11 Floating Circles) */}
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          
          {/* 1. Home */}
          <button 
            onClick={() => setActiveTab('cashflow')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'cashflow' ? 'bg-[#101217] text-white shadow-md' : 'bg-white/90 text-gray-700 shadow-2xs hover:scale-105'
            }`}
            title="Home / Flujo de Caja"
          >
            <Home className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 2. Calendar */}
          <button 
            onClick={() => setActiveTab('cashflow')}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Calendario Financiero"
          >
            <Calendar className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 3. Plus */}
          <button 
            onClick={onOpenQuickAction}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Agregar Registro Rápido"
          >
            <Plus className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 4. Active Module (SOLID BLACK CIRCLE matching image) */}
          <button 
            onClick={() => setActiveTab('chat')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'chat' ? 'bg-[#101217] text-white shadow-md ring-2 ring-[#10d670]' : 'bg-white/90 text-gray-700 shadow-2xs hover:scale-105'
            }`}
            title="Módulo Activo / Chat AI Counselor"
          >
            <Folder className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 5. Users / Credit */}
          <button 
            onClick={() => setActiveTab('credit')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'credit' ? 'bg-[#101217] text-white shadow-md' : 'bg-white/90 text-gray-700 shadow-2xs hover:scale-105'
            }`}
            title="Cuentas & Score FICO"
          >
            <Users className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 6. Clipboard Tasks */}
          <button 
            onClick={() => setActiveTab('tax')}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Tareas & Deducibles Fiscales"
          >
            <ClipboardCheck className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 7. Megaphone / Alerts */}
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Alertas & Noticias Financieras"
          >
            <Megaphone className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 8. Wrench / Tools */}
          <button 
            onClick={() => setActiveTab('credit')}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Herramientas & Simuladores"
          >
            <Wrench className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 9. Shield Security */}
          <button 
            onClick={() => setActiveTab('tax')}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Protección de Impuestos"
          >
            <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 10. File Document */}
          <button 
            onClick={() => setActiveTab('tax')}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Documentos & Bóveda OCR PDF"
          >
            <FileText className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 11. Clock / Chart */}
          <button 
            onClick={() => setActiveTab('cashflow')}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="Historial de Transacciones"
          >
            <PieChart className="w-4 h-4 stroke-[1.75]" />
          </button>
        </nav>

        {/* Right: Search, Notification Bell with Red Dot & User Avatar */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-2xs"
            title="Búsqueda Global (Transacciones, Notas, PDF)"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="relative w-10 h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-2xs"
            title="Notificaciones en Vivo"
          >
            <Bell className="w-4 h-4 stroke-[1.75]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ff3b30] animate-pulse" />
          </button>

          {/* User Avatar */}
          <div 
            onClick={() => setIsProfileModalOpen(true)}
            className="w-10 h-10 rounded-full overflow-hidden shadow-2xs cursor-pointer hover:scale-105 transition-all ring-2 ring-[#101217]/20"
            title="Perfil Executive Founder"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </header>

      {/* Interactive Global Modals */}
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <NotificationsDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <FounderEditModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </>
  );
};
