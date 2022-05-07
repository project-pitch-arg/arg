import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import imap from './emailListener.js';
import {generateCipher,cipher,encryptedCipher,getRandomInt} from "./cipherController.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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
  const data = fs.readFileSync("../../json/News.json");
  return res.send(data);
});
app.post('/getQuiz', (req, res) => {
  const data = fs.readFileSync("../../json/Quiz.json");
  return res.send(data);
});
app.post('/getHR', (req, res) => {
  const data = fs.readFileSync("../../json/HR.json");
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
app.post("/getSecretDocuments", (req, res) => {
  var list = [];
  fs.readdir("./SecretFiles/", (err,files) =>  {
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
app.post("/getSecretPDF", (req, res) => {
  var data = req.body.fileName;
  res.sendFile(__dirname + "/SecretFiles/" + data);
});

app.post("/getUser", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  const response = fs.readFileSync("../../json/Accounts.json");
  var data = JSON.parse(response);
  var check = false;
  Object.keys(data[0]).forEach((key) => {
        if(data[0][key].username === username && data[0][key].password == password && !check){
            check = true;
            return res.send(data[0][key]);
        }
  });
  if(!check)
    return res.send({error: "Wrong password or username!"});
});
app.post("/getCEOName", (req, res) => {
    const response = fs.readFileSync("../../json/Accounts.json");
    var data = JSON.parse(response);
    var check = false;
    Object.keys(data[0]).forEach((key) => {
            if(data[0][key].title === "CEO"){
                check = true;
                return res.send({name: data[0][key].username});
            }
      });
      if(!check)
        return res.send({error: "No CEO in database"});
});

app.post("/checkCipher", (req, res) => {
  var response = req.body.cipher;
  if(cipher === response){
        const file = fs.readFileSync("../../json/Accounts.json");
        var data = JSON.parse(file);
        Object.keys(data[0]).forEach((key) => {
              if(data[0][key].title === "CEO"){
                    return res.send(data[0][key]);
              }
        })
  }
  else {
    return res.send({error: "Wrong answer!"});
  }
});

app.post("/getCipher", (req, res) => {
    generateCipher();
    return res.send({data: encryptedCipher});
});

app.listen(process.env.PORT || 8080, () =>
  console.log('Server listening on port 8080!'),
);
