import React from 'react';
import {Slide} from 'react-slideshow-image';
import './Company.css';
import { useEffect, useState } from 'react';

import { OUR_WORK_HEADER, INTERACTION, SLIDE_IMAGES, FUTURE_PLANS } from '../ImageImports';

const jsonData = require('../json/companyWebsite.json');

{
    var ourWork = jsonData.our_work;

    //----------- puzzle related strings

    var firstVar  = ourWork.puzzle_var.first_var;
    var secondVar = ourWork.puzzle_var.second_var;
    var thirdVar  = ourWork.puzzle_var.third_var;
    var fourthVar = ourWork.puzzle_var.fourth_var;

    var crackedUsername = ourWork.username;
    var puzzleUnlocked = false;


    //---------- header title

    var headerTitle = ourWork.header_title;

    
    //-------------paragraph title and text

    var firstParagraphTitle = ourWork.first_paragraph.title;
    var secondParagraphTitle = ourWork.second_paragraph.title;
    var thirdParagraphTitle = ourWork.third_paragraph.title;

    var firstParagraphText = ourWork.first_paragraph.text;
    var secondParagraphText = ourWork.second_paragraph.text;
    var thirdParagraphText = ourWork.third_paragraph.text;


    //----------- images

    var header        = OUR_WORK_HEADER;
    var interaction   = INTERACTION;
    var slideImage1   = SLIDE_IMAGES[0];
    var slideImage2   = SLIDE_IMAGES[1];
    var slideImage3   = SLIDE_IMAGES[2];
    var slideImage4   = SLIDE_IMAGES[3];
    var slideImage5   = SLIDE_IMAGES[4];
    var futurePlans1  = FUTURE_PLANS[0];
    var futurePlans2  = FUTURE_PLANS[1];
    var futurePlans3  = FUTURE_PLANS[2];
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
        console.log(crackedUsername);
        resetCount();
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

    const onSlideClick = (slide) => {
      if (slide === "fifth") {
        puzzleUnlocked = true;
      }
      else if (puzzleUnlocked) {
        var currentSpan = document.getElementById(slide +"-span");
  
        currentSpan.style.color = "aqua";
        setTimeout(function() {
          currentSpan.style.color = "transparent";
        }, 300)
        
        switch (slide) {
          case "first":
            setCountFirst(countFirst+1);
            break;
        
          case "second":
            setCountSecond(countSecond+1);
            break;
            
          case "third":
            setCountThird(countThird+1);
            break;
            
          case "fourth":
            setCountFourth(countFourth+1);
            break;
              
        }
      }
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
            <h1> {headerTitle} </h1>
          </div>

          <div class="content">
            <div class="content-right-content">
              <div class="content-right-img">
                <img src={interaction} alt="" height='215px'/>
              </div>
              <div class="content-right-desc">
                <h2> {firstParagraphTitle} </h2>
                <a> {firstParagraphText} </a>
              </div>
            </div>

            <div class="content-left-content">
                <div class="content-left-desc">
                <h2> {secondParagraphTitle} </h2>
                <a> {secondParagraphText} </a>
              </div>

            
              <div class="slideshow-container">
              <Slide easing="ease" autoplay={true} indicators={true}>
              <div class="slide-img">
                <div onClick={() => onSlideClick("first")} style={{'backgroundImage': `url(${slideImage1})`}}>
                  <span id="first-span">{firstVar-countFirst}</span>
                </div>
              </div>
              <div class="slide-img">
                <div onClick={() => onSlideClick("second")} style={{'backgroundImage': `url(${slideImage2})`}}>
                  <span id="second-span">{secondVar-countSecond}</span>
                </div>
              </div>
              <div class="slide-img">
                <div onClick={() => onSlideClick("third")} style={{'backgroundImage': `url(${slideImage3})`}}>
                  <span id="third-span">{thirdVar-countThird}</span>
                </div>
              </div>
              <div class="slide-img">
                <div onClick={() => onSlideClick("fourth")} style={{'backgroundImage': `url(${slideImage4})`}}>
                  <span id="fourth-span">{fourthVar-countFourth}</span>
                </div>
              </div>
              <div class="slide-img">
                <div onClick={() => onSlideClick("fifth")} style={{'backgroundImage': `url(${slideImage5})`}}>
                </div>
              </div>
              </Slide>
            </div>
          </div>
         
            <div class="center-content">
              <h2> {thirdParagraphTitle} </h2>
              <a> {thirdParagraphText} </a>
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