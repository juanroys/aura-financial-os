import React, { useState } from 'react';
import { TrendingUp, Plus, ShieldCheck, Percent, PieChart as PieIcon, Tag, AlertCircle } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import { GlassCard } from '../common/GlassCard';
import type { FutureIncomeAllocation } from '../../types';

export const FutureIncomePlanner: React.FC = () => {
  const { futureIncomes, addFutureIncome, allocateFutureIncome, taxSettings } = useFinancials();

  const [selectedIncomeId, setSelectedIncomeId] = useState<string | null>(
    futureIncomes.length > 0 ? futureIncomes[0].id : null
  );

  const selectedIncome = futureIncomes.find(fi => fi.id === selectedIncomeId);

  // Allocation editing state
  const [taxPercent, setTaxPercent] = useState<number>(taxSettings.estimatedTaxBracketPercent);
  const [debtPercent, setDebtPercent] = useState<number>(30);
  const [emergencyPercent, setEmergencyPercent] = useState<number>(15);
  const [fixedPercent, setFixedPercent] = useState<number>(20);
  const [discretionaryPercent, setDiscretionaryPercent] = useState<number>(10);

  // New future income form inputs
  const [showAddForm, setShowAddForm] = useState(false);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [purposeTag, setPurposeTag] = useState('');
  const [clientName] = useState('');

  const handleAddFutureIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !amount) return;

    addFutureIncome({
      source,
      amount: parseFloat(amount),
      expectedDate: expectedDate || new Date().toISOString().split('T')[0],
      purposeTag: purposeTag || 'Ingreso sin etiquetar',
      clientName: clientName || 'Cliente Directo',
      status: 'planned'
    });

    setShowAddForm(false);
    setSource('');
    setAmount('');
    setPurposeTag('');
  };

  const handleSaveAllocations = () => {
    if (!selectedIncome) return;

    const totalAmt = selectedIncome.amount;
    const allocations: FutureIncomeAllocation = {
      taxReserve: Math.round((totalAmt * taxPercent) / 100),
      debtPayoff: Math.round((totalAmt * debtPercent) / 100),
      emergencyFund: Math.round((totalAmt * emergencyPercent) / 100),
      fixedExpenses: Math.round((totalAmt * fixedPercent) / 100),
      discretionary: Math.round((totalAmt * discretionaryPercent) / 100),
    };

    allocateFutureIncome(selectedIncome.id, allocations);
  };

  const totalAllocatedPercent = taxPercent + debtPercent + emergencyPercent + fixedPercent + discretionaryPercent;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <GlassCard glow="cyan">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30">
                Organizador Inteligente
              </span>
              <span className="text-xs text-gray-400">Distribución Anticipada de Capital</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Organizador de Ingresos Futuros</h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1">
              Para vencer la desorganización, <strong className="text-white">asigna el 100% del destino de cada ingreso antes de que llegue a tu cuenta bancaria</strong>. Protege tus impuestos, paga deudas y evita compras impulsivas.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#7928ca] text-white text-xs font-bold shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(121,40,202,0.5)] transition-all"
          >
            <Plus className="w-4 h-4" /> Registrar Ingreso Futuro
          </button>
        </div>
      </GlassCard>

      {/* Add Future Income Form */}
      {showAddForm && (
        <GlassCard glow="emerald" className="animate-fade-in border-[#10b981]/40">
          <h3 className="text-sm font-bold text-white mb-3">Registrar Nuevo Ingreso Esperado</h3>
          <form onSubmit={handleAddFutureIncome} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">Nombre o Proyecto</label>
              <input 
                type="text"
                required
                placeholder="Ej: Contrato Desarrollo Móvil"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Monto Esperado (USD)</label>
              <input 
                type="number"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Fecha Estimada de Cobro</label>
              <input 
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#00f2fe] mb-1">
                ¿Para qué se usará prioritariamente este recurso? (Etiqueta de Propósito)
              </label>
              <input 
                type="text"
                placeholder="Ej: Cobro de desarrollo - 30% Impuestos Q3 + Cancelación Tarjeta Visa"
                value={purposeTag}
                onChange={(e) => setPurposeTag(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-[#00f2fe]/40 text-white text-xs"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#10b981] hover:bg-[#10b981]/80 text-white font-bold text-xs transition-all shadow-lg"
              >
                Guardar e Iniciar Asignación
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Ingresos en Espera ({futureIncomes.length})</span>
            <span className="text-xs font-normal text-gray-400">Haz clic para asignar</span>
          </h3>

          {futureIncomes.map((fi) => {
            const isSelected = fi.id === selectedIncomeId;
            return (
              <GlassCard 
                key={fi.id}
                onClick={() => setSelectedIncomeId(fi.id)}
                glow={isSelected ? 'cyan' : 'none'}
                className={`transition-all ${isSelected ? 'border-[#00f2fe] bg-white/10' : 'opacity-80 hover:opacity-100'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{fi.source}</h4>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <span>{fi.clientName || 'Cliente'}</span> • <span>Fecha: {fi.expectedDate}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-[#00f2fe]">${fi.amount.toLocaleString()}</span>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">USD</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-gray-300 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#00f2fe]" /> {fi.purposeTag || 'Sin etiqueta'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    fi.status === 'allocated' ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'
                  }`}>
                    {fi.status === 'allocated' ? '✓ Asignado' : 'Pendiente'}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Right Allocation Interactive Calculator */}
        <GlassCard glow="violet" className="lg:col-span-2 space-y-5">
          {selectedIncome ? (
            <>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs text-gray-400">Asignando Recurso Seleccionado:</span>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedIncome.source}
                    <span className="text-[#00f2fe] font-black">${selectedIncome.amount.toLocaleString()} USD</span>
                  </h3>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  totalAllocatedPercent === 100 ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40' : 'bg-[#ff416c]/20 text-[#ff416c] border border-[#ff416c]/40'
                }`}>
                  Total: {totalAllocatedPercent}% {totalAllocatedPercent !== 100 && '(Ajusta al 100%)'}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="space-y-4">
                
                {/* 1. Tax Reserve */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#f59e0b]" /> Reserva para Impuestos ({taxPercent}%)
                    </span>
                    <span className="text-[#f59e0b] font-black text-sm">
                      ${Math.round((selectedIncome.amount * taxPercent) / 100).toLocaleString()} USD
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={taxPercent} 
                    onChange={(e) => setTaxPercent(parseInt(e.target.value))}
                    className="w-full accent-[#f59e0b] cursor-pointer"
                  />
                  <p className="text-[11px] text-gray-400">Protege tu tranquilidad tributaria guardando este porcentaje automáticamente.</p>
                </div>

                {/* 2. Debt Payoff Target */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#ff416c]" /> Acelerador de Pago de Deudas ({debtPercent}%)
                    </span>
                    <span className="text-[#ff416c] font-black text-sm">
                      ${Math.round((selectedIncome.amount * debtPercent) / 100).toLocaleString()} USD
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="60" 
                    value={debtPercent} 
                    onChange={(e) => setDebtPercent(parseInt(e.target.value))}
                    className="w-full accent-[#ff416c] cursor-pointer"
                  />
                  <p className="text-[11px] text-gray-400">Se abonará directamente a la deuda con mayor tasa de interés (Avalancha).</p>
                </div>

                {/* 3. Emergency / Savings Fund */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white flex items-center gap-1.5">
                      <PieIcon className="w-4 h-4 text-[#00f2fe]" /> Fondo de Reserva / Emergencias ({emergencyPercent}%)
                    </span>
                    <span className="text-[#00f2fe] font-black text-sm">
                      ${Math.round((selectedIncome.amount * emergencyPercent) / 100).toLocaleString()} USD
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={emergencyPercent} 
                    onChange={(e) => setEmergencyPercent(parseInt(e.target.value))}
                    className="w-full accent-[#00f2fe] cursor-pointer"
                  />
                </div>

                {/* 4. Fixed Living & Operating Expenses */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-[#10b981]" /> Gastos Fijos de Operación ({fixedPercent}%)
                    </span>
                    <span className="text-[#10b981] font-black text-sm">
                      ${Math.round((selectedIncome.amount * fixedPercent) / 100).toLocaleString()} USD
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={fixedPercent} 
                    onChange={(e) => setFixedPercent(parseInt(e.target.value))}
                    className="w-full accent-[#10b981] cursor-pointer"
                  />
                </div>

                {/* 5. Guilt-Free Discretionary */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-[#7928ca]" /> Libre Disponibilidad / Personal ({discretionaryPercent}%)
                    </span>
                    <span className="text-[#7928ca] font-black text-sm">
                      ${Math.round((selectedIncome.amount * discretionaryPercent) / 100).toLocaleString()} USD
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="40" 
                    value={discretionaryPercent} 
                    onChange={(e) => setDiscretionaryPercent(parseInt(e.target.value))}
                    className="w-full accent-[#7928ca] cursor-pointer"
                  />
                </div>

              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-gray-400">Al guardar, se programarán las reglas automáticas de distribución.</p>
                <button
                  onClick={handleSaveAllocations}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#10b981] text-white font-bold text-xs shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105 transition-all"
                >
                  Confirmar Asignación del 100%
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              Selecciona o crea un ingreso futuro para planificar su uso.
            </div>
          )}
        </GlassCard>

      </div>

    </div>
  );
};
