from flask import Flask
import os

app = Flask('src')
app.config['BASE_PATH'] = os.path.abspath(os.path.dirname(__file__))
from flask_socketio import SocketIO

socketio = SocketIO(app, async_mode="threading")


from src.controllers import *