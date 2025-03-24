import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { addPayment } from "../api/api";
import { PaymentData } from "../utuils/interfaces";

import NewPayment from "../components/payments/NewPayment";

/**
 * Page component for adding a new payment.
 * Handles business logic and state management for loan payments.
 *
 * @returns {JSX.Element} The rendered New Payment page component.
 */
const NewPaymentPage: React.FC = (): JSX.Element => {
  const { loanId: paramsLoanID } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  const [loanId, setLoanId] = useState<string>(paramsLoanID || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /**
   * Updates loanId state when route parameters change.
   */
  useEffect(() => {
    if (paramsLoanID) {
      setLoanId(paramsLoanID);
    }
  }, [paramsLoanID]);

  /**
   * Handles payment submission.
   * Validates input fields and sends payment data to the backend.
   *
   * @param {number} paymentAmount - The amount of the payment.
   * @param {string} paymentDate - The date of the payment in YYYY-MM-DD format.
   * @returns {Promise<void>} A promise that resolves when the payment is processed.
   */
  const handleMakeLoanPayment = async (
    paymentAmount: number,
    paymentDate: string
  ): Promise<void> => {
    if (!loanId || paymentAmount <= 0 || !paymentDate) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    const paymentData: PaymentData = {
      payment_date: paymentDate,
      amount: paymentAmount,
    };

    try {
      await addPayment(loanId, paymentData);
      setSuccess("Payment added successfully!");
      setError(null);
      setTimeout(() => navigate(`/loan/${loanId}`), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add payment");
      setSuccess(null);
    }
  };

  return (
    <NewPayment
      loanId={loanId}
      error={error}
      success={success}
      onPaymentSubmit={handleMakeLoanPayment}
    />
  );
};

export default NewPaymentPage;
