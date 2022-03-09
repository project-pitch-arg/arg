import { useState } from 'react';
import axios from 'axios';

const projectID = 'bdbda1a1-c263-40fc-ae88-02769813cdca';

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

        var hashPassword;

        console.log(hashPassword);
        hashPassword = hashCode(password);
        console.log(hashPassword);

        var userInfo =  {"first_name": firstname, "last_name": lastname, "username": username, 
                            "secret": hashPassword, "email": email} ;
        
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                var jsonResponse = JSON.parse(this.responseText);
                if(this.status != 201) {
                    setError(jsonResponse[Object.keys(jsonResponse)[0]]);
                }
                else {
                    setError("Account created");
                }
            }
        });
        xhr.open("POST", "https://api.chatengine.io/users/");
        xhr.setRequestHeader("PRIVATE-KEY", "9f6fd0d6-a58f-4be0-9d0a-b47516df6578");
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(userInfo));

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