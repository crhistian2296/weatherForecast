from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate

routeBase = 'http://localhost:5173/'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Cambia esto por tu propia clave secreta
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(50), unique=True, nullable=False)
  password = db.Column(db.String(50), unique=True, nullable=False)

  def __repr__(self):
    return f'<User {self.username}>'

  def serialize(self):
    return {
      "id": self.id,
      "username": self.username,
      # do not serialize the password, its a security breach
    }

from admin import setup_admin
setup_admin(app)


@app.route('/login', methods=['POST'])
def login():
  username = request.json['username']
  password = request.json['password']
  
  # Aquí puedes agregar la lógica de autenticación
  if username == 'admin' and password == 'password':
    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token}), 200
  else:
    return jsonify({'message': 'Invalid credentials'}), 401
  
  return jsonify({'message': 'Login successful'})

@app.route('/signup', methods=['POST'])
def signup():
  username = request.json['username']
  password = request.json['password']
  
  # Aquí puedes agregar la lógica de registro de usuarios
  
  return jsonify({'message': 'Signup successful'})

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
  current_user = get_jwt_identity()
  return jsonify({'message': f'Protected endpoint accessed by {current_user}'}), 200

if __name__ == '__main__':
  app.run()
