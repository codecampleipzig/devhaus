const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendTestEmail = functions.https.onRequest((request, response) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'bf16fc7c39288f',
      pass: '8c96275b450dbb',
    },
  });
  const mailOptions = {
    from: '"Test" <testuser@testemail.com>',
    to: 'anothertestuser@testemail.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      response.send(error);
    }
    console.log('Message sent: %s', info.messageId);
    response.send("Message sent: %s', info.messageId");
  });
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });
