from src import app, socketio
from flask.templating import render_template

if __name__ == '__main__':
    socketio.run(app, host="localhost", port="5050", debug=True)
    