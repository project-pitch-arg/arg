import React from "react";
import "./TabContent.css";
import { Link } from "react-router-dom";
import Help from "../TopBar/TopBar";
import { useState } from "react";

import { USER_NAME_1, USER_NAME_2, IFRAME_LIST } from "../ChangeableValues";

// TODO! Make the Home page look nicer.

export default function Home() {
    const[index, setIndex] = useState(0);

    // Change to the next puzzle in the IFRAME_LIST.
    function switchJigsaw() {
      setIndex((index + 1 ) % IFRAME_LIST.length);  
      console.log(index)
    }
    
    // Returns the appearance of the Home page
    // along with a button to change jigsaw puzzle.
    return (
      <div class="content" id="home">
        <div class="title-text">
          
          <div id="home-wrapper">

            <div class="home-left">
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
              If you're new to the website we recommend you check out our&nbsp;
              <Link class="link" onClick={Help} to="/About">
                About 
              </Link>
            </div>
          </div>
          <div id="home-iframe-container">
            <iframe id="home-iframe" src={IFRAME_LIST[index]} />
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

/*
              <div id="home-logo">
                <img src="favicon-2.png" alt="Logo" height="100px"/>
              </div>
*/

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