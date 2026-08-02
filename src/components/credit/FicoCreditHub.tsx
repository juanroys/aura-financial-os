import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Award, Briefcase, Rocket } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const FicoCreditHub: React.FC = () => {
  const { ficoReport, updateFicoReport, triggerMilestoneCelebration } = useFinancials();

  const [scoreInput, setScoreInput] = useState<string>(ficoReport.score.toString());
  const [utilizationInput, setUtilizationInput] = useState<string>(ficoReport.creditUtilizationPercent.toString());

  const handleSaveFicoUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const newScore = Math.min(850, Math.max(300, parseInt(scoreInput) || 680));
    const newUtil = Math.min(100, Math.max(0, parseFloat(utilizationInput) || 30));

    let tier: any = 'Good';
    if (newScore < 580) tier = 'Poor';
    else if (newScore < 670) tier = 'Fair';
    else if (newScore < 740) tier = 'Good';
    else if (newScore < 800) tier = 'Very Good';
    else tier = 'Exceptional';

    updateFicoReport({
      score: newScore,
      tier,
      creditUtilizationPercent: newUtil,
      lastUpdated: new Date().toISOString().split('T')[0]
    });

    triggerMilestoneCelebration();
  };

  const getScoreColor = (score: number) => {
    if (score >= 740) return '#10b981'; // Green
    if (score >= 670) return '#00f2fe'; // Cyan
    if (score >= 580) return '#f59e0b'; // Amber
    return '#ff416c'; // Red
  };

  const scoreColor = getScoreColor(ficoReport.score);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <GlassCard glow="cyan">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30 flex items-center gap-1">
                <Award className="w-3 h-3" /> FICO Credit & Founder Growth Hub
              </span>
              <span className="text-xs text-gray-400">Estrategia para CEOs & Trabajo Físico</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Centro de Crédito FICO & Cashflow Founder</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Optimiza tu reporte FICO para acceder a <strong className="text-white">líneas de crédito corporativas al 0% APR</strong>. Separa tu salario de trabajo físico (supervivencia) de los ingresos de tu startup (crecimiento).
            </p>
          </div>

          {/* Dual Income Status Pill */}
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#f59e0b]" />
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Trabajo Físico</span>
                <span className="text-xs font-bold text-white">Supervivencia Personal</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/15" />
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#00f2fe]" />
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">Startup CEO</span>
                <span className="text-xs font-bold text-[#00f2fe]">Crecimiento Futuro</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: FICO Score Dial & Form */}
        <GlassCard glow="cyan" className="space-y-5">
          <div className="text-center space-y-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Puntaje FICO Score Actual</span>
            
            {/* Spatial FICO Gauge Dial */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="transition-all duration-1000 ease-out"
                  strokeDasharray={`${Math.round((ficoReport.score / 850) * 100)}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke={scoreColor}
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{ filter: `drop-shadow(0 0 10px ${scoreColor})` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{ficoReport.score}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: scoreColor }}>
                  {ficoReport.tier}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400">Actualizado: {ficoReport.lastUpdated}</p>
          </div>

          {/* Form to update FICO Report */}
          <form onSubmit={handleSaveFicoUpdate} className="space-y-3 pt-3 border-t border-white/10">
            <h4 className="text-xs font-bold text-white">Actualizar Reporte FICO</h4>

            <div>
              <label className="block text-[11px] text-gray-300 mb-1">Nuevo Puntaje FICO (300 - 850)</label>
              <input
                type="number"
                min="300"
                max="850"
                value={scoreInput}
                onChange={(e) => setScoreInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-300 mb-1">% Utilización de Tarjetas (Objetivo &lt; 30%)</label>
              <input
                type="number"
                step="1"
                min="0"
                max="100"
                value={utilizationInput}
                onChange={(e) => setUtilizationInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#00f2fe] text-black font-bold text-xs hover:bg-[#00f2fe]/80 transition-all shadow-lg"
            >
              Guardar Puntaje FICO
            </button>
          </form>
        </GlassCard>

        {/* Right: Credit Breakdown & 90-Day Strategy Roadmap */}
        <GlassCard glow="violet" className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7928ca]" />
                Factores del Reporte FICO & Optimización Founder
              </h3>
              <p className="text-xs text-gray-400">Diagnóstico de elegibilidad para capital de trabajo</p>
            </div>
          </div>

          {/* Factors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-gray-400 block">Utilización Crédito</span>
              <span className={`text-base font-black ${
                ficoReport.creditUtilizationPercent <= 30 ? 'text-[#10b981]' : 'text-[#ff416c]'
              }`}>
                {ficoReport.creditUtilizationPercent}%
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Meta: &lt;30%</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-gray-400 block">Pagos a Tiempo</span>
              <span className="text-base font-black text-[#10b981]">{ficoReport.onTimePaymentPercent}%</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Historial perfecto</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-gray-400 block">Límite Total Crédito</span>
              <span className="text-base font-black text-white">${ficoReport.totalCreditLimit.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Capacidad disponible</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-gray-400 block">Indagaciones Activas</span>
              <span className="text-base font-black text-[#00f2fe]">{ficoReport.activeInquiries}</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Impacto bajo</span>
            </div>
          </div>

          {/* Recommendations List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" /> Recomendaciones AI para Subir FICO a 750+
            </h4>

            <div className="space-y-2">
              {ficoReport.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-gray-200">
                  <span className="w-5 h-5 rounded-full bg-[#00f2fe]/20 text-[#00f2fe] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
