"use strict";

exports.buildFrom = function(usage) {
    return '<b>Utilisation: ' + usage.actual + ' G</b><p>Maximum: ' + usage.max + ' G</p>'
};