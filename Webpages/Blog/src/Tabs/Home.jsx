import React from "react";
import "./TabContent.css";
import { Link } from "react-router-dom";
import Help from "../TopBar/TopBar";
import helpbutton from "../Img/HelpButton.png"

import { USER_NAME_1, USER_NAME_2, IFRAME_LIST } from "../ChangeableValues";

// TODO! Make the Home page look nicer.

export default function Home() {

    var currentIframe = IFRAME_LIST[0];
    var iframe = document.getElementById('#home-iframe');

    // This button is currently not working
    function switchJigsaw() {
      currentIframe = (IFRAME_LIST.indexOf(currentIframe) + 1) % IFRAME_LIST.length;
      iframe.load(currentIframe);           // Either this
      iframe.attr('src', currentIframe);    // or this. Neither works
      document.getElementById('#home-iframe').contentWindow.location.reload()
    }
    
    // Returns the appearance of the Home page
    // along with a button to reach the "About"
    // page as well as the latest Post from "Posts".
    return (
      <div class="content" id="home">
        <div class="title-text">
          
          <div id="home-wrapper">

            <div id="home-left">
              Welcome to Daily Thoughts Website
              <br/>
              Home of {USER_NAME_1} and {USER_NAME_2}
              <br/>
              Hope you enjoy your stay!
              <br/>
              <br/>
              Feel free to try the Jigsaws below
            </div>
            
            <div id="home-right"> 
              <Link onClick={Help} to="/About">
                <img class="help-button" src={helpbutton}/>
              </Link>
              <div id="home-logo">
                <img src="favicon.ico" alt="Logo"/>
              </div>
            </div>
            
          </div>


          <div id="home-iframe-container">
            <iframe id="home-iframe" src={currentIframe} />
          </div>

          <div>
            <button class="button" onClick={switchJigsaw}>
              Next Jigsaw
            </button>
          </div>
          
        </div>
      </div>
    )
}

// Old Home content
/*
<img src="RightFacingOrangeDino.png" class="home-dino"/>

        <div class="homelist">

          <div class="title-text">
            Welcome to Daily Thoughts Website
            <br/>
            Home of {USER_NAME_1} and {USER_NAME_2}
            <br/>
            Hope you enjoy your stay!
          </div>

          <div class="shift-right">
            The latest Post;
            {puzzleHandler(postContent[0])}
          </div>

          <div align="center">
            <Link onClick={Help} to="/About">
              <img class="help-button" src={helpbutton}/>
            </Link>
          </div>

        </div>

        <img src="LeftFacingOrangeDino.png" class="home-dino"/>
*/