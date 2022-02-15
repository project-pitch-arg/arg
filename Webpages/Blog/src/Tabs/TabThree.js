import React, { useState } from 'react';
import './TabContent.css';
import PostContent from './PostContent.js';

export default function Posts() {
  const[start, startChange] = useState(0);
  const[last, lastChange] = useState(10);
  const Content = PostContent();

  const [disableF,setDF] = useState(false);
  const [disableL,setDL] = useState(false);
  const [disableN,setDN] = useState(false);
  const [disableP,setDP] = useState(false);
  
  function prevPage() {
    if (start-10 < 0) {
      firstPage();
    } 
    else {
      lastChange(last-10);
      startChange(start-10);
      setDL(false);
      setDN(false);
    }
  }

  function nextPage() {
    if(Content.length < last+10) {
      lastPage();
    }
    else {
      startChange(start+10);
      lastChange(last+10);
      setDF(false);
      setDP(false);
    } 
  }
  function firstPage() {
    lastChange(10);
    startChange(0);
    setDF(true);
    setDP(true);
    if(Content.length > 10){
      setDL(false);
      setDN(false);
    }
  }
  function lastPage(){
    lastChange(Content.length);
    startChange(Content.length-10);
    setDL(true);
    setDN(true);
    if(Content.length > 10){
      setDF(false);
      setDP(false);
    }
  }
  return (
    <div style = {{height:"100vh"}} class="background">
        <div class="buttongroup">
        <button class="button" onClick={firstPage} disabled={disableF}> FIRST</button>
        <button class="button" onClick={prevPage} disabled={disableP}> PREV </button>   
        </div>
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
         <div class="buttongroup">
         <button class="button" onClick={nextPage} disabled={disableN}> NEXT </button>
         <button class="button" onClick={lastPage} disabled={disableL}>LAST</button>
         </div>
      </div>
    )
}