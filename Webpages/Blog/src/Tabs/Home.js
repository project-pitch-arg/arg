import React from 'react';
import './TabContent.css';
import {Link} from 'react-router-dom';
import PostContent from './PostContent.json';
import Help from '../TopBar/TopBar';
import dino from '../img/babydino-removebg-preview.png';
//import robot from '../img/Robot1312113.png';
//import ceasar from '../img/CaesarSalad.jpeg';
import helpbutton from '../img/helpTest.png'

import { userPicture1, userPicture2 } from '../ChangeableVariables';

// Check so that latest post works!
export default function Walk() {
    const Content = PostContent;
    const item = Content[Content.length-1];
    return (
      <div>
        <div class='content content-home-1'>
          <div class="help-text">
            Welcome to Daily Thoughts Website
            <br></br>
            Home of Robot1312113 and Fexjo
            <br></br>
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
            <div class="post">
              <div class="post-date">
                {item.date}
                <div class="post-name"> 
                  {item.name} 
                  <div class="post-content">
                    {item.content}
                  </div>
                  
                  <div class="post-img">
                    {item.image}
                  </div>  
                </div>
              </div>
            </div>
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