import React from "react";
import { Routes, Route } from "react-router-dom";

// Import page components
import LoanList from "../pages/LoanList";
import LoanDetails from "../pages/LoanDetails";
import AddNewPayment from "../pages/AddNewPayment";
import LoanCalculator from "../pages/LoanCalculator";
import AddNewLoan from "../pages/AddNewLoan";
import PageNotFound from "../pages/PageNotFound";

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
      <Route path="/" element={<LoanList />} />
      <Route path="/loan/:loanId" element={<LoanDetails />} />
      <Route path="/new-payment/:loanId" element={<AddNewPayment />} />
      <Route path="/loan-calculator" element={<LoanCalculator />} />
      <Route path="/new-loan" element={<AddNewLoan />} />
      {/* Catch-all route for 404 errors. This will be displayed when no other routes match */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
