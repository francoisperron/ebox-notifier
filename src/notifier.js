"use strict";

var nodemailer = require('nodemailer');

exports.notify = function (credentials, message) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: { user: credentials.user,  pass: credentials.pass }
    });

    var mailOptions = {
        from: message.from,  to: message.to,  subject: message.subject,  html: message.content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};
