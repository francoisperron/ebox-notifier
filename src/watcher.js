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

        console.log(eboxCode + ":" + usage.actual);

        if (usageUnavailable(usage)) {
            that.postman.send({to: personToNotify, content: unavailableMail.build()});
            return;
        }

        if (usageNearMaximum(usage)) {
            that.postman.send({to: personToNotify, content: warningMail.buildFrom(usage)});
            return;
        }

        if (aFriday(that)) {
            usage.projection = calculateProjection(that, usage);
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

function calculateProjection(that, usage) {
    that.today = that.today || new Date();
    var ratio = daysInMonth(that.today.getMonth(), that.today.getYear()) / that.today.getDate();
    return Math.round(ratio * usage.actual);
}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

module.exports = Watcher;
