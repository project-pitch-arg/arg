import React from "react";
import "./TabContent.css";
import { CHAT_ADDRESS } from "../ChangeableValues";

export default function displayChat() {
    return (
        // Implements the chat according to the seperate system "chat".
        // See the chat folder's code for details.
       <div class="chat-area">
         <iframe class="chat" src={CHAT_ADDRESS}></iframe>
        </div> 
      
    )
}