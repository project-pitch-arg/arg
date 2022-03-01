import React from 'react';
import './Company.css';
import { useEffect } from 'react';

import teamMember from '../img/team-member.png';

import aboutUsHeaderImg from '../img/about-us.jpg';
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
  /*
    return (
        <div>
          <div class="header">
            <a>About Us</a>
          </div>
          <div class="content">
            <div id="team-content">
              <h1>Who are we?</h1>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
            </div>   
          </div>
        </div>
      
    )
    */
    return(

        <div>
          <div class="aboutUs-header"style={{backgroundImage: `url(${aboutUsHeaderImg})`}}>
            <a>About Us</a>
          </div>

          <div class="aboutUs-section">

            <div class="aboutUs-content">
              <div id="aboutUs-goals-img"><img src={goalsImg} height='215px'/> </div>
              <div id="aboutUs-goals-desc">
                <h1> Our Goals </h1>
                <a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </a>
              </div>
            </div>



            <div class="aboutUs-content">
             <div id="aboutUs-environment-img"><img src={environmentImg}/></div>
              <div id="aboutUs-env-desc">
                <h1>Sustainable Practices</h1>
                <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </a>
              </div>
            </div>

            <div id="tech-content">
              <h1>Why Work with us?</h1>
              <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut</a>
            </div>
          </div>

          <div class="content">

              <div id="team-content">
                <h1>Who are we?</h1>
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