"use strict";

var http = require('http');

exports.get = function(code, done) {
    var options = {
        host: 'consocable.electronicbox.net',
        path: '/index.php?actions=list&lng=fr&code=' + code
    };

    http.request(options, function (response) {
        var html = '';
        response.on('data', function (chunk) {
            html += chunk;
        });

        response.on('end', function () {
            done(html);
        });
    }).end();
};

