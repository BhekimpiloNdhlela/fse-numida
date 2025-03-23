import graphene
from .data import loans, loan_payments

class LoanPaymentType(graphene.ObjectType):
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.Date()
    amount_paid = graphene.Float()

class LoanType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Float()
    due_date = graphene.Date()
    loan_payments = graphene.List(LoanPaymentType)

    def resolve_loan_payments(self, info):
        return [payment for payment in loan_payments if payment["loan_id"] == self["id"]]

class Query(graphene.ObjectType):
    loans = graphene.List(LoanType)
    loan = graphene.Field(LoanType, id=graphene.Int())

    def resolve_loans(self, info):
        return loans

    def resolve_loan(self, info, id):
        return next((loan for loan in loans if loan["id"] == id), None)

schema = graphene.Schema(query=Query)