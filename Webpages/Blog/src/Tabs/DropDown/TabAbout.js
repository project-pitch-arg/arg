import React from 'react';
import '../TabContent.css';

export default function DisplayAbout() {

    function aboutContent() {
        return (
            [
                {question: "Who are we?", answerWilfred: "I'm a 23-year old masters student who doesn't know what I'm suppsed to do with all the puzzles I make. Also, never EVER give me grapefruit!", answerEdwin: "An exchange student that went to Chalmers Institute of Technology a while back. I like to explore and take photos with my phone to remember places."},
                {question: "Why do we have a blog?", answerWilfred: "To keep in contact with Edwin and have someone solve my puzzles.", answerEdwin: "It's nice to be able to upload what you think about and pictures you like."},
                {question: "What are these puzzles you keep mentioning?", answerWilfred: "That is for you to figure out.", answerEdwin: "What puzzles?"},
                {question: "Can I copy your content?", answerWilfred: "Ctrl + C and Ctrl + V are sacred buttons not to be used here.", answerEdwin: "Small pieces, but please avoid to do so."},
                {question: "Why is the blog green?", answerWilfred: "Because Edwin wanted it to be.", answerEdwin: ":)"},
                {question: "Why do you not upload pictures of yourselves?", answerWilfred: "What's wrong with my robot?", answerEdwin: "I would like my online life to be kept separet from my IRL one."},
                {question: "What's 678^2/3698?", answerWilfred: "0x3F", answerEdwin: "≈124.306111412"}
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
            <div class="answerWilfred"> 
              <il class="about-names"> Robot1312113: </il> {item.answerWilfred} 
            <div class="answerEdwin">
              <il class="about-names"> Fexjo: </il> {item.answerEdwin}
            </div>
            </div>
         </div>
          )
        })}
      </div>
    </div> 
    )
}