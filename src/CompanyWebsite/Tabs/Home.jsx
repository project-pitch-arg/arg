import React from 'react';
import { useEffect } from 'react';
import './Company.css';
import 'react-slideshow-image/dist/styles.css';
import { importImage } from '../SharedFunctions';
import Variables from "../../json/Home.json";

{
    //---------- puzzle related strings

    // var Variables = jsonData.home
    var passphrase = Variables.passphrase;
    var encryptedEmail = Variables.encrypted_email;
    var attempt = "";


    //---------- header title

    var headerTitle = Variables.header_title;


    //---------- paragraph titles and texts

    var firstParagraphTitle = Variables.first_paragraph.title;
    var secondParagraphTitle = Variables.second_paragraph.title;
    var thirdParagraphTitle = Variables.third_paragraph.title;
    var fourthParagraphTitle = Variables.fourth_paragraph.title;

    var firstParagraphText = Variables.first_paragraph.text;
    var secondParagraphText = Variables.second_paragraph.text;
    var thirdParagraphText = Variables.third_paragraph.text;
    var fourthParagraphText = Variables.fourth_paragraph.text;

    //------------ images from imageImport file

    var images = Variables.images;

    var header = importImage(images.header);
    var introImg = importImage(Variables.first_paragraph.image);
    var techImg1 = importImage(images.techImages[0]);
    var techImg2 = importImage(images.techImages[1]);
    var techImg3 = importImage(images.techImages[2]);

}
function checkVariableParameters(){



    for (let i = 0; i < passphrase.length; i++) {
        if(parseInt(passphrase.charAt(i)) < 1 || parseInt(passphrase.charAt(i)) > 3){
            throw new Error("Home passphrase numbers must be between 1 and 3!");
        }
    }


}
export default function Home() {
    checkVariableParameters();
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])


    return (

        <div>
          <div class="header" style={{backgroundImage: `url(${header})`}}>
            <h1> {headerTitle} </h1>
          </div>

          <div class="content">
            
            <div class="content-right-content">
              <div class="content-right-img">
                <img  onClick={() => initializePuzzle("1")} src={introImg} height='215px'/>
              </div>
              <div class="content-right-desc">
                <h2> {firstParagraphTitle} </h2>
                <a> {firstParagraphText} </a>
              </div>
            </div>

            <div class="content-right-content">
                <div class="content-left-desc">
                  <h2> {secondParagraphTitle} </h2>
                  <a> {secondParagraphText} </a>
                </div>

          
              <div class="content-right-desc">
                  <h2> {thirdParagraphTitle} </h2>
                  <a> {thirdParagraphText} </a>
                </div>
            </div>

            <div class="center-content">
              <h2>{fourthParagraphTitle} </h2>
              <a> {fourthParagraphText} </a>
            </div>
              <div id="center-homepage-img">
                <div class="homepage-img"><img  onClick={() => imagePuzzle("1")} src={techImg1}/><i style={{"padding": "10px"}}>Image 1. A security camera</i></div>
                <div class="homepage-img"><img  onClick={() => imagePuzzle("2")} src={techImg2}/><i style={{"padding": "10px"}}>Image 2. A front door camera</i></div>
                <div class="homepage-img"><img  onClick={() => imagePuzzle("3")} src={techImg3}/><i style={{"padding": "10px"}}> Image 3. A security guard</i></div>
              </div>
        </div>
        {clearConsole()}
    </div>


      )

    }
    function clearConsole(){
        console.clear();
    }
    function imagePuzzle(string){
        clearConsole();
        attempt = attempt + string;

        //resets attempt if input is wrong
        if(attempt.charAt(attempt.length - 1) !== passphrase.charAt(attempt.length -1)){
            attempt = "";
        }

        if (attempt === passphrase ){
                console.log(encryptedEmail);
                attempt = "";
        }
    }
    function initializePuzzle(){
        clearConsole()
        var text = "";

        //splits up the passphrase with "-"
        for (let i = 0; i < passphrase.length; i++) {
            if(i == passphrase.length - 1){
                text += passphrase.slice(i, i + 1);
            }
            else{
                text += passphrase.slice(i, i + 1) + " - ";
            }

        }
        console.log(text);
    }

