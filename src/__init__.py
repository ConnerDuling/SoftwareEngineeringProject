from flask import Flask
import os
from flask_socketio import SocketIO

app = Flask('src')
app.config['BASE_PATH'] = os.path.abspath(os.path.dirname(__file__))
socketio = SocketIO(app)

from src.controllers import *