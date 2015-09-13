(function () {
    "use strict";

    var fs = require("fs");
    var assert = require("assert");
    var parser = require("../src/parser");

    describe("Parsing ebox html", function () {

        var html = "";
        beforeEach(function () {
            html = fs.readFileSync(__dirname + "/data.html").toString();
        });

        it("returns usage", function () {
            var usage = parser.parseUsage(html);

            assert.equal(usage, "151.95 G")
        });

        it("returns -1 when usage not found", function () {
            var usage = parser.parseUsage("any html");

            assert.equal(usage, -1)
        });
    })

}());
