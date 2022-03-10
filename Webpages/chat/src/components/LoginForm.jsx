import { useState } from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount';
import {hashCode} from './CreateAccount';
import { PROJECT_ID } from '../changeableVariables';

const projectID = PROJECT_ID;

var haveAccount = true;

export var haveAccount;

const Modal = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  haveAccount = false;
  //console.log("hill");
  //if (!haveAccount) {haveAccount=true; console.log("hello");return <CreateAccount />;} //TODO: fix

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashPassword = hashCode(password);
    console.log(hashPassword);

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': hashPassword };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      console.log(hashCode(password));
      localStorage.setItem('password', hashPassword);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  function createAccount() {
    localStorage.setItem('getAccount', true);
    window.location.reload();
    return;
  }

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <div align="center">
          <button onClick={createAccount} className="buttonCA">
            <span>Create account</span>
          </button>
        </div>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;