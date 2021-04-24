from flask import render_template, request, url_for, redirect
from src import app, socketio
from flask_socketio import join_room, leave_room

@app.route('/')
def landing_page():
    return render_template('index.html')

@app.route('/room')
def rooms():
    return render_template('room.html')

@app.route('/existing_room')
def existing_room():
    return render_template('game.html')

@app.route('/chat')
def chat():
    username = request.args.get('username')
    room = request.args.get('room')

    if username and room:
        return render_template('game.html', username=username, room=room)
    else:
        return redirect(url_for('/room'))

@socketio.on('join_room')
def handle_join_room_event(data):
    app.logger.info("{} has joined the room {}".format(data['username'], data['room']))
    join_room(data['room'])
    socketio.emit('chetanya', data['username'])

@socketio.on('joined_room')
def something(data):
    app.logger.info("{} has joined the room {}".format(data['name'], data['roomid']))
    
@socketio.on("info")
def test(data):
    app.logger.info(f"{data}")
    socketio.emit('help', {'hi': 'hi'}, broadcast=False)


