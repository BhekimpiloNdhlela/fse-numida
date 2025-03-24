import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Badge, Container, Alert } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";
import CustomButton from "../components/common/CustomButton";
import Loader from "../components/common/Loader";
import NotificationAlert from "../components/common/NotificationAlert";

/**
 * GraphQL query to fetch loan and payment details
 */
const GET_LOAN_DETAILS = gql`
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
 * Interface for Payment data
 */
interface Payment {
  id: number;
  paymentDate: string;
}

/**
 * Interface for Loan data
 */
interface Loan {
  id: number;
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  loanPayments: Payment[];
}

/**
 * Interface for Payment Status
 */
interface PaymentStatus {
  status: string;
  variant: string;
}

/**
 * Component for displaying loan details and payment history
 *
 * @returns {JSX.Element} The LoanDetails component
 */
const LoanDetails: React.FC = (): JSX.Element => {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();

  // Fetch loan details using GraphQL
  const { loading, error, data, refetch } = useQuery<{ loan: Loan }>(
    GET_LOAN_DETAILS,
    {
      variables: { loanId: Number(loanId) },
    }
  );

  // Initialize loan state with default values
  const [loan, setLoan] = useState<Loan>({
    id: 0,
    name: "",
    interestRate: 0,
    principal: 0,
    dueDate: "",
    loanPayments: [],
  });

  // Update loan state when data is fetched
  useEffect(() => {
    if (data?.loan) {
      setLoan(data.loan);
    }
  }, [data]);

  // Refetch data when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  /**
   * Calculates payment status based on payment date and due date
   * @param {string} paymentDate - The payment date
   * @param {string} dueDate - The loan due date
   * @returns {PaymentStatus} The payment status and badge variant
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

  if (loading) return <Loader loading={true} />;
  if (error) return <NotificationAlert message={error.message} type="danger" />;
  if (!loan?.id) return <div>Loan not found</div>;

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

      <CustomButton
        type="dark"
        onClick={() => navigate(`/new-payment/${loanId}`)}
        label="Add Payment"
      />
    </Container>
  );
};

export default LoanDetails;
