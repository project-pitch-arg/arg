import React from 'react';
import { Slide } from 'react-slideshow-image';
import './Home.css';
import 'react-slideshow-image/dist/styles.css';

import introImg from '../img/intro-img.jpg';
import teamMember from '../img/team-member.png';

import goalImg from '../img/goal-img.jpg';
import techImg1 from '../img/eye-tech.jpg';
import techImg2 from '../img/brain-tech.jpg';
import techImg3 from '../img/thinking-ai.jpg';

import slideImage1 from '../img/nobel-prize.jpg';
import slideImage2 from '../img/tablet.png';
import slideImage3 from '../img/smartphone.jpg';


export default function Home() {
    return (
        <div id="homepage">
          <div id="header">
            <a>Evil Company</a>
          </div>

          <div id="home-content">
            
            <div id="intro-content">
              <div id="intro-img">
                <img src={introImg} height='215px'/>
              </div>
              <div id="intro-desc">
                <h1> We are the future </h1>
                <a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </a>
              </div>
            </div>

            <div id="team-content">
              <h1>Who are we?</h1>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
              <div class="team-member"><img src={teamMember}/><a>Name LastName</a></div>
            </div>

            <div id="goal-content">
              <div id="goal-img"><img src={goalImg}/></div>
          
              <div id="goal-desc">
                <h1>We are working on global domination</h1>
                <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </a>
              </div>
            </div>
            <div id="tech-content">
              <h1>Technology is power</h1>
              <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut</a>
              <div class="tech-img"><img src={techImg1}/></div>
              <div class="tech-img"><img src={techImg2}/></div>
              <div class="tech-img"><img src={techImg3}/></div>
            </div>

            <div id="work-content">
              <h1>Our work</h1>
              <div id="work-slideshow">
                <Slide easing="ease" autoplay={false}>
                <div class="slide-img">
                  <div style={{'backgroundImage': `url(${slideImage1})`}}>
                    <span>Nobel Prize</span>
                  </div>
                </div>
                <div class="slide-img">
                  <div style={{'backgroundImage': `url(${slideImage2})`}}>
                    <span>Tablet</span>
                  </div>
                </div>
                <div class="slide-img">
                  <div style={{'backgroundImage': `url(${slideImage3})`}}>
                    <span>Smartphone</span>
                  </div>
                </div>
                </Slide>
              </div>
            </div>
          </div>
        </div>
      
      )
    }