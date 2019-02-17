# vue-webpack
> 首先，一个完整的项目，都理应有一个package.json文件，此刻，可以通过以下命令行生成默认的package.json文件  
> `npm init -y`  
> 将webpack安装到当前目录下，最后会生成一个node_modules文件夹，其中会包含所有插件和工具包，可以理解成包管理文件  
> `npm add -D webpack webpack-cli`  
> 假如上一步骤报错，可能是因为没有全局安装webpack  
> 全局安装webpack  
> `npm install webpack -g`  
> [loader](https://www.webpackjs.com/concepts/loaders/)用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！  
> 考虑到必然会使用到css-loader,style-loader,babel-loader,less-loader,file-loader,vue-loader等，直接一句硬怼，没毛病！  
> `npm add -D css-loader style-loader less-loader file-loader vue-loader less vue`  
> 其中引入babel-loader比较不一样，所以将会单独运行  
> `npm add -D babel-loader @babel/core`  
> 配置完成后，运行的时候，发现报错了  
> `TypeError: Cannot read property 'parseComponent' of undefined`  
> 原因是因为忘记加载vue-template-compiler
> `npm add -D vue-template-compiler`
> 后面必须加@babel/core
> 下一步，安装[HtmlWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)和[ExtractTextWebpackPlugin](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/),点击可跳转到相应的介绍页面，简而言之  
> HtmlWebpackPlugin该插件的基本作用就是生成html文件  
> ExtractTextWebpackPlugin该插件的主要是为了抽离css样式，防止将样式打包在js中引起页面样式加载错乱的现象，导致报错。  
> `npm add -D html-webpack-plugin`
> 基本上，大多插件都是以webpack-plugin结尾  
> `npm add -D extract-text-webpack-plugin`  
> ！（安装extract-text-webpack-plugin出了点问题，结果就是，怎么打包运行都报错，最后百度查了下，解决了，报错如下）  
> `
(node:7840) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead  
   (node:7840) UnhandledPromiseRejectionWarning: Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead  
    at Chunk.get (W:\github\vue-webpack\node_modules\webpack\lib\Chunk.js:849:9)  
    at W:\github\vue-webpack\node_modules\extract-text-webpack-plugin\dist\index.js:176:48
    `  
> 当时解决是加以下命令行，估计是extract-text-webpack-plugin和webpack版本对不上吧  
> `npm add -D extract-text-webpack-plugin@4.0.0-bate.0`  
> 上面是知道最新版本号的情况下，反正，可以通过以下，选择其他版本引入  
> `npm add -D extract-text-webpack-plugin@4.0`  
> 老实说，我这里要用yarn运行，才会出选项，npm对我无效...  
> `yarn add -D extract-text-webpack-plugin@4.0`
> 假如需要热加载，那么需要输入以下命令安装插件  
> `npm add -D webpack-dev-server`
> ```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dists'),
        filename: '[name].[hash:4].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                // loader:['style-loader','css-loader','less-loader']
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(jpg|png|svg)/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'vue-webpack'
        }),
        new VueLoaderPlugin()
    ]
}
```
