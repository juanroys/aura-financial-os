import React, { useState, useEffect } from 'react';
import { FinancialProvider } from './context/FinancialContext';
import { Navbar, type MainHubTab } from './components/layout/Navbar';
import { QuickActionModal } from './components/common/QuickActionModal';

import { FounderProfileCard } from './components/dashboard/FounderProfileCard';
import { SmartGuidesCard } from './components/dashboard/SmartGuidesCard';
import { AccountsRecordDashboard } from './components/dashboard/AccountsRecordDashboard';

import { IncomeExpenseTracker } from './components/financials/IncomeExpenseTracker';
import { TaxStrategyHub } from './components/tax/TaxStrategyHub';
import { CreditScoreHub } from './components/credit/CreditScoreHub';
import { DocumentVault } from './components/vault/DocumentVault';
import { VpsStrategyNotes } from './components/notes/VpsStrategyNotes';

const MainAppContent: React.FC = () => {
  const [activeHub, setActiveHub] = useState<MainHubTab>('cashflow');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#3a3b40] text-[#101217] font-jakarta p-4 md:p-8 flex flex-col items-center justify-center selection:bg-[#10d670] selection:text-white">
      
      {/* Master $50,000+ Frame Container (Exact Match to Reference Layout) */}
      <div className="master-frame w-full max-w-[1380px] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden font-jakarta">
        
        {/* Master Circular Top Navigation Bar */}
        <Navbar 
          activeTab={activeHub} 
          setActiveTab={setActiveHub} 
          onOpenQuickAction={() => setIsQuickActionOpen(true)} 
        />

        {/* HUB 1: MAIN CASHFLOW DASHBOARD (Cloned 100% from reference layout) */}
        {activeHub === 'cashflow' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Columns: Founder Profile (Top) + Smart Guides Cards (Bottom) */}
            <div className="lg:col-span-2 space-y-6">
              <FounderProfileCard />
              <SmartGuidesCard />
            </div>

            {/* Right Column: Accounts Record Dashboard / AI Counselor Chat */}
            <div className="lg:col-span-1">
              <AccountsRecordDashboard />
            </div>

          </div>
        )}

        {/* HUB 2: CASH FLOW TRACKER */}
        {activeHub === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <IncomeExpenseTracker />
            </div>
            <div className="lg:col-span-1">
              <VpsStrategyNotes />
            </div>
          </div>
        )}

        {/* HUB 3: CRÉDITO & FICO SCORE */}
        {activeHub === 'credit' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CreditScoreHub />
            </div>
            <div className="lg:col-span-1">
              <AccountsRecordDashboard />
            </div>
          </div>
        )}

        {/* HUB 4: TAXES & BÓVEDA OCR */}
        {activeHub === 'tax' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaxStrategyHub />
            <DocumentVault />
          </div>
        )}

        {/* Executive Footer */}
        <footer className="pt-4 text-center text-xs text-gray-500 border-t border-gray-200/60 font-medium">
          AURA Financial OS • Architecture $50,000+ Interlocking Executive UI • Servidor VPS 187.77.3.244
        </footer>

      </div>

      {/* Quick Action Modal */}
      <QuickActionModal 
        isOpen={isQuickActionOpen} 
        onClose={() => setIsQuickActionOpen(false)} 
      />

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
