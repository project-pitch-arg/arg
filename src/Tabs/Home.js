import React from 'react';
import { useEffect } from 'react';
import './Company.css';
import 'react-slideshow-image/dist/styles.css';

import header from '../img/header.jpg';
import introImg from '../img/intro-img.jpg';

import goalImg from '../img/goal-img.jpg';
import techImg1 from '../img/eye-tech.jpg';
import techImg2 from '../img/brain-tech.jpg';
import techImg3 from '../img/thinking-ai.jpg';



export default function Home() {
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
        <div>
          <div class="header" style={{backgroundImage: `url(${header})`}}>
            <a>Evil Company</a>
          </div>

          <div class="content">
            
            <div id="intro-content">
              <div id="intro-img">
                <img src={introImg} height='215px'/>
              </div>
              <div id="intro-desc">
                <h1> We are the future </h1>
                <a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </a>
              </div>
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
          </div>
        </div>
      
      )
    }