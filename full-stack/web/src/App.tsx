import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";

import AppNavbar from "./components/features/AppNavbar";
import AppRoutes from "./routes/AppRoutes";

/**
 * Main App Component
 *
 * Serves as the main entry point for the application, rendering the
 * Navbar, the main Routes, and a container for layout.
 *
 * @returns {JSX.Element} The main App component wrapped in Router and Container.
 */
const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <AppNavbar />
      <Container className="mt-5 pt-4">
        <AppRoutes />
      </Container>
    </Router>
  );
};

export default App;
