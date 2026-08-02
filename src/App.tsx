import { useState } from 'react';
import { FinancialProvider } from './context/FinancialContext';
import { Navbar, type MainHubTab } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { FounderProfileCard } from './components/dashboard/FounderProfileCard';
import { SmartGuidesCard } from './components/dashboard/SmartGuidesCard';
import { AccountsRecordDashboard } from './components/dashboard/AccountsRecordDashboard';

import { IncomeExpenseTracker } from './components/financials/IncomeExpenseTracker';
import { CreditScoreHub } from './components/credit/CreditScoreHub';
import { TaxStrategyHub } from './components/tax/TaxStrategyHub';
import { DocumentVault } from './components/vault/DocumentVault';
import { QuickActionModal } from './components/common/QuickActionModal';

export function App() {
  const [activeTab, setActiveTab] = useState<MainHubTab>('cashflow');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  return (
    <FinancialProvider>
      <div className="min-h-screen bg-[#3A3B40] text-gray-900 font-jakarta antialiased p-2 sm:p-4 md:p-8 flex flex-col justify-center items-center">
        
        {/* Master Container Frame ($50,000+ Interlocking Design Canvas) */}
        <div className="master-frame w-full max-w-7xl bg-[#E1E2E4] min-h-[90vh] rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-300/40 relative">
          
          {/* Header Navigation */}
          <Navbar 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
          />

          {/* Main Content Body */}
          <main className="flex-1 p-3 sm:p-6 md:p-8 overflow-y-auto space-y-6 pb-20 md:pb-8">
            
            {activeTab === 'cashflow' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* 3-Column Executive Grid (Founder + Smart Guides + AI Counselor & Donut Chart) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  
                  {/* Left Column: Section 2 & 3 Stack (Span 2 Cols on Large Screens) */}
                  <div className="lg:col-span-2 space-y-6">
                    <FounderProfileCard />
                    <SmartGuidesCard />
                    
                    {/* Secondary Detailed Income & Expense Tracker */}
                    <IncomeExpenseTracker />
                  </div>

                  {/* Right Column: AI Counselor Chat + 3-Tone Donut Chart */}
                  <div className="lg:col-span-1 space-y-6">
                    <AccountsRecordDashboard />
                  </div>

                </div>

              </div>
            )}

            {/* Sub-Views Linked to Navigation */}
            {activeTab === 'chat' && (
              <div className="animate-fadeIn">
                <AccountsRecordDashboard />
              </div>
            )}

            {activeTab === 'credit' && (
              <div className="animate-fadeIn space-y-6">
                <CreditScoreHub />
              </div>
            )}

            {activeTab === 'tax' && (
              <div className="animate-fadeIn space-y-6">
                <TaxStrategyHub />
                <DocumentVault />
              </div>
            )}

          </main>

          {/* Mobile Bottom Navigation Bar (Visible only on mobile devices) */}
          <MobileBottomNav 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
          />

        </div>

        {/* Global Modals */}
        <QuickActionModal 
          isOpen={isQuickActionOpen}
          onClose={() => setIsQuickActionOpen(false)}
        />

      </div>
    </FinancialProvider>
  );
}

export default App;
