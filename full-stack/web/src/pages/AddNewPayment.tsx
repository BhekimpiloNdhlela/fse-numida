import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Container} from "react-bootstrap";

const AddNewPayment = () => {
  return (
    <Container className="mt-4">
      <Form>
        <h1>New Payment</h1>
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
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddNewPayment;
