from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["near2door_db"]

users_col = db["users"]
shops_col = db["shops"]
products_col = db["products"]
orders_col = db["orders"]
agents_col = db["agents"]
finances_col = db["finances"]
