const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Module for the index.html
module.exports = [{
        target: 'web',
        entry: {
            'index': './index/index.css'
        },
        output: {
            path: path.resolve('../server', 'static'),
            filename: '[name].css' // output js file name is identical to css file name
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.(png|jpeg)$/,
                    loader: 'file-loader'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
        ]
    },
    // upload list
    {
        entry: './upload/upload_list.js',
        output: {
            filename: 'upload_list.js',
            path: path.resolve('../server', 'static')
        }
    },
    // upload
    {
        entry: './upload/upload.js',
        output: {
            filename: 'upload.js',
            path: path.resolve('../server', 'static')
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }]
        }
    },
    //network create
    {
        entry: './network_create/network_create.js',
        output: {
            filename: 'network_create.js',
            path: path.resolve('../server', 'static')
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }]
        }
    },
    // export
    {
        entry: './export/export.js',
        output: {
            filename: 'export.js',
            path: path.resolve('../server', 'static')
        },
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }]
        }
    },
    // explore
    {
        entry: './explore/explore.js',
        output: {
            filename: 'explore.js',
            path: path.resolve('../server', 'static')
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
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ],
        },
        devtool: 'inline-source-map'
    }
];