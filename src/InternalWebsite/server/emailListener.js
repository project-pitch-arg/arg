
//------------- JSON

var jsonData1 = require('../../json/OurWork.json');
var jsonData2 = require('../../json/AboutUs.json');
var jsonData = require('../../json/emailResponses.json');
var variables = require('../../json/Variables.json');

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
// var temp = jsonData1.our_work;
var ourWorkPassword = jsonData1.username;

//about us password
// var temp = jsonData1.about_us;
var aboutUsPassword = jsonData2.password;

//--------------
const path = require('path');
const fs = require('fs');
const PdfReader = require('pdfreader').PdfReader;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var Imap = require('imap'),
    inspect = require('util').inspect;
var MailListener = require("mail-listener2");

//------------- Creation of MailListeners

function createMailListener(email, pass){
    return new MailListener({
         username: email,
         password: pass,
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
}

var helena_email_credentials = {
    email: "helena.godspeed@gmail.com",
    password: "Speed241"
};
var lyra_email_credentials = {
    email: "LyraBell.Difax@gmail.com",
    password: "ColoradoSprings532"
};
var wilfred_email_credentials = {
    email: "wilfredmalm285@gmail.com",
    password: "yellowstoneCaldera916"
}

var helena_mailListener = createMailListener(helena_email_credentials.email, helena_email_credentials.password);
var lyra_mailListener = createMailListener(lyra_email_credentials.email, lyra_email_credentials.password);
var wilfred_mailListener = createMailListener(wilfred_email_credentials.email, wilfred_email_credentials.password);

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

function createTransportForMailer(email, password){
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    });
}
helena_transporter = createTransportForMailer(helena_email_credentials.email, helena_email_credentials.password);
lyra_transporter = createTransportForMailer(lyra_email_credentials.email, lyra_email_credentials.password);
wilfred_transporter = createTransportForMailer(wilfred_email_credentials.email, wilfred_email_credentials.password);

//---------------------
function standardMailOptions(email){
    return mailOptions = {
         from: email,
         to: '',
         subject: '',
         text: '',
   };
}
var helena_mailOptions = standardMailOptions(helena_email_credentials.email);
var lyra_mailOptions = standardMailOptions(lyra_email_credentials.email);
var wilfred_mailOptions = standardMailOptions(wilfred_email_credentials.email);
//--------------------

function sendMail(subject, to , message, mailOptions, transporter){
    mailOptions.subject = subject;
    mailOptions.to = to;
    mailOptions.text = message;
    transporter.sendMail(mailOptions, function(error, info){
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
        if(mail.text.includes(variables.smallConsoleCode)){
            sendMail("Hello", mail.from, helena_first_reply, helena_mailOptions, helena_transporter);
            setTimeout(function() {
                sendMail("Hello again", mail.from, helena_second_reply, helena_mailOptions, helena_transporter)
            }, 60000);
        }
        else if(mail.text.includes(variables.adminCode)){
            sendMail("Hello", mail.from, helena_first_reply, helena_mailOptions, helena_transporter);
            setTimeout(function() {
                sendMail("Hello", mail.to[0], mail.from, helena_third_reply,helena_mailOptions,helena_transporter)
            }, 60000);
        }
        else {
            sendMail("Hello", mail.from, helena_no_reply, helena_mailOptions, helena_transporter);
        }
    }
    catch (e){
        console.log(e);
     }
});
//------------- lyra mail listener arguments
lyra_mailListener.on("mail", function(mail, seqno, attributes){
    try {
        var text = mail.text.toUpperCase();
        var key = "wilfred";
        //checks if the email contains any words that match hint keys
        var hintKeys = ["help", "advice", "guidance", "hand", "support", "assist", "hint","credentials","intranet"];
        var doesContain = false;
        for(let i = 0; i<hintKeys.length;i++){
             if(text.includes(hintKeys[i].toUpperCase())){
                doesContain = true;
             }
        }
        if(text.includes(key.toUpperCase())){
            sendMail("Hello", mail.from, lyra_first_reply , lyra_mailOptions, lyra_transporter);
        }
        else if(doesContain){
            sendMail("An introduction to Difax", mail.from, lyra_hint, lyra_mailOptions, lyra_transporter);
        }
        else {
          sendMail("Hello", mail.from, lyra_no_reply, lyra_mailOptions, lyra_transporter);
        }
    }
    catch (e){
        console.log(e);
    }
});
//------------- wilfred mail listener arguments
wilfred_mailListener.on("mail", function(mail, seqno, attributes){
    try {
        var text = mail.text.toUpperCase();
        if(text.includes(ourWorkPassword.toUpperCase()) && text.includes(aboutUsPassword.toUpperCase()) ){
            sendMail("Hello again", mail.from, wilfred_second_reply, wilfred_mailOptions, wilfred_transporter)
        }
        else if(mail.attachments !== undefined){
            wilfred_mailOptions.to = mail.from;
        }
        else {
          sendMail("Hello", mail.from, wilfred_first_reply , wilfred_mailOptions, wilfred_transporter);
        }
    }
    catch (e){
        console.log(e);
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
//Reads pdf attachments and check if they include the necessary secret information for wilfred
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
                 console.log(err);
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

//Counts the number of sent files read. If all files are read proceed to compare texts.
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

//Counts the number of secret files read. If all files are read proceed to compare texts.
function collectSecretTexts(text,filenames){
    secretText += text;
    secretTextLoaded = true;
    if(normalTextLoaded){
        compareTexts(totalText, secretText)
    }
}

//Compares the sent attachments text and those stored in "SecretFiles"-
function compareTexts(text1, text2){
    if(text1.includes(text2)){
        sendMail("Hello", wilfred_mailOptions.to, wilfred_fourth_reply, wilfred_mailOptions, wilfred_transporter);
    }
    else {
        sendMail("Hello", wilfred_mailOptions.to, wilfred_third_reply, wilfred_mailOptions, wilfred_transporter);
    }
    totalText = "";
    secretText = "";
}
