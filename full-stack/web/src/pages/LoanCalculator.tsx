import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import CustomButton from "../components/common/CustomButton";
import NotificationAlert from "../components/common/NotificationAlert";

/**
 * Props for the LoanCalculator component.
 */
interface LoanCalculatorProps {
  /** Initial principal amount (default: 0) */
  initialPrincipal?: number;
  /** Initial interest rate in percentage (default: 0) */
  initialRate?: number;
  /** Initial loan term in months (default: 0) */
  initialMonths?: number;
}

/**
 * Loan interest calculator component.
 *
 * Calculates simple interest based on principal amount, annual interest rate, and loan term.
 *
 * @returns {JSX.Element} The loan calculator form and results
 */
const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  initialPrincipal = 0,
  initialRate = 0,
  initialMonths = 0,
}): JSX.Element  => {
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [rate, setRate] = useState<number>(initialRate);
  const [months, setMonths] = useState<number>(initialMonths);
  const [interest, setInterest] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles principal amount input changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrincipal(isNaN(value) ? 0 : value);
  };

  /**
   * Handles interest rate input changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setRate(isNaN(value) ? 0 : value);
  };

  /**
   * Handles loan term input changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMonths(isNaN(value) ? 0 : value);
  };

  /**
   * Calculates the simple interest based on current inputs.
   */
  const handleCalculateInterest = () => {
    if (principal <= 0 || rate <= 0 || months <= 0) {
      setError("Please enter valid values for principal, rate, and months.");
      setInterest(0);
    } else {
      setError(null);
      setInterest((principal * rate * months) / 1200); // Divided by 1200 for monthly interest from annual rate
    }
  };

  return (
    <Container className="mt-4">
      <h3>Loan Interest Calculator</h3>
      <Form>
        <Form.Group className="mb-3" controlId="principal">
          <Form.Label>Principal Amount ($)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter principal amount"
            value={principal || ""}
            onChange={handlePrincipalChange}
          />
          <Form.Text className="text-muted">
            Provide a valid loan principal amount.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Annual Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter annual interest rate"
            value={rate || ""}
            onChange={handleRateChange}
            min="0"
          />
          <Form.Text className="text-muted">
            Provide a valid annual interest rate.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="months">
          <Form.Label>Loan Term (Months)</Form.Label>
          <Form.Control
            type="number"
            step="1"
            placeholder="Enter loan term in months"
            value={months || ""}
            onChange={handleMonthsChange}
            min="0"
          />
          <Form.Text className="text-muted">
            Provide a valid loan term in months.
          </Form.Text>
        </Form.Group>
      </Form>

      {error && <NotificationAlert type="danger" message={error} />}

      <h5>Calculated Interest: ${interest.toFixed(2)}</h5>
      <CustomButton
        label="Calculate Interest"
        type="dark"
        onClick={handleCalculateInterest}
      />
    </Container>
  );
};

export default LoanCalculator;
