import React from 'react';
import { useEffect } from 'react';
import './Company.css';
import 'react-slideshow-image/dist/styles.css';

import header from '../img/header.jpg';
import introImg from '../img/intro-img.jpg';

import AIImg from '../img/AI_Image.jpg';
import techImg1 from '../img/eye-tech.jpg';
import techImg2 from '../img/brain-tech.jpg';
import techImg3 from '../img/thinking-ai.jpg';

{
    var passphrase = "3121";
    var attempt = "";
}

export default function Home() {
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
        <div>
          <div class="header" style={{backgroundImage: `url(${header})`}}>
            <a>Rozk AI</a>
          </div>

          <div class="content">
            
            <div id="intro-content">
              <div id="intro-img">
                <img  onClick={() => clickFirstImg("1")} src={introImg} height='215px'/>
              </div>
              <div id="intro-desc">
                <h1> What we do </h1>
                <a>
                    We combine the latest AI and surveillance technology to provide our customers with the
                    highest levels of security.

                </a>
              </div>
            </div>

            <div id="goal-content">
                <div id="home-left-desc">
                  <h1>Why choose us?</h1>
                  <a>

                  </a>
                </div>

          
              <div id="home-right-desc">
                  <h1>How does AI integrate with surveillance?</h1>
                  <a>

                  </a>
                </div>
            </div>

            <div id="tech-content">
              <h1>Technology is power</h1>
              <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut</a>
              <div class="tech-img"><img onClick={() => clickImg("1")} src={techImg1}/></div>
              <div class="tech-img"><img onClick={() => clickImg("2")} src={techImg2}/></div>
              <div class="tech-img"><img onClick={() => clickImg("3")} src={techImg3}/></div>
            </div>
          </div>
        </div>

      )

    }
    function clickImg(string){
        console.clear();
        console.log(string);
        attempt = attempt + string;
        if(attempt.charAt(attempt.length - 1) != passphrase.charAt(attempt.length -1)){
            attempt = "";
        }

        if (attempt == passphrase ){
                console.log("/kpxtzjmyq");
        }
    }
    function clickFirstImg(){
        console.clear();
        console.log(passphrase);
    }

