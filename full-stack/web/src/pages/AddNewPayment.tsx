import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import CustomButton from "../components/common/CustomButton";

const AddNewPayment = () => {
  return (
    <Container className="mt-4">
      <h3>New Payment</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Payment Loan Id:</Form.Label>
          <Form.Control type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
          <Form.Text className="text-muted">Provide a valid loan id.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Payment Amount:</Form.Label>
          <Form.Control type="number" placeholder="0.00" />
          <Form.Text className="text-muted">
            Provide a valid loan payment ammount.
          </Form.Text>
        </Form.Group>

        <CustomButton type="dark" onClick={() => {}} label="Make Payment" />
      </Form>
    </Container>
  );
};

export default AddNewPayment;
