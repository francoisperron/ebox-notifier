"use strict";

var moment = require('moment');

describe("the postman", function () {

    var Postman = require("../src/postman");
    var credentials = {user: "bill@bo.com", pass: "theringisevil"};
    var postman = new Postman(credentials);
    var usage = {actual: 10, max: 100};

    it("build 'from' field using user in credentials", function () {
        expect(postman.buildFrom()).toBe("ebox-notifier <" + credentials.user + ">");
    });

    it("build 'subject' field using current date", function () {
        var date = moment(Date.now()).format("YYYY-MM-DD");
        expect(postman.buildSubject()).toBe("Utilisation Electronic Box - " + date);
    });

    it("build 'content' field using usage", function () {
        expect(postman.buildContent(usage)).toBe("<b>Utilisation: 10 G</b><p>Maximum: 100 G</p>");
    });

    it("build 'content' non disponible when usage is -1", function () {
        expect(postman.buildContent(-1)).toBe("<b>Utilisation non disponible</b>");
    });

    it("build message", function () {
        var message = {to: "bill", usage: usage};
        var mail = postman.buildMail(message);

        expect(mail.from).toBe(postman.buildFrom());
        expect(mail.to).toBe(message.to);
        expect(mail.subject).toBe(postman.buildSubject());
        expect(mail.html).toBe(postman.buildContent(message.usage));
    });
});