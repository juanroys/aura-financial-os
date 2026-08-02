import React from 'react';
import { 
  ArrowLeft, 
  Home, 
  Calendar, 
  Plus, 
  Users, 
  ClipboardList, 
  Megaphone, 
  Target, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Search, 
  Bell, 
  Sparkles,
  Bot
} from 'lucide-react';

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
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between gap-4">
      
      {/* Left Brand Logo & Back Circle Button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-black text-lg tracking-tight text-[#0f1218]">
          <div className="w-6 h-6 rounded bg-[#0f1218] flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#00e676]" />
          </div>
          <span>aura<span className="font-light text-gray-500">financial</span></span>
        </div>

        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-sm hover:scale-105 transition-all ml-2"
          title="Regresar"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Center Icon Pill Bar */}
      <nav className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-gray-200/50 overflow-x-auto no-scrollbar">
        
        <button 
          onClick={() => setActiveTab('cashflow')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'cashflow' ? 'bg-[#0f1218] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Resumen Caja & Flujo"
        >
          <Home className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
          title="Calendario de Pagos"
        >
          <Calendar className="w-4 h-4" />
        </button>

        <button 
          onClick={onOpenQuickAction}
          className="w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
          title="Agregar Registro"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('chat')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'chat' ? 'bg-[#0f1218] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="AURA AI Counselor Chat"
        >
          <Bot className="w-4.5 h-4.5 text-[#00e676]" />
        </button>

        <button 
          onClick={() => setActiveTab('credit')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'credit' ? 'bg-[#0f1218] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Centro FICO & Crédito"
        >
          <Users className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('tax')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'tax' ? 'bg-[#0f1218] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Taxes & Bóveda PDF"
        >
          <ClipboardList className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
          title="Alertas & Noticias"
        >
          <Megaphone className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('credit')}
          className="w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
          title="Objetivos & Metas FICO"
        >
          <Target className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('tax')}
          className="w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
          title="Protección Fiscal IRS/DIAN"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('tax')}
          className="w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
          title="Documentos OCR"
        >
          <FileText className="w-4 h-4" />
        </button>

        <button 
          onClick={() => setActiveTab('cashflow')}
          className="w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all"
          title="Historial"
        >
          <Clock className="w-4 h-4" />
        </button>
      </nav>

      {/* Right Search, Notification & Avatar */}
      <div className="flex items-center gap-2.5">
        <button 
          className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-sm hover:scale-105 transition-all"
          title="Buscar"
        >
          <Search className="w-4 h-4" />
        </button>

        <button 
          className="relative w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-sm hover:scale-105 transition-all"
          title="Notificaciones"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff3b30] ring-2 ring-white" />
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white shadow-sm cursor-pointer hover:scale-105 transition-all">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
            alt="Founder Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </header>
  );
};
