from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def hello():

    if request.method == "POST":
        
        return render_template('index.html')

    else:
        return render_template('index.html')