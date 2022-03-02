/*
  This file contains the functions necessary to make
  the puzzles hidden in posts modifiable.
  
  To change the answers, change the variables
  in the file ChangeableVariables.jsx.
*/

import React from 'react';
import { answerToBeEncrypted, keyForEncryption, dateAsClue } from '../ChangeableVariables';

export default function Puzzles(post) {

  if(post.isPuzzle) {
    switch (post.puzzleNr) {
      case "2b": return puzzle2b(post);
      case "2c": return puzzle2c(post);
    }  
  } else {
    return (
        <div class="post">
          <div class="post-date">
            {post.date}
          <div class="post-name"> 
            {post.poster} 
          <div class="post-content">
            {post.content}
          </div>
          {hasPicture(post)}
          </div>
        </div>
      </div>
    )
  }


/* -------------------- Functions -------------------- */  

  // This function changes the color of the letters in a post, where the 
  // argument count is the "x":th letter of that type.
  function changeColor(post, letter, count) {
    var indexArray = new Array(letter.length);
    var counter = 0;
    for(let i = 0; i < letter.length; i++){
      const n = (post.content.split(letter[i]).length - 1)
      var index = post.content.indexOf(letter[i]);
      var count1 = count % n;
      while(count1 > 0) {
        index = post.content.indexOf(letter[i], index+1);
        count1--;
      }
      indexArray[counter] = index;
      counter++;
    }
    const index1 = indexArray[0];
    const index2 = indexArray[1];
    const index3 = indexArray[2];
    const finalArray = [[index1,"color"],[index2, "color"],[index3, "color"]];
    return finalArray;
  }

  // This function changes the font of the letters in a post, where the 
  // argument count is the "x":th letter of that type.
  function changeFont(post,letter, count) {
    var col = changeColor(post, letter, count);
    col[0][1] = "font";
    col[1][1] = "font";
    col[2][1] = "font";
    return col;
  }

  // ???
  function changeString(post, array1, array2) {
    var totalArray = array1.concat(array2);
    var sortedArray = totalArray.sort(function(a,b){return (a[0]-b[0])});
    
    return (
      <div class="post-content">
        {post.content.slice(0,sortedArray[0][0])}
        {helpChangeString(post, sortedArray[0])}
        {post.content.slice(sortedArray[0][0]+1,sortedArray[1][0])}
        {helpChangeString(post, sortedArray[1])}
        {post.content.slice(sortedArray[1][0]+1,sortedArray[2][0])}
        {helpChangeString(post, sortedArray[2])}
        {post.content.slice(sortedArray[2][0]+1,sortedArray[3][0])}
        {helpChangeString(post, sortedArray[3])}
        {post.content.slice(sortedArray[3][0]+1,sortedArray[4][0])}
        {helpChangeString(post, sortedArray[4])}
        {post.content.slice(sortedArray[4][0]+1,sortedArray[5][0])}
        {helpChangeString(post, sortedArray[5])}
        {post.content.slice(sortedArray[5][0]+1)}
      </div> 
      )
  }

  // Function for changing both color and font
  // on certain places in a string.
  function helpChangeString(post, element) {
    if (element[1] == "color") {
      return (<font color="rgb(0,0,51)">{post.content[element[0]]}</font>)
    } else if (element[1] == "font") {
      return (<font face="monaco">{post.content[element[0]]}</font>)
    } else {
      return
    }
  }

  // Check if the post has picture(s) and
  // if it does, return it/them.
  function hasPicture(post) {
    if(post.hasOwnProperty('pictures')) {
      return (<div class="post-images">
              {post.pictures.map (picture => {
                    return (
                      <div>
                       <img src={picture[0]} alt={picture[1]} class="post-image"/>
                      </div>
                    )
                  })}
                </div>  
                )
    }
    return true;
  }

  // Function to shift an array to the left,
  // with the first element becoming the
  // new last element.
  function shiftArrayWrap(array, amount) {
    if(amount < 0) {
        amount = array.length + amount;
    }
    var tempNr;
    for (var a = 0; a < amount; a++) {
        tempNr = array.shift();
        array.push(tempNr);
      /*for (var i = array.length-1; i >= 0; i--) {
          if(i == 0) {
            tempArray[array.length - 1] = array[i];
          }  else {
            tempArray[i-1]=array[i];
          }
        }
        array = tempArray; */
    }
    return array;
  }

  // Encodes a string according to a key of letters and numbers.
  // The encoding is according to Mexican Army Wheels.
  function encodedMsg(toBeEncoded) {
    toBeEncoded = toBeEncoded.toLowerCase();
    const key = keyForEncryption; //TODO: use the keyForEncryption everywhere instead?

    // The different rings on a mexican wheel.
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var lowNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    var mediumNumbers = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
    var largeNumbers = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78];
    var highestNumbers = [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98 , 99, 100, "", "", "", ""];

    // Find indexes for placements of all keys.
    var letterIndexLow = letters.indexOf(key[0][0]);
    var lowNumbersIndex = lowNumbers.indexOf(key[0][1]);
    var letterIndexMedium = letters.indexOf(key[1][0]);
    var mediumNumbersIndex = mediumNumbers.indexOf(key[1][1]);
    var letterIndexLarge = letters.indexOf(key[2][0]);
    var largeNumbersIndex = largeNumbers.indexOf(key[2][1]);
    var letterIndexHighest = letters.indexOf(key[3][0]);
    var highestNumbersIndex = highestNumbers.indexOf(key[3][1]);

    // Shift the arrays to turn the rings according to the key.
    lowNumbers = shiftArrayWrap(lowNumbers, (lowNumbersIndex-letterIndexLow));
    mediumNumbers = shiftArrayWrap(mediumNumbers, (mediumNumbersIndex-letterIndexMedium));
    largeNumbers = shiftArrayWrap(largeNumbers, (largeNumbersIndex-letterIndexLarge));
    highestNumbers = shiftArrayWrap(highestNumbers, (highestNumbersIndex-letterIndexHighest));

    // Create some variable.
    var encodedArray = new Array(toBeEncoded.length);
    var tempIndex;
    var whichArray;

    // Encode each letter with a random choice of ring.
    for (var i = 0; i < toBeEncoded.length; i++) {
        tempIndex = letters.indexOf(toBeEncoded[i]);
        if(tempIndex == -1) {
            encodedArray[i] = toBeEncoded[i];
            continue;
        }
        whichArray = getRandomInt(1,5)
        if(whichArray == 1) {
            encodedArray[i] = lowNumbers[tempIndex];   
        } else if (whichArray == 2) {
            encodedArray[i] = mediumNumbers[tempIndex];
        } else if (whichArray == 3) {
            encodedArray[i] = largeNumbers[tempIndex];
        } else if (whichArray == 4) {
            if (highestNumbers[i] == "") {
                i--;
            } else {
                encodedArray[i] = highestNumbers[tempIndex];
            }
        }
    }
    encodedArray = encodedArray.join("");

    return encodedArray;
  }

  // Function to get a random number.
  // The maximum is exclusive and the minimum is inclusive.
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random(2) * (max - min) + min); 
  }

  // Function to encode the puzzle 2c.
  // See documentation for an explanation of the puzzle.
  // TODO: add name of document.
  function puzzle2c(post) {

    // This post has the puzzle in it.
    if (post.comment == "This is the main post to puzzle 2c.") {
      return (
        <div class="post">
          <div class="post-date">
            {dateAsClue}
          <div class="post-name"> 
            {post.poster} 
          {changeString(post,changeColor(post, "tda", 2),changeFont(post, "eda", 1))}
          <p id="test" style={{margin: '0', color:'hsl(47, 28%, 66%)'}}>
              {encodedMsg(answerToBeEncrypted)}
          </p>
          {hasPicture(post)}
          </div>
        </div>
      </div>
     )
    }
    // Else, it is one of the helper posts which also has a strange date as clue.
    return (
      <div class="post">
        <div class="post-date">
          {dateAsClue}
        <div class="post-name"> 
          {post.poster} 
        <div class="post-content">
          {post.content}
        </div>
        {hasPicture(post)}
        </div>
      </div>
    </div>
   )
  }

  //TODO!
  function puzzle2b(post) {
    return (
      <div class="post">
        <div class="post-date">
          {post.date}
        <div class="post-name"> 
          {post.poster} 
        <div class="post-content">
          {post.content}
        </div>
        {hasPicture(post)}
        </div>
      </div>
    </div>
   )
  }





  
}