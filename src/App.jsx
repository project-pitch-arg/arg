import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {Component,useEffect } from 'react';
import ScrollToTop from "react-scroll-to-top";

import TopBar from './TopBar/TopBar';
import Wrong from './Wrong';
import Home from './Tabs/Home';
import OurWork from './Tabs/OurWork';
import AboutUs from './Tabs/AboutUs';
import Internal from './InternalWebsite/Internal';

import Footer from './Footer/Footer';

export default class App extends Component{

  constructor(props){
    super(props)
    this.internalCheck = localStorage.getItem("internalCheck");
  }

  render(){
        console.log(!window.location.pathname.toUpperCase() === "/Internal".toUpperCase());
        return (
                <div className="App">
                  <BrowserRouter>
                    {window.location.pathname.toUpperCase() !== "/Internal".toUpperCase() ? (
                    <div>
                        <TopBar />
                        <ScrollToTop smooth color='blue' style={{background:'#e2e2e2'}}/>
                    </div>
                    ) : (null)}
                    <Routes>
                      <Route path="*" element={<Wrong />} /> {/*Default when path doesn't match any of the ones listed below*/}
                      <Route exact path="/" element={<Home />} />
                      <Route exact path="/OurWork" element={<OurWork />} />
                      <Route exact path="/AboutUs" element={<AboutUs />} />
                      <Route exact path="/Internal/*" element={<Internal/>} />
                    </Routes>
                    {window.location.pathname.toUpperCase() !== "/Internal".toUpperCase() ? (
                        <div>
                            <Footer />
                        </div>
                    ) : (null)}
                  </BrowserRouter>
                </div>
              );
    //}
  }
}



