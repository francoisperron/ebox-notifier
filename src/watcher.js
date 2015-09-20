"use strict";

var unavailableMail = require("./unavailable-mail");
var weeklyMail = require("./weekly-mail");
var warningMail = require("./warning-mail");

var Watcher = function (eboxUsage, postman) {
    this.eboxUsage = eboxUsage;
    this.postman = postman;
};
Watcher.prototype.CheckUsage = function (eboxCode, personToNotify) {
    var that = this;

    that.eboxUsage.get(eboxCode, function (usage) {

        if (usageUnavailable(usage)) {
            that.postman.send({to: personToNotify, content: unavailableMail.build()});
            return;
        }

        if (usageNearMaximum(usage)) {
            that.postman.send({to: personToNotify, content: warningMail.buildFrom(usage)});
            return;
        }

        if (aFriday(that)) {
            that.postman.send({to: personToNotify, content: weeklyMail.buildFrom(usage)});
        }
    });
};

function usageUnavailable(usage) {
    return usage == -1;
}

function usageNearMaximum(usage) {
    return 0.07 * usage.max >= usage.max - usage.actual;
}


function aFriday(that) {
    that.today = that.today || new Date();
    return that.today.getDay() == 5;
}

module.exports = Watcher;
