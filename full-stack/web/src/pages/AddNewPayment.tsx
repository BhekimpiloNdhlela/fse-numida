import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import CustomButton from "../components/common/CustomButton";
import NotificationAlert from "../components/common/NotificationAlert";

const AddNewPayment = () => {
  const { loanId: paramsLoanID } = useParams(); // Get the loan ID from the URL
  const navigate = useNavigate();

  const [loanId, setLoanId] = useState<string>(paramsLoanID || "");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (paramsLoanID) {
      setLoanId(paramsLoanID);
    }
  }, [paramsLoanID]);

  const handleMakeLoanPayment = async () => {
    if (!loanId || paymentAmount <= 0 || !paymentDate) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:2024/loans/${loanId}/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_date: paymentDate,
            amount: paymentAmount,
          }),
        }
      );

      if (response.ok) {
        setSuccess("Payment added successfully!");
        setError(null);
        // Optionally, navigate to another page or reset the form
        navigate(`/loan/${loanId}`);

      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add payment. Please try again.");
        setSuccess(null);
      }
    } catch (err) {
      setError("Failed to add payment. Please try again.");
      setSuccess(null);
    }
  };

  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    setPaymentAmount(isNaN(value) ? 0 : value);
  };

  const handlePaymentDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDate(e.target.value);
  };

  return (
    <Container className="mt-4">
      <h3>New Payment</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Payment Loan ID:</Form.Label>
          <Form.Control type="text" value={loanId} disabled={true} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Payment Date:</Form.Label>
          <Form.Control
            type="date"
            value={paymentDate}
            onChange={handlePaymentDateChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Payment Amount:</Form.Label>
          <Form.Control
            type="number"
            placeholder="0.00"
            value={paymentAmount}
            onChange={handlePaymentAmountChange}
          />
          <Form.Text className="text-muted">
            Provide a valid loan payment amount.
          </Form.Text>
        </Form.Group>
        {error && <NotificationAlert message={error} type="danger" />}
        {success && <NotificationAlert message={success} type="success" />}
        <CustomButton
          type="dark"
          onClick={handleMakeLoanPayment}
          label="Make Payment"
        />
      </Form>
    </Container>
  );
};

export default AddNewPayment;
