from flask import Flask, jsonify, request, session
from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SubmitField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime
import requests
import os
from dotenv import load_dotenv
load_dotenv()
from paapi5_python_sdk.api.default_api import DefaultApi
from paapi5_python_sdk.models.get_items_request import GetItemsRequest
from paapi5_python_sdk.models.get_items_resource import GetItemsResource
from paapi5_python_sdk.models.partner_type import PartnerType
from paapi5_python_sdk.rest import ApiException


app = Flask(__name__)
CORS(app)
# ! AMAZON KEYS
ACCESS_KEY = os.getenv('AMAZON_ACCESS_KEY')
SECRET_KEY = os.getenv('AMAZON_SECRET_KEY')
PARTNER_TAG = os.getenv('AMAZON_ASSOCIATE_TAG')
REGION = 'us-east-1'
HOST = f"webservices.amazon.com"

# ! SQLITE KEYS
app.config['SECRET_KEY'] = 'tonto_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///affiliate_website.db'  # SQLite for local development
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Bind Flask-Migrate to the app and db

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)

    posts = db.relationship('Post', backref='author', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    price = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    link_url = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    price = StringField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    image_url = StringField('Image URL', validators=[DataRequired()])
    link_url = StringField('Link URL', validators=[DataRequired()])
    submit = SubmitField('Post')

#? --------------------------------------USER ROUTES-----------------------------------
#* -------------Log In---------------
@app.route('/login-for-tara', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    session['user_id'] = user.id
    return jsonify({'email': user.email, 'username': user.username}), 200

#* -------------Log Out-------------------
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  
    return jsonify({'message': 'Logged out successfully'}), 200

# ?-------------------------------AMAZON FETCH ROUTE---------------------------------
# *------------------------Fetch Product Details-------------------------------
@app.route('/fetch-product-details', methods=['POST'])
def fetch_product_details():
    asin = request.json.get('asin')
    if not asin:
        return jsonify({"error": "ASIN is required"}), 400

    try:
        # Initialize the API client without partner_tag
        api_instance = DefaultApi(
            access_key=ACCESS_KEY,
            secret_key=SECRET_KEY,
            host=HOST,
            region=REGION
        )

        # Define the resources you want in the response
        get_items_resources = [
            GetItemsResource.ITEMINFO_TITLE,
            GetItemsResource.OFFERS_LISTINGS_PRICE,
            GetItemsResource.IMAGES_PRIMARY_LARGE
        ]

        # Create the GetItemsRequest
        get_items_request = GetItemsRequest(
            partner_tag=PARTNER_TAG,
            partner_type=PartnerType.ASSOCIATES,
            marketplace='www.amazon.com',
            item_ids=[asin],
            resources=get_items_resources,
        )

        # Make the API call to fetch product details
        response = api_instance.get_items(get_items_request)

        # Process the response and return product info
        if response.items_result and response.items_result.items:
            item = response.items_result.items[0]

            title = item.item_info.title.display_value if item.item_info and item.item_info.title else "Title unavailable"
            price = (item.offers.listings[0].price.display_amount 
                     if item.offers and item.offers.listings and item.offers.listings[0].price 
                     else "Price unavailable")
            imageUrl = (item.images.primary.large.url 
                        if item.images and item.images.primary and item.images.primary.large 
                        else None)

            product_info = {
                'title': title,
                'price': price,
                'imageUrl': imageUrl
            }
            return jsonify(product_info), 200
        else:
            return jsonify({"error": "Product not found"}), 404

    except ApiException as e:
        print(f"API exception: {e}")
        return jsonify({"error": "Failed to fetch product details"}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "Something went wrong"}), 500

#?-----------------------------------POSTS/LINK ROUTES---------------------------------
#*--------------------------Get All Posts------------------------
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    result = []
    for post in posts:
        post_data = {
            'title': post.title,
            'price': post.price,
            'description': post.description,
            'image_url': post.image_url,
            'author': post.author.username  # Get the author's username
        }
        result.append(post_data)

    return jsonify(result), 200

#*------------------------Submit a Post----------------------------
@app.route('/submit-post', methods=['POST'])
def submit_post():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json

    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    required_fields = ['title', 'price', 'description', 'image_url', 'link_url']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400

    # Logic for handling the form submission
    new_post = Post(
        title=data['title'],
        price=data['price'],
        description=data['description'],
        image_url=data['image_url'],
        link_url=data['link_url'],
        user_id=user.id,
    )
    db.session.add(new_post)
    db.session.commit()


if __name__ == '__main__':
    app.run(debug=True)
