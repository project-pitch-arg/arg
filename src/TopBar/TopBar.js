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
            
            case 'Two':
                document.getElementById("tab-two").classList.add('active');
            break;
            
            case 'Three':
                document.getElementById("tab-three").classList.add('active');
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
    
      return (
            <div class="topbar">
              <ul id='topbar-ul'>
                <li class='topbar-li'><Link id="tab-home" onClick={() => highlightActive('')} to ='/'> Home </Link></li>
                <li class='topbar-li'><Link id="tab-two" onClick={() => highlightActive('Two')} to ='/Two'> Two </Link></li>
                <li class='topbar-li'><Link id="tab-three" onClick={() => highlightActive('Three')} to ='/Three'> Three</Link></li>
                {/* <li><Link id="tab-four" onClick={() => highlightActive('Four')} to = '/Four'> Four </Link></li> */}
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