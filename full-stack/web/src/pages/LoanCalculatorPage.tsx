import React, { useState } from "react";
import LoanCalculator from "../components/loans/LoanCalculator";

/**
 * Page component for the loan calculator.
 * Handles state management, user input, and interest calculation logic.
 *
 * @returns {JSX.Element} The rendered Loan Calculator page component.
 */
const LoanCalculatorPage: React.FC = (): JSX.Element => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Calculates the simple interest based on the current principal, rate, and months.
   * Displays an error message if any of the inputs are invalid.
   */
  const handleCalculateInterest = (): void => {
    if (principal <= 0 || rate <= 0 || months <= 0) {
      setError("Please enter valid values for principal, rate, and months.");
      setInterest(0);
    } else {
      setError(null);
      setInterest((principal * rate * months) / 1200);
    }
  };

  return (
    <LoanCalculator
      principal={principal}
      rate={rate}
      months={months}
      interest={interest}
      error={error}
      onPrincipalChange={setPrincipal}
      onRateChange={setRate}
      onMonthsChange={setMonths}
      onCalculate={handleCalculateInterest}
    />
  );
};

export default LoanCalculatorPage;
