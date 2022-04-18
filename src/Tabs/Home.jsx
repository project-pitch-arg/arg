import React from 'react';
import { useEffect } from 'react';
import './Company.css';
import 'react-slideshow-image/dist/styles.css';

import { HOME_HEADER, INTRO_IMAGE, TECH_IMAGES } from '../ImageImports';

const jsonData = require('../json/companyWebsite.json');

{
    //---------- puzzle related strings

    var home = jsonData.home
    var passphrase = home.passphrase;
    var encryptedEmail = home.encrypted_email;
    var attempt = "";

    //---------- paragraph texts

    var firstParagraph = home.first_paragraph_text;
    var secondParagraph = home.second_paragraph_text;
    var thirdParagraph = home.third_paragraph_text;
    var fourthParagraph = home.fourth_paragraph_text;

    //------------ images from imageImport file

    var header = HOME_HEADER;
    var introImg = INTRO_IMAGE;
    var techImg1 = TECH_IMAGES[0];
    var techImg2 = TECH_IMAGES[1];
    var techImg3 = TECH_IMAGES[2];

}

export default function Home() {
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
        <div>
          <div class="header" style={{backgroundImage: `url(${header})`}}>
            <h1>Difax</h1>
          </div>

          <div class="content">
            
            <div class="content-right-content">
              <div class="content-right-img">
                <img  onClick={() => clickFirstImg("1")} src={introImg} height='215px'/>
              </div>
              <div class="content-right-desc">
                <h2> What we do </h2>
                <a> {firstParagraph} </a>
              </div>
            </div>

            <div class="content-right-content">
                <div class="content-left-desc">
                  <h2>Why choose us?</h2>
                  <a> {secondParagraph} </a>
                </div>

          
              <div class="content-right-desc">
                  <h2>How does AI integrate with surveillance?</h2>
                  <a> {thirdParagraph} </a>
                </div>
            </div>

            <div class="center-content">
              <h2>Indirect Protection</h2>
              <a> {fourthParagraph}</a>
            </div>
              <div id="center-homepage-img">
                <div class="homepage-img"><img  onClick={() => clickImg("1")} src={techImg1}/></div>
                <div class="homepage-img"><img  onClick={() => clickImg("2")} src={techImg2}/></div>
                <div class="homepage-img"><img  onClick={() => clickImg("3")} src={techImg3}/></div>
              </div>
            
          </div>
        </div>

      )

    }
    function clickImg(string){
        console.clear();
        attempt = attempt + string;
        if(attempt.charAt(attempt.length - 1) !== passphrase.charAt(attempt.length -1)){
            attempt = "";
        }

        if (attempt === passphrase ){
                console.log(encryptedEmail);
                attempt = "";
        }
    }
    function clickFirstImg(){
        console.clear();
        console.log(passphrase);
    }

