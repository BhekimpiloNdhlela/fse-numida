import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";

import CustomButton from "../common/CustomButton";
import NotificationAlert from "../common/NotificationAlert";

import { LoanCalculatorProps } from "../../utuils/interfaces";

/**
 * Presentational component for the loan calculator.
 * Receives all data and callbacks as props.
 *
 * @param {LoanCalculatorProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered loan calculator form.
 */
const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  principal,
  rate,
  months,
  interest,
  error,
  onPrincipalChange,
  onRateChange,
  onMonthsChange,
  onCalculate,
}: LoanCalculatorProps): JSX.Element => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /**
   * Handles input changes for numeric fields and converts the value to a number.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object for the input change.
   * @param {(value: number) => void} onChange - The callback to update the state with the new value.
   * @param {string} fieldName - The name of the field being updated.
   */
  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: number) => void,
    fieldName: string
  ): void => {
    const value = parseFloat(e.target.value);
    onChange(isNaN(value) ? 0 : value);

    // Clear previous field error if any
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  /**
   * Validates the form fields and checks for errors.
   *
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (principal <= 0) {
      errors.principal = "Principal must be greater than 0";
    }

    if (rate <= 0) {
      errors.rate = "Interest rate must be greater than 0";
    }

    if (months <= 0) {
      errors.months = "Loan term must be greater than 0";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission.
   * Validates the form before calling the onCalculate callback.
   */
  const handleSubmit = (): void => {
    if (!validateForm()) {
      return;
    }
    onCalculate();
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
            onChange={(e) =>
              handleNumericChange(e, onPrincipalChange, "principal")
            }
            isInvalid={!!fieldErrors.principal}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.principal}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Annual Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter annual interest rate"
            value={rate || ""}
            onChange={(e) => handleNumericChange(e, onRateChange, "rate")}
            min="0"
            isInvalid={!!fieldErrors.rate}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.rate}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="months">
          <Form.Label>Loan Term (Months)</Form.Label>
          <Form.Control
            type="number"
            step="1"
            placeholder="Enter loan term in months"
            value={months || ""}
            onChange={(e) => handleNumericChange(e, onMonthsChange, "months")}
            min="0"
            isInvalid={!!fieldErrors.months}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.months}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

      {error && <NotificationAlert type="danger" message={error} />}

      <h5>Calculated Interest: ${interest.toFixed(2)}</h5>
      <CustomButton
        label="Calculate Interest"
        type="dark"
        onClick={handleSubmit}
      />
    </Container>
  );
};

export default LoanCalculator;
