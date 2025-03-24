import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Badge, Container } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";

import Loader from "../components/common/Loader";
import NotificationAlert from "../components/common/NotificationAlert";

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

interface Loan {
  id: number;
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  loanPayments: { id: number; paymentDate: string }[];
}

const LoanList: React.FC = () => {
  const navigate = useNavigate();

  // Fetch data using GraphQL with "network-only" fetch policy
  const { loading, error, data, refetch } = useQuery(GET_LOANS, {
    fetchPolicy: "network-only", // Always fetch fresh data
  });

  // Initialize state for loans
  const [loans, setLoans] = useState<Loan[]>([]);

  console.log("loans data", data);

  // Update loans state when data is fetched
  useEffect(() => {
    if (data && data.loans) {
      setLoans(data.loans);
    }
  }, [data]);

  // Refetch data when the component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Loader loading={true} />;
  if (error) return <NotificationAlert message={error.message} type="danger" />;

  // Handle row click
  const handleRowClick = (loanId: number) => {
    navigate(`/loan/${loanId}`); // Navigate to the loan details page
  };

  return (
    <Container className="mt-4">
      <h3>List of Active Loans</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Interest Rate (%)</th>
            <th>Principal ($)</th>
            <th>Due Date</th>
            <th>Last Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              onClick={() => handleRowClick(loan.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{loan.id}</td>
              <td>{loan.name}</td>
              <td>{loan.interestRate}</td>
              <td>${loan.principal}</td>
              <td>{loan.dueDate}</td>
              <td>
                {loan.loanPayments && loan.loanPayments.length > 0 ? (
                  <Badge bg="dark" className="me-1">
                    {
                      loan.loanPayments[loan.loanPayments.length - 1]
                        .paymentDate
                    }
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
