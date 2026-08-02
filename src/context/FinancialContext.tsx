import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import type { 
  Transaction, 
  Subscription, 
  Debt, 
  FutureIncome, 
  EmailReceipt, 
  AlertItem, 
  TaxSettings, 
  FinancialHealthMetrics,
  FutureIncomeAllocation,
  ChatMessage,
  ChatDockPosition,
  DocumentItem,
  FicoCreditReport
} from '../types';
import { 
  INITIAL_TRANSACTIONS, 
  INITIAL_SUBSCRIPTIONS, 
  INITIAL_DEBTS, 
  INITIAL_FUTURE_INCOMES, 
  INITIAL_EMAIL_RECEIPTS, 
  INITIAL_ALERTS, 
  INITIAL_TAX_SETTINGS 
} from '../data/initialData';

interface FinancialContextType {
  transactions: Transaction[];
  subscriptions: Subscription[];
  debts: Debt[];
  futureIncomes: FutureIncome[];
  emailReceipts: EmailReceipt[];
  alerts: AlertItem[];
  taxSettings: TaxSettings;
  healthMetrics: FinancialHealthMetrics;
  isScanningEmail: boolean;
  
  // AI & Vault State
  chatMessages: ChatMessage[];
  chatDockPosition: ChatDockPosition;
  documents: DocumentItem[];
  ficoReport: FicoCreditReport;

  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addSubscription: (sub: Omit<Subscription, 'id'>) => void;
  updateSubscriptionStatus: (id: string, status: Subscription['status']) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebtBalance: (id: string, remainingBalance: number) => void;
  addFutureIncome: (income: Omit<FutureIncome, 'id' | 'allocations'>) => void;
  allocateFutureIncome: (id: string, allocations: FutureIncomeAllocation) => void;
  importEmailReceipt: (receiptId: string) => void;
  updateTaxSettings: (settings: Partial<TaxSettings>) => void;
  dismissAlert: (id: string) => void;
  simulateEmailScan: () => Promise<void>;
  triggerMilestoneCelebration: () => void;
  
  // AI & Vault Actions
  sendChatMessage: (text: string) => void;
  setChatDockPosition: (pos: ChatDockPosition) => void;
  uploadDocument: (doc: Omit<DocumentItem, 'id'>) => void;
  updateFicoReport: (report: Partial<FicoCreditReport>) => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'AURA_FINANCIAL_OS_DATA_V2';

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hola. Soy AURA, tu Consejero Financiero Personal. Sé lo duro que estás trabajando: sostener tu empleo físico para financiar la visión de tu startup requiere una determinación admirable. No estás solo en esta jornada.\n\nHe conectado nuestro chat dinámicamente con tu servidor VPS para respaldar cada acuerdo en nuestro archivo de estrategia. ¿Por dónde empezamos hoy?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestions: [
      '💡 Organizar sueldo de trabajo físico',
      '📉 Ver plan de pago de tarjetas',
      '📄 Cargar mi extracto bancario PDF',
      '💳 Subir mi FICO Score a 750+'
    ]
  }
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    fileName: 'Extracto_Bancario_Julio_2026.pdf',
    fileType: 'bank_statement',
    uploadDate: '2026-08-01',
    fileSize: '1.2 MB',
    parsedStatus: 'parsed',
    extractedData: {
      vendorOrClient: 'Stripe / Cliente Tech Corp',
      totalAmount: 5500.00,
      detectedDate: '2026-07-28',
      suggestedCategory: 'services',
      isDeductible: true,
      summaryText: 'Extracto verificado. Se detectaron 7 movimientos de egreso y 1 depósito principal. 85% de egresos marcados como deducibles de impuestos.'
    }
  }
];

const INITIAL_FICO: FicoCreditReport = {
  score: 685,
  tier: 'Good',
  lastUpdated: '2026-08-01',
  creditUtilizationPercent: 42,
  onTimePaymentPercent: 98,
  totalCreditLimit: 14500,
  totalBalanceUsed: 6100,
  activeInquiries: 2,
  accountAgeYears: 4,
  recommendations: [
    'Reduce la utilización de tu Tarjeta Visa Business por debajo del 30% ($2,550 USD máximo) para ganar +35 puntos FICO.',
    'No solicites nuevas tarjetas de crédito personales en los próximos 60 días para evitar indagaciones de crédito.',
    'Consolida la deuda usando la estrategia Avalancha.'
  ]
};

