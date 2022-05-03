import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {Component,useEffect } from 'react';
import ScrollToTop from "react-scroll-to-top";

import TopBar from './CompanyWebsite/TopBar/TopBar';
import Wrong from './Wrong';
import Home from './CompanyWebsite/Tabs/Home';
import OurWork from './CompanyWebsite/Tabs/OurWork';
import AboutUs from './CompanyWebsite/Tabs/AboutUs';
import Internal from './InternalWebsite/Internal';

import Footer from './Footer/Footer';

export default class App extends Component{

  constructor(props){
    super(props)
    this.internalCheck = localStorage.getItem("internalCheck");
  }

  render(){
        return (
                <div className="App">
                  <BrowserRouter>
                    {!window.location.pathname.toUpperCase().includes("/internal".toUpperCase()) ? (
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
                    {!window.location.pathname.toUpperCase().includes("/internal".toUpperCase()) ? (
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



