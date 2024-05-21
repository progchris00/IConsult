from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')

@app.route("/diagnosis")
def diagnosis():
    return render_template('diagnosis.html')

@app.route("/assessment")
def assessment():
    return render_template('assessment.html')

if __name__ == "__main__":
    app.run(debug=True)