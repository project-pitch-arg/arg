import React from 'react';
import './TabContent.css';

export default function displayChat() {
    return (

        // Implements the chat according to the seperate system 'chat'.
        // See the chat folder's code for details.
       <div class='chat-area'>
         <iframe class="chat" src="http://localhost:3001/"></iframe>
        </div> 
      
    )
}