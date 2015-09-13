"use strict";

var http = require('http');

var EboxUsage = function (parser) {
    this.parser = parser;
};

EboxUsage.prototype.get = function(code, done) {
    var options = {
        host: 'consocable.electronicbox.net',
        path: '/index.php?actions=list&lng=fr&code=' + code
    };

    var that = this;
    http.request(options, function (response) {
        var html = '';
        response.on('data', function (chunk) {
            html += chunk;
        });

        response.on('end', function () {
            done(that.parser.parseUsage(html));
        });
    }).end();
};

module.exports = EboxUsage;

