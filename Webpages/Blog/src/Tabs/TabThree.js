import React, { useState } from 'react';
import './TabContent.css';
import PostContent from './PostContent.js';

var StartNr = 1;
var LastNr = 4;



export default function Posts() {
  const[start, startChange] = useState(0);
  const[last, lastChange] = useState(10);
  const Content = PostContent();
  
  function prevPage() {
    if (start-10 < 0) {
      resetLimit();
    } 
    else {
      lastChange(last-10);
      startChange(start-10);
    }
  }

  function nextPage() {
    if(Content.length > last+10) {
      lastChange(last+10);
      startChange(start+10);
    }
    else if (Content.length > start+10) {
      startChange(start+10);
      lastChange(Content.length);
    } 
  }
  function resetLimit() {
    lastChange(10);
    startChange(0);
  }
  return (
      <div class="background">  
        <button onClick={prevPage}> PREV </button>   
         <div class="postlist">
         {(Content.slice(start,last)).map(item => {
            return (
          <div class="post">
            <div class="post-date">
              {item.date}
            <div class="post-name"> 
              {item.name} 
            <div class="post-content">
             {item.content}
            </div>
            <div class="post-img">
             {item.image}
            </div>  
           </div>
         </div>
       </div>
      )
      })}
         </div>
         <button onClick={nextPage}> NEXT </button>
         <button onClick={resetLimit}> RESET</button> 
      </div>
    )
}

function ChangePosts() {
  StartNr = 5;
  LastNr = 6;
  window.location.reload(false);
  return
}

