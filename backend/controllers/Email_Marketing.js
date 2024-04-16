// const nodemailer = require('nodemailer');
// const fs = require('fs').promises;
// const path = require('path');




// async function sendEmails(recipients) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: '3stackcoder@gmail.com',
//         pass: 'wzkmtlkivwncecio',
//       },
//     });

//     const htmlFilePath = path.join(__dirname, 'Template2.html');
//     const data = await fs.readFile(htmlFilePath, 'utf8');

//     for (const recipient of recipients) {
//       const mailOptions = {
//         from: 'martinwarren2000@gmail.com',
//         to: recipient,
//         subject: 'With Love From PIXCL',
//         html: data,
//       };

//       console.log(`Sending email to ${recipient}`);
//       await transporter.sendMail(mailOptions);
//       console.log(`Email sent successfully to ${recipient}`);
//     }

//     return true; // Indicate successful email sending
//   } catch (error) {
//     console.error('Error sending emails:', error);
//     throw error;
//   }
// }

// module.exports = sendEmails;

const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

async function sendEmails(recipients, template, subject) { // Accept template data and subject as parameters
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '3stackcoder@gmail.com',
        pass: 'wzkmtlkivwncecio',
      },
    });

    // Use the template data passed from the frontend
    const htmlContent = template;

    for (const recipient of recipients) {
      const mailOptions = {
        from: 'martinwarren2000@gmail.com',
        to: recipient,
        subject: subject, // Use the provided subject
        html: htmlContent, // Use the provided template data
      };

      console.log(`Sending email to ${recipient}`);
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${recipient}`);
    }

    return true; // Indicate successful email sending
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
}

module.exports = sendEmails;