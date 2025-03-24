import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import NotificationAlert from "../common/NotificationAlert";
import { NewPaymentProps } from "../../utuils/interfaces";

/**
 * Page component for making a new payment.
 * Handles form validation, state management, and payment submission.
 *
 * @param {NewPaymentProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered New Payment form component.
 */
const NewPayment: React.FC<NewPaymentProps> = ({
  loanId,
  error,
  success,
  onPaymentSubmit,
}: NewPaymentProps): JSX.Element => {
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /**
   * Handles change in payment amount input.
   * Validates the value and updates the payment amount state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the input.
   */
  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = parseFloat(e.target.value);
    setPaymentAmount(isNaN(value) ? 0 : value);

    if (fieldErrors.paymentAmount) {
      setFieldErrors((prev) => ({ ...prev, paymentAmount: "" }));
    }
  };

  /**
   * Validates the form inputs.
   * Ensures that the payment amount is greater than 0.
   *
   * @returns {boolean} True if the form is valid, otherwise false.
   */
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (paymentAmount <= 0) {
      errors.paymentAmount = "Payment amount must be greater than 0";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission to make the payment.
   * Validates the form and triggers the onPaymentSubmit callback.
   */
  const handleSubmit = (): void => {
    if (!validateForm()) {
      return;
    }
    onPaymentSubmit(paymentAmount, paymentDate);
  };

  return (
    <Container className="mt-4">
      <h3>New Payment</h3>
      <Form>
        <Form.Group className="mb-3" controlId="loanId">
          <Form.Label>Payment Loan ID:</Form.Label>
          <Form.Control type="text" value={loanId} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="paymentDate">
          <Form.Label>Payment Date:</Form.Label>
          <Form.Control type="date" disabled value={paymentDate} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="paymentAmount">
          <Form.Label>Payment Amount:</Form.Label>
          <Form.Control
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={paymentAmount || ""}
            onChange={handlePaymentAmountChange}
            isInvalid={!!fieldErrors.paymentAmount}
          />
          <Form.Control.Feedback type="invalid">
            {fieldErrors.paymentAmount}
          </Form.Control.Feedback>
        </Form.Group>

        {error && <NotificationAlert type="danger" message={error} />}
        {success && <NotificationAlert type="success" message={success} />}

        <CustomButton type="dark" onClick={handleSubmit} label="Make Payment" />
      </Form>
    </Container>
  );
};

export default NewPayment;
