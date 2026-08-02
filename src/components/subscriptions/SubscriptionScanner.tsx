import React, { useState } from 'react';
import { MailCheck, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';

export const SubscriptionScanner: React.FC = () => {
  const { 
    subscriptions, 
    emailReceipts, 
    updateSubscriptionStatus, 
    importEmailReceipt, 
    simulateEmailScan, 
    isScanningEmail 
  } = useFinancials();

  const [connectedAccount] = useState('juan.roys@business.com');

  const totalMonthlySubscriptions = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.monthlyCost, 0);

  const priceIncreasedSubs = subscriptions.filter(s => s.priceIncreased && s.status === 'active');
  const unimportedReceipts = emailReceipts.filter(r => !r.imported);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Email Connection & Scanner */}
      <GlassCard glow="cyan">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30 flex items-center gap-1">
                <MailCheck className="w-3 h-3" /> Scanner Inteligente de Correo
              </span>
              <span className="text-xs text-gray-400">Lectura Automática de Recibos</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Conexión a Correo & Detector de Suscripciones</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              AURA analiza tus correos entrantes de Gmail / Outlook, detecta facturas digitales, extractos de suscripciones recurrentes y te advierte si algún servicio aumentó silenciosamente de precio.
            </p>
          </div>

          {/* Email Status Pill */}
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
              <div>
                <span className="text-xs font-bold text-white block">{connectedAccount}</span>
                <span className="text-[10px] text-gray-400">OAuth 2.0 Encriptado • Sync Activo</span>
              </div>
            </div>

            <button
              onClick={simulateEmailScan}
              disabled={isScanningEmail}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#7928ca] text-white font-bold text-xs shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanningEmail ? 'animate-spin' : ''}`} />
              {isScanningEmail ? 'Escaneando...' : 'Escanear Ahora'}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Alert Banner: Price Increases */}
      {priceIncreasedSubs.length > 0 && (
        <GlassCard glow="coral" className="border-[#ff416c]/40 bg-[#ff416c]/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ff416c] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">⚠️ Alerta de Aumento Silencioso de Precio</h3>
              <p className="text-xs text-gray-300 mt-0.5">
                Se han detectado incrementos de costo en {priceIncreasedSubs.length} suscripciones (ej: {priceIncreasedSubs.map(s => s.name).join(', ')}). Revisa si deseas cancelarlas o cambiarlas de plan.
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Email Receipts Detected */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MailCheck className="w-4 h-4 text-[#00f2fe]" />
              Facturas Extraídas de Correo ({unimportedReceipts.length})
            </h3>
          </div>

          {unimportedReceipts.length > 0 ? (
            unimportedReceipts.map((receipt) => (
              <GlassCard key={receipt.id} glow="cyan" className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{receipt.vendorName}</span>
                  <span className="text-[#00f2fe] font-black">${receipt.amount.toFixed(2)} USD</span>
                </div>
                <p className="text-xs text-gray-300 font-medium">{receipt.subject}</p>
                <div className="text-[11px] text-gray-400 bg-white/5 p-2 rounded-lg border border-white/10">
                  <span>Items: {receipt.items.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-[#10b981] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Deducible Detectado
                  </span>
                  <button
                    onClick={() => importEmailReceipt(receipt.id)}
                    className="px-3 py-1 rounded-lg bg-[#00f2fe] text-black font-bold text-xs hover:bg-[#00f2fe]/80 transition-all"
                  >
                    Importar a Gastos
                  </button>
                </div>
              </GlassCard>
            ))
          ) : (
            <GlassCard className="text-center py-8 text-gray-400 text-xs">
              No hay facturas pendientes por importar. Tu bandeja está al día.
            </GlassCard>
          )}
        </div>

        {/* Right: Subscriptions Management Hub */}
        <GlassCard glow="violet" className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Suscripciones Recurrentes Detectadas</h3>
              <p className="text-xs text-gray-400">Total mensual consumido en servicios: <strong className="text-[#00f2fe]">${totalMonthlySubscriptions.toFixed(2)} USD/mes</strong> (${(totalMonthlySubscriptions * 12).toFixed(2)} USD/año)</p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 font-medium border border-white/15">
              {subscriptions.filter(s => s.status === 'active').length} Activas
            </span>
          </div>

          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  sub.priceIncreased 
                    ? 'bg-[#ff416c]/10 border-[#ff416c]/40' 
                    : sub.status === 'cancelling' 
                    ? 'bg-gray-900/60 border-gray-700 opacity-60' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{sub.name}</h4>
                    {sub.detectedViaEmail && (
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] font-bold">
                        Vía Email
                      </span>
                    )}
                    {sub.priceIncreased && (
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[#ff416c] text-white font-bold animate-pulse">
                        +${(sub.monthlyCost - (sub.previousCost || 0)).toFixed(2)} Subió
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300">{sub.purposeTag}</p>
                  <span className="text-[10px] text-gray-400 block">Próximo cobro: {sub.nextBillingDate} • Dificultad cancelación: <strong className="text-gray-200 capitalize">{sub.cancellationDifficulty}</strong></span>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <span className="text-base font-black text-white">${sub.monthlyCost.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400 block">USD / mes</span>
                  </div>

                  {sub.status === 'active' ? (
                    <button
                      onClick={() => updateSubscriptionStatus(sub.id, 'cancelling')}
                      className="px-3 py-1.5 rounded-xl bg-[#ff416c]/20 hover:bg-[#ff416c]/40 text-[#ff416c] border border-[#ff416c]/30 text-xs font-semibold transition-all"
                    >
                      Marcar para Cancelar
                    </button>
                  ) : (
                    <button
                      onClick={() => updateSubscriptionStatus(sub.id, 'active')}
                      className="px-3 py-1.5 rounded-xl bg-[#10b981]/20 hover:bg-[#10b981]/40 text-[#10b981] border border-[#10b981]/30 text-xs font-semibold transition-all"
                    >
                      Reactivar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
