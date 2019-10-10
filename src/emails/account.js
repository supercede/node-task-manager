require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mahyor.sam@gmail.com',
        subject: "Welcome to Destiny's task app",
        text: `Hello ${name}, You Thanks for registering, Do make good use of your time with us, and complete those tasks. :)`
    })
}

const farewellMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mahyor.sam@gmail.com',
        subject: "It's been a great journey with you",
        text: `Hello ${name}, we noticed you recently deleted your account. We would like to how how we can improve,
        Please respond with a mail.`
    })
}

module.exports = {
    welcomeMail,
    farewellMail
}