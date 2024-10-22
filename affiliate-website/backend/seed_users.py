from werkzeug.security import generate_password_hash
from app import app, db, User  # Make sure your models and db are imported from your main app file
import random

# Create sample users with hashed passwords
def seed_users():
    users = [
        {
            "username": "taraIndyCouponMama",
            "email": "hbennen@yahoo.com",
            "password": "DealsMama5742!",
        },
    ]

    for user_data in users:
        # Hash the password
        hashed_password = generate_password_hash(user_data["password"])
        
        # Create the user instance
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            password_hash=hashed_password
        )
        
        # Add user to session and commit to the database
        db.session.add(user)
    
    db.session.commit()
    print(f'Successfully seeded {len(users)} users!')

def unseed_users():
    users = User.query.filter(User.username.in_(['taraIndyCouponMama'])).all()
    for user in users:
        db.session.delete(user)

    db.session.commit()
    print(f'Successfully unseeded {len(users)} users.')

if __name__ == '__main__':
    with app.app_context():
        option = input("Do you want to (1) seed or (2) unseed? ")

        if option == "1":
            seed_users()
        elif option == "2":
            unseed_users()
        else:
            print("Invalid option. Choose (1) to seed or (2) to unseed.")
