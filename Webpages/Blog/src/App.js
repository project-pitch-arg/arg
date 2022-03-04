import React, {useEffect} from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar/TopBar';
import Wrong from './Wrong';
import Home from './Tabs/Home';
import Chat from './Tabs/TabChat';
import Posts from './Tabs/TabPosts';
// import TabFour from './Tabs/TabFour';
// import FAQ from './Tabs/DropDown/TabFAQ';
import About from './Tabs/DropDown/TabAbout';
import QotD from './Tabs/DropDown/TabQotD';
// import Footer from './Footer/Footer';
import Header from './Header/Header';

// import Images from './img';

import logo from './logo.svg';

function App() {

  // This is to ensure that PostContent is sorted 
  // and that everything has a date the first time the website is up. 
  // This way the home page will be able to display the latest post 
  // without having to seperately load the Posts tab first.
  Posts();

  return (
    
    <div className="App"> 
      <BrowserRouter>
       <Header />
        <TopBar />
        <Routes>
          <Route path="*" element={<Wrong />} /> {/*Default when path doesn't match any of the ones listed below*/}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Chat" element={<Chat />} />
          <Route exact path="/Posts" element={<Posts />} />
          {/* <Route exact path="/Four" element={<TabFour />} /> */}
            <Route exact path="/About" element={<About />} />
            <Route exact path="/QotD" element={<QotD />} />
        </Routes>
     {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

// Not needed <Route exact path="/FAQ" element={<FAQ />} />
