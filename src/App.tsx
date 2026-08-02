import React, { useState, useEffect } from 'react';
import { FinancialProvider, useFinancials } from './context/FinancialContext';
import { BackgroundCanvas } from './components/layout/BackgroundCanvas';
import { Navbar, type ActiveTab } from './components/layout/Navbar';
import { QuickActionModal } from './components/common/QuickActionModal';

import { AICounselorChat } from './components/ai/AICounselorChat';
import { DashboardView } from './components/dashboard/DashboardView';
import { DocumentVault } from './components/vault/DocumentVault';
import { FicoCreditHub } from './components/credit/FicoCreditHub';
import { FutureIncomePlanner } from './components/income/FutureIncomePlanner';
import { ExpenseTracker } from './components/expenses/ExpenseTracker';
import { SubscriptionScanner } from './components/subscriptions/SubscriptionScanner';
import { DebtCommandCenter } from './components/debts/DebtCommandCenter';
import { TaxEngine } from './components/tax/TaxEngine';
import { AlertsRoadmapView } from './components/alerts/AlertsRoadmapView';

const MainAppContent: React.FC = () => {
  const { chatDockPosition } = useFinancials();

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && activeTab === 'dashboard') {
        setActiveTab('chat'); // Mobile Chat-First default
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col font-sans pb-16 selection:bg-[#00f2fe] selection:text-black">
      
      {/* Lunar Glow Ambient Background */}
      <BackgroundCanvas />

      {/* Spatial Pill Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuickAction={() => setIsQuickActionOpen(true)} 
      />

      {/* Main Content & Flexible AI Chat Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 relative z-10 space-y-8">
        
        {/* MOBILE VIEW: Render current active tab directly */}
        {isMobile ? (
          <div>
            {activeTab === 'chat' && <AICounselorChat onNavigateTab={(t) => setActiveTab(t as ActiveTab)} isMobile={true} />}
            {activeTab === 'dashboard' && <DashboardView onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />}
            {activeTab === 'vault' && <DocumentVault />}
            {activeTab === 'fico' && <FicoCreditHub />}
            {activeTab === 'future_income' && <FutureIncomePlanner />}
            {activeTab === 'expenses' && <ExpenseTracker />}
            {activeTab === 'subscriptions' && <SubscriptionScanner />}
            {activeTab === 'debts' && <DebtCommandCenter />}
            {activeTab === 'tax' && <TaxEngine />}
            {activeTab === 'alerts' && <AlertsRoadmapView onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />}
          </div>
        ) : (
          /* DESKTOP VIEW: Flexible AI Chat Dock Layout (Left / Right / Bottom) */
          <div className="space-y-6">
            
            {activeTab === 'chat' ? (
              <div className="max-w-4xl mx-auto min-h-[700px]">
                <AICounselorChat onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />
              </div>
            ) : (
              <div className={`grid gap-6 ${
                chatDockPosition === 'left' ? 'grid-cols-1 lg:grid-cols-3' :
                chatDockPosition === 'right' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
              }`}>

                {/* Left Docked AI Chat */}
                {chatDockPosition === 'left' && (
                  <div className="lg:col-span-1 h-[750px]">
                    <AICounselorChat onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />
                  </div>
                )}

                {/* Main View Module (2 Cols when Left/Right Docked) */}
                <div className={chatDockPosition === 'left' || chatDockPosition === 'right' ? 'lg:col-span-2' : 'w-full'}>
                  {activeTab === 'dashboard' && <DashboardView onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />}
                  {activeTab === 'vault' && <DocumentVault />}
                  {activeTab === 'fico' && <FicoCreditHub />}
                  {activeTab === 'future_income' && <FutureIncomePlanner />}
                  {activeTab === 'expenses' && <ExpenseTracker />}
                  {activeTab === 'subscriptions' && <SubscriptionScanner />}
                  {activeTab === 'debts' && <DebtCommandCenter />}
                  {activeTab === 'tax' && <TaxEngine />}
                  {activeTab === 'alerts' && <AlertsRoadmapView onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />}
                </div>

                {/* Right Docked AI Chat */}
                {chatDockPosition === 'right' && (
                  <div className="lg:col-span-1 h-[750px]">
                    <AICounselorChat onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />
                  </div>
                )}

                {/* Bottom Drawer AI Chat */}
                {chatDockPosition === 'bottom' && (
                  <div className="w-full h-[500px] mt-6">
                    <AICounselorChat onNavigateTab={(t) => setActiveTab(t as ActiveTab)} />
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* Quick Action Modal */}
      <QuickActionModal 
        isOpen={isQuickActionOpen} 
        onClose={() => setIsQuickActionOpen(false)} 
      />

      {/* Subtle Footer */}
      <footer className="mt-12 text-center text-xs text-gray-500 relative z-10">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>AURA AI Financial OS</span> • <span className="text-[#00f2fe]">Lunar Vision OS Architecture</span> • Autonomía para Founders & CEOs
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
