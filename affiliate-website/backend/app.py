from flask import Flask, jsonify, request, session
from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SubmitField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
import requests

app = Flask(__name__)
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
    title = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
# Example form using Flask-WTF
class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    image_url = StringField('Image URL', validators=[DataRequired()])
    submit = SubmitField('Post')

#? --------------------------------------USER ROUTES-----------------------------------
#* -------------Sign Up---------------
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400

    # Hash password and create user
    password_hash = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'}), 201

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
    return jsonify({'message': 'Login successful'}), 200

# ?-------------------------------AMAZON FETCH ROUTE---------------------------------
# *------------------------Fetch Product Details-------------------------------
@app.route('/fetch-product-details', methods=['POST'])
def fetch_product_details():
    affiliate_url = request.json.get('url')
    # Fetch product details from Amazon API (You will need to complete this logic)
    response = requests.get('https://api.amazon.com/product', params={"url": affiliate_url})
    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({'error': 'Failed to fetch product details'}), 400

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

    # Logic for handling the form submission
    form = PostForm()
    if form.validate_on_submit():
        # Get the logged-in user
        user_id = session['user_id']
        user = User.query.get(user_id)

        # Create and save the post
        new_post = Post(
            title=form.title.data,
            price=form.price.data,
            description=form.description.data,
            image_url=form.image_url.data,
            user_id=user.id
        )
        db.session.add(new_post)
        db.session.commit()

        return jsonify({'message': 'Post submitted successfully'}), 201

    return jsonify({'error': 'Form validation failed'}), 400


if __name__ == '__main__':
    app.run(debug=True)
