import React, { useState } from 'react';
import { Edit3, UserCheck, Mail, Phone, Building2, MapPin, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { FounderEditModal } from '../common/FounderEditModal';
import { useFinancials } from '../../context/FinancialContext';

export const FounderProfileCard: React.FC = () => {
  const { sendChatMessage } = useFinancials();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'records'>('details');
  const [showSugarHint, setShowSugarHint] = useState(false);

  const handleSugarHintClick = () => {
    setShowSugarHint(!showSugarHint);
    if (!showSugarHint) {
      sendChatMessage('💡 Dame una sugerencia ejecutiva Sugar Hint para optimizar la caja de mi startup hoy.');
    }
  };

  return (
    <div className="w-full bg-transparent p-6 space-y-6 font-jakarta relative">
      
      {/* Header Row: Logo emblem + Title + Independent Standalone Action Pills */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Emblem Stadium Oval & Title Stack */}
        <div className="flex items-center gap-6">
          
          {/* White Oval Stadium Emblem */}
          <div className="w-36 h-20 rounded-full bg-white flex flex-col items-center justify-center text-center p-2 shadow-2xs border border-gray-200/50 shrink-0">
            <span className="font-serif-logo font-black text-2xl text-[#101217] tracking-tight leading-none">MTM</span>
            <span className="font-serif-logo text-[7px] text-gray-500 font-bold tracking-widest mt-1">INVESTMENT</span>
          </div>

          {/* Title Stack */}
          <h2 className="font-jakarta text-2xl font-extrabold text-[#101217] leading-tight tracking-tight">
            MTM<br />Investment<br />Bank
          </h2>
        </div>

        {/* Action Pills - Completely Separate Standalone Pills Set Directly on Silver Canvas */}
        <div className="flex items-center gap-3 flex-wrap relative">
          <button 
            onClick={() => setActiveSubTab('details')}
            className={`px-6 py-2.5 rounded-full font-jakarta font-bold text-xs transition-all ${
              activeSubTab === 'details'
                ? 'bg-[#101217] text-white shadow-sm'
                : 'bg-transparent border border-gray-300/80 text-[#101217] hover:bg-white/50'
            }`}
          >
            Account Details
          </button>

          <button 
            onClick={() => setActiveSubTab('records')}
            className={`px-5 py-2.5 rounded-full font-jakarta font-semibold text-xs transition-all ${
              activeSubTab === 'records'
                ? 'bg-[#101217] text-white shadow-sm'
                : 'bg-transparent border border-gray-300/80 text-[#101217] hover:bg-white/50'
            }`}
          >
            Record Details
          </button>

          <button 
            onClick={handleSugarHintClick}
            className="px-5 py-2.5 rounded-full bg-transparent border border-gray-300/80 text-[#101217] font-jakarta font-semibold text-xs hover:bg-white/50 transition-all flex items-center gap-1.5"
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
            <div className="absolute top-12 right-0 z-30 w-80 p-4 rounded-2xl bg-[#101217] text-white shadow-2xl border border-white/10 text-xs space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#d6f535] flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#10d670]" /> Sugar Executive Hint
                </span>
                <button onClick={() => setShowSugarHint(false)} className="text-gray-400 font-bold hover:text-white">×</button>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                "Asigna el 25% de tu próximo depósito de empleo físico directamente a la reserva fiscal W2/1099 antes de cubrir gastos operativos."
              </p>
              <div className="pt-1 text-right">
                <span className="text-[9px] text-[#10d670] font-bold">✓ Enviado al Chat IA AURA</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metadata Grid (3 Cols, 2 Rows) */}
      {activeSubTab === 'details' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 text-xs font-jakarta pt-2 animate-fadeIn">
          
          {/* Type */}
          <div className="space-y-1">
            <span className="text-[#101217] font-bold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Type
            </span>
            <p className="text-gray-500 font-medium pl-5.5">Customer / Founder CEO</p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <span className="text-[#101217] font-bold flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Email
            </span>
            <p className="text-gray-500 font-medium pl-5.5">support@mtmbank.com</p>
          </div>

          {/* Office Phone */}
          <div className="space-y-1">
            <span className="text-[#101217] font-bold flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Office Phone
            </span>
            <p className="text-gray-500 font-medium pl-5.5">+ 1 - 641 - 321 - 5050</p>
          </div>

          {/* Industry */}
          <div className="space-y-1">
            <span className="text-[#101217] font-bold flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Industry
            </span>
            <p className="text-gray-500 font-medium pl-5.5">Education / Startup FinTech</p>
          </div>

          {/* Billing Address */}
          <div className="space-y-1">
            <span className="text-[#101217] font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Billing Address
            </span>
            <p className="text-gray-500 font-medium leading-tight pl-5.5">
              259 Bel Air Ave<br />Orlando, Florida 32812<br />USA
            </p>
          </div>

          {/* Shipping Address */}
          <div className="space-y-1">
            <span className="text-[#101217] font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Shipping Address
            </span>
            <p className="text-gray-500 font-medium leading-tight pl-5.5">
              259 Bel Air Ave<br />Orlando, Florida 32812<br />USA
            </p>
          </div>

          {/* Web Site */}
          <div className="space-y-1 col-span-1">
            <span className="text-[#101217] font-bold flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-gray-500 stroke-[1.75]" /> Web Site
            </span>
            <p className="text-gray-500 font-medium pl-5.5 truncate">mtmbank.com</p>
          </div>

        </div>
      ) : (
        /* Record Details View */
        <div className="p-4 rounded-2xl bg-white border border-gray-200 text-xs font-jakarta space-y-3 animate-fadeIn">
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

      {/* Founder Edit Modal */}
      <FounderEditModal 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

    </div>
  );
};
