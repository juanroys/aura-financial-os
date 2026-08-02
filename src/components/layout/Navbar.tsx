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
import { FinancialCalendarModal } from '../common/FinancialCalendarModal';
import { FinancialToolsModal } from '../common/FinancialToolsModal';
import { AssetProtectionModal } from '../common/AssetProtectionModal';
import { DocumentVaultModal } from '../common/DocumentVaultModal';
import { HistoricalAnalyticsDrawer } from '../common/HistoricalAnalyticsDrawer';

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isProtectionOpen, setIsProtectionOpen] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <>
      <header className="w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-2 sm:gap-4 border-b border-gray-200/60 font-jakarta">
        
        {/* Left: Brand Logo & Standalone Circular Back Arrow Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div 
            onClick={() => setActiveTab('cashflow')}
            className="flex items-center gap-2 font-bold text-[#101217] cursor-pointer hover:opacity-80 transition-all"
          >
            <CubeStackedLogo className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#101217]" />
            <span className="tracking-tight text-lg sm:text-xl font-extrabold text-[#101217]">sugarcrm</span>
          </div>

          <button 
            onClick={() => setActiveTab('cashflow')}
            className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-[#101217] hover:bg-white transition-all shadow-2xs ml-1 sm:ml-2"
            title="Regresar al Inicio"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>

        {/* Center: Desktop Circular Menu Row (Hidden on mobile, visible on md:flex) */}
        <nav className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
          
          {/* 1. Home */}
          <button 
            onClick={() => setActiveTab('cashflow')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'cashflow' ? 'bg-[#101217] text-white shadow-md' : 'bg-white/90 text-gray-700 shadow-2xs hover:scale-105'
            }`}
            title="1. Home / Flujo de Caja"
          >
            <Home className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 2. Calendar */}
          <button 
            onClick={() => setIsCalendarOpen(true)}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="2. Calendario Financiero"
          >
            <Calendar className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 3. Plus */}
          <button 
            onClick={onOpenQuickAction}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="3. Agregar Registro Rápido"
          >
            <Plus className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 4. Active Module */}
          <button 
            onClick={() => setActiveTab('chat')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'chat' ? 'bg-[#101217] text-white shadow-md ring-2 ring-[#10d670]' : 'bg-[#101217] text-white shadow-md hover:scale-105'
            }`}
            title="4. Módulo Activo / Chat AI Counselor"
          >
            <Folder className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 5. Users / Credit */}
          <button 
            onClick={() => setActiveTab('credit')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'credit' ? 'bg-[#101217] text-white shadow-md' : 'bg-white/90 text-gray-700 shadow-2xs hover:scale-105'
            }`}
            title="5. Cuentas & Score FICO"
          >
            <Users className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 6. Clipboard Tasks */}
          <button 
            onClick={() => setActiveTab('tax')}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="6. Tareas & Deducibles Fiscales"
          >
            <ClipboardCheck className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 7. Megaphone */}
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="7. Alertas & Noticias Financieras"
          >
            <Megaphone className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 8. Wrench */}
          <button 
            onClick={() => setIsToolsOpen(true)}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="8. Herramientas & Simuladores"
          >
            <Wrench className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 9. Shield Security */}
          <button 
            onClick={() => setIsProtectionOpen(true)}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="9. Protección de Activos"
          >
            <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 10. File Document */}
          <button 
            onClick={() => setIsVaultModalOpen(true)}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="10. Bóveda OCR PDF"
          >
            <FileText className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* 11. Clock / Chart */}
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-700 shadow-2xs hover:scale-105 hover:bg-white flex items-center justify-center transition-all"
            title="11. Auditoría Histórica"
          >
            <PieChart className="w-4 h-4 stroke-[1.75]" />
          </button>
        </nav>

        {/* Right: Search, Notification Bell & Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Plus Action for Mobile */}
          <button
            onClick={onOpenQuickAction}
            className="md:hidden w-8.5 h-8.5 rounded-full bg-[#101217] text-white flex items-center justify-center shadow-sm"
            title="Agregar Registro Rápido"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-2xs"
            title="Búsqueda Global"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-gray-300/80 bg-transparent flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-2xs"
            title="Notificaciones en Vivo"
          >
            <Bell className="w-4 h-4 stroke-[1.75]" />
            <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-2 h-2 rounded-full bg-[#ff3b30] animate-pulse" />
          </button>

          {/* User Avatar */}
          <div 
            onClick={() => setIsProfileModalOpen(true)}
            className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-2xs cursor-pointer hover:scale-105 transition-all ring-2 ring-[#101217]/20"
            title="Perfil Founder"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </header>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <FounderEditModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <FinancialCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      <FinancialToolsModal isOpen={isToolsOpen} onClose={() => setIsToolsOpen(false)} />
      <AssetProtectionModal isOpen={isProtectionOpen} onClose={() => setIsProtectionOpen(false)} />
      <DocumentVaultModal isOpen={isVaultModalOpen} onClose={() => setIsVaultModalOpen(false)} />
      <HistoricalAnalyticsDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  );
};
