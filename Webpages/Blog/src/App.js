import React, {useEffect} from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar/TopBar';
import Wrong from './Wrong';
import Home from './Tabs/Home';
import TabTwo from './Tabs/TabTwo';
import TabThree from './Tabs/TabThree';
// import TabFour from './Tabs/TabFour';
import TabFourOne from './Tabs/DropDown/TabFourOne';
import TabFourTwo from './Tabs/DropDown/TabFourTwo';
import TabFourThree from './Tabs/DropDown/TabFourThree';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import logo from './logo.svg';

function App() {
  useEffect(() => {
    addResponseMessage('Welcome, thank you for reading this.');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    //Check this link for message details https://www.npmjs.com/package/react-chat-widget#messages
    addResponseMessage("This service is temporarily unavailable.");
  };
  return (
    
    <div className="App"> 
      <Widget //Don't know what css clauses to override to change the colors but maybe not a problem?
        //Check https://www.npmjs.com/package/react-chat-widget#API for more API props
        handleNewUserMessage={handleNewUserMessage}
        senderPlaceHolder="Write damn you!"
        profileAvatar={logo}
        profileClientAvatar={null}
        titleAvatar={null}
        showTimeStamp={false} //Temporary to be able to use old messages
        resizable={true}
        emojis={true}
        title="Widget chat for blog"
        subtitle="Still a work in progress"
      />
      <BrowserRouter>
       <Header />
        <TopBar />
        <Routes>
          <Route path="*" element={<Wrong />} /> {/*Default when path doesn't match any of the ones listed below*/}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Two" element={<TabTwo />} />
          <Route exact path="/Three" element={<TabThree />} />
          {/* <Route exact path="/Four" element={<TabFour />} /> */}
            <Route exact path="/FourOne" element={<TabFourOne />} />
            <Route exact path="/FourTwo" element={<TabFourTwo />} />
            <Route exact path="/FourThree" element={<TabFourThree />} />
        </Routes>
       {/*<Footer />*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
