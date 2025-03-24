from app import create_app

# create a Flask application instance
app = create_app()

if __name__ == "__main__":
    """
    Entry point for running the Flask application.

    This script initializes the Flask app and runs it on the specified host and port.
    The debug mode is enabled for development purposes.

    Host: 0.0.0.0 (Allows access from any IP address)
    Debug: True (Enables auto-reloading and detailed error messages)
    """
    app.run(host="0.0.0.0", debug=True)
