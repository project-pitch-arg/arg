import React from 'react';

export default function Puzzles(post) {

  function changeColor(post, letter, count) {
    var indexArray = new Array(letter.length);
    var counter = 0;
    for(let i = 0; i<letter.length; i++){
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

  function changeFont(post,letter, count) {
    var col = changeColor(post, letter, count);
    col[0][1] = "font";
    col[1][1] = "font";
    col[2][1] = "font";
    return col;
  }

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

  function helpChangeString(post, element) {
    if (element[1] == "color") {
      return (<font color="rgb(0,0,51)">{post.content[element[0]]}</font>)
    } else if (element[1] == "font") {
      return (<font face="monaco">{post.content[element[0]]}</font>)
    } else {
      return
    }
  }

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

  function shiftArrayWrap(array, amount) {
    var tempArray = new Array(array.length);
    for (var a = 0; a<amount; a++) {
        for (var i = 0; i<array.length; i++) {
            tempArray[(i+1)%array.length]=array[i];
        }
        array = tempArray;
    }
    return array;
  }

  function encodedMsg(toBeEncoded) {
    const key = ["a", 11, 28, 57, 80];

    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var lowNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    var mediumNumbers = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
    var largeNumbers = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78];
    var highestNumbers = [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98 , 99, 100, "", "", "", ""];

    var letterIndex = letters.indexOf(key[0]);
    var lowNumbersIndex = lowNumbers.indexOf(key[1]);
    var mediumNumbersIndex = mediumNumbers.indexOf(key[2]);
    var largeNumbersIndex = largeNumbers.indexOf(key[3]);
    var highestNumbersIndex = highestNumbers.indexOf(key[4]);

    lowNumbers = shiftArrayWrap(lowNumbers, (lowNumbersIndex-letterIndex)%letters.length)
    mediumNumbers = shiftArrayWrap(mediumNumbers, (mediumNumbersIndex-letterIndex)%letters.length)
    largeNumbers = shiftArrayWrap(largeNumbers, (largeNumbersIndex-letterIndex)%letters.length)
    highestNumbers = shiftArrayWrap(highestNumbers, (highestNumbersIndex-letterIndex)%letters.length)

    var encodedArray = new Array(toBeEncoded.length);
    var tempIndex;
    var whichArray;

    for (var i = 0; i<toBeEncoded.length; i++) {
        tempIndex = letters.indexOf(toBeEncoded[i]);
        whichArray = getRandomInt(1,5)
        if(whichArray == 1) {
            encodedArray[i] = lowNumbers[i];
        } else if (whichArray == 2) {
            encodedArray[i] = mediumNumbers[i];
        } else if (whichArray == 3) {
            encodedArray[i] = largeNumbers[i];
        } else if (whichArray == 4) {
            if (highestNumbers[i] == "") {
                i--;
            } else {
                encodedArray[i] = highestNumbers[i];
            }
        }
    }
    encodedArray = encodedArray.join("");

    return encodedArray;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    // The maximum is exclusive and the minimum is inclusive.
    return Math.floor(Math.random(2) * (max - min) + min); 
  }

  function puzzle2c(post) {
    if(post.comment == "This post belongs to puzzle 2c-a.") {
      return (
        <div class="post">
          <div class="post-date">
            {post.date}
          <div class="post-name"> 
            {post.poster} 
          {changeString(post,changeColor(post, "tda", 2),changeFont(post, "eda", 1))}
          <p id="test" style={{margin: '0', color:'hsl(47, 28%, 66%)'}}>
              {encodedMsg("test")}
          </p>
          {hasPicture(post)}
          </div>
        </div>
      </div>
     )
    }
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

  if(post.isPuzzle) {
    switch (post.puzzleNr) {
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
}