import logging
from flask import Blueprint, request, jsonify
from flask_graphql import GraphQLView
from datetime import datetime

from .schema import schema
from .data import loans, loan_payments

"""
Module defining Flask Blueprints for GraphQL and REST API endpoints.

This module includes GraphQL and RESTful routes for managing loan and loan payment data.
"""

# configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# define the Blueprints
graphql_bp = Blueprint("graphql", __name__)
rest_bp = Blueprint("rest", __name__)

# graphQL route
graphql_bp.add_url_rule("/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True))


@rest_bp.route("/add-loan", methods=["POST"])
def add_loan():
    """
    REST endpoint to add a new loan.

    Expects a JSON payload with the following keys:
        - name (str): Name of the loan.
        - principal (float): The principal amount of the loan.
        - interest_rate (float): The interest rate for the loan.
        - due_date (str): The due date of the loan in YYYY-MM-DD format.

    Returns:
        - 201 Created: The newly created loan as a JSON response.
        - 400 Bad Request: If the input data is invalid.
    """
    data = request.get_json()
    logging.info("Received loan creation request: %s", data)

    # validate the input data
    if not data or "name" not in data or "principal" not in data or "interest_rate" not in data or "due_date" not in data:
        logging.warning("Invalid input data for loan creation: %s", data)
        return jsonify({"error": "Invalid input data"}), 400

    try:
        # convert the due_date string to a datetime.date object
        due_date = datetime.strptime(data["due_date"], "%Y-%m-%d").date()
    except ValueError:
        logging.error("Invalid date format: %s", data["due_date"])
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    # generate a new loan ID
    new_loan_id = max(loan["id"] for loan in loans) + 1 if loans else 1

    # add the new loan to the list
    new_loan = {
        "id": new_loan_id,
        "name": data["name"],
        "principal": data["principal"],
        "interest_rate": data["interest_rate"],
        "due_date": due_date,
        "loan_payments": []
    }
    loans.append(new_loan)

    logging.info("Loan created successfully: %s", new_loan)
    return jsonify(new_loan), 201


@rest_bp.route("/loans/<int:loan_id>/payments", methods=["POST"])
def add_payment_to_loan(loan_id):
    """
    REST endpoint to add a payment to a specific loan.

    URL Parameters:
        - loan_id (int): The ID of the loan to which the payment is being added.

    Expects a JSON payload with the following keys:
        - payment_date (str): The date of the payment in YYYY-MM-DD format.
        - amount (float): The amount paid.

    Returns:
        - 201 Created: The newly created payment record as a JSON response.
        - 400 Bad Request: If the input data is invalid.
        - 404 Not Found: If the specified loan is not found.
    """
    data = request.get_json()
    logging.info("Received payment request for loan %d: %s", loan_id, data)

    # validate the input data
    if not data or "payment_date" not in data or "amount" not in data:
        logging.warning("Invalid input data for payment: %s", data)
        return jsonify({"error": "Invalid input data. 'payment_date' and 'amount' are required."}), 400

    try:
        # convert the payment_date string to a datetime.date object
        payment_date = datetime.strptime(data["payment_date"], "%Y-%m-%d").date()
    except ValueError:
        logging.error("Invalid date format for payment: %s", data["payment_date"])
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    # find the loan by loan_id
    loan = next((loan for loan in loans if loan["id"] == loan_id), None)
    if not loan:
        logging.error("Loan with ID %d not found", loan_id)
        return jsonify({"error": "Loan not found"}), 404

    # ensure the loan has a 'loan_payments' key
    if "loan_payments" not in loan:
        loan["loan_payments"] = []

    # generate a new payment ID
    new_payment_id = max(payment["id"] for payment in loan_payments) + 1 if loan_payments else 1

    # create the new payment
    new_payment = {
        "id": new_payment_id,
        "loan_id": loan_id,
        "payment_date": payment_date,
        "amount": data["amount"]
    }

    # add the payment to the loan_payments list
    loan_payments.append(new_payment)

    # add the payment to the loan's loan_payments list
    loan["loan_payments"].append(new_payment)

    logging.info("Payment added successfully: %s", new_payment)
    return jsonify(new_payment), 201
