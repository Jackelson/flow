const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack(config) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        // 引入mqtt，报错: Buffer is not defined解决之后，又报错 process is not defined，安装buffer、process,然后安装在这里进行webpack的配置
        process: "process",
        Buffer: ["buffer", "Buffer"],
      }),
      new BundleAnalyzerPlugin()
    );
    if (process.env.NODE_ENV !== "development") {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            parallel: true,
            warnings: false,
            compress: {
              drop_console: true, //注释console
              drop_debugger: true, //注释debugger
              pure_funcs: ["console.log"], //移除console.log
            },
          },
        })
      );
    }
  },
};
