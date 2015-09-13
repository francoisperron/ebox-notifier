"use strict";

var getter = require('./src/get');
var parser = require('./src/parser');
var message = require('./src/message');
var notifier = require('./src/notifier');

var code = process.env.EBOX_CODE;

var from = 'ebox-notifier <ebox.notifier@gmail.com>';
var to = process.env.TO;

var credentials = {
    user: 'ebox.notifier@gmail.com',
    pass: process.env.GMAIL_PASS
};

getter.get(code, function(html){
    var usage = parser.parseUsage(html);
    var msg = message.buildMessage(from, to, usage);
    notifier.notify(credentials, msg);
    console.log('Utilisation:' + usage);
});