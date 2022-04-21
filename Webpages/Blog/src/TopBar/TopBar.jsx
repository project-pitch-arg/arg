import React, { useEffect } from "react";
import "./TopBar.css";
import {Link} from "react-router-dom";


export default function TopBar(props) {

    // This is to change the color of a highlighted and non-highlighted item
    // by changing their class for CSS.
    const HIGHLIGHT_ACTIVE = (path) => {
        var oldActiveElements = document.getElementsByClassName("active");
        if (oldActiveElements.length > 0) {
          for (let elem of oldActiveElements){
              elem.classList.remove("active");
            }
          } 
    
        // This switch statement is included in the function and checks 
        // which button is currently the active one and highlights it.
        // By "active" I mean the tab that is currently being viewed.
        switch (path) {
            case "":
                document.getElementById("tab-home").classList.add("active");
        
            break;
            
            case "Chat":
                document.getElementById("tab-chat").classList.add("active");
            break;
            
            case "Posts":
                document.getElementById("tab-posts").classList.add("active");
            break;

            case "About":
                document.getElementById("tab-about").classList.add("active");
            break    
                
            case "Quotes":
                document.getElementById("tab-Quotes").classList.add("active");
            break    
        }
      }
    
      // This is a helper function to locate which tab is currently the active one.
      useEffect(() => {
        var path = window.location.pathname.split("/")[1];
    
        HIGHLIGHT_ACTIVE(path)
      })
    
      return (
          // This is a HTML statement to display the topbar and at the same time implement the above functions.
          // Various CSS classes help format and display the buttons available on the topbar.
            <div class="topbar">
              <ul id="topbar-ul">
                <li class="topbar-li"><Link id="tab-home" onClick={() => HIGHLIGHT_ACTIVE("")} to ="/"> Home </Link></li>
                <li class="topbar-li"><Link id="tab-posts" onClick={() => HIGHLIGHT_ACTIVE("Posts")} to ="/Posts"> Posts</Link></li>
                <li class="topbar-li"><Link id="tab-chat" onClick={() => HIGHLIGHT_ACTIVE("Chat")} to ="/Chat"> Chat </Link></li>
                <li class="topbar-li"><Link id="tab-Quotes" onClick={() => HIGHLIGHT_ACTIVE("Quotes")} to ="/Quotes"> Quotes </Link></li>
                <li class="topbar-li"><Link id="tab-about" onClick={() => HIGHLIGHT_ACTIVE("About")} to ="/About"> About </Link></li>
              </ul>
            </div>
        )
    }