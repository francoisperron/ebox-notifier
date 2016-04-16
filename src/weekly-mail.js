"use strict";

exports.buildFrom = function(usage) {
    return '<b>Utilisation: ' + usage.actual + ' G</b><p>Projection: ' + usage.projection + ' G</p><p>Maximum: ' + usage.max + ' G</p>'
};