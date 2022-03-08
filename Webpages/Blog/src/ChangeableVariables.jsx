/*
    In this file are the variables which
    could be modified to change the blog page.
    
    To change posts, go to PostContent.json.

    To change About, go to AboutContent.json.

    To change quotes, got to QuotesContent.json.
*/


// Import picutres you wish to use, with the relative
// path as seen from this file.
import Robot from './Img/Robot1312113.png';
import CaesarSalad from './Img/Caesar.png';
import content from './Tabs/PostContent.json';



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

/* -------------------- Puzzle 2c -------------------- */

export const ANSWER_TO_BE_ENCRYPTED = "http://ThisWillBeAWebSiteAddress.later";

// This key needs to be an array with smaller arrays
// each containing first a letter as a string and
// then an integer. The number can at most be 100.
// Example: [["m", 11],["d", 28], ["o", 57], ["a", 80]]
// TODO: Include number limits for each subset.
export const ENCRYPTION_KEY = [["m", 11],["d", 28], ["o", 57], ["a", 80]];

// See documentation (TODO: write this) for what
// meaning this clue has. It replaces the date in
// PostContent.json for the post belonging to puzzle 2c
// with this clue.
export const CLUE_DATE = "2022.80A.24";

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

