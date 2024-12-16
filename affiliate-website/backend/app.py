from flask import Flask, jsonify, request, session, make_response
from flask_session import Session
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect, generate_csrf
from wtforms import StringField, DecimalField, SubmitField
from wtforms.validators import DataRequired
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()
from paapi5_python_sdk.api.default_api import DefaultApi
from paapi5_python_sdk.models.get_items_request import GetItemsRequest
from paapi5_python_sdk.models.get_items_resource import GetItemsResource
from paapi5_python_sdk.models.partner_type import PartnerType
from paapi5_python_sdk.rest import ApiException

app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized_callback():
    return jsonify({'error': 'Unauthorized'}), 401

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# ! SQLITE KEYS
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True

app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_FILE_DIR'] = './.flask_session/'
app.config['SESSION_COOKIE_DOMAIN'] = 'localhost'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True if using HTTPS
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

db = SQLAlchemy(app)
Migrate(app, db)  
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:8080"}})
csrf = CSRFProtect(app)

Session(app)

# ! AMAZON KEYS
ACCESS_KEY = os.getenv('AMAZON_ACCESS_KEY')
SECRET_KEY = os.getenv('AMAZON_SECRET_KEY')
PARTNER_TAG = os.getenv('AMAZON_ASSOCIATE_TAG')
REGION = 'us-east-1'
HOST = f"webservices.amazon.com"



#? ------------------------ Models ------------------------------
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)

    posts = db.relationship('Post', backref='author', lazy=True)

    def to_dict(self):
        return {'id': self.id, 'username': self.username, 'email': self.email}

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
@csrf.exempt
def login():
    data = request.json
    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        login_user(user)  # Logs in user and sets the session cookie
        
        # Serialize user object to a dictionary
        user_data = {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
        
        response = make_response(jsonify({"message": "Login successful", "user": user_data}))
        response.set_cookie('csrf_token', generate_csrf(), httponly=False, samesite='Lax')
        return response

    print("Login failed: Invalid credentials")
    return jsonify({'error': 'Invalid credentials'}), 401


#* -------------Log Out-------------------
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  # Log out the user using Flask-Login
    return jsonify({'message': 'Logged out successfully'}), 200

# ?-------------------------------AMAZON FETCH ROUTE---------------------------------
# *------------------------Fetch Product Details-------------------------------
@app.route('/fetch-product-details', methods=['POST'])
@login_required
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
    posts = Post.query.order_by(Post.created_date.desc()).all()
    result = []
    for post in posts:
        post_data = {
            'id': post.id,
            'title': post.title,
            'price': post.price,
            'description': post.description,
            'image_url': post.image_url,
            'link_url': post.link_url,
            'author_id': post.user_id
        }
        result.append(post_data)

    return jsonify(result), 200

#*--------------------------Get A Single Post------------------------
@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_single_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    post_data = {
        'id': post.id,
        'title': post.title,
        'price': post.price,
        'description': post.description,
        'image_url': post.image_url,
        'link_url': post.link_url,
        'author_id': post.user_id,  # Include author information if needed
    }
    return jsonify(post_data), 200

#*------------------------Submit a Post----------------------------
@app.route('/submit-post', methods=['POST'])
@login_required
def submit_post():
    form = PostForm(data=request.json)
    form['csrf_token'].data = request.cookies.get('csrf_access_token')

    if not form.validate():
        errors = {field: error[0] for field, error in form.errors.items()}
        return jsonify({'error': 'Form validation failed', 'details': errors}), 400

    new_post = Post(
        title=form.title.data,
        price=form.price.data,
        description=form.description.data,
        image_url=form.image_url.data,
        link_url=form.link_url.data,
        user_id=current_user.id, 
        created_date=datetime.utcnow(),
    )

    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully'}), 201

#*------------------------Update a Post----------------------------
@app.route('/api/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.json  

    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    # Update the post fields with the new data
    if 'title' in data:
        post.title = data['title']
    if 'price' in data:
        post.price = data['price']
    if 'description' in data:
        post.description = data['description']
    if 'image_url' in data:
        post.image_url = data['image_url']
    if 'link_url' in data:
        post.link_url = data['link_url']

    try:
        db.session.commit()
        return jsonify({
            'message': 'Post updated successfully',
            'post': {
                'id': post.id,
                'title': post.title,
                'price': post.price,
                'description': post.description,
                'image_url': post.image_url,
                'link_url': post.link_url
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update post', 'details': str(e)}), 500


#*------------------------Delete a Post----------------------------
@app.route('/posts/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if post.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized to delete this post'}), 403

    try:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete post', 'details': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
