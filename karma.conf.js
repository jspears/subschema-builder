var webpack = require('webpack'), path = require('path'), demo = require('./demo.webpack.config');
demo.module.loaders[0].include.push(path.join(__dirname, 'test'));
module.exports = function (config) {
    config.set({
        browserNoActivityTimeout: 20000,
        browsers: ['Chrome'], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            'test/index.js' //just load this file
        ],
        preprocessors: {
            'test/*': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots'], //report results in this format

        webpack: demo
    });
}

