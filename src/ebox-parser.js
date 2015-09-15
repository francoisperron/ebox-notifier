"use strict";

var startString = "{ drawChart(";

exports.parseUsage = function (html) {
    var start = html.indexOf(startString);
    var usageStop = html.substring(start).indexOf(",");
    var maxStop = html.substring(start).indexOf(")");

    if (start == -1 || usageStop == -1 || maxStop == -1) {
        return -1;
    }

    var actual = html.substring(start + startString.length, start + usageStop);
    var max = html.substring(start + usageStop + 2, start + maxStop);
    return {actual: actual, max: max};
};