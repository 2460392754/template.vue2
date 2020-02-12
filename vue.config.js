const CompressionPlugin = require('compression-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production'; // 是否是生产环境

module.exports = {
    // html获取静态文件路径
    publicPath: isProduction ? './' : '/',

    // 打包的静态资源目录
    assetsDir: './assets',

    // 生产源映射
    productionSourceMap: false,

    // 输出 lint 错误警告
    lintOnSave: true,

    configureWebpack(config) {
        // 生产环境
        if (isProduction) {
            return {
                plugins: [
                    // 添加 gzip
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/, // 正则匹配文件
                        threshold: 10240, // 超过10kb的文件进行压缩
                        deleteOriginalAssets: false, // 是否删除源文件
                        minRatio: 0.8
                    })
                ]
            };
        }
    },

    chainWebpack(config) {
        // 生产环境下引入dll，加速webpack编译
        (function vendorDll() {
            const dllPath = './build/dll';
            config.plugin('vendorDll').use(webpack.DllReferencePlugin, [
                {
                    context: __dirname,
                    manifest: require(`${dllPath}/vendor.manifest.json`)
                }
            ]);

            // 将 dll 注入到 生成的 html 模板中
            config
                .plugin('addAssetHtml')
                .use(AddAssetHtmlPlugin, [
                    [
                        {
                            filepath: `${dllPath}/*.js`, // dll文件位置
                            outputPath: './assets/dll', // dll文件位置
                            publicPath: './assets/dll' // dll最终输出的目录
                        }
                    ]
                ])
                .after('html');
        })();

        // 图片压缩
        (function imgCompress() {
            config.module
                .rule('images')
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({ bypassOnDebug: true })
                .end();
        })();
    }
};
