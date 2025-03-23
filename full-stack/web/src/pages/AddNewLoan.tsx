import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddNewLoan = () => {
  const [name, setName] = useState<string>("");
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name || principal <= 0 || rate <= 0 || months <= 0) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    // Create new loan object
    const newLoan = {
      id: Date.now(), // Generate a unique ID (for demo purposes)
      name,
      principal,
      interest_rate: rate,
      due_date: calculateDueDate(months),
    };

    // Save the new loan (for now, log it to the console)
    console.log("New Loan Created:", newLoan);

    // Redirect to the loan list page
    navigate("/");
  };

  // Helper function to calculate the due date
  const calculateDueDate = (months: number): string => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + months);
    return currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return (
    <Container className="mt-5">
      <h2>Create New Loan</h2>
      <Form onSubmit={handleSubmit}>
        {/* Loan Name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Loan Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter loan name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Principal Amount */}
        <Form.Group className="mb-3" controlId="principal">
          <Form.Label>Principal Amount ($)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter principal amount"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value))}
            min="0"
            required
          />
        </Form.Group>

        {/* Annual Interest Rate */}
        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Annual Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter annual interest rate"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            min="0"
            required
          />
        </Form.Group>

        {/* Loan Term (Months) */}
        <Form.Group className="mb-3" controlId="months">
          <Form.Label>Loan Term (Months)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan term in months"
            value={months}
            onChange={(e) => setMonths(parseFloat(e.target.value))}
            min="0"
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Create Loan
        </Button>

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default AddNewLoan;