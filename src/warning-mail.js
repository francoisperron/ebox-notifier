"use strict";

exports.buildFrom = function(usage) {
    return '<b style="color:red">Utilisation: ' + usage.actual + ' G</b><p>Maximum: ' + usage.max + ' G</p>'
};