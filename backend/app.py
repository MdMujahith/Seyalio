# app.py

from flask import Flask,request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
import os

from models import db, User, Task

# --- App Initialization ---
app = Flask(__name__)
CORS(app) # <<< THIS LINE IS THE FIX

# --- Database Configuration ---
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'site.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- Initialize Extensions ---
db.init_app(app)
migrate = Migrate(app, db)

# --- A Simple Test Route ---
@app.route('/')
def home():
    return "Hello from the Seyalio Backend!"

# --- API Endpoint to Create a Task ---
@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    if not data or not 'title' in data:
        return jsonify({'message': 'Error: Missing title for the task'}), 400

    # We still need to create a User before this will work perfectly.
    # For now, let's create a dummy user if one doesn't exist.
    user = User.query.get(1)
    if not user:
        user = User(id=1, username='default_user', email='default@user.com')
        db.session.add(user)
        # We don't need to commit yet, the task commit will handle it.
        
    new_task = Task(
        title=data['title'],
        content=data.get('content', ''),
        user_id=1
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        'message': 'Task created successfully!',
        'task': {
            'id': new_task.id,
            'title': new_task.title,
            'content': new_task.content,
            'completed': new_task.completed,
            'created_at': new_task.created_at,
            'user_id': new_task.user_id
        }
    }), 201
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    # 1. Fetch all tasks from the database, ordering them by creation date (newest first)
    tasks = Task.query.order_by(Task.created_at.desc()).all()

    # 2. Convert the list of task objects into a list of dictionaries
    tasks_list = []
    for task in tasks:
        tasks_list.append({
            'id': task.id,
            'title': task.title,
            'content': task.content,
            'completed': task.completed,
            'created_at': task.created_at.isoformat(), # Use isoformat for consistency
            'user_id': task.user_id
        })
    
    # 3. Return the list as a JSON response
    return jsonify(tasks_list)


# --- For Running the App Directly ---
if __name__ == '__main__':
    app.run(debug=True)