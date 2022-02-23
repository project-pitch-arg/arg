import React from 'react';
import {Slide} from 'react-slideshow-image';
import './Company.css';
import { useEffect } from 'react';

import slideImage1 from '../img/nobel-prize.jpg';
import slideImage2 from '../img/tablet.png';
import slideImage3 from '../img/smartphone.jpg';

export default function OurWork() {
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
        <div>
          <div class="header">
            <a>Our Work</a>
          </div>

          <div class="content">
          <div id="work-content">
              <h1>Our work</h1>
              <div id="work-slideshow">
                <Slide easing="ease" autoplay={true} indicators={true}>
                <div class="slide-img">
                  <div style={{'backgroundImage': `url(${slideImage1})`}}>
                    <span>Nobel Prize</span>
                  </div>
                </div>
                <div class="slide-img">
                  <div style={{'backgroundImage': `url(${slideImage2})`}}>
                    <span>Tablet</span>
                  </div>
                </div>
                <div class="slide-img">
                  <div style={{'backgroundImage': `url(${slideImage3})`}}>
                    <span>Smartphone</span>
                  </div>
                </div>
                </Slide>
              </div>
            </div>
          </div>

        </div>
      
    )
}