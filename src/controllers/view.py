from flask import render_template, request, url_for, redirect
from src import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/room')
def rooms():
    return render_template('room.html')

@app.route('/chat')
def chat():
    username = request.args.get('username')
    room = request.args.get('room')

    if username and room:
        return render_template('chat.html', username=username, room=room)
    else:
        return redirect(url_for('/room'))