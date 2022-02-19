import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = 'bdbda1a1-c263-40fc-ae88-02769813cdca';

const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;

  function logOut () {
    
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    <LoginForm/>;
    return window.location.reload(false);
  }

  return (
    <div>
      <div class="web-chat-title">
        DT Chat Application
        <button class="log-out-button" onClick={logOut}>Log out</button>
      </div>
    <ChatEngine
      height="90vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
    
    </div>
    
  );
};

// infinite scroll, logout, more customizations...

export default App;