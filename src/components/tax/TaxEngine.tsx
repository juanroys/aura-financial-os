import React from 'react';
import { Receipt, Download, Calculator } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const TaxEngine: React.FC = () => {
  const { transactions, taxSettings, updateTaxSettings, triggerMilestoneCelebration } = useFinancials();

  const totalGrossIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const deductibleTransactions = transactions.filter(t => t.type === 'expense' && t.isDeductible);
  const totalDeductibles = deductibleTransactions.reduce((sum, t) => sum + t.amount, 0);

  const netTaxableIncome = Math.max(0, totalGrossIncome - totalDeductibles);
  const estimatedTaxRate = taxSettings.estimatedTaxBracketPercent / 100;
  const estimatedTaxLiability = netTaxableIncome * estimatedTaxRate;
  const taxSavingsFromDeductions = totalDeductibles * estimatedTaxRate;

  const reserveDeficitOrSurplus = taxSettings.taxReservesBalance - estimatedTaxLiability;

  const handleExportTaxReport = () => {
    triggerMilestoneCelebration();
    const reportText = `====================================================
AURA FINANCIAL OS - INFORME DECLARACIÓN DE IMPUESTOS
====================================================
Fecha de Generación: ${new Date().toLocaleDateString()}
Régimen / Región: ${taxSettings.taxRegion} (${taxSettings.filingStatus})

RESUMEN TRIBUTARIO:
----------------------------------------------------
Ingresos Brutos Registrados:      $${totalGrossIncome.toLocaleString()} USD
Total Gastos Deducibles:          $${totalDeductibles.toLocaleString()} USD
----------------------------------------------------
Base Imponible (Net Taxable):    $${netTaxableIncome.toLocaleString()} USD
Tasa Impositiva Estimada:        ${taxSettings.estimatedTaxBracketPercent}%
Impuesto Estimado a Pagar:        $${estimatedTaxLiability.toLocaleString()} USD
Ahorro Generado por Deducibles:  $${taxSavingsFromDeductions.toLocaleString()} USD
Reserva en Fondo de Impuestos:    $${taxSettings.taxReservesBalance.toLocaleString()} USD

DETALLE DE EXPENSAS DEDUCIBLES REGISTRADAS:
----------------------------------------------------
${deductibleTransactions.map(t => `- [${t.date}] ${t.title}: $${t.amount} USD (${t.category}) | Propósito: ${t.purposeTag}`).join('\n')}

====================================================
AURA OS - Generado automáticamente para fines contables.
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AURA_Declaracion_Impuestos_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <GlassCard glow="amber">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 flex items-center gap-1">
                <Receipt className="w-3 h-3" /> Motor Tributario & Declaraciones
              </span>
              <span className="text-xs text-gray-400">Estimación en Tiempo Real</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Declaración y Estimador de Taxes</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Sin sorpresas a fin de año. AURA calcula automáticamente tu obligación tributaria deduciendo tus gastos operativos validados y genera tu informe listo para tu contable o autodeclaración.
            </p>
          </div>

          <button
            onClick={handleExportTaxReport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#7928ca] text-white text-xs font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 transition-all"
          >
            <Download className="w-4 h-4" /> Exportar Informe de Taxes
          </button>
        </div>
      </GlassCard>

      {/* Tax Math Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <GlassCard glow="cyan">
          <span className="text-xs font-semibold text-gray-400 block">Ingresos Brutos</span>
          <span className="text-2xl font-black text-white mt-1 block">${totalGrossIncome.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400">USD acumulados</span>
        </GlassCard>

        <GlassCard glow="emerald">
          <span className="text-xs font-semibold text-gray-400 block">Deducciones Validadas</span>
          <span className="text-2xl font-black text-[#10b981] mt-1 block">-${totalDeductibles.toLocaleString()}</span>
          <span className="text-[10px] text-[#10b981] font-semibold">{deductibleTransactions.length} recibos deducibles</span>
        </GlassCard>

        <GlassCard glow="amber">
          <span className="text-xs font-semibold text-gray-400 block">Base Imponible Neto</span>
          <span className="text-2xl font-black text-[#f59e0b] mt-1 block">${netTaxableIncome.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400">Ingreso gravable real</span>
        </GlassCard>

        <GlassCard glow="coral">
          <span className="text-xs font-semibold text-gray-400 block">Impuesto Estimado ({taxSettings.estimatedTaxBracketPercent}%)</span>
          <span className="text-2xl font-black text-[#ff416c] mt-1 block">${Math.round(estimatedTaxLiability).toLocaleString()}</span>
          <span className="text-[10px] text-gray-400">Reserva sugerida</span>
        </GlassCard>

      </div>

      {/* Tax Region & Bracket Configuration + Deductible Expenses Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tax Config Card (1 Col) */}
        <GlassCard glow="violet" className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#7928ca]" />
            Parámetros Tributarios
          </h3>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Región / Jurisdicción</label>
            <select
              value={taxSettings.taxRegion}
              onChange={(e) => updateTaxSettings({ taxRegion: e.target.value as any })}
              className="w-full px-3 py-2 rounded-xl bg-[#080911] border border-white/15 text-white text-xs"
            >
              <option value="US">Estados Unidos (IRS - Form 1040/Schedule C)</option>
              <option value="CO">Colombia (DIAN - Renta Persona Natural)</option>
              <option value="MX">México (SAT - RESICO / Actividad Empresarial)</option>
              <option value="ES">España (AEAT - IRPF / Autónomos)</option>
              <option value="OTHER">Internacional / General</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Tasa Estimada Impuesto de Renta (%)</label>
            <input
              type="number"
              value={taxSettings.estimatedTaxBracketPercent}
              onChange={(e) => updateTaxSettings({ estimatedTaxBracketPercent: parseFloat(e.target.value) || 20 })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Fondo Actual Guardado para Impuestos (USD)</label>
            <input
              type="number"
              value={taxSettings.taxReservesBalance}
              onChange={(e) => updateTaxSettings({ taxReservesBalance: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-bold"
            />
          </div>

          <div className={`p-3 rounded-xl border text-xs ${
            reserveDeficitOrSurplus >= 0 ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]' : 'bg-[#ff416c]/10 border-[#ff416c]/30 text-[#ff416c]'
          }`}>
            <span className="font-bold block">
              {reserveDeficitOrSurplus >= 0 ? '✓ Fondo Cobertura Completo' : '⚠️ Deficit en Fondo de Impuestos'}
            </span>
            <span className="text-[11px] opacity-90">
              {reserveDeficitOrSurplus >= 0 
                ? `Tienes un superávit de $${reserveDeficitOrSurplus.toLocaleString()} USD sobre tu obligación estimada.`
                : `Faltan $${Math.abs(reserveDeficitOrSurplus).toLocaleString()} USD para cubrir la reserva de taxes.`}
            </span>
          </div>
        </GlassCard>

        {/* Deductible Expenses Verified Table (2 Cols) */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Desglose de Expensas Deducibles Validadas</h3>
              <p className="text-xs text-gray-400">Total deducido: <strong className="text-[#10b981]">${totalDeductibles.toLocaleString()} USD</strong> • Te ahorró: <strong className="text-[#f59e0b]">${Math.round(taxSavingsFromDeductions).toLocaleString()} USD en taxes</strong></p>
            </div>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {deductibleTransactions.map((tx) => (
              <div key={tx.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-white">{tx.title}</h4>
                  <p className="text-[11px] text-gray-400">{tx.purposeTag}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-black text-[#10b981]">${tx.amount.toLocaleString()} USD</span>
                  <span className="text-[10px] text-gray-400 block">{tx.category}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
