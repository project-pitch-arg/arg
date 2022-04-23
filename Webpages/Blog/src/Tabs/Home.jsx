/*
  Home page of the blog,
  the page you see when you begin browsing.
*/

import React from "react";
import "./TabContent.css";
import { Link } from "react-router-dom";
import Help from "../TopBar/TopBar";
import { useState } from "react";
import Variables from "../JSONDocuments/ChangeableValues.json";

export default function Home() {
    const[index, setIndex] = useState(0);

    // Change to the next puzzle in the iframeList.
    function switchJigsaw() {
      setIndex((index + 1 ) % Variables.iframeList.length);  
    }
    
    // Returns the appearance of the Home page
    // along with a button to change jigsaw puzzle.
    return (
      <div className="content" id="home">
        <div className="title-text">
          <div id="home-wrapper">
            <div className="home-left">
              Welcome to Daily Thoughts Website
              <br/>
              Home of {Variables.username1} and {Variables.username2}
              <br/>
              Hope you enjoy your stay!
              <br/>
              <br/>
              Feel free to try the Jigsaws below
            </div>
            <div id="home-right"> 
              If you're new to the website we recommend you check out our&nbsp;
              <Link className="link" onClick={Help} to="/About">
                About 
              </Link>
            </div>
          </div>
          <div id="home-iframe-container">
            <iframe id="home-iframe" src={Variables.iframeList[index]} />
          </div>
          <div>
            <button className="button" onClick={switchJigsaw}>
              Next Jigsaw
            </button>
          </div>
        </div>
      </div>
    )
}
