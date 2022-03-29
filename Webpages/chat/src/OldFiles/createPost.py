import json
import requests

f = open('posts.json',)
posts = json.load(f)
f.close()


for post in posts:
    print(post["thisIsMe"])
    r = requests.post(
        'https://api.chatengine.io/chats/97977/messages/',
        data=post,
        headers={"Private-Key": "9f6fd0d6-a58f-4be0-9d0a-b47516df6578", "User-Name": post["thisIsMe"], "User-Secret": post["password"]}
    )
    print(r.status_code)

url = "https://api.chatengine.io/chats/97977/messages/"

payload={}
headers = {
  'Project-ID': 'bdbda1a1-c263-40fc-ae88-02769813cdca',
  'User-Name': 'Robot1312113',
  'User-Secret': 'Imarobot'
}

response = requests.request("GET", url, headers=headers, data=payload)

#print(response.text)