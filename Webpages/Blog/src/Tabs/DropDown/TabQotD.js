/*
  Tab with daily quotes that periodically change.
  One quote is displayed at a time. 
  Along with the originator of the quote.
  Change the interval of the changes between quotes with the value quoteTime.
  This value sets the time in seconds.
*/
import React, {useState, useEffect} from 'react';
import '../TabContent.css';
import QuotesContent from './QuotesContent.json';
import { changeQuoteTime } from '../../ChangeableVariables';


export default function printingQuotes() {

  // Edit this to change the time each quote is displayed (in seconds).
  const quoteTime = changeQuoteTime;

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
    const quotes = QuotesContent;
    shuffle(quotes);
    
    // Handler of timing and displaying the quotes.
    const QotD = timer => {
      const { quotes } = timer;

      // Start at random index in array.
      const [message, setMessage] = useState(getRandomInt(0, quotes.length));

      useEffect(() => {
        let delay;

        // If statement to check if the end of the array is reached.
        if (message < quotes.length-1) {

          // Start timer for 1000*quoteTime milliseconds.
          delay = setTimeout(() => setMessage(message+1), 1000 * quoteTime);
        } else {

            // Start over and shuffle array after reaching the end.
            setMessage(0);
            shuffle(quotes);
        }

        // Reset timer so that next quote can be displayed and then counted down.
        return () => {clearTimeout(delay);};
      }, 
        [quotes, message]
      );

      // Display quotes and originators according to css classes "quote" and "saidBy".
      return <div class="quote">
              <il>"</il>
              {quotes[message].quote}
              <il>"</il>
              <div class="saidBy">
                <il>-</il>
                {quotes[message].saidBy}
              </div>
           </div>;
    };

    // Display entire page.
    return (
        <div class="content">
          <QotD quotes={quotes} />
        </div>
    )
}