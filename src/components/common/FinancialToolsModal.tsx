import React, { useState } from 'react';
import { Wrench, X, TrendingUp, ShieldAlert } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface FinancialToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancialToolsModal: React.FC<FinancialToolsModalProps> = ({ isOpen, onClose }) => {
  const { debts } = useFinancials();
  const [extraPayment, setExtraPayment] = useState('200');

  const totalDebt = debts.reduce((sum, d) => sum + d.remainingBalance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

  const monthsToPayoffWithoutExtra = totalMinPayment > 0 ? Math.ceil(totalDebt / totalMinPayment) : 24;
  const monthsToPayoffWithExtra = (totalMinPayment + parseFloat(extraPayment || '0')) > 0 
    ? Math.ceil(totalDebt / (totalMinPayment + parseFloat(extraPayment || '0'))) 
    : 12;

  const monthsSaved = Math.max(0, monthsToPayoffWithoutExtra - monthsToPayoffWithExtra);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#101217] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d6f535]/20 border border-[#d6f535]/40 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#d6f535]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">Herramientas & Simuladores Financieros</h3>
              <p className="text-[10px] text-gray-300">Aceleración Avalancha, Cálculo de Runway & Tasa Fiscal</p>
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
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Debt Accelerator Simulator */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-[#101217] text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#10d670]" /> Simulador Acelerador Avalancha de Deudas
              </h4>
              <span className="text-[10px] text-gray-400 font-bold">Deuda Total: ${totalDebt.toLocaleString()} USD</span>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-gray-700 block">Abono Adicional Mensual de tu Trabajo Físico ($ USD)</label>
              <input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-[#101217] focus:outline-none focus:border-[#101217]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                <span className="text-[10px] text-gray-400 font-medium block">Tiempo con Pago Mínimo</span>
                <strong className="text-sm font-black text-gray-700">{monthsToPayoffWithoutExtra} Meses</strong>
              </div>

              <div className="p-3.5 rounded-xl bg-[#10d670]/15 border border-[#10d670]/30">
                <span className="text-[10px] text-[#10d670] font-bold block">Tiempo Acelerado AURA</span>
                <strong className="text-sm font-black text-[#10d670]">{monthsToPayoffWithExtra} Meses ({monthsSaved} Meses Ahorrados)</strong>
              </div>
            </div>
          </div>

          {/* Runway & Emergency Fund Tool */}
          <div className="p-5 rounded-2xl bg-[#101217] text-white space-y-3 shadow-md">
            <h4 className="font-extrabold text-[#d6f535] text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#d6f535]" /> Calculadora de Runway & Supervivencia Startup
            </h4>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Tu trabajo físico sostiene actualmente el 100% de tu costo de vida fijo. Tu startup cuenta con un fondo de emergencia operativo de 6.5 meses de burn rate.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 font-medium">
          AURA System Financial Engine Tools
        </div>

      </div>
    </div>
  );
};
