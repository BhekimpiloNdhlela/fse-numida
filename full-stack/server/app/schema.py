import graphene
from .data import loans, loan_payments

class LoanType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Int()

class LoanPaymentType(graphene.ObjectType):
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.Date()

class LoanType1(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Int()
    loan_payments = graphene.List(LoanPaymentType)  # Add loan_payments field

    def resolve_loan_payments(self, info):
        # Fetch related loan payments for each loan
        return [payment for payment in loan_payments if payment["loan_id"] == self.id]

class Query(graphene.ObjectType):
    loans = graphene.List(LoanType)
    loan_payments = graphene.List(LoanPaymentType)

    def resolve_loans(self, info):
        return loans

    def resolve_loan_payments(self, info):
        return loan_payments

schema = graphene.Schema(query=Query)