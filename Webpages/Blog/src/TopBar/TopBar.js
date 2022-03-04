import React, { useState, useEffect } from 'react';
import './TopBar.css';
import {Link} from "react-router-dom";


export default function TopBar(props) {

    // This is to change the color of a highlighted and non-highlighted item
    // by changing their class for CSS.
    const highlightActive = (path) => {
        var oldActiveElements = document.getElementsByClassName('active');
        if (oldActiveElements.length > 0) {
          for (let elem of oldActiveElements){
              elem.classList.remove('active');
            }
          } 
    
        // This switch statement is included in the function and checks 
        // which button is currently the active one and highlights it.
        // By 'active' I mean the tab that is currently being viewed.
        switch (path) {
            case '':
                document.getElementById("tab-home").classList.add('active');
        
            break;
            
            case 'Chat':
                document.getElementById("tab-chat").classList.add('active');
            break;
            
            case 'Posts':
                document.getElementById("tab-posts").classList.add('active');
            break;
            
            case 'Four':
                document.getElementById("tab-four").classList.add('active');
            break;

            case 'About':
                document.getElementById("tab-about").classList.add('active');
            break    
                
            case 'QotD':
                document.getElementById("tab-QotD").classList.add('active');
            break    
          
            default:
                console.log("no such path")
        }
      }
    
      // This is a helper function to locate which tab is currently the active one.
      useEffect(() => {
        var path = window.location.pathname.split("/")[1];
    
        highlightActive(path)
      })
    
      return (
          // This is a HTML statement to display the topbar and at the same time implement the above functions.
          // Various CSS classes help format and display the buttons available on the topbar.
            <div class="topbar">
              <ul id='topbar-ul'>
                <li class='topbar-li'><Link id="tab-home" onClick={() => highlightActive('')} to ='/'> Home </Link></li>
                <li class='topbar-li'><Link id="tab-posts" onClick={() => highlightActive('Posts')} to ='/Posts'> Posts</Link></li>
                <li class='topbar-li'><Link id="tab-chat" onClick={() => highlightActive('Chat')} to ='/Chat'> Chat </Link></li>
                {/* <li><Link id="tab-four" onClick={() => highlightActive('Four')} to = '/Four'> Four </Link></li> */}
                <li>
                    <div class="dropdown">
                    <button class="dropdown-button">Information</button>
                    <div class="dropdown-content">
                        <Link id="tab-about" onClick={() => highlightActive('About')} to ='/About'> About </Link>
                        <Link id="tab-QotD" onClick={() => highlightActive('QotD')} to ='/QotD'> Quotes of the day </Link>
                        </div>
                    </div> 
                </li>
              </ul>
            </div>
        )
    }

/* Not needed
    case 'FAQ':
        document.getElementById("tab-faq").classList.add('active');
    break 
    
    <Link id="tab-faq" onClick={() => highlightActive('FAQ')} to ='/FAQ'> FAQ </Link>   */