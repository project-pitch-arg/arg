/*
  Tab with the actual blog content. It contains the
  posts from the two authors and buttons to go furhter
  backwards in time or return to the present.

  At the moment, 10 posts are displayed on each
  group that you change with the buttons. To change
  the amount of posts, edit the variable postsPerPage
  to the wished for amount.
*/
import React, { useState } from 'react';
import './TabContent.css';
import PostContent from './PostContent.js';
import logo from '../img/DTLogo.PNG';

export default function Posts() {
  
  // Edit this variable to change the posts displayed on each page.
  const postsPerPage = 10;

  // The variables for the indexes of the posts currently displayed
  const[start, startChange] = useState(0);
  const[last, lastChange] = useState(postsPerPage);
  
  // Get the contents for the posts from another file.
  const Content = PostContent();

  // Set up the buttons to change posts.
  const [disableF,setDF] = useState(false);
  const [disableL,setDL] = useState(false);
  const [disableN,setDN] = useState(false);
  const [disableP,setDP] = useState(false);
  
  // Function which changes indexes to previous (later date) posts.
  function prevPage() {
    if (start-postsPerPage < 0) {
      firstPage();
    } 
    else {
      lastChange(last-postsPerPage);
      startChange(start-postsPerPage);
      setDL(false);
      setDN(false);
    }
  }

  // Function which changes indexes to following (earlier date) posts.
  function nextPage() {
    if(Content.length < last+postsPerPage) {
      lastPage();
    }
    else {
      startChange(start+postsPerPage);
      lastChange(last+postsPerPage);
      setDF(false);
      setDP(false);
    } 
  }

  // Function to take you back to the first page of posts (most recent date).
  function firstPage() {
    lastChange(postsPerPage);
    startChange(0);
    setDF(true);
    setDP(true);
    if(Content.length > postsPerPage){
      setDL(false);
      setDN(false);
    }
  }

  // Function to take the user to the last page of posts (the oldest ones).
  function lastPage(){
    lastChange(Content.length);
    startChange(Content.length-postsPerPage);
    setDL(true);
    setDN(true);
    if(Content.length > postsPerPage){
      setDF(false);
      setDP(false);
    }
  }

  // Return the quotes and display them one by one by iterating the array of
  // content using the function .map.
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
         
           <img src={logo} />
         
         </div>
      </div>
    )
}