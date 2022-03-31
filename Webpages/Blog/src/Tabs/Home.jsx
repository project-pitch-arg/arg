import React from "react";
import "./TabContent.css";
import { Link } from "react-router-dom";
import Help from "../TopBar/TopBar";
import helpbutton from "../Img/HelpButton.png"
import puzzleHandler from "./PostPuzzles.jsx";

import { USER_NAME_1, USER_NAME_2, USER_PICTURE_1, USER_PICTURE_2, postContent } from "../ChangeableValues";

// TODO! Make the Home page look nicer.

export default function Home() {
    
    // Returns the appearance of the Home page
    // along with a button to reach the "About"
    // page as well as the latest Post from "Posts".
    return (
      <div class="content">
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
      </div>
    )
}