const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = (env) => {
  // / Use env.<YOUR VARIABLE> here to set development or production
  console.log("NODE_ENV: ", env.NODE_ENV);
  return {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
      index: "./src/index.js",
    },
    devServer: {
      contentBase: "./dist",
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
    },
    optimization: {
      moduleIds: "hashed",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [new CleanWebpackPlugin(), htmlPlugin],
  };
};
