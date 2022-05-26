import React from 'react';
import { useEffect } from 'react';
import './Company.css';
import { importImage } from '../SharedFunctions';
import Variables from '../../json/AboutUs.json';
import {basicFetchDataJson} from "../../InternalWebsite/Client/Client";




{
    //---------- header title

  var headerTitle = Variables.headerTitle;

  
  //----------- paragraph title, text & images

  var firstParagraphTitle = Variables.firstParagraph.title;
  var secondParagraphTitle = Variables.secondParagraph.title;
  
  var firstParagraphText = Variables.firstParagraph.text;
  var secondParagraphText = Variables.secondParagraph.text;
  
  var firstParagraphImage = importImage(Variables.firstParagraph.image);
  var secondParagraphImage = importImage(Variables.secondParagraph.image);


    //----------- images

  var images = Variables.images;

  var header = importImage(images.header);
  var christianImg = importImage(images.employees.christianYates);
  var eloiseImg = importImage(images.employees.eloiseChristensen);
  var georgeImg = importImage(images.employees.georgeCaroll);
  var lyraImg = importImage(images.employees.lyraBell);
  var madeleineImg = importImage(images.employees.madeleineBaldwin);
  var manuelImg = importImage(images.employees.manuelMallory);
  var markImg = importImage(images.employees.markRoswell);
  var summerImg = importImage(images.employees.summerMorton);
}

function checkVariableParameters(){
    //TODO add possible checks
}


export default function AboutUs() {
    checkVariableParameters();
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return(

        <div>
          <div class="header"style={{backgroundImage: `url(${header})`}}>
            <h1> {headerTitle} </h1>
          </div>

          <div class="content">

            <div class="content-right-content">
              <div class="content-right-img"><img src={secondParagraphImage}/> </div>
              <div class="content-right-desc">
                <h2> {firstParagraphTitle} </h2>
                <a> {firstParagraphText} </a>
              </div>
            </div>

            <div class="content-left-content">
             <div class="content-left-img"><img src={firstParagraphImage}/></div>
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