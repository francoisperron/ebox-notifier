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
        html: this.buildContent(message.usage)
    };
};

Postman.prototype.buildFrom = function () {
    return "ebox-notifier <" + this.credentials.user + ">";
};

Postman.prototype.buildSubject = function () {
    var date = moment(Date.now()).format("YYYY-MM-DD");
    return 'Utilisation Electronic Box - ' + date;
};

Postman.prototype.buildContent = function (usage) {
    if (usage == -1) {
        return '<b>Utilisation non disponible</b>'
    }
    return '<b>Utilisation: ' + usage.actual + ' G</b><p>Maximum: ' + usage.max + ' G</p>'
};

module.exports = Postman;
