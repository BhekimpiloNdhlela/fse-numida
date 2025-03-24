import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import NotificationAlert from "../components/common/NotificationAlert";
import LoanList from "../components/loans/LoanList";
import { GET_LOANS } from "../utuils/graphql-queries";

import { LoansQueryResponse } from "../utuils/interfaces";

/**
 * Page component for displaying the loan list.
 * Handles data fetching and state management for loan information.
 *
 * @returns {JSX.Element} The rendered Loan List page component.
 */
const LoanListPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState<boolean>(true);

  // Fetch data using GraphQL query
  const { loading, error, data, refetch } = useQuery<LoansQueryResponse>(
    GET_LOANS,
    { fetchPolicy: "network-only" }
  );

  // Show loader for 2 seconds minimum before displaying the content
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Refetch data when component mounts or query changes
  useEffect(() => {
    refetch();
  }, [refetch]);

  // If loading or showLoader is true, display the loader
  if (showLoader || loading) return <Loader loading={true} />;

  // If an error occurs during the query, display an error notification
  if (error) return <NotificationAlert message={error.message} type="danger" />;

  /**
   * Handles the row click event.
   * Navigates to the specific loan details page based on loanId.
   *
   * @param {string} loanId - The ID of the loan to navigate to.
   */
  const handleRowClick = (loanId: string): void => {
    navigate(`/loan/${loanId}`);
  };

  return <LoanList loans={data?.loans || []} onRowClick={handleRowClick} />;
};

export default LoanListPage;
