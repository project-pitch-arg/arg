import React from 'react';
import {Slide} from 'react-slideshow-image';
import './Company.css';
import { useEffect, useState } from 'react';

import header from '../img/work-header.jpg'
import programming from '../img/programming.jpg'

import slideImage1 from '../img/slideImage1.jpg';
import slideImage2 from '../img/slideImage2.jpg';
import slideImage3 from '../img/slideImage3.jpg';
import slideImage4 from '../img/slideImage4.jpg';

import futurePlans1 from '../img/future-ai.jpg'
import futurePlans2 from '../img/space-shuttle.jpg'
import futurePlans3 from '../img/robotic-future.jpg'

export default function OurWork() {
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    const [countFirst, setCountFirst]   = useState(0);
    const [countSecond, setCountSecond] = useState(0);
    const [countThird, setCountThird]   = useState(0);
    const [countFourth, setCountFourth] = useState(0);

    const firstVar  = 8;
    const secondVar = 9;
    const thirdVar  = 2;
    const fourthVar = 6;

    // console.log("First: " + countFirst + ", Second: " + countSecond + ", Third: " + countThird + ", Fourth: " + countFourth);
    
    var codeCracked = false;
    if (countFirst === firstVar && countSecond === secondVar && countThird === thirdVar && countFourth === fourthVar) {
      codeCracked = true;
    }

    if (codeCracked) {
      console.log(617264);
      setTimeout(function() {
        console.clear();
      }, 2000)
    } 


    return (
        <div>
          <div class="header" style={{backgroundImage: `url(${header})`, backgroundSize: '100% 85%', opacity: '60%', height: '400px', backgroundRepeat: 'no-repeat'}}>
            <a>Our Work</a>
          </div>

          <div class="content">
            <div id="current-content">
              <div id="current-img">
                <img src={programming} alt="" height='215px'/>
              </div>
              <div id="current-desc">
                <h1> Current work </h1>
                <a> Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis alias sunt fugiat, repudiandae vel ea veritatis nihil et nobis aperiam officia voluptates accusamus at excepturi est! Quam harum earum tenetur.</a>
              </div>
            </div>

            <div id="past-content">
                <div id="past-desc">
                <h1>What we have done</h1>
                <a> We have made it possible for our customers to stay securly connected wherever they may be. This was done using the modern technologies as well as AI's in order to obtain ultimate security, which is important for us. Examples on where this has been implemented are in drones, smartphones, smartwatches and even Virtual Reality (VR). 
                </a>
              </div>

            
              <div id="slideshow-container">
              <Slide easing="ease" autoplay={false} indicators={true}>
              <div class="slide-img">
                <div onClick={() => setCountFirst(countFirst + 1)} style={{'backgroundImage': `url(${slideImage1})`}}>
                  <span>{firstVar}</span>
                </div>
              </div>
              <div class="slide-img">
                <div onClick={() => setCountSecond(countSecond + 1)} style={{'backgroundImage': `url(${slideImage2})`}}>
                  <span>{secondVar}</span>
                </div>
              </div>
              <div class="slide-img">
                <div onClick={() => setCountThird(countThird + 1)} style={{'backgroundImage': `url(${slideImage3})`}}>
                  <span>{thirdVar}</span>
                </div>
              </div>
              <div class="slide-img">
                <div onClick={() => setCountFourth(countFourth + 1)} style={{'backgroundImage': `url(${slideImage4})`}}>
                  <span>{fourthVar}</span>
                </div>
              </div>
              </Slide>
            </div>
          </div>
            
            <div id="future-content">
              <h1>Future Plans</h1>
              <a>For future plans, we plan to reach the sky with our technology and security. Which can happen by the use of artifical intelligent and advanced programming with help from our professional programmers. We plan on broadening our research area even more to reach every aspect of it and obtain complete security.</a>
              <div id="future-left">
                <div id="future-left-top"><img src={futurePlans3} alt="" height='100%' width='100%'/></div>
                <div id="future-left-bottom"><img src={futurePlans1} alt="" height='100%' width='100%'/></div>
              </div>
              <div id="future-right"><img src={futurePlans2} alt="" height='100%' width='100%'/></div>
            </div>

          </div>
        </div>
      
    )
}