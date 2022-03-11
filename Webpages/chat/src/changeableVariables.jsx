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

export const PROJECT_ID = "bd7ed9ec-9d77-4413-a5d3-0ee995f30015";

export const PRIVATE_KEY = "187bca6e-c11c-4815-9071-fbe87c45a3a6";

// --------------- Default values ---------------

// The chat rooms a new user will be entered into.
// The numbers can be found on your web page.
// It would be good to edit this when all chosen default chats are created.
// If you want to enter users into the chats with ID:s 1,2 and 3
// the array would be [1, 2, 3].
export const DEFAULT_CHATS = [102138];

// The default users existing in the chat.