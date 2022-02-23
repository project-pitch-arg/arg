import React from 'react';
import './Company.css';
import { useEffect } from 'react';

import teamMember from '../img/team-member.png';

export default function AboutUs() {
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  
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
}