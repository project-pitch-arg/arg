import React from 'react';
import { useEffect } from 'react';
import './Company.css';

import { ABOUT_US_HEADER, ENVIRONMENT_IMAGE, GOALS_IMAGE, EMPLOYEES_IMAGES} from '../ImageImports';

const jsonData = require('../json/companyWebsite.json');

{
  var aboutUs = jsonData.about_us;


  //---------- header title

  var headerTitle = aboutUs.header_title;

  
  //----------- paragraph title and text

  var firstParagraphTitle = aboutUs.first_paragraph.title;
  var secondParagraphTitle = aboutUs.second_paragraph.title;

  var firstParagraphText = aboutUs.first_paragraph.text;
  var secondParagraphText = aboutUs.second_paragraph.text;


  //----------- images

  var aboutUsHeaderImg = ABOUT_US_HEADER;
  var environmentImg = ENVIRONMENT_IMAGE;
  var goalsImg = GOALS_IMAGE;
  var christianImg = EMPLOYEES_IMAGES[0];
  var eloiseImg = EMPLOYEES_IMAGES[1];
  var georgeImg = EMPLOYEES_IMAGES[2];
  var lyraImg = EMPLOYEES_IMAGES[3];
  var madeleineImg  = EMPLOYEES_IMAGES[4];
  var manuelImg = EMPLOYEES_IMAGES[5];
  var markImg = EMPLOYEES_IMAGES[6];
  var summerImg = EMPLOYEES_IMAGES[7];
}
export default function AboutUs() {
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return(

        <div>
          <div class="header"style={{backgroundImage: `url(${aboutUsHeaderImg})`}}>
            <h1> {headerTitle} </h1>
          </div>

          <div class="content">

            <div class="content-right-content">
              <div class="content-right-img"><img src={goalsImg}/> </div>
              <div class="content-right-desc">
                <h2> {firstParagraphTitle} </h2>
                <a> {firstParagraphText} </a>
              </div>
            </div>

            <div class="content-left-content">
             <div class="content-left-img"><img src={environmentImg}/></div>
              <div class="content-left-desc">
                <h2> {secondParagraphTitle} </h2>
                <a> {secondParagraphText} </a>
              </div>
            </div>

          </div>

          <div class="content">

                <h2 style={{"margin": "70px"}}>Our Team</h2>
              <div id="team-content">
                <div class="team-member"><img src={markImg}/><a>Mark Roswell</a></div>
                <div class="team-member"><img src={manuelImg}/><a>Manuel Mallory</a></div>
                <div class="team-member"><img src={georgeImg}/><a>George Caroll</a></div>
                <div class="team-member"><img src={christianImg}/><a>Christian Yates</a></div>
              </div>

              <div id="team-content">
                  <div class="team-member"><img src={summerImg}/><a>Summer Morton</a></div>
                  <div class="team-member"><img src={madeleineImg}/><a>Madeleine Baldwin</a></div>
                  <div class="team-member" ><img src={lyraImg} class = "lyra_img"/><a>Lyra Bell</a></div>
                  <div class="team-member"><img src={eloiseImg}/><a>Eloise Christensen</a></div>
               </div>
          </div>
            {clearConsole()}
        </div>
    )
}
function clearConsole(){
        console.clear();
    }