var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'main': './src/entry.js'
    },
    output: {
        path: path.resolve('./build/'),
        filename: "breakout.min.js"
    },
    externals: {
        "phaser": "Phaser"
    },
    module: {
        preLoaders: [
            {loader: 'eslint-loader', test: /\.js$/, exclude: /node_modules/}
        ],
        loaders: [
            {loader: 'babel-loader', test: /\.js$/, exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
    ],
    jshint: {
        failOnHint: true
    },
    devtool: 'source-map'
};
