import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
  var list = [];
  const data = fs.readFileSync("./JsonFiles/News.json");
  return res.send(data);
});
app.post('/getHR', (req, res) => {
  var list = [];
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
            return res.send(data[0][key]);
        }
  })
  return res.send({error: "Wrong password or username!"});
});

app.listen(process.env.PORT || 8080, () =>
  console.log('Server listening on port 8080!'),
);
