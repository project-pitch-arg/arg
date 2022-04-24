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
    var fifthVar = ourWork.puzzle_var.fifth_var;

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

{

  // Variables used within the code (will be moved to json later)
  var attempt = firstVar;
  var code = firstVar + secondVar + thirdVar + fourthVar + fifthVar;
  var prevSlideIndex = 0;
  var currentSlideIndex = 0;
  var timerActive = false;
  var codeCracked = false;
  var timer = 5;
  var myTimeout;
  
}

  export default function OurWork() {
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    
    return (
        <div id = "firstDiv">
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

            
              <div /*onClick={() => onslideShowClick()}*/ id="slideshow-container">
              <Slide easing="ease" autoplay={false} indicators={true}>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage1})`}}>
                  {/* <span id="first-span">{firstVar-countFirst}</span> */}
                </div>
              </div>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage2})`}}>
                  {/* <span id="second-span">{secondVar-countSecond}</span> */}
                </div>
              </div>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage3})`}}>
                  {/* <span id="third-span">{thirdVar-countThird}</span> */}
                </div>
              </div>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage4})`}}>
                  {/* <span id="fourth-span">{fourthVar-countFourth}</span> */}
                </div>
              </div>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage5})`}}>
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
document.body.addEventListener('click', mouseUp, true);
function mouseUp() {
    try {
          var currentSlide1 = document.getElementById("slideshow-container").getElementsByClassName("active")[0].getAttribute("data-index");
    } catch (error) {
    }
    if(currentSlide1 === null){
        currentSlide1 = 0;
    }
    var currentSlide = parseInt(currentSlide1) + 1;
    var codePrevIndex = code.charAt(attempt.length -1);
    var codeCurIndex = code.charAt(attempt.length);

    /* Debugging logs
    console.log("codeCharAt - 1 = " + code.charAt(attempt.length - 1));
    console.log("codeCharAt = " + code.charAt(attempt.length ));
    console.log("current slide " + currentSlide);
    console.log("sliced code:" + code.slice(0,attempt.length ));
    console.log("length:" + attempt.length);
    */

    if(attempt == code.slice(0,attempt.length )){
            if(codePrevIndex < codeCurIndex ){ //changes depending on if the player goes forward or backwards
                if(currentSlide >= codePrevIndex && currentSlide <= codeCurIndex ){
                    if(codeCurIndex == currentSlide){
                        attempt += currentSlide;
                    }
                }
                else{
                    attempt = String(currentSlide);
                }
            }
            else if(codePrevIndex > codeCurIndex ){
                if(currentSlide <= codePrevIndex && currentSlide >= codeCurIndex ){
                    if(codeCurIndex == currentSlide){
                        attempt += currentSlide;
                    }
                }
                else{
                    attempt = String(currentSlide);
                }
            }
    }
    else{
        attempt = String(currentSlide);
    }

    if (attempt === code) {
      console.log("Edmund Schmidt")
    }
}
/*
function checkCodeCracked() {
if (attempt == code) {
    codeCracked = true;
  }

  if (codeCracked) {
    //console.log(crackedUsername);
    // resetCount();
  }
}

function resetCount() {
  counted = [];
}

function startTimer() {
  //console.log("Timer started");
  if (!timerActive) {
    timerActive = true;
    timer = setTimeout(callOnTimeout, 5000);
  }
}

function stopTimer() {
  //console.log("Timer stopped");
  clearTimeout(timer);
  timerActive = false;
}



function callOnTimeout() {
  //console.log("Timer reached 0");
}

function checkSlideChanged() {
  var currentSlide = document.getElementById("slideshow-container").getElementsByClassName("active")[0].getAttribute("data-index");
  
  //console.log("Slide Changed to: " + (currentSlide === null ? 0 : currentSlide));

  if (parseInt(currentSlide)+1 == countCode[counted.length]) {
    stopTimer(myTimeout);
    //console.log("Timer stopped!");
    timerActive = false;
    // const time

    counted += parseInt(currentSlide)+1;
    //console.log("CorrectList: ("+ counted + ")");
    checkCodeCracked();
  }
}

function onslideShowClick() {
  var slideContainer = document.getElementById("slideshow-container");
  
  if (slideContainer !== null) {
    currentSlideIndex = slideContainer.getElementsByClassName("active")[0].getAttribute("data-index");
    if (currentSlideIndex == null) currentSlideIndex = 0;
  }

  if (currentSlideIndex === prevSlideIndex) {
    //console.log("Still on the same slide (" + currentSlideIndex + ")");
    stopTimer();
    checkSlideChanged();
    setTimeout(function() { checkSlideChanged() }, 3000);
  }
  else {
    //console.log("Switched slides")
    checkSlideChanged()
    // startTimer();
    prevSlideIndex = currentSlideIndex;
  }
}
*/