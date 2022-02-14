import React, {useState, useEffect} from 'react';
import '../TabContent.css';

export default function Walk() {
    const quotes = ["First quote", "Second one", "Chocolate pudding", "Fourth quote"];

    const QotD = timer => {
      const { quotes } = timer;
      const [message, setMessage] = useState(0);

      useEffect(() => {
        let delay;

        if (message < quotes.length) {
          delay = setTimeout(() => setMessage(message + 1), 1000);
        } else {setMessage(0);}

        return () => {clearTimeout(delay);};
      }, 
      
      [quotes, message]);
    
      return <div>{quotes[message]}</div>;
    };

    return (
        <div class="content quotes">
          <QotD quotes={quotes} />
        </div>
    )
}