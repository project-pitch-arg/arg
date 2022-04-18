
//------------- JSON

var jsonData1 = require('../../json/companyWebsite.json');
var jsonData = require('../../json/emailResponses.json');

var helena_temp = jsonData.helena;
var lyra_temp = jsonData.lyra;
var wilfred_temp = jsonData.wilfred;

//--------------Helena

var helena_first_reply = helena_temp.first_reply;
var helena_second_reply = helena_temp.second_reply;
var helena_third_reply = helena_temp.third_reply;
var helena_no_reply = helena_temp.no_reply;

//------------ Lyra

var lyra_first_reply = lyra_temp.first_reply;
var lyra_hint = lyra_temp.hint;
var lyra_no_reply = lyra_temp.no_reply;

//------------ Wilfred
var wilfred_first_reply = wilfred_temp.first_reply;
var wilfred_second_reply = wilfred_temp.second_reply;
var wilfred_third_reply = wilfred_temp.third_reply;
var wilfred_fourth_reply = wilfred_temp.fourth_reply;

//our work password
var temp = jsonData1.our_work;
var ourWorkPassword = temp.username;

//about us password
var temp = jsonData1.about_us;
var aboutUsPassword = temp.password;
//--------------
const path = require('path');
const fs = require('fs');
const PdfReader = require('pdfreader').PdfReader;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var Imap = require('imap'),
    inspect = require('util').inspect;

var MailListener = require("mail-listener2");

//------------- Creation of MailListeners

var helena_mailListener = new MailListener({
  username: 'helena.godspeed@gmail.com',
  password: 'Speed241',
  host: 'imap.gmail.com',
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: null, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email will be marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: false}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});
var lyra_mailListener = new MailListener({
  username: 'LyraBell.Difax@gmail.com',
  password: 'ColoradoSprings532',
  host: 'imap.gmail.com',
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: null, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});
var wilfred_mailListener = new MailListener({
  username: 'wilfredmalm285@gmail.com',
  password: 'yellowstoneCaldera916',
  host: 'imap.gmail.com',
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: null, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: false}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

//-------------- start listening

helena_mailListener.start();
lyra_mailListener.start();
wilfred_mailListener.start();

//-------------

helena_mailListener.on("server:connected", function(){
  console.log("helena_mailListener listener active");
});
lyra_mailListener.on("server:connected", function(){
  console.log("lyra_mailListener listener active");
});
wilfred_mailListener.on("server:connected", function(){
  console.log("wilfred_mailListener listener active");
});

//----------------
helena_mailListener.on("server:disconnected", function(){
  console.log("helena_mailListener listener inactive");
});
lyra_mailListener.on("server:disconnected", function(){
  console.log("lyra_mailListener listener inactive");
});
wilfred_mailListener.on("server:disconnected", function(){
  console.log("wilfred_mailListener listener inactive");
});

//----------------
helena_mailListener.on("error", function(err){
  console.log(err);
});
lyra_mailListener.on("error", function(err){
  console.log(err);
});
wilfred_mailListener.on("error", function(err){
  console.log(err);
});

//----------------
var nodemailer = require('nodemailer');
var helena_transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'helena.godspeed@gmail.com',
    pass: 'Speed241'
  }
});
var lyra_transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'LyraBell.Difax@gmail.com',
    pass: 'ColoradoSprings532'
  }
});
var wilfred_transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'WilfredMalm285@gmail.com',
    pass: 'yellowstoneCaldera916'
  }
});
//---------------------
var helena_mailOptions = {
  from: 'helena.godspeed@gmail.com',
  to: '',
  subject: '',
  text: '',
};
var lyra_mailOptions = {
  from: 'LyraBell.Difax@gmail.com',
  to: '',
  subject: '',
  text: '',
};
var wilfred_mailOptions = {
  from: 'WilfredMalm285@gmail.com',
  to: '',
  subject: '',
  text: '',
};
//--------------------

