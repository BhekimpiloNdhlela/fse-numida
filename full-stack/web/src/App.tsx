import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import LoanList from "./pages/LoanList";
import LoanDetails from "./pages/LoanDetails";
import AddNewPayment from "./pages/AddNewPayment";
import LoanCalculator from "./pages/LoanCalculator";
import AddNewLoan from "./pages/AddNewLoan";
import PageNotFound from "./pages/PageNotFound"; // Import the new component

const App = () => {
  return (
    <Router>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Loan Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {/* Nav links aligned to the left */}
            <Nav>
              <Nav.Link as={Link} to="/">
                Loan List
              </Nav.Link>
              <Nav.Link as={Link} to="/new-loan">
                New Loan
              </Nav.Link>
              <Nav.Link as={Link} to="/loan-calculator">
                Loan Calculator
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5 pt-4">
        <Routes>
          <Route path="/" element={<LoanList />} />
          <Route path="/loan/:loanId" element={<LoanDetails />} />
          <Route path="/new-payment/:loanId" element={<AddNewPayment />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/new-loan" element={<AddNewLoan />} />
          {/* Catch-all route for 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;