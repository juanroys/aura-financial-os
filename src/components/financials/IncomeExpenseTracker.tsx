import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Plus, Calendar, PieChart, ShieldCheck } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import type { CategoryType } from '../../types';

export const IncomeExpenseTracker: React.FC = () => {
  const { transactions, addTransaction, healthMetrics } = useFinancials();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category] = useState<CategoryType>('software');
  const [isDeductible] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    addTransaction({
      title,
      amount: parseFloat(amount),
      type,
      category,
      purposeTag: 'Operación & Startup',
      isDeductible: type === 'expense' ? isDeductible : false,
      paymentMethod: 'Tarjeta / Bank',
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setAmount('');
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashFlow = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col relative w-full font-jakarta space-y-6">
      
      {/* Dark Header Cap (Interlocking Top) */}
      <div className="interlock-dark-cap flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#10d670]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight font-jakarta">
              Control de Ingresos & Gastos
            </h3>
            <p className="text-[10px] text-gray-300 font-medium">Flujo de Caja Ejecutivo Startup & Personal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center gap-1.5 border border-white/15">
            <Calendar className="w-3.5 h-3.5" />
            <span>Agosto 2026</span>
          </button>
        </div>
      </div>

      {/* White Body (Interlocking Concave Entry into Dark Cap) */}
      <div className="interlock-white-body p-7 space-y-6">
        
        {/* KPI Cards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center justify-between">
              Ingresos Totales <ArrowUpRight className="w-4 h-4 text-[#10d670]" />
            </span>
            <p className="text-2xl font-black text-[#101217]">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-[#10d670] font-bold">↑ Trabajo Físico & Startup</span>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center justify-between">
              Gastos Operativos <ArrowDownRight className="w-4 h-4 text-[#e64a53]" />
            </span>
            <p className="text-2xl font-black text-[#101217]">${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-gray-400 font-bold">Burn Rate: ${healthMetrics.burnRateMonthly}/mes</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#101217] text-white space-y-2 shadow-md">
            <span className="text-xs text-gray-300 font-bold uppercase tracking-wider flex items-center justify-between">
              Flujo Neto Disponible <ShieldCheck className="w-4 h-4 text-[#d6f535]" />
            </span>
            <p className="text-2xl font-black text-[#d6f535]">${netCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-gray-300 font-medium">Salud: {healthMetrics.stabilityTier} ({healthMetrics.score}/100)</span>
          </div>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-4">
          <h4 className="text-xs font-extrabold text-[#101217] uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-[#10d670]" /> Registrar Nuevo Movimiento
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Descripción (ej: Pago Servidores, Sueldo)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="md:col-span-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#101217]"
            />

            <input
              type="number"
              placeholder="Monto ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#101217]"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')}
              className="px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 focus:outline-none focus:border-[#101217]"
            >
              <option value="expense">Gasto (-)</option>
              <option value="income">Ingreso (+)</option>
            </select>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#101217] text-white font-bold text-xs hover:bg-black transition-all shadow flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Registrar
            </button>
          </div>
        </form>

        {/* Transactions Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h4 className="text-xs font-extrabold text-[#101217] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-gray-500" /> Historial Reciente de Transacciones
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-jakarta">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase border-b border-gray-100 font-semibold">
                  <th className="py-2.5">Fecha</th>
                  <th className="py-2.5">Descripción</th>
                  <th className="py-2.5">Categoría</th>
                  <th className="py-2.5">Deducible</th>
                  <th className="py-2.5 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/80 transition-all">
                    <td className="py-3 text-gray-500">{tx.date}</td>
                    <td className="py-3 font-bold text-[#101217]">{tx.title}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold uppercase">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3">
                      {tx.isDeductible ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#10d670]/20 text-[#10d670] text-[10px] font-bold">
                          ✓ Deducible Impuestos
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px]">-</span>
                      )}
                    </td>
                    <td className={`py-3 text-right font-black ${tx.type === 'income' ? 'text-[#10d670]' : 'text-[#101217]'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