function helena_sendMail(subject, to,message){
    helena_mailOptions.subject = subject;
    helena_mailOptions.to = to;
    helena_mailOptions.text = message;
    helena_transporter.sendMail(helena_mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
function lyra_sendMail(subject, to,message){
    lyra_mailOptions.subject = subject;
    lyra_mailOptions.to = to;
    lyra_mailOptions.text = message;
    lyra_transporter.sendMail(lyra_mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
function wilfred_sendMail(subject, to,message){
    wilfred_mailOptions.subject = subject;
    wilfred_mailOptions.to = to;
    wilfred_mailOptions.text = message;
    wilfred_transporter.sendMail(wilfred_mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
//------------- helena mail listener arguments
helena_mailListener.on("mail", function(mail, seqno, attributes){
    try {
        if(mail.text.includes("231")){
            helena_sendMail("Hello", mail.from, helena_first_reply);
            setTimeout(function() {
                helena_sendMail("Hello again", mail.from, helena_second_reply)
            }, 60000);
        }
        else if(mail.text.includes("3186")){
            helena_sendMail("Hello", mail.from, helena_first_reply);
            setTimeout(function() {
                helena_sendMail("Hello", mail.to[0], mail.from, helena_third_reply)
            }, 60000);
        }
        else {
            helena_sendMail("Hello", mail.from, helena_no_reply);
        }
    }
    catch {
        console.log("Helena email error");
     }

});
//------------- lyra mail listener arguments
lyra_mailListener.on("mail", function(mail, seqno, attributes){
    try {
        var text = mail.text.toUpperCase();
        var key = "wilfred";
        //checks if the email contains any words that match hint keys
        var hintKeys = ["help", "advice", "guidance", "hand", "support", "assist", "hint"];
        var doesContain = false;
        for(let i = 0; i<hintKeys.length;i++){
             if(text.includes(hintKeys[i].toUpperCase())){
                doesContain = true;
             }
         }
        if(text.includes(key.toUpperCase())){
            lyra_sendMail("Hello", mail.from, lyra_first_reply );
        }
        else if(doesContain){
            lyra_sendMail("An introduction to Difax", mail.from, lyra_hint);
        }
        else {
          lyra_sendMail("Hello", mail.from, lyra_no_reply);
        }
    }
    catch {
        console.log("Lyra email error");
    }
});
//------------- wilfred mail listener arguments
wilfred_mailListener.on("mail", function(mail, seqno, attributes){
    try {
        var text = mail.text.toUpperCase();
        if(text.includes(ourWorkPassword.toUpperCase()) && text.includes(aboutUsPassword.toUpperCase()) ){
            wilfred_sendMail("Hello again", mail.from, wilfred_second_reply)
            }
        else if(mail.attachments !== undefined){
            wilfred_mailOptions.to = mail.from;
        }
        else {
          wilfred_sendMail("Hello", mail.from, wilfred_first_reply);
        }
    }
    catch {
        console.log("wilfred email error");
    }

});
//---------------- Attachment handler for mail listeners

helena_mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});
lyra_mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});
wilfred_mailListener.on("attachment", function(attachment){
      var pathAttachments = path.join(__dirname, "/attachments/")
      setTimeout(readPDF,20000,collectNormalTexts,pathAttachments);

      var secretDirectory = path.join(__dirname, "/SecretFiles/")
      setTimeout(readPDF, 20000, collectSecretTexts,secretDirectory);
});

function readPDF(callback){
    var dir = arguments[1];
    fs.readdir(dir, function(err, filenames) {
        if (err) {
          onError(err);
          return;
        }
        filenames.forEach(function(filename) {
          fs.readFile (dir + filename, (err, pdfBuffer) => {
          // pdfBuffer contains the file content
          var text = "";
          new PdfReader().parseBuffer(pdfBuffer, function(err, item){
             if (err){
                 onError(err);
                 return;
                 }
              else if (!item){
                callback(text, filenames.length);
                return;
              }
              else if (item.text)
                  text += item.text;
             });
          });
        });
    });
}

var totalText = "";
var iText = 0;
var secretText = "";
var secretTextLoaded = false;
var normalTextLoaded = false;

function collectNormalTexts(text, filenames){
    iText++;
    totalText += text;
    if(secretTextLoaded && filenames === iText){
        compareTexts(totalText, secretText)
    }
    else if(filenames === iText){
        normalTextLoaded = true;
    }
}

function collectSecretTexts(text,filenames){
    secretText += text;
    secretTextLoaded = true;
    if(normalTextLoaded){
        compareTexts(totalText, secretText)
    }
}

function compareTexts(text1, text2){
    if(text1.includes(text2)){
        wilfred_sendMail("Hello", wilfred_mailOptions.to, wilfred_fourth_reply);
    }
    else {
        wilfred_sendMail("Hello", wilfred_mailOptions.to, wilfred_third_reply);
    }
    totalText = "";
    secretText = "";
}
