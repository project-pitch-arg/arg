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
          <Route exact path="/Three" element={<TabThree />} />
          {/* <Route exact path="/Four" element={<TabFour />} /> */}
            <Route exact path="/FourOne" element={<TabFourOne />} />
            <Route exact path="/FourTwo" element={<TabFourTwo />} />
            <Route exact path="/FourThree" element={<TabFourThree />} />
        </Routes>
       {/* --- <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
