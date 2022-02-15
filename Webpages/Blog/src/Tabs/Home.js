import React from 'react';
import './TabContent.css';
import PostContent from './PostContent.js';
import dino from '../img/babydino.png';
import robot from '../img/freerobot.png';
import ceasar from '../img/ceasarsalad.jpeg';

export default function Walk() {
    const Content = PostContent();
    const item = Content[Content.length-1];
    return (
        <div class="content">
          <div class="question">
            Is this your first time here? Click this.
            <button class="button">
              Beep Boop
            </button>
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