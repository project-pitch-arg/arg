import json
import requests

f = open('users.json',)
users = json.load(f)
f.close()

for user in users:
    r = requests.post(
        'https://api.chatengine.io/users/',
        data=user,
        headers={"Private-Key": "9f6fd0d6-a58f-4be0-9d0a-b47516df6578"}
    )
    print(r.status_code)