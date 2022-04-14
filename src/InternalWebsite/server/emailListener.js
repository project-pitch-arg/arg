//------------- JSON

var jsonData = require('../../data.json');

//our work password
var temp = jsonData.our_work;
var ourWorkPassword = temp.cracked_password;

//about us password
var temp = jsonData.about_us;
var aboutUsPassword = temp.password;
//--------------

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var Imap = require('imap'),
    inspect = require('util').inspect;

var MailListener = require("mail-listener2");

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
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
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
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
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
  to: 'fhemfhem55@gmail.com',
  subject: 'Tjebbatjona',
  text: 'Ditt lösenord är: ',
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
            helena_sendMail("Hello", mail.from, "Where did you get this code? \n I will ask IT what it is about. \n//Helena");
            setTimeout(function() {
                helena_sendMail("Hello", mail.from, "I talked with IT and they say it's for a restricted page and we thank you for not sharing it.  \n//Helena")
            }, 60000);
        }
        if(mail.text.includes("231")){
            helena_sendMail("Hello", mail.from, "Where did you get this code? \n I will ask IT what it is about. \n//Helena");
            setTimeout(function() {
                helena_sendMail("Hello", mail.from, "I talked with IT and they say it's for a restricted page and we thank you for not sharing it.  \n//Helena")
            }, 60000);
        }
        else {
            helena_sendMail("Hello", mail.from, "Hello, i'm out of the office for a two week vacation i will be back on the 1st of April \nBest Regards Helena :)");
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
        if(text.includes(key.toUpperCase())){
            lyra_sendMail("Hello", mail.from,
             "Hello, \n"+
             "I haven’t heard from Wilfred in a while but he did leave me a message saying to tell it to anyone looking for him. The message is, 'To access what cannot be seen, you must seek three disjoint keys' I don't know what that means but I hope he's alright.");
        }
        else {
          lyra_sendMail("Hello", mail.from,
           "Hello, \n"+
           "I am currently not available and cannot respond to you right now.\n \n"  +
           "Lyra Bell"
           );
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
            wilfred_sendMail("Hello", mail.from,
             "Hello, \n"+
             "So...you really are trying to help. Ok then. I need your help accessing documents. But first you must navigate to /Internal");
        }
        else {
          wilfred_sendMail("Hello", mail.from,
           "Username and password required"
           );
        }

    }
    catch {
        console.log("wilfred email error");
    }

});
//----------------

helena_mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});
lyra_mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});
wilfred_mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});