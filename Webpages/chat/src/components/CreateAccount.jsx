/* 
   This file contains the form which
   is used to create an account.

   When the user has entered their
   credentials, the password is
   encrypted and a message is sent to
   the chat server to create the account.

   THe account is then added to the 
   chosen default chats. You can edit
   these by changing the DEFAULT_CHATS
   variable in changeableVariables.jsx.
*/

import { useState } from 'react';
import { PROJECT_ID, PRIVATE_KEY, DEFAULT_CHATS } from '../ChangeableValues';
import accounts from '../Users.json';

function getPassword(user) {
    var users = accounts;
    for(var i = 0; i < users.length; i++) {
        if(users[i].username === user) {
            return hashCode(users[i].secret);
        }
    }
    return;
}


// Removes the 'getAccount' value from local
// storage and reloads the window to return to 
// the login form.
function exit() {
    localStorage.removeItem('getAccount');
    window.location.reload();
    return;
}

// Function which uses the entered user
// information to create the account and
// add it to the default chats.
const CreateAccount = () => {

    // Initialize variables.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // This creates the user from the entered
    // information.
    const createUser = async (e) => {
        e.preventDefault();

        // Encrypt the users password.
        const hashPassword = hashCode(password);

        // Organize userinformation with a JSON-format
        var userInfo =  {"first_name": username, "last_name": "", "username": username, 
                            "secret": hashPassword, "email": email} ;
        
        // Create the server request
        var xhrUser = new XMLHttpRequest();
        xhrUser.withCredentials = false;

        // This will trigger when the xhrUser-request
        // is finished.
        xhrUser.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                var jsonResponse = JSON.parse(this.responseText);
                // Check if the account was not created
                // and print the response.
                if(this.status !== 201) {
                    setError(jsonResponse[Object.keys(jsonResponse)[0]]);
                }
                // Account was created succesfully, add
                // user to default chats.
                else {
                    addDefaultChats();
                    setError("Account created");
                }
            }
        });

        // Open the psot request to the server,
        // add headers and send the request.
        xhrUser.open("POST", "https://api.chatengine.io/users/");
        xhrUser.setRequestHeader("PRIVATE-KEY", PRIVATE_KEY);
        xhrUser.setRequestHeader('Content-Type', 'application/json');

        xhrUser.send(JSON.stringify(userInfo));
    }

// Function to add new users to 
// the chosen default chats.
function addDefaultChats() {

    // Create an array to contain the requests needed
    // to be sent for each chat.
    var xhrArray = [];
    for (var i = 0; i < DEFAULT_CHATS.length; i++) {
        xhrArray[i] = new XMLHttpRequest();
    }
         
    // Go through the array and 
    for (i = 0; i < DEFAULT_CHATS.length; i++) {

        xhrArray[i].withCredentials = false;

        // TODO remove these logs when done with testing this
        // This will trigger when the xhrArray[i]-request
        // is finished. It checks if the server request
        // was successful.
        xhrArray[i].addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText)
            }
        });
           
    // Prepare the JSON payload for the request.
    var chatInfo =  {"username": username} ;
        
    // Open the post, set the needed headers and
    // send the request.
    xhrArray[i].open("POST", "https://api.chatengine.io/chats/" + DEFAULT_CHATS[i][0] + "/people/");
            
    xhrArray[i].setRequestHeader("Project-ID", PROJECT_ID);

    xhrArray[i].setRequestHeader("User-Name", DEFAULT_CHATS[i][1]);
    xhrArray[i].setRequestHeader("User-Secret", getPassword(DEFAULT_CHATS[i][1]));
    console.log(getPassword(DEFAULT_CHATS[i][1]))
    
    xhrArray[i].setRequestHeader('Content-Type', 'application/json');
    
    xhrArray[i].send(JSON.stringify(chatInfo));
    }
}
    // Return the form that is used to 
    // enter informtion.
    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Create Account</h1>
                    <div className="subtitle">
                    Read the code of conduct on the About tab
                    before creating an account!
                    </div>
                    <form onSubmit={createUser}>
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

/* Below is the algorithm for 
   encoding the passwords entered
   by users into the registration
   form.
   It is not original code, but
   from the internet where it was
   stated that it is free to use.
   It can be found here:
   https://coursesweb.net/javascript/sha256-encrypt-hash_cs
*/
/**
* Secure Hash Algorithm (SHA256)
* http://www.webtoolkit.info/
* Original code by Angel Marin, Paul Johnston
**/
export function hashCode(s){
    var chrsz = 8;
    var hexcase = 0;
   
    function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
    }
   
    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
   
    function core_sha256 (m, l) {
    var K = [ 0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
                0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 
                0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 
                0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967,
                0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 
                0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 
                0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 
                0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];
    var HASH = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];
    var W = [64];
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
   
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;
   
    for ( i = 0; i<m.length; i+=16 ) {
    a = HASH[0];
    b = HASH[1];
    c = HASH[2];
    d = HASH[3];
    e = HASH[4];
    f = HASH[5];
    g = HASH[6];
    h = HASH[7];
   
    for ( j = 0; j<64; j++) {
    if (j < 16) W[j] = m[j + i];
    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
   
    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
    T2 = safe_add(Sigma0256(a), Maj(a, b, c));
   
    h = g;
    g = f;
    f = e;
    e = safe_add(d, T1);
    d = c;
    c = b;
    b = a;
    a = safe_add(T1, T2);
    }
   
    HASH[0] = safe_add(a, HASH[0]);
    HASH[1] = safe_add(b, HASH[1]);
    HASH[2] = safe_add(c, HASH[2]);
    HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]);
    HASH[5] = safe_add(f, HASH[5]);
    HASH[6] = safe_add(g, HASH[6]);
    HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
    }
   
    function str2binb (str) {
    var bin = [];
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    }
    return bin;
    }
   
    function Utf8Encode(string) {
    string = string.replace(/\r\n/g,'\n');
    var utftext = '';
   
    for (var n = 0; n < string.length; n++) {
   
    var c = string.charCodeAt(n);
   
    if (c < 128) {
    utftext += String.fromCharCode(c);
    }
    else if((c > 127) && (c < 2048)) {
    utftext += String.fromCharCode((c >> 6) | 192);
    utftext += String.fromCharCode((c & 63) | 128);
    }
    else {
    utftext += String.fromCharCode((c >> 12) | 224);
    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    utftext += String.fromCharCode((c & 63) | 128);
    }
   
    }
   
    return utftext;
    }
   
    function binb2hex (binarray) {
    var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
    var str = '';
    for(var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8+4)) & 0xF) +
    hex_tab.charAt((binarray[i>>2] >> ((3 - i % 4)*8 )) & 0xF);
    }
    return str;
    }
   
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
   }

export default CreateAccount;