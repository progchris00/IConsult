# import boto3
# import json

# bedrock_runtime = boto3.client('bedrock-runtime', region_name="ap-southeast-2")

# prompt = "What is your model name?"

# kwargs = {
#  "modelId": "amazon.titan-text-lite-v1",
#  "contentType": "application/json",
#  "accept": "application/json",
#  "body": json.dumps({"inputText":prompt,"textGenerationConfig":{"maxTokenCount":4096,"stopSequences":[],"temperature":0,"topP":1}})
# }

# response = bedrock_runtime.invoke_model(**kwargs)

# body = json.loads(response['body'].read())

# output_text = body['results'][0]['outputText']

from flask import Flask, render_template, url_for, request

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

@app.route("/result", methods=['POST'])
def result():
    data = request.get_json()
    answers = data.get('answers', [])
    return render_template('result.html', disease="test disease", symptoms="this, is, a, test, symptoms,", hospital="test hospital", cost="test cost")

# def getData():
#     symptoms  = request.form.get("")
#     duration = request.form.get("")
#     isPersistent = request.form.get("")
#     triggers = request.form.get("")
#     triggersObserved = request.form.get("")

if __name__ == "__main__":
    app.run(debug=True)