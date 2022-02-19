import json
import requests

f = open('chats.json',)
chats = json.load(f)
f.close()


for chat in chats:
    r = requests.post(
        'https://api.chatengine.io/chats/',
        data=chat,
        headers={"Private-Key": "9f6fd0d6-a58f-4be0-9d0a-b47516df6578", "User-Name": chat["thisIsMe"], "User-Secret": chat["password"]}
    )
    print(r.status_code)
   # print(r.text)
    getChatId = json.loads(r.text)
    print(getChatId["id"])

    chatId = str(getChatId["id"])


# To add people:

file = open('addToChat.json',)
people = json.load(file)
file.close()

for person in people:
    r = requests.post(
        'https://api.chatengine.io/chats/' + chatId + '/people/',
        data=person,
        headers={"Project-ID": "bdbda1a1-c263-40fc-ae88-02769813cdca", "User-Name": person["thisIsMe"], "User-Secret": person["password"]}
    )
    print(r.status_code)
    #print(r.content)