export const FinancialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tx`);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_sub`);
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_debts`);
    return saved ? JSON.parse(saved) : INITIAL_DEBTS;
  });

  const [futureIncomes, setFutureIncomes] = useState<FutureIncome[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_fi`);
    return saved ? JSON.parse(saved) : INITIAL_FUTURE_INCOMES;
  });

  const [emailReceipts, setEmailReceipts] = useState<EmailReceipt[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_receipts`);
    return saved ? JSON.parse(saved) : INITIAL_EMAIL_RECEIPTS;
  });

  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_alerts`);
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [taxSettings, setTaxSettings] = useState<TaxSettings>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tax`);
    return saved ? JSON.parse(saved) : INITIAL_TAX_SETTINGS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_chat`);
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  const [chatDockPosition, setChatDockPosition] = useState<ChatDockPosition>('right');

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_docs`);
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [ficoReport, setFicoReport] = useState<FicoCreditReport>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_fico`);
    return saved ? JSON.parse(saved) : INITIAL_FICO;
  });

  const [isScanningEmail, setIsScanningEmail] = useState(false);

  // Sync LocalStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_tx`, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_sub`, JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_debts`, JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_fi`, JSON.stringify(futureIncomes));
  }, [futureIncomes]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_receipts`, JSON.stringify(emailReceipts));
  }, [emailReceipts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_alerts`, JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_tax`, JSON.stringify(taxSettings));
  }, [taxSettings]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_chat`, JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_docs`, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_fico`, JSON.stringify(ficoReport));
  }, [ficoReport]);

  const computeHealthMetrics = (): FinancialHealthMetrics => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalMonthlySubscriptions = subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.monthlyCost, 0);

    const monthlyDebtPayments = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
    const estimatedMonthlyIncome = totalIncome > 0 ? totalIncome : 5000;
    const debtToIncomeRatio = Math.min(100, Math.round((monthlyDebtPayments / estimatedMonthlyIncome) * 100));

    const netSavings = Math.max(0, totalIncome - totalExpense);
    const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 15;

    const totalDeductible = transactions
      .filter(t => t.type === 'expense' && t.isDeductible)
      .reduce((sum, t) => sum + t.amount, 0);
    const netTaxableIncome = Math.max(0, totalIncome - totalDeductible);
    const estimatedTaxLiability = (netTaxableIncome * (taxSettings.estimatedTaxBracketPercent / 100));
    const taxReserveCoverage = estimatedTaxLiability > 0 
      ? Math.min(100, Math.round((taxSettings.taxReservesBalance / estimatedTaxLiability) * 100))
      : 100;

    let score = 50;
    if (debtToIncomeRatio < 20) score += 20;
    else if (debtToIncomeRatio < 35) score += 10;
    else score -= 10;

    if (savingsRate >= 20) score += 20;
    else if (savingsRate >= 10) score += 10;

    if (taxReserveCoverage >= 80) score += 15;
    else if (taxReserveCoverage >= 50) score += 5;

    if (ficoReport.score >= 740) score += 10;
    else if (ficoReport.score >= 670) score += 5;

    const finalScore = Math.min(100, Math.max(10, score));

    let tier: FinancialHealthMetrics['stabilityTier'] = 'Getting Organized';
    if (finalScore < 40) tier = 'Critical';
    else if (finalScore < 60) tier = 'Getting Organized';
    else if (finalScore < 75) tier = 'Stable';
    else if (finalScore < 90) tier = 'Wealth Building';
    else tier = 'Financial Freedom';

    return {
      score: finalScore,
      stabilityTier: tier,
      debtToIncomeRatio,
      savingsRate,
      taxReserveCoverage,
      subscriptionLeakage: totalMonthlySubscriptions,
      burnRateMonthly: totalExpense,
      runwayMonths: netSavings > 0 ? Math.round((netSavings * 6) / totalExpense) : 2
    };
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`
    };
    setTransactions(prev => [newTx, ...prev]);

    if (tx.isDeductible) {
      triggerMilestoneCelebration();
    }
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addSubscription = (sub: Omit<Subscription, 'id'>) => {
    const newSub: Subscription = {
      ...sub,
      id: `sub-${Date.now()}`
    };
    setSubscriptions(prev => [newSub, ...prev]);
  };

  const updateSubscriptionStatus = (id: string, status: Subscription['status']) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const addDebt = (debt: Omit<Debt, 'id'>) => {
    const newDebt: Debt = {
      ...debt,
      id: `debt-${Date.now()}`
    };
    setDebts(prev => [...prev, newDebt]);
  };

  const updateDebtBalance = (id: string, remainingBalance: number) => {
    setDebts(prev => prev.map(d => {
      if (d.id === id) {
        if (remainingBalance < d.remainingBalance) {
          triggerMilestoneCelebration();
        }
        return { ...d, remainingBalance };
      }
      return d;
    }));
  };

  const addFutureIncome = (income: Omit<FutureIncome, 'id' | 'allocations'>) => {
    const defaultTax = Math.round(income.amount * (taxSettings.estimatedTaxBracketPercent / 100));
    const defaultDebt = Math.round(income.amount * 0.25);
    const defaultEmergency = Math.round(income.amount * 0.15);
    const defaultFixed = Math.round(income.amount * 0.35);
    const defaultMisc = Math.max(0, income.amount - (defaultTax + defaultDebt + defaultEmergency + defaultFixed));

    const newFI: FutureIncome = {
      ...income,
      id: `fi-${Date.now()}`,
      allocations: {
        taxReserve: defaultTax,
        debtPayoff: defaultDebt,
        emergencyFund: defaultEmergency,
        fixedExpenses: defaultFixed,
        discretionary: defaultMisc
      }
    };
    setFutureIncomes(prev => [newFI, ...prev]);
  };

  const allocateFutureIncome = (id: string, allocations: FutureIncomeAllocation) => {
    setFutureIncomes(prev => prev.map(fi => fi.id === id ? { ...fi, allocations, status: 'allocated' } : fi));
  };

  const importEmailReceipt = (receiptId: string) => {
    const receipt = emailReceipts.find(r => r.id === receiptId);
    if (!receipt) return;

    addTransaction({
      date: receipt.date,
      title: `${receipt.vendorName} - ${receipt.items[0] || 'Factura por Email'}`,
      amount: receipt.amount,
      type: 'expense',
      category: receipt.suggestedCategory,
      purposeTag: `Importado de correo: ${receipt.subject}`,
      isDeductible: receipt.isDeductible,
      paymentMethod: 'Tarjeta / Email Sync',
      vendor: receipt.vendorName,
      status: 'completed',
      receiptAttached: true
    });

    setEmailReceipts(prev => prev.map(r => r.id === receiptId ? { ...r, imported: true } : r));
  };

  const updateTaxSettings = (settings: Partial<TaxSettings>) => {
    setTaxSettings(prev => ({ ...prev, ...settings }));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const simulateEmailScan = async () => {
    setIsScanningEmail(true);
    await new Promise(resolve => setTimeout(resolve, 2200));

    const newReceipt: EmailReceipt = {
      id: `receipt-${Date.now()}`,
      sender: 'billing@github.com',
      subject: 'GitHub Copilot Enterprise Invoice #GH-8871',
      date: new Date().toISOString().split('T')[0],
      amount: 19.00,
      vendorName: 'GitHub Inc.',
      isSubscription: true,
      items: ['Copilot Enterprise Seat License'],
      suggestedCategory: 'software',
      isDeductible: true,
      imported: false
    };

    setEmailReceipts(prev => [newReceipt, ...prev]);
    setIsScanningEmail(false);

    const newAlert: AlertItem = {
      id: `alt-${Date.now()}`,
      title: '📧 Nuevo Recibo de Correo Escaneado',
      message: `Se ha detectado una nueva factura de ${newReceipt.vendorName} por $${newReceipt.amount} USD. Deducible de impuestos registrado.`,
      type: 'subscription',
      severity: 'medium',
      date: new Date().toISOString().split('T')[0],
      actionText: 'Importar Recibo'
    };
    setAlerts(prev => [newAlert, ...prev]);

    triggerMilestoneCelebration();
  };

  // Real Dynamic AI Chat Engine Hook with VPS Notes Integration
  const sendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: text,
          contextData: {
            ficoScore: ficoReport.score,
            debtCount: debts.length,
            healthScore: computeHealthMetrics().score
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const aiMsg: ChatMessage = {
            id: `msg-${Date.now() + 1}`,
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: data.suggestions,
            actionPayload: data.actionPayload
          };
          setChatMessages(prev => [...prev, aiMsg]);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend AI chat error, using context fallback:', err);
    }

    // Dynamic Context Fallback
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `Comprendo exactamente lo que me dices sobre: "${text}".\n\nComo tu consejero financiero, sugiero mantener nuestro foco en proteger tu sueldo de trabajo físico, acumular deducibles de impuestos y bajar la utilización de tus tarjetas para subir tu FICO Score. ¿Guardamos este acuerdo en tu servidor VPS?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['📝 Guardar acuerdo en VPS', '📊 Ver Caja & Flujo']
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  const uploadDocument = (doc: Omit<DocumentItem, 'id'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`
    };
    setDocuments(prev => [newDoc, ...prev]);
    triggerMilestoneCelebration();
  };

  const updateFicoReport = (report: Partial<FicoCreditReport>) => {
    setFicoReport(prev => ({ ...prev, ...report }));
  };

  const triggerMilestoneCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#7928ca', '#10b981', '#ffffff']
    });
  };

  return (
    <FinancialContext.Provider
      value={{
        transactions,
        subscriptions,
        debts,
        futureIncomes,
        emailReceipts,
        alerts,
        taxSettings,
        healthMetrics: computeHealthMetrics(),
        isScanningEmail,
        chatMessages,
        chatDockPosition,
        documents,
        ficoReport,
        addTransaction,
        deleteTransaction,
        addSubscription,
        updateSubscriptionStatus,
        addDebt,
        updateDebtBalance,
        addFutureIncome,
        allocateFutureIncome,
        importEmailReceipt,
        updateTaxSettings,
        dismissAlert,
        simulateEmailScan,
        triggerMilestoneCelebration,
        sendChatMessage,
        setChatDockPosition,
        uploadDocument,
        updateFicoReport
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancials = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancials must be used within a FinancialProvider');
  }
  return context;
};
