# app.py
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config import DATABASE_URI

app = Flask(__name__, template_folder="C:\\Users\\deept\\Documents\\psd trial\\src")  # Set the template folder to your frontend code location

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    zipcode = db.Column(db.String(10), nullable=False)
    password = db.Column(db.String(255), nullable=False)

@app.route('/')
def home():
    return "Welcome to the User Registration API!"

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        data = request.form  # Use request.form to access form data
        name = data.get('name')
        phone_number = data.get('phone_number')
        email = data.get('email')
        address = data.get('address')
        zipcode = data.get('zipcode')
        password = data.get('password')

        if not name or not phone_number or not email or not address or not zipcode or not password:
            return jsonify({'message': 'All fields are required'}), 400

        new_user = User(name=name, phone_number=phone_number, email=email, address=address, zipcode=zipcode, password=password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    # Render a minimal HTML registration form directly in the route
    return """
    <html>
    <head>
        <title>Registration</title>
    </head>
    <body>
        <h1>User Registration</h1>
        <form action="/register" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <!-- Add other form fields here -->
            <input type="submit" value="Register">
        </form>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run(debug=True)
