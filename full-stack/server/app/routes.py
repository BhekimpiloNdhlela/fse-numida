from flask import Blueprint, request, jsonify
from flask_graphql import GraphQLView
from datetime import datetime  # Import datetime module

from .schema import schema
from .data import loans, loan_payments

# Define the Blueprints
graphql_bp = Blueprint("graphql", __name__)
rest_bp = Blueprint("rest", __name__)

# GraphQL route
graphql_bp.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)

# REST routes
@rest_bp.route("/add-loan", methods=["POST"])
def add_loan():
    data = request.get_json()

    # Validate the input data
    if not data or "name" not in data or "principal" not in data or "interest_rate" not in data or "due_date" not in data:
        return jsonify({"error": "Invalid input data"}), 400

    try:
        # Convert the due_date string to a datetime.date object
        due_date = datetime.strptime(data["due_date"], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    # Generate a new loan ID
    new_loan_id = max(loan["id"] for loan in loans) + 1 if loans else 1

    # Add the new loan to the list
    new_loan = {
        "id": new_loan_id,
        "name": data["name"],
        "principal": data["principal"],
        "interest_rate": data["interest_rate"],
        "due_date": due_date,  # Use the datetime.date object
        "loan_payments": []
    }
    loans.append(new_loan)

    return jsonify(new_loan), 201

@rest_bp.route("/loans/<int:loan_id>/payments", methods=["POST"])
def add_payment_to_loan(loan_id):
    print("hello bhjeki loan_id", loan_id)
    data = request.get_json()
    print(data)

    # Validate the input data
    if not data or "payment_date" not in data or "amount" not in data:
        return jsonify({"error": "Invalid input data. 'payment_date' and 'amount' are required."}), 400

    try:
        # Convert the payment_date string to a datetime.date object
        payment_date = datetime.strptime(data["payment_date"], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    # Find the loan by loan_id
    loan = next((loan for loan in loans if loan["id"] == loan_id), None)
    if not loan:
        return jsonify({"error": "Loan not found"}), 404

    # Ensure the loan has a 'loan_payments' key
    if "loan_payments" not in loan:
        loan["loan_payments"] = []

    # Generate a new payment ID
    new_payment_id = max(payment["id"] for payment in loan_payments) + 1 if loan_payments else 1

    # Create the new payment
    new_payment = {
        "id": new_payment_id,
        "loan_id": loan_id,
        "payment_date": payment_date,
        "amount": data["amount"]
    }

    print(new_payment)

    # Add the payment to the loan_payments list
    loan_payments.append(new_payment)

    # Add the payment to the loan's loan_payments list
    loan["loan_payments"].append(new_payment)

    return jsonify(new_payment), 201