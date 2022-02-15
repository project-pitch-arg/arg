import React, {useEffect} from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './TopBar/TopBar';
import Wrong from './Wrong';
import Home from './Tabs/Home';
import TabTwo from './Tabs/TabTwo';
import TabPosts from './Tabs/TabPosts';
// import TabFour from './Tabs/TabFour';
import TabFourOne from './Tabs/DropDown/TabFourOne';
import TabAbout from './Tabs/DropDown/TabAbout';
import TabQotD from './Tabs/DropDown/TabQotD';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import logo from './logo.svg';

function App() {

  return (
    
    <div className="App"> 
      <BrowserRouter>
       <Header />
        <TopBar />
        <Routes>
          <Route path="*" element={<Wrong />} /> {/*Default when path doesn't match any of the ones listed below*/}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Two" element={<TabTwo />} />
          <Route exact path="/Posts" element={<TabPosts />} />
          {/* <Route exact path="/Four" element={<TabFour />} /> */}
            <Route exact path="/FourOne" element={<TabFourOne />} />
            <Route exact path="/TabAbout" element={<TabAbout />} />
            <Route exact path="/QotD" element={<TabQotD />} />
        </Routes>
     {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
