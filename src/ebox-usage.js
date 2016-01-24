"use strict";

var http = require('http');
var querystring = require('querystring');

var EboxUsage = function (parser) {
    this.parser = parser;
};

EboxUsage.prototype.get = function (code, done) {

    var data = querystring.stringify({
        actions: 'list',
        DELETE_lng: 'en',
        lng: 'en',
        code: code
    });

    var options = {
        method: 'POST',
        host: 'conso.ebox.ca',
        path: '/index.php',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var that = this;
    var req = http.request(options, function (response) {
        var html = '';
        response.on('data', function (chunk) {
            html += chunk;
        });

        response.on('end', function () {
            //console.log('html: ' + html);
            done(that.parser.parseUsage(html));
        });
    });

    req.write(data);
    req.end();
};

module.exports = EboxUsage;

