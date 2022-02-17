import React from 'react';
import './TabContent.css';
import {Link} from 'react-router-dom';
import PostContent from './PostContent.js';
import Help from '../TopBar/TopBar';
import dino from '../img/babydino.png';
import robot from '../img/freerobot.png';
import ceasar from '../img/ceasarsalad.jpeg';
import help from '../img/help.png'

export default function Walk() {
    const Content = PostContent();
    const item = Content[Content.length-1];
    return (
        <div class="content">
          <div class="question">
            Is this your first time here? Click this.
            <Link onClick={Help} to='/FAQ'>
              <img src={help}/>
            </Link>
          </div>
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
        <div className="Bild">
          <img src={dino} />
          <img src={robot} />
          <img src={ceasar} />
        </div>
      </div>
      
    )
}