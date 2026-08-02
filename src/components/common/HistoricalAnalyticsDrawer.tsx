import React from 'react';
import { PieChart, X, History } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface HistoricalAnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoricalAnalyticsDrawer: React.FC<HistoricalAnalyticsDrawerProps> = ({ isOpen, onClose }) => {
  const { transactions, healthMetrics } = useFinancials();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end font-jakarta animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#101217] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
              <PieChart className="w-4 h-4 text-[#10d670]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-tight">Historial & Auditoría Analítica</h3>
              <p className="text-[10px] text-gray-300">Desglose de Categorías & Registro Histórico</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* Health Score Metric */}
          <div className="p-4 rounded-2xl bg-[#101217] text-white space-y-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Puntaje de Salud Financiera AURA</span>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-black text-[#d6f535]">{healthMetrics.score} / 100</p>
              <span className="px-3 py-1 rounded-full bg-[#10d670]/20 text-[#10d670] text-xs font-bold border border-[#10d670]/40">
                {healthMetrics.stabilityTier}
              </span>
            </div>
          </div>

          {/* Audit Trail List */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <History className="w-3.5 h-3.5 text-gray-400" /> Registro Completo de Auditoría ({transactions.length})
            </h4>

            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-between">
                  <div>
                    <strong className="text-[#101217] font-extrabold block text-xs">{tx.title}</strong>
                    <span className="text-gray-400 text-[10px]">{tx.date} • {tx.category}</span>
                  </div>
                  <span className={`font-black ${tx.type === 'income' ? 'text-[#10d670]' : 'text-[#101217]'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
          AURA System Audit Trail & History Engine
        </div>

      </div>
    </div>
  );
};
