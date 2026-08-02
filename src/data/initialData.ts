import type { Transaction, Subscription, Debt, FutureIncome, EmailReceipt, AlertItem, TaxSettings } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    date: '2026-07-28',
    title: 'Pago Proyecto Desarrollo Web Enterprise',
    amount: 5500,
    type: 'income',
    category: 'services',
    purposeTag: 'Ingreso Principal - Reserva para impuestos 25% y pago de tarjeta',
    isDeductible: false,
    paymentMethod: 'Transferencia Bancaria',
    vendor: 'Stripe / Cliente Tech Corp',
    status: 'completed'
  },
  {
    id: 'tx-2',
    date: '2026-07-25',
    title: 'Servidores Vercel Pro & AWS Cloud',
    amount: 145,
    type: 'expense',
    category: 'cloud',
    purposeTag: 'Infraestructura de Hosting para Clientes (Deducible)',
    isDeductible: true,
    paymentMethod: 'Tarjeta de Crédito Business',
    vendor: 'AWS / Vercel',
    status: 'completed',
    receiptAttached: true
  },
  {
    id: 'tx-3',
    date: '2026-07-20',
    title: 'Suscripción OpenAI ChatGPT Plus & Claude Team',
    amount: 60,
    type: 'expense',
    category: 'software',
    purposeTag: 'Herramienta de Trabajo / Asistente IA (Deducible)',
    isDeductible: true,
    paymentMethod: 'Tarjeta de Crédito',
    vendor: 'OpenAI Inc.',
    status: 'completed',
    receiptAttached: true
  },
  {
    id: 'tx-4',
    date: '2026-07-18',
    title: 'Compra Equipo Laptop & Monitor 4K',
    amount: 2100,
    type: 'expense',
    category: 'office',
    purposeTag: 'Inversión en Equipamiento de Trabajo (Deducible 100%)',
    isDeductible: true,
    paymentMethod: 'Tarjeta de Crédito (3 Cuotas)',
    vendor: 'Apple Store',
    status: 'completed',
    receiptAttached: true
  },
  {
    id: 'tx-5',
    date: '2026-07-15',
    title: 'Abono Extra a Tarjeta Visa Platinum',
    amount: 1200,
    type: 'expense',
    category: 'debt_payment',
    purposeTag: 'Reducción Estratégica de Deuda de Alto Interés (Avalancha)',
    isDeductible: false,
    paymentMethod: 'Transferencia Bancaria',
    vendor: 'Banco Principal',
    status: 'completed'
  },
  {
    id: 'tx-6',
    date: '2026-07-10',
    title: 'Asesoría Contable & Declaración Tributaria',
    amount: 350,
    type: 'expense',
    category: 'consulting',
    purposeTag: 'Honorarios Profesionales Contables (Deducible)',
    isDeductible: true,
    paymentMethod: 'Transferencia',
    vendor: 'Estudio Contable R&A',
    status: 'completed',
    receiptAttached: true
  },
  {
    id: 'tx-7',
    date: '2026-07-05',
    title: 'Servicio de Internet Fibra Óptica 1Gbps',
    amount: 85,
    type: 'expense',
    category: 'utilities',
    purposeTag: 'Servicio Esencial de Oficina / Conectividad',
    isDeductible: true,
    paymentMethod: 'Débito Automático',
    vendor: 'Telecom Fiber',
    status: 'completed'
  }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    name: 'Adobe Creative Cloud All Apps',
    vendor: 'Adobe',
    category: 'software',
    monthlyCost: 59.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-08-12',
    autoRenew: true,
    detectedViaEmail: true,
    status: 'active',
    cancellationDifficulty: 'medium',
    purposeTag: 'Diseño UI/UX y assets gráficos para proyectos',
    priceIncreased: true,
    previousCost: 52.99
  },
  {
    id: 'sub-2',
    name: 'GitHub Copilot Enterprise',
    vendor: 'GitHub / Microsoft',
    category: 'software',
    monthlyCost: 19.00,
    billingCycle: 'monthly',
    nextBillingDate: '2026-08-15',
    autoRenew: true,
    detectedViaEmail: true,
    status: 'active',
    cancellationDifficulty: 'easy',
    purposeTag: 'Autocompletado de código e IA dev'
  },
  {
    id: 'sub-3',
    name: 'GSuite / Google Workspace Business',
    vendor: 'Google Cloud',
    category: 'cloud',
    monthlyCost: 36.00,
    billingCycle: 'monthly',
    nextBillingDate: '2026-08-18',
    autoRenew: true,
    detectedViaEmail: true,
    status: 'active',
    cancellationDifficulty: 'easy',
    purposeTag: 'Correos corporativos y almacenamiento en la nube'
  },
  {
    id: 'sub-4',
    name: 'Gimnasio Premium Club',
    vendor: 'FitLife Gym',
    category: 'health',
    monthlyCost: 75.00,
    billingCycle: 'monthly',
    nextBillingDate: '2026-08-05',
    autoRenew: true,
    detectedViaEmail: false,
    status: 'active',
    cancellationDifficulty: 'hard',
    purposeTag: 'Salud personal y bienestar físico'
  },
  {
    id: 'sub-5',
    name: 'Plataforma Streaming 4K Ultra (Poco Uso)',
    vendor: 'StreamMedia Inc.',
    category: 'entertainment',
    monthlyCost: 22.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-08-08',
    autoRenew: true,
    detectedViaEmail: true,
    status: 'active',
    cancellationDifficulty: 'easy',
    purposeTag: 'Entretenimiento ocasional - Alerta: Fuga de capital por bajo uso',
    priceIncreased: true,
    previousCost: 17.99
  }
];

