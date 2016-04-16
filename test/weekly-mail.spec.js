"use strict";

describe("the weekly mail", function () {

    var htmlMail = require("../src/weekly-mail");
    var usage = {actual: 10, projection: 50, max: 100};

    it("build mail using usage", function () {
        expect(htmlMail.buildFrom(usage)).toBe("<b>Utilisation: 10 G</b><p>Projection: 50 G</p><p>Maximum: 100 G</p>");
    });
});