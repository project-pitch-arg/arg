import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();

var path = 'C:/Users/2021/Documents/GitHub/arg/Webpages/internFöretagsHemsida/';

app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/getFiles', (req, res) => {
  var data = req.body.data;
  var list = [];

  fs.readdir(path+data, (err,files) =>  {
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

app.listen(8080, () =>
  console.log('Example app listening on port 8080!'),
);
