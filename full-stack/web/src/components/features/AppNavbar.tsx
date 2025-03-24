import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

/**
 * AppNavbar Component
 *
 * Renders the navigation bar for the application, with links to
 * the main sections such as Loan List, New Loan, and Loan Calculator.
 * The navbar is fixed to the top of the page.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
const AppNavbar: React.FC = (): JSX.Element => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        {/* Navbar Brand */}
        <Navbar.Brand as={Link} to="/">
          Loan Management System
        </Navbar.Brand>

        {/* Toggle button for responsive navbar */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Collapse for navigation links */}
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {/* Navigation Links */}
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
  );
};

export default AppNavbar;
