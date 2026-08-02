import React from 'react';
import { ShieldCheck, X, CheckCircle2, Lock } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface AssetProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetProtectionModal: React.FC<AssetProtectionModalProps> = ({ isOpen, onClose }) => {
  const { taxSettings, ficoReport } = useFinancials();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#101217] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#10d670]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">Protección de Activos & Blindaje Fiscal</h3>
              <p className="text-[10px] text-gray-300">Defensa Patrimonial, Reserva Fiscal IRS & LLC</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <h4 className="font-extrabold text-[#101217] text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#10d670]" /> Estado de Reserva Fiscal & Cobertura
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                <span className="text-[10px] text-gray-400 font-medium block">Reserva de Impuestos</span>
                <strong className="text-sm font-black text-[#10d670]">${taxSettings.taxReservesBalance.toLocaleString()} USD</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                <span className="text-[10px] text-gray-400 font-medium block">Nivel FICO Protección</span>
                <strong className="text-sm font-black text-[#101217]">{ficoReport.tier} ({ficoReport.score})</strong>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-[#101217]">Checklist de Protección de Activos</h4>

            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10d670]" />
                  <span className="font-bold text-[#101217]">Separación Estricta Cuenta Personal vs Startup</span>
                </div>
                <span className="text-[10px] text-[#10d670] font-bold">✓ Blindado</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10d670]" />
                  <span className="font-bold text-[#101217]">Estructura de Entidad Legal (LLC / Delaware C-Corp)</span>
                </div>
                <span className="text-[10px] text-[#10d670] font-bold">✓ Registrado</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10d670]" />
                  <span className="font-bold text-[#101217]">Reserva de Impuestos W2/1099 Automatizada</span>
                </div>
                <span className="text-[10px] text-[#10d670] font-bold">✓ 25% Retenido</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 font-medium">
          AURA System Legal & Asset Security Engine
        </div>

      </div>
    </div>
  );
};
