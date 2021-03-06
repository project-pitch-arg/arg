/*
  The basic file for the this application.
  Can be described as the center of all
  the files in the chat application.
*/

import { ChatEngine } from 'react-chat-engine';
import LoginForm from './components/LoginForm';
import './App.css';

import CreateAccount from './components/CreateAccount';
import variables from './JSONDocuments/ChangeableValues';

const projectID = variables.ProjectId;


const App = () => {

  // Check if the local storage contians
  // the variables that concern an 
  // account or not.
  // Returns different froms if the user needs
  // to log in or create an account.
  if (!localStorage.getItem('username')) {
    if(localStorage.getItem('getAccount')) {
      return <CreateAccount/>;
    }
    return <LoginForm/>;
  }

  // Log out by removing the relevant variables
  // in the users local storage.
  function logOut () {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    return window.location.reload(false);
  }

  return (
    <div>
    <ChatEngine
      height="90vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
     <div className="web-chat-title">
     <button className="log-out-button" onClick={logOut}>Log out</button>
        <p>
        Is something not working? </p>
        <p>
        Make a new chat room and add one of us. We'll check out your complaint.
        </p>
      </div>
    </div>
  );
};

export default App;