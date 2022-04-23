/*
  Tab with the actual blog content. It contains the
  posts from the two authors and buttons to go furhter
  backwards in time or return to the present.

  At the moment, 5 posts are displayed on each
  group that you change with the buttons. To change
  the amount of posts, edit the variable Variables.postsPerPage
  to the wished for amount.
*/
import React, { useState } from "react";
import "./TabContent.css";
import puzzleHandler from "./PostPuzzles.jsx";
import postContent from "../JSONDocuments/PostContent.json";
import Variables from "../JSONDocuments/ChangeableValues.json"

export default function Posts() {

  // The variables for the indexes of the posts currently displayed
  const[start, startChange] = useState(0);
  const[last, lastChange] = useState(Variables.postsPerPage);

  // Get the contents for the posts from another file.
  const CONTENT = changeDateAndSort(postContent);

  // Set up the buttons to change posts.
  const [disableF,setDF] = useState(false);
  const [disableL,setDL] = useState(false);
  const [disableN,setDN] = useState(false);
  const [disableP,setDP] = useState(false);

  // Return the quotes and display them one by one by iterating the array of
  // content using the function .map.
  var identifierKey = -1;
  return (
    <div className="background">
      <div className="postlist">
        {(postContent.slice(start,last)).map(post => {
          identifierKey++;
          return (<div key={identifierKey}>{puzzleHandler(post)}</div>)
        })}
        </div>
        <div className="right-side">
        <div className="buttongroup">
          <button className="button" onClick={prevPage} disabled={disableP}> {"<"} </button> 
          <button className="button" onClick={nextPage} disabled={disableN}> {">"} </button>  
        </div>  
        <div className="buttongroup">
          <button className="button" onClick={firstPage} disabled={disableF}> {"<<"}</button>
          <button className="button" onClick={lastPage} disabled={disableL}>{">>"}</button>
        </div>
        <div className="author-pictures">
          <img src={require("../Img/" + Variables.userPicture1)} className="image" ></img>
          <p>Hello, I'm {Variables.username1}! Join us in the chat!</p>
          <img src={require("../Img/" + Variables.userPicture2)} className="image"></img>
          <p>Hello! I'm {Variables.username2}. If you want to know more about the authors, go to About.</p>
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
      if (!post.hasOwnProperty("date")) {
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

  // Simple function to compare the dates with emphasis on
  // years and then months and then days.
  function compareDates(date1, date2) {
    return (5000*(date2[0]-date1[0])+100*(date2[1]-date1[1])+(date2[2]-date1[2]));
  }

  // Function which changes indexes to previous (newer) posts.
  function prevPage() {
    if (start - Variables.postsPerPage <= 0) {
      firstPage();
      return;
    } else if (last - start < Variables.postsPerPage) {
      lastChange(start);
      startChange(start - Variables.postsPerPage);
    } else {
      lastChange(last - Variables.postsPerPage);
      startChange(start - Variables.postsPerPage);
    }
    setDL(false);
    setDN(false);
  }

  // Function which changes indexes to following (older) posts.
  function nextPage() {
    if(postContent.length <= last + Variables.postsPerPage) {
      lastPage();
    }
    else {
      startChange(start+Variables.postsPerPage);
      lastChange(last+Variables.postsPerPage);
      setDF(false);
      setDP(false);
    } 
  }

  // Function to take you back to the first page of posts (the newest ones).
  function firstPage() {
    lastChange(Variables.postsPerPage);
    startChange(0);
    setDF(true);
    setDP(true);
    if(postContent.length >= Variables.postsPerPage){
      setDL(false);
      setDN(false);
    }
  }

  // Function to take the user to the last page of posts (the oldest ones).
  function lastPage() {
    lastChange(postContent.length);
    if(postContent.length - (postContent.length % Variables.postsPerPage) == postContent.length) {
      startChange(postContent.length - Variables.postsPerPage);
    } else {
      startChange(postContent.length - (postContent.length % Variables.postsPerPage));
    }
    setDL(true);
    setDN(true);
    if(postContent.length > Variables.postsPerPage){
      setDF(false);
      setDP(false);
    }
  }
}