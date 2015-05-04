var path = require('path');


var webpack = require('webpack');
var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';
var port = 8083;
module.exports = {

    devtool: 'eval',


    entry: [
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'public/app.jsx')
    ],
    devServer: {
        port: port,
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        inline: true
    },
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:' + port + '/build/'

    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                loaders: ['react-hot', 'babel?stage=0'],
                includes:[
                    path.join(__dirname, 'public'),
                    path.join(__dirname, 'src')
                ],
                exclude:/node_modules/
            },
            {
                test:/\.js(x)?$/,
                loaders:['babel?stage=0'],
                exclude: /node_modules\/(?!subschema|react-bootstrap|react-router)/
            },
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
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
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.less']/*,
        alias: {
            react: path.join(__dirname, 'node_modules/react')
        }*/
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
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

