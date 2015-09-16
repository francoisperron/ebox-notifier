"use strict";

describe("the html mail", function () {

    var htmlMail = require("../src/html-mail");
    var usage = {actual: 10, max: 100};

    it("build 'content' field using usage", function () {
        expect(htmlMail.buildFrom(usage)).toBe("<b>Utilisation: 10 G</b><p>Maximum: 100 G</p>");
    });

    it("build 'content' non disponible when usage is -1", function () {
        expect(htmlMail.buildFrom(-1)).toBe("<b>Utilisation non disponible</b>");
    });
});