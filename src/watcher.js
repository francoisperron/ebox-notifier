"use strict";

var Watcher = function (eboxUsage, postman) {
    this.eboxUsage = eboxUsage;
    this.postman = postman;
};

Watcher.prototype.CheckUsage = function (eboxCode, personToNotify) {
    var that = this;
    that.eboxUsage.get(eboxCode, function (usage) {
        var message = { to: personToNotify, usage: usage };
        that.postman.send(message);
    });
};

module.exports = Watcher;