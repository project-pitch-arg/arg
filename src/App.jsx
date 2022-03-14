import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useEffect} from 'react';
import ScrollToTop from "react-scroll-to-top";

import TopBar from './TopBar/TopBar';
import Wrong from './Wrong';
import Home from './Tabs/Home';
import OurWork from './Tabs/OurWork';
import AboutUs from './Tabs/AboutUs';

import TabFourOne from './Tabs/DropDown/TabFourOne';
import TabFourTwo from './Tabs/DropDown/TabFourTwo';
import TabFourThree from './Tabs/DropDown/TabFourThree';
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
            <Route exact path="/FourOne" element={<TabFourOne />} />
            <Route exact path="/FourTwo" element={<TabFourTwo />} />
            <Route exact path="/FourThree" element={<TabFourThree />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  ); 
}


export default App;
