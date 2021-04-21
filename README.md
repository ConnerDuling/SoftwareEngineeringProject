# SoftwareEngineeringProject

This project uses a simple Python server that utilizes Flask on the local machine to test out Phaser.

To run, make sure you have Flask installed: `pip3 install flask` or `pip install flask`

from there, you can run: `python3 main.py` or `python app.py`

and it will open up a local host server according to the code in localTesting.py, which then lets you access
http://localhost:5050/ (your local host) and see whatever has been put into the index.html page.

This local host server will run until you kill it with Ctrl+C, and can be refreshed to give a real time look at what the Phaser framework in index.html is running.

--Important Note--
When debugging, make sure you have the cache disabled on whatever browser you are testing on. Failure to disable cache will result in old images or js scripts being referenced instead of the edited versions!!