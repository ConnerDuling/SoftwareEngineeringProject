# SoftwareEngineeringProject

This project uses a simple Python server that utilizes Flask on the local machine to display a Phaser 3 game to the user.

To run, make sure you have Flask installed: `pip3 install flask` or `pip install flask`

from there, you can run: `python3 main.py` or `python app.py`

and it will open up a local host server according to the code in localTesting.py, which then lets you access
http://localhost:5050/ (your local host) and you will see the index.html that leads to the game.

This local host server will run until you kill it with Ctrl+C, and can be refreshed to give a real time look at what the Phaser framework in index.html is running.
