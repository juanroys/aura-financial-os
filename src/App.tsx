import React, { useState } from 'react';
import { FinancialProvider } from './context/FinancialContext';
import { BackgroundCanvas } from './components/layout/BackgroundCanvas';
import { Navbar, type ActiveTab } from './components/layout/Navbar';
import { QuickActionModal } from './components/common/QuickActionModal';

import { DashboardView } from './components/dashboard/DashboardView';
import { FutureIncomePlanner } from './components/income/FutureIncomePlanner';
import { ExpenseTracker } from './components/expenses/ExpenseTracker';
import { SubscriptionScanner } from './components/subscriptions/SubscriptionScanner';
import { DebtCommandCenter } from './components/debts/DebtCommandCenter';
import { TaxEngine } from './components/tax/TaxEngine';
import { AlertsRoadmapView } from './components/alerts/AlertsRoadmapView';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col font-sans pb-16 selection:bg-[#00f2fe] selection:text-black">
      
      {/* Vision OS Ambient Background */}
      <BackgroundCanvas />

      {/* Spatial Pill Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuickAction={() => setIsQuickActionOpen(true)} 
      />

      {/* Main Spatial Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 relative z-10 space-y-8">
        {activeTab === 'dashboard' && <DashboardView onNavigateTab={setActiveTab} />}
        {activeTab === 'future_income' && <FutureIncomePlanner />}
        {activeTab === 'expenses' && <ExpenseTracker />}
        {activeTab === 'subscriptions' && <SubscriptionScanner />}
        {activeTab === 'debts' && <DebtCommandCenter />}
        {activeTab === 'tax' && <TaxEngine />}
        {activeTab === 'alerts' && <AlertsRoadmapView onNavigateTab={setActiveTab} />}
      </main>

      {/* Quick Action Modal */}
      <QuickActionModal 
        isOpen={isQuickActionOpen} 
        onClose={() => setIsQuickActionOpen(false)} 
      />

      {/* Subtle Footer */}
      <footer className="mt-12 text-center text-xs text-gray-500 relative z-10">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>AURA Financial OS</span> • <span className="text-[#00f2fe]">Apple Vision OS Spatial Architecture</span> • Autonomía & Libertad Financiera
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
