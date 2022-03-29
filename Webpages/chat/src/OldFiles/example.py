import requests

url = "https://api.chatengine.io/chats/97944/messages/"

payload = "{\n    \"text\": \"Hello world!\",\n    \"attachment_urls\": [\n        \"https://chat-engine-assets.s3.amazonaws.com/arrow-min.png\"]}"
headers = {
  'Project-ID': 'bdbda1a1-c263-40fc-ae88-02769813cdca',
  'User-Name': 'Robot1312113',
  'User-Secret': 'Imarobot'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)