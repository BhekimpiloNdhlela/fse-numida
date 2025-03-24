import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../components/common/CustomButton";
import NotificationAlert from "../components/common/NotificationAlert";

/**
 * Interface for the payment data structure
 */
interface PaymentData {
  payment_date: string;
  amount: number;
}

/**
 * Component for adding a new payment to a loan
 *
 * @returns {JSX.Element} The AddNewPayment component
 */
const AddNewPayment: React.FC = (): JSX.Element  => {
  const { loanId: paramsLoanID } = useParams<{ loanId: string }>();
  const navigate = useNavigate();

  const [loanId, setLoanId] = useState<string>(paramsLoanID || "");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Update loanId when params change
  useEffect(() => {
    if (paramsLoanID) {
      setLoanId(paramsLoanID);
    }
  }, [paramsLoanID]);

  /**
   * Handles payment submission
   */
  const handleMakeLoanPayment = async (): Promise<void> => {
    if (!loanId || paymentAmount <= 0 || !paymentDate) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    const paymentData: PaymentData = {
      payment_date: paymentDate,
      amount: paymentAmount,
    };

    try {
      const response = await fetch(
        `http://localhost:2024/loans/${loanId}/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add payment");
      }

      setSuccess("Payment added successfully!");
      setError(null);
      navigate(`/loan/${loanId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add payment");
      setSuccess(null);
    }
  };

  /**
   * Handles payment amount input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = parseFloat(e.target.value);
    setPaymentAmount(isNaN(value) ? 0 : value);
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
          />
          <Form.Text className="text-muted">
            Provide a valid loan payment amount.
          </Form.Text>
        </Form.Group>

        {error && <NotificationAlert message={error} type="danger" />}
        {success && <NotificationAlert message={success} type="success" />}

        <CustomButton
          type="dark"
          onClick={handleMakeLoanPayment}
          label="Make Payment"
        />
      </Form>
    </Container>
  );
};

export default AddNewPayment;
