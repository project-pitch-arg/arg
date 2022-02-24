import React from 'react';
import './TabContent.css';

export default function displayChat() {
    return (
       <div class='chat-area'>
         <iframe class="chat" src="http://localhost:3001/"></iframe>
        </div> 
      
    )
}