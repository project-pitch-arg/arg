import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useEffect} from 'react';
import ScrollToTop from "react-scroll-to-top";

import TopBar from './TopBar/TopBar';
import Wrong from './Wrong';
import Home from './Tabs/Home';
import OurWork from './Tabs/OurWork';
import AboutUs from './Tabs/AboutUs';

import Footer from './Footer/Footer';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <ScrollToTop smooth color='blue' style={{background:'#e2e2e2'}}/>
        <Routes>
          <Route path="*" element={<Wrong />} /> {/*Default when path doesn't match any of the ones listed below*/}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/OurWork" element={<OurWork />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  ); 
}


export default App;
