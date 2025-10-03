# app.py

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

# --- App Initialization ---
# This creates the Flask application instance. 
# '__name__' is a special Python variable that gets the name of the current module.
app = Flask(__name__)

# --- Database Configuration ---
# Get the absolute path of the directory where this file is located
basedir = os.path.abspath(os.path.dirname(__file__))
# Set the database URI. This tells our app where to find the database.
# We're using SQLite, which is a simple file-based database.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'site.db')
# This is a configuration to disable a feature of Flask-SQLAlchemy that we don't need,
# which helps to save resources.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- Initialize Extensions ---
# Create the database instance by linking it with our Flask app
db = SQLAlchemy(app)
# Initialize Flask-Migrate to handle database migrations
migrate = Migrate(app, db)

# --- A Simple Test Route ---
# The @app.route is a "decorator" that turns a regular Python function into a web route.
# This one responds when someone visits the main URL (like http://127.0.0.1:5000/)
@app.route('/')
def home():
    return "Hello from the Seyalio Backend!"

# --- For Running the App Directly (optional but good practice) ---
# This block of code will only run if you execute this script directly
# (e.g., by running `python app.py` in the terminal).
if __name__ == '__main__':
    app.run(debug=True)