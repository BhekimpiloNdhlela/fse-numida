import React from "react";
import { Routes, Route } from "react-router-dom";

// Import page components
import LoanListPage from "../pages/LoanListPage";
import LoanDetailsPage from "../pages/LoanDetailsPage";
import LoanCalculatorPage from "../pages/LoanCalculatorPage";
import NewPaymentPage from "../pages/NewPaymentPage";
import PageNotFoundPage from "../pages/PageNotFoundPage";
import NewLoanPage from "../pages/NewLoanPage";

/**
 * AppRoutes Component
 *
 * Defines all the routes for the application using React Router.
 * This component serves as the central routing configuration for the app.
 *
 * @returns {JSX.Element} The Routes component with all defined routes
 */
const AppRoutes: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<LoanListPage />} />
      <Route path="/loan/:loanId" element={<LoanDetailsPage />} />
      <Route path="/new-payment/:loanId" element={<NewPaymentPage />} />
      <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
      <Route path="/new-loan" element={<NewLoanPage />} />
      {/* Catch-all route for 404 errors. This will be displayed when no other routes match */}
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
