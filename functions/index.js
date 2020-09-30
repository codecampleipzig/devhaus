const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendTestEmail = functions.https.onCall((data, context) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'bf16fc7c39288f',
      pass: '8c96275b450dbb',
    },
  });
  // set this to the data that is incoming
  const mailOptions = {
    from: '"Test" <testuser@testemail.com>',
    to: data.email,
    subject: 'Nice Nodemailer test',
    text: data.message,
    // destructure the html stuff
    html: `<b>${data.sender}</b><br>${data.message}`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return error;
    }
    console.log('Message sent');
    return `Message sent: %s', ${info.messageId}`;
  });
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });
