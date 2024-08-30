const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "source-map", //build ra file src dễ đọc dễ debug
  // Chế đ�� chạy ứng dụng development
  // entry thực hiện chạy bundles theo đường dẫn
  // To check what files are included in the webpack build, you can run webpack-cli command from the terminal:
  // npx webpack --display-modules or
  // npx webpack --json > info.json (if you want to generate a json file in the project folder).
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client",
  },
  module: {
    rules: [
      {
        // xác định các file sẽ được áp dụng quy tắc
        test: "/.js$/",
        // loại trừ thư mục
        exclude: /node_modules/,
        // sử dụng biên dịch mã
        loader: "babel-loader",
      },
      {
        // remember scss not quotes
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html", // Tệp html mẫu
      filename: "./index.html", // Tệp đầu ra
      minify: {
        collapseWhitespace: true, // Tùy chọn thu nhỏ HTML
      },
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
  devServer: {
    port: 3000,
    allowedHosts: ["all"],
  },
};
