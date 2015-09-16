"use strict";

var EboxUsage = require("./helpers/static-ebox-usage");
var Postman = require("./helpers/mock-postman");
var Watcher = require("../src/watcher");
var htmlMail = require("../src/html-mail");

describe("the internet usage watcher", function () {

    var eboxCode = "VLDSD";
    var personToNotify = "pierre paul paquin";

    var aUsage = {actual: 151.95, max: 350};
    var ebox = new EboxUsage(aUsage);
    var postman = new Postman();
    var watcher = new Watcher(ebox, postman);

    it("sends weekly message on friday", function () {
        spyOn(postman, "send");
        watcher.today = new Date("Fri Sep 4 2015");
        watcher.CheckUsage(eboxCode, personToNotify);

        var message = {to: personToNotify, content: htmlMail.buildFrom(aUsage)};
        expect(postman.send).toHaveBeenCalledWith(message);
    });

    it("does not send weekly message if not on friday", function () {
        spyOn(postman, "send");
        watcher.today = new Date("Sat Sep 5 2015");
        watcher.CheckUsage(eboxCode, personToNotify);

        var message = {to: personToNotify, content: htmlMail.buildFrom(aUsage)};
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
