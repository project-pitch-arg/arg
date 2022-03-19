/*
  This file reads the content in the file AboutContent.json
  and writes it as a question-answer sheet.
  The names of the users are imported
  from the ChangeVariables file (userName1/userName2).
*/

import React from "react";
import "../TabContent.css";
import aboutContent from "./AboutContent.json";
import { USER_NAME_1, USER_NAME_2, USER_PICTURE_1, USER_PICTURE_2 } from "../../ChangeableValues";

export default function DisplayAbout() {

    return (
    <div class="content">
      <div class="question-list">
        {aboutContent.map(item => {
          return (
            <div class="question">
                {item.question} 
            <div class="answer"> 
              <il class="about-names"> {USER_NAME_1}: </il> {item.answerUser1} 
            <div class="answer">
              <il class="about-names"> {USER_NAME_2}: </il> {item.answerUser2}
            </div>
            </div>
         </div>
          )
        })}
      </div>
      <div class="right-side">
        <div class="author-pictures">
            <img src={USER_PICTURE_1} class="image" ></img>
            <p>I'm {USER_NAME_1}</p>
            <img src={USER_PICTURE_2} class="image"></img>
            <p>I'm {USER_NAME_2}</p>
        </div>
      </div>
      
    </div> 
    )
}