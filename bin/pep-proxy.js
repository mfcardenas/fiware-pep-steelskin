#!/usr/bin/env node

var proxy = require('../lib/fiware-orion-pep'),
    config = require('../config');

proxy.start(function (error, proxyObj) {
    if (error) {
        process.exit();
    } else {
        var module;

        console.log('Loading middlewares');
        module = require('../' + config.middlewares.require);

        for (var i in config.middlewares.functions) {
            proxyObj.middlewares.push(module[config.middlewares.functions[i]]);
        }

        console.log('Server started');
    }
});