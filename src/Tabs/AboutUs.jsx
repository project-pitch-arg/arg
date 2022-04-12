import React from 'react';
import { useEffect } from 'react';
import './Company.css';

import { ABOUT_US_HEADER, ENVIRONMENT_IMAGE, GOALS_IMAGE, EMPLOYEES_IMAGES} from '../ImageImports';

const jsonData = require('../data.json');

{
  var aboutUs = jsonData.about_us;

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
            <h1>About Us</h1>
          </div>

          <div class="content">

            <div class="content-right-content">
              <div class="content-right-img"><img src={goalsImg}/> </div>
              <div class="content-right-desc">
                <h2> Our Goals </h2>
                <a> Our primary goal is for all customers, those with and without financial stability,
                to feel safe. Listening to feedback and improving services is what we strive for.
                 If you ever need us for anything we will be by your side ready to help.
                 </a>
              </div>
            </div>



            <div class="content-left-content">
             <div class="content-left-img"><img src={environmentImg}/></div>
              <div class="content-left-desc">
                <h2>Sustainable Practices</h2>
                <a> We work hard to provide the best access to completely renewable products.
                Our central workforce works diligently to innovate new types of renewable systems.
                 We then use these throughout our development.
                 This means that from our code to our manufacturing, everything here is carefully
                  coordinated to be sustainable.
                  </a>
              </div>
            </div>

            <div class="center-content">
              <h2>Why Work with us?</h2>
              <a> At our company we value our employees and the ideas the they bring to the table.
              We strive for a work environment that is safe from prejudice, open for new ideas and equal for everyone.
              We guarantee you will love working for us, we hope to see you soon!
              </a>
            </div>
          </div>

          <div class="content">

                <h2>Who are we?</h2>
              <div id="team-content">
                <div class="team-member"><img src={markImg}/><a>Mark Roswell</a></div>
                <div class="team-member"><img src={manuelImg}/><a>Manuel Mallory</a></div>
                <div class="team-member"><img src={georgeImg}/><a>George Caroll</a></div>
                <div class="team-member"><img src={christianImg}/><a>Christian Yates</a></div>
              </div>

              <div id="team-content">
                  <div class="team-member"><img src={summerImg}/><a>Summer Morton</a></div>
                  <div class="team-member"><img src={madeleineImg}/><a>Madeleine Baldwin</a></div>
                  <div class="team-member"><img src={lyraImg}/><a>Lyra Bell</a></div>
                  <div class="team-member"><img src={eloiseImg}/><a>Eloise Christensen</a></div>
               </div>
          </div>
        </div>
    )
}