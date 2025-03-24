import React from "react";
import { Table, Badge, Container, Alert } from "react-bootstrap";
import CustomButton from "../common/CustomButton";
import { LoanDetailsProps, PaymentStatus } from "../../utuils/interfaces";

/**
 * Presentational component for displaying loan details.
 * Receives data and callbacks as props.
 *
 * @param {LoanDetailsProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered loan details view.
 */
const LoanDetails: React.FC<LoanDetailsProps> = ({
  loan,
  onAddPayment,
}: LoanDetailsProps): JSX.Element => {
  /**
   * Calculates payment status based on payment date and due date.
   * Determines whether the payment is on time, late, defaulted, or unpaid.
   *
   * @param {string} paymentDate - The date of the payment.
   * @param {string} dueDate - The due date of the loan.
   * @returns {PaymentStatus} The payment status, including a status string and variant for styling.
   */
  const getPaymentStatus = (
    paymentDate: string,
    dueDate: string
  ): PaymentStatus => {
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

  const payments = loan.loanPayments || [];

  return (
    <Container className="mt-4">
      <h3>Loan Details</h3>
      <div className="loan-info mb-4">
        <p>
          <strong>Loan Name:</strong> {loan.name}
        </p>
        <p>
          <strong>Interest Rate:</strong> {loan.interestRate}%
        </p>
        <p>
          <strong>Principal:</strong> ${loan.principal.toLocaleString()}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(loan.dueDate).toLocaleDateString()}
        </p>
      </div>

      <h4>Payment History</h4>
      {payments.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              const { status, variant } = getPaymentStatus(
                payment.paymentDate,
                loan.dueDate
              );
              return (
                <tr key={payment.id}>
                  <td>{loan.id}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={variant}>{status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info" className="mb-3 text-center">
          <h4>No Payments Recorded</h4>
          <p>There are no payment details to display for this loan.</p>
        </Alert>
      )}

      <CustomButton type="dark" onClick={onAddPayment} label="Add Payment" />
    </Container>
  );
};

export default LoanDetails;
