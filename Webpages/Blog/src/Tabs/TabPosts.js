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
import PostContentOrg from './PostContentOrg.js';
import PostContent from './PostContent.json';
import Robot from '../img/Bild2png.png';
import Salad from '../img/ceasarsalad-removebg-preview.png';


export default function Posts() {
  
  // Edit this variable to change the posts displayed on each page.
  const postsPerPage = 5;

  // The variables for the indexes of the posts currently displayed
  const[start, startChange] = useState(0);
  const[last, lastChange] = useState(postsPerPage);
  
  // Get the contents for the posts from another file.
  const Content = PostContent;

  function puzzleHandler(post) {
    if(post.isPuzzle) {
      switch (post.puzzleNr) {
        case "2c": return puzzle2c(post);
      }  
    }
    return (
      <div class="post">
        <div class="post-date">
          {post.date}
        <div class="post-name"> 
          {post.poster} 
        <div class="post-content">
          {post.content}
        </div>
        {hasPicture(post)}
        </div>
      </div>
    </div>
   )
  }

  function changeALetter(post, letter, count) {
    const n = (post.content.split(letter).length - 1)
    var index = post.content.indexOf(letter);
    var count1 = count % n;
    while(count1 != count) {
      index = post.content.indexOf(letter, index+1);
      count1++;
    }

    return (
      <div class="post-content">
        {post.content.slice(0,index)}
        <font color="red" face="monaco">{post.content[index]}</font>
        {post.content.slice(index+1)}
      </div> 
      )
  }

  function changeString (function1, function2) {
    //Take changeFont and changeColor and give back proper 
  }

  function puzzle2c(post) {
    if(post.comment == "This post belongs to puzzle 2c-a.") {
      return (
        <div class="post">
          <div class="post-date">
            {post.date}
          <div class="post-name"> 
            {post.poster} 
          {changeALetter(post, "t", 500)}
          {hasPicture(post)}
          </div>
        </div>
      </div>
     )
    }
    return (
      <div class="post">
        <div class="post-date">
          {post.date}
        <div class="post-name"> 
          {post.poster} 
        <div class="post-content">
          {post.content}
        </div>
        {hasPicture(post)}
        </div>
      </div>
    </div>
   )
  }

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

  function hasPicture(post) {
    if(post.hasOwnProperty('pictures')) {
      return (<div class="post-images">
              {post.pictures.map (picture => {
                    return (
                      <div>
                       <img src={picture[0]} alt={picture[1]} class="post-image"/>
                      </div>
                    )
                  })}
                </div>  
                )
    }
    return true;
  }

  // Return the quotes and display them one by one by iterating the array of
  // content using the function .map.
  return (
    <div style = {{height:"100vh"}} class="background">
         <div class="postlist">
         {(Content.slice(start,last)).map(post => {
           return (<div>{puzzleHandler(post)}</div>)
         } ) }
         </div>
         <div class="right-side">
         <div class="buttongroup">
          <button class="button" onClick={firstPage} disabled={disableF}> FIRST</button>
          <button class="button" onClick={prevPage} disabled={disableP}> PREV </button>   
         </div>  
         <div class="buttongroup">
          <button class="button" onClick={nextPage} disabled={disableN}> NEXT </button>
          <button class="button" onClick={lastPage} disabled={disableL}>LAST</button>
         </div>
          <div class="author-pictures">
           <img src={Robot} class="image" ></img>
           <p>Hello, I'm Robot1312113! Join us in the chat!</p>
           <img src={Salad} class="image"></img>
           <p>Hello! I'm Fexjo. If you want to know more about the authors, go to About.</p>
          </div>
         </div>
      </div>
    )
}


/* Old verision of showing posts.
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
      */