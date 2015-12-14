require('es6-promise').polyfill();
var path = require('path');
var join = path.join.bind(path, __dirname);
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack');
var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

module.exports = {

    devtool: 'eval',
    entry: [

        'webpack-dev-server/client?http://localhost:' + 7000,
        'webpack/hot/only-dev-server',
        join('public/index.jsx')
    ],

    devServer: {
        contentBase: join("public"),
        info: true, //  --no-info option
        hot: true,
        inline: true,
        port: 7000
    },

    output: {
        path: join(".hot"),

        filename: 'app.entry.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                //do this to prevent babel from translating everything.
                include: [
                    join('src'),
                    join('public')
                ],
                loaders: ['react-hot', 'babel-loader?stage=0&ignore=buffer']
            },
            {
                test: /\.js(x)?$/,
                exclude: [
                    //      /node_modules\/(?!(subschema-builder|component-playground|react-))/,
                    /babel/,
                    /react-router/,
                    /codemirror/,
                    join('src'),
                    join('public'),
                ],
                loaders: ['babel?stage=0&ignore=buffer']
            },
            {test: /\.(png|jpe?g|mpe?g|gif)$/, loader: 'url-loader?limit=100000'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"},
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: [
        require('autoprefixer'),
        require('postcss-color-rebeccapurple')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'subschema': join('node_modules/subschema/src'),
            'subschema-styles': join('node_modules/subschema/src/styles'),
            'Subschema': join('node_modules/subschema/src'),
            'react': join('node_modules/react')
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //     new ExtractTextPlugin('style.css', {allChunks: true}),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
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

