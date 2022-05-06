import React from 'react';
import {Slide} from 'react-slideshow-image';
import { useEffect} from 'react';
import './Company.css';
import { importImage } from '../SharedFunctions';
import Variables from '../../json/OurWork.json';


{
  // var Variables = jsonData.our_work;

  //----------- puzzle related strings

  var puzzleVar  = Variables.puzzle_var;

  var crackedUsername = Variables.username;


  //---------- header title

  var headerTitle = Variables.header_title;

  
  //-------------paragraph title, text & images

  var firstParagraphTitle = Variables.first_paragraph.title;
  var secondParagraphTitle = Variables.second_paragraph.title;
  var thirdParagraphTitle = Variables.third_paragraph.title;

  var firstParagraphText = Variables.first_paragraph.text;
  var secondParagraphText = Variables.second_paragraph.text;
  var thirdParagraphText = Variables.third_paragraph.text;

  var firstParagraphImage   = importImage(Variables.first_paragraph.image);

  //----------- images

  var images = Variables.images;

  var header        = importImage(images.header);
  var slideImage1   = importImage(images.slideImages[0]);
  var slideImage2   = importImage(images.slideImages[1]);
  var slideImage3   = importImage(images.slideImages[2]);
  var slideImage4   = importImage(images.slideImages[3]);
  var slideImage5   = importImage(images.slideImages[4]);
  var futurePlans1  = importImage(images.futurePlans[0]);
  var futurePlans2  = importImage(images.futurePlans[1]);
  var futurePlans3  = importImage(images.futurePlans[2]);
  
  // Variables used within the code
  var attempt = puzzleVar.charAt(0);
  var code = puzzleVar;
  
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
                <img src={firstParagraphImage} alt="" height='215px'/>
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

              <div id="slideshow-container">
              <Slide easing="ease" autoplay={false} indicators={true}>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage1})`}}>
                </div>
              </div>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage2})`}}>
                </div>
              </div>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage3})`}}>
                </div>
              </div>
              <div class="slide-img">
                <div style={{'backgroundImage': `url(${slideImage4})`}}>

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
          {clearConsole()}
        </div>
      
    )
}

document.body.addEventListener('click', puzzle, true);

function clearConsole(){
        console.clear();
}

/*
This function checks if the user has pressed anywhere on screen,
then checks which slide is active,
then adds this slide to attempt, (this means that the mouse press is one slide behind)
if the attempt went the wrong way or overstepped then attempt is reset,
the player must cycle from right to left to right ... until completed.
*/
function puzzle() {
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

    if(attempt == code.slice(0,attempt.length )){
        if(currentSlide == code.charAt(code.length - 2)){
            //insert code that checks to see if player lands on code.length - 1
        }
        //if statements change depending on if the player goes forward or backwards
        if(codePrevIndex < codeCurIndex ){
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
      console.log(crackedUsername);
    }
}