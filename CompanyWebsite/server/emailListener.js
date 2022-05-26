//------------- JSON
const jsonPath = "../src/json/";

const jsonData1 = require(jsonPath + 'OurWork.json');
const jsonData2 = require(jsonPath + 'AboutUs.json');
const jsonData = require(jsonPath + 'EmailResponses.json');
const variables = require(jsonPath + 'Variables.json');

const helena_temp = jsonData.helena;
const lyra_temp = jsonData.lyra;
const wilfred_temp = jsonData.wilfred;

//--------------Helena

const helena_firstReply = helena_temp.firstReply;
const helena_secondReply = helena_temp.secondReply;
const helena_thirdReply = helena_temp.thirdReply;
const helena_noReply = helena_temp.noReply;

//------------ Lyra

const lyra_firstReply = lyra_temp.firstReply;
const lyra_hint = lyra_temp.hint;
const lyra_noReply = lyra_temp.noReply;

//------------ Wilfred
const wilfred_firstReply = wilfred_temp.firstReply;
const wilfred_secondReply = wilfred_temp.secondReply;
const wilfred_thirdReply = wilfred_temp.thirdReply;
const wilfred_fourthReply = wilfred_temp.fourthReply;

//our work password
// var temp = jsonData1.our_work;
const ourWorkPassword = jsonData1.username;

//about us password
// var temp = jsonData1.about_us;
const aboutUsPassword = jsonData2.password;

//--------------
const path = require('path');
const fs = require('fs');
const PdfReader = require('pdfreader').PdfReader;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const MailListener = require("mail-listener2");

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

const helena_email_credentials = {
    email: "helena.godspeed@gmail.com",
    password: "Speed241"
};
const lyra_email_credentials = {
    email: "LyraBell.Difax@gmail.com",
    password: "ColoradoSprings532"
};
const wilfred_email_credentials = {
    email: "wilfredmalm285@gmail.com",
    password: "yellowstoneCaldera916"
};

const helena_mailListener = createMailListener(helena_email_credentials.email, helena_email_credentials.password);
const lyra_mailListener = createMailListener(lyra_email_credentials.email, lyra_email_credentials.password);
const wilfred_mailListener = createMailListener(wilfred_email_credentials.email, wilfred_email_credentials.password);

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
const nodemailer = require('nodemailer');

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
    return {
         from: email,
         to: '',
         subject: '',
         text: '',
   };
}

const helena_mailOptions = standardMailOptions(helena_email_credentials.email);
const lyra_mailOptions = standardMailOptions(lyra_email_credentials.email);
const wilfred_mailOptions = standardMailOptions(wilfred_email_credentials.email);

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
helena_mailListener.on("mail", function(mail){
    try {
        if(mail.text.includes(variables.smallConsoleCode)){
            sendMail("Hello", mail.from, helena_firstReply, helena_mailOptions, helena_transporter);
            setTimeout(function() {
                sendMail("Hello again", mail.from, helena_secondReply, helena_mailOptions, helena_transporter)
            }, 60000);
        }
        else if(mail.text.includes(variables.adminCode)){
            sendMail("Hello", mail.from, helena_firstReply, helena_mailOptions, helena_transporter);
            setTimeout(function() {
                sendMail("Hello", mail.to[0], mail.from, helena_thirdReply,helena_mailOptions,helena_transporter)
            }, 60000);
        }
        else {
            sendMail("Hello", mail.from, helena_noReply, helena_mailOptions, helena_transporter);
        }
    }
    catch (e){
        console.log(e);
     }
});
//------------- lyra mail listener arguments
lyra_mailListener.on("mail", function(mail){
    try {
        const text = mail.text.toUpperCase();
        const key = "wilfred";
        //checks if the email contains any words that match hint keys
        const hintKeys = ["help", "advice", "guidance", "hand", "support", "assist", "hint", "credentials", "intranet"];
        let doesContain = false;
        for(let i = 0; i<hintKeys.length;i++){
             if(text.includes(hintKeys[i].toUpperCase())){
                doesContain = true;
             }
        }
        if(text.includes(key.toUpperCase())){
            sendMail("Hello", mail.from, lyra_firstReply , lyra_mailOptions, lyra_transporter);
        }
        else if(doesContain){
            sendMail("An introduction to Difax", mail.from, lyra_hint, lyra_mailOptions, lyra_transporter);
        }
        else {
          sendMail("Hello", mail.from, lyra_noReply, lyra_mailOptions, lyra_transporter);
        }
    }
    catch (e){
        console.log(e);
    }
});
//------------- wilfred mail listener arguments
wilfred_mailListener.on("mail", function(mail){
    try {
        const text = mail.text.toUpperCase();
        if(text.includes(ourWorkPassword.toUpperCase()) && text.includes(aboutUsPassword.toUpperCase()) ){
            sendMail("Hello again", mail.from, wilfred_secondReply, wilfred_mailOptions, wilfred_transporter)
        }
        else if(mail.attachments !== undefined){
            wilfred_mailOptions.to = mail.from;
        }
        else {
          sendMail("Hello", mail.from, wilfred_firstReply , wilfred_mailOptions, wilfred_transporter);
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
    console.log(attachment.path);
    const pathAttachments = path.join(__dirname, "/attachments/");
    setTimeout(readPDF,20000,collectNormalTexts,pathAttachments);

    const secretDirectory = path.join(__dirname, "/SecretFiles/");
    setTimeout(readPDF, 20000, collectSecretTexts,secretDirectory);
});
//Reads pdf attachments and check if they include the necessary secret information for wilfred
function readPDF(callback){
    const dir = arguments[1];
    fs.readdir(dir, function(err, filenames) {
        if (err) {
          console.log(err);
          return;
        }
        filenames.forEach(function(filename) {
          fs.readFile (dir + filename, (err, pdfBuffer) => {
          // pdfBuffer contains the file content
              let text = "";
              new PdfReader().parseBuffer(pdfBuffer, function(err, item){
             if (err){
                 console.log(err);
                 }
              else if (!item){
                callback(text, filenames.length);
              }
              else if (item.text)
                  text += item.text;
             });
          });
        });
    });
}

let totalText = "";
let iText = 0;
let secretText = "";
let secretTextLoaded = false;
let normalTextLoaded = false;

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
function collectSecretTexts(text){
    secretText += text;
    secretTextLoaded = true;
    if(normalTextLoaded){
        compareTexts(totalText, secretText)
    }
}

//Compares the sent attachments text and those stored in "SecretFiles"-
function compareTexts(text1, text2){
    if(text1.includes(text2)){
        sendMail("Hello", wilfred_mailOptions.to, wilfred_fourthReply, wilfred_mailOptions, wilfred_transporter);
    }
    else {
        sendMail("Hello", wilfred_mailOptions.to, wilfred_thirdReply, wilfred_mailOptions, wilfred_transporter);
    }
    totalText = "";
    secretText = "";
}
