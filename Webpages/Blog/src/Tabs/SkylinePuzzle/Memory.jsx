export default function Memory(){
    //Skriv for-loppar med array.forEach?
    var testData = ["Text 1.1", "Text 1.2", "Text 2.1", "Text 2.2", "Text 3.1", "Text 3.2",
                    "Text 4.1", "Text 4.2", "Text 5.1", "Text 5.2", "Text 6.1", "Text 6.2",
                    "Text 7.1", "Text 7.2", "Text 8.1", "Text 8.2"];
   
    testData = shuffle(testData)
    var j = 0
    var turnedCards = [];
    for(var i = 0; i < testData.length; i++) {
        turnedCards.push([testData[i], false])
    }

    window.addEventListener('load', function() {
        const cards = document.querySelectorAll(".card");
        for(var i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", turnCard);
        }
        console.log('All assets loaded')
    });
    
    var identifierKey = -1;
    
    return (
        <div className="memory, content">
            <div className="card-list">
            {testData.map(card => {
                identifierKey++;
                return (<div key={identifierKey} > {cardGenerator(card)} </div>)
        })}
            </div>
        </div>
    )

// Fisher-Yates shuffle function.
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // ...pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // ...and swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    // Returns a shuffled array.
    return array;
  }

  function turnCard(pointerEvent) {
   // console.log(pointerEvent)
    for(var i = 0; i < turnedCards.length; i++){
        if (turnedCards[i][0] === pointerEvent.path[0].innerText) {
            pointerEvent.path[1].classList.add("turn")
            turnedCards[i][1] = true;
        }
    }
    console.log("click")
    return;
}

  function cardGenerator(card) {
  
    return (
        <div className="card">
            <div className="front">
                {card}
            </div>
            <div className="back">    
            </div> 
        </div>
    )
  }

 /* function isTurned(card) {
    for(var i = 0; i < turnedCards.length; i++) {
        if (turnedCards[i][0] === card) {
            console.log(turnedCards[i][1])
            return turnedCards[i][1];
        }
    }
    console.log("Card not found") //Should not happen
    return;
  }*/
}