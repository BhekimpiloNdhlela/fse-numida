import React from "react";
import { Table, Badge, Container } from "react-bootstrap";
import { LoanListProps } from "../../utuils/interfaces";

/**
 * Presentational component for displaying a list of active loans.
 * Receives data and callbacks as props.
 *
 * @param {LoanListProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered loan list table.
 */
const LoanList: React.FC<LoanListProps> = ({
  loans,
  onRowClick,
}: LoanListProps): JSX.Element => {
  /**
   * Formats a date string to the locale-specific format.
   *
   * @param {string} dateString - The date string to be formatted.
   * @returns {string} The formatted date string.
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

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
              onClick={() => onRowClick(loan.id)}
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
