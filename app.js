"use strict";

var EboxUsage = require("./src/ebox-usage");
var eboxParser = require("./src/ebox-parser");
var Watcher = require("./src/watcher");
var Postman = require("./src/postman");

var credentials = {
    user: "ebox.notifier@gmail.com",
    pass: process.env.GMAIL_PASS
};

var eboxUsage = new EboxUsage(eboxParser);
var postman = new Postman(credentials);
var watcher = new Watcher(eboxUsage, postman);

var configs = JSON.parse(process.env.CONFIGS);
for (var i = 0; i < configs.length; ++i) {
    var config = configs[i];
    watcher.CheckUsage(config.code, config.to);
}
