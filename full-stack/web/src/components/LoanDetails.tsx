import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Badge } from 'react-bootstrap';

// Dummy data
const loans: Loan[] = [
    { id: 1, name: "Tom's Loan", interest_rate: 5.0, principal: 10000, due_date: "2025-03-01" },
    { id: 2, name: "Chris Wailaka", interest_rate: 3.5, principal: 500000, due_date: "2025-03-01" },
    { id: 3, name: "NP Mobile Money", interest_rate: 4.5, principal: 30000, due_date: "2025-03-01" },
    { id: 4, name: "Esther's Autoparts", interest_rate: 1.5, principal: 40000, due_date: "2025-03-01" },
];

const loanPayments: LoanPayment[] = [
    { id: 1, loan_id: 1, payment_date: "2024-03-04" },
    { id: 2, loan_id: 2, payment_date: "2024-03-15" },
    { id: 3, loan_id: 3, payment_date: "2024-04-05" },
];

const LoanDetails: React.FC = () => {
    const { loanId } = useParams<{ loanId: string }>();
    const loan = loans.find((loan) => loan.id === Number(loanId));
    const payments = loanPayments.filter((payment) => payment.loan_id === Number(loanId));

    // Helper function to calculate payment status
    const getPaymentStatus = (paymentDate: string, dueDate: string) => {
        const payment = new Date(paymentDate);
        const due = new Date(dueDate);
        const diffTime = Math.abs(payment.getTime() - due.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 5) return { status: 'On Time', variant: 'success' };
        if (diffDays > 5 && diffDays <= 30) return { status: 'Late', variant: 'warning' };
        if (diffDays > 30) return { status: 'Defaulted', variant: 'danger' };
        return { status: 'Unpaid', variant: 'secondary' };
    };

    if (!loan) {
        return <div>Loan not found</div>;
    }

    return (
        <Card>
            <Card.Header as="h5">Loan Details</Card.Header>
            <Card.Body>
                <Card.Title>{loan.name}</Card.Title>
                <Card.Text>
                    <strong>Interest Rate:</strong> {loan.interest_rate}%<br />
                    <strong>Principal:</strong> ${loan.principal}<br />
                    <strong>Due Date:</strong> {loan.due_date}
                </Card.Text>

                <Card.Subtitle>Payment History</Card.Subtitle>
                <ListGroup>
                    {payments.map((payment) => {
                        const { status, variant } = getPaymentStatus(payment.payment_date, loan.due_date);
                        return (
                            <ListGroup.Item key={payment.id}>
                                Payment Date: {payment.payment_date}
                                <Badge bg={variant} className="ms-5">
                                    {status}
                                </Badge>
                            </ListGroup.Item>
                        );
                    })}
                    {payments.length === 0 && (
                        <ListGroup.Item>
                            No payments recorded.
                            <Badge bg="secondary" className="ms-2">
                                Unpaid
                            </Badge>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default LoanDetails;