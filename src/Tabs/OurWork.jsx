import React from 'react';
import {Slide} from 'react-slideshow-image';
import './Company.css';
import { useEffect, useState } from 'react';

import header from '../img/work-header.jpg';
import programming from '../img/programming.jpg';

import slideImage1 from '../img/slideImage1.jpg';
import slideImage2 from '../img/slideImage2.jpg';
import slideImage3 from '../img/slideImage3.jpg';
import slideImage4 from '../img/slideImage4.jpg';

import futurePlans1 from '../img/future-ai.jpg'
import futurePlans2 from '../img/space-shuttle.jpg'
import futurePlans3 from '../img/robotic-future.jpg'
const jsonData= require('../data.json');

{
  var firstVar  = jsonData['our-work'].puzzle_var.first_var;
  var secondVar = jsonData['our-work'].puzzle_var.second_var;
  var thirdVar  = jsonData['our-work'].puzzle_var.third_var;
  var fourthVar = jsonData['our-work'].puzzle_var.fourth_var;

  var crackedPassword = jsonData['our-work'].cracked_password;
}


export default function OurWork() {
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    const [countFirst, setCountFirst]   = useState(0);
    const [countSecond, setCountSecond] = useState(0);
    const [countThird, setCountThird]   = useState(0);
    const [countFourth, setCountFourth] = useState(0);

    const counted = [countFirst, countSecond, countThird, countFourth];
    const countCode = [firstVar, secondVar, thirdVar, fourthVar];

    
    var codeCracked = false;
    
    const checkCodeCracked = () => {
      if (JSON.stringify(counted) === JSON.stringify(countCode)) {
        codeCracked = true;
      }

      if (codeCracked) {
        console.log(crackedPassword);
      }
    }
    
    const checkHigherBound = () => {
      var n = 0;
      
      for (let i = 0; i < counted.length; i++) {
        if (counted[i] > countCode[i]) {
          n++;
        } 
      }

      if (n >= 1) {
        resetCount();
      }
    }    
    
    const onClickFirst = () => {
      if (countSecond >= 1 || countThird >= 1 || countFourth >= 1) {
        resetCount();
      }
      setCountFirst(countFirst + 1);
    }

    const resetCount = () => {
        setCountFirst(0);
        setCountSecond(0);
        setCountThird(0);
        setCountFourth(0);
    }

    checkCodeCracked();
    checkHigherBound();    
    
    return (
        <div>
          <div class="header" style={{backgroundImage: `url(${header})`}}>
            <h1 style={{opacity: '100%'}}>Our Work</h1>
          </div>

          <div class="content">
            <div class="content-right-content">
              <div class="content-right-img">
                <img src={programming} alt="" height='215px'/>
              </div>
              <div class="content-right-desc">
                <h2> Current work </h2>
                <a> Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis alias sunt fugiat, repudiandae vel ea veritatis nihil et nobis aperiam officia voluptates accusamus at excepturi est! Quam harum earum tenetur.</a>
              </div>
            </div>

            <div class="content-left-content">
                <div class="content-left-desc">
                <h2>What we have done</h2>
                <a> We have made it possible for our customers to stay securly connected wherever they may be. This was done using the modern technologies as well as AI's in order to obtain ultimate security, which is important for us. Examples on where this has been implemented are in drones, smartphones, smartwatches and even Virtual Reality (VR). 
                </a>
              </div>

            
              <div class="slideshow-container">
              <Slide easing="ease" autoplay={true} indicators={true}>
              <div class="slide-img">
                <div onClick={() => onClickFirst()} style={{'backgroundImage': `url(${slideImage1})`}}>
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
         
            <div class="center-content">
              <h2>Future Plans</h2>
              <a>For future plans, we plan to reach the sky with our technology and security. Which can happen by the use of artifical intelligent and advanced programming with help from our professional programmers. We plan on broadening our research area even more to reach every aspect of it and obtain complete security.</a>
            </div>

            <div>
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