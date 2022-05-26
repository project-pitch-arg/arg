import React, { useEffect } from "react";
import "./TopBar.css";
import {Link} from "react-router-dom";
import Variables from "../JSONDocuments/ChangeableValues.json";

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
            case Variables.tabNames[1]:
                document.getElementById("tab-posts").classList.add("active");
            break;
            case Variables.tabNames[2]:
                document.getElementById("tab-chat").classList.add("active");
            break;
            case Variables.tabNames[3]:
                document.getElementById("tab-Quotes").classList.add("active");
            break ;
            case Variables.tabNames[4]:
                document.getElementById("tab-about").classList.add("active");
            break;    
            default: break;   
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
            <div className="topbar">
              <ul id="topbar-ul">
                <li className="topbar-li"><Link id="tab-home" onClick={() => HIGHLIGHT_ACTIVE("")} to ="/"> {Variables.tabNames[0]} </Link></li>
                <li className="topbar-li"><Link id="tab-posts" onClick={() => HIGHLIGHT_ACTIVE("Posts")} to ={"/" + Variables.tabNames[1]}> {Variables.tabNames[1]}</Link></li>
                <li className="topbar-li"><Link id="tab-chat" onClick={() => HIGHLIGHT_ACTIVE("Chat")} to ={"/" + Variables.tabNames[2]}> {Variables.tabNames[2]} </Link></li>
                <li className="topbar-li"><Link id="tab-Quotes" onClick={() => HIGHLIGHT_ACTIVE("Quotes")} to ={"/" + Variables.tabNames[3]}> {Variables.tabNames[3]} </Link></li>
                <li className="topbar-li"><Link id="tab-about" onClick={() => HIGHLIGHT_ACTIVE("About")} to ={"/" + Variables.tabNames[4]}> {Variables.tabNames[4]} </Link></li>
              </ul>
            </div>
        )
    }