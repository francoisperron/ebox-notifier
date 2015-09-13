"use strict";

var startString = "<b>Total</b><br>";
var stopString = "<div id='total_off'";

exports.parseUsage = function (html) {
    var start = html.indexOf(startString);
    var stop = html.indexOf(stopString);

    if (start == -1 || stop == -1) {
        return -1;
    }

    return html.substring(start + startString.length, stop - '<br>'.length);
};