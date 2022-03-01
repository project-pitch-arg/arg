/*
    In this file are the variables which
    could be modified to change the blog page.
    
    To change posts, go to PostContent.json.

    To change About, go to AboutContent.json.

    To change quotes, got to QuotesContent.json.
*/


// Import picutres you wish to use, with the relative
// path as seen from this file.
import Robot from './img/Robot1312113.png';
import CaesarSalad from './img/Caesar.png';



/* -------------------- Creators of the blog -------------------- */

// Keep in mind that these are in a puzzle and connected to the 
// real names. EXPLAIN MORE WHEN PUZZLE IS ADDED AND SOLVED IN CHAT.
export const userName1 = "Robot1312113";
export const userName2 = "Fexjo";

const realFirstName1 = "Wilfred";
const realLastName1 = "Malm";

const realFirstName2 = "Edwin";
const realLastName2 = "Fairchild";

export const userPicture1 = Robot;
export const userPicture2 = CaesarSalad;

/* -------------------- Tab QotD -------------------- */

// The time intervall of changing quotes in seconds.
export const changeQuoteTime = 30;

/* -------------------- Puzzle 2c -------------------- */

export const answerToBeEncrypted = "http://ThisWillBeAWebSiteAddress.later";

// This key needs to be an array with smaller arrays
// each containing first a letter as a string and
// then an integer. The number can at most be 100.
// Example: [["m", 11],["d", 28], ["o", 57], ["a", 80]]
export const keyForEncryption = [["m", 11],["d", 28], ["o", 57], ["a", 80]];

// See documentation (TODO: write this) for what
// meaning this clue has. It replaces the date in
// PostContent.json for the post belonging to puzzle 2c
// with this clue.
export const dateAsClue = "24-80A-22";

