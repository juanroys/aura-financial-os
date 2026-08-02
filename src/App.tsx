import React, { useState, useEffect } from 'react';
import { FinancialProvider } from './context/FinancialContext';
import { BackgroundCanvas } from './components/layout/BackgroundCanvas';
import { Navbar, type MainHubTab } from './components/layout/Navbar';
import { QuickActionModal } from './components/common/QuickActionModal';

import { AICounselorChat } from './components/ai/AICounselorChat';
import { VpsStrategyNotes } from './components/notes/VpsStrategyNotes';
import { DashboardView } from './components/dashboard/DashboardView';
import { DocumentVault } from './components/vault/DocumentVault';
import { FicoCreditHub } from './components/credit/FicoCreditHub';
import { FutureIncomePlanner } from './components/income/FutureIncomePlanner';
import { ExpenseTracker } from './components/expenses/ExpenseTracker';
import { SubscriptionScanner } from './components/subscriptions/SubscriptionScanner';
import { DebtCommandCenter } from './components/debts/DebtCommandCenter';
import { TaxEngine } from './components/tax/TaxEngine';

const MainAppContent: React.FC = () => {
  const [activeHub, setActiveHub] = useState<MainHubTab>('cashflow');
  const [cashflowSubTab, setCashflowSubTab] = useState<'dashboard' | 'income' | 'expenses' | 'subscriptions'>('dashboard');
  const [creditSubTab, setCreditSubTab] = useState<'debts' | 'fico'>('debts');
  const [taxSubTab, setTaxSubTab] = useState<'tax' | 'vault'>('tax');

  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && activeHub === 'cashflow') {
        setActiveHub('chat');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col font-sans pb-16 selection:bg-[#00f2fe] selection:text-black">
      
      {/* Lunar Glow 3D Backdrop */}
      <BackgroundCanvas />

      {/* Simplified 4-Hub Navbar */}
      <Navbar 
        activeTab={activeHub} 
        setActiveTab={setActiveHub} 
        onOpenQuickAction={() => setIsQuickActionOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 relative z-10 space-y-6">
        
        {/* HUB 1: AI COUNSELOR & VPS NOTES */}
        {activeHub === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[680px]">
            <div className="lg:col-span-2">
              <AICounselorChat onNavigateTab={(tab) => {
                if (tab === 'cashflow' || tab === 'credit' || tab === 'tax') {
                  setActiveHub(tab as MainHubTab);
                } else {
                  setActiveHub('chat');
                }
              }} isMobile={isMobile} />
            </div>

            <div className="space-y-4">
              <VpsStrategyNotes />
            </div>
          </div>
        )}

        {/* HUB 2: CAJA & FLUJO */}
        {activeHub === 'cashflow' && (
          <div className="space-y-6">
            {/* Minimal Sub-navigation Pill */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 w-fit mx-auto">
              <button
                onClick={() => setCashflowSubTab('dashboard')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  cashflowSubTab === 'dashboard' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                📊 Resumen
              </button>
              <button
                onClick={() => setCashflowSubTab('income')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  cashflowSubTab === 'income' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                💸 Ingresos Futuros
              </button>
              <button
                onClick={() => setCashflowSubTab('expenses')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  cashflowSubTab === 'expenses' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                💳 Gastos
              </button>
              <button
                onClick={() => setCashflowSubTab('subscriptions')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  cashflowSubTab === 'subscriptions' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                ✉️ Suscripciones
              </button>
            </div>

            {cashflowSubTab === 'dashboard' && <DashboardView onNavigateTab={(t) => {
              if (t === 'future_income') setCashflowSubTab('income');
              else if (t === 'expenses') setCashflowSubTab('expenses');
              else if (t === 'subscriptions') setCashflowSubTab('subscriptions');
            }} />}
            {cashflowSubTab === 'income' && <FutureIncomePlanner />}
            {cashflowSubTab === 'expenses' && <ExpenseTracker />}
            {cashflowSubTab === 'subscriptions' && <SubscriptionScanner />}
          </div>
        )}

        {/* HUB 3: DEUDAS & FICO */}
        {activeHub === 'credit' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 w-fit mx-auto">
              <button
                onClick={() => setCreditSubTab('debts')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  creditSubTab === 'debts' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                📉 Plan Avalancha Deudas
              </button>
              <button
                onClick={() => setCreditSubTab('fico')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  creditSubTab === 'fico' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                💳 Centro FICO & Crédito
              </button>
            </div>

            {creditSubTab === 'debts' && <DebtCommandCenter />}
            {creditSubTab === 'fico' && <FicoCreditHub />}
          </div>
        )}

        {/* HUB 4: TAXES & BÓVEDA */}
        {activeHub === 'tax' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 w-fit mx-auto">
              <button
                onClick={() => setTaxSubTab('tax')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  taxSubTab === 'tax' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                🏛️ Declaración Impuestos
              </button>
              <button
                onClick={() => setTaxSubTab('vault')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  taxSubTab === 'vault' ? 'bg-[#00f2fe] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                📄 Bóveda PDF & OCR
              </button>
            </div>

            {taxSubTab === 'tax' && <TaxEngine />}
            {taxSubTab === 'vault' && <DocumentVault />}
          </div>
        )}

      </main>

      {/* Quick Action Modal */}
      <QuickActionModal 
        isOpen={isQuickActionOpen} 
        onClose={() => setIsQuickActionOpen(false)} 
      />

      <footer className="mt-12 text-center text-xs text-gray-500 relative z-10">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>AURA AI Financial OS</span> • <span className="text-[#00f2fe]">Minimalist Vision Architecture</span> • Sincronización VPS en Vivo
        </p>
      </footer>

    </div>
  );
};

export function App() {
  return (
    <FinancialProvider>
      <MainAppContent />
    </FinancialProvider>
  );
}

export default App;
