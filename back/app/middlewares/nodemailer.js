import { createTransport } from "nodemailer";
require('dotenv').config();


const sendSignUpEmail = (clientEmail) => {

    let transporter = createTransport({
        host: "mail.privateemail.com",
        port: 465,//uses port 465 if secure is true.
        secure: true,
        auth: { user: process.env.mailUser, pass: process.env.mailPass },
    });
    let email = await transporter.sendMail({
        from: '"Théodore Bing" <contact@theodorebing.com>', // sender address
        to: {clientEmail}, // list of recipients
        subject: "Hello World!", // Subject line
        text: "My first Nodemailer email!", // plain text body
        html: "<b>My first Nodemailer email!</b>", // html body
    });
  console.log("Email: "+email.messageId+" was sent.") //This prints to the console that the email has been sent.
}

export default sendSignUpEmail;
