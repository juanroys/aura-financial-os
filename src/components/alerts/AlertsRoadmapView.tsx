import React from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const AlertsRoadmapView: React.FC<{ onNavigateTab: (tab: any) => void }> = ({ onNavigateTab }) => {
  const { alerts, dismissAlert, healthMetrics } = useFinancials();

  const roadmapSteps = [
    {
      step: 1,
      title: 'Fase 1: Detener la Hemorragia de Capital',
      description: 'Cancela suscripciones no utilizadas, evita recargos de mora y frena compras impulsivas.',
      completed: true,
      actionText: 'Revisar Suscripciones',
      tab: 'subscriptions'
    },
    {
      step: 2,
      title: 'Fase 2: Protección Fiscal & Fondo de Impuestos',
      description: 'Separa del 20% al 30% de cada ingreso para taxes antes de gastar en cualquier otra cosa.',
      completed: healthMetrics.taxReserveCoverage >= 70,
      actionText: 'Ver Estimador de Impuestos',
      tab: 'tax'
    },
    {
      step: 3,
      title: 'Fase 3: Etiquetado del 100% de los Recursos',
      description: 'Asigna una etiqueta de propósito ("¿Para qué sirve este dinero?") a cada gasto e ingreso.',
      completed: true,
      actionText: 'Auditar Gastos',
      tab: 'expenses'
    },
    {
      step: 4,
      title: 'Fase 4: Ejecutar el Plan de Ataque a Deudas',
      description: 'Destina abonos adicionales prioritarios a la deuda de mayor tasa de interés (Avalancha).',
      completed: healthMetrics.debtToIncomeRatio < 30,
      actionText: 'Ver Mapa de Deudas',
      tab: 'debts'
    },
    {
      step: 5,
      title: 'Fase 5: Asignación de Ingresos Futuros',
      description: 'Planifica la distribución del 100% de tus cobros futuros antes de que ingresen al banco.',
      completed: true,
      actionText: 'Asignar Futuros Ingresos',
      tab: 'future_income'
    },
    {
      step: 6,
      title: 'Fase 6: Estabilidad Total & Construcción de Riqueza',
      description: 'Tu Score Financiero supera los 80 puntos. Inversión en activos y libertad financiera.',
      completed: healthMetrics.score >= 80,
      actionText: 'Ver Diagnóstico General',
      tab: 'dashboard'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <GlassCard glow="cyan">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30 flex items-center gap-1">
                <Compass className="w-3 h-3" /> Guía de Estabilidad Financiera
              </span>
              <span className="text-xs text-gray-400">Roadmap Anti-Desorden</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Roadmap de Estabilidad & Centro de Alertas</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Supera la desorganización financiera siguiendo el plan paso a paso diseñado por AURA OS. Atiende las alertas críticas para proteger tu dinero.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* 2-Column Grid: Alerts Center (Left) + Roadmap (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Active Alerts Feed */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Alertas Inteligentes Activas ({alerts.length})</span>
          </h3>

          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <GlassCard 
                key={alert.id}
                glow={alert.severity === 'high' ? 'coral' : alert.severity === 'medium' ? 'amber' : 'cyan'}
                className="p-4 space-y-2 relative"
              >
                <div className="flex items-start justify-between">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                    alert.severity === 'high' ? 'bg-[#ff416c] text-white' : alert.severity === 'medium' ? 'bg-[#f59e0b] text-black font-bold' : 'bg-[#00f2fe]/20 text-[#00f2fe]'
                  }`}>
                    {alert.severity} Priority
                  </span>

                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-400 hover:text-white text-xs"
                    title="Descartar alerta"
                  >
                    ✕
                  </button>
                </div>

                <h4 className="text-sm font-bold text-white mt-1">{alert.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{alert.message}</p>

                {alert.actionText && (
                  <button
                    onClick={() => onNavigateTab(
                      alert.type === 'subscription' ? 'subscriptions' :
                      alert.type === 'tax' ? 'tax' :
                      alert.type === 'debt' ? 'debts' : 'dashboard'
                    )}
                    className="mt-2 text-xs font-bold text-[#00f2fe] flex items-center gap-1 hover:underline"
                  >
                    {alert.actionText} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </GlassCard>
            ))
          ) : (
            <GlassCard className="text-center py-8 text-gray-400 text-xs">
              No tienes alertas pendientes. ¡Excelente orden financiero!
            </GlassCard>
          )}
        </div>

        {/* Right: 6-Step Financial Freedom Roadmap (2 Cols) */}
        <GlassCard glow="violet" className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7928ca]" />
                Roadmap de Estabilidad Financiera en 6 Fases
              </h3>
              <p className="text-xs text-gray-400">Guía metodológica para pasar del desorden a la libertad financiera</p>
            </div>
          </div>

          <div className="space-y-3">
            {roadmapSteps.map((step) => (
              <div 
                key={step.step}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  step.completed 
                    ? 'bg-[#10b981]/10 border-[#10b981]/40' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    step.completed ? 'bg-[#10b981] text-black font-black' : 'bg-white/10 text-white'
                  }`}>
                    {step.completed ? '✓' : step.step}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-gray-300 mt-0.5">{step.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab(step.tab)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all shrink-0 w-full md:w-auto text-center"
                >
                  {step.actionText}
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
