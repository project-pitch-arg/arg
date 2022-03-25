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
            
            <div class="content-right-content">
              <div class="content-right-img">
                <img  onClick={() => clickFirstImg("1")} src={introImg} height='215px'/>
              </div>
              <div class="content-right-desc">
                <h1> What we do </h1>
                <a>
                    We combine the latest AI and surveillance technology to provide our customers with the
                    highest levels of security. We start by setting up equipment around your area which then connects to our servers here at
                    Rozk AI. This equipment lets us monitor and observe potential threats against you or your company. If a threat
                    is deemed actionable our elite security guards will be at your location before the perpetrators do anything.

                </a>
              </div>
            </div>

            <div class="content-right-content">
                <div class="content-left-desc">
                  <h1>Why choose us?</h1>
                  <a>
                    In Rozk AI our customers safety is our top priority and we have the data to back it up.
                    Since our launch in 2013 all attempted robberies, while using our service, got stopped
                     or the people involved got caught and prosecuted. Our unique technology allows for methods of identification
                     that no other company possesses. We also use advanced behavioural methods that let us predict dangerous
                     situations ahead of time.

                  </a>
                </div>

          
              <div class="content-right-desc">
                  <h1>How does AI integrate with surveillance?</h1>
                  <a>
                    Artificial intelligence is complicated but our engineers here at Rozk AI have come up with a method
                    of collaboration that lets our technology utilize AI to analyze captured footage. This analysis lets us know if
                    there is any unusual activity going on and if we should act upon it.

                  </a>
                </div>
            </div>

            <div id="tech-content">
              <h1>Indirect Protection</h1>
              <a>
              Ever since our launch crime rates have steadily been going down for companies that fly our banner outside. The
              results speak for themselves. Criminals are starting to become aware of our success rate and no longer want to take
              the risk. As our reputation grows crime rates will fall.

              </a>
              <div class="tech-img"><img  onClick={() => clickImg("1")} src={techImg1}/></div>
              <div class="tech-img"><img  onClick={() => clickImg("2")} src={techImg2}/></div>
              <div class="tech-img"><img  onClick={() => clickImg("3")} src={techImg3}/></div>
            </div>
          </div>
        </div>

      )

    }
    function clickImg(string){
        console.clear();
        console.log(string);
        attempt = attempt + string;
        if(attempt.charAt(attempt.length - 1) !== passphrase.charAt(attempt.length -1)){
            attempt = "";
        }

        if (attempt === passphrase ){
                console.log("/kpxtzjmyq");
        }
    }
    function clickFirstImg(){
        console.clear();
        console.log(passphrase);
    }

