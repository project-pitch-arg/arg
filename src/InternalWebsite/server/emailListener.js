const path = require('path');
const fs = require('fs');
const PdfReader = require('pdfreader').PdfReader;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var Imap = require('imap'),
    inspect = require('util').inspect;

var MailListener = require("mail-listener2");

var mailListener = new MailListener({
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

mailListener.start(); // start listening

mailListener.on("server:connected", function(){
  console.log("Mail listener active");
});

mailListener.on("server:disconnected", function(){
  console.log("Mail listener inactive");
});

mailListener.on("error", function(err){
  console.log(err);
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'helena.godspeed@gmail.com',
    pass: 'Speed241'
  }
});
var mailOptions = {
  from: '',
  to: '',
  subject: '',
  text: '',
};

function sendMail(subject,from, to, message){
    var mailSettings = {
      from: '',
      to: '',
      subject: '',
      text: '',
    };
    mailSettings.from = from;
    mailSettings.subject = subject;
    mailSettings.to = to;
    mailSettings.text = message;
    transporter.sendMail(mailSettings, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
mailListener.on("mail", function(mail, seqno, attributes){
    try {
        if(mail.attachments !== undefined && mail.to[0].address === "wilfred@gmail.com"){
            mailOptions.to = mail.from;
            mailOptions.from = "wilfred@gmail.com";
        }
        else if(mail.text.includes("231") && mail.to[0].address === "helena.godspeed@gmail.com"){
            sendMail("Hello", mail.to[0] , mail.from, "Where did you get this code? \n I will ask IT what it is about. \n//Helena");
            setTimeout(function() {
                sendMail("Hello",mail.to[0], mail.from, "I talked with IT and they say it's for a restricted page and we thank you for not sharing it.  \n//Helena")
            }, 60000);
        }
        else if(mail.text.includes("3186") && mail.to[0].address === "helena.godspeed@gmail.com"){
            sendMail("Hello", mail.from, "Where did you get this code? \n I will ask IT what it is about. \n//Helena");
            setTimeout(function() {
                sendMail("Hello", mail.to[0], mail.from, "I talked with IT and they say it's for a restricted command and we thank you for not sharing it.  \n//Helena")
            }, 60000);
        }
        else if(mail.to[0].address === "helena.godspeed@gmail.com"){
            sendMail("Hello", mail.to[0], mail.from, "Hello, i'm out of the office for a two week vacation i will be back on the 1st of April \nBest Regards Helena :)");
        }
        else if(mail.to[0].address === "wilfred@gmail.com"){
            sendMail("Hello", mail.to[0], mail.from, "Please use the code phrase");
        }
    }
    catch {
        sendMail("Hello", mail.to[0], mail.from, "Hello, i'm out of the office for a two week vacation i will be back on the 1st of April \nBest Regards Helena :)");
    }

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
        sendMail("Hello", mailOptions.from, mailOptions.to, "This is exactly the information i need. Thank you so much for the help,  i don't know how to thank you :). \n//Wilfred");
    }
    else {
        sendMail("Hello", mailOptions.from, mailOptions.to, "This is good information but i don't think it is enough, see if you could find out anything more. \n//Wilfred");
    }
    totalText = "";
    secretText = "";
}

mailListener.on("attachment", function(attachment){

    var pathAttachments = path.join(__dirname, "/attachments/")
    setTimeout(readPDF,20000,collectNormalTexts,pathAttachments);

    var secretDirectory = path.join(__dirname, "/SecretFiles/")
    setTimeout(readPDF, 20000, collectSecretTexts,secretDirectory);
});