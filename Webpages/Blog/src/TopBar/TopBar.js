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
            
            case 'Chat':
                document.getElementById("tab-chat").classList.add('active');
            break;
            
            case 'Posts':
                document.getElementById("tab-posts").classList.add('active');
            break;
            
            case 'Four':
                document.getElementById("tab-four").classList.add('active');
            break;
                
            case 'FourOne':
                document.getElementById("tab-four-one").classList.add('active');
            break    
                
            case 'About':
                document.getElementById("tab-four-two").classList.add('active');
            break    
                
            case 'QotD':
                document.getElementById("tab-QotD").classList.add('active');
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
                <li class='topbar-li'><Link id="tab-chat" onClick={() => highlightActive('Chat')} to ='/Chat'> Chat </Link></li>
                <li class='topbar-li'><Link id="tab-posts" onClick={() => highlightActive('Posts')} to ='/Posts'> Posts</Link></li>
                {/* <li><Link id="tab-four" onClick={() => highlightActive('Four')} to = '/Four'> Four </Link></li> */}
                <li>
                    <div class="dropdown">
                    <button class="dropdown-button">Information</button>
                    <div class="dropdown-content">
                        <Link id="tab-four-one" onClick={() => highlightActive('FourOne')} to ='/FourOne'> FAQ </Link>
                        <Link id="tab-four-two" onClick={() => highlightActive('TabAbout')} to ='/TabAbout'> About </Link>
                        <Link id="tab-QotD" onClick={() => highlightActive('QotD')} to ='/QotD'> Quotes of the day </Link>
                        </div>
                    </div> 
                </li>
              </ul>
            </div>
        )
    }