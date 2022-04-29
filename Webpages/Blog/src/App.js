import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import Wrong from "./Wrong";
import Home from "./Tabs/Home";
import Chat from "./Tabs/TabChat";
import Posts from "./Tabs/TabPosts";
import Variables from "./JSONDocuments/ChangeableValues.json"
import About from "./Tabs/TabAbout";
import Quotes from "./Tabs/TabQuotes";
import Header from "./Header/Header";
import Memory from "./Tabs/SkylinePuzzle/Memory";
import TextPuzzle from "./Tabs/SkylinePuzzle/TextPuzzle";
import SolvedScreen from "./Tabs/SkylinePuzzle/SolvedScreen";

function App() {
  
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
  
  try {
    errorChecker()
  } catch (error) {
    return (
      <div> {error.message} </div>
    )
  }
  
  function errorChecker() {
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
      if (Variables.threeDinosaurs.length !== 3)
          throw new Error("There has to be exactly three dinosaurs.");
      if (Variables.postsPerPage < 1)
          throw new Error("1 or more posts has to be displayed.");
      if (!(!DIFFERENT_COLORS.includes(Variables.letterColour) && !(Variables.letterColour.slice(0,3) === "rbg") && 
            !(Variables.letterColour.slice(0,1) === "#") && !(Variables.letterColour.slice(0,3) === "hsl") && 
            !(Variables.letterColour.slice(0,4) === "rgba") && !(Variables.letterColour.slice(0,4) === "hsla"))) {
          throw new Error("The specified color should be a color in a correct format.");
      }
      if (!DIFFERENT_FONTS.includes(Variables.letterFont))
          throw new Error("The specified font should be an existing web safe font.");
  }

  return (  
    // An HTML statement that sets up our website according to 
    // the specifications in "react-router-dom".
    <div className="app"> 
      <BrowserRouter>
       <Header />
        <TopBar />
        <Routes>
          <Route path="*" element={<Wrong />} /> {/*Default when path doesn't match any of the ones listed below*/}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Chat" element={<Chat />} />
          <Route exact path="/Posts" element={<Posts />} />
            <Route exact path="/Posts/478" element={<Memory />}/>
            <Route exact path="/Posts/GU" element={<TextPuzzle />}/>
            <Route exact path="/Posts/Triceratops" element={<SolvedScreen />}/>
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Quotes" element={<Quotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;