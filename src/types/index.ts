export type CategoryType = 
  | 'software' 
  | 'cloud' 
  | 'office' 
  | 'marketing' 
  | 'salary' 
  | 'consulting' 
  | 'services' 
  | 'housing' 
  | 'utilities' 
  | 'entertainment' 
  | 'taxes' 
  | 'debt_payment' 
  | 'education' 
  | 'health' 
  | 'transport' 
  | 'other';

export type IncomeSourceType = 'job_physical' | 'startup_revenue' | 'freelance' | 'investment' | 'other';

export interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: CategoryType;
  purposeTag: string; // ¿Para qué se usa/usó este recurso?
  isDeductible: boolean; // Tax deductible flag
  paymentMethod: string;
  vendor?: string;
  status: 'completed' | 'pending';
  receiptAttached?: boolean;
  incomeSourceType?: IncomeSourceType; // Differentiate physical job vs startup
}

export interface Subscription {
  id: string;
  name: string;
  vendor: string;
  category: CategoryType;
  monthlyCost: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  autoRenew: boolean;
  detectedViaEmail: boolean;
  status: 'active' | 'cancelling' | 'paused';
  cancellationDifficulty: 'easy' | 'medium' | 'hard';
  purposeTag: string;
  priceIncreased?: boolean;
  previousCost?: number;
}

export interface Debt {
  id: string;
  creditor: string;
  name: string;
  totalBalance: number;
  remainingBalance: number;
  interestRate: number; // APR %
  minimumPayment: number;
  dueDateDay: number; // Day of month e.g. 15
  category: 'credit_card' | 'personal_loan' | 'car_loan' | 'mortgage' | 'business_credit';
  targetPayoffStrategy?: 'snowball' | 'avalanche';
}

export interface FutureIncomeAllocation {
  taxReserve: number;       // % or amount
  debtPayoff: number;       // % or amount
  emergencyFund: number;    // % or amount
  fixedExpenses: number;    // % or amount
  discretionary: number;    // % or amount
}

export interface FutureIncome {
  id: string;
  source: string;
  expectedDate: string;
  amount: number;
  purposeTag: string;
  allocations: FutureIncomeAllocation;
  status: 'planned' | 'allocated' | 'received';
  clientName?: string;
  incomeSourceType?: IncomeSourceType;
}

export interface EmailReceipt {
  id: string;
  sender: string;
  subject: string;
  date: string;
  amount: number;
  vendorName: string;
  isSubscription: boolean;
  items: string[];
  suggestedCategory: CategoryType;
  isDeductible: boolean;
  imported: boolean;
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  type: 'subscription' | 'tax' | 'debt' | 'budget' | 'insight';
  severity: 'low' | 'medium' | 'high';
  date: string;
  actionText?: string;
  actionPayload?: string;
}

export interface TaxSettings {
  taxRegion: 'US' | 'CO' | 'MX' | 'ES' | 'OTHER';
  filingStatus: 'single' | 'married' | 'self_employed' | 'corporation';
  estimatedTaxBracketPercent: number; // e.g. 25%
  annualTaxDeductionGoal: number;
  taxReservesBalance: number;
}

export interface FinancialHealthMetrics {
  score: number; // 0 - 100
  stabilityTier: 'Critical' | 'Getting Organized' | 'Stable' | 'Wealth Building' | 'Financial Freedom';
  debtToIncomeRatio: number; // percentage
  savingsRate: number; // percentage
  taxReserveCoverage: number; // percentage of target
  subscriptionLeakage: number; // monthly unused cost
  burnRateMonthly: number;
  runwayMonths: number;
}

// NEW AI & FICO TYPES
export type ChatDockPosition = 'right' | 'left' | 'bottom';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionPayload?: {
    tab?: string;
    action?: string;
    amount?: number;
  };
}

export interface DocumentItem {
  id: string;
  fileName: string;
  fileType: 'bank_statement' | 'invoice' | 'tax_document' | 'fico_report' | 'other';
  uploadDate: string;
  fileSize: string;
  parsedStatus: 'pending' | 'parsed' | 'imported';
  extractedData?: {
    vendorOrClient?: string;
    totalAmount?: number;
    detectedDate?: string;
    suggestedCategory?: CategoryType;
    isDeductible?: boolean;
    detectedFicoScore?: number;
    summaryText?: string;
  };
}

export interface FicoCreditReport {
  score: number; // 300 - 850
  tier: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Exceptional';
  lastUpdated: string;
  creditUtilizationPercent: number; // e.g. 42%
  onTimePaymentPercent: number; // e.g. 98%
  totalCreditLimit: number;
  totalBalanceUsed: number;
  activeInquiries: number;
  accountAgeYears: number;
  recommendations: string[];
}
