import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

var cipher = "";
var encryptedCipher = "";
var activateCypherGenerator = false;

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
function generateCipher(){
    cipher = "";
    encryptedCipher = "";
    var randomLetter = getRandomInt(69,118);
    var word = fs.readFileSync("./JsonFiles/cipherWords.json");
    var json = JSON.parse(word);
    var animal = json[getRandomInt(0,json.length)];
    cipher += animal;
    encryptedCipher += caesarCipher(animal,241);
    setTimeout(clearCipher, 60000)
}
function clearCipher(){
    cipher = "823048234923";
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkToken(req){
    const tokenFile = fs.readFileSync("./JsonFiles/Tokens.json");
    var json = JSON.parse(tokenFile);
    var ip_adress = req.socket.remoteAddress;
    try{
        json[ip_adress].token = json[ip_adress].token;
        return {"token": true};
    }
    catch {
        return {"token": false};
    }
}

app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Returns the names of all the files in the specified directory
app.post('/getFiles', (req, res) => {
  var data = req.body.data;
  var list = [];

  fs.readdir("../" + data, (err,files) =>  {
      files.forEach((file) => {
        if(file.split(".")[1] === "js" || file.split(".")[1] === "jsx" ){
            list.push(file.split(".")[0]);
        }
      })
        //Adjusts the list so home always comes first
        for(var i = 0; i < list.length; i++){
            if(list[i] == "Home" && i !== 0){
                var temp = list[i];
                list[i] = list[0];
                list[0] = temp;
            }
        }
        return res.send(JSON.stringify({files: list}));
    })
});
app.post('/getNews', (req, res) => {
  const data = fs.readFileSync("./JsonFiles/News.json");
  return res.send(data);
});
app.post('/getQuiz', (req, res) => {
  const data = fs.readFileSync("./JsonFiles/Quiz.json");
  return res.send(data);
});
app.post('/getHR', (req, res) => {
  const data = fs.readFileSync("./JsonFiles/HR.json");
  return res.send(data);
});
app.post("/getPolicy", (req, res) => {
  var list = [];
  fs.readdir("./PDF/", (err,files) =>  {
        files.forEach((file) => {
            list.push(file);
        })
          return res.send(JSON.stringify({files: list}));
      })
});
app.post("/getPDF", (req, res) => {
  var data = req.body.fileName;
  res.sendFile(__dirname + "/PDF/" + data);
});
app.post("/getUser", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  const response = fs.readFileSync("./JsonFiles/Accounts.json");
  var data = JSON.parse(response);
  Object.keys(data[0]).forEach((key) => {
        if(data[0][key].username === username && data[0][key].password == password){
            data[0][key].password = "";
            return res.send(data[0][key]);
        }
  })
  return res.send({error: "Wrong password or username!"});
});
app.post("/checkCipher", (req, res) => {
  var response = req.body.cipher;
  if(cipher === response){
        const file = fs.readFileSync("./JsonFiles/Accounts.json");
        var data = JSON.parse(file);
        const tokenFile = fs.readFileSync("./JsonFiles/Tokens.json");
        var json = JSON.parse(tokenFile);
        var ip_adress = req.socket.remoteAddress;
        try{
            json[ip_adress].token = json[ip_adress].token;
        }
        catch{
            json[ip_adress] = { "token" : getRandomInt(100000000000000000000,1000000000000000000000)};
        }
        fs.writeFileSync("./JsonFiles/Tokens.json", JSON.stringify(json));
        Object.keys(data[0]).forEach((key) => {
              if(data[0][key].username === "CEO"){
                    data[0][key].password = "";
                    data[0][key].token = json[ip_adress].token;
                    return res.send(data[0][key]);
              }
        })
  }
  else {
    return res.send({error: "Wrong answer!"});
  }
});
app.post("/checkToken", (req, res) => {
  var token = req.body.token;

  var ip_adress = req.socket.remoteAddress;
  if(checkToken(ip_adress)){
    return res.send({"token" : true})
  }
  else {
    return res.send({"token" : true})
  }
});

app.post("/getCipher", (req, res) => {
    generateCipher();
    return res.send({data: encryptedCipher});
});

app.listen(process.env.PORT || 8080, () =>
  console.log('Server listening on port 8080!'),
);
