/*
  The basic file for the this application.
  Can be described as the center of all
  the files in the chat application.
*/

import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

import CreateAccount from './components/CreateAccount';
import { PROJECT_ID } from './ChangeableValues';

const projectID = PROJECT_ID;


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
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
     <div class="web-chat-title">
     <button class="log-out-button" onClick={logOut}>Log out</button>
        <p>
        Is something not working? </p>
        <p>
        Please contact us through the information on the About page.
        </p>
      </div>
    </div>
  );
};

export default App;