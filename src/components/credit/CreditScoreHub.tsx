import React from 'react';
import { Award, CreditCard, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

export const CreditScoreHub: React.FC = () => {
  const { ficoReport } = useFinancials();

  return (
    <div className="flex flex-col relative w-full font-jakarta space-y-6">
      
      {/* Dark Header Cap (Interlocking Top) */}
      <div className="interlock-dark-cap flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#d6f535]/20 border border-[#d6f535]/40 flex items-center justify-center">
            <Award className="w-5 h-5 text-[#d6f535]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight font-jakarta">
              Control de Puntaje & Crédito FICO
            </h3>
            <p className="text-[10px] text-gray-300 font-medium">Reporte de Salud Financiera & Apalancamiento para Startup</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#10d670]/20 text-[#10d670] border border-[#10d670]/40 text-xs font-extrabold">
            ✓ Nivel {ficoReport.tier} ({ficoReport.score})
          </span>
        </div>
      </div>

      {/* White Body (Interlocking Concave Entry into Dark Cap) */}
      <div className="interlock-white-body p-7 space-y-6">
        
        {/* FICO Gauge Widget */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101217] to-[#1e2330] text-white space-y-4 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Score Number */}
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Puntaje FICO Actual</span>
              <p className="text-5xl font-black text-[#d6f535]">{ficoReport.score}</p>
              <p className="text-xs text-[#10d670] font-bold">Rango: 300 - 850 ({ficoReport.tier})</p>
            </div>

            {/* Gauge Representation */}
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                <span>300 (Pobre)</span>
                <span>670 (Bueno)</span>
                <span className="text-[#d6f535]">850 (Excelente)</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-[#e64a53] via-[#d6f535] to-[#10d670] rounded-full transition-all duration-1000"
                  style={{ width: `${((ficoReport.score - 300) / 550) * 100}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Credit Utilization & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center justify-between">
              Utilización de Crédito <CreditCard className="w-4 h-4 text-gray-400" />
            </span>
            <p className="text-2xl font-black text-[#101217]">{ficoReport.creditUtilizationPercent}%</p>
            <span className="text-[10px] text-[#10d670] font-bold">✓ Por debajo del 30% sugerido</span>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center justify-between">
              Historial de Pagos <TrendingUp className="w-4 h-4 text-[#10d670]" />
            </span>
            <p className="text-2xl font-black text-[#101217]">{ficoReport.onTimePaymentPercent}%</p>
            <span className="text-[10px] text-[#10d670] font-bold">✓ 0 Pagos Atrasados</span>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center justify-between">
              Límite Total Crédito <Shield className="w-4 h-4 text-gray-400" />
            </span>
            <p className="text-2xl font-black text-[#101217]">${ficoReport.totalCreditLimit.toLocaleString()}</p>
            <span className="text-[10px] text-gray-400 font-bold">Línea Total Disponible</span>
          </div>
        </div>

        {/* Action Recommendations for Founder */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-[#101217]">Recomendaciones de AURA para Subir tu Puntaje FICO</h4>

          <div className="space-y-2 text-xs">
            {ficoReport.recommendations.map((rec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10d670] shrink-0" />
                  <span className="font-bold text-[#101217]">{rec}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">Impacto Alto</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
