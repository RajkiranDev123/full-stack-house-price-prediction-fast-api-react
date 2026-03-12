from pymongo import MongoClient

MONGO_URL = "mongodb+srv://raj:123@cluster0.1dkubok.mongodb.net/"

client = MongoClient(MONGO_URL)

db = client["pb1"]        # database name
user_collection = db["users"]  # collection