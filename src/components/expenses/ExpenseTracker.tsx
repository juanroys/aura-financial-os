import React, { useState } from 'react';
import { CreditCard, Search, Tag, Percent, Trash2, ArrowDownRight, CheckCircle2, XCircle } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const ExpenseTracker: React.FC = () => {
  const { transactions, deleteTransaction, taxSettings } = useFinancials();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deductibleOnly, setDeductibleOnly] = useState(false);

  const expenses = transactions.filter(t => t.type === 'expense');

  const filteredExpenses = expenses.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.purposeTag.toLowerCase().includes(search.toLowerCase()) ||
                          (t.vendor && t.vendor.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesDeductible = !deductibleOnly || t.isDeductible;

    return matchesSearch && matchesCategory && matchesDeductible;
  });

  const totalExpenseSum = filteredExpenses.reduce((sum, t) => sum + t.amount, 0);
  const totalDeductibleSum = filteredExpenses.filter(t => t.isDeductible).reduce((sum, t) => sum + t.amount, 0);
  const estimatedTaxSavings = totalDeductibleSum * (taxSettings.estimatedTaxBracketPercent / 100);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <GlassCard glow="coral">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ff416c]/10 text-[#ff416c] border border-[#ff416c]/30 flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> Control de Egresos & Deducibles
              </span>
              <span className="text-xs text-gray-400">Auditoría de Recursos Utilizados</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Gastos y Asignación de Recursos</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Conoce exactamente <strong className="text-white">para qué se usó cada dólar consumido</strong>. Marca los gastos elegibles para deducir impuestos y reduce tu carga tributaria anual.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 w-full md:w-auto">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Total Gastos</span>
              <span className="text-lg font-black text-white">${totalExpenseSum.toLocaleString()} USD</span>
            </div>
            <div className="h-8 w-[1px] bg-white/15" />
            <div>
              <span className="text-[10px] text-[#f59e0b] uppercase font-semibold block">Ahorro Fiscal</span>
              <span className="text-lg font-black text-[#f59e0b]">${Math.round(estimatedTaxSavings).toLocaleString()} USD</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 vision-glass p-3 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar por concepto, proveedor o etiqueta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00f2fe]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#080911] border border-white/15 text-white text-xs focus:outline-none"
          >
            <option value="all">Todas las Categorías</option>
            <option value="software">Software & Apps</option>
            <option value="cloud">Cloud / Hosting</option>
            <option value="office">Equipos & Oficina</option>
            <option value="consulting">Asesoría / Honorarios</option>
            <option value="utilities">Internet / Servicios</option>
            <option value="debt_payment">Pagos de Deudas</option>
            <option value="entertainment">Entretenimiento</option>
          </select>

          <button
            onClick={() => setDeductibleOnly(!deductibleOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deductibleOnly ? 'bg-[#f59e0b] text-black shadow-lg font-bold' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Percent className="w-3.5 h-3.5" /> Deducibles Solamente
          </button>
        </div>
      </div>

      {/* Expense List Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Fecha & Concepto</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Propósito de Uso (Recurso)</th>
                <th className="py-3 px-4 text-center">Deducible Impuestos</th>
                <th className="py-3 px-4 text-right">Monto (USD)</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <ArrowDownRight className="w-3.5 h-3.5 text-[#ff416c]" />
                        {tx.title}
                      </div>
                      <span className="text-[10px] text-gray-400">{tx.date} • {tx.vendor || 'Proveedor general'}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 capitalize text-[11px]">
                        {tx.category.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <Tag className="w-3 h-3 text-[#00f2fe] shrink-0" />
                        <span className="truncate">{tx.purposeTag || 'Sin etiqueta especificada'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.isDeductible 
                          ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' 
                          : 'bg-gray-800 text-gray-500'
                      }`}>
                        {tx.isDeductible ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {tx.isDeductible ? 'Sí (Ahorra 25%)' : 'No'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-white text-sm">
                      ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#ff416c] hover:bg-white/10 transition-colors"
                        title="Eliminar gasto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    No se encontraron gastos con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

    </div>
  );
};
