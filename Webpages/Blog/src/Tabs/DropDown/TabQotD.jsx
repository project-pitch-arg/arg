/*
  Tab with daily quotes that periodically change.
  One quote is displayed at a time. 
  Along with the originator of the quote.
  Change the interval of the changes between quotes with the value quoteTime.
  This value sets the time in seconds.
*/
import React, {useState, useEffect} from "react";
import "../TabContent.css";
import quotesContent from "./QuotesContent.json";
import { QUOTE_TIME } from "../../ChangeableValues";


export default function printingQuotes() {

  // Function to get a random integer between two limits.
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    // The maximum is exclusive and the minimum is inclusive.
    return Math.floor(Math.random(2) * (max - min) + min); 
  }
  
  // Fisher-Yates shuffle function.
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    // Returns a shuffled array.
    return array;
  }

    // Imported array is declared here.
    const QUOTES = quotesContent;
    shuffle(QUOTES);
    
    // Handler of timing and displaying the quotes.
    const QotD = timer => {
      const { QUOTES } = timer;

      // Start at random index in array.
      const [message, setMessage] = useState(getRandomInt(0, QUOTES.length));

      useEffect(() => {
        let delay;

        // If statement to check if the end of the array is reached.
        if (message < QUOTES.length - 1) {

          // Start timer for 1000 * quoteTime milliseconds.
          delay = setTimeout(() => setMessage(message + 1), 1000 * QUOTE_TIME);
        } else {

            // Start over and shuffle array after reaching the end.
            setMessage(0);
            shuffle(QUOTES);
        }

        // Reset timer so that next quote can be displayed and then counted down.
        return () => {clearTimeout(delay);};
      }, 
        [QUOTES, message]
      );

      // Display quotes and originators according to css classes "quote" and "said-by".
      return <div class="quote">
              <il>"</il>
              {QUOTES[message].quote}
              <il>"</il>
              <div class="said-by">
                <il>-</il>
                {QUOTES[message].saidBy}
              </div>
           </div>;
    };

    // Display entire page.
    return (
        <div class="content">
          <QotD QUOTES={QUOTES} />
        </div>
    )
}