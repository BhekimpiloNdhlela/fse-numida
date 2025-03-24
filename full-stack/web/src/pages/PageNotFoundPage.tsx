import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

/**
 * 404 Page Not Found component.
 * 
 * Displays a user-friendly error message when a route doesn't exist,
 * with a button to navigate back to the home page.
 * 
 
 * @returns {JSX.Element} The rendered 404 page component
 */
const PageNotFoundPage: React.FC = (): JSX.Element => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        marginTop: "0",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p className="mb-3">The page you are looking for does not exist.</p>
      <Button as={Link} to="/" variant="dark">
        Go to Home Page
      </Button>
    </Container>
  );
};

export default PageNotFoundPage;
