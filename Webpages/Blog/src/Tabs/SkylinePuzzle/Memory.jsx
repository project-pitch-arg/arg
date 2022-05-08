import { useEffect } from "react";
import Variables from "../../JSONDocuments/ChangeableValues.json";

export default function Memory(){
    // Skriv for-loppar med array.forEach?
    // Clue for next screen
    // Error check på data från JSON. Kolla så att det finns jämnt antal av varje tag.
    // Snygga till koden och kommentera
    var testData = Variables.memoryCards;

    var cardObject = null;
    var livesObject = null;
    var livesCount = 6;

    testData = shuffle(testData)
    var j = 0
    var turnedCards = [];
    for(var i = 0; i < testData.length; i++) {
        turnedCards.push([testData[i], "Not turned"])
    }

    useEffect(startUp);

    var identifierKey = -1;
    
    if(sessionStorage.getItem("Memory")) {
        return (
            <div className="content">
                YOU WIN!
            </div>
        )
    }

    return (
        <div className="memory, content">
            <div>
                <div className="card-list">
                {testData.map(card => {
                    identifierKey++;
                    return (<div key={identifierKey} > {cardGenerator(card.text)} </div>)
                })}
                </div>
                <div className="mem-button">
                    <p className="lives">
                        Lives: <span className="lives-count"> </span>
                    </p>
                    <button className="button" onClick={resetMem}> {"Reset"} </button> 
                </div>
            </div>
        </div>
    )

    function resetMem() {
        window.location.reload()
    }

    function startUp() {
        const cards = document.querySelectorAll(".card");
        for(var i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", turnCard);
        }
        if(sessionStorage.getItem("Memory") === null) {
            livesObject = document.querySelector(".lives-count");
            livesObject.textContent = livesCount;
        }
    }

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

    for(var i = 0; i < turnedCards.length; i++){
        if (turnedCards[i][0].text === pointerEvent.path[0].innerText && 
                !pointerEvent.path[1].classList.contains("correct-pair")) {
            pointerEvent.path[1].classList.add("turn")
            turnedCards[i][1] = "Turned";
            if(cardObject === null)
                cardObject = pointerEvent.path[1]
        }
    }

    const check = checkForPair()
    if(check === "Pair") {
        for(var i = 0; i < turnedCards.length; i++){
            if (turnedCards[i][1] === "Turned") {

                pointerEvent.path[1].classList.remove("turn")
                pointerEvent.path[1].classList.add("correct-pair")

                if(cardObject !== null) {
                    cardObject.classList.remove("turn");
                cardObject.classList.add("correct-pair");

                cardObject = null;
                }
                

                turnedCards[i][1] = "Paired";
                }
            }
        }
    else if(check === "No pair") {
        setTimeout(function(){ notPaired(pointerEvent.path[1], cardObject)}, 1500)
    }

    if(checkForWin()) {
        sessionStorage.setItem("Memory", true)
        window.location.reload();
    }
    // Check if player lost
    if(livesCount === 0) {
        resetMem();
    }

    return;
}  

    function notPaired(card1, card2) {
        card1.classList.remove("turn")
        card2.classList.remove("turn")
        cardObject = null;
        for(var i = 0; i < turnedCards.length; i++) {
            if(turnedCards[i][1] === "Turned") {
                turnedCards[i][1] = "Not turned"
            }
        }
        livesCount--;
        livesObject.textContent = livesCount;
        return;
    }

    function checkForWin() {
        for(var i = 0; i < turnedCards.length; i++) {
            if(turnedCards[i][1] !== "Paired") {
                return false
            }
        }
        return true;
    }

    function checkForPair() {
        var turnedCardsTags = []
        var index = 0;
        for(var i = 0; i < turnedCards.length; i++) {
            if(turnedCards[i][1] === "Turned") {
                turnedCardsTags[index] = turnedCards[i][0].tag;
                index++;
            }
        }
        if(turnedCardsTags.length === 2) {
            if(turnedCardsTags[0] === turnedCardsTags[1]) {
                return "Pair"
            }
            else {
                return "No pair"
            }
        }
        else {
            return "Turn more cards"
        }
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
}