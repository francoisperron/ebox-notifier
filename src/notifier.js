(function () {
    "use strict";

    var nodemailer = require('nodemailer');

    var pass = process.env.GMAIL_PASS;
    var to = process.env.TO;
    exports.notify = function (usage) {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ebox.notifier@gmail.com',
                pass: pass
            }
        });

        var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var mailOptions = {
            from: 'ebox-notifier <ebox.notifier@gmail.com>',
            to: to,
            subject: 'Utilisation Electronic Box - ' + date,
            html: '<b>Utilisation: ' + usage + '</b>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    };

}());
