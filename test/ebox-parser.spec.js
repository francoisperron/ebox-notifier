"use strict";

var fs = require("fs");
var assert = require("assert");
var parser = require("../src/ebox-parser");

describe("Parsing ebox html", function () {

    var html = "";
    beforeEach(function () {
        html = fs.readFileSync(__dirname + "/data/data.html").toString();
    });

    it("returns usage", function () {
        var usage = parser.parseUsage(html);

        assert.equal(usage.actual, "151.95")
    });

    it("returns max", function () {
        var usage = parser.parseUsage(html);

        assert.equal(usage.max, "350")
    });

    it("returns -1 when usage not found", function () {
        var usage = parser.parseUsage("any html");

        assert.equal(usage, -1)
    });
});
