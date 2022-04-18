import fs from 'fs';

export var cipher = "";
export var encryptedCipher = "";

const caesarCipher = function(s, k) {
    let result = '';
    for (let i = 0; i < s.length; i++) {
        let charCode = s[i].charCodeAt();
        // check that charCode is a lowercase letter; automatically ignores non-letters
        if (charCode > 96 && charCode < 123) {

          charCode += k % 26 // makes it work with numbers greater than 26 to maintain correct shift
          // if shift passes 'z', resets to 'a' to maintain looping shift
          if (charCode > 122) {
            charCode = (charCode - 122) + 96;
          // same as previous, but checking shift doesn't pass 'a' when shifting negative numbers
          } else if (charCode < 97) {
            charCode = (charCode - 97) + 123;
          }
        }
        if (charCode > 64 && charCode < 91) {

          charCode += k % 26

          if (charCode > 90) {
            charCode = (charCode - 90) + 64;
          } else if (charCode < 65) {
            charCode = (charCode - 65) + 91;
          }
        }
        result += String.fromCharCode(charCode);
    }
        return result
}
export function generateCipher(){
    cipher = "";
    encryptedCipher = "";
    var randomLetter = getRandomInt(69,118);
    var word = fs.readFileSync("../../json/cipherWords.json");
    var json = JSON.parse(word);
    var animal = json[getRandomInt(0,json.length)];
    cipher += animal;
    encryptedCipher += caesarCipher(animal,231);
    setTimeout(clearCipher, 60000)
}
function clearCipher(){
    cipher = "823048234923";
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}