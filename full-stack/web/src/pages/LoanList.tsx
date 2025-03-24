import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Badge, Container } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/common/Loader";
import NotificationAlert from "../components/common/NotificationAlert";

/**
 * GraphQL query to fetch loans data
 */
const GET_LOANS = gql`
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
 * Interface for the GraphQL query response
 */
interface LoansQueryResponse {
  loans: Loan[];
}

/**
 * Component for displaying a list of active loans
 *
 * @returns {JSX.Element} The LoanList component
 */
const LoanList: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  // Fetch data using GraphQL with "network-only" fetch policy
  const { loading, error, data, refetch } = useQuery<LoansQueryResponse>(
    GET_LOANS,
    {
      fetchPolicy: "network-only",
    }
  );

  // Initialize state for loans
  const [loans, setLoans] = useState<Loan[]>([]);

  // Update loans state when data is fetched
  useEffect(() => {
    if (data?.loans) {
      setLoans(data.loans);
    }
  }, [data]);

  // Refetch data when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  /**
   * Handles navigation to loan details page
   * @param {number} loanId - The ID of the loan to view
   */
  const handleRowClick = (loanId: number) => {
    navigate(`/loan/${loanId}`);
  };

  /**
   * Formats date string to locale format
   * @param {string} dateString - The date string to format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <Loader loading={true} />;
  if (error) return <NotificationAlert message={error.message} type="danger" />;

  return (
    <Container className="mt-4">
      <h3>List of Active Loans</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Interest Rate</th>
            <th>Principal</th>
            <th>Due Date</th>
            <th>Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              onClick={() => handleRowClick(loan.id)}
              style={{ cursor: "pointer" }}
              className="align-middle"
            >
              <td>{loan.id}</td>
              <td>{loan.name}</td>
              <td>{loan.interestRate}%</td>
              <td>${loan.principal.toLocaleString()}</td>
              <td>{formatDate(loan.dueDate)}</td>
              <td>
                {loan.loanPayments?.length > 0 ? (
                  <Badge bg="dark">
                    {formatDate(
                      loan.loanPayments[loan.loanPayments.length - 1]
                        .paymentDate
                    )}
                  </Badge>
                ) : (
                  <Badge bg="secondary">No Payments</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LoanList;
