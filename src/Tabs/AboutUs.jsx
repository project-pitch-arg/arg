import React from 'react';
import './Company.css';
import { useEffect } from 'react';

import teamMember from '../img/team-member.png';

import aboutUsHeaderImg from '../img/aboutUsBackground.jpg';
import environmentImg from '../img/environment.jpg';
import goalsImg from '../img/goals.jpg';


import christianImg from '../img/christian-yates.jpg';
import eloiseImg from '../img/eloise-christensen.jpg';
import georgeImg from '../img/george-caroll.jpg';
import lyraImg from '../img/lyra-bell.jpg';
import madeleineImg from '../img/madeleine-baldwin.jpg';
import manuelImg from '../img/manuel-mallory.jpg';
import markImg from '../img/mark-roswell.jpg';
import summerImg from '../img/summer-morton.jpg';


export default function AboutUs() {
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return(

        <div>
          <div class="header"style={{backgroundImage: `url(${aboutUsHeaderImg})`, opacity: '60%'}}>
            <h1>About Us</h1>
          </div>

          <div class="content">

            <div class="content-right-content">
              <div class="content-right-img"><img src={goalsImg} height='215px'/> </div>
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