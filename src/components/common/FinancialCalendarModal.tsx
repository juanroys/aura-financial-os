import React, { useState } from 'react';
import { Calendar as CalendarIcon, X, Clock } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface FinancialCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancialCalendarModal: React.FC<FinancialCalendarModalProps> = ({ isOpen, onClose }) => {
  const { debts } = useFinancials();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'debts' | 'tax' | 'salary'>('all');

  if (!isOpen) return null;

  const calendarEvents = [
    { id: 'e1', date: '2026-08-05', title: 'Depósito Trabajo Físico (Sueldo Principal)', category: 'salary', amount: 2500, status: 'upcoming' },
    { id: 'e2', date: '2026-08-10', title: 'Corte Tarjeta Visa Business', category: 'debts', amount: 350, status: 'upcoming' },
    { id: 'e3', date: '2026-08-15', title: 'Pago Trimestral Estimado IRS (Schedule C)', category: 'tax', amount: 1200, status: 'important' },
    { id: 'e4', date: '2026-08-20', title: 'Renovación Vercel Cloud & AWS', category: 'subscriptions', amount: 45, status: 'upcoming' },
    { id: 'e5', date: '2026-08-25', title: 'Depósito Trabajo Físico (Quincena)', category: 'salary', amount: 2500, status: 'upcoming' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#101217] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-[#10d670]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">Calendario Financiero Ejecutivo</h3>
              <p className="text-[10px] text-gray-300">Fechas de Corte IRS, Pago de Deudas & Ingresos Físicos</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 overflow-x-auto text-xs">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'all' ? 'bg-[#101217] text-white shadow-xs' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            Todos los Eventos
          </button>
          <button 
            onClick={() => setSelectedCategory('debts')}
            className={`px-4 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'debts' ? 'bg-[#101217] text-white shadow-xs' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            💳 Pagos Deudas ({debts.length})
          </button>
          <button 
            onClick={() => setSelectedCategory('tax')}
            className={`px-4 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'tax' ? 'bg-[#101217] text-white shadow-xs' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            🛡️ Corte IRS Impuestos
          </button>
          <button 
            onClick={() => setSelectedCategory('salary')}
            className={`px-4 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === 'salary' ? 'bg-[#101217] text-white shadow-xs' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            💰 Depósitos Sueldo
          </button>
        </div>

        {/* Calendar Events List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          <h4 className="text-xs font-extrabold text-[#101217] uppercase tracking-wider">Agosto 2026</h4>

          <div className="space-y-2">
            {calendarEvents
              .filter(e => selectedCategory === 'all' || e.category === selectedCategory)
              .map((evt) => (
                <div key={evt.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-gray-100/80 transition-all flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs ${
                      evt.category === 'tax' ? 'bg-[#e64a53]/20 text-[#e64a53]' :
                      evt.category === 'salary' ? 'bg-[#10d670]/20 text-[#10d670]' : 'bg-[#d6f535]/20 text-[#101217]'
                    }`}>
                      {evt.date.split('-')[2]}
                    </div>
                    <div>
                      <strong className="text-[#101217] font-extrabold block text-sm">{evt.title}</strong>
                      <span className="text-gray-400 text-[10px] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" /> {evt.date} • {evt.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <span className={`font-black text-sm ${evt.category === 'salary' ? 'text-[#10d670]' : 'text-[#101217]'}`}>
                    {evt.category === 'salary' ? '+' : '-'}${evt.amount.toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 font-medium">
          Sincronizado en tiempo real con alertas AURA OS
        </div>

      </div>
    </div>
  );
};
