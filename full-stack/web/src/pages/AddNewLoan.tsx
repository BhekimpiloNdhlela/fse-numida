import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/common/CustomButton";
import NotificationAlert from "../components/common/NotificationAlert";

/**
 * Interface for the new loan data structure
 */
interface NewLoanData {
  name: string;
  principal: number;
  interest_rate: number;
  due_date: string;
}

/**
 * Component for adding a new loan
 *
 * @returns {JSX.Element} The AddNewLoan component
 */
const AddNewLoan: React.FC = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * Handles form submission for adding a new loan
   */
  const handleAddNewLoan = async (): Promise<void> => {
    // Validate inputs
    if (
      !name.trim() ||
      principal <= 0 ||
      rate <= 0 ||
      months <= 0 ||
      !dueDate
    ) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    const newLoan: NewLoanData = {
      name: name.trim(),
      principal,
      interest_rate: rate,
      due_date: dueDate,
    };

    try {
      const response = await fetch("http://localhost:2024/add-loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLoan),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add loan");
      }

      setSuccess(true);
      setError(null);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setSuccess(false);
    }
  };

  /**
   * Handles numeric input changes with validation
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   * @param {React.Dispatch<React.SetStateAction<number>>} setter - The state setter function
   */
  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ): void => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) ? 0 : value);
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
          <Form.Text className="text-muted">
            Provide a valid loan name.
          </Form.Text>
        </Form.Group>

        {/* Principal Amount */}
        <Form.Group className="mb-3" controlId="principal">
          <Form.Label>Principal Amount ($)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter principal amount"
            value={principal || ""}
            onChange={(e) => handleNumericChange(e, setPrincipal)}
            min="0"
            step="0.01"
            required
          />
          <Form.Text className="text-muted">
            Provide a valid loan principal amount.
          </Form.Text>
        </Form.Group>

        {/* Annual Interest Rate */}
        <Form.Group className="mb-3" controlId="rate">
          <Form.Label>Annual Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter annual interest rate"
            value={rate || ""}
            onChange={(e) => handleNumericChange(e, setRate)}
            min="0"
            step="0.01"
            required
          />
          <Form.Text className="text-muted">
            Provide a valid loan interest rate.
          </Form.Text>
        </Form.Group>

        {/* Loan Term (Months) */}
        <Form.Group className="mb-3" controlId="months">
          <Form.Label>Loan Term (Months)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan term in months"
            value={months || ""}
            onChange={(e) => handleNumericChange(e, setMonths)}
            min="0"
            step="1"
            required
          />
          <Form.Text className="text-muted">
            Provide a valid loan term.
          </Form.Text>
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
          <Form.Text className="text-muted">
            Provide a valid loan due date.
          </Form.Text>
        </Form.Group>

        {/* Error and Success Messages */}
        {error && <NotificationAlert type="danger" message={error} />}
        {success && (
          <NotificationAlert
            type="success"
            message="Loan added successfully!"
          />
        )}

        <CustomButton label="Add Loan" type="dark" onClick={handleAddNewLoan} />
      </Form>
    </Container>
  );
};

export default AddNewLoan;
