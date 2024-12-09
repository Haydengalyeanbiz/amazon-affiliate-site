import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SESSION_TYPE = 'filesystem'  # You can use Redis or other types for production
    SQLALCHEMY_DATABASE_URI = 'sqlite:///affiliate_website.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'