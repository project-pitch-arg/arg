import React from 'react';
import '../TabContent.css';

export default function DisplayAbout() {

    function aboutContent() {
        return (
            [
                {question: "hi", answerEdwin: "hello", answerWilfred: "..."},
                {question: "hi", answerEdwin: "hello", answerWilfred: "..."}
            ]
        )
    }

    const content = aboutContent();

    return (
    <div class="content">
     <div class="questionlist">
        {content.map(item => {
          return (
            <div class="question">
                {item.question} 
            <div class="answerEdwin">
              Edwin: {item.answerEdwin}
            </div>
            <div class="answerWilfred"> 
              Wilfred: {item.answerWilfred} 
            </div>
         </div>
          )
        })}
      </div>
    </div> 
    )
}