from flask import Flask
from flask_cors import CORS
from .routes import graphql_bp  # Import the Blueprint

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register the GraphQL Blueprint
    app.register_blueprint(graphql_bp)

    @app.route("/")
    def home():
        return "Welcome to the Loan Application API"

    return app
