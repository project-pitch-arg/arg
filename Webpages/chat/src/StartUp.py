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
# JSON-files:
# users.json: Edit what users to crete.
# StartChats.json: Edit which chatroomsexist and
#                  which users has access.                   
# ChatPosts.json: Edit the posts for the chats.

import json
import requests
import hashlib

# Change these to your own project!
PROJECT_ID = "aa2bb056-425d-4756-bb63-ab5b02585256"
PRIVATE_KEY = "ede1ace3-6939-44bf-9df8-c818978fc030"

# Create and array to save the ID:s of the
# created chats.
# Uses the format of [[chatName, chatId], [chatName, chatId]]
# TODO Move this?
chatIds = []

# Find the corresponding chatId from the name of the chat. 
# It takes the array of arrays and the name of the chat as arguments
# and returns the ID.
def findChatId(chatArray, chatToFind):
    for chat in chatArray:
        if(chat[0] == chatToFind):
            return chat[1]

def findUserSecret(userArray, userName):
    for user in userArray:
        if(user["username"] == userName):
            return user["secret"]

#--------------- Create users --------------

print("Creating users")
# Load values from file
f = open('Users.json')
accounts = json.load(f)
f.close()

# Go through all the users to be created
for user in accounts:

    # Fix the format of the JSON-date so that the secret can be hashed.
    userString = str(user).replace("'", "\"")
    userString = str(userString).replace("None", "null")
    json_object = json.loads((userString))
    json_object["secret"] = hashlib.sha256(str(json_object["secret"]).encode('utf-8')).hexdigest()

    json_object["first_name"] = json_object["username"]
    json_object["last_name"] = ""
    # Send the request to create a user with payload and header.
    r = requests.post(
        'https://api.chatengine.io/users/',
        data=json_object,
        headers={"Private-Key": PRIVATE_KEY}
    )
    # Print the result of the sent post request.
    print(r.status_code)

#--------------- Create chats ---------------

print("Creating chats")
# Load values from file.
f = open('StartChats.json',)
chats = json.load(f)
f.close()

# Go through all the chats to be created.
for chat in chats:
    
    # Create a JSON-object with the chatname.
    title = json.loads("{\"title\":" + "\"" + chat["chat_name"] + "\"" + "}")
    
    # Get the secret for the admin for this chat from the file and hash it.
    secret = findUserSecret(accounts, chat["admin"])
    secret = hashlib.sha256(secret.encode('utf-8')).hexdigest()

    # Send the request to create a chat with payload and header.
    r = requests.post(
        'https://api.chatengine.io/chats/',
        data=title,
        headers={"Project-ID": PROJECT_ID, "User-Name": chat["admin"], "User-Secret": secret}
    )
    # Print the result of the sent post request.
    print(r.status_code)

    # Add the id for the chat to the list of chat ids.
    getChatId = json.loads(r.text)
    chatId = str(getChatId["id"])
    chatIds.append([chat["chat_name"], chatId])

    # Iterate the users that will be added to the newly created chat.
    for user in chat["users"]:
        
        # Create a JSON-object for the user to be added.
        user = json.loads("{\"username\":" +  "\"" + user  +"\""  + "}")

        # Send the request to add a user with payload and header.
        r = requests.post(
            'https://api.chatengine.io/chats/' + chatId + '/people/',
            data=user,
            headers={"Project-ID": PROJECT_ID, "User-Name": chat["admin"], "User-Secret": secret}
        )
    # Print the result of the sent post request.
    print(r.status_code)

#--------------- Print messages in chats ---------------

print("Print messages in chats")
# Load values from file
f = open('ChatMessages.json',)
messages = json.load(f)
f.close()

counter = 0
currentChatID = -1

# Iterate through all messages to send
for message in messages:

    # Find the ID of the chat to send the message in
    # to have the right address for the server request.
    if "chat_name" in message:
        currentChatID = findChatId(chatIds, message["chat_name"])

    secret = findUserSecret(accounts, message["user"])
    secret = hashlib.sha256(secret.encode('utf-8')).hexdigest()

    # Send the request to post a message with payload and header.
    r = requests.post(
        'https://api.chatengine.io/chats/' + currentChatID  +'/messages/',
        data=message,
        headers={"Project-ID": PROJECT_ID, "User-Name": message["user"], "User-Secret": secret}
    )
    # Print the result of the post request every 10 messages if nothing goes wrong.
    if(r.status_code != 201):
        print(r.status_code)
        print("Something went wrong when printing a message in chat with ID " + currentChatID + "." )
    elif(counter >= 10):
        print("Sent 10 messages, currently sending messages in chat with ID " + currentChatID + ".")
        counter = 0
    
    counter = counter + 1

# A final confirmation message
print("Startup is finished. Remember to add the ID:s to the constant DEFAULT_CHATS in ChangeableValues.jsx.")

    