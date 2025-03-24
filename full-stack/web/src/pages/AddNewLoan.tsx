import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/common/CustomButton";
import NotificationAlert from "../components/common/NotificationAlert";

const AddNewLoan = () => {
  const [name, setName] = useState<string>("");
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>(""); // New state for due date
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleAddNewLoan = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name || principal <= 0 || rate <= 0 || months <= 0 || !dueDate) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    // Create new loan object
    const newLoan = {
      name,
      principal,
      interest_rate: rate,
      due_date: dueDate, // Use the selected due date
    };

    console.log(dueDate);
    

    try {
      // Make a POST request to the backend
      const response = await fetch("http://localhost:2024/add-loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLoan),
      });

      if (!response.ok) {
        throw new Error("Failed to add loan.");
      }

      // Handle success
      setSuccess(true);
      setError(null);
      setTimeout(() => navigate("/"), 2000); // Redirect to the loan list page after 2 seconds
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Create New Loan</h3>
      <Form>
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

        {/* Loan Due Date */}
        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label>Loan Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <CustomButton label="Add Loan" type="dark" onClick={handleAddNewLoan} />

        {/* Error Message */}
        {error && <NotificationAlert type="danger" message={error} />}

        {/* Success Message */}
        {success && (
          <NotificationAlert
            type="success"
            message="Loan added successfully!"
          />
        )}
      </Form>
    </Container>
  );
};

export default AddNewLoan;