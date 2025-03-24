from flask import Flask
from flask_cors import CORS

# import the REST and the GraphQL Blueprint
from .routes import graphql_bp, rest_bp  

def create_app():
    """
    Create and configure the Flask application.

    This function initializes a Flask application, enables Cross-Origin Resource Sharing (CORS),
    and registers both the GraphQL and REST API blueprints.

    Returns:
        Flask: The configured Flask application instance.
    """
    app = Flask(__name__)
    CORS(app)

    # register the GraphQL Blueprint
    app.register_blueprint(graphql_bp)

    # register the REST Blueprint
    app.register_blueprint(rest_bp)

    return app
