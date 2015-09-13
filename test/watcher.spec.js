"use strict";

var EboxUsage = require("./helpers/static-ebox-usage");
var Postman = require("./helpers/mock-postman");
var Watcher = require("../src/watcher");

describe("the internet usage watcher", function () {

    var eboxCode = "VLDSD";
    var personToNotify = "pierre paul paquin";

    var ebox = new EboxUsage("151.95 G");
    var postman = new Postman();
    var watcher = new Watcher(ebox, postman);

    it("sends retrieved usage", function () {
        spyOn(postman, "send");
        watcher.CheckUsage(eboxCode, personToNotify);

        var message = { to: personToNotify,  usage: "151.95 G" };
        expect(postman.send).toHaveBeenCalledWith(message);
    });
});
