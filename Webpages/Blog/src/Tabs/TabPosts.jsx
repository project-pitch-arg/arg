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
import puzzleHandler from './PostPuzzles.jsx';
import { POSTS_PER_PAGE, USER_NAME_1, USER_NAME_2, USER_PICTURE_1, USER_PICTURE_2, postContent, setPostContent } from '../ChangeableVariables';


export default function Posts() {

  // The variables for the indexes of the posts currently displayed
  const[start, startChange] = useState(0);
  const[last, lastChange] = useState(POSTS_PER_PAGE);
  
  // Get the contents for the posts from another file.
  const CONTENT = changeDateAndSort(postContent);

  // Set the global variable with the sorted and assigned dates.
  setPostContent(CONTENT);

  // Set up the buttons to change posts.
  const [disableF,setDF] = useState(false);
  const [disableL,setDL] = useState(false);
  const [disableN,setDN] = useState(false);
  const [disableP,setDP] = useState(false);

  // Return the quotes and display them one by one by iterating the array of
  // content using the function .map.
  return (
    <div class="background">
         <div class="postlist">
         {(postContent.slice(start,last)).map(post => {
           return (<div>{puzzleHandler(post)}</div>)
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
           <img src={USER_PICTURE_1} class="image" ></img>
           <p>Hello, I'm {USER_NAME_1}! Join us in the chat!</p>
           <img src={USER_PICTURE_2} class="image"></img>
           <p>Hello! I'm {USER_NAME_2}. If you want to know more about the authors, go to About.</p>
          </div>
         </div>
      </div>
    )

/* -------------------- Functions -------------------- */ 

  // Function to add 1 day to previous date if post.date = "",
  // else the date stated is used.
  // The posts are then sorted by date.

  function changeDateAndSort(posts) {
    
    // The month starts at index 0.
    var day = new Date(posts[0].date[0], posts[0].date[1], posts[0].date[2]);
    var nextDay = new Date(day);

    {posts.map(post => {
      if (!post.hasOwnProperty('date')) {
        nextDay.setDate(day.getDate() + 1); //Set date to next day.
        post.date = [nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate()];
      }
      else {
        nextDay = new Date(post.date[0], post.date[1], post.date[2]); 
      }
      day = nextDay;
      return;
    })}

    posts.sort(function(post1,post2){return compareDates(post1.date, post2.date)});

    return posts;

  }

  function compareDates(date1, date2) {
    
    return (5000*(date2[0]-date1[0])+100*(date2[1]-date1[1])+(date2[2]-date1[2]));
  
  }

  // Old redundant code.
/*
    // Compare the years.
    if(date1[0] > date2[0]) {
      return 100*(date2[0]-date1[0]);
    }
    // Compare the months.
    if(date1[1] > date2[1]) {
      return 10*(date2[1]-date1[1]);
    }
    // Compare the days.
    if(date1[2] > date2[2]) {
      return (date2[2]-date1[2]);
    }
    // The second date is larger. Thus returning a negative value.
    return 1;
  }*/

  // Function which changes indexes to previous (newer) posts.
  function prevPage() {
    if (start - POSTS_PER_PAGE < 0) {
      firstPage();
      return;
    } else if (last - start < POSTS_PER_PAGE) {
      lastChange(last - 1);
      startChange(start - POSTS_PER_PAGE);
    } else {
      lastChange(last - POSTS_PER_PAGE);
      startChange(start - POSTS_PER_PAGE);
    }
    setDL(false);
    setDN(false);
  }

  // Function which changes indexes to following (older) posts.
  function nextPage() {
    if(postContent.length < last + POSTS_PER_PAGE) {
      lastPage();
    }
    else {
      startChange(start+POSTS_PER_PAGE);
      lastChange(last+POSTS_PER_PAGE);
      setDF(false);
      setDP(false);
    } 
  }

  // Function to take you back to the first page of posts (the newest ones).
  function firstPage() {
    lastChange(POSTS_PER_PAGE);
    startChange(0);
    setDF(true);
    setDP(true);
    if(postContent.length > POSTS_PER_PAGE){
      setDL(false);
      setDN(false);
    }
  }

  // Function to take the user to the last page of posts (the oldest ones).
  function lastPage(){
    lastChange(postContent.length);
    startChange(postContent.length - (postContent.length % POSTS_PER_PAGE));
    console.log(postContent.length);
    setDL(true);
    setDN(true);
    if(postContent.length > POSTS_PER_PAGE){
      setDF(false);
      setDP(false);
    }
  }
}