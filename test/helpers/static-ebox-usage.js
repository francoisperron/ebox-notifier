"use strict";

var StaticEboxUsage = function (usage) {
    this.usage = usage;
};

StaticEboxUsage.prototype.get = function(code, done) {
    done(this.usage);
};

module.exports = StaticEboxUsage;