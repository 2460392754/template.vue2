const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dllPath = './build/dll';

module.exports = {
    mode: 'production',

    entry: {
        vendor: ['vue/dist/vue.runtime.esm.js', 'vue-router', 'axios']
    },

    output: {
        filename: '[name].dll.js',
        library: '[name]',
        path: path.resolve(__dirname, dllPath)
    },

    plugins: [
        // 删除旧文件
        new CleanWebpackPlugin(),

        // 生成 manifest.json 配置文件
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname, dllPath, '[name].manifest.json'),
            context: __dirname
        })
    ]
};
