# SoftwareEngineeringProject

This project uses a simple Python server that utilizes Flask on the local machine to test out Phaser.

To run, make sure you have Flask installed.
> pip install flask

from there, you can run
> ./Makefile

and it will open up a local host server according to the code in localTesting.py, which then lets you access
http://127.0.0.1:5000/ (your local host) and see whatever has been put into the index.html page.

This local host server will run until you kill it with Ctrl+C, and can be refreshed to give a real time look at what the Phaser framework in index.html is running.