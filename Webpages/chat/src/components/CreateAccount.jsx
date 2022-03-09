import { useState } from 'react';
import axios from 'axios';
import { PROJECT_ID, PRIVATE_KEY, DEFAULT_CHATS } from '../changeableVariables';


// Thanks to the internet.
export function hashCode(string) {
        var hash = 0;
        if (string.length == 0) 
            return hash;
        for (var i = 0; i < string.length; i++) {
            var char = string.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    

function exit() {
    localStorage.removeItem('getAccount');
    window.location.reload();
    return;
}

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const createUser = async (e) => {
        e.preventDefault();

        // Create a user
        var hashPassword;

        console.log(hashPassword);
        hashPassword = hashCode(password);
        console.log(hashPassword);

        var userInfo =  {"first_name": firstname, "last_name": lastname, "username": username, 
                            "secret": hashPassword, "email": email} ;
        
        
        var xhrUser = new XMLHttpRequest();
        xhrUser.withCredentials = false;

        xhrUser.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                var jsonResponse = JSON.parse(this.responseText);
                if(this.status != 201) {
                    setError(jsonResponse[Object.keys(jsonResponse)[0]]);
                }
                else {
                    addDefaultChats();
                    setError("Account created");
                }
            }
        });
        xhrUser.open("POST", "https://api.chatengine.io/users/");
        xhrUser.setRequestHeader("PRIVATE-KEY", PRIVATE_KEY);
        xhrUser.setRequestHeader('Content-Type', 'application/json');

        xhrUser.send(JSON.stringify(userInfo));
    }

function addDefaultChats() {
    var xhrArray = [];
    for (var i = 0; i < DEFAULT_CHATS.length; i++) {
        xhrArray[i] = new XMLHttpRequest();
    }
               
    for (var i = 0; i < DEFAULT_CHATS.length; i++) {
        console.log(DEFAULT_CHATS[i]);
        console.log("hello" + i);
        console.log("https://api.chatengine.io/chats/" + DEFAULT_CHATS[i] + "/people/");

        xhrArray[i].withCredentials = false;

        //TODO remove these logs when done with testing this
        xhrArray[i].addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                if(this.status != 201) {
                    console.log(this.responseText + "hello")
                }
                else {
                    console.log(this.responseText + "succeed!")
                }
            }
        });
            
    var chatInfo =  {"username": username} ;
        
    xhrArray[i].open("POST", "https://api.chatengine.io/chats/" + DEFAULT_CHATS[i] + "/people/");
            
    xhrArray[i].setRequestHeader("Project-ID", PROJECT_ID);
    xhrArray[i].setRequestHeader("User-Name", "Robot1312113");
    xhrArray[i].setRequestHeader("User-Secret", "Imarobot");
    
    xhrArray[i].setRequestHeader('Content-Type', 'application/json');
    
    xhrArray[i].send(JSON.stringify(chatInfo));
    }
}

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Create Account</h1>
                    <form onSubmit={createUser}>
                        <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="First Name"/>
                        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)}className="input" placeholder="Last Name"/>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required/>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}className="input" placeholder="Password"/>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}className="input" placeholder="Email"/>
                        <div align="center">
                            <button type="submit" className="button">
                            <span>Create account</span>
                            </button>
                        </div>
                    </form>
                    <div align="center">
                        <button onClick={exit} className="button">
                            <span>Exit</span>
                        </button>
                    </div>
                <h1>{error}</h1>
            </div>

        </div>
    );
};

export default CreateAccount;