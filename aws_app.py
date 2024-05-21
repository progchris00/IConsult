import boto3
import json

bedrock_runtime = boto3.client('bedrock-runtime', region_name="ap-southeast-2")

# Sample prompt 
prompt = "What is the capital city of the Philippines?"

kwargs = {
 "modelId": "amazon.titan-text-lite-v1",
 "contentType": "application/json",
 "accept": "application/json",
 "body": json.dumps({"inputText":prompt,"textGenerationConfig":{"maxTokenCount":4096,"stopSequences":[],"temperature":0,"topP":1}})
}

response = bedrock_runtime.invoke_model(**kwargs)

body = json.loads(response['body'].read())

print(body)