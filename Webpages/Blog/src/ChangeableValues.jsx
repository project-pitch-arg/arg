/*
    In this file are the variables which
    could be modified to change the blog page.
    
    To change posts, go to PostContent.json.

    To change About, go to AboutContent.json.

    To change quotes, got to QuotesContent.json.
*/


// Import picutres you wish to use, with the relative
// path as seen from this file.
import Robot from "./Img/Robot1312113.png";
import CaesarSalad from "./Img/Caesar.png";
import content from "./Tabs/PostContent.json";
import DurosBasic from "./Img/Duros.jpg";
import DurosLight from "./Img/DurosLightRed.jpg";
import DurosMedium from "./Img/DurosRed.jpg";
import DurosDark from "./Img/DurosDarkRed.jpg";
import ComputerBasic from "./Img/Computer.png";
import ComputerLight from "./Img/ComputerLightGreen.png";
import ComputerMedium from "./Img/ComputerGreen.png";
import ComputerDark from "./Img/ComputerDarkGreen.png";
import IchthyosaurusBasic from "./Img/Ichthyosaurus.png";
import IchthyosaurusLight from "./Img/IchthyosaurusLightBlue.png";
import IchthyosaurusMedium from "./Img/IchthyosaurusBlue.png";
import IchthyosaurusDark from "./Img/IchthyosaurusDarkBlue.png";
import Jigsaw from "./Img/NumbersPuzzle.png";
import ParkEntrance from "./Img/ParkEntrance.png";



/* -------------------- Creators of the blog -------------------- */

// Keep in mind that these are in a puzzle and connected to the 
// real names. EXPLAIN MORE WHEN PUZZLE IS ADDED AND SOLVED IN CHAT.
export const USER_NAME_1 = "Robot1312113";
export const USER_NAME_2 = "Fexjo";

const REAL_FIRST_NAME_1 = "Wilfred";
const REAL_LAST_NAME_1 = "Malm";

const REAL_FIRST_NAME_2 = "Edwin";
const REAL_LAST_NAME_2 = "Fairchild";

export const USER_PICTURE_1 = Robot;
export const USER_PICTURE_2 = CaesarSalad;

/* -------------------- Tab QotD -------------------- */

// The time interval of changing quotes in seconds.
// Edit this to change the time each quote is displayed.
export const QUOTE_TIME = 30;

/* -------------------- Puzzle B-p1 -------------------- */

// Solution to B-p1, this is an address to the next
// website. See documentation for more detail.
export const ANSWER_TO_BE_ENCRYPTED = "http://ThisWillBeAWebSiteAddress.later";

// This key needs to be an array with smaller arrays
// each containing first a letter as a string and
// then an integer. The number can at most be 100.
// Example: [["m", 11],["d", 28], ["o", 57], ["a", 80]]
export const ENCRYPTION_KEY = [["m", 11],["d", 28], ["o", 57], ["a", 80]];

// See documentation for what
// meaning this clue has. It replaces the month of
// the date in PostContent.json for the post 
//belonging to puzzle B-p1 with this clue.
export const CLUE_DATE = "80A";

// Specified font to change certain letters for
// the puzzle. See documentation for explanation.
// This should be a web safe font that's 
// properly capitalized.
export const LETTER_FONT = "Monaco";

// Specified color to change certain letters for
// the puzzle. See documentation for explanation.
// If color name then capitalize. Example: Red.
export const LETTER_COLOR = "rgb(0,0,51)";

// First of two course codes to be included. This
// Will have a changed color. See documentation 
// for details.
export const COURSE_CODE_1 = "tda";

// Which index number to use for COURSE_CODE_1. 
// Example: An index number of 2 would mean that
// the second instance of each letter in the 
// course code would be changed in the puzzle post.
export const CC_1_INDEX = 2;

// Second of two course codes to be included. This
// Will have a changed font. See documentation 
// for details.
export const COURSE_CODE_2 = "eda";

