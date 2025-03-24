import logging
import graphene
from .data import loans, loan_payments

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


class LoanPaymentType(graphene.ObjectType):
    """
    GraphQL ObjectType representing a loan payment.

    Attributes:
        id (int): Unique identifier of the loan payment.
        loan_id (int): Identifier of the associated loan.
        payment_date (date): Date when the payment was made.
        amount_paid (float): Amount paid for the loan.
    """
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.Date()
    amount_paid = graphene.Float()


class LoanType(graphene.ObjectType):
    """
    GraphQL ObjectType representing a loan.

    Attributes:
        id (int): Unique identifier of the loan.
        name (str): Name of the loan.
        interest_rate (float): Interest rate of the loan.
        principal (float): Principal amount of the loan.
        due_date (date): Due date for the loan payment.
        loan_payments (list[LoanPaymentType]): List of payments made for the loan.
    """
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Float()
    due_date = graphene.Date()
    loan_payments = graphene.List(LoanPaymentType)

    def resolve_loan_payments(self, info):
        """
        Resolver function to fetch loan payments for a given loan.

        Args:
            info (ResolveInfo): GraphQL execution context.

        Returns:
            list[LoanPaymentType]: List of payments related to the loan.
        """
        try:
            logging.info("[INFO]: fetching loan payments for loan ID: %d", self["id"])
            
            payments = [payment for payment in loan_payments if payment["loan_id"] == self["id"]]

            if payments:
                logging.info("[INFO]: found %d payments for loan ID: %d", len(payments), self["id"])
            else:
                logging.warning("[WARNING]: no payments found for loan ID: %d", self["id"])

            return payments
        except Exception as e:
            logging.error("[ERROR]: error fetching loan payments for loan ID %d: %s", self["id"], str(e))
            return []


class Query(graphene.ObjectType):
    """
    GraphQL Query ObjectType for fetching loans and loan details.

    Attributes:
        loans (list[LoanType]): Fetches all available loans.
        loan (LoanType): Fetches a specific loan by its ID.
    """
    loans = graphene.List(LoanType)
    loan = graphene.Field(LoanType, id=graphene.Int())

    def resolve_loans(self, info):
        """
        Resolver function to fetch all loans.

        Args:
            info (ResolveInfo): GraphQL execution context.

        Returns:
            list[LoanType]: List of all loans.
        """
        try:
            logging.info("[INFO]: fetching all loans. Total loans available: %d", len(loans))
            return loans
        except Exception as e:
            logging.error("[ERROR]: error fetching loans: %s", str(e))
            return []  # Return an empty list in case of an error

    def resolve_loan(self, info, id):
        """
        Resolver function to fetch a specific loan by ID.

        Args:
            info (ResolveInfo): GraphQL execution context.
            id (int): The ID of the loan to retrieve.

        Returns:
            LoanType or None: The loan object if found, otherwise None.
        """
        try:
            logging.info("[INFO]: fetching loan with ID: %d", id)

            loan = next((loan for loan in loans if loan["id"] == id), None)
            
            if loan:
                logging.info("[INFO]: loan found: %s", loan)
            else:
                logging.warning("[WARNING]: Loan with ID %d not found", id)

            return loan
        except Exception as e:
            logging.error("[ERROR]: error fetching loan with ID %d: %s", id, str(e))
            return None


# define the GraphQL schema
schema = graphene.Schema(query=Query)
