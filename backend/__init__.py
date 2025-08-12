# backend/__init__.py
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
import os

# Change this URI if you want to connect to Atlas or another host.
# For MongoDB Compass / local default:
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

client = MongoClient(MONGO_URI)
# DB name used by this project
db = client["near2door_db"]

# Collections used (will be created on first insert)
users_col = db["users"]
shops_col = db["shops"]
products_col = db["products"]
orders_col = db["orders"]
agents_col = db["agents"]
finances_col = db["finances"]
# ... add more collections as needed


def create_app():
    app = Flask(__name__)
    CORS(app)
    # Register routes blueprint (routes.py does blueprint registration)
    from routes import bp as routes_bp
    app.register_blueprint(routes_bp, url_prefix="/api")
    return app
