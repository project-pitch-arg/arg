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
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
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
  from: 'helena.godspeed@gmail.com',
  to: 'fhemfhem55@gmail.com',
  subject: 'Tjebbatjona',
  text: 'Ditt lösenord är: ',
};
function sendMail(subject, to,message){
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
mailListener.on("mail", function(mail, seqno, attributes){
    try {
        if(mail.text.includes("231")){
            sendMail("Hello", mail.from, "Where did you get this code? \n I will ask IT what it is about. \n//Helena");
            setTimeout(function() {
                sendMail("Hello", mail.from, "I talked with IT and they say it's for a restricted page and we thank you for not sharing it.  \n//Helena")
            }, 60000);
        }
        if(mail.text.includes("231")){
                    sendMail("Hello", mail.from, "Where did you get this code? \n I will ask IT what it is about. \n//Helena");
                    setTimeout(function() {
                        sendMail("Hello", mail.from, "I talked with IT and they say it's for a restricted page and we thank you for not sharing it.  \n//Helena")
                    }, 60000);
                }
        else {
            sendMail("Hello", mail.from, "Hello, i'm out of the office for a two week vacation i will be back on the 1st of April \nBest Regards Helena :)");
        }
    }
    catch {
        sendMail("Hello", mail.from, "Hello, i'm out of the office for a two week vacation i will be back on the 1st of April \nBest Regards Helena :)");
    }

});

mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});