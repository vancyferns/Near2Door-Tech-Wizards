from flask import Flask
from flask_cors import CORS
from routes import bp as routes_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(routes_bp)

    return app