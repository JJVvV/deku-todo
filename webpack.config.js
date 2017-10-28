let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin') 
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
const path = require('path')
const ASSET_PATH = process.env.ASSET_PATH || '/'



module.exports =  {
    entry: {
        // app: './src/index.js',
        // app2: './src/index2.js',
        index: './src/index.js'
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        // 清除dist文件夹
        new CleanWebpackPlugin(['dist']),
        // new UglifyjsWebpackPlugin({
        //     sourceMap: true
        // }),
        
        //设置环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'ASSET_PATH': JSON.stringify(ASSET_PATH)
            }
        }),

        // generate index.html
        new HtmlWebpackPlugin({
            title: 'output management',
        }),

        
        new webpack.HashedModuleIdsPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        // 在热加载时直接返回更新文件名，而不是文件的id
        new webpack.NamedModulesPlugin(),
        // 热更新
        new webpack.HotModuleReplacementPlugin()
    ],

    output: {
        filename: '[name].js',
        // 输出路径
        path: path.resolve(__dirname, 'dist'),
        publicPath: ASSET_PATH,
        // 设置动态加载的js文件名称， 要配合/* webpackChunkName:"lazy" */ 
        chunkFilename: "[name].js" 
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                // include: path.resolve(__dirname, "src")
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ],
                include: path.resolve(__dirname, "src")
            },
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        
                    }
                },
                include: path.resolve(__dirname, "src")
            }
        ]
    }
}