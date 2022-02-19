import React from 'react';
import './TabContent.css';
import {Link} from 'react-router-dom';
import PostContent from './PostContent.js';
import Help from '../TopBar/TopBar';
import dino from '../img/babydino.png';
import robot from '../img/freerobot.png';
import ceasar from '../img/ceasarsalad.jpeg';
import helpbutton from '../img/helpTest.png'

export default function Walk() {
    const Content = PostContent();
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
            Is this your first time here? Click this.
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
            <img src={dino} />
          </div>
          
          <div>
            <img src={robot} />
          </div>
          
          <div >
            <img src={ceasar} />
          </div>
        </div>
      </div>
    )
}