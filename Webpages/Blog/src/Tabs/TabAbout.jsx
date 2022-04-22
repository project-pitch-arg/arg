/*
  This file reads the content in the file AboutContent.json
  and writes it as a question-answer sheet.
  The names of the users are imported
  from the ChangeVariables file (userName1/userName2).
*/

import React from "react";
import "./TabContent.css";
import aboutContent from "../JSONDocuments/AboutContent.json"
import { USER_NAME_1, USER_NAME_2, USER_PICTURE_1, USER_PICTURE_2 } from "../ChangeableValues";

export default function DisplayAbout() {
  var identifierKey = -1;
    return (
    <div className="content">
      <div className="question-list">
        {aboutContent.map(item => {
          identifierKey++;
          return (
          <div key={identifierKey}>
            <div className="question">
                {item.question} 
            <div className="answer"> 
              <b> {USER_NAME_1}: </b> {item.answerUser1} 
              <div className="answer">
                <b> {USER_NAME_2}: </b> {item.answerUser2}
              </div>
            </div>
          </div>
         </div>
          )
        })}
      </div>
      <div className="right-side">
        <div className="author-pictures">
            <img src={USER_PICTURE_1} className="image" ></img>
            <p>I'm {USER_NAME_1}</p>
            <img src={USER_PICTURE_2} className="image"></img>
            <p>I'm {USER_NAME_2}</p>
        </div>
      </div>
      
    </div> 
    )
}