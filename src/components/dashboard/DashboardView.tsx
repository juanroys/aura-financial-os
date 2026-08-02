import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  Layers, 
  Percent 
} from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const DashboardView: React.FC<{ onNavigateTab: (tab: any) => void }> = ({ onNavigateTab }) => {
  const { 
    transactions, 
    debts, 
    futureIncomes, 
    taxSettings, 
    healthMetrics, 
    alerts 
  } = useFinancials();

  // Computations
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netCashFlow = totalIncome - totalExpense;

  const totalDebtBalance = debts.reduce((sum, d) => sum + d.remainingBalance, 0);
  const totalPlannedFutureIncome = futureIncomes.reduce((sum, fi) => sum + fi.amount, 0);
  const totalDeductibleExpenses = transactions
    .filter(t => t.type === 'expense' && t.isDeductible)
    .reduce((sum, t) => sum + t.amount, 0);

  const estimatedTaxSaved = totalDeductibleExpenses * (taxSettings.estimatedTaxBracketPercent / 100);

  // Chart data
  const cashFlowChartData = [
    { month: 'May', Ingresos: 4200, Gastos: 2800, Deducibles: 1200 },
    { month: 'Jun', Ingresos: 4900, Gastos: 3100, Deducibles: 1600 },
    { month: 'Jul', Ingresos: totalIncome, Gastos: totalExpense, Deducibles: totalDeductibleExpenses },
    { month: 'Ago (Est.)', Ingresos: totalIncome + totalPlannedFutureIncome, Gastos: 3200, Deducibles: 1800 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Financial Stability Health Diagnostic */}
      <GlassCard glow="cyan" className="bg-gradient-to-r from-white/5 via-white/[0.03] to-transparent border-[#00f2fe]/30">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            {/* Spatial Health Gauge Dial */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00f2fe] transition-all duration-1000 ease-out"
                  strokeDasharray={`${healthMetrics.score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{ filter: 'drop-shadow(0 0 8px #00f2fe)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">{healthMetrics.score}</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Score</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Nivel: {healthMetrics.stabilityTier}
                </span>
                <span className="text-xs text-gray-400">AURA AI Advisor Active</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">Diagnóstico de Estabilidad Financiera</h2>
              <p className="text-xs text-gray-300 max-w-xl mt-1">
                Tu salud financiera está mejorando. Has optimizado <span className="text-[#10b981] font-semibold">${estimatedTaxSaved.toLocaleString()} USD</span> en impuestos deducibles y tienes ingresos futuros planificados por <span className="text-[#00f2fe] font-semibold">${totalPlannedFutureIncome.toLocaleString()} USD</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button 
              onClick={() => onNavigateTab('future_income')}
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all text-center"
            >
              Organizar Futuros Ingresos
            </button>
            <button 
              onClick={() => onNavigateTab('debts')}
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7928ca] to-[#ff416c] text-white text-xs font-bold shadow-[0_0_20px_rgba(121,40,202,0.4)] hover:shadow-[0_0_30px_rgba(255,65,108,0.5)] transition-all text-center"
            >
              Acelerar Pago de Deudas
            </button>
          </div>

        </div>
      </GlassCard>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Net Cashflow */}
        <GlassCard glow="emerald">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold mb-2">
            <span>Flujo Neto de Caja</span>
            <TrendingUp className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-2xl font-black text-white">
            ${netCashFlow >= 0 ? `+${netCashFlow.toLocaleString()}` : netCashFlow.toLocaleString()} <span className="text-xs font-normal text-gray-400">USD</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-white/10 text-gray-400">
            <span>Ingresos: <strong className="text-white">${totalIncome.toLocaleString()}</strong></span>
            <span>Gastos: <strong className="text-white">${totalExpense.toLocaleString()}</strong></span>
          </div>
        </GlassCard>

        {/* Future Incomes Waiting */}
        <GlassCard glow="cyan">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold mb-2">
            <span>Ingresos Futuros Planificados</span>
            <Zap className="w-4 h-4 text-[#00f2fe]" />
          </div>
          <div className="text-2xl font-black text-white">
            ${totalPlannedFutureIncome.toLocaleString()} <span className="text-xs font-normal text-gray-400">USD</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-white/10 text-gray-400">
            <span>Asignados: <strong className="text-[#00f2fe]">{futureIncomes.filter(fi => fi.status === 'allocated').length}/{futureIncomes.length}</strong></span>
            <button onClick={() => onNavigateTab('future_income')} className="text-[#00f2fe] underline font-semibold">Asignar uso</button>
          </div>
        </GlassCard>

        {/* Total Remaining Debt */}
        <GlassCard glow="coral">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold mb-2">
            <span>Saldo Total en Deudas</span>
            <TrendingDown className="w-4 h-4 text-[#ff416c]" />
          </div>
          <div className="text-2xl font-black text-[#ff416c]">
            ${totalDebtBalance.toLocaleString()} <span className="text-xs font-normal text-gray-400">USD</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-white/10 text-gray-400">
            <span>Estrategia: <strong className="text-white">Avalancha (-24.5% APR)</strong></span>
            <button onClick={() => onNavigateTab('debts')} className="text-[#ff416c] underline font-semibold">Plan de pago</button>
          </div>
        </GlassCard>

        {/* Tax Deductions Saved */}
        <GlassCard glow="amber">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold mb-2">
            <span>Ahorro Estimado Impuestos</span>
            <Percent className="w-4 h-4 text-[#f59e0b]" />
          </div>
          <div className="text-2xl font-black text-[#f59e0b]">
            ${Math.round(estimatedTaxSaved).toLocaleString()} <span className="text-xs font-normal text-gray-400">USD</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-white/10 text-gray-400">
            <span>Deducibles registrados: <strong className="text-white">${totalDeductibleExpenses.toLocaleString()}</strong></span>
            <button onClick={() => onNavigateTab('tax')} className="text-[#f59e0b] underline font-semibold">Declaración</button>
          </div>
        </GlassCard>

      </div>

      {/* Spatial Charts & Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Cash Flow Spatial Area Chart (2 Cols) */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00f2fe]" />
                Comportamiento de Caja e Impuestos Deducibles
              </h3>
              <p className="text-xs text-gray-400">Comparativa mensual de ingresos vs gastos y acumulación deducible</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              Q3 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowChartData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff416c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff416c" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDeducibles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#080911', 
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="Ingresos" stroke="#00f2fe" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                <Area type="monotone" dataKey="Gastos" stroke="#ff416c" strokeWidth={2} fillOpacity={1} fill="url(#colorGastos)" />
                <Area type="monotone" dataKey="Deducibles" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorDeducibles)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* AI Recommendations & Urgent Alerts (1 Col) */}
        <GlassCard glow="violet">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7928ca]" />
              Alertas del Asistente AURA
            </h3>
            <button 
              onClick={() => onNavigateTab('alerts')}
              className="text-xs text-[#00f2fe] hover:underline"
            >
              Ver todas ({alerts.length})
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div 
                key={alert.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{alert.title}</span>
                  <span className="text-[10px] text-gray-400">{alert.date}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{alert.message}</p>
                {alert.actionText && (
                  <button 
                    onClick={() => onNavigateTab(
                      alert.type === 'subscription' ? 'subscriptions' :
                      alert.type === 'tax' ? 'tax' :
                      alert.type === 'debt' ? 'debts' : 'alerts'
                    )}
                    className="mt-1 text-xs text-[#00f2fe] font-semibold flex items-center gap-1 hover:underline"
                  >
                    {alert.actionText} <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