// Works the same as CC_1_INDEX but this one is
// for COURSE_CODE_2.
export const CC_2_INDEX = 1;

// Three dinosaur names for the puzzle. See 
// documentation for details.
export const THREE_DINOS = ["Aardonyx", "Datanglong", "Talarurus"];

// A hint to allude to the dino part of the puzzle.
export const HINT_DINOS = "I wonder why only two dinosaurs are capitalized? Maybe you can find another one that's capitalized as well?";

// A hint to allude to the courses part of the puzzle.
export const HINT_COURSES = "See if you can build some other course codes from pieces you find here and there. I'm sure you'll find something interesting on their canvas course pages.";

// Choice of having zero or not. As well as what shading.
export const DUROS_IMAGE = DurosLight;

// Choice of having zero or not. As well as what shading.
export const ICHTI_IMAGE = IchthyosaurusBasic;

// Choice of having zero or not. As well as what shading.
export const COMPUTER_IMAGE = ComputerBasic;

// Image of chosen Jigsaw sukoku with rings. According
// to the wanted course codes.
export const JIGSAW_IMAGE = Jigsaw;

/* -------------------- Puzzle B-c4 -------------------- */

// The picture visible when the window is resized.
// Read more in documentation.
export const PARK_ENTRANCE_IMAGE = ParkEntrance;

// The number of steps and in what direction to go
// from the park entrance and the number of the final
// locker. Read more in documentation of the puzzle.
export const DIRECTIONS = "20 34N, 25 150SE, 115 71E, 88 336NW, 72 354N, 35 53NE, 60 6N, 60 310NW, 55 33NE, 80 14N, 24 73E, 125 116SE" +
                            "62 84E, 112 16N, 155 18N, 30 260W, 34 303NW, 73 280W, 227 104E, 110 351N, 5 38NE, 25 155SE, F23";

/* -------------------- Tab Posts -------------------- */

// Global list to access sorted posts through other tabs. 
// Like the Home page for example.
export var postContent = content;

// Function that is needed to change the list in other tabs than this one.
export function setPostContent(content) {
    postContent = content;
}

// Edit this variable to change the posts displayed on each page.
export const POSTS_PER_PAGE = 5;

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

export default function errorChecker() {

    if (QUOTE_TIME < 1) {
        throw "Delay for quotes has to be a positive number.";
    }

    if (ENCRYPTION_KEY[0][0].length != 1) {
        throw "First encryption key has to be a single letter.";
    }

    if (ENCRYPTION_KEY[1][0].length != 1) {
        throw "Second encryption key has to be a single letter.";
    }

    if (ENCRYPTION_KEY[2][0].length != 1) {
        throw "Third encryption key has to be a single letter.";
    }

    if (ENCRYPTION_KEY[3][0].length != 1) {
        throw "Fourth encryption key has to be a single letter.";
    }

    if (COURSE_CODE_1.length != 3) {
        throw "First course code has to be three letters.";
    }

    if (COURSE_CODE_2.length != 3) {
        throw "Second course code has to be three letters.";
    }

    if (THREE_DINOS.length != 3) {
        throw "There has to be exactly three dinosaurs.";
    }

    if (POSTS_PER_PAGE < 1) {
        throw "1 or more posts has to be displayed.";
    }

    if (!(!DIFFERENT_COLORS.includes(LETTER_COLOR) && !(LETTER_COLOR.slice(0,3) == "rbg") && !(LETTER_COLOR.slice(0,1) == "#") && !(LETTER_COLOR.slice(0,3) == "hsl") && !(LETTER_COLOR.slice(0,4) == "rgba") && !(LETTER_COLOR.slice(0,4) == "hsla"))) {
        throw "The specified color should be a color in a correct format.";
    }

    if (!DIFFERENT_FONTS.includes(LETTER_FONT)) {
        throw "The specified font should be an existing web safe font.";
    }
}