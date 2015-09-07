"use strict";

var startString = "<b>Total</b><br>";
var stopString = "<br><div id='total_off'";

exports.parse = function (html) {
    var start = html.indexOf(startString) + startString.length;
    var stop = html.indexOf(stopString);

    if (start == -1 || stop == -1) {
        return -1;
    }

    return html.substring(start, stop);
};