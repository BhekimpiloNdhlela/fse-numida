from flask import Flask
from flask_cors import CORS
from .routes import graphql_bp, rest_bp  # Import the REST Blueprint


def create_app():
    app = Flask(__name__)
    CORS(app)

    # register the GraphQL Blueprint
    app.register_blueprint(graphql_bp)

    # register the REST Blueprint
    app.register_blueprint(rest_bp)

    return app
