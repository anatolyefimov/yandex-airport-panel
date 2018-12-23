const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: './src/main.js',
    },
    devServer: {
        contentBase: ['./dist', './src/public'],

        hot: true
    },
    module : {
        rules: [
            {
                test: /.pug$/,
                loader: 'pug-loader'
            },
         
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
          
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}