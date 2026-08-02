import React, { useState } from 'react';
import { Edit3, UserCheck, Mail, Phone, Building2, MapPin, Globe, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { FounderEditModal } from '../common/FounderEditModal';
import { useFinancials } from '../../context/FinancialContext';

export const FounderProfileCard: React.FC = () => {
  const { sendChatMessage } = useFinancials();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'records'>('details');
  const [showSugarHint, setShowSugarHint] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSugarHintClick = () => {
    setShowSugarHint(!showSugarHint);
    if (!showSugarHint) {
      sendChatMessage('💡 Dame una sugerencia ejecutiva Sugar Hint para optimizar la caja de mi startup hoy.');
    }
  };

  return (
    <div className="w-full bg-transparent p-4 sm:p-6 space-y-4 font-jakarta relative border-b md:border-b-0 border-gray-300/60 pb-4">
      
      {/* Header Row: Emblem + Title + Collapsible Chevron on Mobile */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Emblem Oval & Title */}
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-4 cursor-pointer md:cursor-default"
        >
          {/* White Oval Stadium Emblem */}
          <div className="w-28 h-16 sm:w-36 sm:h-20 rounded-full bg-white flex flex-col items-center justify-center text-center p-2 shadow-2xs border border-gray-200/50 shrink-0">
            <span className="font-serif-logo font-black text-xl sm:text-2xl text-[#101217] tracking-tight leading-none">MTM</span>
            <span className="font-serif-logo text-[6px] sm:text-[7px] text-gray-500 font-bold tracking-widest mt-0.5 sm:mt-1">INVESTMENT</span>
          </div>

          <div>
            <h2 className="font-jakarta text-lg sm:text-2xl font-extrabold text-[#101217] leading-tight tracking-tight">
              MTM Investment Bank
            </h2>
            <span className="text-[10px] text-gray-500 font-semibold md:hidden block">
              {isCollapsed ? 'Toca para expandir detalles' : 'Toca para colapsar'}
            </span>
          </div>
        </div>

        {/* Chevron for Mobile Collapsing */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="md:hidden text-[#101217] p-2 hover:bg-gray-200/50 rounded-full transition-all"
        >
          {isCollapsed ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
        </button>
      </div>

      {/* Body Content (Collapsible on Mobile, always expanded on Desktop) */}
      {!isCollapsed && (
        <div className="space-y-4 animate-fadeIn pt-2">
          
          {/* Action Pills */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap relative">
            <button 
              onClick={() => setActiveSubTab('details')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-jakarta font-bold text-xs transition-all ${
                activeSubTab === 'details'
                  ? 'bg-[#101217] text-white shadow-sm'
                  : 'bg-transparent border border-gray-300/80 text-[#101217] hover:bg-white/50'
              }`}
            >
              Account Details
            </button>

            <button 
              onClick={() => setActiveSubTab('records')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-jakarta font-semibold text-xs transition-all ${
                activeSubTab === 'records'
                  ? 'bg-[#101217] text-white shadow-sm'
                  : 'bg-transparent border border-gray-300/80 text-[#101217] hover:bg-white/50'
              }`}
            >
              Record Details
            </button>

            <button 
              onClick={handleSugarHintClick}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-transparent border border-gray-300/80 text-[#101217] font-jakarta font-semibold text-xs hover:bg-white/50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#10d670]" />
              <span>Sugar Hint</span>
            </button>

            <button 
              onClick={() => setIsEditOpen(true)}
              className="w-9 h-9 rounded-full border border-gray-300/80 bg-transparent text-gray-700 flex items-center justify-center hover:bg-white/50 transition-all"
              title="Editar Información"
            >
              <Edit3 className="w-4 h-4 text-gray-600 stroke-[1.75]" />
            </button>

            {/* Sugar Hint Popover */}
            {showSugarHint && (
              <div className="absolute top-12 right-0 z-30 w-72 sm:w-80 p-4 rounded-2xl bg-[#101217] text-white shadow-2xl border border-white/10 text-xs space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#d6f535] flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#10d670]" /> Sugar Executive Hint
                  </span>
                  <button onClick={() => setShowSugarHint(false)} className="text-gray-400 font-bold hover:text-white">×</button>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  "Asigna el 25% de tu próximo depósito de empleo físico directamente a la reserva fiscal W2/1099 antes de cubrir gastos operativos."
                </p>
              </div>
            )}
          </div>

          {/* Metadata Grid */}
          {activeSubTab === 'details' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 sm:gap-y-6 gap-x-8 text-xs font-jakarta pt-2">
              
              <div className="space-y-1">
                <span className="text-[#101217] font-bold flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Type
                </span>
                <p className="text-gray-500 font-medium pl-5.5">Customer / Founder CEO</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#101217] font-bold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Email
                </span>
                <p className="text-gray-500 font-medium pl-5.5">support@mtmbank.com</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#101217] font-bold flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Office Phone
                </span>
                <p className="text-gray-500 font-medium pl-5.5">+ 1 - 641 - 321 - 5050</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#101217] font-bold flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Industry
                </span>
                <p className="text-gray-500 font-medium pl-5.5">Education / Startup FinTech</p>
              </div>

              <div className="space-y-1">
                <span className="text-[#101217] font-bold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Billing Address
                </span>
                <p className="text-gray-500 font-medium leading-tight pl-5.5">
                  259 Bel Air Ave, Orlando, FL 32812 USA
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[#101217] font-bold flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Web Site
                </span>
                <p className="text-gray-500 font-medium pl-5.5 truncate">mtmbank.com</p>
              </div>

            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white border border-gray-200 text-xs font-jakarta space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 font-bold text-[#101217]">
                <span>Registros del Sistema AURA Financial</span>
                <span className="text-[10px] text-gray-400 font-medium">Actualizado hace 2 min</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-semibold">Estado de Cuenta</span>
                  <strong className="text-xs font-bold text-[#10d670] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Activo & Verificado
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-semibold">Nivel de Cuenta</span>
                  <strong className="text-xs font-black text-[#101217]">Tier 1 Founder</strong>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-semibold">Servidor VPS</span>
                  <strong className="text-xs font-mono text-gray-700">187.77.3.244</strong>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-semibold">Modo AI Co-Pilot</span>
                  <strong className="text-xs font-bold text-[#10d670]">En Vivo (Real-time)</strong>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Founder Edit Modal */}
      <FounderEditModal 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

    </div>
  );
};
