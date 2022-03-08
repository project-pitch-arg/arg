import React from 'react';
import './TabContent.css';
import {Link} from 'react-router-dom';
import Help from '../TopBar/TopBar';
import dino from '../img/babydino-removebg-preview.png';
//import robot from '../img/Robot1312113.png';
//import ceasar from '../img/CaesarSalad.jpeg';
import helpbutton from '../img/helpTest.png'
import PuzzleHandler from './PostPuzzles.jsx';

import { userName1, userName2, userPicture1, userPicture2, PostContent } from '../ChangeableVariables';

// TODO! Make the Home page look nicer.

export default function Home() {
    
    // Returns the appearance of the Home page
    // along with a button to reach the 'About'
    // page as well as the latest Post from 'Posts'.
    return (
      <div>
        <div class='content content-home-1'>
          <div class="help-text">
            Welcome to Daily Thoughts Website
            <br/>
            Home of {userName1} and {userName2}
            <br/>
            Hope you enjoy your stay!
          </div>

          <div class="help-text">
            Is this your first time here? Click here:
            <Link onClick={Help} to='/About'>
              <img class="help-button" src={helpbutton}/>
            </Link>
          </div>

          <div>
            Latest Post 
            {PuzzleHandler(PostContent[0])}
          </div>
        </div>
        
        <div class='content content-home-2'>
          <div>
            <img class="home-image" src={userPicture1} />
          </div>
          
          <div>
            <img class="home-image" src={dino} />
          </div>
          
          <div >
            <img class="home-image" src={userPicture2} />
          </div>
        </div>
      </div>
    )
}