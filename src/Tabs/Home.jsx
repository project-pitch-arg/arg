import React from 'react';
import { useEffect } from 'react';
import './Company.css';
import 'react-slideshow-image/dist/styles.css';

import { HOME_HEADER, INTRO_IMAGE, TECH_IMAGES } from '../ImageImports';

const jsonData = require('../data.json');


{
    var home = jsonData.home
    var passphrase = home.passphrase;
    var URL = home.URL;
    var attempt = "";

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
                <a>
                    We combine the latest AI and surveillance technology to provide our customers with the
                    highest levels of security. We start by setting up equipment around your area which then connects to our servers here at
                    Difax. This equipment lets us monitor and observe potential threats against you or your company. If a threat
                    is deemed actionable our elite security guards will be at your location before the perpetrators can do anything.

                </a>
              </div>
            </div>

            <div class="content-right-content">
                <div class="content-left-desc">
                  <h2>Why choose us?</h2>
                  <a>
                    Our customers safety is our top priority and we have the data to back it up.
                    All attempted robberies of our customers, since our launch in 2013, have either been stopped or
                    the people involved have been caught and prosecuted. In either situation our customers have been able to claim insurance
                    leaving them in a beneficial situation. Our unique technology allows for methods of identification
                     that no other company possesses. We also use advanced behavioural methods that let us predict dangerous
                     situations ahead of time.

                  </a>
                </div>

          
              <div class="content-right-desc">
                  <h2>How does AI integrate with surveillance?</h2>
                  <a>
                    Artificial intelligence is complicated but our engineers here at Difax have come up with a method
                    of collaboration that lets our technology utilize AI to analyze captured footage. This analysis lets us know if
                    there is any unusual activity going on and if we should act upon it.

                  </a>
                </div>
            </div>

            <div class="center-content">
              <h2>Indirect Protection</h2>
              <a>
              Companies that fly our banner have noticed a steady decrease in crime ever since they partnered with us.
              The results speak for themselves.
              Criminals are starting to become aware of our success rate and no longer willing to take
              the risk of going against us.
              As our reputation grows crime rates fall and will continue to fall.

              </a>
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
        console.log(string);

        attempt = attempt + string;
        if(attempt.charAt(attempt.length - 1) !== passphrase.charAt(attempt.length -1)){
            attempt = "";
        }

        if (attempt === passphrase ){
                console.log(URL);
                attempt = "";
        }
        console.log(attempt);
    }
    function clickFirstImg(){
        console.clear();
        console.log(passphrase);
    }

