import React from "react";
import { Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Dummy data
const loans: Loan[] = [
  {
    id: 1,
    name: "Tom's Loan",
    interest_rate: 5.0,
    principal: 10000,
    due_date: "2025-03-01",
  },
  {
    id: 2,
    name: "Chris Wailaka",
    interest_rate: 3.5,
    principal: 500000,
    due_date: "2025-03-01",
  },
  {
    id: 3,
    name: "NP Mobile Money",
    interest_rate: 4.5,
    principal: 30000,
    due_date: "2025-03-01",
  },
  {
    id: 4,
    name: "Esther's Autoparts",
    interest_rate: 1.5,
    principal: 40000,
    due_date: "2025-03-01",
  },
];

const loanPayments: LoanPayment[] = [
  { id: 1, loan_id: 1, payment_date: "2024-03-04" },
  { id: 2, loan_id: 2, payment_date: "2024-03-15" },
  { id: 3, loan_id: 3, payment_date: "2024-04-05" },
];

const LoanList: React.FC = () => {
  const navigate = useNavigate();

  // Helper function to get payments for a specific loan
  const getPaymentsForLoan = (loanId: number) => {
    return loanPayments.filter((payment) => payment.loan_id === loanId);
  };

  // Handle row click
  const handleRowClick = (loanId: number) => {
    navigate(`/loan/${loanId}`); // Navigate to the loan details page
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Interest Rate (%)</th>
          <th>Principal ($)</th>
          <th>Due Date</th>
          <th>Payments</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr
            key={loan.id}
            onClick={() => handleRowClick(loan.id)}
            style={{ cursor: "pointer" }} // Change cursor to pointer
          >
            <td>{loan.id}</td>
            <td>{loan.name}</td>
            <td>{loan.interest_rate}</td>
            <td>{loan.principal}</td>
            <td>{loan.due_date}</td>
            <td>
              <ul>
                {getPaymentsForLoan(loan.id).map((payment) => (
                  <li key={payment.id}>Payment Date: {payment.payment_date}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LoanList;
