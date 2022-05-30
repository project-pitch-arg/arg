import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {Component,useEffect } from 'react';
import ScrollToTop from "react-scroll-to-top";

import TopBar from './companyWebsite/topBar/TopBar';
import Wrong from './companyWebsite/Wrong';
import Home from './companyWebsite/tabs/Home';
import OurWork from './companyWebsite/tabs/OurWork';
import AboutUs from './companyWebsite/tabs/AboutUs';
import Internal from './internalWebsite/Internal';

import Footer from './companyWebsite/footer/Footer';

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



