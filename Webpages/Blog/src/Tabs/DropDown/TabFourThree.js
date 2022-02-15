import React, {useState, useEffect} from 'react';
import '../TabContent.css';
import QuotesContent from './QuotesContent.js';

export default function Walk() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random(2) * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
  //
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
  
    return array;
  }

    const quotes = QuotesContent();
    
    //const quotes = ["First quote", "Second one", "Chocolate pudding", "Fourth quote", "5", "6", "7", "8", "9"];
    const [message, setMessage] = useState(getRandomInt(0, quotes.length));
    const QotD = timer => {
      const { quotes } = timer;
      const [message, setMessage] = useState(getRandomInt(0, quotes.length));

      useEffect(() => {
        let delay;

        if (message < quotes.length-1) {
          delay = setTimeout(() => setMessage(message+1), 5000);
        } else {
            setMessage(0);
            shuffle(quotes);
        }
        return () => {clearTimeout(delay);};
      }, 
        [quotes, message]
      );

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

    return (
        <div class="content quotes">
          <QotD quotes={quotes} />
        </div>
    )
}