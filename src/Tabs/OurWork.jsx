import React from 'react';
import {Slide} from 'react-slideshow-image';
import './Company.css';
import { useEffect } from 'react';

import header from '../img/work-header.jpg'
import programming from '../img/programming.jpg'

import slideImage1 from '../img/nobel-prize.jpg';
import slideImage2 from '../img/tablet.png';
import slideImage3 from '../img/smartphone.jpg';

import futurePlans1 from '../img/future-ai.jpg'
import futurePlans2 from '../img/space-shuttle.jpg'
import futurePlans3 from '../img/robotic-future.jpg'

export default function OurWork() {
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
        <div>
          <div class="header" style={{backgroundImage: `url(${header})`, backgroundSize: '100% 85%', opacity: '60%', height: '400px', backgroundRepeat: 'no-repeat'}}>
            <a>Our Work</a>
          </div>

          <div class="content">
            <div id="current-content">
              <div id="current-img">
                <img src={programming} height='215px'/>
              </div>
              <div id="current-desc">
                <h1> What we do </h1>
                <a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </a>
              </div>
            </div>

            <div id="past-content">
                <div id="past-desc">
                <h1>What we have done</h1>
                <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Vel eros donec ac odio. Id aliquet risus feugiat in ante metus dictum. Faucibus et molestie ac feugiat sed. Mattis vulputate enim nulla aliquet porttitor. Amet cursus sit amet dictum sit amet justo donec. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Magna ac placerat vestibulum lectus mauris ultrices eros in. Orci phasellus egestas tellus rutrum tellus pellentesque. Volutpat est velit egestas dui id ornare arcu odio ut. Ornare lectus sit amet est placerat in. Nibh sed pulvinar proin gravida. Habitant morbi tristique senectus et netus. Habitasse platea dictumst vestibulum rhoncus est. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Donec et odio pellentesque diam volutpat commodo sed. Posuere morbi leo urna molestie at elementum eu facilisis sed. Quam id leo in vitae. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. </a>
              </div>

            
            <div id="past-slideshow">
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
            
            <div id="future-content">
              <h1>Future Plans</h1>
              <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut</a>
              <div id="future-left">
                <div id="future-left-top"><img src={futurePlans3} height='100%' width='100%'/></div>
                <div id="future-left-bottom"><img src={futurePlans1} height='100%' width='100%'/></div>
              </div>
              <div id="future-right"><img src={futurePlans2} height='100%' width='100%'/></div>
            </div>

          </div>
        </div>
      
    )
}