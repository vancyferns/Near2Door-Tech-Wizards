from flask import Flask
from flask_cors import CORS
from routes import bp as routes_bp

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["https://jubilant-space-disco-r7qgx45qprcxq56-5173.app.github.dev"])
    app.register_blueprint(routes_bp)

    return app