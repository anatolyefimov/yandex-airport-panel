const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: './src/test.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module : {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emmitError: true,
                    emitWarning: true,
                    failOnError: true
                }
            },
            {
                test: /.pug$/,
                loader: 'pug-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}