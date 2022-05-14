/*
    This file contains a memory game.
    It creates cards from the variable 
    "memoryCards" in ChangeableValues.json
    and pairs them according to the tags.
*/

import { useEffect } from "react";
import Variables from "../../JSONDocuments/ChangeableValues.json";

export default function Memory(){
    // TODO: Error check på data från JSON. Kolla så att det finns jämnt antal av varje tag.

    // Create some variables to remember the state of the game.
    var cardData = Variables.memoryCards;
    var cardObject = null;
    var livesObject = null;
    var livesCount = Variables.initialLives;

    // Shuffle cardData and create array to remember if cards
    // are turned or not.
    cardData = shuffle(cardData);
    var turnedCards = [];
    cardData.forEach(card => turnedCards.push([card, "Not turned"]));

    // Add function that will run when all elemnts are loaded.
    useEffect(startUp);

    // Identifier for react to order objects
    var identifierKey = -1;

    return (
        <div className="memory, content">
            <div>
                <div className="card-list">
                {cardData.map(card => {
                    identifierKey++;
                    return (<div key={identifierKey} > {cardGenerator(card.text)} </div>)
                })}
                </div>
                <div className="mem-button">
                    <p className="lives">
                        Lives: <span className="lives-count"> </span>
                    </p>
                    {sessionStorage.getItem("Memory") != null ? 
                        <button className="button" onClick={resetMem}> {"071085"} </button> :
                        <button className="button" onClick={resetMem}> {"Reset"} </button>}
                </div> 
            </div>
        </div>
    )

// ------------- Helper functions -------------


    // Startup function makes cards clickable and
    // sets the initial life count.
    function startUp() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => card.addEventListener("click", turnCard));
        livesObject = document.querySelector(".lives-count");
        livesObject.textContent = livesCount;
    }

    // Resets the memory and removes the item
    // that proves you have completed the memory
    // from storage.
    function resetMem() {
        window.location.reload();
        sessionStorage.removeItem("Memory");
    }

    // Set the variable to indicate that the player
    // completed the memory and reset it.
    function winMem() {
        sessionStorage.setItem("Memory", true);
        window.location.reload();
    }

    // Check if the game is won by seeing if all
    // cards are paired.
    function checkForWin() {
        for(var i = 0; i < turnedCards.length; i++) {
            if(turnedCards[i][1] !== "Paired") {
                return false;
            }
        }
        return true;
    }

    // When the player turns a card, check if it is
    // a pair and if the player has completed the memory.
    function turnCard(pointerEvent) {
        // Turn the clicked card.
        turnedCards.forEach(card => {
            if (card[0].text === pointerEvent.path[0].innerText && !pointerEvent.path[1].classList.contains("correct-pair")) {
                pointerEvent.path[1].classList.add("turn");
                card[1] = "Turned";
                if(cardObject === null)
                    cardObject = pointerEvent.path[1];
            }});
 
        // Check if the turned cards are a pair
        // and act accordingly.
        const check = checkForPair()
        if(check === "Pair") {
            turnedCards.forEach(card => {
                if (card[1] === "Turned") {
                    // The turned card.
                    pointerEvent.path[1].classList.remove("turn");
                    pointerEvent.path[1].classList.add("correct-pair");
                    card[1] = "Paired";
                    // The previously turned card.
                    if(cardObject !== null) {
                        cardObject.classList.remove("turn");
                        cardObject.classList.add("correct-pair");
                        cardObject = null;
                    }
                }
            });}
        else if(check === "No pair") {
            setTimeout(function() { notPaired(pointerEvent.path[1], cardObject) }, 2000);
        }

        // Check if player won.
        if(checkForWin()) {
            setTimeout(winMem, 5000);
        }
        // Check if player lost.
        if(livesCount === 0) {
            resetMem();
        }
        return;
    }  

    // Check if the two latest turned cards
    // are a pair or not.
    function checkForPair() {
        var turnedCardsTags = [];
        var index = 0;
        // Get the tags for the turned card(s).
        turnedCards.forEach(card => {
            if(card[1] === "Turned") {
                turnedCardsTags[index] = card[0].tag;
                index++;
            }
        });
        // Check if the cards match if two cards are turned.
        if(turnedCardsTags.length === 2) {
            if(turnedCardsTags[0] === turnedCardsTags[1])
                return "Pair";
            else
                return "No pair";
        }
    } 

    // Flip pack two cards that are not 
    // a match
    function notPaired(card1, card2) {
        // Turn over the cards.
        card1.classList.remove("turn");
        card2.classList.remove("turn");
        cardObject = null;
        turnedCards.forEach(card => {
            if(card[1] === "Turned")
                card[1] = "Not turned";
        });
        // Reduce player's lives.
        livesCount--;
        livesObject.textContent = livesCount;
        return;
    }

    // The HTML code for a single card.
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
}


   


