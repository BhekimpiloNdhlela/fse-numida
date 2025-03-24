import { gql } from "@apollo/client";

/**
 * GraphQL query to fetch loan and payment details
 */
export const GET_LOAN_DETAILS = gql`
  query GetLoanDetails($loanId: Int!) {
    loan(id: $loanId) {
      id
      name
      interestRate
      principal
      dueDate
      loanPayments {
        id
        paymentDate
      }
    }
  }
`;

/**
 * GraphQL query to fetch loans data
 */
export const GET_LOANS = gql`
  query GetLoans {
    loans {
      id
      name
      interestRate
      principal
      dueDate
      loanPayments {
        id
        paymentDate
      }
    }
  }
`;