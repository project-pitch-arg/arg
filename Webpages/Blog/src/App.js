import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import Wrong from "./Wrong";
import Home from "./Tabs/Home";
import Chat from "./Tabs/TabChat";
import Posts from "./Tabs/TabPosts";
import ChangeableValues from "./ChangeableValues";
import About from "./Tabs//TabAbout";
import Quotes from "./Tabs//TabQuotes";
import Header from "./Header/Header";

function App() {
  return (  
    // An HTML statement that sets up our website according to 
    // the specifications in "react-router-dom".
    <div className="app"> 
      <BrowserRouter>
       <Header />
        <TopBar />
        <Routes>
          <Route path="*" element={<Wrong />} /> {/*Default when path doesn't match any of the ones listed below*/}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Chat" element={<Chat />} />
          <Route exact path="/Posts" element={<Posts />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/Quotes" element={<Quotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
