import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loader from "../components/common/Loader";
import NotificationAlert from "../components/common/NotificationAlert";
import LoanDetails from "../components/loans/LoanDetails";
import { GET_LOAN_DETAILS } from "../utuils/graphql-queries";
import { Loan } from "../utuils/interfaces";

/**
 * Page component for displaying loan details.
 * Fetches and manages loan information and handles state changes.
 *
 * @returns {JSX.Element} The rendered Loan Details page component.
 */
const LoanDetailsPage: React.FC = (): JSX.Element => {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();

  const [loan, setLoan] = useState<Loan>({
    id: 0,
    name: "",
    interestRate: 0,
    principal: 0,
    dueDate: "",
    loanPayments: [],
  });

  // Fetch loan details using GraphQL query
  const { loading, error, data, refetch } = useQuery<{ loan: Loan }>(
    GET_LOAN_DETAILS,
    {
      variables: { loanId: Number(loanId) },
    }
  );

  // Update loan state when data is fetched
  useEffect(() => {
    if (data?.loan) {
      setLoan(data.loan);
    }
  }, [data]);

  // Refetch loan details when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  // If loading, show loader
  if (loading) return <Loader loading={true} />;

  // If error occurs during fetching, show notification alert
  if (error) return <NotificationAlert message={error.message} type="danger" />;

  // If loan not found, display loan not found message
  if (!loan?.id) return <div>Loan not found</div>;

  return (
    <LoanDetails
      loan={loan}
      onAddPayment={() => navigate(`/new-payment/${loanId}`)}
    />
  );
};

export default LoanDetailsPage;
