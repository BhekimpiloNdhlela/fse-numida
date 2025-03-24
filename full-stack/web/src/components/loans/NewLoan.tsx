import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import NotificationAlert from "../common/NotificationAlert";
import { NewLoanData, NewLoanProps } from "../../utuils/interfaces";

/**
 * Presentational component for adding a new loan.
 * Receives all data and callbacks as props.
 *
 * @param {NewLoanProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered form for adding a new loan.
 */
const NewLoan: React.FC<NewLoanProps> = ({
  error,
  success,
  onSubmit,
}: NewLoanProps): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /**
   * Handles numeric input changes with validation.
   * Updates the corresponding state for numeric fields (principal, rate, months).
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the input.
   * @param {React.Dispatch<React.SetStateAction<number>>} setter - The state setter function for the field.
   * @param {string} fieldName - The name of the field being updated.
   */
  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
    fieldName: string
  ): void => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) ? 0 : value);

    // Clear error when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  /**
   * Validates all form fields.
   * Ensures that each field meets the required criteria.
   *
   * @returns {boolean} True if the form is valid, otherwise false.
   */
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Loan name is required";
    }

    if (principal <= 0) {
      errors.principal = "Principal must be greater than 0";
    }

    if (rate <= 0) {
      errors.rate = "Interest rate must be greater than 0";
    }

    if (months <= 0) {
      errors.months = "Loan term must be greater than 0";
    }

    if (!dueDate) {
      errors.dueDate = "Due date is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission.
   * Validates the form and triggers the onSubmit callback with the loan data.
   */
  const handleSubmit = (): void => {
    if (!validateForm()) {
      return;
    }

    const loanData: NewLoanData = {
      name: name.trim(),
      principal,
      interest_rate: rate,
      due_date: dueDate,
    };

    onSubmit(loanData);
  };

  return (
    <Container className="mt-4">
      <h3>Create New Loan</h3>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Loan Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter loan name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name)
                setFieldErrors((prev) => ({ ...prev, name: "" }));
            }}
            isInvalid={!!fieldErrors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.name}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Provide a valid loan name.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="principal">
          <Form.Label>Principal Amount ($)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter principal amount"
            value={principal || ""}
            onChange={(e) => handleNumericChange(e, setPrincipal, "principal")}
            min="0"
            step="0.01"
            isInvalid={!!fieldErrors.principal}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.principal}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Provide a valid loan principal amount.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Annual Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter annual interest rate"
            value={rate || ""}
            onChange={(e) => handleNumericChange(e, setRate, "rate")}
            min="0"
            step="0.01"
            isInvalid={!!fieldErrors.rate}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.rate}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Provide a valid loan interest rate.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="months">
          <Form.Label>Loan Term (Months)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan term in months"
            value={months || ""}
            onChange={(e) => handleNumericChange(e, setMonths, "months")}
            min="0"
            step="1"
            isInvalid={!!fieldErrors.months}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.months}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Provide a valid loan term.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label>Loan Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              if (fieldErrors.dueDate)
                setFieldErrors((prev) => ({ ...prev, dueDate: "" }));
            }}
            isInvalid={!!fieldErrors.dueDate}
            required
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.dueDate}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Provide a valid loan due date.
          </Form.Text>
        </Form.Group>

        {error && <NotificationAlert type="danger" message={error} />}
        {success && (
          <NotificationAlert
            type="success"
            message="Loan added successfully!"
          />
        )}

        <CustomButton label="Add Loan" type="dark" onClick={handleSubmit} />
      </Form>
    </Container>
  );
};

export default NewLoan;
