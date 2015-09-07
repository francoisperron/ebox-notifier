(function () {
    "use strict";

    var nodemailer = require('nodemailer');

    var pass = process.env.GMAIL_PASS;
    exports.notify = function (usage) {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ebox.notifier@gmail.com',
                pass: pass
            }
        });

        var mailOptions = {
            from: 'ebox-notifier <ebox.notifier@gmail.com>',
            to: 'fperron@gmail.com,philemon.perron@gmail.com',
            subject: 'Utilisation Electronic Box',
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
