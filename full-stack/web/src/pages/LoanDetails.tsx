import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Badge, Container, Card, Alert } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";
import CustomButton from "../components/common/CustomButton";
import Loader from "../components/common/Loader";
import NotificationAlert from "../components/common/NotificationAlert";

// Define the GraphQL query to fetch loan and payment details
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

interface Loan {
  id: number;
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  loanPayments: {
    id: number;
    paymentDate: string;
  }[];
}

const LoanDetails: React.FC = () => {
  const { loanId } = useParams<{ loanId: string }>(); // Get the loan ID from the URL
  const navigate = useNavigate(); // Hook for programmatic navigation

  console.log("loanId", loanId);

  // Fetch loan details using GraphQL
  const { loading, error, data, refetch } = useQuery(GET_LOAN_DETAILS, {
    variables: { loanId: Number(loanId) },
  });

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
    if (data && data.loan) {
      setLoan(data.loan);
    }
  }, [data]);

    useEffect(() => {
      refetch();
    }, [refetch]);

  console.log("data", data);

  if (loading) return <Loader loading={true} />;
  if (error) return <NotificationAlert message={error.message} type="danger" />;

  // Check if loan data is available
  if (!loan || !loan.id) {
    return <div>Loan not found</div>;
  }

  const payments = loan.loanPayments || [];

  // Helper function to calculate payment status
  const getPaymentStatus = (paymentDate: string, dueDate: string) => {
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

  return (
    <Container className="mt-4">
      <h3>Loan Details</h3>
      <div className="loan-info mb-4">
        <h5>{loan.name}</h5>
        <p>
          <strong>Interest Rate:</strong> {loan.interestRate}%
        </p>
        <p>
          <strong>Principal:</strong> ${loan.principal}
        </p>
        <p>
          <strong>Due Date:</strong> {loan.dueDate}
        </p>
      </div>

      <h2>Payment History</h2>
      {payments.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Load ID</th>
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
                  <td>{payment.paymentDate}</td>
                  <td>
                    <Badge bg={variant}>{status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        // No Payments Placeholder
        <Card className="text-center">
          <Card.Body>
            <Alert variant="info" className="mb-0">
              <h4>No Payments Recorded</h4>
              <p>There are no payment details to display for this loan.</p>
            </Alert>
          </Card.Body>
        </Card>
      )}

      {/* Add Payment Button Below the Table */}
      <CustomButton
        type="dark"
        onClick={() => navigate(`/new-payment/${loanId}`)}
        label="Add Payment"
      />
    </Container>
  );
};

export default LoanDetails;