export const INITIAL_DEBTS: Debt[] = [
  {
    id: 'debt-1',
    creditor: 'Banco Platinum',
    name: 'Tarjeta de Crédito Visa Business',
    totalBalance: 8500,
    remainingBalance: 4200,
    interestRate: 24.5,
    minimumPayment: 210,
    dueDateDay: 15,
    category: 'credit_card',
    targetPayoffStrategy: 'avalanche'
  },
  {
    id: 'debt-2',
    creditor: 'Financiera Impulso',
    name: 'Préstamo de Libre Inversión / Capital Trabajo',
    totalBalance: 12000,
    remainingBalance: 7800,
    interestRate: 14.2,
    minimumPayment: 380,
    dueDateDay: 28,
    category: 'personal_loan',
    targetPayoffStrategy: 'snowball'
  },
  {
    id: 'debt-3',
    creditor: 'Apple Financial / Citizens',
    name: 'Financiamiento MacBook Pro M3 Max',
    totalBalance: 3200,
    remainingBalance: 1400,
    interestRate: 0.0,
    minimumPayment: 150,
    dueDateDay: 10,
    category: 'business_credit'
  }
];

export const INITIAL_FUTURE_INCOMES: FutureIncome[] = [
  {
    id: 'fi-1',
    source: 'Contrato Mantenimiento Software Q3',
    expectedDate: '2026-08-10',
    amount: 4800,
    purposeTag: 'Cobro mensual cliente recurrente - Asignar 30% a Impuestos',
    clientName: 'SaaS Solutions Inc.',
    status: 'planned',
    allocations: {
      taxReserve: 1440,
      debtPayoff: 1500,
      emergencyFund: 500,
      fixedExpenses: 900,
      discretionary: 460
    }
  },
  {
    id: 'fi-2',
    source: 'Consultoría Especializada en Arquitectura Cloud',
    expectedDate: '2026-08-25',
    amount: 3200,
    purposeTag: 'Proyecto de optimización de infraestructura para FinTech',
    clientName: 'Alpha Capital',
    status: 'planned',
    allocations: {
      taxReserve: 800,
      debtPayoff: 1200,
      emergencyFund: 400,
      fixedExpenses: 500,
      discretionary: 300
    }
  }
];

export const INITIAL_EMAIL_RECEIPTS: EmailReceipt[] = [
  {
    id: 'receipt-1',
    sender: 'billing@aws.amazon.com',
    subject: 'Tu Factura Electrónica de AWS - Julio 2026',
    date: '2026-08-01',
    amount: 98.40,
    vendorName: 'Amazon Web Services',
    isSubscription: true,
    items: ['EC2 Compute Instances', 'S3 Storage & CloudFront CDN', 'RDS PostgreSQL Database'],
    suggestedCategory: 'cloud',
    isDeductible: true,
    imported: false
  },
  {
    id: 'receipt-2',
    sender: 'invoices@figma.com',
    subject: 'Invoice #FG-984310 - Figma Professional Team',
    date: '2026-07-30',
    amount: 45.00,
    vendorName: 'Figma Inc.',
    isSubscription: true,
    items: ['Figma Organization Plan - 3 Seats'],
    suggestedCategory: 'software',
    isDeductible: true,
    imported: false
  },
  {
    id: 'receipt-3',
    sender: 'recibos@uber.com',
    subject: 'Tu viaje con Uber del 29 de Julio',
    date: '2026-07-29',
    amount: 34.50,
    vendorName: 'Uber',
    isSubscription: false,
    items: ['Traslado a reunión presencial con Cliente Tech Corp'],
    suggestedCategory: 'transport',
    isDeductible: true,
    imported: false
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    title: '⚠️ Incremento en Suscripción Detectado',
    message: 'Adobe y StreamMedia aumentaron sus precios este mes (+$12.00/mes total). Revisa si deseas mantener el servicio.',
    type: 'subscription',
    severity: 'medium',
    date: '2026-08-01',
    actionText: 'Revisar Suscripciones'
  },
  {
    id: 'alt-2',
    title: '🏛️ Reserva Estimada de Impuestos Q3',
    message: 'Tus ingresos acumulados generan una obligación tributaria estimada de $2,425 USD. Tu fondo actual cubre el 72%.',
    type: 'tax',
    severity: 'high',
    date: '2026-08-01',
    actionText: 'Ver Estimador fiscal'
  },
  {
    id: 'alt-[#alt-3]',
    title: '💳 Próximo Vencimiento de Deuda',
    message: 'La Tarjeta Visa Business vence en 14 días (Pago mínimo: $210). Se recomienda pago acelerado de $1,200 para ahorrar $420 en intereses.',
    type: 'debt',
    severity: 'high',
    date: '2026-08-01',
    actionText: 'Planear Pago'
  },
  {
    id: 'alt-4',
    title: '💡 Diagnóstico de Estabilidad Financiera',
    message: 'Tu puntuación de salud financiera ha subido a 68/100 ("En Organización"). Has registrado el 85% de tus deducibles de impuestos.',
    type: 'insight',
    severity: 'low',
    date: '2026-08-01'
  }
];

export const INITIAL_TAX_SETTINGS: TaxSettings = {
  taxRegion: 'US',
  filingStatus: 'self_employed',
  estimatedTaxBracketPercent: 25,
  annualTaxDeductionGoal: 15000,
  taxReservesBalance: 1750
};
