import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

//TEST
import {haveAccount} from './components/LoginForm';
import CreateAccount from './components/CreateAccount';

const projectID = 'bdbda1a1-c263-40fc-ae88-02769813cdca';


const App = () => {

  if (!localStorage.getItem('username')) {
    console.log("check");
    if(localStorage.getItem('getAccount')) {
      console.log("hi+");
      return <CreateAccount/>;
    }
    return <LoginForm/>;
  }

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

// infinite scroll, logout, more customizations...

export default App;