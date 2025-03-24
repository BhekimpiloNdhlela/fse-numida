/**
 * API service functions for loan operations
 */

import { NewLoanData, PaymentData } from "../utuils/interfaces";

/**
 * Adds a new loan to the system
 * 
 * @param {NewLoanData} loanData - The loan data to add
 * 
 * @returns {Promise<void>}
 * 
 * @throws {Error} When the request fails
 */
export const addLoan = async (loanData: NewLoanData): Promise<void> => {
  // TODO: please add the BASE_URL to the .env file, becuase of time I will not be able to do that
  // https://vite.dev/guide/env-and-mode.html
  const response = await fetch("http://localhost:2024/add-loan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loanData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add loan");
  }
};

/**
 * Adds a payment to a loan
 * 
 * @param {string} loanId - The ID of the loan
 * @param {PaymentData} paymentData - The payment data to add
 * 
 * @returns {Promise<void>}
 * 
 * @throws {Error} When the request fails
 */
export const addPayment = async (
  loanId: string,
  paymentData: PaymentData
): Promise<void> => {
  // TODO: please add the BASE_URL to the .env file, becuase of time I will not be able to do that
  // https://vite.dev/guide/env-and-mode.html
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
};
