import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewLoan from "../components/loans/NewLoan";
import { NewLoanData } from "../utuils/interfaces";
import { addLoan } from "../api/api";

/**
 * Page component for adding a new loan.
 * Handles business logic and state management for loan applications.
 *
 * @returns {JSX.Element} The rendered New Loan page component.
 */
const NewLoanPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * Handles form submission for adding a new loan.
   * Sends loan data to the backend and manages success/error state.
   *
   * @param {NewLoanData} loanData - The loan data to be submitted.
   * @returns {Promise<void>} A promise that resolves when the loan is added.
   */
  const handleAddNewLoan = async (loanData: NewLoanData): Promise<void> => {
    try {
      await addLoan(loanData);
      setSuccess(true);
      setError(null);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setSuccess(false);
    }
  };

  return (
    <NewLoan error={error} success={success} onSubmit={handleAddNewLoan} />
  );
};

export default NewLoanPage;
