var path = require('path');


var webpack = require('webpack');
var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';
var port = 8083;
var join = path.join.bind(path, __dirname);

module.exports = {

    devtool: 'eval',


    entry: [
        join('public/index.jsx')
    ],
    output: {
        path: join('.build'),
        filename: 'app.[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?stage=0'],
                include: [
                    join('public'),
                    join('src'),

                    join('node_modules/subschema')
                ], exclude: [
                /node_modules\/(?!subschema|react-bootstrap|react-router)/
            ]
            },
            {test: /\.(png|gif|jpe?g|mpe?g[34]?)$/, loader: 'url-loader?limit=100000'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"},
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER
            },
            {
                test: /\.less$/,
                loader: 'style!css!less-loader'
            },
            {
                test: /\.json/,
                loader: 'json'
            }
        ]
    },

    resolve: {
        extensions: ['', '.jsx', '.js'],
        alias: {
            'subschema': join('node_modules/subschema/src'),
            'subschema-styles': join('node_modules/subschema/src/styles'),
            'Subschema': join('node_modules/subschema/src'),
            'react': join('node_modules/react')
        }
    },

    plugins: [
        function () {
            this.plugin("done", function (stats) {
                stats = stats.toJson();
                console.error(JSON.stringify({
                    assetsByChunkName: stats.assetsByChunkName
                }));
            });
        }
    ]

};

