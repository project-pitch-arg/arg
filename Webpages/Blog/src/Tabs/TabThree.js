import React, { useState } from 'react';
import './TabContent.css';
import PostContent from './PostContent.js';
import styled from "styled-components";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 10px;
  padding: 20px 30px;
  border-radius: 1px;
  margin: 777px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
`;

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
        <ButtonGroup>
        <Button onClick={firstPage} disabled={disableF}> FIRST</Button>
        <Button onClick={prevPage} disabled={disableP}> PREV </Button>   
        </ButtonGroup>
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
         <ButtonGroup>
         <Button onClick={nextPage} disabled={disableN}> NEXT </Button>
         <Button onClick={lastPage} disabled={disableL}>LAST</Button>
         </ButtonGroup>
      </div>
    )
}