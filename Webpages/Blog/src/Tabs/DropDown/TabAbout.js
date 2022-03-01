import React from 'react';
import '../TabContent.css';
import AboutContent from './AboutContent.json';
import { userName1, userName2 } from '../../ChangeableVariables';

export default function DisplayAbout() {

    const content = AboutContent;

    return (
    <div class="content">
     <div class="questionlist">
        {content.map(item => {
          return (
            <div class="question">
                {item.question} 
            <div class="answer"> 
              <il class="about-names"> {userName1}: </il> {item.answerUser1} 
            <div class="answer">
              <il class="about-names"> {userName2}: </il> {item.answerUser2}
            </div>
            </div>
         </div>
          )
        })}
      </div>
    </div> 
    )
}