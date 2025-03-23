import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

interface LoanCalculatorProps {
  initialPrincipal?: number;
  initialRate?: number;
  initialMonths?: number;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  initialPrincipal = 0,
  initialRate = 0,
  initialMonths = 0,
}) => {
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [rate, setRate] = useState<number>(initialRate);
  const [months, setMonths] = useState<number>(initialMonths);
  const [interest, setInterest] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Calculate interest whenever principal, rate, or months change
  useEffect(() => {
    if (principal <= 0 || rate <= 0 || months <= 0) {
      setError("Please enter valid values for principal, rate, and months.");
      setInterest(0);
    } else {
      setError(null);
      setInterest((principal * rate * months) / 100);
    }
  }, [principal, rate, months]);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPrincipal(isNaN(value) ? 0 : value);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setRate(isNaN(value) ? 0 : value);
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMonths(isNaN(value) ? 0 : value);
  };

  return (
    <Container className="mt-4">
      <h3>Loan Interest Calculator</h3>
      <Form>
        <Form.Group className="mb-3" controlId="principal">
          <Form.Label>Principal Amount ($)</Form.Label>
          <Form.Control
            // type="number"
            placeholder="Enter principal amount"
            value={principal}
            onChange={handlePrincipalChange}
            // min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Annual Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter annual interest rate"
            value={rate}
            onChange={handleRateChange}
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="months">
          <Form.Label>Loan Term (Months)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan term in months"
            value={months}
            onChange={handleMonthsChange}
            min="0"
          />
        </Form.Group>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <h4>Calculated Interest: ${interest.toFixed(2)}</h4>
    </Container>
  );
};

export default LoanCalculator;
