"use strict";

var EboxUsage = require("./helpers/static-ebox-usage");
var Postman = require("./helpers/mock-postman");
var Watcher = require("../src/watcher");
var unavailableMail = require("../src/unavailable-mail");
var weeklyMail = require("../src/weekly-mail");
var warningMail = require("../src/warning-mail");

describe("the internet usage watcher", function () {

    var eboxCode = "VLDSD";
    var personToNotify = "pierre.paul.paquin@lpdlm.ca";

    describe("when usage is unavailable", function () {

        var unavailableUsage = -1;
        var ebox = new EboxUsage(unavailableUsage);
        var postman = new Postman();
        var watcher = new Watcher(ebox, postman);

        it("sends a unvailable message", function () {
            spyOn(postman, "send");
            watcher.CheckUsage(eboxCode, personToNotify);

            var message = {to: personToNotify, content: unavailableMail.build()};
            expect(postman.send).toHaveBeenCalledWith(message);
        });
    });

    describe("when usage at 7% of max or less", function () {

        var aHighUsage = {actual: 93, max: 100};
        var ebox = new EboxUsage(aHighUsage);
        var postman = new Postman();
        var watcher = new Watcher(ebox, postman);

        it("sends a warning message", function () {
            spyOn(postman, "send");
            watcher.CheckUsage(eboxCode, personToNotify);

            var message = {to: personToNotify, content: warningMail.buildFrom(aHighUsage)};
            expect(postman.send).toHaveBeenCalledWith(message);
        });

        it("does not also sends a weekly message", function () {
            spyOn(postman, "send");
            watcher.today = new Date("Fri Sep 4 2015");
            watcher.CheckUsage(eboxCode, personToNotify);

            var message = {to: personToNotify, content: weeklyMail.buildFrom(aHighUsage)};
            expect(postman.send).not.toHaveBeenCalledWith(message);
        });
    });

    describe("when usage is normal", function () {
        var aUsage = {actual: 151.95, projection: 1511, max: 350};
        var ebox = new EboxUsage(aUsage);
        var postman = new Postman();
        var watcher = new Watcher(ebox, postman);

        it("sends weekly message on friday", function () {
            spyOn(postman, "send");
            watcher.today = new Date("Fri Sep 4 2015");
            watcher.CheckUsage(eboxCode, personToNotify);

            var message = {to: personToNotify, content: weeklyMail.buildFrom(aUsage)};
            expect(postman.send).toHaveBeenCalledWith(message);
        });

        it("does not send weekly message if not on friday", function () {
            spyOn(postman, "send");
            watcher.today = new Date("Sat Sep 5 2015");
            watcher.CheckUsage(eboxCode, personToNotify);

            var message = {to: personToNotify, content: weeklyMail.buildFrom(aUsage)};
            expect(postman.send).not.toHaveBeenCalledWith(message);
        });

        it("sets today to new Date() when not set", function () {
            spyOn(postman, "send");
            watcher.today = undefined;
            watcher.CheckUsage(eboxCode, personToNotify);

            var now = new Date();
            expect(watcher.today.getDay()).toBe(now.getDay());
            expect(watcher.today.getMonth()).toBe(now.getMonth());
            expect(watcher.today.getYear()).toBe(now.getYear());
        });
    });

});
