import { useState } from 'react';
import axios from 'axios';

const projectID = 'bdbda1a1-c263-40fc-ae88-02769813cdca';

const Test = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const createUser = async (e) => {
        e.preventDefault();
    
        const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': "TempPassword" };
    
        try {
          await axios.get('https://api.chatengine.io/chats', { headers: authObject });
    
          localStorage.setItem('username', username);
          localStorage.setItem('password', "TempPassword");
    
          window.location.reload();
          setError('');
        } catch (err) {
          setError('Oops, incorrect credentials.');
        }
      };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Create Account</h1>
                    <form onSubmit={createUser}>
                        <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="First Name"/>
                        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)}className="input" placeholder="Last Name"/>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required/>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}className="input" placeholder="Email"/>
                        <div align="right">
                            <button type="submit" className="button">
                            <span>Create account</span>
                            </button>
                        </div>
                    </form>
                <h1>{error}</h1>
            </div>
        </div>
    );
};

export default Test;