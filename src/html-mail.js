"use strict";

exports.buildFrom = function(usage) {
    if (usage == -1) {
        return '<b>Utilisation non disponible</b>'
    }
    return '<b>Utilisation: ' + usage.actual + ' G</b><p>Maximum: ' + usage.max + ' G</p>'
};