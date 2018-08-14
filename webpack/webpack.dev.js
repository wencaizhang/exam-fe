const path = require("path");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require("./webpack.common.js");


let localip = "http://192.168.0.113:9997";
let remoteip = "http://119.23.217.88:8080";

let proxyip = localip;

module.exports = merge(common, {
    devtool: "inline-source-map",
    output: {
        publicPath: '/dist/',
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true
        })
    ],
    devServer: {
        proxy: {
            "/logout": {
                target: proxyip,
                changeOrigin: true,
            },
            "/sys": {
                target: proxyip,
                changeOrigin: true,
            },
            "/exam": {
                target: proxyip,
                changeOrigin: true,
            },
            "/sage": {
                target: proxyip,
                changeOrigin: true,
            },
            "/student": {
                target: proxyip,
                changeOrigin: true,
            },
            "/layout": {
                target: proxyip,
                changeOrigin: true,
            },
            "/api": {
                target: proxyip,
            },
            // "/api/register": {
            //     // target: "http://119.23.217.88:8080",
            //     // target: "http://112.29.173.230:9997",
            //     target: "192.168.0.113:9997",
            // }
        }
    }
});
