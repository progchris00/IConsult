from flask import Flask, render_template, url_for, request
import boto3
import json

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

    bedrock_runtime = boto3.client('bedrock-runtime', region_name="ap-southeast-2")
    prompt = f"I am playing a game as an imaginary doctor. My imaginary patient is experiencing {answers[0]} for about {answers[1]} already. This symptoms are {answers[2]}. The specific pattern is {answers[3]}. Provide the answer in single json string format with this keys: possibleDisease, hospital, doctorType, possibleCheckUpCostPHP. Give one answer only."

    kwargs = {
    "modelId": "amazon.titan-text-lite-v1",
    "contentType": "application/json",
    "accept": "application/json",
    "body": json.dumps({"inputText":prompt,"textGenerationConfig":{"maxTokenCount":4096,"stopSequences":[],"temperature":0,"topP":1}})
    }

    response = bedrock_runtime.invoke_model(**kwargs)

    body = json.loads(response['body'].read())
    output = body['results'][0]['outputText']
    try:
        output = output.replace("```", " ")
        output_list = json.loads(output)
        first_response = output_list[0]
        print(first_response)
    except:
        print(output)
        first_response = {
            "possibleDisease": "Pneumonia",
            "hospital": "Lung Center of the Philippines",
            "possibleCheckUpCostPHP": "500-1000PHP",
            "doctorType": "Pulmonologist"
        }

    # return render_template('result.html', disease=first_response.get('possibleDisease', 'Pneumonia'), symptoms=answers[0], hospital=first_response.get('hospital', 'Lung Center of the Philippines'), cost=first_response.get('possibleCheckUpCostPHP', '500-1000 PHP'))
    return render_template('result.html', disease=first_response['possibleDisease'], symptoms=answers[0], hospital=first_response['hospital'], cost=first_response['possibleCheckUpCostPHP'], doctorType=first_response['doctorType'])

if __name__ == "__main__":
    app.run(debug=True)