//引入nodejs核心模块
const path = require('path');

//引入eslint插件
const EslintWebpackPlugin = require('eslint-webpack-plugin');

//热更新插件
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

//引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

//提取css成单位文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//压缩css插件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

//压缩js插件
const TerserWebpackPlugin = require('terser-webpack-plugin');

//复制插件
const CopyWebpackPlugin = require('copy-webpack-plugin');

//进程环境变量
const isProduction = process.env.NODE_ENV === 'production';

const getStyleLoaders = (pre) =>{
    return [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        {
            //处理css兼容性问题
            //配合package.json中的browsersList来指定兼容性
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['postcss-preset-env']  //css兼容性智能预设
                }
            }
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: isProduction ? path.resolve(__dirname, './dist') : undefined,
        filename: isProduction ? 'static/js/[name].[contenthash:10].js' :  'static/js/[name].js',
        chunkFilename: isProduction ? 'static/js/[name].[contenthash:10].chunk.js' : 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[hash:10][ext][query]',
        clean: true
    },
    module: {
        rules: [
            //处理 css
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            //处理 less-loader
            {
                test: /\.less$/,
                use: getStyleLoaders('less-loader')
            },
            //处理 sass-loader
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders('sass-loader')
            },
            //处理 stylus-loader
            {
                test: /\.styl$/,
                use: getStyleLoaders('stylus-loader')
            },
            //处理图片
            {
                test: /\.(png|jpe?g|gif|webp|svg)/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        //设置图片小于多少转换成base64
                        maxSize: 10 * 1024   //10kb
                    }
                }
            },
            //处理其他资源
            {
                test: /\.(woff2?|ttf|mp3|mp4)/,
                type: 'asset/resource',

            },
            //处理js
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, './src'),   //需要包含文件
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,    //开启babel缓存
                    cacheCompression: false,   //缓存内容不压缩
                    plugins: [
                        !isProduction && 'react-refresh/babel'  //激活js的热更新
                    ].filter(Boolean)
                }
            }
        ]
    },
    //处理插件
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, './src'),   //需要处理哪些文件
            exclude: 'node_modules',   //需要排除的文件
            cache: true,   //添加缓存
            cacheLocation: path.resolve(__dirname, './node_modules/.cache/.eslintcache')   //缓存存储路径
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        !isProduction && new ReactRefreshWebpackPlugin({}),
        isProduction &&
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css',
            chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
        }),
        isProduction &&
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public'),
                    to: path.resolve(__dirname, './dist'),
                    globOptions: {
                        //忽略文件
                        ignore: ['**/index.html']
                    }
                }
            ]
        })
    ].filter(Boolean),
    //解析选项
    resolve: {
        //自动补全文件扩展名
        extensions: ['.jsx', '.js', '.json'],
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    //模式
    mode: isProduction ? 'production' : 'development',
    //代码映射
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    //打包构建配置
    optimization: {
        //代码分割，主要分割的是node_modules和动态导入的语法
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                //react、react-dom、react-router-dom打包成一个js
                react: {
                    test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    name: 'chunk-react',
                    priority: 40
                },
                //antd单独打包
                antd: {
                    test: /[\\/]node_modules[\\/]antd(.*)?[\\/]/,
                    name: 'chunk-antd',
                    priority: 30
                },
                //剩下node_modules单独打包
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk-libs',
                    priority: 20
                }
            }
        },
        //代码分割导致缓存失效处理
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`
        },
        //是否进行压缩
        minimize: isProduction,
        minimizer: [
            //压缩css
            new CssMinimizerWebpackPlugin(),
            //压缩js
            new TerserWebpackPlugin()
        ]
    },
    //开发服务器
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true,
        hot: true,
        historyApiFallback: true,    //解决前端路由刷新404问题
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    performance: false   //关闭性能分析
}
