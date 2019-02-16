const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack=require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].[hash:4].js'
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // {
            //     test: /\.less$/,
            //     // loader:['style-loader','css-loader','less-loader']
            //     use: ExtractTextWebpackPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'less-loader']
            //     })
            // },
            // {
            //     test: /\.(jpg|png|svg)/,
            //     loader: ['file-loader']
            // }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'vue-webpack'
        })
    ]
}