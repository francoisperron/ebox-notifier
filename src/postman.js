"use strict";

var nodemailer = require('nodemailer');
var moment = require('moment');

var Postman = function (credentials) {
    this.credentials = credentials;
    this.transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {user: this.credentials.user, pass: this.credentials.pass}
    });
};

Postman.prototype.send = function (message) {
    var mail = this.buildMail(message);

    this.transporter.sendMail(mail, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response + " - " + JSON.stringify(mail));
    });
};

Postman.prototype.buildMail = function (message) {
    return {
        from: this.buildFrom(),
        to: message.to,
        subject: this.buildSubject(),
        html: message.content
    };
};

Postman.prototype.buildFrom = function() {
    return "ebox-notifier <" + this.credentials.user + ">";
};

Postman.prototype.buildSubject = function() {
    var date = moment(Date.now()).format("YYYY-MM-DD");
    return 'Utilisation Electronic Box - ' + date;
};

module.exports = Postman;
