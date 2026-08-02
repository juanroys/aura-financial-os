import React, { useState } from 'react';
import { ShieldCheck, Calculator, FileCheck, DollarSign, PieChart } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

export const TaxStrategyHub: React.FC = () => {
  const { taxSettings } = useFinancials();

  const [grossIncome, setGrossIncome] = useState('85000');
  const [deductions, setDeductions] = useState('14500');

  const estimatedTax = Math.max(0, (parseFloat(grossIncome || '0') - parseFloat(deductions || '0')) * (taxSettings.estimatedTaxBracketPercent / 100));
  const potentialSavings = parseFloat(deductions || '0') * (taxSettings.estimatedTaxBracketPercent / 100);

  return (
    <div className="flex flex-col relative w-full font-jakarta space-y-6">
      
      {/* Dark Header Cap (Interlocking Top) */}
      <div className="interlock-dark-cap flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#10d670]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight font-jakarta">
              Estrategia & Protección Fiscal (Tax Return USA)
            </h3>
            <p className="text-[10px] text-gray-300 font-medium">Cálculo de Impuestos IRS, W2/1099 & Deducciones de Startup</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#10d670]/20 text-[#10d670] border border-[#10d670]/40 text-xs font-extrabold">
            ✓ Región IRS: {taxSettings.taxRegion} ({taxSettings.estimatedTaxBracketPercent}%)
          </span>
        </div>
      </div>

      {/* White Body (Interlocking Concave Entry into Dark Cap) */}
      <div className="interlock-white-body p-7 space-y-6">
        
        {/* KPI Cards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center justify-between">
              Estimado Impuesto Bruto <Calculator className="w-4 h-4 text-gray-400" />
            </span>
            <p className="text-2xl font-black text-[#101217]">${estimatedTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-gray-400 font-bold">Basado en Tasa Efectiva Estimada</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#10d670]/10 border border-[#10d670]/30 space-y-2">
            <span className="text-xs text-[#10d670] font-bold uppercase tracking-wider flex items-center justify-between">
              Ahorro por Deducciones <FileCheck className="w-4 h-4 text-[#10d670]" />
            </span>
            <p className="text-2xl font-black text-[#10d670]">${potentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-[#10d670] font-bold">Meta Deducción: ${taxSettings.annualTaxDeductionGoal}</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#101217] text-white space-y-2 shadow-md">
            <span className="text-xs text-gray-300 font-bold uppercase tracking-wider flex items-center justify-between">
              Reserva Impuestos Actual <DollarSign className="w-4 h-4 text-[#d6f535]" />
            </span>
            <p className="text-2xl font-black text-[#d6f535]">${taxSettings.taxReservesBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-gray-300 font-medium">Reserva Automática Impuestos</span>
          </div>
        </div>

        {/* Tax Simulator Tool */}
        <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-4">
          <h4 className="text-xs font-extrabold text-[#101217] uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-[#101217]" /> Simulador de Impuestos IRS (Schedule C / W2)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Ingreso Bruto Anual Estimado ($)</label>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 focus:outline-none focus:border-[#101217]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Total Deducciones Aprobadas ($)</label>
              <input
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs text-gray-800 focus:outline-none focus:border-[#101217]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Impuesto Anual Neto Estimado</span>
              <strong className="text-lg font-black text-[#101217]">${estimatedTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Ahorro Fiscal Obtenido</span>
              <strong className="text-lg font-black text-[#10d670]">${potentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>
        </div>

        {/* Deductions Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#101217] flex items-center gap-2">
            <PieChart className="w-4 h-4 text-gray-500" /> Lista de Deducciones Legales para Startup & Trabajo Físico
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-start gap-3">
              <span className="text-[#10d670] font-bold">✓</span>
              <div>
                <strong className="text-[#101217] font-bold block">Hosting, Servidores & Software</strong>
                <p className="text-gray-500 text-[11px]">Vercel, AWS, Google Cloud, Dominios y licencias SaaS.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-start gap-3">
              <span className="text-[#10d670] font-bold">✓</span>
              <div>
                <strong className="text-[#101217] font-bold block">Oficina en Casa (Home Office Deduction)</strong>
                <p className="text-gray-500 text-[11px]">Porcentaje proporcional de internet, luz y espacio de trabajo.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
