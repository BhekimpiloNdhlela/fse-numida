import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Badge, Container, Button } from "react-bootstrap";

// Dummy data
const loans = [
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

const loanPayments = [
  { id: 1, loan_id: 1, payment_date: "2024-03-04" },
  { id: 2, loan_id: 2, payment_date: "2024-03-15" },
  { id: 3, loan_id: 3, payment_date: "2024-04-05" },
];

const LoanDetails = () => {
  const { loanId } = useParams(); // Get the loan ID from the URL
  const navigate = useNavigate(); // Hook for programmatic navigation

  const loan = loans.find((loan) => loan.id === Number(loanId));
  const payments = loanPayments.filter(
    (payment) => payment.loan_id === Number(loanId)
  );

  // Helper function to calculate payment status
  const getPaymentStatus = (paymentDate, dueDate) => {
    const payment = new Date(paymentDate);
    const due = new Date(dueDate);
    const diffTime = Math.abs(payment.getTime() - due.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 5) return { status: "On Time", variant: "success" };
    if (diffDays > 5 && diffDays <= 30)
      return { status: "Late", variant: "warning" };
    if (diffDays > 30) return { status: "Defaulted", variant: "danger" };
    return { status: "Unpaid", variant: "secondary" };
  };

  if (!loan) {
    return <div>Loan not found</div>;
  }

  return (
    <Container className="mt-1">
      <h1>Loan Details</h1>
      <div className="loan-info mb-4">
        <h2>{loan.name}</h2>
        <p>
          <strong>Interest Rate:</strong> {loan.interest_rate}%
        </p>
        <p>
          <strong>Principal:</strong> ${loan.principal}
        </p>
        <p>
          <strong>Due Date:</strong> {loan.due_date}
        </p>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            onClick={() => navigate(`/new-payment/${loanId}`)}
          >
            Make Payment
          </Button>
        </div>
      </div>

      <h2>Payment History</h2>
      {payments.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              const { status, variant } = getPaymentStatus(
                payment.payment_date,
                loan.due_date
              );
              return (
                <tr key={payment.id}>
                  <td>{payment.payment_date}</td>
                  <td>
                    <Badge bg={variant}>{status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No payments recorded.</p>
      )}
    </Container>
  );
};

export default LoanDetails;
