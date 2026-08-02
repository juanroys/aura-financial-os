import React, { useState } from 'react';
import { X, ArrowDownRight, ArrowUpRight, TrendingUp, ShieldAlert, CreditCard } from 'lucide-react';
import { useFinancials } from '../../context/FinancialContext';
import type { CategoryType } from '../../types';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction, addDebt, addFutureIncome, addSubscription } = useFinancials();

  const [activeType, setActiveType] = useState<'expense' | 'income' | 'future_income' | 'debt' | 'subscription'>('expense');

  // Form states
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('services');
  const [purposeTag, setPurposeTag] = useState('');
  const [isDeductible, setIsDeductible] = useState(true);
  const [paymentMethod] = useState('Tarjeta de Crédito');
  const [vendor] = useState('');
  const [interestRate, setInterestRate] = useState('18.5');
  const [minimumPayment, setMinimumPayment] = useState('150');
  const [expectedDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const numAmount = parseFloat(amount);

    if (activeType === 'expense' || activeType === 'income') {
      addTransaction({
        date: new Date().toISOString().split('T')[0],
        title,
        amount: numAmount,
        type: activeType,
        category,
        purposeTag: purposeTag || 'Uso general de recursos',
        isDeductible: activeType === 'expense' ? isDeductible : false,
        paymentMethod,
        vendor: vendor || title,
        status: 'completed'
      });
    } else if (activeType === 'future_income') {
      addFutureIncome({
        source: title,
        expectedDate,
        amount: numAmount,
        purposeTag: purposeTag || 'Ingreso esperado para asignación anticipada',
        status: 'planned',
        clientName: vendor || 'Cliente General'
      });
    } else if (activeType === 'debt') {
      addDebt({
        creditor: vendor || title,
        name: title,
        totalBalance: numAmount,
        remainingBalance: numAmount,
        interestRate: parseFloat(interestRate) || 18,
        minimumPayment: parseFloat(minimumPayment) || 100,
        dueDateDay: 15,
        category: 'credit_card'
      });
    } else if (activeType === 'subscription') {
      addSubscription({
        name: title,
        vendor: vendor || title,
        category,
        monthlyCost: numAmount,
        billingCycle: 'monthly',
        nextBillingDate: expectedDate,
        autoRenew: true,
        detectedViaEmail: false,
        status: 'active',
        cancellationDifficulty: 'easy',
        purposeTag: purposeTag || 'Suscripción recurrente'
      });
    }

    onClose();
    setTitle('');
    setAmount('');
    setPurposeTag('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-fade-in">
      <div className="vision-glass w-full max-w-lg p-6 rounded-3xl relative shadow-[0_0_50px_rgba(0,242,254,0.2)] border border-white/20">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse" />
            Registrar Movimiento Financiero
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-2xl mb-5 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveType('expense')}
            className={`py-2 px-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-all ${
              activeType === 'expense' ? 'bg-[#ff416c] text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ArrowDownRight className="w-3.5 h-3.5" /> Gasto
          </button>

          <button
            type="button"
            onClick={() => setActiveType('income')}
            className={`py-2 px-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-all ${
              activeType === 'income' ? 'bg-[#10b981] text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" /> Ingreso
          </button>

          <button
            type="button"
            onClick={() => setActiveType('future_income')}
            className={`py-2 px-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-all ${
              activeType === 'future_income' ? 'bg-[#00f2fe] text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Ingreso Futuro
          </button>

          <button
            type="button"
            onClick={() => setActiveType('debt')}
            className={`py-2 px-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-all col-span-1.5 ${
              activeType === 'debt' ? 'bg-[#7928ca] text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Deuda
          </button>

          <button
            type="button"
            onClick={() => setActiveType('subscription')}
            className={`py-2 px-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-all col-span-1.5 ${
              activeType === 'subscription' ? 'bg-[#f59e0b] text-black font-bold shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" /> Suscripción
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Título / Concepto</label>
            <input
              type="text"
              required
              placeholder="Ej: Renovación Hosting Vercel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f2fe] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Monto (USD)</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f2fe] text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080911] border border-white/15 text-white focus:outline-none focus:border-[#00f2fe] text-sm"
              >
                <option value="software">Software & Apps</option>
                <option value="cloud">Cloud / Infraestructura</option>
                <option value="office">Equipamiento Oficina</option>
                <option value="marketing">Marketing & Adspend</option>
                <option value="services">Servicios Profesionales</option>
                <option value="consulting">Asesoría / Consultoría</option>
                <option value="utilities">Servicios Públicos/Internet</option>
                <option value="debt_payment">Pago de Deuda</option>
                <option value="entertainment">Entretenimiento</option>
                <option value="other">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#00f2fe] mb-1">
              ¿Para qué servirá / se usará este recurso? (Etiqueta de Propósito)
            </label>
            <input
              type="text"
              placeholder="Ej: Herramienta esencial de trabajo, Reserva de impuestos, Reducción de deuda..."
              value={purposeTag}
              onChange={(e) => setPurposeTag(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-[#00f2fe]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f2fe] text-sm"
            />
          </div>

          {activeType === 'expense' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-medium text-gray-200">¿Es Deducible de Impuestos?</span>
              <button
                type="button"
                onClick={() => setIsDeductible(!isDeductible)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  isDeductible ? 'bg-[#10b981]' : 'bg-gray-700'
                }`}
              >
                <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  isDeductible ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          )}

          {activeType === 'debt' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Tasa de Interés (% APR)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Pago Mínimo Mensual</label>
                <input
                  type="number"
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#10b981] text-white font-bold text-sm shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(121,40,202,0.6)] transition-all active:scale-[0.98] mt-2"
          >
            Guardar en AURA OS
          </button>
        </form>

      </div>
    </div>
  );
};
