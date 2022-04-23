import React from "react";
import "./TabContent.css";
import Variables from "../JSONDocuments/ChangeableValues.json";

export default function displayChat() {
    return (
        // Implements the chat according to the seperate system "chat".
        // See the chat folder's code for details.
       <div className="chat-area">
         <iframe title="chat" className="chat" src={Variables.chatAddress}></iframe>
        </div> 
      
    )
}
