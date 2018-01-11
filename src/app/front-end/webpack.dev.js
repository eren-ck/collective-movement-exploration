const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// Module for the index.html
module.exports = {
    target: 'web',
    entry: {
        index: './index/index.css',
        upload_list: './upload/upload_list.js',
        upload: './upload/upload.js',
        network_create: './network_create/network_create.js',
        export: './export/export.js',
        explore: './explore/explore.js'
    },
    output: {
        path: path.resolve('../server', 'static'),
        filename: '[name].js' // output js file name is identical to css file name
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ],
    },
    devtool: 'inline-source-map',
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ]
};