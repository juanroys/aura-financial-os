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
}
