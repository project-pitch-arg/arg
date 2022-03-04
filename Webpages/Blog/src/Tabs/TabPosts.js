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
import PuzzleHandler from './PostPuzzles.js';
import { userName1, userName2, userPicture1, userPicture2, PostContent, setPostContent } from '../ChangeableVariables';


export default function Posts() {
  
  // Edit this variable to change the posts displayed on each page.
  const postsPerPage = 5;

  // The variables for the indexes of the posts currently displayed
  const[start, startChange] = useState(0);
  const[last, lastChange] = useState(postsPerPage);
  
  // Get the contents for the posts from another file.
  const Content = changeDateAndSort(PostContent);

  // Set the global variable with the sorted and assigned dates.
  setPostContent(Content);

  // Set up the buttons to change posts.
  const [disableF,setDF] = useState(false);
  const [disableL,setDL] = useState(false);
  const [disableN,setDN] = useState(false);
  const [disableP,setDP] = useState(false);

  // Return the quotes and display them one by one by iterating the array of
  // content using the function .map.
  return (
    <div style = {{height:"100vh"}} class="background">
         <div class="postlist">
         {(Content.slice(start,last)).map(post => {
           return (<div>{PuzzleHandler(post)}</div>)
         } ) }
         </div>
         <div class="right-side">
         <div class="buttongroup">
          <button class="button" onClick={prevPage} disabled={disableP}> {"<"} </button> 
          <button class="button" onClick={nextPage} disabled={disableN}> {">"} </button>  
         </div>  
         <div class="buttongroup">
         <button class="button" onClick={firstPage} disabled={disableF}> {"<<"}</button>
          <button class="button" onClick={lastPage} disabled={disableL}>{">>"}</button>
         </div>
          <div class="author-pictures">
           <img src={userPicture1} class="image" ></img>
           <p>Hello, I'm {userName1}! Join us in the chat!</p>
           <img src={userPicture2} class="image"></img>
           <p>Hello! I'm {userName2}. If you want to know more about the authors, go to About.</p>
          </div>
         </div>
      </div>
    )

/* -------------------- Functions -------------------- */ 

  // Function to add 1 day to previous date if post.date = "",
  // else the date stated is used.
  // The posts are then sorted by date.

  //TODO - check so that it works with puzzle dates.
  function changeDateAndSort(posts) {
    
    // The month starts at index 0.
    var day = new Date(posts[0].date[0], posts[0].date[1] - 1, posts[0].date[2]);
    var nextDay = new Date(day);

    {posts.map(post => {
      if (!post.hasOwnProperty('date')) {
        nextDay.setDate(day.getDate() + 1); //Set date to next day.
        post.date = [nextDay.getFullYear(), nextDay.getMonth() + 1, nextDay.getDate()];
      }
      else {;
        nextDay = new Date(post.date[0], post.date[1] - 1, post.date[2]); 
      }
      day = nextDay;
      return;
    })}

    posts.sort(function(a,b){return compareDates(a.date, b.date)});

    return posts;

  }

  function compareDates(date1, date2) {
    
    // Compare the years.
    if(date1[0] > date2[0]) {
      return 1;
    }
    // Compare the months.
    if(date1[1] > date2[1]) {
      return 1;
    }
    // Compare the days.
    if(date1[2] > date2[2]) {
      return 1;
    }
    // The second date is larger.
    return -1;
  }

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
}