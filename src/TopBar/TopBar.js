import React, { useState, useEffect } from 'react';
import './TopBar.css';
import {Link} from "react-router-dom";


export default function TopBar(props) {

    const highlightActive = (path) => {
        var oldActiveElements = document.getElementsByClassName('active');
        if (oldActiveElements.length > 0) {
          for (let elem of oldActiveElements){
              elem.classList.remove('active');
            }
          } 
    
        switch (path) {
            case '':
                document.getElementById("tab-home").classList.add('active');
            break;
            
            case 'OurWork':
                document.getElementById("tab-our-work").classList.add('active');
            break;

            case 'AboutUs':
                document.getElementById("tab-about-us").classList.add('active');
            break;
            
            case 'Four':
                document.getElementById("tab-four").classList.add('active');
            break;
                
            case 'FourOne':
                document.getElementById("tab-four-one").classList.add('active');
            break    
                
            case 'FourTwo':
                document.getElementById("tab-four-two").classList.add('active');
            break    
                
            case 'FourThree':
                document.getElementById("tab-four-three").classList.add('active');
            break    
          
            default:
                console.log("no such path")
        }
      }
    
      useEffect(() => {
        var path = window.location.pathname.split("/")[1];
    
        highlightActive(path)
      })

      const hideBackground = () => {
        if (window.scrollY >= 100) {
            var classes = document.getElementsByClassName("topbar");
            for (var i = 0; i < classes.length; i++) {
                classes[i].style.background = "#333";
              }                            
        } else {
            var classes = document.getElementsByClassName("topbar");
            for (var i = 0; i < classes.length; i++) {
                classes[i].style.background = "transparent";
            } 
        }
      }

      window.addEventListener('scroll', hideBackground);
    
      return (
            <div class='topbar'>
              <ul id='topbar-ul'>
                <li class='topbar-li'><Link id="tab-home" onClick={() => highlightActive('')} to ='/'> Home </Link></li>
                <li class='topbar-li'><Link id="tab-our-work" onClick={() => highlightActive('OurWork')} to ='/OurWork'> Our Work </Link></li>
                <li class='topbar-li'><Link id="tab-about-us" onClick={() => highlightActive('AboutUs')} to ='/AboutUs'> About Us</Link></li>
                <li>
                    <div class="dropdown">
                    <button class="dropdown-button">Four</button>
                    <div class="dropdown-content">
                        <Link id="tab-four-one" onClick={() => highlightActive('FourOne')} to ='/FourOne'> One </Link>
                        <Link id="tab-four-two" onClick={() => highlightActive('FourTwo')} to ='/FourTwo'> Two </Link>
                        <Link id="tab-four-three" onClick={() => highlightActive('FourThree')} to ='/FourThree'> Three </Link>
                        </div>
                    </div> 
                </li>
              </ul>
            </div>
        )
    }