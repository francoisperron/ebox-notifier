"use strict";

var htmlMail = require("./html-mail");

var Watcher = function (eboxUsage, postman) {
    this.eboxUsage = eboxUsage;
    this.postman = postman;
};

Watcher.prototype.CheckUsage = function (eboxCode, personToNotify) {
    var that = this;
    that.eboxUsage.get(eboxCode, function (usage) {
        var message = { to: personToNotify, content: htmlMail.buildFrom(usage) };
        that.postman.send(message);
    });
};

module.exports = Watcher;
