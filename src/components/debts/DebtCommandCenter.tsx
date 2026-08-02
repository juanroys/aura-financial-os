import React, { useState } from 'react';
import { ShieldAlert, Flame, Snowflake } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const DebtCommandCenter: React.FC = () => {
  const { debts, updateDebtBalance } = useFinancials();

  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');
  const [extraPayment, setExtraPayment] = useState<number>(300);

  const totalDebtBalance = debts.reduce((sum, d) => sum + d.remainingBalance, 0);
  const totalMinPayments = debts.reduce((sum, d) => sum + d.minimumPayment, 0);

  // Sorting debts by strategy
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === 'avalanche') {
      return b.interestRate - a.interestRate;
    } else {
      return a.remainingBalance - b.remainingBalance;
    }
  });

  // Calculate estimated payoff time in months
  const monthlyTotalPaydown = totalMinPayments + extraPayment;
  const estimatedMonthsToZero = monthlyTotalPaydown > 0 ? Math.ceil(totalDebtBalance / monthlyTotalPaydown) : 36;
  const estimatedInterestSaved = Math.round(totalDebtBalance * 0.18 * (extraPayment / 200));

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <GlassCard glow="coral">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ff416c]/10 text-[#ff416c] border border-[#ff416c]/30 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Centro de Control de Deudas
              </span>
              <span className="text-xs text-gray-400">Camino a Deuda Cero</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Estrategia de Eliminación de Deudas</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Visualiza tus compromisos financieros con total claridad. Elige tu estrategia matemática y calcula exactamente en cuántos meses serás <strong className="text-white">100% libre de deudas</strong>.
            </p>
          </div>

          {/* Key Debt Metric */}
          <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-2xl border border-white/10 w-full md:w-auto">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Deuda Pendiente</span>
              <span className="text-xl font-black text-[#ff416c]">${totalDebtBalance.toLocaleString()} USD</span>
            </div>
            <div className="h-8 w-[1px] bg-white/15" />
            <div>
              <span className="text-[10px] text-[#00f2fe] uppercase font-semibold block">Tiempo a Deuda Cero</span>
              <span className="text-xl font-black text-[#00f2fe]">{estimatedMonthsToZero} meses</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Strategy Toggle & Extra Payment Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strategy Selector */}
        <GlassCard glow="violet">
          <h3 className="text-sm font-bold text-white mb-2">Estrategia Preferida de Pago</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setStrategy('avalanche')}
              className={`p-3 rounded-xl border text-left transition-all ${
                strategy === 'avalanche'
                  ? 'bg-gradient-to-br from-[#ff416c]/20 to-[#7928ca]/20 border-[#ff416c] text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Flame className="w-4 h-4 text-[#ff416c]" /> Método Avalancha
              </div>
              <p className="text-[10px] text-gray-300 mt-1">Prioriza pagar primero la deuda con mayor tasa de interés (% APR). Maximiza ahorro en intereses.</p>
            </button>

            <button
              onClick={() => setStrategy('snowball')}
              className={`p-3 rounded-xl border text-left transition-all ${
                strategy === 'snowball'
                  ? 'bg-gradient-to-br from-[#00f2fe]/20 to-[#10b981]/20 border-[#00f2fe] text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Snowflake className="w-4 h-4 text-[#00f2fe]" /> Método Bola de Nieve
              </div>
              <p className="text-[10px] text-gray-300 mt-1">Prioriza cancelar primero la deuda de menor saldo. Aporta victorias psicológicas rápidas.</p>
            </button>
          </div>
        </GlassCard>

        {/* Extra Payment Accelerator */}
        <GlassCard glow="cyan">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">Abono Adicional Mensual a Deuda</h3>
            <span className="text-[#00f2fe] font-black text-base">+${extraPayment} USD/mes</span>
          </div>
          <input
            type="range"
            min="50"
            max="1500"
            step="50"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseInt(e.target.value))}
            className="w-full accent-[#00f2fe] cursor-pointer"
          />
          <div className="mt-3 flex items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/10">
            <span>Ahorro proyectado en intereses: <strong className="text-[#10b981]">${estimatedInterestSaved.toLocaleString()} USD</strong></span>
            <span>Abono Total: <strong className="text-white">${monthlyTotalPaydown.toLocaleString()} USD</strong></span>
          </div>
        </GlassCard>

      </div>

      {/* Debts Inventory Cards List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center justify-between">
          <span>Tus Deudas Ordenadas por Prioridad ({strategy.toUpperCase()})</span>
          <span className="text-xs font-normal text-gray-400">Actualiza el saldo a medida que abones</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedDebts.map((debt, index) => {
            const progressPercent = Math.round(((debt.totalBalance - debt.remainingBalance) / debt.totalBalance) * 100);
            const isPriority = index === 0;

            return (
              <GlassCard 
                key={debt.id} 
                glow={isPriority ? 'coral' : 'none'}
                className={`space-y-3 ${isPriority ? 'border-[#ff416c]/50 bg-[#ff416c]/5' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    {isPriority && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-black bg-[#ff416c] text-white uppercase tracking-wider mb-1 inline-block">
                        🎯 Blanco #1 de Pago
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-white">{debt.name}</h4>
                    <span className="text-xs text-gray-400">{debt.creditor}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-white/10 text-[#ff416c] font-black">
                    {debt.interestRate}% APR
                  </span>
                </div>

                {/* Balance Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">Progreso de Pago</span>
                    <span className="text-white font-bold">{progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00f2fe] to-[#10b981] transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-white/5 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">Saldo Restante</span>
                    <span className="text-sm font-black text-white">${debt.remainingBalance.toLocaleString()}</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">Pago Mínimo</span>
                    <span className="text-sm font-bold text-gray-200">${debt.minimumPayment}/mes</span>
                  </div>
                </div>

                {/* Quick Pay Down Input */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Registrar abono..."
                    className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = parseFloat((e.target as HTMLInputElement).value);
                        if (!isNaN(val)) {
                          updateDebtBalance(debt.id, Math.max(0, debt.remainingBalance - val));
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      updateDebtBalance(debt.id, Math.max(0, debt.remainingBalance - debt.minimumPayment));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#10b981] text-white text-xs font-bold whitespace-nowrap hover:bg-[#10b981]/80 transition-all"
                  >
                    Abonar Mínimo
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

    </div>
  );
};
