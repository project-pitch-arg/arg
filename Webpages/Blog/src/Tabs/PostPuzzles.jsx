/*
  This file contains the functions necessary to make
  the puzzles hidden in posts modifiable.
  
  To change the answers, change the variables
  in the file ChangeableVariables.jsx.
*/

import colors from "./TabContent.css"
import Variables from "../JSONDocuments/ChangeableValues.json";

export default function Puzzles(post) {

  var imageIdentifierKey = -1;

  var picture = hasPicture(post);

  // Create a list for solved passwords if it does not exist.
  if(sessionStorage.getItem("solvedPasswords") === null) {
    var passwords = [""];
    sessionStorage.setItem("solvedPasswords", JSON.stringify(passwords));

  }
  
  // Return appropriately formatted post after altering according to 
  // potential puzzles.
    return (
      <div className="post">
          <div className="post-date">
            {post.date[0]}.{post.date[1]}.{post.date[2]}
            {showContent(post)}
          </div>
        </div>
    )

/* -------------------- Functions -------------------- */  

  function showContent(post) {
    // Checks if a post is a puzzle and in that case which puzzle it is.
    // Depending on the result it will return different displays.
    if(post.hasOwnProperty("puzzleNr")) {
      switch (post.puzzleNr) {
        case "B-p1": return puzzleBp1(post);
        case "B-p2": break;
        case "B-c1": break;
        case "B-c2": break;
        case "B-c3": break;
        case "B-c4": puzzleBc4(post); break;
        default: break;
      }  
    }
    return (
      <div className="post-name" id="content" >
        {post.poster}
        <pre className="post-content">
          {post.content}{checkPassword(post)}
        </pre>
        {picture}
      </div>
    )
  }

  // Function to encode the puzzle B-p1.
  // See more in the puzzle docuemntation for the blog.
  function puzzleBp1(post) {
    post = changeDinos(post);
    post.date[1] = Variables.clueDate;

    // This post has the puzzle in it.
    if (post.comment === "This is the main post to puzzle B-p1.") {
      return (
        <div className="post-name" id="content" >
        {post.poster}
        {changeString(post,changeColor(post, Variables.courseCode1, Variables.courseCode1Index),changeFont(post, Variables.courseCode2, Variables.courseCode2Index))}
        <p style={{margin: "0", color: colors.postBackground}}>
          {encodedMsg(JSON.stringify(Variables.answerToBeEncrypted))}
        </p>
        {insertPuzzlePics()}
        </div>
      )
    } else {
      return (
        <div className="post-name" id="content" >
          {post.poster}
          <pre className="post-content">
            {post.content}
          </pre>
          <p style={{margin: "0", color: colors.postBackground}}>
            {checkForHelper(post)}
          </p>
          {hasPicture(post)}
        </div>
      )
    }
  }

  function puzzleBc4(post) {
    if (post.comment === "This is the main post to puzzle B-c4.") {
      picture = multiPicture();
    }
  }

  function checkPassword(post) {
    if (post.hasOwnProperty("secret") && !(JSON.parse(sessionStorage.getItem("solvedPasswords"))).includes(post.secret)) {
      return (
        <form onSubmit={submitPassword(post)}>
          <input type="text" value={sessionStorage["postSecret"]} onChange={(e) => sessionStorage.setItem("postSecret", e.target.value)} className="input" placeholder="???" required />
          <div type="submit" />
        </form>
      )
      } else {
        return (
          <pre>
            {post.secretContent}
          </pre>
        )
      }
  }

  // Function to reveal content protected by password
  // when the password is correct.
  function submitPassword(post) {
    if(sessionStorage.getItem("postSecret") === post.secret) {
      var passwords = JSON.parse(sessionStorage.getItem("solvedPasswords"));
      passwords.push(post.secret);
      sessionStorage.setItem("solvedPasswords", JSON.stringify(passwords));
    }
    sessionStorage.removeItem("postSecret");
    return;
  }
  
  // This function changes the color of the letters in a post, where the 
  // argument count is the "x":th letter of that type.
  function changeColor(post, letter, count) {
    var indexArray = new Array(letter.length);
    var counter = 0;
    for(let i = 0; i < letter.length; i++) {
      const NUMBER = (post.content.split(letter[i]).length - 1);
      if (NUMBER < 1) {
        throw new Error("One of the course code letters doesn't exist in the content text.");
      }
      var index = post.content.indexOf(letter[i]);
      var count1 = count % NUMBER;
      while(count1 > 0) {
        index = post.content.indexOf(letter[i], index+1);
        count1--;
      }
      indexArray[counter] = index;
      counter++;
    }
    const INDEX_1 = indexArray[0];
    const INDEX_2 = indexArray[1];
    const INDEX_3 = indexArray[2];
    const finalArray = [[INDEX_1,"color"],[INDEX_2, "color"],[INDEX_3, "color"]];
    return finalArray;
  }

  // This function changes the font of the letters in a post, where the 
  // argument count is the "x":th letter of that type. It does this 
  // with the help of the previous "changeColor" function that works
  // in a similar way.
  function changeFont(post,letter, count) {
    var col = changeColor(post, letter, count);
    col[0][1] = "font";
    col[1][1] = "font";
    col[2][1] = "font";
    return col;
  }

  // This function takes two results from either "changeColor" or
  // "changeFont" or both and appends them together to then return it in
  // a HTML format appropriate for the post itself.
  function changeString(post, array1, array2) {
    var totalArray = array1.concat(array2);
    var sortedArray = totalArray.sort(function(a,b){return (a[0]-b[0])});
    for (var i = 0; i < sortedArray.length - 1; i++) {
      if (sortedArray[i][0] === sortedArray[i+1][0]) {
        throw new Error("Index chosen for course codes make a double letter. Please choose another index or another course code.");
      }
    }
    
    return (
      // With the help of the "helpChangeString" function each individual 
      // letter that is specified is modified by either it's color or
      // it's font.
      <pre className="post-content">
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
      </pre> 
      )
  }

  // Helper function to assign a character either a change in
  // font or a change in color and then help return that
  // in a proper HTML format.
  function helpChangeString(post, element) {
    if (element[1] === "color") {
      return (<font color={Variables.letterColour}>{post.content[element[0]]}</font>);
    } else if (element[1] === "font") {
      return (<font face={Variables.letterFont}>{post.content[element[0]]}</font>);
    }
    return;
  }

  // Insert correct images with zeroes according to 
  // ChangeableValues.jsx
  function insertPuzzlePics() {
    return (
    <div className="post-images">
      <div>
        <img src={require("../Img/" + Variables.jigsawSudoku)} alt="A numbers puzzle." className="post-image"/>
      </div>
      <div>
        <img src={require("../Img/" + Variables.blueHintPicture[1][Variables.blueHintPicture[0]])} alt="A picture of the dinosaur Ichthyosaurus." className="post-image"/>
      </div>
      <div>
        <img src={require("../Img/" + Variables.redHintPicture[1][Variables.redHintPicture[0]])} alt="A package of duros." className="post-image"/>
      </div>
      <div>
        <img src={require("../Img/" + Variables.greenHintPicture[1][Variables.greenHintPicture[0]])} alt="A computer drinking coffee." className="post-image"/>
      </div>
    </div>  
    )
  }

  // Set different pictures for different sized screens.
  function multiPicture() {
    return (
      <div className="post-images">
        <div>
          <picture>
            <source media="(min-width: 800px)" srcSet={require("../Img/SunsetView.jpg")} className="post-image"/> 
            <img src={require("../Img/" + Variables.parkEntrance)} alt="Image of park entrance." className="post-image"/>
          </picture>
        </div>
        <div>
          <picture>
            <source media="(min-width: 600px)" srcSet={require("../Img/RedSkyAndPool.jpg")} className="post-image"/> 
            <img src="" alt={Variables.directions} className="post-image"/>
          </picture>
        </div>
      </div>  
      )
  }

  // Check if the post has picture(s) and
  // if it does, return it/them in proper HTML format.
  function hasPicture(post) {
    if(post.hasOwnProperty("pictures")) {
      return (<div className="post-images">
              {post.pictures.map (picture => {
                imageIdentifierKey++;
                return (
                  <div key={imageIdentifierKey}>
                    <img src={require("../Img/" + picture[0])} alt={picture[1]} className="post-image"/>
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
    }
    return array;
  }

  // Encodes a string according to a key of letters and numbers.
  // The encoding is according to the Mexican Army Wheel Cipher.
  function encodedMsg(toBeEncoded) {
    toBeEncoded = toBeEncoded.toLowerCase();

    if (Variables.encryptionKey[0][1] < 1 || Variables.encryptionKey[0][1] > 26) {
      throw new Error("First number of encryption key must be within bounds [1,26].");
    } 
    if (Variables.encryptionKey[1][1] < 27 || Variables.encryptionKey[1][1] > 52) {
      throw new Error("Second number of encryption key must be within bounds [27,53].");
    }
    if (Variables.encryptionKey[2][1] < 53 || Variables.encryptionKey[2][1] > 78) {
      throw new Error("Third number of encryption key must be within bounds [53,78].");
    }
    if (Variables.encryptionKey[3][1] < 79 || Variables.encryptionKey[3][1] > 100) {
      throw new Error("Fourth number of encryption key must be within bounds [79,100].");
    }

    // The different rings on a mexican army wheel.
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var lowNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    var mediumNumbers = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
    var largeNumbers = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78];
    var highestNumbers = [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98 , 99, 100, "", "", "", ""];

    // Find indexes for placements of all keys.
    var letterIndexLow = letters.indexOf(Variables.encryptionKey[0][0]);
    var lowNumbersIndex = lowNumbers.indexOf(Variables.encryptionKey[0][1]);
    var letterIndexMedium = letters.indexOf(Variables.encryptionKey[1][0]);
    var mediumNumbersIndex = mediumNumbers.indexOf(Variables.encryptionKey[1][1]);
    var letterIndexLarge = letters.indexOf(Variables.encryptionKey[2][0]);
    var largeNumbersIndex = largeNumbers.indexOf(Variables.encryptionKey[2][1]);
    var letterIndexHighest = letters.indexOf(Variables.encryptionKey[3][0]);
    var highestNumbersIndex = highestNumbers.indexOf(Variables.encryptionKey[3][1]);

    // Shift the arrays to turn the rings according to the key.
    lowNumbers = shiftArrayWrap(lowNumbers, (lowNumbersIndex-letterIndexLow));
    mediumNumbers = shiftArrayWrap(mediumNumbers, (mediumNumbersIndex-letterIndexMedium));
    largeNumbers = shiftArrayWrap(largeNumbers, (largeNumbersIndex-letterIndexLarge));
    highestNumbers = shiftArrayWrap(highestNumbers, (highestNumbersIndex-letterIndexHighest));

    // Create some variables to help the encoding.
    var encodedArray = new Array(toBeEncoded.length);
    var tempIndex;
    var whichArray;

    // Encode each letter with a number from a 
    // random choice of the four rings.
    for (var i = 0; i < toBeEncoded.length; i++) {
        tempIndex = letters.indexOf(toBeEncoded[i]);

        // If the character isn't a letter,
        // keep it as it is without encoding it.
        if(tempIndex === -1) {
            encodedArray[i] = toBeEncoded[i];
            continue;
        }

        whichArray = getRandomInt(1,5)

        // Choose a random ring to take the encoding from
        // and apply it to the output.
        if(whichArray === 1) {
            encodedArray[i] = lowNumbers[tempIndex];   
        } else if (whichArray === 2) {
            encodedArray[i] = mediumNumbers[tempIndex];
        } else if (whichArray === 3) {
            encodedArray[i] = largeNumbers[tempIndex];
        } else if (whichArray === 4) {
            if (highestNumbers[i] === "") {
                i--;
            } else {
                encodedArray[i] = highestNumbers[tempIndex];
            }
        }
    }

    // Format the output appropriately by displaying
    // each element of the array next to each other.
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

  // Replaces the dinosaurs in the puzzle post with the 
  // specified names from ChangeableValues. Also makes
  // sure that they are all capitalized. See documentation.
  function changeDinos(post) {
    if (!post.content.includes("XXDINO1XX") && !post.content.includes("XXDINO2XX") && !post.content.includes("XXDINO3XX")) {
      return post;
    }
    const LIST_COPY = Variables.listForCourseCode3;
    var firstTriggered = false;
    var secondTriggered = false;
    var thirdTriggered = false;
    for (var i = 0; i < LIST_COPY.length; i++) {
      if (LIST_COPY[i][0].toLocaleUpperCase() == Variables.courseCode3[0][0].toLocaleUpperCase() && !firstTriggered) {
        var dino1 = LIST_COPY[i][0].toLocaleUpperCase() + LIST_COPY[i].slice(1);
        firstTriggered = true;
      } else if (LIST_COPY[i][0].toLocaleUpperCase() == Variables.courseCode3[1][0].toLocaleUpperCase() && !secondTriggered) {
        var dino2 = LIST_COPY[i][0].toLocaleUpperCase() + LIST_COPY[i].slice(1);
        secondTriggered = true;
      } else if (LIST_COPY[i][0].toLocaleUpperCase() == Variables.courseCode3[2][0].toLocaleUpperCase() && !thirdTriggered) {
        var dino3 = LIST_COPY[i][0].toLocaleUpperCase() + LIST_COPY[i].slice(1);
        thirdTriggered = true;
      } 
    }
    post.content = post.content.replace("XXDINO1XX", dino1);
    post.content = post.content.replace("XXDINO2XX", dino2);
    post.content = post.content.replace("XXDINO3XX", dino3);
    return post;
  }

  // Detection function to know which post should lead to which function.
  function checkForHelper(post) {
    if(post.comment === "This post is helper post 1 to puzzle B-p1.") {
      return Variables.hintDinosaurs;
    } else if (post.comment === "This post is helper post 2 to puzzle B-p1") {
      return Variables.hintCourses;
    }
    return;
  }
}

export function errorChecker() {
  // Start with some error checking for the JSON values
  const DIFFERENT_COLORS = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue",
                            "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", 
                            "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", 
                            "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue",
                            "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey",
                            "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod",
                            "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender",
                            "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", 
                            "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey",
                            "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", 
                            "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed",
                            "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange",
                            "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru",
                            "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown",
                            "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", 
                            "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

  const DIFFERENT_FONTS = ["Arial", "Arial Black", "Verdana", "Tahoma", "Trebuchet MS", "Impact", "Times New Roman", "Didot", "Georgia", "American Typewriter",
                            "Andalé Mono", "Courier", "Lucida Console", "Monaco", "Bradley Hand", "Brush Script MT", "Luminari", "Comic Sans MS"];

  if (Variables.quoteTime < 1)
      throw new Error("Delay for quotes has to be a positive number.");
  if (Variables.encryptionKey[0][0].length !== 1)
      throw new Error("First encryption key has to be a single letter.");
  if (Variables.encryptionKey[1][0].length !== 1)
      throw new Error("Second encryption key has to be a single letter.");
  if (Variables.encryptionKey[2][0].length !== 1)
      throw new Error("Third encryption key has to be a single letter.");
  if (Variables.encryptionKey[3][0].length !== 1)
      throw new Error("Fourth encryption key has to be a single letter.");
  if (Variables.courseCode1.length !== 3)
      throw new Error("First course code has to be three letters.");
  if (Variables.courseCode2.length !== 3)
      throw new Error("Second course code has to be three letters.");
  if (Variables.courseCode3.length !== 3)
      throw new Error("Third course code has to be three letters.");
  if (Variables.postsPerPage < 1)
      throw new Error("1 or more posts has to be displayed.");
  if (Variables.tabNames.length !== 5)
      throw new Error("There are supposed to be 5 tab names.");
  if (!(!DIFFERENT_COLORS.includes(Variables.letterColour) && !(Variables.letterColour.slice(0,3) === "rbg") && 
        !(Variables.letterColour.slice(0,1) === "#") && !(Variables.letterColour.slice(0,3) === "hsl") && 
        !(Variables.letterColour.slice(0,4) === "rgba") && !(Variables.letterColour.slice(0,4) === "hsla"))) {
      throw new Error("The specified color should be a color in a correct format.");
  }
  if (!DIFFERENT_FONTS.includes(Variables.letterFont))
      throw new Error("The specified font should be an existing web safe font.");
}