/* This file contains variables you can
    change to get different results for the
    blog chat.

    This chat needs you to have an account at
    https://chatengine.io/. Starting a project
    here will give you the required
    project ID and private key used in this application.
    Please edit PROJECT_ID and PRIVATE_KEY to use your keys.
    Also, change them in StartUp.py.

    For the JSON-files below, you can find their corresponding
    shcemas ???, ??? and ??? in the folder for docuementaiton
    found ???. It is also available in text if that is preferable.
    In that case go to ???.

    To change the default chats, change the variable DEFAULT_CHATS.

    To change default users, go to users.json.

    To change default messages, got to ChatPosts.json

    To create the default chats and user
    as well as send the chat history,
    run the file StartUp.py.
*/

// --------------- Keys ---------------

export const PROJECT_ID = "aa2bb056-425d-4756-bb63-ab5b02585256";

export const PRIVATE_KEY = "ede1ace3-6939-44bf-9df8-c818978fc030";

// --------------- Default values ---------------

// The chat rooms a new user will be entered into.
// The numbers can be found on your web page.
// It would be good to edit this after running StartUp.py, where chats are created.
// If you want to enter users into the chats with ID:s 1, 2 and 3 with corresponding
// admins admin1, admin2 and admin3 the array would be [[1, admin1], [2, admin2], [3, admin3]].
export const DEFAULT_CHATS = [[109444, "Robot1312113"], [109445, "Fexjo"], [109446, "icniVad"], [109448, "icniVad"], [109449, "Mr X"]];