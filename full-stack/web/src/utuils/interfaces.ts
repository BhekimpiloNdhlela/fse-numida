/**
 * Interface for payment data
 */
export interface PaymentData {
  payment_date: string;
  amount: number;
}

/**
 * Interface for new loan data
 */
export interface NewLoanData {
  name: string;
  principal: number;
  interest_rate: number;
  due_date: string;
}

/**
 * Interface for Payment data
 */
export interface Payment {
  id: number;
  paymentDate: string;
}

/**
 * Interface for Loan data
 */
export interface Loan {
  id: number;
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  loanPayments: Payment[];
}

/**
 * Interface for Payment Status
 */
export interface PaymentStatus {
  status: string;
  variant: string;
}

/**
 * Interface for the GraphQL query response
 */
export interface LoansQueryResponse {
  loans: Loan[];
}

/**
 * Props for the LoanCalculator component.
 */
export interface LoanCalculatorProps {
  /** Initial principal amount (default: 0) */
  initialPrincipal?: number;
  /** Initial interest rate in percentage (default: 0) */
  initialRate?: number;
  /** Initial loan term in months (default: 0) */
  initialMonths?: number;
}

/**
 * Defines the available button types.
 */
type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

/**
 * Props for the CustomButton component.
 */
export interface CustomButtonProps {
  /** The type of button variant to use. */
  type: ButtonVariant;
  /** Function to handle button clicks. */
  onClick: () => void;
  /** The label text displayed on the button. */
  label: string;
}

/**
 * Props for the Loader component.
 */
export interface LoaderProps {
  /** Determines whether the loader is visible. */
  loading: boolean;
}

// Define the type for the variant prop
type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export interface NotificationAlertProps {
  type: AlertVariant;
  message?: string;
}

/**
 * Props for the New Payment component.
 */
export interface NewPaymentProps {
  loanId: string;
  error: string | null;
  success: string | null;
  onPaymentSubmit: (amount: number, date: string) => void;
}

/**
 * Props for the New Loan component.
 */
export interface NewLoanProps {
  error: string | null;
  success: boolean;
  onSubmit: (loanData: NewLoanData) => void;
}

/**
 * Props for the  Loan list component.
 */
export interface LoanListProps {
  loans: Loan[];
  onRowClick: (loanId: number) => void;
}

/**
 * Props for the  Loan Details component.
 */
export interface LoanDetailsProps {
  loan: Loan;
  onAddPayment: () => void;
}

/**
 * Props for the  Loan Calculator component.
 */
export interface LoanCalculatorProps {
  principal: number;
  rate: number;
  months: number;
  interest: number;
  error: string | null;
  onPrincipalChange: (value: number) => void;
  onRateChange: (value: number) => void;
  onMonthsChange: (value: number) => void;
  onCalculate: () => void;
}
