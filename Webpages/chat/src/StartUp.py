# This is the file you run to set up the chat.
#
# First, set up an account and project on 
# https://chatengine.io/ to get your PROJECT_ID
# and PRIVATE_KEY. Change these constants
# below.
#
# To change the users, chats and messages sent,
# go to the corresponding JSON-files listed
# below.
#
# JSON-files
# users.json: Edit what users to crete.
# StartChats.json: Edit which chatroomsexist and
#                  which users has access.                   
# ChatPosts.json: Edit the posts for the chats.

import json
import requests
import hashlib


PROJECT_ID = "bd7ed9ec-9d77-4413-a5d3-0ee995f30015"
PRIVATE_KEY = "187bca6e-c11c-4815-9071-fbe87c45a3a6"


chatIds = []

def findChatId(chatArray, chatToFind):
  for chat in chatArray:
      if(chat[0] == chatToFind):
        return chat[1]

#--------------- Create users ---------------

f = open('users.json',)
users = json.load(f)
f.close()

for user in users:
    users = str(user).replace("'", "\"")
    users2 = str(users).replace("None", "null")
    json_object = json.loads((users2))
    json_object["secret"] = hashlib.sha256(str(json_object["secret"]).encode('utf-8')).hexdigest()

    r = requests.post(
        'https://api.chatengine.io/users/',
        data=json_object,
        headers={"Private-Key": PRIVATE_KEY}
    )
    print(r.status_code)


#--------------- Create chats ---------------

f = open('StartChats.json',)
chats = json.load(f)
f.close()


for chat in chats:
    title = "{\"title\":" + "\"" + chat["chat-name"] + "\"" + "}"
    title2 = json.loads(title)
    
    r = requests.post(
        'https://api.chatengine.io/chats/',
        data=title2,
        headers={"Private-Key": PRIVATE_KEY, "User-Name": chat["admin"], "User-Secret": chat["admin-secret"]}
    )
    print(r.status_code)

    getChatId = json.loads(r.text)
    chatId = str(getChatId["id"])

    chatIds.append([chat["chat-name"], chatId])

    password = chat["admin-secret"]
    password = hashlib.sha256(password.encode('utf-8')).hexdigest()

    for user in chat["users"]:

        user = json.loads("{\"username\":" +  "\"" + user  +"\""  + "}")

        r = requests.post(
            'https://api.chatengine.io/chats/' + chatId + '/people/',
            data=user,
            headers={"Project-ID": PROJECT_ID, "User-Name": chat["admin"], "User-Secret": password}
        )
    print(r.status_code)

#--------------- Print posts in chats ---------------

f = open('ChatPosts.json',)
posts = json.load(f)
f.close()

for post in posts:

    chatID = findChatId(chatIds, post["chat-name"])

    r = requests.post(
        'https://api.chatengine.io/chats/' + chatID  +'/messages/',
        data=post,
        headers={"Private-Key": PRIVATE_KEY, "User-Name": post["user"], "User-Secret": post["password"]}
    )
    print(r.status_code)


    