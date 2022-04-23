/*
  This file reads the content in the file AboutContent.json
  and writes it as a question-answer sheet.
  The names of the users are imported
  from the ChangeVariables file (userName1/userName2).
*/

import React from "react";
import "./TabContent.css";
import aboutContent from "../JSONDocuments/AboutContent.json"
import Variables from "../JSONDocuments/ChangeableValues.json";

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
              <b> {Variables.username1}: </b> {item.answerUser1} 
              <div className="answer">
                <b> {Variables.username2}: </b> {item.answerUser2}
              </div>
            </div>
          </div>
         </div>
          )
        })}
      </div>
      <div className="right-side">
        <div className="author-pictures">
          <img src={require("../Img/" + Variables.userPicture2)} alt="Profile picture of a blog creator." className="image" ></img>
          <p>I'm {Variables.username1}</p>
          <img src={require("../Img/" + Variables.userPicture2)} alt="Profile picture of a blog creator." className="image"></img>
          <p>I'm {Variables.username2}</p>
        </div>
      </div>
      
    </div> 
    )
}
