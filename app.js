"use strict";

var getter = require('./src/get');
var parser = require('./src/parser');
var notifier = require('./src/notifier');

var code = process.env.EBOX_CODE;
getter.get(code, function(html){
    var usage = parser.parse(html);

    notifier.notify(usage);
    console.log('Utilisation:' + usage);
});