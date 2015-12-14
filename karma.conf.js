var webpack = require('webpack'), path = require('path');

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

        webpack: { //kind of a copy of your webpack config
            cache: true,
            debug: true,
            devtool: 'inline-source-map',

            stats: {
                colors: true,
                reasons: true
            },
            module: {
                loaders: [
                    {
                        test: /\.js(x)?$/,
                        loader: 'babel-loader?stage=0'
                    },
                    {
                        test: /\.less$/,
                        loader: 'style!css!less-loader'
                    },
                    {
                        test: /\.json$/,
                        loader: 'json'
                    }
                ]
            },

            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('development')
                })]

        },
        webpackMiddleware: {
            stats: {
                colors: true
            }
        }
    });

};
