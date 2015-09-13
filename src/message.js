"use strict";

exports.buildMessage = function (from, to, usage) {
    return {
        from: from,
        to: to,
        subject: buildSubject(),
        content: buildContent(usage)
    };
};

function buildSubject() {
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return 'Utilisation Electronic Box - ' + date;
}

function buildContent(usage){
    return '<b>Utilisation: ' + usage + '</b>'
}

