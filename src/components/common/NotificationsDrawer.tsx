import React from 'react';
import { Bell, X, Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const { alerts, dismissAlert, simulateEmailScan, isScanningEmail } = useFinancials();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end font-jakarta animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#101217] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#10d670]/20 border border-[#10d670]/40 flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#10d670]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-tight">Notificaciones en Vivo</h3>
              <p className="text-[10px] text-gray-300">Alertas de Impuestos, Subscripciones & Email</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {/* Email Scan Action Banner */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#101217] flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#10d670]" /> Escaneo de Facturas por Correo
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Detecta automáticamente recibos deducibles enviando facturas desde tu correo.
            </p>
            <button
              onClick={simulateEmailScan}
              disabled={isScanningEmail}
              className="w-full py-2 rounded-xl bg-[#101217] text-white text-xs font-bold hover:bg-black transition-all disabled:opacity-50 shadow-sm"
            >
              {isScanningEmail ? 'Buscando recibos...' : '⚡ Simular Escaneo de Facturas'}
            </button>
          </div>

          {/* Active Alerts */}
          <div className="space-y-2 pt-2">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Alertas Activas ({alerts.length})</h4>

            {alerts.map((alt) => (
              <div key={alt.id} className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5 relative group">
                <div className="flex items-start justify-between">
                  <h5 className="text-xs font-extrabold text-[#101217] flex items-center gap-1.5">
                    {alt.severity === 'high' ? (
                      <AlertTriangle className="w-4 h-4 text-[#e64a53] shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[#10d670] shrink-0" />
                    )}
                    <span>{alt.title}</span>
                  </h5>
                  <button 
                    onClick={() => dismissAlert(alt.id)}
                    className="text-gray-400 hover:text-gray-600 text-xs font-bold p-0.5"
                  >
                    ×
                  </button>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{alt.message}</p>
                <span className="text-[9px] text-gray-400 font-medium block">{alt.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
          AURA System Live Notification Engine
        </div>

      </div>
    </div>
  );
};
